import React, { useState, useEffect, useCallback } from 'react';
import {
  Plus, Search, Edit2, Trash2, Package, ChevronDown,
  TrendingUp, AlertTriangle, Eye, RefreshCw, Filter,
  Calculator, BoxSelect
} from 'lucide-react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import api from '../lib/api';
import { Modal, ConfirmDialog } from '../components/ui/Modal';
import { useToast } from '../components/ui/Toast';
import {
  formatCurrency, formatNumber, formatDate,
  calcPharmacistPrice, calcDiscountPercent
} from '../utils';
import type { Product, Category } from '../types';

// ============================================================
// Schema
// ============================================================
const productSchema = z.object({
  name: z.string().min(2, 'اسم الصنف مطلوب (2 حرف على الأقل)'),
  category_id: z.string().optional(),
  barcode: z.string().optional(),
  unit: z.string().min(1, 'وحدة القياس مطلوبة'),
  base_price: z.coerce.number().min(0, 'السعر لا يمكن أن يكون سالباً'),
  public_price: z.coerce.number().min(0, 'السعر لا يمكن أن يكون سالباً'),
  cash_discount_percent: z.coerce.number().min(0).max(100),
  credit_discount_percent: z.coerce.number().min(0).max(100),
  pharmacist_cash_price: z.coerce.number().min(0),
  pharmacist_credit_price: z.coerce.number().min(0),
  box_quantity: z.coerce.number().min(1, 'يجب أن تكون الكمية 1 على الأقل'),
  min_stock_alert: z.coerce.number().min(0),
  notes: z.string().optional(),
});

type ProductForm = z.infer<typeof productSchema>;

