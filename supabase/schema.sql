-- ============================================================
-- Supabase Schema - نظام إدارة المخزن الطبي
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- BRANCHES - الفروع
-- ============================================================
CREATE TABLE branches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO branches (name, address) VALUES ('الفرع الرئيسي', '');

-- ============================================================
-- USERS - المستخدمون
-- ============================================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('super_admin','admin','sales','warehouse','accountant')),
  branch_id UUID REFERENCES branches(id),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- CATEGORIES - التصنيفات
-- ============================================================
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- PRODUCTS - الأصناف
-- ============================================================
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category_id UUID REFERENCES categories(id),
  barcode TEXT UNIQUE,
  unit TEXT DEFAULT 'قطعة',
  base_price NUMERIC(12,2) NOT NULL DEFAULT 0,    -- سعر الشراء الأساسي
  public_price NUMERIC(12,2) NOT NULL DEFAULT 0,  -- سعر الجمهور
  cash_discount_percent NUMERIC(5,2) DEFAULT 0,   -- نسبة خصم الكاش %
  credit_discount_percent NUMERIC(5,2) DEFAULT 0, -- نسبة خصم الآجل %
  -- الأسعار المحسوبة (تُحسب تلقائياً ولكن مخزّنة للأداء)
  pharmacist_cash_price NUMERIC(12,2) GENERATED ALWAYS AS (
    ROUND(public_price * (1 - cash_discount_percent / 100), 2)
  ) STORED,
  pharmacist_credit_price NUMERIC(12,2) GENERATED ALWAYS AS (
    ROUND(public_price * (1 - credit_discount_percent / 100), 2)
  ) STORED,
  box_quantity INTEGER DEFAULT 1,                  -- عدد القطع في العلبة
  min_stock_alert INTEGER DEFAULT 0,               -- الحد الأدنى للتنبيه
  is_active BOOLEAN DEFAULT true,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- INVENTORY - المخزون
-- ============================================================
CREATE TABLE inventory (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id),
  branch_id UUID NOT NULL REFERENCES branches(id),
  quantity NUMERIC(12,3) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(product_id, branch_id)
);

-- ============================================================
-- INVENTORY MOVEMENTS - حركات المخزون
-- ============================================================
CREATE TABLE inventory_movements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id),
  branch_id UUID NOT NULL REFERENCES branches(id),
  movement_type TEXT NOT NULL CHECK (movement_type IN ('in','out','return','transfer_in','transfer_out','adjustment')),
  quantity NUMERIC(12,3) NOT NULL,
  quantity_before NUMERIC(12,3),
  quantity_after NUMERIC(12,3),
  reference_type TEXT,  -- 'invoice' | 'purchase' | 'return' | 'transfer' | 'adjustment'
  reference_id UUID,
  notes TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- CUSTOMERS - العملاء
-- ============================================================
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  payment_type TEXT DEFAULT 'cash' CHECK (payment_type IN ('cash','credit')),
  credit_limit NUMERIC(12,2) DEFAULT 0,
  total_debt NUMERIC(12,2) DEFAULT 0,  -- المديونية الإجمالية
  notes TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SUPPLIERS - الموردون
-- ============================================================
CREATE TABLE suppliers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  total_debt NUMERIC(12,2) DEFAULT 0,
  notes TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- INVOICES - الفواتير
-- ============================================================
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_number TEXT NOT NULL UNIQUE,  -- INV-20260625-001
  customer_id UUID NOT NULL REFERENCES customers(id),
  branch_id UUID NOT NULL REFERENCES branches(id),
  payment_type TEXT NOT NULL CHECK (payment_type IN ('cash','credit')),
  subtotal NUMERIC(12,2) NOT NULL DEFAULT 0,   -- المجموع قبل
  total NUMERIC(12,2) NOT NULL DEFAULT 0,       -- الإجمالي الكلي
  paid_amount NUMERIC(12,2) DEFAULT 0,          -- المدفوع عند الاستلام
  remaining NUMERIC(12,2) GENERATED ALWAYS AS (total - paid_amount) STORED, -- الباقي
  status TEXT DEFAULT 'active' CHECK (status IN ('active','partially_returned','fully_returned')),
  notes TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- INVOICE ITEMS - بنود الفاتورة
