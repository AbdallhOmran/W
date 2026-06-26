import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Search, Truck, Package, DollarSign } from 'lucide-react';
import api from '../lib/api';
import { Modal } from '../components/ui/Modal';
import { useToast } from '../components/ui/Toast';
import { formatCurrency, formatDate, formatNumber } from '../utils';
import type { Purchase, Supplier, Product } from '../types';

interface PurchaseItemForm {
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  total: number;
}

const PurchasesPage: React.FC = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [supplier_id, setSupplierId] = useState('');
  const [paidAmount, setPaidAmount] = useState(0);
  const [notes, setNotes] = useState('');
  const [items, setItems] = useState<PurchaseItemForm[]>([{ product_id: '', product_name: '', quantity: 1, unit_price: 0, total: 0 }]);
  const [submitting, setSubmitting] = useState(false);
  const toast = useToast();

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [purRes, supRes, prodRes] = await Promise.all([
        api.get('/purchases'),
        api.get('/suppliers'),
        api.get('/products'),
      ]);
      if (purRes.data.success) setPurchases(purRes.data.data);
      if (supRes.data.success) setSuppliers(supRes.data.data);
      if (prodRes.data.success) setProducts(prodRes.data.data);
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const total = items.reduce((s, i) => s + i.total, 0);

  const addItem = () => setItems(prev => [...prev, { product_id: '', product_name: '', quantity: 1, unit_price: 0, total: 0 }]);
  const removeItem = (idx: number) => setItems(prev => prev.filter((_, i) => i !== idx));
  const updateItem = (idx: number, field: keyof PurchaseItemForm, value: any) => {
    setItems(prev => prev.map((item, i) => {
      if (i !== idx) return item;
      const updated = { ...item, [field]: value };
      if (field === 'product_id') {
        const prod = products.find(p => p.id === value);
        if (prod) {
          updated.product_name = prod.name;
          updated.unit_price = prod.base_price;
          updated.total = prod.base_price * updated.quantity;
        }
      }
      if (field === 'quantity' || field === 'unit_price') {
        updated.total = Math.round((updated.quantity || 0) * (updated.unit_price || 0) * 100) / 100;
      }
      return updated;
    }));
  };

  const handleSubmit = async () => {
    const validItems = items.filter(i => i.product_id && i.quantity > 0);
    if (validItems.length === 0) { toast.error('يجب إضافة صنف واحد على الأقل'); return; }
    setSubmitting(true);
    try {
      const res = await api.post('/purchases', { supplier_id, paid_amount: paidAmount, notes, items: validItems });
      if (res.data.success) {
        toast.success('تم تسجيل المشتريات وتحديث المخزون بنجاح');
        setShowCreate(false);
        setSupplierId(''); setPaidAmount(0); setNotes('');
        setItems([{ product_id: '', product_name: '', quantity: 1, unit_price: 0, total: 0 }]);
        loadData();
      }
    } catch (err: any) { toast.error(err.response?.data?.message || 'حدث خطأ'); }
    finally { setSubmitting(false); }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">المشتريات</h1>
          <p className="page-subtitle">{formatNumber(purchases.length)} عملية شراء</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="btn-primary">
          <Plus className="w-4 h-4" />تسجيل مشتريات
        </button>
      </div>

      <div className="card p-0 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16"><div className="w-10 h-10 spinner" /></div>
        ) : purchases.length === 0 ? (
          <div className="empty-state">
            <Truck className="empty-icon" />
            <h3 className="empty-title">لا توجد مشتريات مسجلة</h3>
            <button onClick={() => setShowCreate(true)} className="btn-primary"><Plus className="w-4 h-4" />تسجيل مشتريات</button>
          </div>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead><tr><th>رقم الشراء</th><th>المورد</th><th>التاريخ</th><th>الإجمالي</th><th>المدفوع</th><th>الباقي</th></tr></thead>
              <tbody>
                {purchases.map(p => (
                  <tr key={p.id}>
                    <td className="font-bold text-primary-600">{p.purchase_number}</td>
                    <td>{p.supplier?.name || 'غير محدد'}</td>
                    <td className="text-xs text-secondary-500">{formatDate(p.created_at)}</td>
                    <td className="font-bold">{formatCurrency(p.total)}</td>
                    <td className="text-success-600">{formatCurrency(p.paid_amount)}</td>
                    <td className={p.total - p.paid_amount > 0 ? 'text-danger-600 font-bold' : 'text-secondary-400'}>
                      {p.total - p.paid_amount > 0 ? formatCurrency(p.total - p.paid_amount) : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create Purchase Modal */}
      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="تسجيل مشتريات جديدة" size="xl"
        footer={
          <>
            <button onClick={() => setShowCreate(false)} className="btn-secondary" disabled={submitting}>إلغاء</button>
            <button onClick={handleSubmit} disabled={submitting} className="btn-primary">
              {submitting ? <div className="w-4 h-4 spinner" /> : 'تسجيل وتحديث المخزون'}
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">المورد</label>
              <select value={supplier_id} onChange={(e) => setSupplierId(e.target.value)} className="form-select">
                <option value="">-- اختر المورد (اختياري) --</option>
                {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">المبلغ المدفوع</label>
              <input type="number" min="0" step="0.01" value={paidAmount} onChange={(e) => setPaidAmount(parseFloat(e.target.value) || 0)} className="form-input" />
            </div>
          </div>

          {/* Items */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-bold text-secondary-700">الأصناف</h4>
              <button type="button" onClick={addItem} className="btn-outline btn-sm"><Plus className="w-3.5 h-3.5" />إضافة</button>
            </div>
            <div className="overflow-x-auto border border-secondary-200 rounded-xl">
              <table className="w-full text-sm">
                <thead className="bg-secondary-50">
                  <tr>
                    <th className="p-2 text-right text-xs font-bold text-secondary-600">الصنف</th>
                    <th className="p-2 text-center text-xs font-bold text-secondary-600">الكمية</th>
                    <th className="p-2 text-center text-xs font-bold text-secondary-600">سعر الشراء</th>
                    <th className="p-2 text-center text-xs font-bold text-secondary-600">الإجمالي</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, idx) => (
                    <tr key={idx} className="border-t border-secondary-100">
                      <td className="p-2">
                        <select
                          value={item.product_id}
                          onChange={(e) => updateItem(idx, 'product_id', e.target.value)}
                          className="form-select text-sm py-1.5"
                        >
                          <option value="">-- اختر --</option>
                          {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                        </select>
                      </td>
                      <td className="p-2 w-20">
                        <input type="number" min="0" step="0.5" value={item.quantity} onChange={(e) => updateItem(idx, 'quantity', parseFloat(e.target.value) || 0)} className="form-input text-sm py-1.5 text-center" />
                      </td>
                      <td className="p-2 w-28">
                        <input type="number" min="0" step="0.01" value={item.unit_price} onChange={(e) => updateItem(idx, 'unit_price', parseFloat(e.target.value) || 0)} className="form-input text-sm py-1.5 text-center" />
                      </td>
                      <td className="p-2 text-center font-bold">{formatCurrency(item.total)}</td>
                      <td className="p-2">
                        <button type="button" onClick={() => removeItem(idx)} className="btn-ghost btn-icon btn-sm text-danger-400">×</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Total */}
          <div className="bg-secondary-50 rounded-xl p-4 flex justify-between items-center">
            <span className="font-semibold text-secondary-700">الإجمالي:</span>
            <span className="text-xl font-black text-secondary-900">{formatCurrency(total)}</span>
          </div>

          <div className="form-group">
            <label className="form-label">ملاحظات</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="form-input resize-none" rows={2} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PurchasesPage;
