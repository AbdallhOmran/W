import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Plus, Search, Printer, Trash2, ShoppingCart,
  User, Package, BoxSelect, X, ChevronDown, Loader2,
  AlertCircle, CheckCircle, DollarSign, Calendar, FileText
} from 'lucide-react';
import { useForm, useFieldArray, useWatch, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import api from '../lib/api';
import { Modal, ConfirmDialog } from '../components/ui/Modal';
import { useToast } from '../components/ui/Toast';
import {
  formatCurrency, formatNumber, formatDate, formatDateTime,
  formatFullDate, PAYMENT_TYPE_LABELS, INVOICE_STATUS_LABELS
} from '../utils';
import type { Invoice, Customer, Product, InvoiceItem } from '../types';
import { InvoicePDF } from '../components/InvoicePDF';

// ============================================================
// Invoice Item Row Component
// ============================================================
const InvoiceItemRow: React.FC<{
  index: number;
  item: Partial<InvoiceItem>;
  paymentType: 'cash' | 'credit';
  onRemove: () => void;
  onChange: (item: Partial<InvoiceItem>) => void;
  products: Product[];
}> = ({ index, item, paymentType, onRemove, onChange, products }) => {
  const [search, setSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) && p.is_active
  );

  const selectedProduct = products.find(p => p.id === item.product_id);
  const pharmacistPrice = selectedProduct
    ? (paymentType === 'cash' ? selectedProduct.pharmacist_cash_price : selectedProduct.pharmacist_credit_price)
    : 0;
  const publicPrice = selectedProduct?.public_price || 0;
  const boxQty = selectedProduct?.box_quantity || 1;
  const quantity = item.quantity || 0;
  const isBox = item.is_box || false;
  const quantityUnits = isBox ? quantity * boxQty : quantity;
  const total = Math.round(pharmacistPrice * quantityUnits * 100) / 100;

  const selectProduct = (product: Product) => {
    const price = paymentType === 'cash' ? product.pharmacist_cash_price : product.pharmacist_credit_price;
    onChange({
      ...item,
      product_id: product.id,
      product_name: product.name,
      public_price: product.public_price,
      pharmacist_price: price,
      box_quantity: product.box_quantity,
      is_box: false,
      quantity: 1,
      quantity_units: 1,
      total: price,
    });
    setSearch(product.name);
    setShowDropdown(false);
  };

  useEffect(() => {
    if (selectedProduct) {
      const price = paymentType === 'cash'
        ? selectedProduct.pharmacist_cash_price
        : selectedProduct.pharmacist_credit_price;
      onChange({
        ...item,
        pharmacist_price: price,
        public_price: selectedProduct.public_price,
        quantity_units: isBox ? quantity * selectedProduct.box_quantity : quantity,
        total: Math.round(price * (isBox ? quantity * selectedProduct.box_quantity : quantity) * 100) / 100,
      });
    }
  }, [paymentType]);

  return (
    <tr className="border-b border-secondary-100">
      {/* Product Search */}
      <td className="p-2 min-w-[200px]">
        <div className="relative" ref={dropdownRef}>
          <input
            value={search || (selectedProduct?.name ?? '')}
            onChange={(e) => { setSearch(e.target.value); setShowDropdown(true); }}
            onFocus={() => setShowDropdown(true)}
            placeholder="ابحث عن صنف..."
            className="form-input text-sm py-1.5"
          />
          {showDropdown && filteredProducts.length > 0 && (
            <div className="absolute top-full right-0 left-0 z-50 bg-white border border-secondary-200 rounded-xl shadow-elevated mt-1 max-h-48 overflow-y-auto">
              {filteredProducts.map(p => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => selectProduct(p)}
                  className="w-full text-right px-3 py-2 hover:bg-secondary-50 text-sm flex items-center gap-2 border-b border-secondary-50 last:border-0"
                >
                  <Package className="w-3.5 h-3.5 text-secondary-400 flex-shrink-0" />
                  <span className="flex-1">{p.name}</span>
                  <span className="text-xs text-secondary-400">{formatCurrency(paymentType === 'cash' ? p.pharmacist_cash_price : p.pharmacist_credit_price)}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </td>

      {/* Sell by box toggle */}
      <td className="p-2 w-24 text-center">
        <label className="flex items-center gap-1.5 cursor-pointer justify-center">
          <input
            type="checkbox"
            checked={isBox}
            onChange={(e) => {
              const newIsBox = e.target.checked;
              const newQtyUnits = newIsBox ? quantity * boxQty : quantity;
              onChange({
                ...item,
                is_box: newIsBox,
                box_quantity: boxQty,
                quantity_units: newQtyUnits,
                total: Math.round(pharmacistPrice * newQtyUnits * 100) / 100,
              });
            }}
            className="rounded accent-primary-600"
          />
          <span className="text-xs text-secondary-600">علبة</span>
        </label>
        {isBox && <p className="text-xs text-secondary-400 mt-0.5">{boxQty} قطعة</p>}
      </td>

      {/* Quantity */}
      <td className="p-2 w-20">
        <input
          type="number"
          min="0.5"
          step="0.5"
          value={quantity || ''}
          onChange={(e) => {
            const q = parseFloat(e.target.value) || 0;
            const qUnits = isBox ? q * boxQty : q;
            onChange({
              ...item,
              quantity: q,
              quantity_units: qUnits,
              total: Math.round(pharmacistPrice * qUnits * 100) / 100,
            });
          }}
          className="form-input text-sm py-1.5 text-center"
        />
      </td>

      {/* Public Price */}
      <td className="p-2 w-28 text-center">
        <span className="text-sm text-secondary-600">{formatCurrency(publicPrice)}</span>
      </td>

      {/* Pharmacist Price */}
      <td className="p-2 w-28 text-center">
        <span className="text-sm font-bold text-primary-700">{formatCurrency(pharmacistPrice)}</span>
      </td>

      {/* Total */}
      <td className="p-2 w-28 text-center">
        <span className="text-sm font-bold text-secondary-900">{formatCurrency(total)}</span>
      </td>

      {/* Remove */}
      <td className="p-2 w-10">
        <button type="button" onClick={onRemove} className="btn-ghost btn-icon btn-sm text-danger-400 hover:text-danger-600">
          <X className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
};

// ============================================================
// Create Invoice Modal
// ============================================================
const CreateInvoiceModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  customers: Customer[];
  products: Product[];
}> = ({ isOpen, onClose, onSuccess, customers, products }) => {
  const toast = useToast();
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [paymentType, setPaymentType] = useState<'cash' | 'credit'>('cash');
  const [items, setItems] = useState<Partial<InvoiceItem>[]>([{}]);
  const [paidAmount, setPaidAmount] = useState(0);
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showPDF, setShowPDF] = useState(false);
  const [createdInvoice, setCreatedInvoice] = useState<Invoice | null>(null);

  const total = items.reduce((sum, item) => sum + (item.total || 0), 0);
  const remaining = Math.max(0, total - paidAmount);

  useEffect(() => {
    if (selectedCustomer) {
      setPaymentType(selectedCustomer.payment_type);
    }
  }, [selectedCustomer]);

  const addItem = () => setItems(prev => [...prev, {}]);
  const removeItem = (idx: number) => setItems(prev => prev.filter((_, i) => i !== idx));
  const updateItem = (idx: number, item: Partial<InvoiceItem>) => {
    setItems(prev => prev.map((it, i) => i === idx ? item : it));
  };

  const handleSubmit = async () => {
    if (!selectedCustomer) { toast.error('يجب اختيار العميل'); return; }
    const validItems = items.filter(it => it.product_id && (it.quantity || 0) > 0);
    if (validItems.length === 0) { toast.error('يجب إضافة صنف واحد على الأقل'); return; }

    setSubmitting(true);
    try {
      const res = await api.post('/invoices', {
        customer_id: selectedCustomer.id,
        payment_type: paymentType,
        paid_amount: paidAmount,
        notes,
        items: validItems.map(it => ({
          product_id: it.product_id,
          product_name: it.product_name,
          is_box: it.is_box || false,
          box_quantity: it.box_quantity || 1,
          quantity: it.quantity,
          quantity_units: it.quantity_units,
          public_price: it.public_price,
          pharmacist_price: it.pharmacist_price,
          total: it.total,
        })),
      });

      if (res.data.success) {
        toast.success('تم إنشاء الفاتورة بنجاح');
        setCreatedInvoice(res.data.data);
        setShowPDF(true);
        onSuccess();
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'حدث خطأ في إنشاء الفاتورة');
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSelectedCustomer(null);
    setPaymentType('cash');
    setItems([{}]);
    setPaidAmount(0);
    setNotes('');
    setCreatedInvoice(null);
    setShowPDF(false);
  };

  if (showPDF && createdInvoice) {
    return (
      <Modal isOpen={true} onClose={() => { resetForm(); onClose(); }} title="الفاتورة جاهزة" size="lg">
        <InvoicePDF invoice={createdInvoice} />
        <div className="flex justify-end gap-3 mt-4">
          <button onClick={() => { resetForm(); onClose(); }} className="btn-secondary">إغلاق</button>
          <button onClick={() => window.print()} className="btn-primary">
            <Printer className="w-4 h-4" />
            طباعة الفاتورة
          </button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="فاتورة بيع جديدة" size="xl"
      footer={
        <>
          <button onClick={onClose} className="btn-secondary" disabled={submitting}>إلغاء</button>
          <button onClick={handleSubmit} className="btn-primary" disabled={submitting}>
            {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> جاري الحفظ...</> : 'حفظ وعرض الفاتورة'}
          </button>
        </>
      }
    >
      <div className="space-y-4">
        {/* Customer & Payment Type */}
        <div className="grid grid-cols-2 gap-4">
          <div className="form-group">
            <label className="form-label">العميل *</label>
            <select
              className="form-select"
              value={selectedCustomer?.id || ''}
              onChange={(e) => {
                const c = customers.find(c => c.id === e.target.value);
                setSelectedCustomer(c || null);
              }}
            >
              <option value="">-- اختر العميل --</option>
              {customers.filter(c => c.is_active).map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">نوع الدفع *</label>
            <select
              className="form-select"
              value={paymentType}
              onChange={(e) => setPaymentType(e.target.value as 'cash' | 'credit')}
            >
              <option value="cash">كاش</option>
              <option value="credit">آجل</option>
            </select>
          </div>
        </div>

        {selectedCustomer && (
          <div className="alert-info flex items-center gap-3">
            <User className="w-4 h-4 flex-shrink-0" />
            <div>
              <span className="font-bold">{selectedCustomer.name}</span>
              {selectedCustomer.total_debt > 0 && (
                <span className="text-danger-600 mr-3">
                  • المديونية: {formatCurrency(selectedCustomer.total_debt)}
                </span>
              )}
              <span className="badge-primary mr-2">
                {paymentType === 'cash' ? 'سعر الكاش' : 'سعر الآجل'}
              </span>
            </div>
          </div>
        )}

        {/* Items Table */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-bold text-secondary-700">بنود الفاتورة</h4>
            <button type="button" onClick={addItem} className="btn-outline btn-sm">
              <Plus className="w-3.5 h-3.5" />
              إضافة صنف
            </button>
          </div>
          <div className="overflow-x-auto md:overflow-visible border border-secondary-200 rounded-xl min-h-[220px]">
            <table className="w-full text-sm">
              <thead className="bg-secondary-50">
                <tr>
                  <th className="p-2 text-right text-xs font-bold text-secondary-600">الصنف</th>
                  <th className="p-2 text-center text-xs font-bold text-secondary-600">علبة</th>
                  <th className="p-2 text-center text-xs font-bold text-secondary-600">الكمية</th>
                  <th className="p-2 text-center text-xs font-bold text-secondary-600">سعر الجمهور</th>
                  <th className="p-2 text-center text-xs font-bold text-secondary-600">سعر الصيدلي</th>
                  <th className="p-2 text-center text-xs font-bold text-secondary-600">الإجمالي</th>
                  <th className="p-2" />
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => (
                  <InvoiceItemRow
                    key={idx}
                    index={idx}
                    item={item}
                    paymentType={paymentType}
                    onRemove={() => removeItem(idx)}
                    onChange={(updated) => updateItem(idx, updated)}
                    products={products}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Totals */}
        <div className="bg-secondary-50 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-secondary-600 font-medium">الإجمالي الكلي:</span>
            <span className="text-xl font-black text-secondary-900">{formatCurrency(total)}</span>
          </div>

          <div className="form-group">
            <label className="form-label">المبلغ المدفوع عند الاستلام</label>
            <input
              type="number"
              min="0"
              max={total}
              step="0.01"
              value={paidAmount}
              onChange={(e) => setPaidAmount(Math.min(parseFloat(e.target.value) || 0, total))}
              className="form-input font-bold text-success-700"
            />
          </div>

          {remaining > 0 && (
            <div className="flex items-center justify-between text-sm bg-danger-50 p-3 rounded-xl border border-danger-100">
              <span className="text-danger-700 font-bold flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" />
                المتبقي (آجل):
              </span>
              <span className="text-danger-700 font-black">{formatCurrency(remaining)}</span>
            </div>
          )}

          {remaining === 0 && total > 0 && (
            <div className="flex items-center gap-2 text-success-600 text-sm font-semibold">
              <CheckCircle className="w-4 h-4" />
              مدفوع بالكامل
            </div>
          )}
        </div>

        {/* Notes */}
        <div className="form-group">
          <label className="form-label">ملاحظات</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="form-input resize-none"
            rows={2}
            placeholder="ملاحظات اختيارية..."
          />
        </div>
      </div>
    </Modal>
  );
};

// ============================================================
// Invoices Page
// ============================================================
const InvoicesPage: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const toast = useToast();

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [invRes, custRes, prodRes] = await Promise.all([
        api.get('/invoices', { params: { search, status: statusFilter } }),
        api.get('/customers'),
        api.get('/products'),
      ]);
      if (invRes.data.success) setInvoices(invRes.data.data);
      if (custRes.data.success) setCustomers(custRes.data.data);
      if (prodRes.data.success) setProducts(prodRes.data.data);
    } catch {
      toast.error('حدث خطأ في تحميل البيانات');
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => { loadData(); }, [loadData]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">المبيعات والفواتير</h1>
          <p className="page-subtitle">{formatNumber(invoices.length)} فاتورة</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="btn-primary">
          <Plus className="w-4 h-4" />
          فاتورة جديدة
        </button>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="بحث برقم الفاتورة أو العميل..."
              className="form-input pr-10"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="form-select w-full sm:w-40"
          >
            <option value="">كل الحالات</option>
            <option value="active">نشطة</option>
            <option value="partially_returned">مرتجع جزئي</option>
            <option value="fully_returned">مرتجع كامل</option>
          </select>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="card p-0 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-10 h-10 spinner" />
          </div>
        ) : invoices.length === 0 ? (
          <div className="empty-state">
            <ShoppingCart className="empty-icon" />
            <h3 className="empty-title">لا توجد فواتير</h3>
            <p className="empty-text">ابدأ بإنشاء أول فاتورة</p>
            <button onClick={() => setShowCreate(true)} className="btn-primary">
              <Plus className="w-4 h-4" />
              فاتورة جديدة
            </button>
          </div>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>رقم الفاتورة</th>
                  <th>العميل</th>
                  <th>التاريخ</th>
                  <th>نوع الدفع</th>
                  <th>الإجمالي</th>
                  <th>المدفوع</th>
                  <th>المتبقي</th>
                  <th>الحالة</th>
                  <th>إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr key={inv.id}>
                    <td className="font-bold text-primary-700">{inv.invoice_number}</td>
                    <td className="font-semibold">{inv.customer?.name}</td>
                    <td className="text-secondary-500 text-xs">{formatDateTime(inv.created_at)}</td>
                    <td>
                      <span className={`badge ${inv.payment_type === 'cash' ? 'badge-success' : 'badge-warning'}`}>
                        {PAYMENT_TYPE_LABELS[inv.payment_type]}
                      </span>
                    </td>
                    <td className="font-bold">{formatCurrency(inv.total)}</td>
                    <td className="text-success-600 font-medium">{formatCurrency(inv.paid_amount)}</td>
                    <td className={inv.remaining > 0 ? 'text-danger-600 font-bold' : 'text-secondary-400'}>
                      {inv.remaining > 0 ? formatCurrency(inv.remaining) : '—'}
                    </td>
                    <td>
                      <span className={`badge ${
                        inv.status === 'active' ? 'badge-success' :
                        inv.status === 'partially_returned' ? 'badge-warning' :
                        'badge-secondary'
                      }`}>
                        {INVOICE_STATUS_LABELS[inv.status]}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setSelectedInvoice(inv)}
                          className="btn-ghost btn-icon btn-sm text-primary-600"
                          title="عرض وطباعة"
                        >
                          <Printer className="w-4 h-4" />
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

      {/* Create Invoice Modal */}
      <CreateInvoiceModal
        isOpen={showCreate}
        onClose={() => setShowCreate(false)}
        onSuccess={loadData}
        customers={customers}
        products={products}
      />

      {/* View Invoice PDF Modal */}
      {selectedInvoice && (
        <Modal
          isOpen={!!selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
          title={`فاتورة ${selectedInvoice.invoice_number}`}
          size="lg"
          footer={
            <>
              <button onClick={() => setSelectedInvoice(null)} className="btn-secondary">إغلاق</button>
              <button onClick={() => window.print()} className="btn-primary">
                <Printer className="w-4 h-4" />
                طباعة
              </button>
            </>
          }
        >
          <InvoicePDF invoice={selectedInvoice} />
        </Modal>
      )}
    </div>
  );
};

export default InvoicesPage;
