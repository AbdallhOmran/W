import { Router, Response } from 'express';
import { supabase } from '../lib/supabase';
import { AuthRequest } from '../middleware/auth';

export const returnsRouter = Router();

// POST /returns - إنشاء مرتجع
returnsRouter.post('/', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { invoice_id, items, refund_method, notes } = req.body;

    if (!invoice_id || !items || items.length === 0) {
      res.status(400).json({ success: false, message: 'الفاتورة والأصناف مطلوبة' });
      return;
    }

    // Load original invoice
    const { data: invoice, error: invError } = await supabase
      .from('invoices')
      .select('*, customer:customers(*), items:invoice_items(*)')
      .eq('id', invoice_id)
      .single();

    if (invError || !invoice) {
      res.status(404).json({ success: false, message: 'الفاتورة غير موجودة' });
      return;
    }

    // Calculate total returned
    let totalReturned = 0;
    const returnedItems = [];

    for (const returnItem of items) {
      const originalItem = invoice.items.find((i: any) => i.id === returnItem.invoice_item_id);
      if (!originalItem) continue;

      const maxReturnableQty = originalItem.quantity_units; // Can only return what was sold
      const returnQty = Math.min(Number(returnItem.quantity_units), maxReturnableQty);
      const itemReturnTotal = Math.round(originalItem.pharmacist_price * returnQty * 100) / 100;

      returnedItems.push({
        invoice_item_id: returnItem.invoice_item_id,
        product_id: originalItem.product_id,
        product_name: originalItem.product_name,
        quantity: returnItem.quantity,
        quantity_units: returnQty,
        pharmacist_price: originalItem.pharmacist_price,
        total: itemReturnTotal,
      });

      totalReturned += itemReturnTotal;
    }

    totalReturned = Math.round(totalReturned * 100) / 100;

    // Create return record
    const { data: returnRecord, error: retError } = await supabase
      .from('returns')
      .insert({
        return_number: '',
        invoice_id,
        customer_id: invoice.customer_id,
        total_returned: totalReturned,
        refund_method: refund_method || 'none',
        notes: notes || null,
        created_by: req.user!.id,
      })
      .select()
      .single();

    if (retError) throw retError;

    // Insert return items
    await supabase.from('return_items').insert(
      returnedItems.map(item => ({ ...item, return_id: returnRecord.id }))
    );

    // Restore inventory for each returned item
    const branch_id = req.user!.branch_id;
    for (const item of returnedItems) {
      const { data: currentInv } = await supabase
        .from('inventory')
        .select('quantity')
        .eq('product_id', item.product_id)
        .eq('branch_id', branch_id)
        .single();

      const newQty = (currentInv?.quantity || 0) + item.quantity_units;

      await supabase.from('inventory')
        .update({ quantity: newQty })
        .eq('product_id', item.product_id)
        .eq('branch_id', branch_id);

      await supabase.from('inventory_movements').insert({
        product_id: item.product_id,
        branch_id,
        movement_type: 'return',
        quantity: item.quantity_units,
        quantity_before: currentInv?.quantity || 0,
        quantity_after: newQty,
        reference_type: 'return',
        reference_id: returnRecord.id,
        notes: `مرتجع فاتورة ${invoice.invoice_number}`,
        created_by: req.user!.id,
      });
    }

    // Update invoice status
    const totalInvoiceItems = invoice.items.reduce((s: number, i: any) => s + i.quantity_units, 0);
    const totalReturnedUnits = returnedItems.reduce((s, i) => s + i.quantity_units, 0);
    const newStatus = totalReturnedUnits >= totalInvoiceItems ? 'fully_returned' : 'partially_returned';

    await supabase.from('invoices').update({ status: newStatus }).eq('id', invoice_id);

    // Handle refund based on refund_method
    if (refund_method === 'cash' && totalReturned > 0) {
      // If customer paid this invoice - return cash
      // Record as cash out
      await supabase.from('cash_box').insert({
        transaction_type: 'out',
        amount: totalReturned,
        source: 'return',
        reference_id: returnRecord.id,
        reference_number: returnRecord.return_number,
        description: `رد مرتجع - فاتورة ${invoice.invoice_number}`,
        branch_id,
        created_by: req.user!.id,
      });
    } else if (refund_method === 'deduct_debt' && totalReturned > 0) {
      // Reduce customer debt
      const { data: cust } = await supabase.from('customers').select('total_debt').eq('id', invoice.customer_id).single();
      const newDebt = Math.max(0, (cust?.total_debt || 0) - totalReturned);
      await supabase.from('customers').update({ total_debt: newDebt }).eq('id', invoice.customer_id);
    }

    res.status(201).json({ success: true, data: returnRecord, totalReturned });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /returns
returnsRouter.get('/', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from('returns')
      .select('*, invoice:invoices(invoice_number), customer:customers(name), items:return_items(*)')
      .order('created_at', { ascending: false });
    if (error) throw error;
    res.json({ success: true, data: data || [] });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});
