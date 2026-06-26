import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Search, Edit2, Eye, Truck, Package, DollarSign } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import api from '../lib/api';
import { Modal } from '../components/ui/Modal';
import { useToast } from '../components/ui/Toast';
import { formatCurrency, formatDate, formatNumber } from '../utils';
import type { Supplier, Purchase } from '../types';

const supplierSchema = z.object({
  name: z.string().min(2, 'الاسم مطلوب'),
  phone: z.string().optional(),
  address: z.string().optional(),
  notes: z.string().optional(),
});
type SupplierForm = z.infer<typeof supplierSchema>;

const SuppliersPage: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editSupplier, setEditSupplier] = useState<Supplier | null>(null);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [supplierPurchases, setSupplierPurchases] = useState<Purchase[]>([]);
  const toast = useToast();

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<SupplierForm>({
    resolver: zodResolver(supplierSchema),
  });

  const loadSuppliers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/suppliers', { params: { search } });
      if (res.data.success) setSuppliers(res.data.data);
    } finally { setLoading(false); }
  }, [search]);

  useEffect(() => { loadSuppliers(); }, [loadSuppliers]);

  useEffect(() => {
    if (editSupplier) reset({ name: editSupplier.name, phone: editSupplier.phone || '', address: editSupplier.address || '', notes: editSupplier.notes || '' });
    else reset({ name: '', phone: '', address: '', notes: '' });
  }, [editSupplier, reset]);

  const viewSupplier = async (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    try {
      const res = await api.get(`/suppliers/${supplier.id}/purchases`);
      if (res.data.success) setSupplierPurchases(res.data.data);
    } catch { setSupplierPurchases([]); }
  };

  const onSubmit = async (data: SupplierForm) => {
    try {
      if (editSupplier) { await api.put(`/suppliers/${editSupplier.id}`, data); toast.success('تم تحديث المورد'); }
      else { await api.post('/suppliers', data); toast.success('تم إضافة المورد'); }
      setShowForm(false); setEditSupplier(null); loadSuppliers();
    } catch (err: any) { toast.error(err.response?.data?.message || 'حدث خطأ'); }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">الموردون</h1>
          <p className="page-subtitle">{formatNumber(suppliers.length)} مورد</p>
        </div>
        <button onClick={() => { setEditSupplier(null); setShowForm(true); }} className="btn-primary">
          <Plus className="w-4 h-4" />إضافة مورد
        </button>
      </div>

      <div className="card p-4">
        <div className="relative">
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="بحث..." className="form-input pr-10" />
        </div>
      </div>

      <div className="card p-0 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16"><div className="w-10 h-10 spinner" /></div>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead><tr><th>الاسم</th><th>الهاتف</th><th>المديونية</th><th>إجراءات</th></tr></thead>
              <tbody>
                {suppliers.map(s => (
                  <tr key={s.id}>
                    <td className="font-semibold">{s.name}</td>
                    <td className="ltr-number text-secondary-500">{s.phone || '—'}</td>
                    <td className={s.total_debt > 0 ? 'text-danger-600 font-bold' : 'text-secondary-400'}>
                      {s.total_debt > 0 ? formatCurrency(s.total_debt) : 'لا يوجد'}
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <button onClick={() => viewSupplier(s)} className="btn-ghost btn-icon btn-sm text-primary-600"><Eye className="w-4 h-4" /></button>
                        <button onClick={() => { setEditSupplier(s); setShowForm(true); }} className="btn-ghost btn-icon btn-sm"><Edit2 className="w-4 h-4" /></button>
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
      <Modal isOpen={showForm} onClose={() => { setShowForm(false); setEditSupplier(null); }} title={editSupplier ? 'تعديل مورد' : 'إضافة مورد'}
        footer={<>
          <button onClick={() => { setShowForm(false); setEditSupplier(null); }} className="btn-secondary">إلغاء</button>
          <button form="supplier-form" type="submit" disabled={isSubmitting} className="btn-primary">
            {isSubmitting ? <div className="w-4 h-4 spinner" /> : 'حفظ'}
          </button>
        </>}
      >
        <form id="supplier-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="form-group">
            <label className="form-label">الاسم *</label>
            <input {...register('name')} className="form-input" placeholder="اسم المورد" />
            {errors.name && <p className="form-error">{errors.name.message}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">الهاتف</label>
              <input {...register('phone')} className="form-input" dir="ltr" />
            </div>
            <div className="form-group">
              <label className="form-label">العنوان</label>
              <input {...register('address')} className="form-input" />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">ملاحظات</label>
            <textarea {...register('notes')} className="form-input resize-none" rows={2} />
          </div>
        </form>
      </Modal>

      {/* Supplier Detail */}
      {selectedSupplier && (
        <Modal isOpen={!!selectedSupplier} onClose={() => setSelectedSupplier(null)} title={`كشف حساب - ${selectedSupplier.name}`} size="lg">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="card p-4 text-center">
                <p className="text-xs text-secondary-500">إجمالي المشتريات</p>
                <p className="font-black text-xl">{formatCurrency(supplierPurchases.reduce((s, p) => s + p.total, 0))}</p>
              </div>
              <div className={`card p-4 text-center ${selectedSupplier.total_debt > 0 ? 'bg-danger-50' : ''}`}>
                <p className="text-xs text-secondary-500">المديونية</p>
                <p className={`font-black text-xl ${selectedSupplier.total_debt > 0 ? 'text-danger-600' : 'text-secondary-900'}`}>
                  {formatCurrency(selectedSupplier.total_debt)}
                </p>
              </div>
            </div>
            <div className="table-container">
              <table className="table">
                <thead><tr><th>رقم الشراء</th><th>التاريخ</th><th>الإجمالي</th><th>المدفوع</th></tr></thead>
                <tbody>
                  {supplierPurchases.map(p => (
                    <tr key={p.id}>
                      <td className="font-bold text-primary-600">{p.purchase_number}</td>
                      <td className="text-xs">{formatDate(p.created_at)}</td>
                      <td>{formatCurrency(p.total)}</td>
                      <td className="text-success-600">{formatCurrency(p.paid_amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default SuppliersPage;
