// ============================================================
// Types - نظام إدارة المخزن الطبي
// ============================================================

export type UserRole = 'super_admin' | 'admin' | 'sales' | 'warehouse' | 'accountant';
export type PaymentType = 'cash' | 'credit';
export type InvoiceStatus = 'active' | 'partially_returned' | 'fully_returned';
export type MovementType = 'in' | 'out' | 'return' | 'transfer_in' | 'transfer_out' | 'adjustment';
export type RefundMethod = 'cash' | 'deduct_debt' | 'none';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  branch_id: string;
  is_active: boolean;
  created_at: string;
}

export interface Branch {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  is_active: boolean;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface Product {
  id: string;
  name: string;
  category_id?: string;
  category?: Category;
  barcode?: string;
  unit: string;
  base_price: number;        // سعر الشراء الأساسي
  public_price: number;      // سعر الجمهور
  cash_discount_percent: number;   // خصم الكاش %
  credit_discount_percent: number; // خصم الآجل %
  pharmacist_cash_price: number;   // سعر الصيدلي كاش (محسوب)
  pharmacist_credit_price: number; // سعر الصيدلي آجل (محسوب)
  box_quantity: number;      // عدد القطع في العلبة
  min_stock_alert: number;   // الحد الأدنى للتنبيه
  is_active: boolean;
  notes?: string;
  stock_quantity?: number;   // الكمية المتاحة (من inventory)
  created_at: string;
  updated_at: string;
}

export interface InventoryItem {
  id: string;
  product_id: string;
  product?: Product;
  branch_id: string;
  branch?: Branch;
  quantity: number;
}

export interface InventoryMovement {
  id: string;
  product_id: string;
  product?: Product;
  branch_id: string;
  movement_type: MovementType;
  quantity: number;
  quantity_before: number;
  quantity_after: number;
  reference_type?: string;
  reference_id?: string;
  notes?: string;
  created_by?: string;
  created_by_user?: User;
  created_at: string;
}

export interface Customer {
  id: string;
  name: string;
  phone?: string;
  address?: string;
  payment_type: PaymentType;
  credit_limit: number;
  total_debt: number;
  notes?: string;
  is_active: boolean;
  created_at: string;
}

export interface Supplier {
  id: string;
  name: string;
  phone?: string;
  address?: string;
  total_debt: number;
  notes?: string;
  is_active: boolean;
  created_at: string;
}

export interface InvoiceItem {
  id?: string;
  invoice_id?: string;
  product_id: string;
  product?: Product;
  product_name: string;
  is_box: boolean;
  box_quantity: number;
  quantity: number;           // الكمية المدخلة (علب أو قطع)
  quantity_units: number;     // الكمية الفعلية بالقطع
  public_price: number;       // سعر الجمهور
  pharmacist_price: number;   // سعر الصيدلي
  total: number;              // الإجمالي = pharmacist_price × quantity_units
}

export interface Invoice {
  id: string;
  invoice_number: string;
  customer_id: string;
  customer?: Customer;
  branch_id: string;
  branch?: Branch;
  payment_type: PaymentType;
  subtotal: number;
  total: number;
  paid_amount: number;
  remaining: number;
  status: InvoiceStatus;
  notes?: string;
  created_by?: string;
  created_by_user?: User;
  items?: InvoiceItem[];
  created_at: string;
}

export interface ReturnItem {
  id?: string;
  return_id?: string;
  invoice_item_id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  quantity_units: number;
  pharmacist_price: number;
  total: number;
}

export interface Return {
  id: string;
  return_number: string;
  invoice_id: string;
  invoice?: Invoice;
  customer_id: string;
  customer?: Customer;
  total_returned: number;
  refund_method: RefundMethod;
  notes?: string;
  created_by?: string;
  items?: ReturnItem[];
  created_at: string;
}

export interface Payment {
  id: string;
  customer_id: string;
  customer?: Customer;
  invoice_id?: string;
  invoice?: Invoice;
  amount: number;
  payment_date: string;
  notes?: string;
  created_by?: string;
  created_at: string;
}

export interface PurchaseItem {
  id?: string;
  purchase_id?: string;
  product_id: string;
  product?: Product;
  product_name: string;
  quantity: number;
  unit_price: number;
  total: number;
}

export interface Purchase {
  id: string;
  purchase_number: string;
  supplier_id?: string;
  supplier?: Supplier;
  branch_id: string;
  total: number;
  paid_amount: number;
  notes?: string;
  created_by?: string;
  items?: PurchaseItem[];
  created_at: string;
}

export interface Expense {
  id: string;
  category: string;
  amount: number;
  description?: string;
  expense_date: string;
  branch_id?: string;
  created_by?: string;
  created_at: string;
}

export interface CashBoxEntry {
  id: string;
  transaction_type: 'in' | 'out';
  amount: number;
  source: string;
  reference_id?: string;
  reference_number?: string;
  description?: string;
  branch_id?: string;
  created_at: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// Dashboard stats
export interface DashboardStats {
  todaySales: number;
  todayProfit: number;
  todayInvoicesCount: number;
  monthSales: number;
  monthProfit: number;
  totalCustomers: number;
  totalDebt: number;
  cashBalance: number;
  lowStockProducts: Product[];
  topProducts: { product: Product; total_quantity: number; total_revenue: number; invoice_count: number }[];
  recentInvoices: Invoice[];
  salesChart: { date: string; sales: number; profit: number }[];
}

// Auth types
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