// ============================================================
// ProductFormModal
// ============================================================
const ProductFormModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editProduct?: Product | null;
  categories: Category[];
}> = ({ isOpen, onClose, onSuccess, editProduct, categories }) => {
  const toast = useToast();
  const isEdit = !!editProduct;

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, control, setValue, getValues } =
    useForm<ProductForm>({
      resolver: zodResolver(productSchema),
      defaultValues: {
        unit: 'قطعة',
        box_quantity: 1,
        min_stock_alert: 0,
        cash_discount_percent: 0,
        credit_discount_percent: 0,
        pharmacist_cash_price: 0,
        pharmacist_credit_price: 0,
        base_price: 0,
        public_price: 0,
      },
    });

  // Watch for auto-calculation
  const watchedPublicPrice = useWatch({ control, name: 'public_price' });
  const watchedCashDiscount = useWatch({ control, name: 'cash_discount_percent' });
  const watchedCreditDiscount = useWatch({ control, name: 'credit_discount_percent' });
  const watchedCashPrice = useWatch({ control, name: 'pharmacist_cash_price' });
  const watchedCreditPrice = useWatch({ control, name: 'pharmacist_credit_price' });

  // Auto-calc cash price from discount
  useEffect(() => {
    if (watchedPublicPrice > 0 && watchedCashDiscount >= 0) {
      setValue('pharmacist_cash_price', calcPharmacistPrice(watchedPublicPrice, watchedCashDiscount));
    }
  }, [watchedPublicPrice, watchedCashDiscount]);

  // Auto-calc credit price from discount
  useEffect(() => {
    if (watchedPublicPrice > 0 && watchedCreditDiscount >= 0) {
      setValue('pharmacist_credit_price', calcPharmacistPrice(watchedPublicPrice, watchedCreditDiscount));
    }
  }, [watchedPublicPrice, watchedCreditDiscount]);

  // Auto-calc cash discount from pharmacist price
  const handleCashPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cashPrice = parseFloat(e.target.value) || 0;
    const pubPrice = getValues('public_price');
    if (pubPrice > 0 && cashPrice > 0) {
      setValue('cash_discount_percent', calcDiscountPercent(pubPrice, cashPrice));
    }
    setValue('pharmacist_cash_price', cashPrice);
  };

  // Auto-calc credit discount from pharmacist price
  const handleCreditPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const creditPrice = parseFloat(e.target.value) || 0;
    const pubPrice = getValues('public_price');
    if (pubPrice > 0 && creditPrice > 0) {
      setValue('credit_discount_percent', calcDiscountPercent(pubPrice, creditPrice));
    }
    setValue('pharmacist_credit_price', creditPrice);
  };

  useEffect(() => {
    if (editProduct) {
      reset({
        name: editProduct.name,
        category_id: editProduct.category_id || '',
        barcode: editProduct.barcode || '',
        unit: editProduct.unit,
        base_price: editProduct.base_price,
        public_price: editProduct.public_price,
        cash_discount_percent: editProduct.cash_discount_percent,
        credit_discount_percent: editProduct.credit_discount_percent,
        pharmacist_cash_price: editProduct.pharmacist_cash_price,
        pharmacist_credit_price: editProduct.pharmacist_credit_price,
        box_quantity: editProduct.box_quantity,
        min_stock_alert: editProduct.min_stock_alert,
        notes: editProduct.notes || '',
      });
    } else {
      reset({ unit: 'قطعة', box_quantity: 1, min_stock_alert: 0 });
    }
  }, [editProduct, reset]);

  const onSubmit = async (data: ProductForm) => {
    try {
      if (isEdit) {
        await api.put(`/products/${editProduct!.id}`, data);
        toast.success('تم تحديث الصنف بنجاح');
      } else {
        await api.post('/products', data);
        toast.success('تم إضافة الصنف بنجاح');
      }
      onSuccess();
      onClose();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'حدث خطأ');
    }
  };

  const profitCash = (getValues('pharmacist_cash_price') || 0) - (getValues('base_price') || 0);
  const profitCredit = (getValues('pharmacist_credit_price') || 0) - (getValues('base_price') || 0);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'تعديل صنف' : 'إضافة صنف جديد'}
      size="lg"
      footer={
        <>
          <button type="button" onClick={onClose} className="btn-secondary">إلغاء</button>
          <button
            type="submit"
            form="product-form"
            disabled={isSubmitting}
            className="btn-primary"
          >
            {isSubmitting ? <div className="w-4 h-4 spinner" /> : (isEdit ? 'حفظ التعديلات' : 'إضافة الصنف')}
          </button>
        </>
      }
    >
      <form id="product-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Basic Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="form-group col-span-2">
            <label className="form-label">اسم الصنف *</label>
            <input {...register('name')} className="form-input" placeholder="مثال: قياس ضغط أوتوماتيك" />
            {errors.name && <p className="form-error">{errors.name.message}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">التصنيف</label>
            <select {...register('category_id')} className="form-select">
              <option value="">-- بدون تصنيف --</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">الوحدة *</label>
            <select {...register('unit')} className="form-select">
              <option>قطعة</option>
              <option>علبة</option>
              <option>كرتون</option>
              <option>زجاجة</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">الباركود</label>
            <input {...register('barcode')} className="form-input" placeholder="اختياري" dir="ltr" />
          </div>

          <div className="form-group">
            <label className="form-label flex items-center gap-1">
              <BoxSelect className="w-3.5 h-3.5" />
              عدد القطع في العلبة *
            </label>
            <input {...register('box_quantity')} type="number" min="1" className="form-input" />
            {errors.box_quantity && <p className="form-error">{errors.box_quantity.message}</p>}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-secondary-100 pt-4">
          <h4 className="text-sm font-bold text-secondary-700 mb-4 flex items-center gap-2">
            <Calculator className="w-4 h-4 text-primary-600" />
            الأسعار والخصومات
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">السعر الأساسي (شراء) *</label>
              <input {...register('base_price')} type="number" step="0.01" min="0" className="form-input" placeholder="0.00" />
              {errors.base_price && <p className="form-error">{errors.base_price.message}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">سعر الجمهور *</label>
              <input {...register('public_price')} type="number" step="0.01" min="0" className="form-input" placeholder="0.00" />
              {errors.public_price && <p className="form-error">{errors.public_price.message}</p>}
            </div>
          </div>

          {/* Cash Price Row */}
          <div className="bg-blue-50 rounded-xl p-4 mt-3 space-y-3">
            <p className="text-xs font-bold text-blue-700 mb-2">💵 الكاش</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="form-group">
                <label className="form-label text-xs">خصم الكاش %</label>
                <input {...register('cash_discount_percent')} type="number" step="0.01" min="0" max="100" className="form-input text-sm" placeholder="0" />
              </div>
              <div className="form-group">
                <label className="form-label text-xs">سعر الصيدلي (كاش)</label>
                <input
                  {...register('pharmacist_cash_price')}
                  type="number" step="0.01" min="0"
                  className="form-input text-sm font-bold text-blue-700 bg-blue-50"
                  onChange={handleCashPriceChange}
                  placeholder="0.00"
                />
              </div>
            </div>
            <p className="text-xs text-blue-600">
              ربح الكاش: <span className={`font-bold ${watchedCashPrice - getValues('base_price') >= 0 ? 'text-success-600' : 'text-danger-500'}`}>
                {formatCurrency(watchedCashPrice - (getValues('base_price') || 0))}
              </span> للقطعة
            </p>
          </div>

          {/* Credit Price Row */}
          <div className="bg-orange-50 rounded-xl p-4 mt-3 space-y-3">
            <p className="text-xs font-bold text-orange-700 mb-2">📅 الآجل</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="form-group">
                <label className="form-label text-xs">خصم الآجل %</label>
                <input {...register('credit_discount_percent')} type="number" step="0.01" min="0" max="100" className="form-input text-sm" placeholder="0" />
              </div>
              <div className="form-group">
                <label className="form-label text-xs">سعر الصيدلي (آجل)</label>
                <input
                  {...register('pharmacist_credit_price')}
                  type="number" step="0.01" min="0"
                  className="form-input text-sm font-bold text-orange-700 bg-orange-50"
                  onChange={handleCreditPriceChange}
                  placeholder="0.00"
                />
              </div>
            </div>
            <p className="text-xs text-orange-600">
              ربح الآجل: <span className={`font-bold ${watchedCreditPrice - getValues('base_price') >= 0 ? 'text-success-600' : 'text-danger-500'}`}>
                {formatCurrency(watchedCreditPrice - (getValues('base_price') || 0))}
              </span> للقطعة
            </p>
          </div>
        </div>

        {/* Alerts */}
        <div className="form-group">
          <label className="form-label flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5 text-warning-500" />
            الحد الأدنى للمخزون (تنبيه)
          </label>
          <input {...register('min_stock_alert')} type="number" min="0" className="form-input" placeholder="0" />
        </div>

        {/* Notes */}
        <div className="form-group">
          <label className="form-label">ملاحظات</label>
          <textarea {...register('notes')} className="form-input min-h-[80px] resize-none" rows={3} placeholder="ملاحظات اختيارية..." />
        </div>
      </form>
    </Modal>
  );
};

