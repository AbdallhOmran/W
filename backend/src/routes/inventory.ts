import { Router, Response } from 'express';
import { supabase } from '../lib/supabase';
import { AuthRequest } from '../middleware/auth';

export const inventoryRouter = Router();

// GET /inventory
inventoryRouter.get('/', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from('inventory')
      .select('*, product:products(id, name, unit, min_stock_alert, box_quantity, base_price, public_price, pharmacist_cash_price, pharmacist_credit_price)')
      .order('quantity', { ascending: true });
    if (error) throw error;
    res.json({ success: true, data: data || [] });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /inventory/movements
inventoryRouter.get('/movements', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { product_id, from, to } = req.query;
    let query = supabase
      .from('inventory_movements')
      .select('*, product:products(id, name)')
      .order('created_at', { ascending: false })
      .limit(200);
    if (product_id) query = query.eq('product_id', product_id);
    if (from) query = query.gte('created_at', from);
    if (to) query = query.lte('created_at', `${to}T23:59:59`);
    const { data, error } = await query;
    if (error) throw error;
    res.json({ success: true, data: data || [] });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /inventory/adjust
inventoryRouter.post('/adjust', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { product_id, branch_id, adjustment_type, quantity, notes } = req.body;

    if (!product_id || !quantity) {
      res.status(400).json({ success: false, message: 'المنتج والكمية مطلوبان' });
      return;
    }

    const { data: currentInv } = await supabase
      .from('inventory')
      .select('quantity')
      .eq('product_id', product_id)
      .eq('branch_id', branch_id)
      .single();

    const currentQty = currentInv?.quantity || 0;
    let newQty = currentQty;

    if (adjustment_type === 'add') newQty = currentQty + Number(quantity);
    else if (adjustment_type === 'subtract') newQty = Math.max(0, currentQty - Number(quantity));
    else if (adjustment_type === 'set') newQty = Number(quantity);

    await supabase.from('inventory')
      .update({ quantity: newQty })
      .eq('product_id', product_id)
      .eq('branch_id', branch_id);

    await supabase.from('inventory_movements').insert({
      product_id,
      branch_id,
      movement_type: 'adjustment',
      quantity: Math.abs(newQty - currentQty),
      quantity_before: currentQty,
      quantity_after: newQty,
      notes: notes || 'تعديل يدوي',
      created_by: req.user!.id,
    });

    res.json({ success: true, newQuantity: newQty });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export const purchasesRouter = Router();

// GET /purchases
purchasesRouter.get('/', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from('purchases')
      .select('*, supplier:suppliers(id, name), items:purchase_items(*)')
      .order('created_at', { ascending: false });
    if (error) throw error;
    res.json({ success: true, data: data || [] });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /purchases
purchasesRouter.post('/', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { supplier_id, paid_amount = 0, notes, items } = req.body;

    if (!items || items.length === 0) {
      res.status(400).json({ success: false, message: 'يجب إضافة صنف واحد على الأقل' });
      return;
    }

    const total = items.reduce((sum: number, item: any) =>
      sum + Math.round(Number(item.unit_price) * Number(item.quantity) * 100) / 100, 0);

    const { data: purchase, error: purError } = await supabase.from('purchases').insert({
      purchase_number: '',
      supplier_id: supplier_id || null,
      branch_id: req.user!.branch_id,
      total,
      paid_amount: Math.min(Number(paid_amount), total),
      notes: notes || null,
      created_by: req.user!.id,
    }).select().single();

    if (purError) throw purError;

    // Insert items
    await supabase.from('purchase_items').insert(
      items.map((item: any) => ({
        purchase_id: purchase.id,
        product_id: item.product_id,
        product_name: item.product_name,
        quantity: Number(item.quantity),
        unit_price: Number(item.unit_price),
        total: Math.round(Number(item.unit_price) * Number(item.quantity) * 100) / 100,
      }))
    );

    // Add to inventory & movements
    for (const item of items) {
      const { data: currentInv } = await supabase
        .from('inventory')
        .select('quantity')
        .eq('product_id', item.product_id)
        .eq('branch_id', req.user!.branch_id)
        .single();

      const newQty = (currentInv?.quantity || 0) + Number(item.quantity);

      await supabase.from('inventory')
        .upsert({ product_id: item.product_id, branch_id: req.user!.branch_id, quantity: newQty },
          { onConflict: 'product_id,branch_id' });

      await supabase.from('inventory_movements').insert({
        product_id: item.product_id,
        branch_id: req.user!.branch_id,
        movement_type: 'in',
        quantity: Number(item.quantity),
        quantity_before: currentInv?.quantity || 0,
        quantity_after: newQty,
        reference_type: 'purchase',
        reference_id: purchase.id,
        notes: `مشتريات ${purchase.purchase_number}`,
        created_by: req.user!.id,
      });

      // Update product base_price if provided
      if (item.unit_price > 0) {
        await supabase.from('products').update({ base_price: Number(item.unit_price) }).eq('id', item.product_id);
      }
    }

    // Record cash payment
    if (Number(paid_amount) > 0) {
      await supabase.from('cash_box').insert({
        transaction_type: 'out',
        amount: Math.min(Number(paid_amount), total),
        source: 'purchase',
        reference_id: purchase.id,
        reference_number: purchase.purchase_number,
        description: `دفع مشتريات ${purchase.purchase_number}`,
        branch_id: req.user!.branch_id,
        created_by: req.user!.id,
      });
    }

    res.status(201).json({ success: true, data: purchase });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});
