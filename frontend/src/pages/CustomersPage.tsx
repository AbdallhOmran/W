import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Search, Phone, MapPin, CreditCard, Wallet, FileText, DollarSign, Edit2, Eye } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import api from '../lib/api';
import { Modal } from '../components/ui/Modal';
import { useToast } from '../components/ui/Toast';
import { formatCurrency, formatDate, formatNumber, PAYMENT_TYPE_LABELS } from '../utils';
import type { Customer, Invoice, Payment } from '../types';

const customerSchema = z.object({
  name: z.string().min(2, 'الاسم مطلوب'),
  phone: z.string().optional(),
  address: z.string().optional(),
  payment_type: z.enum(['cash', 'credit']).default('cash'),
  credit_limit: z.coerce.number().min(0),
  notes: z.string().optional(),
});
type CustomerForm = z.infer<typeof customerSchema>;

// ============================================================
// Customer Detail Modal (Account Statement)
// ============================================================
const CustomerDetailModal: React.FC<{
  customer: Customer | null;
  isOpen: boolean;
  onClose: () => void;
  onPayment: () => void;
}> = ({ customer, isOpen, onClose, onPayment }) => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);
  const [payAmount, setPayAmount] = useState('');
  const [payNote, setPayNote] = useState('');
  const [submittingPay, setSubmittingPay] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (customer && isOpen) {
      setLoading(true);
      Promise.all([
        api.get(`/customers/${customer.id}/invoices`),
        api.get(`/customers/${customer.id}/payments`),
      ]).then(([invRes, payRes]) => {
        if (invRes.data.success) setInvoices(invRes.data.data);
        if (payRes.data.success) setPayments(payRes.data.data);
      }).finally(() => setLoading(false));
    }
  }, [customer, isOpen]);

  const handlePayment = async () => {
    if (!customer || !payAmount || parseFloat(payAmount) <= 0) {
      toast.error('أدخل مبلغاً صحيحاً');
      return;
    }
    setSubmittingPay(true);
    try {
      await api.post('/payments', {
        customer_id: customer.id,
        amount: parseFloat(payAmount),
        notes: payNote,
        payment_date: new Date().toISOString().split('T')[0],
      });
      toast.success('تم تسجيل الدفعة بنجاح');
      setPayAmount('');
      setPayNote('');
      onPayment();
      onClose();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'حدث خطأ');
    } finally {
      setSubmittingPay(false);
    }
  };

  if (!customer) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`كشف حساب - ${customer.name}`} size="xl">
      <div className="space-y-5">
        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-secondary-50 rounded-xl p-4 text-center">
            <p className="text-xs text-secondary-500 mb-1">إجمالي المبيعات</p>
            <p className="font-black text-secondary-900">{formatCurrency(invoices.reduce((s, i) => s + i.total, 0))}</p>
          </div>
          <div className="bg-success-50 rounded-xl p-4 text-center">
            <p className="text-xs text-secondary-500 mb-1">إجمالي المدفوع</p>
            <p className="font-black text-success-700">{formatCurrency(invoices.reduce((s, i) => s + i.paid_amount, 0) + payments.reduce((s, p) => s + p.amount, 0))}</p>
          </div>
          <div className={`rounded-xl p-4 text-center ${customer.total_debt > 0 ? 'bg-danger-50' : 'bg-success-50'}`}>
            <p className="text-xs text-secondary-500 mb-1">المديونية الحالية</p>
            <p className={`font-black ${customer.total_debt > 0 ? 'text-danger-700' : 'text-success-700'}`}>
              {formatCurrency(customer.total_debt)}
            </p>
          </div>
        </div>

        {/* Pay Debt */}
        {customer.total_debt > 0 && (
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
            <h4 className="font-bold text-orange-800 mb-3 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              تسجيل دفعة
            </h4>
            <div className="flex gap-3">
              <div className="form-group flex-1">
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={payAmount}
                  onChange={(e) => setPayAmount(e.target.value)}
                  placeholder="المبلغ المدفوع"
                  className="form-input"
                />
              </div>
              <div className="form-group flex-1">
                <input
                  value={payNote}
                  onChange={(e) => setPayNote(e.target.value)}
                  placeholder="ملاحظة (اختياري)"
                  className="form-input"
                />
              </div>
              <button onClick={handlePayment} disabled={submittingPay} className="btn-success">
                {submittingPay ? <div className="w-4 h-4 spinner" /> : 'تسجيل'}
              </button>
            </div>
          </div>
        )}

        {/* Invoices */}
        <div>
          <h4 className="font-bold text-secondary-700 mb-3">الفواتير</h4>
          {loading ? (
            <div className="flex justify-center py-6"><div className="w-8 h-8 spinner" /></div>
          ) : (
            <div className="table-container max-h-48 overflow-y-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>رقم الفاتورة</th>
                    <th>التاريخ</th>
                    <th>الإجمالي</th>
                    <th>المدفوع</th>
                    <th>المتبقي</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map(inv => (
                    <tr key={inv.id}>
                      <td className="font-bold text-primary-600">{inv.invoice_number}</td>
                      <td className="text-xs">{formatDate(inv.created_at)}</td>
                      <td>{formatCurrency(inv.total)}</td>
                      <td className="text-success-600">{formatCurrency(inv.paid_amount)}</td>
                      <td className={inv.remaining > 0 ? 'text-danger-600 font-bold' : 'text-secondary-400'}>
                        {inv.remaining > 0 ? formatCurrency(inv.remaining) : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Payments History */}
        {payments.length > 0 && (
          <div>
            <h4 className="font-bold text-secondary-700 mb-3">سجل الدفعات</h4>
            <div className="table-container max-h-36 overflow-y-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>التاريخ</th>
                    <th>المبلغ</th>
                    <th>ملاحظات</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map(pay => (
                    <tr key={pay.id}>
                      <td className="text-xs">{formatDate(pay.payment_date)}</td>
                      <td className="text-success-600 font-bold">{formatCurrency(pay.amount)}</td>
                      <td className="text-secondary-500">{pay.notes || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

// ============================================================
// Customers Page
// ============================================================
const CustomersPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editCustomer, setEditCustomer] = useState<Customer | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const toast = useToast();

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<CustomerForm>({
    resolver: zodResolver(customerSchema),
    defaultValues: { payment_type: 'cash', credit_limit: 0 },
  });

  const loadCustomers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/customers', { params: { search } });
      if (res.data.success) setCustomers(res.data.data);
    } finally { setLoading(false); }
  }, [search]);

  useEffect(() => { loadCustomers(); }, [loadCustomers]);

  useEffect(() => {
    if (editCustomer) {
      reset({
        name: editCustomer.name,
        phone: editCustomer.phone || '',
        address: editCustomer.address || '',
        payment_type: editCustomer.payment_type,
        credit_limit: editCustomer.credit_limit,
        notes: editCustomer.notes || '',
      });
    } else {
      reset({ payment_type: 'cash', credit_limit: 0 });
    }
  }, [editCustomer, reset]);

  const onSubmit = async (data: CustomerForm) => {
    try {
      if (editCustomer) {
        await api.put(`/customers/${editCustomer.id}`, data);
        toast.success('تم تحديث بيانات العميل');
      } else {
        await api.post('/customers', data);
        toast.success('تم إضافة العميل بنجاح');
      }
      setShowForm(false);
      setEditCustomer(null);
      loadCustomers();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'حدث خطأ');
    }
  };

  const totalDebt = customers.reduce((s, c) => s + c.total_debt, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">العملاء</h1>
          <p className="page-subtitle">
            {formatNumber(customers.length)} عميل •
            إجمالي المديونيات: <span className="text-danger-600 font-bold">{formatCurrency(totalDebt)}</span>
          </p>
        </div>
        <button onClick={() => { setEditCustomer(null); setShowForm(true); }} className="btn-primary">
          <Plus className="w-4 h-4" />
          إضافة عميل
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card p-4 text-center">
          <p className="text-2xl font-black text-secondary-900">{formatNumber(customers.length)}</p>
          <p className="text-sm text-secondary-500">إجمالي العملاء</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-black text-success-600">{formatNumber(customers.filter(c => c.is_active).length)}</p>
          <p className="text-sm text-secondary-500">العملاء النشطون</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-black text-danger-600">{formatCurrency(totalDebt)}</p>
          <p className="text-sm text-secondary-500">إجمالي المديونيات</p>
        </div>
      </div>

      {/* Search */}
      <div className="card p-4">
        <div className="relative">
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="بحث بالاسم أو الهاتف..."
            className="form-input pr-10"
          />
        </div>
      </div>

      {/* Table */}
      <div className="card p-0 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16"><div className="w-10 h-10 spinner" /></div>
        ) : customers.length === 0 ? (
          <div className="empty-state">
            <Search className="empty-icon" />
            <h3 className="empty-title">لا يوجد عملاء</h3>
            <button onClick={() => setShowForm(true)} className="btn-primary"><Plus className="w-4 h-4" />إضافة عميل</button>
          </div>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>الاسم</th>
                  <th>الهاتف</th>
                  <th>المديونية</th>
                  <th>الحالة</th>
                  <th>إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => (
                  <tr key={c.id}>
                    <td className="font-semibold">{c.name}</td>
                    <td className="text-secondary-500 ltr-number">{c.phone || '—'}</td>
                    <td>
                      {c.total_debt > 0 ? (
                        <span className="text-danger-600 font-bold">{formatCurrency(c.total_debt)}</span>
                      ) : (
                        <span className="text-secondary-400">لا يوجد</span>
                      )}
                    </td>
                    <td>
                      <span className={`badge ${c.is_active ? 'badge-success' : 'badge-secondary'}`}>
                        {c.is_active ? 'نشط' : 'معطل'}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <button onClick={() => setSelectedCustomer(c)} className="btn-ghost btn-icon btn-sm text-primary-600" title="كشف حساب">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => { setEditCustomer(c); setShowForm(true); }} className="btn-ghost btn-icon btn-sm text-secondary-600" title="تعديل">
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <Modal isOpen={showForm} onClose={() => { setShowForm(false); setEditCustomer(null); }}
        title={editCustomer ? 'تعديل عميل' : 'إضافة عميل جديد'}
        footer={
          <>
            <button onClick={() => { setShowForm(false); setEditCustomer(null); }} className="btn-secondary">إلغاء</button>
            <button form="customer-form" type="submit" disabled={isSubmitting} className="btn-primary">
              {isSubmitting ? <div className="w-4 h-4 spinner" /> : (editCustomer ? 'حفظ' : 'إضافة')}
            </button>
          </>
        }
      >
        <form id="customer-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="form-group">
            <label className="form-label">الاسم *</label>
            <input {...register('name')} className="form-input" placeholder="اسم العميل أو الصيدلية" />
            {errors.name && <p className="form-error">{errors.name.message}</p>}
          </div>
          <div className="form-group">
            <label className="form-label">الهاتف</label>
            <input {...register('phone')} className="form-input" placeholder="01xxxxxxxxx" dir="ltr" />
          </div>
          <div className="form-group">
            <label className="form-label">العنوان</label>
            <input {...register('address')} className="form-input" placeholder="عنوان العميل" />
          </div>
          <div className="form-group">
            <label className="form-label">حد الائتمان (الآجل)</label>
            <input {...register('credit_limit')} type="number" min="0" step="0.01" className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">ملاحظات</label>
            <textarea {...register('notes')} className="form-input resize-none" rows={2} />
          </div>
        </form>
      </Modal>

      {/* Customer Detail */}
      <CustomerDetailModal
        customer={selectedCustomer}
        isOpen={!!selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
        onPayment={loadCustomers}
      />
    </div>
  );
};

export default CustomersPage;