-- ============================================================
CREATE TABLE invoice_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_id UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  product_name TEXT NOT NULL,          -- محفوظ وقت الفاتورة
  is_box BOOLEAN DEFAULT false,         -- بيع بالعلبة؟
  box_quantity INTEGER DEFAULT 1,       -- عدد القطع في العلبة وقت البيع
  quantity NUMERIC(12,3) NOT NULL,      -- الكمية (علب أو قطع)
  quantity_units NUMERIC(12,3) NOT NULL, -- الكمية بالقطع الفعلية
  public_price NUMERIC(12,2) NOT NULL,  -- سعر الجمهور وقت البيع
  pharmacist_price NUMERIC(12,2) NOT NULL, -- سعر الصيدلي وقت البيع
  total NUMERIC(12,2) NOT NULL          -- pharmacist_price × quantity_units
);

-- ============================================================
-- RETURNS - المرتجعات
-- ============================================================
CREATE TABLE returns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  return_number TEXT NOT NULL UNIQUE,
  invoice_id UUID NOT NULL REFERENCES invoices(id),
  customer_id UUID NOT NULL REFERENCES customers(id),
  total_returned NUMERIC(12,2) NOT NULL,
  refund_method TEXT CHECK (refund_method IN ('cash','deduct_debt','none')),
  -- cash: رد نقدي | deduct_debt: خصم من المديونية | none: لا يوجد (العميل لم يدفع)
  notes TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE return_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  return_id UUID NOT NULL REFERENCES returns(id) ON DELETE CASCADE,
  invoice_item_id UUID NOT NULL REFERENCES invoice_items(id),
  product_id UUID NOT NULL REFERENCES products(id),
  product_name TEXT NOT NULL,
  quantity NUMERIC(12,3) NOT NULL,
  quantity_units NUMERIC(12,3) NOT NULL,
  pharmacist_price NUMERIC(12,2) NOT NULL,
  total NUMERIC(12,2) NOT NULL
);

-- ============================================================
-- PAYMENTS - سداد الآجل
-- ============================================================
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID NOT NULL REFERENCES customers(id),
  invoice_id UUID REFERENCES invoices(id),  -- اختياري
  amount NUMERIC(12,2) NOT NULL,
  payment_date DATE NOT NULL DEFAULT CURRENT_DATE,
  notes TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- PURCHASES - المشتريات
-- ============================================================
CREATE TABLE purchases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  purchase_number TEXT NOT NULL UNIQUE,
  supplier_id UUID REFERENCES suppliers(id),
  branch_id UUID NOT NULL REFERENCES branches(id),
  total NUMERIC(12,2) DEFAULT 0,
  paid_amount NUMERIC(12,2) DEFAULT 0,
  notes TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE purchase_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  purchase_id UUID NOT NULL REFERENCES purchases(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  product_name TEXT NOT NULL,
  quantity NUMERIC(12,3) NOT NULL,
  unit_price NUMERIC(12,2) NOT NULL,   -- سعر الشراء
  total NUMERIC(12,2) NOT NULL
);

-- ============================================================
-- EXPENSES - المصروفات
-- ============================================================
CREATE TABLE expenses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category TEXT NOT NULL,  -- كهرباء | مياه | مواصلات | إيجار | أخرى
  amount NUMERIC(12,2) NOT NULL,
  description TEXT,
  expense_date DATE NOT NULL DEFAULT CURRENT_DATE,
  branch_id UUID REFERENCES branches(id),
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- CASH BOX - الخزنة
-- ============================================================
CREATE TABLE cash_box (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('in','out')),
  amount NUMERIC(12,2) NOT NULL,
  source TEXT NOT NULL,  -- invoice | payment | expense | purchase | other
  reference_id UUID,
  reference_number TEXT,
  description TEXT,
  branch_id UUID REFERENCES branches(id),
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- STOCK TRANSFERS - تحويل المخزون
-- ============================================================
CREATE TABLE stock_transfers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  transfer_number TEXT NOT NULL UNIQUE,
  from_branch_id UUID NOT NULL REFERENCES branches(id),
  to_branch_id UUID NOT NULL REFERENCES branches(id),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','completed','cancelled')),
  notes TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE stock_transfer_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  transfer_id UUID NOT NULL REFERENCES stock_transfers(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  quantity NUMERIC(12,3) NOT NULL
);

