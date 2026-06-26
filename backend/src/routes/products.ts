import { Router, Response } from 'express';
import { supabase } from '../lib/supabase';
import { AuthRequest } from '../middleware/auth';

export const productsRouter = Router();

// GET /products
productsRouter.get('/', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { search, category_id, is_active = 'true' } = req.query;
    let query = supabase
      .from('products')
      .select(`
        *,
        category:categories(id, name),
        inventory!inner(quantity, branch_id)
      `)
      .order('name');

    if (search) query = query.ilike('name', `%${search}%`);
    if (category_id) query = query.eq('category_id', category_id);
    if (is_active !== 'all') query = query.eq('is_active', is_active === 'true');

    const { data, error } = await query;
    if (error) throw error;

    // Flatten inventory quantity
    const products = (data || []).map((p: any) => ({
      ...p,
      stock_quantity: p.inventory?.reduce((sum: number, inv: any) => sum + inv.quantity, 0) || 0,
      inventory: undefined,
    }));

    res.json({ success: true, data: products });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /products/:id
productsRouter.get('/:id', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*, category:categories(id, name)')
      .eq('id', req.params.id)
      .single();
    if (error) throw error;
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /products
productsRouter.post('/', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, category_id, barcode, unit, base_price, public_price,
      cash_discount_percent, credit_discount_percent, box_quantity, min_stock_alert, notes } = req.body;

    if (!name || public_price == null) {
      res.status(400).json({ success: false, message: 'الاسم وسعر الجمهور مطلوبان' });
      return;
    }

    const { data: product, error } = await supabase.from('products').insert({
      name, category_id: category_id || null, barcode: barcode || null, unit: unit || 'قطعة',
      base_price: Number(base_price) || 0, public_price: Number(public_price),
      cash_discount_percent: Number(cash_discount_percent) || 0,
      credit_discount_percent: Number(credit_discount_percent) || 0,
      box_quantity: Number(box_quantity) || 1,
      min_stock_alert: Number(min_stock_alert) || 0,
      notes: notes || null,
    }).select().single();

    if (error) throw error;

    // Initialize inventory for all branches
    const { data: branches } = await supabase.from('branches').select('id');
    if (branches && branches.length > 0) {
      await supabase.from('inventory').insert(
        branches.map((b: any) => ({ product_id: product.id, branch_id: b.id, quantity: 0 }))
      );
    }

    res.status(201).json({ success: true, data: product });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /products/:id
productsRouter.put('/:id', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, category_id, barcode, unit, base_price, public_price,
      cash_discount_percent, credit_discount_percent, box_quantity, min_stock_alert, notes } = req.body;

    const { data, error } = await supabase.from('products').update({
      name, category_id: category_id || null, barcode: barcode || null,
      unit, base_price: Number(base_price), public_price: Number(public_price),
      cash_discount_percent: Number(cash_discount_percent) || 0,
      credit_discount_percent: Number(credit_discount_percent) || 0,
      box_quantity: Number(box_quantity) || 1,
      min_stock_alert: Number(min_stock_alert) || 0,
      notes: notes || null,
    }).eq('id', req.params.id).select().single();

    if (error) throw error;
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /products/:id
productsRouter.delete('/:id', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // Check if product has invoice items
    const { data: items } = await supabase.from('invoice_items').select('id').eq('product_id', req.params.id).limit(1);
    if (items && items.length > 0) {
      // Soft delete only
      await supabase.from('products').update({ is_active: false }).eq('id', req.params.id);
      res.json({ success: true, message: 'تم تعطيل الصنف (له فواتير مرتبطة)' });
      return;
    }
    // Delete related records in inventory first
    await supabase.from('inventory').delete().eq('product_id', req.params.id);
    await supabase.from('inventory_movements').delete().eq('product_id', req.params.id);

    const { error } = await supabase.from('products').delete().eq('id', req.params.id);
    if (error) throw error;
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});
