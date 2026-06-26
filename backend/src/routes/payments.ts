import { Router, Response } from 'express';
import { supabase } from '../lib/supabase';
import { AuthRequest } from '../middleware/auth';

export const paymentsRouter = Router();

// GET /payments
paymentsRouter.get('/', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { customer_id } = req.query;
    let query = supabase.from('payments').select('*, customer:customers(id, name), invoice:invoices(invoice_number)').order('created_at', { ascending: false });
    if (customer_id) query = query.eq('customer_id', customer_id);
    const { data, error } = await query;
    if (error) throw error;
    res.json({ success: true, data: data || [] });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /payments - سداد آجل
paymentsRouter.post('/', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { customer_id, invoice_id, amount, payment_date, notes } = req.body;

    if (!customer_id || !amount || Number(amount) <= 0) {
      res.status(400).json({ success: false, message: 'العميل والمبلغ مطلوبان' });
      return;
    }

    // Check customer debt
    const { data: customer } = await supabase.from('customers').select('total_debt, name').eq('id', customer_id).single();
    if (!customer) { res.status(404).json({ success: false, message: 'العميل غير موجود' }); return; }

    const payAmount = Math.min(Number(amount), customer.total_debt);
    if (payAmount <= 0) {
      res.status(400).json({ success: false, message: 'لا توجد مديونية على هذا العميل' });
      return;
    }

    // Create payment
    const { data: payment, error: payError } = await supabase.from('payments').insert({
      customer_id,
      invoice_id: invoice_id || null,
      amount: payAmount,
      payment_date: payment_date || new Date().toISOString().split('T')[0],
      notes: notes || null,
      created_by: req.user!.id,
    }).select().single();

    if (payError) throw payError;

    // Reduce customer debt
    const newDebt = Math.max(0, customer.total_debt - payAmount);
    await supabase.from('customers').update({ total_debt: newDebt }).eq('id', customer_id);

    // Record in cash box
    await supabase.from('cash_box').insert({
      transaction_type: 'in',
      amount: payAmount,
      source: 'payment',
      reference_id: payment.id,
      description: `سداد آجل - ${customer.name}`,
      branch_id: req.user!.branch_id,
      created_by: req.user!.id,
    });

    res.status(201).json({ success: true, data: payment, newDebt });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export const expensesRouter = Router();

// GET /expenses
expensesRouter.get('/', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { from, to } = req.query;
    let query = supabase.from('expenses').select('*').order('expense_date', { ascending: false });
    if (from) query = query.gte('expense_date', from);
    if (to) query = query.lte('expense_date', to);
    const { data, error } = await query;
    if (error) throw error;
    res.json({ success: true, data: data || [] });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /expenses
expensesRouter.post('/', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { category, amount, description, expense_date } = req.body;
    if (!category || !amount || Number(amount) <= 0) {
      res.status(400).json({ success: false, message: 'التصنيف والمبلغ مطلوبان' });
      return;
    }
    const { data, error } = await supabase.from('expenses').insert({
      category, amount: Number(amount), description: description || null,
      expense_date: expense_date || new Date().toISOString().split('T')[0],
      branch_id: req.user!.branch_id,
      created_by: req.user!.id,
    }).select().single();
    if (error) throw error;

    // Record in cash box
    await supabase.from('cash_box').insert({
      transaction_type: 'out',
      amount: Number(amount),
      source: 'expense',
      reference_id: data.id,
      description: `مصروف ${category}: ${description || ''}`,
      branch_id: req.user!.branch_id,
      created_by: req.user!.id,
    });

    res.status(201).json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export const cashBoxRouter = Router();

// GET /cash-box
cashBoxRouter.get('/', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { from, to } = req.query;
    let query = supabase.from('cash_box').select('*').order('created_at', { ascending: false });
    if (from) query = query.gte('created_at', from);
    if (to) query = query.lte('created_at', `${to}T23:59:59`);
    const { data, error } = await query;
    if (error) throw error;
    res.json({ success: true, data: data || [] });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});