// ============================================================
// Products Page
// ============================================================
const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);
  const toast = useToast();

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const [productsRes, catsRes] = await Promise.all([
        api.get('/products', { params: { search, category_id: selectedCategory } }),
        api.get('/categories'),
      ]);
      if (productsRes.data.success) setProducts(productsRes.data.data);
      if (catsRes.data.success) setCategories(catsRes.data.data);
    } catch {
      toast.error('حدث خطأ في تحميل البيانات');
    } finally {
      setLoading(false);
    }
  }, [search, selectedCategory]);

  useEffect(() => { loadProducts(); }, [loadProducts]);

  const handleDelete = async () => {
    if (!deleteProduct) return;
    setDeleting(true);
    try {
      await api.delete(`/products/${deleteProduct.id}`);
      toast.success('تم حذف الصنف بنجاح');
      setDeleteProduct(null);
      loadProducts();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'حدث خطأ في الحذف');
    } finally {
      setDeleting(false);
    }
  };

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.barcode?.includes(search)
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">المنتجات والأصناف</h1>
          <p className="page-subtitle">{formatNumber(products.length)} صنف مسجل</p>
        </div>
        <button
          onClick={() => { setEditProduct(null); setShowAddModal(true); }}
          className="btn-primary"
        >
          <Plus className="w-4 h-4" />
          إضافة صنف
        </button>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="بحث بالاسم أو الباركود..."
              className="form-input pr-10"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="form-select w-full sm:w-48"
          >
            <option value="">كل التصنيفات</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <button onClick={loadProducts} className="btn-secondary">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="card p-0 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-10 h-10 spinner" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <Package className="empty-icon" />
            <h3 className="empty-title">لا توجد أصناف</h3>
            <p className="empty-text">ابدأ بإضافة أصنافك</p>
            <button onClick={() => setShowAddModal(true)} className="btn-primary">
              <Plus className="w-4 h-4" />
              إضافة صنف
            </button>
          </div>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>الصنف</th>
                  <th>السعر الأساسي</th>
                  <th>سعر الجمهور</th>
                  <th>سعر الصيدلي (كاش)</th>
                  <th>سعر الصيدلي (آجل)</th>
                  <th>العلبة</th>
                  <th>المخزون</th>
                  <th>الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((product) => {
                  const isLowStock = product.stock_quantity !== undefined &&
                    product.stock_quantity <= product.min_stock_alert;
                  return (
                    <tr key={product.id}>
                      <td>
                        <div>
                          <p className="font-semibold text-secondary-900">{product.name}</p>
                          {product.category && (
                            <p className="text-xs text-secondary-400">{product.category.name}</p>
                          )}
                        </div>
                      </td>
                      <td className="font-medium">{formatCurrency(product.base_price)}</td>
                      <td className="font-medium">{formatCurrency(product.public_price)}</td>
                      <td>
                        <div>
                          <p className="font-bold text-blue-700">{formatCurrency(product.pharmacist_cash_price)}</p>
                          <p className="text-xs text-blue-500">خصم {product.cash_discount_percent}%</p>
                        </div>
                      </td>
                      <td>
                        <div>
                          <p className="font-bold text-orange-700">{formatCurrency(product.pharmacist_credit_price)}</p>
                          <p className="text-xs text-orange-500">خصم {product.credit_discount_percent}%</p>
                        </div>
                      </td>
                      <td>
                        <span className="badge-secondary">{product.box_quantity} قطعة</span>
                      </td>
                      <td>
                        <div className={`flex items-center gap-1 ${isLowStock ? 'text-danger-600' : 'text-success-600'}`}>
                          {isLowStock && <AlertTriangle className="w-3.5 h-3.5" />}
                          <span className="font-semibold">{formatNumber(product.stock_quantity || 0)}</span>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => { setEditProduct(product); setShowAddModal(true); }}
                            className="btn-ghost btn-icon btn-sm text-primary-600 hover:bg-primary-50"
                            title="تعديل"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteProduct(product)}
                            className="btn-ghost btn-icon btn-sm text-danger-500 hover:bg-danger-50"
                            title="حذف"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modals */}
      <ProductFormModal
        isOpen={showAddModal}
        onClose={() => { setShowAddModal(false); setEditProduct(null); }}
        onSuccess={loadProducts}
        editProduct={editProduct}
        categories={categories}
      />

      <ConfirmDialog
        isOpen={!!deleteProduct}
        onClose={() => setDeleteProduct(null)}
        onConfirm={handleDelete}
        title="حذف الصنف"
        message={`هل أنت متأكد من حذف "${deleteProduct?.name}"؟ هذا الإجراء لا يمكن التراجع عنه.`}
        loading={deleting}
      />
    </div>
  );
};

export default ProductsPage;
