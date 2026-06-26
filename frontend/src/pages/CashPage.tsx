import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Wallet, TrendingUp, TrendingDown, DollarSign, Receipt, Calendar } from 'lucide-react';
import api from '../lib/api';
import { Modal } from '../components/ui/Modal';
import { useToast } from '../components/ui/Toast';
import { formatCurrency, formatDateTime, EXPENSE_CATEGORIES } from '../utils';
import type { CashBoxEntry, Expense } from '../types';

const CashPage: React.FC = () => {
  const [cashEntries, setCashEntries] = useState<CashBoxEntry[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'cashbox' | 'expenses'>('cashbox');
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [expCategory, setExpCategory] = useState('كهرباء');
  const [expAmount, setExpAmount] = useState('');
  const [expDesc, setExpDesc] = useState('');
  const [expDate, setExpDate] = useState(new Date().toISOString().split('T')[0]);
  const [submitting, setSubmitting] = useState(false);
  const toast = useToast();

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [cashRes, expRes] = await Promise.all([
        api.get('/cash-box'),
        api.get('/expenses'),
      ]);
      if (cashRes.data.success) setCashEntries(cashRes.data.data);
      if (expRes.data.success) setExpenses(expRes.data.data);
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const cashIn = cashEntries.filter(e => e.transaction_type === 'in').reduce((s, e) => s + e.amount, 0);
  const cashOut = cashEntries.filter(e => e.transaction_type === 'out').reduce((s, e) => s + e.amount, 0);
  const balance = cashIn - cashOut;
  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);

  const handleAddExpense = async () => {
    if (!expAmount || parseFloat(expAmount) <= 0) { toast.error('أدخل مبلغاً صحيحاً'); return; }
    setSubmitting(true);
    try {
      await api.post('/expenses', {
        category: expCategory,
        amount: parseFloat(expAmount),
        description: expDesc,
        expense_date: expDate,
      });
      toast.success('تم تسجيل المصروف بنجاح');
      setShowAddExpense(false);
      setExpAmount(''); setExpDesc('');
      loadData();
    } catch (err: any) { toast.error(err.response?.data?.message || 'حدث خطأ'); }
    finally { setSubmitting(false); }
  };

  const SOURCE_LABELS: Record<string, string> = {
    invoice: 'فاتورة بيع', payment: 'سداد آجل', expense: 'مصروف', purchase: 'شراء', other: 'أخرى',
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">الخزنة والحسابات</h1>
        </div>
        <button onClick={() => setShowAddExpense(true)} className="btn-warning">
          <Plus className="w-4 h-4" />تسجيل مصروف
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-success-50 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-success-600" />
            </div>
            <p className="text-sm font-semibold text-secondary-600">إجمالي الوارد</p>
          </div>
          <p className="text-xl font-black text-success-700">{formatCurrency(cashIn)}</p>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-danger-50 rounded-xl flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-danger-500" />
            </div>
            <p className="text-sm font-semibold text-secondary-600">إجمالي الصادر</p>
          </div>
          <p className="text-xl font-black text-danger-600">{formatCurrency(cashOut)}</p>
        </div>
        <div className="card p-4 border-2 border-primary-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center">
              <Wallet className="w-5 h-5 text-primary-600" />
            </div>
            <p className="text-sm font-semibold text-secondary-600">رصيد الخزنة</p>
          </div>
          <p className={`text-xl font-black ${balance >= 0 ? 'text-primary-700' : 'text-danger-600'}`}>
            {formatCurrency(balance)}
          </p>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-warning-50 rounded-xl flex items-center justify-center">
              <Receipt className="w-5 h-5 text-warning-600" />
            </div>
            <p className="text-sm font-semibold text-secondary-600">إجمالي المصروفات</p>
          </div>
          <p className="text-xl font-black text-warning-600">{formatCurrency(totalExpenses)}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-secondary-100 p-1 rounded-2xl w-fit">
        {[
          { id: 'cashbox', label: 'حركات الخزنة' },
          { id: 'expenses', label: 'المصروفات' },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as any)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              tab === t.id ? 'bg-white text-secondary-900 shadow-card' : 'text-secondary-600 hover:text-secondary-900'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'cashbox' && (
        <div className="card p-0 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-16"><div className="w-10 h-10 spinner" /></div>
          ) : (
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>التاريخ</th>
                    <th>النوع</th>
                    <th>المصدر</th>
                    <th>المرجع</th>
                    <th>المبلغ</th>
                    <th>البيان</th>
                  </tr>
                </thead>
                <tbody>
                  {cashEntries.map(entry => (
                    <tr key={entry.id}>
                      <td className="text-xs">{formatDateTime(entry.created_at)}</td>
                      <td>
                        <span className={`badge ${entry.transaction_type === 'in' ? 'badge-success' : 'badge-danger'}`}>
                          {entry.transaction_type === 'in' ? '⬆ وارد' : '⬇ صادر'}
                        </span>
                      </td>
                      <td className="text-secondary-600">{SOURCE_LABELS[entry.source] || entry.source}</td>
                      <td className="text-primary-600 text-xs font-semibold">{entry.reference_number || '—'}</td>
                      <td className={`font-bold ${entry.transaction_type === 'in' ? 'text-success-600' : 'text-danger-600'}`}>
                        {entry.transaction_type === 'in' ? '+' : '-'}{formatCurrency(entry.amount)}
                      </td>
                      <td className="text-secondary-400 text-xs">{entry.description || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {tab === 'expenses' && (
        <div className="card p-0 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-16"><div className="w-10 h-10 spinner" /></div>
          ) : (
            <div className="table-container">
              <table className="table">
                <thead><tr><th>التاريخ</th><th>التصنيف</th><th>المبلغ</th><th>البيان</th></tr></thead>
                <tbody>
                  {expenses.map(exp => (
                    <tr key={exp.id}>
                      <td className="text-xs">{exp.expense_date}</td>
                      <td><span className="badge-warning">{exp.category}</span></td>
                      <td className="text-danger-600 font-bold">{formatCurrency(exp.amount)}</td>
                      <td className="text-secondary-500">{exp.description || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Add Expense Modal */}
      <Modal isOpen={showAddExpense} onClose={() => setShowAddExpense(false)} title="تسجيل مصروف"
        footer={
          <>
            <button onClick={() => setShowAddExpense(false)} className="btn-secondary">إلغاء</button>
            <button onClick={handleAddExpense} disabled={submitting} className="btn-warning">
              {submitting ? <div className="w-4 h-4 spinner" /> : 'تسجيل المصروف'}
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="form-group">
            <label className="form-label">التصنيف *</label>
            <select value={expCategory} onChange={(e) => setExpCategory(e.target.value)} className="form-select">
              {EXPENSE_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">المبلغ *</label>
            <input type="number" min="0" step="0.01" value={expAmount} onChange={(e) => setExpAmount(e.target.value)} className="form-input text-xl font-bold" placeholder="0.00" />
          </div>
          <div className="form-group">
            <label className="form-label">التاريخ</label>
            <input type="date" value={expDate} onChange={(e) => setExpDate(e.target.value)} className="form-input" dir="ltr" />
          </div>
          <div className="form-group">
            <label className="form-label">البيان / الوصف</label>
            <textarea value={expDesc} onChange={(e) => setExpDesc(e.target.value)} className="form-input resize-none" rows={2} placeholder="تفاصيل المصروف..." />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CashPage;
