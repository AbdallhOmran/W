import { Router, Response } from 'express';
import bcrypt from 'bcryptjs';
import { supabase } from '../lib/supabase';
import { AuthRequest } from '../middleware/auth';

export const reportsRouter = Router();

// GET /reports/dashboard
reportsRouter.get('/dashboard', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const monthStart = new Date();
    monthStart.setDate(1);
    const monthStartStr = monthStart.toISOString().split('T')[0];

    // Today's invoices
    const { data: todayInvoices } = await supabase
      .from('invoices')
      .select('total, paid_amount, items:invoice_items(pharmacist_price, quantity_units, product:products(base_price))')
      .gte('created_at', `${today}T00:00:00`)
      .lte('created_at', `${today}T23:59:59`);

    const todaySales = todayInvoices?.reduce((s, i) => s + i.total, 0) || 0;
    const todayProfit = todayInvoices?.reduce((s, inv) => {
      return s + (inv.items as any[]).reduce((ps, item) => {
        const profit = (item.pharmacist_price - (item.product?.base_price || 0)) * item.quantity_units;
        return ps + profit;
      }, 0);
    }, 0) || 0;

    // Month invoices
    const { data: monthInvoices } = await supabase
      .from('invoices')
      .select('total, items:invoice_items(pharmacist_price, quantity_units, product:products(base_price))')
      .gte('created_at', monthStartStr);

    const monthSales = monthInvoices?.reduce((s, i) => s + i.total, 0) || 0;
    const monthProfit = monthInvoices?.reduce((s, inv) => {
      return s + (inv.items as any[]).reduce((ps, item) => {
        return ps + (item.pharmacist_price - (item.product?.base_price || 0)) * item.quantity_units;
      }, 0);
    }, 0) || 0;

    // Customers & debt
    const { data: customers } = await supabase.from('customers').select('id, total_debt');
    const totalDebt = customers?.reduce((s, c) => s + c.total_debt, 0) || 0;

    // Cash balance
    const { data: cashIn } = await supabase.from('cash_box').select('amount').eq('transaction_type', 'in');
    const { data: cashOut } = await supabase.from('cash_box').select('amount').eq('transaction_type', 'out');
    const cashBalance = (cashIn?.reduce((s, e) => s + e.amount, 0) || 0) - (cashOut?.reduce((s, e) => s + e.amount, 0) || 0);

    // Low stock products
    const { data: inventory } = await supabase
      .from('inventory')
      .select('quantity, product:products(id, name, min_stock_alert, unit, stock_quantity:quantity)')
      .lt('quantity', supabase.from('products').select('min_stock_alert'));

    // Simpler low stock query
    const { data: allInventory } = await supabase
      .from('inventory')
      .select('quantity, product:products(id, name, min_stock_alert, unit)');

    const lowStockProducts = (allInventory || [])
      .filter((inv: any) => inv.product && inv.quantity <= inv.product.min_stock_alert && inv.product.min_stock_alert > 0)
      .map((inv: any) => ({ ...inv.product, stock_quantity: inv.quantity }));

    // Top products (last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const { data: topItemsRaw } = await supabase
      .from('invoice_items')
      .select('product_id, product_name, quantity_units, total, invoice:invoices!inner(created_at)')
      .gte('invoice.created_at', thirtyDaysAgo);

    // Aggregate top products
    const topProductsMap = new Map<string, any>();
    (topItemsRaw || []).forEach((item: any) => {
      const key = item.product_id;
      if (!topProductsMap.has(key)) {
        topProductsMap.set(key, { product: { id: item.product_id, name: item.product_name }, total_quantity: 0, total_revenue: 0, invoice_count: 0 });
      }
      const p = topProductsMap.get(key)!;
      p.total_quantity += item.quantity_units;
      p.total_revenue += item.total;
      p.invoice_count++;
    });
    const topProducts = Array.from(topProductsMap.values()).sort((a, b) => b.total_revenue - a.total_revenue).slice(0, 5);

    // Recent invoices
    const { data: recentInvoices } = await supabase
      .from('invoices')
      .select('*, customer:customers(name)')
      .order('created_at', { ascending: false })
      .limit(5);

    // Sales chart (last 7 days)
    const salesChart = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
      const dateStr = date.toISOString().split('T')[0];
      const { data: dayInvoices } = await supabase
        .from('invoices')
        .select('total, items:invoice_items(pharmacist_price, quantity_units, product:products(base_price))')
        .gte('created_at', `${dateStr}T00:00:00`)
        .lte('created_at', `${dateStr}T23:59:59`);

      const sales = dayInvoices?.reduce((s, i) => s + i.total, 0) || 0;
      const profit = dayInvoices?.reduce((s, inv) => {
        return s + (inv.items as any[]).reduce((ps, item) => {
          return ps + (item.pharmacist_price - (item.product?.base_price || 0)) * item.quantity_units;
        }, 0);
      }, 0) || 0;

      salesChart.push({ date: date.toISOString(), sales, profit });
    }

    res.json({
      success: true,
      data: {
        todaySales, todayProfit, todayInvoicesCount: todayInvoices?.length || 0,
        monthSales, monthProfit,
        totalCustomers: customers?.length || 0, totalDebt, cashBalance,
        lowStockProducts, topProducts,
        recentInvoices: recentInvoices || [],
        salesChart,
      },
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /reports/summary
reportsRouter.get('/summary', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { from, to } = req.query;
    const fromStr = from || new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];
    const toStr = to || new Date().toISOString().split('T')[0];

    const { data: invoices } = await supabase
      .from('invoices')
      .select('total, paid_amount, created_at, items:invoice_items(pharmacist_price, quantity_units, product_name, product:products(base_price))')
      .gte('created_at', fromStr)
      .lte('created_at', `${toStr}T23:59:59`);

    const totalSales = invoices?.reduce((s, i) => s + i.total, 0) || 0;
    const totalProfit = invoices?.reduce((s, inv) => {
      return s + (inv.items as any[]).reduce((ps, item) => {
        return ps + (item.pharmacist_price - (item.product?.base_price || 0)) * item.quantity_units;
      }, 0);
    }, 0) || 0;

    const { data: expensesData } = await supabase
      .from('expenses')
      .select('amount')
      .gte('expense_date', fromStr)
      .lte('expense_date', toStr);
    const totalExpenses = expensesData?.reduce((s, e) => s + e.amount, 0) || 0;

    const { data: customers } = await supabase.from('customers').select('id, total_debt, created_at').gte('created_at', fromStr);
    const { data: allCustomers } = await supabase.from('customers').select('total_debt');

    // Sales by day
    const dayMap = new Map<string, number>();
    (invoices || []).forEach((inv: any) => {
      const day = inv.created_at.split('T')[0];
      dayMap.set(day, (dayMap.get(day) || 0) + inv.total);
    });
    const salesByDay = Array.from(dayMap.entries()).sort().map(([date, sales]) => ({ date, sales }));

    // Top products
    const prodMap = new Map<string, any>();
    (invoices || []).forEach((inv: any) => {
      (inv.items || []).forEach((item: any) => {
        if (!prodMap.has(item.product_name)) {
          prodMap.set(item.product_name, { product_name: item.product_name, total_quantity: 0, total_revenue: 0, invoice_count: 0 });
        }
        const p = prodMap.get(item.product_name)!;
        p.total_quantity += item.quantity_units;
        p.total_revenue += item.pharmacist_price * item.quantity_units;
        p.invoice_count++;
      });
    });
    const topProducts = Array.from(prodMap.values()).sort((a, b) => b.total_revenue - a.total_revenue);

    res.json({
      success: true,
      data: {
        totalSales, totalProfit, totalExpenses,
        netProfit: totalProfit - totalExpenses,
        invoiceCount: invoices?.length || 0,
        newCustomers: customers?.length || 0,
        totalDebt: allCustomers?.reduce((s, c) => s + c.total_debt, 0) || 0,
        salesByDay, topProducts,
      },
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export const usersRouter = Router();

// GET /users
usersRouter.get('/', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (req.user?.role !== 'super_admin') {
      res.status(403).json({ success: false, message: 'غير مصرح' });
      return;
    }
    const { data, error } = await supabase.from('users').select('id, name, email, role, branch_id, is_active, created_at').order('created_at');
    if (error) throw error;
    res.json({ success: true, data: data || [] });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /users
usersRouter.post('/', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (req.user?.role !== 'super_admin') { res.status(403).json({ success: false, message: 'غير مصرح' }); return; }
    const { name, email, password, role, branch_id, is_active } = req.body;
    const passwordHash = await bcrypt.hash(password, 12);
    const { data: branch } = await supabase.from('branches').select('id').limit(1).single();
    const { data, error } = await supabase.from('users').insert({
      name, email, password_hash: passwordHash, role, branch_id: branch_id || branch?.id, is_active: is_active ?? true,
    }).select('id, name, email, role, branch_id, is_active, created_at').single();
    if (error) throw error;
    res.status(201).json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /users/:id
usersRouter.put('/:id', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (req.user?.role !== 'super_admin') { res.status(403).json({ success: false, message: 'غير مصرح' }); return; }
    const { name, email, password, role, is_active } = req.body;
    const updateData: any = { name, email, role, is_active };
    if (password) {
      updateData.password_hash = await bcrypt.hash(password, 12);
    }
    const { data, error } = await supabase.from('users').update(updateData).eq('id', req.params.id).select('id, name, email, role, branch_id, is_active, created_at').single();
    if (error) throw error;
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export const branchesRouter = Router();
branchesRouter.get('/', async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabase.from('branches').select('*').eq('is_active', true);
    if (error) throw error;
    res.json({ success: true, data: data || [] });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export const categoriesRouter = Router();
categoriesRouter.get('/', async (_req, res: Response): Promise<void> => {
  try {
    const { data, error } = await supabase.from('categories').select('*').order('name');
    if (error) throw error;
    res.json({ success: true, data: data || [] });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});
categoriesRouter.post('/', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, description } = req.body;
    const { data, error } = await supabase.from('categories').insert({ name, description: description || null }).select().single();
    if (error) throw error;
    res.status(201).json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});
