import { Router, Response } from 'express';
import { supabase } from '../lib/supabase';
import { AuthRequest } from '../middleware/auth';

export const customersRouter = Router();

// GET /customers
customersRouter.get('/', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { search } = req.query;
    let query = supabase.from('customers').select('*').order('name');
    if (search) query = query.or(`name.ilike.%${search}%,phone.ilike.%${search}%`);
    const { data, error } = await query;
    if (error) throw error;
    res.json({ success: true, data: data || [] });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /customers/:id/invoices
customersRouter.get('/:id/invoices', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from('invoices').select('*, items:invoice_items(*)').eq('customer_id', req.params.id).order('created_at', { ascending: false });
    if (error) throw error;
    res.json({ success: true, data: data || [] });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /customers/:id/payments
customersRouter.get('/:id/payments', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from('payments').select('*').eq('customer_id', req.params.id).order('created_at', { ascending: false });
    if (error) throw error;
    res.json({ success: true, data: data || [] });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /customers
customersRouter.post('/', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, phone, address, payment_type, credit_limit, notes } = req.body;
    if (!name) { res.status(400).json({ success: false, message: 'الاسم مطلوب' }); return; }
    const { data, error } = await supabase.from('customers').insert({
      name, phone: phone || null, address: address || null,
      payment_type: payment_type || 'cash', credit_limit: Number(credit_limit) || 0,
      notes: notes || null,
    }).select().single();
    if (error) throw error;
    res.status(201).json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /customers/:id
customersRouter.put('/:id', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, phone, address, payment_type, credit_limit, notes, is_active } = req.body;
    const { data, error } = await supabase.from('customers').update({
      name, phone: phone || null, address: address || null,
      payment_type, credit_limit: Number(credit_limit) || 0,
      notes: notes || null, is_active: is_active ?? true,
    }).eq('id', req.params.id).select().single();
    if (error) throw error;
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export const suppliersRouter = Router();

// GET /suppliers
suppliersRouter.get('/', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { search } = req.query;
    let query = supabase.from('suppliers').select('*').order('name');
    if (search) query = query.ilike('name', `%${search}%`);
    const { data, error } = await query;
    if (error) throw error;
    res.json({ success: true, data: data || [] });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /suppliers/:id/purchases
suppliersRouter.get('/:id/purchases', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from('purchases').select('*').eq('supplier_id', req.params.id).order('created_at', { ascending: false });
    if (error) throw error;
    res.json({ success: true, data: data || [] });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /suppliers
suppliersRouter.post('/', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, phone, address, notes } = req.body;
    if (!name) { res.status(400).json({ success: false, message: 'الاسم مطلوب' }); return; }
    const { data, error } = await supabase.from('suppliers').insert({ name, phone: phone || null, address: address || null, notes: notes || null }).select().single();
    if (error) throw error;
    res.status(201).json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /suppliers/:id
suppliersRouter.put('/:id', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, phone, address, notes } = req.body;
    const { data, error } = await supabase.from('suppliers').update({ name, phone: phone || null, address: address || null, notes: notes || null }).eq('id', req.params.id).select().single();
    if (error) throw error;
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});
