import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Search, Package, Truck, ArrowRight, RefreshCw, AlertTriangle, History } from 'lucide-react';
import api from '../lib/api';
import { Modal } from '../components/ui/Modal';
import { useToast } from '../components/ui/Toast';
import { formatNumber, formatDate, formatDateTime, MOVEMENT_TYPE_LABELS } from '../utils';
import type { Product, InventoryItem, InventoryMovement } from '../types';

const InventoryPage: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [movements, setMovements] = useState<InventoryMovement[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState<'stock' | 'movements' | 'low_stock'>('stock');
  const [showAdjust, setShowAdjust] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<InventoryItem | null>(null);
  const [adjustQty, setAdjustQty] = useState('');
  const [adjustType, setAdjustType] = useState<'add' | 'subtract' | 'set'>('add');
  const [adjustNote, setAdjustNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const toast = useToast();

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [invRes, movRes] = await Promise.all([
        api.get('/inventory'),
        api.get('/inventory/movements'),
      ]);
      if (invRes.data.success) setInventory(invRes.data.data);
      if (movRes.data.success) setMovements(movRes.data.data);
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const filtered = inventory.filter(item =>
    item.product?.name.toLowerCase().includes(search.toLowerCase())
  );

  const lowStock = inventory.filter(item =>
    item.product && item.quantity <= item.product.min_stock_alert
  );

  const handleAdjust = async () => {
    if (!selectedProduct || !adjustQty) { toast.error('أدخل الكمية'); return; }
    setSubmitting(true);
    try {
      await api.post('/inventory/adjust', {
        product_id: selectedProduct.product_id,
        branch_id: selectedProduct.branch_id,
        adjustment_type: adjustType,
        quantity: parseFloat(adjustQty),
        notes: adjustNote,
      });
      toast.success('تم تعديل المخزون بنجاح');
      setShowAdjust(false);
      setSelectedProduct(null);
      setAdjustQty('');
      setAdjustNote('');
      loadData();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'حدث خطأ');
    } finally { setSubmitting(false); }
  };

  const MOVEMENT_COLORS: Record<string, string> = {
    in: 'badge-success', out: 'badge-danger', return: 'badge-warning',
    transfer_in: 'badge-primary', transfer_out: 'badge-secondary', adjustment: 'badge-secondary',
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">إدارة المخزون</h1>
          <p className="page-subtitle">
            {formatNumber(inventory.length)} صنف •
            {lowStock.length > 0 && <span className="text-danger-600 font-bold mr-2">{lowStock.length} صنف قرب النفاد</span>}
          </p>
        </div>
        <button onClick={loadData} className="btn-secondary">
          <RefreshCw className="w-4 h-4" />تحديث
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-secondary-100 p-1 rounded-2xl w-fit">
        {[
          { id: 'stock', label: 'المخزون الحالي', icon: Package },
          { id: 'movements', label: 'حركات المخزون', icon: History },
          { id: 'low_stock', label: `تنبيهات النقص (${lowStock.length})`, icon: AlertTriangle },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              tab === t.id ? 'bg-white text-secondary-900 shadow-card' : 'text-secondary-600 hover:text-secondary-900'
            }`}
          >
            <t.icon className="w-4 h-4" />
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'stock' && (
        <>
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
                  <thead>
                    <tr>
                      <th>الصنف</th>
                      <th>الكمية المتاحة</th>
                      <th>الحد الأدنى</th>
                      <th>الحالة</th>
                      <th>إجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((item) => {
                      const isLow = item.quantity <= (item.product?.min_stock_alert || 0);
                      return (
                        <tr key={item.id}>
                          <td>
                            <p className="font-semibold">{item.product?.name}</p>
                            <p className="text-xs text-secondary-400">{item.product?.unit}</p>
                          </td>
                          <td>
                            <span className={`text-lg font-black ${isLow ? 'text-danger-600' : 'text-success-600'}`}>
                              {formatNumber(item.quantity)}
                            </span>
                          </td>
                          <td className="text-secondary-500">{formatNumber(item.product?.min_stock_alert || 0)}</td>
                          <td>
                            {isLow ? (
                              <span className="badge-danger flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" />نقص
                              </span>
                            ) : (
                              <span className="badge-success">كافي</span>
                            )}
                          </td>
                          <td>
                            <button
                              onClick={() => { setSelectedProduct(item); setShowAdjust(true); }}
                              className="btn-outline btn-sm"
                            >
                              تعديل الكمية
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}

      {tab === 'movements' && (
        <div className="card p-0 overflow-hidden">
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>الصنف</th>
                  <th>نوع الحركة</th>
                  <th>الكمية</th>
                  <th>قبل</th>
                  <th>بعد</th>
                  <th>ملاحظات</th>
                  <th>التاريخ</th>
                </tr>
              </thead>
              <tbody>
                {movements.map((m) => (
                  <tr key={m.id}>
                    <td className="font-semibold">{m.product?.name}</td>
                    <td><span className={`badge ${MOVEMENT_COLORS[m.movement_type]}`}>{MOVEMENT_TYPE_LABELS[m.movement_type]}</span></td>
                    <td className="font-bold">{m.movement_type === 'out' || m.movement_type === 'transfer_out' ? '-' : '+'}{formatNumber(m.quantity)}</td>
                    <td className="text-secondary-500">{formatNumber(m.quantity_before)}</td>
                    <td className="text-secondary-700 font-semibold">{formatNumber(m.quantity_after)}</td>
                    <td className="text-secondary-400 text-xs">{m.notes || '—'}</td>
                    <td className="text-xs text-secondary-400">{formatDateTime(m.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'low_stock' && (
        <div className="space-y-3">
          {lowStock.length === 0 ? (
            <div className="card text-center py-12">
              <Package className="w-12 h-12 text-success-300 mx-auto mb-3" />
              <p className="text-success-600 font-semibold">المخزون في مستوى جيد</p>
            </div>
          ) : (
            lowStock.map(item => (
              <div key={item.id} className="card flex items-center gap-4 p-4 border-r-4 border-danger-500">
                <AlertTriangle className="w-8 h-8 text-danger-500 flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-bold text-secondary-900">{item.product?.name}</p>
                  <p className="text-sm text-secondary-500">
                    الكمية الحالية: <span className="text-danger-600 font-bold">{item.quantity}</span> •
                    الحد الأدنى: {item.product?.min_stock_alert}
                  </p>
                </div>
                <button
                  onClick={() => { setSelectedProduct(item); setShowAdjust(true); }}
                  className="btn-primary btn-sm"
                >
                  إضافة كمية
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* Adjust Modal */}
      <Modal isOpen={showAdjust} onClose={() => { setShowAdjust(false); setSelectedProduct(null); }}
        title={`تعديل مخزون: ${selectedProduct?.product?.name}`}
        footer={
          <>
            <button onClick={() => { setShowAdjust(false); setSelectedProduct(null); }} className="btn-secondary">إلغاء</button>
            <button onClick={handleAdjust} disabled={submitting} className="btn-primary">
              {submitting ? <div className="w-4 h-4 spinner" /> : 'تأكيد التعديل'}
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="bg-secondary-50 p-4 rounded-xl">
            <p className="text-sm text-secondary-500">الكمية الحالية</p>
            <p className="text-2xl font-black text-secondary-900">{formatNumber(selectedProduct?.quantity || 0)}</p>
          </div>
          <div className="form-group">
            <label className="form-label">نوع التعديل</label>
            <select value={adjustType} onChange={(e) => setAdjustType(e.target.value as any)} className="form-select">
              <option value="add">إضافة للمخزون</option>
              <option value="subtract">سحب من المخزون</option>
              <option value="set">تعيين كمية محددة</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">الكمية</label>
            <input type="number" min="0" step="0.5" value={adjustQty} onChange={(e) => setAdjustQty(e.target.value)} className="form-input text-xl font-bold" />
          </div>
          <div className="form-group">
            <label className="form-label">سبب التعديل</label>
            <input value={adjustNote} onChange={(e) => setAdjustNote(e.target.value)} className="form-input" placeholder="مثال: جرد مخزن..." />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default InventoryPage;