-- ============================================================
-- TRIGGERS - الحوادث التلقائية
-- ============================================================

-- تحديث updated_at تلقائياً
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_inventory_updated_at BEFORE UPDATE ON inventory
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- توليد رقم الفاتورة تلقائياً
CREATE SEQUENCE invoice_seq START 1;
CREATE OR REPLACE FUNCTION generate_invoice_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.invoice_number := 'INV-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(nextval('invoice_seq')::TEXT, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_invoice_number BEFORE INSERT ON invoices
  FOR EACH ROW WHEN (NEW.invoice_number IS NULL OR NEW.invoice_number = '')
  EXECUTE FUNCTION generate_invoice_number();

-- توليد رقم المرتجع
CREATE SEQUENCE return_seq START 1;
CREATE OR REPLACE FUNCTION generate_return_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.return_number := 'RET-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(nextval('return_seq')::TEXT, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_return_number BEFORE INSERT ON returns
  FOR EACH ROW WHEN (NEW.return_number IS NULL OR NEW.return_number = '')
  EXECUTE FUNCTION generate_return_number();

-- توليد رقم الشراء
CREATE SEQUENCE purchase_seq START 1;
CREATE OR REPLACE FUNCTION generate_purchase_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.purchase_number := 'PUR-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(nextval('purchase_seq')::TEXT, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_purchase_number BEFORE INSERT ON purchases
  FOR EACH ROW WHEN (NEW.purchase_number IS NULL OR NEW.purchase_number = '')
  EXECUTE FUNCTION generate_purchase_number();

-- توليد رقم تحويل المخزون
CREATE SEQUENCE transfer_seq START 1;
CREATE OR REPLACE FUNCTION generate_transfer_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.transfer_number := 'TRF-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(nextval('transfer_seq')::TEXT, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_transfer_number BEFORE INSERT ON stock_transfers
  FOR EACH ROW WHEN (NEW.transfer_number IS NULL OR NEW.transfer_number = '')
  EXECUTE FUNCTION generate_transfer_number();

-- ============================================================
-- INDEXES - الفهارس
-- ============================================================
CREATE INDEX idx_inventory_product ON inventory(product_id);
CREATE INDEX idx_inventory_branch ON inventory(branch_id);
CREATE INDEX idx_inv_movements_product ON inventory_movements(product_id);
CREATE INDEX idx_inv_movements_date ON inventory_movements(created_at);
CREATE INDEX idx_invoices_customer ON invoices(customer_id);
CREATE INDEX idx_invoices_date ON invoices(created_at);
CREATE INDEX idx_invoice_items_invoice ON invoice_items(invoice_id);
CREATE INDEX idx_payments_customer ON payments(customer_id);
CREATE INDEX idx_expenses_date ON expenses(expense_date);
CREATE INDEX idx_cash_box_date ON cash_box(created_at);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- السماح للمصادقين بالقراءة (سيتم تفصيلها لاحقاً)
CREATE POLICY "authenticated_read" ON products FOR SELECT TO authenticated USING (true);
CREATE POLICY "authenticated_read" ON inventory FOR SELECT TO authenticated USING (true);
CREATE POLICY "authenticated_read" ON invoices FOR SELECT TO authenticated USING (true);
CREATE POLICY "authenticated_read" ON customers FOR SELECT TO authenticated USING (true);
