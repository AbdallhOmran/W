import { format, parseISO } from 'date-fns';
import { ar } from 'date-fns/locale';

// ============================================================
// Number & Currency Formatting
// ============================================================

export const formatCurrency = (amount: number | null | undefined): string => {
  if (amount == null) return '0.00 ج.م';
  return new Intl.NumberFormat('ar-EG', {
    style: 'currency',
    currency: 'EGP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatNumber = (num: number | null | undefined): string => {
  if (num == null) return '0';
  return new Intl.NumberFormat('ar-EG').format(num);
};

export const formatPercent = (percent: number): string => `${percent}%`;

// ============================================================
// Price Calculation Logic
// ============================================================

/**
 * حساب سعر الصيدلي من سعر الجمهور والخصم
 */
export const calcPharmacistPrice = (publicPrice: number, discountPercent: number): number => {
  if (!publicPrice || !discountPercent) return publicPrice || 0;
  return Math.round((publicPrice * (1 - discountPercent / 100)) * 100) / 100;
};

/**
 * حساب نسبة الخصم من سعر الجمهور وسعر الصيدلي
 */
export const calcDiscountPercent = (publicPrice: number, pharmacistPrice: number): number => {
  if (!publicPrice || !pharmacistPrice) return 0;
  return Math.round(((publicPrice - pharmacistPrice) / publicPrice) * 100 * 100) / 100;
};

/**
 * حساب الربح من صنف واحد
 */
export const calcItemProfit = (pharmacistPrice: number, basePrice: number, quantity: number): number => {
  return (pharmacistPrice - basePrice) * quantity;
};

/**
 * حساب إجمالي بند الفاتورة
 */
export const calcInvoiceItemTotal = (pharmacistPrice: number, quantity: number, isBox: boolean, boxQty: number): number => {
  const units = isBox ? quantity * boxQty : quantity;
  return Math.round(pharmacistPrice * units * 100) / 100;
};

// ============================================================
// Date Formatting
// ============================================================

export const formatDate = (date: string | Date): string => {
  try {
    const d = typeof date === 'string' ? parseISO(date) : date;
    return format(d, 'dd/MM/yyyy', { locale: ar });
  } catch {
    return '';
  }
};

export const formatDateTime = (date: string | Date): string => {
  try {
    const d = typeof date === 'string' ? parseISO(date) : date;
    return format(d, 'dd/MM/yyyy HH:mm', { locale: ar });
  } catch {
    return '';
  }
};

export const formatDayName = (date: string | Date): string => {
  try {
    const d = typeof date === 'string' ? parseISO(date) : date;
    return format(d, 'EEEE', { locale: ar });
  } catch {
    return '';
  }
};

export const formatFullDate = (date: string | Date): string => {
  try {
    const d = typeof date === 'string' ? parseISO(date) : date;
    return format(d, 'EEEE، dd MMMM yyyy', { locale: ar });
  } catch {
    return '';
  }
};

export const getTodayDate = (): string => format(new Date(), 'yyyy-MM-dd');

// ============================================================
// Role Permissions
// ============================================================

export type UserRole = 'super_admin' | 'admin' | 'sales' | 'warehouse' | 'accountant';

export const ROLE_LABELS: Record<UserRole, string> = {
  super_admin: 'مدير النظام',
  admin: 'مدير',
  sales: 'موظف مبيعات',
  warehouse: 'أمين مخزن',
  accountant: 'محاسب',
};

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  super_admin: ['*'],
  admin: ['dashboard', 'products', 'inventory', 'invoices', 'purchases', 'customers', 'suppliers', 'cash', 'reports', 'menu'],
  sales: ['dashboard', 'products:read', 'invoices', 'customers', 'menu'],
  warehouse: ['dashboard', 'products', 'inventory', 'purchases'],
  accountant: ['dashboard', 'customers', 'suppliers', 'cash', 'reports', 'invoices:read'],
};

export const hasPermission = (role: UserRole, permission: string): boolean => {
  const perms = ROLE_PERMISSIONS[role] || [];
  return perms.includes('*') || perms.includes(permission) || perms.some(p => p.startsWith(permission.split(':')[0]) && !p.includes(':'));
};

// ============================================================
// Payment Type Labels
// ============================================================

export const PAYMENT_TYPE_LABELS: Record<string, string> = {
  cash: 'كاش',
  credit: 'آجل',
};

export const INVOICE_STATUS_LABELS: Record<string, string> = {
  active: 'نشطة',
  partially_returned: 'مرتجع جزئي',
  fully_returned: 'مرتجع كامل',
};

export const MOVEMENT_TYPE_LABELS: Record<string, string> = {
  in: 'إضافة',
  out: 'سحب',
  return: 'مرتجع',
  transfer_in: 'تحويل وارد',
  transfer_out: 'تحويل صادر',
  adjustment: 'تعديل',
};

// ============================================================
// Generate Invoice Number (for display)
// ============================================================

export const generateLocalInvoiceNumber = (): string => {
  const now = new Date();
  const datePart = format(now, 'yyyyMMdd');
  const timePart = String(now.getTime()).slice(-4);
  return `INV-${datePart}-${timePart}`;
};

// ============================================================
// Validation Helpers
// ============================================================

export const isValidPhone = (phone: string): boolean => /^0\d{9,10}$/.test(phone.replace(/\s/g, ''));

export const isPositiveNumber = (val: unknown): boolean => {
  const num = Number(val);
  return !isNaN(num) && num > 0;
};

// ============================================================
// Expense Categories
// ============================================================

export const EXPENSE_CATEGORIES = [
  'كهرباء',
  'مياه',
  'مواصلات',
  'إيجار',
  'رواتب',
  'صيانة',
  'تسويق',
  'مصاريف إدارية',
  'أخرى',
];
