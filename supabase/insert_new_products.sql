-- ============================================================
-- SQL Seed Script to Insert New Products from User Images
-- ============================================================

DO $$
DECLARE
  cat_cosmetics_id UUID;
  cat_medical_id UUID;
BEGIN
  SELECT id INTO cat_cosmetics_id FROM categories WHERE name = 'مستحضرات تجميل وعناية';
  SELECT id INTO cat_medical_id FROM categories WHERE name = 'مستلزمات طبية';

  -- ==========================================
  -- PAGE 1 PRODUCTS
  -- ==========================================

  -- Product: مناديل سحب فاميليا 500مل
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'مناديل سحب فاميليا 500مل') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('مناديل سحب فاميليا 500مل', cat_medical_id, 29.40, 35.00, 16.00, 16.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 29.40,
      public_price = 35.00,
      cash_discount_percent = 16.00,
      credit_discount_percent = 16.00
    WHERE name = 'مناديل سحب فاميليا 500مل';
  END IF;

  -- Product: مناديل سحب بابيا 500مل 4 طبقات
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'مناديل سحب بابيا 500مل 4 طبقات') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('مناديل سحب بابيا 500مل 4 طبقات', cat_medical_id, 32.50, 40.00, 18.75, 18.75, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 32.50,
      public_price = 40.00,
      cash_discount_percent = 18.75,
      credit_discount_percent = 18.75
    WHERE name = 'مناديل سحب بابيا 500مل 4 طبقات';
  END IF;

  -- Product: مناديل سحب بابيا 500مل 2 طبقات
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'مناديل سحب بابيا 500مل 2 طبقات') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('مناديل سحب بابيا 500مل 2 طبقات', cat_medical_id, 27.50, 32.00, 14.06, 14.06, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 27.50,
      public_price = 32.00,
      cash_discount_percent = 14.06,
      credit_discount_percent = 14.06
    WHERE name = 'مناديل سحب بابيا 500مل 2 طبقات';
  END IF;

  -- Product: مناديل سحب زينه 3طبقات 500ق
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'مناديل سحب زينه 3طبقات 500ق') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('مناديل سحب زينه 3طبقات 500ق', cat_medical_id, 25.20, 30.00, 16.00, 16.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 25.20,
      public_price = 30.00,
      cash_discount_percent = 16.00,
      credit_discount_percent = 16.00
    WHERE name = 'مناديل سحب زينه 3طبقات 500ق';
  END IF;

  -- Product: مناديل جيب فاين
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'مناديل جيب فاين') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('مناديل جيب فاين', cat_medical_id, 15.60, 20.00, 22.00, 22.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 15.60,
      public_price = 20.00,
      cash_discount_percent = 22.00,
      credit_discount_percent = 22.00
    WHERE name = 'مناديل جيب فاين';
  END IF;

  -- Product: بكر فاميليا 4ق مطبخ
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'بكر فاميليا 4ق مطبخ') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('بكر فاميليا 4ق مطبخ', cat_medical_id, 40.00, 50.00, 20.00, 20.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 40.00,
      public_price = 50.00,
      cash_discount_percent = 20.00,
      credit_discount_percent = 20.00
    WHERE name = 'بكر فاميليا 4ق مطبخ';
  END IF;

  -- Product: بكر تويلت جود كير
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'بكر تويلت جود كير') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('بكر تويلت جود كير', cat_medical_id, 12.00, 15.00, 20.00, 20.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 12.00,
      public_price = 15.00,
      cash_discount_percent = 20.00,
      credit_discount_percent = 20.00
    WHERE name = 'بكر تويلت جود كير';
  END IF;

  -- Product: بكر تويلت فاميليا 20لفه مزوج
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'بكر تويلت فاميليا 20لفه مزوج') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('بكر تويلت فاميليا 20لفه مزوج', cat_medical_id, 220.00, 275.00, 20.00, 20.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 220.00,
      public_price = 275.00,
      cash_discount_percent = 20.00,
      credit_discount_percent = 20.00
    WHERE name = 'بكر تويلت فاميليا 20لفه مزوج';
  END IF;

  -- Product: كبار سن فاين 20ق
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'كبار سن فاين 20ق') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('كبار سن فاين 20ق', cat_medical_id, 270.00, 350.00, 22.86, 22.86, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 270.00,
      public_price = 350.00,
      cash_discount_percent = 22.86,
      credit_discount_percent = 22.86
    WHERE name = 'كبار سن فاين 20ق';
  END IF;

  -- Product: كبار سن اكس لارج 28ق فاين
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'كبار سن اكس لارج 28ق فاين') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('كبار سن اكس لارج 28ق فاين', cat_medical_id, 469.00, 700.00, 33.00, 33.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 469.00,
      public_price = 700.00,
      cash_discount_percent = 33.00,
      credit_discount_percent = 33.00
    WHERE name = 'كبار سن اكس لارج 28ق فاين';
  END IF;

  -- Product: كبار سن تندركس
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'كبار سن تندركس') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('كبار سن تندركس', cat_medical_id, 448.00, 540.00, 17.04, 17.04, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 448.00,
      public_price = 540.00,
      cash_discount_percent = 17.04,
      credit_discount_percent = 17.04
    WHERE name = 'كبار سن تندركس';
  END IF;

  -- Product: زيت املا أطفال م90
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'زيت املا أطفال م90') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('زيت املا أطفال م90', cat_cosmetics_id, 46.00, 60.00, 23.33, 23.33, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 46.00,
      public_price = 60.00,
      cash_discount_percent = 23.33,
      credit_discount_percent = 23.33
    WHERE name = 'زيت املا أطفال م90';
  END IF;

  -- Product: زيت املا أطفال م180
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'زيت املا أطفال م180') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('زيت املا أطفال م180', cat_cosmetics_id, 76.00, 100.00, 24.00, 24.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 76.00,
      public_price = 100.00,
      cash_discount_percent = 24.00,
      credit_discount_percent = 24.00
    WHERE name = 'زيت املا أطفال م180';
  END IF;

  -- Product: زيت املا أطفال م270
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'زيت املا أطفال م270') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('زيت املا أطفال م270', cat_cosmetics_id, 93.50, 120.00, 22.08, 22.08, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 93.50,
      public_price = 120.00,
      cash_discount_percent = 22.08,
      credit_discount_percent = 22.08
    WHERE name = 'زيت املا أطفال م270';
  END IF;

  -- Product: زيت املا الذهبي 45مل
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'زيت املا الذهبي 45مل') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('زيت املا الذهبي 45مل', cat_cosmetics_id, 22.00, 29.00, 24.14, 24.14, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 22.00,
      public_price = 29.00,
      cash_discount_percent = 24.14,
      credit_discount_percent = 24.14
    WHERE name = 'زيت املا الذهبي 45مل';
  END IF;

  -- Product: زيت املا الذهبي 90مل
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'زيت املا الذهبي 90مل') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('زيت املا الذهبي 90مل', cat_cosmetics_id, 45.00, 55.00, 18.18, 18.18, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 45.00,
      public_price = 55.00,
      cash_discount_percent = 18.18,
      credit_discount_percent = 18.18
    WHERE name = 'زيت املا الذهبي 90مل';
  END IF;

  -- Product: زيت املا الذهبي 180مل
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'زيت املا الذهبي 180مل') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('زيت املا الذهبي 180مل', cat_cosmetics_id, 72.00, 90.00, 20.00, 20.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 72.00,
      public_price = 90.00,
      cash_discount_percent = 20.00,
      credit_discount_percent = 20.00
    WHERE name = 'زيت املا الذهبي 180مل';
  END IF;

  -- Product: زيت املا الذهبي 270مل
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'زيت املا الذهبي 270مل') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('زيت املا الذهبي 270مل', cat_cosmetics_id, 91.00, 117.00, 22.22, 22.22, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 91.00,
      public_price = 117.00,
      cash_discount_percent = 22.22,
      credit_discount_percent = 22.22
    WHERE name = 'زيت املا الذهبي 270مل';
  END IF;

  -- Product: زيت املا بالياسمين 45مل
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'زيت املا بالياسمين 45مل') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('زيت املا بالياسمين 45مل', cat_cosmetics_id, 25.50, 32.00, 20.31, 20.31, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 25.50,
      public_price = 32.00,
      cash_discount_percent = 20.31,
      credit_discount_percent = 20.31
    WHERE name = 'زيت املا بالياسمين 45مل';
  END IF;

  -- Product: زيت املا بالياسمين 90مل
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'زيت املا بالياسمين 90مل') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('زيت املا بالياسمين 90مل', cat_cosmetics_id, 45.00, 55.00, 18.18, 18.18, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 45.00,
      public_price = 55.00,
      cash_discount_percent = 18.18,
      credit_discount_percent = 18.18
    WHERE name = 'زيت املا بالياسمين 90مل';
  END IF;

  -- Product: زيت املا بالياسمين 180مل
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'زيت املا بالياسمين 180مل') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('زيت املا بالياسمين 180مل', cat_cosmetics_id, 72.00, 90.00, 20.00, 20.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 72.00,
      public_price = 90.00,
      cash_discount_percent = 20.00,
      credit_discount_percent = 20.00
    WHERE name = 'زيت املا بالياسمين 180مل';
  END IF;

  -- Product: زيت املا بالياسمين 270مل
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'زيت املا بالياسمين 270مل') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('زيت املا بالياسمين 270مل', cat_cosmetics_id, 92.00, 115.00, 20.00, 20.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 92.00,
      public_price = 115.00,
      cash_discount_percent = 20.00,
      credit_discount_percent = 20.00
    WHERE name = 'زيت املا بالياسمين 270مل';
  END IF;

  -- Product: زيت فاتيكا بيبي 100 مل
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'زيت فاتيكا بيبي 100 مل') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('زيت فاتيكا بيبي 100 مل', cat_cosmetics_id, 37.50, 50.00, 25.00, 25.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 37.50,
      public_price = 50.00,
      cash_discount_percent = 25.00,
      credit_discount_percent = 25.00
    WHERE name = 'زيت فاتيكا بيبي 100 مل';
  END IF;

  -- Product: زيت حرير 100مل
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'زيت حرير 100مل') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('زيت حرير 100مل', cat_cosmetics_id, 37.50, 50.00, 25.00, 25.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 37.50,
      public_price = 50.00,
      cash_discount_percent = 25.00,
      credit_discount_percent = 25.00
    WHERE name = 'زيت حرير 100مل';
  END IF;

  -- Product: زيت حرير كبير
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'زيت حرير كبير') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('زيت حرير كبير', cat_cosmetics_id, 62.00, 75.00, 17.33, 17.33, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 62.00,
      public_price = 75.00,
      cash_discount_percent = 17.33,
      credit_discount_percent = 17.33
    WHERE name = 'زيت حرير كبير';
  END IF;

  -- Product: زيت صانسلك 250مل
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'زيت صانسلك 250مل') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('زيت صانسلك 250مل', cat_cosmetics_id, 75.50, 92.00, 17.93, 17.93, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 75.50,
      public_price = 92.00,
      cash_discount_percent = 17.93,
      credit_discount_percent = 17.93
    WHERE name = 'زيت صانسلك 250مل';
  END IF;

  -- Product: زيت الو ايفا 85مل
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'زيت الو ايفا 85مل') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('زيت الو ايفا 85مل', cat_cosmetics_id, 41.25, 55.00, 25.00, 25.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 41.25,
      public_price = 55.00,
      cash_discount_percent = 25.00,
      credit_discount_percent = 25.00
    WHERE name = 'زيت الو ايفا 85مل';
  END IF;

  -- Product: زيت الو ايفا 170 مل
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'زيت الو ايفا 170 مل') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('زيت الو ايفا 170 مل', cat_cosmetics_id, 56.00, 70.00, 20.00, 20.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 56.00,
      public_price = 70.00,
      cash_discount_percent = 20.00,
      credit_discount_percent = 20.00
    WHERE name = 'زيت الو ايفا 170 مل';
  END IF;

  -- Product: زيت الو ايفا 255مل
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'زيت الو ايفا 255مل') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('زيت الو ايفا 255مل', cat_cosmetics_id, 66.00, 85.00, 22.35, 22.35, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 66.00,
      public_price = 85.00,
      cash_discount_percent = 22.35,
      credit_discount_percent = 22.35
    WHERE name = 'زيت الو ايفا 255مل';
  END IF;

  -- Product: زيت البرهان 100مل
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'زيت البرهان 100مل') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('زيت البرهان 100مل', cat_cosmetics_id, 98.50, 125.00, 21.20, 21.20, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 98.50,
      public_price = 125.00,
      cash_discount_percent = 21.20,
      credit_discount_percent = 21.20
    WHERE name = 'زيت البرهان 100مل';
  END IF;

  -- Product: زيت البرهان 250مل
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'زيت البرهان 250مل') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('زيت البرهان 250مل', cat_cosmetics_id, 150.00, 200.00, 25.00, 25.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 150.00,
      public_price = 200.00,
      cash_discount_percent = 25.00,
      credit_discount_percent = 25.00
    WHERE name = 'زيت البرهان 250مل';
  END IF;

  -- Product: زيت بارفين
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'زيت بارفين') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('زيت بارفين', cat_cosmetics_id, 11.25, 15.00, 25.00, 25.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 11.25,
      public_price = 15.00,
      cash_discount_percent = 25.00,
      credit_discount_percent = 25.00
    WHERE name = 'زيت بارفين';
  END IF;

  -- Product: زيت جونسون 200مل
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'زيت جونسون 200مل') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('زيت جونسون 200مل', cat_cosmetics_id, 109.00, 140.00, 22.14, 22.14, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 109.00,
      public_price = 140.00,
      cash_discount_percent = 22.14,
      credit_discount_percent = 22.14
    WHERE name = 'زيت جونسون 200مل';
  END IF;

  -- Product: زيت جونسون 75مل
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'زيت جونسون 75مل') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('زيت جونسون 75مل', cat_cosmetics_id, 70.00, 70.00, 0.00, 0.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 70.00,
      public_price = 70.00,
      cash_discount_percent = 0.00,
      credit_discount_percent = 0.00
    WHERE name = 'زيت جونسون 75مل';
  END IF;

  -- Product: كريم شعر الوايفا 85 جم
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'كريم شعر الوايفا 85 جم') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('كريم شعر الوايفا 85 جم', cat_cosmetics_id, 40.00, 50.00, 20.00, 20.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 40.00,
      public_price = 50.00,
      cash_discount_percent = 20.00,
      credit_discount_percent = 20.00
    WHERE name = 'كريم شعر الوايفا 85 جم';
  END IF;

  -- Product: كريم شعر الوايفا 185 جم
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'كريم شعر الوايفا 185 جم') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('كريم شعر الوايفا 185 جم', cat_cosmetics_id, 64.00, 80.00, 20.00, 20.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 64.00,
      public_price = 80.00,
      cash_discount_percent = 20.00,
      credit_discount_percent = 20.00
    WHERE name = 'كريم شعر الوايفا 185 جم';
  END IF;

  -- Product: كريم شعر هيمالايا
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'كريم شعر هيمالايا') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('كريم شعر هيمالايا', cat_cosmetics_id, 50.00, 65.00, 23.08, 23.08, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 50.00,
      public_price = 65.00,
      cash_discount_percent = 23.08,
      credit_discount_percent = 23.08
    WHERE name = 'كريم شعر هيمالايا';
  END IF;

  -- Product: كريم كلير
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'كريم كلير') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('كريم كلير', cat_cosmetics_id, 68.00, 85.00, 20.00, 20.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 68.00,
      public_price = 85.00,
      cash_discount_percent = 20.00,
      credit_discount_percent = 20.00
    WHERE name = 'كريم كلير';
  END IF;

  -- Product: كريم نيفيا سوفت 20 جم
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'كريم نيفيا سوفت 20 جم') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('كريم نيفيا سوفت 20 جم', cat_cosmetics_id, 14.00, 18.00, 22.22, 22.22, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 14.00,
      public_price = 18.00,
      cash_discount_percent = 22.22,
      credit_discount_percent = 22.22
    WHERE name = 'كريم نيفيا سوفت 20 جم';
  END IF;

  -- Product: كريم نيفيا سوفت 50 جم
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'كريم نيفيا سوفت 50 جم') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('كريم نيفيا سوفت 50 جم', cat_cosmetics_id, 30.00, 40.00, 25.00, 25.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 30.00,
      public_price = 40.00,
      cash_discount_percent = 25.00,
      credit_discount_percent = 25.00
    WHERE name = 'كريم نيفيا سوفت 50 جم';
  END IF;

  -- Product: كريم بيوتي 80 جم
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'كريم بيوتي 80 جم') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('كريم بيوتي 80 جم', cat_cosmetics_id, 32.00, 40.00, 20.00, 20.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 32.00,
      public_price = 40.00,
      cash_discount_percent = 20.00,
      credit_discount_percent = 20.00
    WHERE name = 'كريم بيوتي 80 جم';
  END IF;


  -- ==========================================
  -- PAGE 2 PRODUCTS
  -- ==========================================

  -- Product: كريم ايفا بالجلسرين وسط
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'كريم ايفا بالجلسرين وسط') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('كريم ايفا بالجلسرين وسط', cat_cosmetics_id, 24.00, 30.00, 20.00, 20.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 24.00,
      public_price = 30.00,
      cash_discount_percent = 20.00,
      credit_discount_percent = 20.00
    WHERE name = 'كريم ايفا بالجلسرين وسط';
  END IF;

  -- Product: كريم ايفا بالجلسرين صغير
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'كريم ايفا بالجلسرين صغير') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('كريم ايفا بالجلسرين صغير', cat_cosmetics_id, 11.50, 15.00, 23.33, 23.33, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 11.50,
      public_price = 15.00,
      cash_discount_percent = 23.33,
      credit_discount_percent = 23.33
    WHERE name = 'كريم ايفا بالجلسرين صغير';
  END IF;

  -- Product: كريم بانسي
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'كريم بانسي') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('كريم بانسي', cat_cosmetics_id, 20.50, 27.00, 24.07, 24.07, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 20.50,
      public_price = 27.00,
      cash_discount_percent = 24.07,
      credit_discount_percent = 24.07
    WHERE name = 'كريم بانسي';
  END IF;

  -- Product: كريم بيوتي 50 جم
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'كريم بيوتي 50 جم') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('كريم بيوتي 50 جم', cat_cosmetics_id, 24.00, 30.00, 20.00, 20.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 24.00,
      public_price = 30.00,
      cash_discount_percent = 20.00,
      credit_discount_percent = 20.00
    WHERE name = 'كريم بيوتي 50 جم';
  END IF;

  -- Product: كريم حلاقه 3*5 40 جم
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'كريم حلاقه 3*5 40 جم') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('كريم حلاقه 3*5 40 جم', cat_cosmetics_id, 18.00, 25.00, 28.00, 28.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 18.00,
      public_price = 25.00,
      cash_discount_percent = 28.00,
      credit_discount_percent = 28.00
    WHERE name = 'كريم حلاقه 3*5 40 جم';
  END IF;

  -- Product: كريم جونسون سوفت 100 جم
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'كريم جونسون سوفت 100 جم') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('كريم جونسون سوفت 100 جم', cat_cosmetics_id, 82.50, 110.00, 25.00, 25.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 82.50,
      public_price = 110.00,
      cash_discount_percent = 25.00,
      credit_discount_percent = 25.00
    WHERE name = 'كريم جونسون سوفت 100 جم';
  END IF;

  -- Product: كريم جونسون 170 مل
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'كريم جونسون 170 مل') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('كريم جونسون 170 مل', cat_cosmetics_id, 73.00, 95.00, 23.16, 23.16, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 73.00,
      public_price = 95.00,
      cash_discount_percent = 23.16,
      credit_discount_percent = 23.16
    WHERE name = 'كريم جونسون 170 مل';
  END IF;

  -- Product: كريم لونا للتشققات 20 جم
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'كريم لونا للتشققات 20 جم') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('كريم لونا للتشققات 20 جم', cat_cosmetics_id, 17.50, 20.00, 12.50, 12.50, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 17.50,
      public_price = 20.00,
      cash_discount_percent = 12.50,
      credit_discount_percent = 12.50
    WHERE name = 'كريم لونا للتشققات 20 جم';
  END IF;

  -- Product: جل فاتيكا برطمان 250 جم
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'جل فاتيكا برطمان 250 جم') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('جل فاتيكا برطمان 250 جم', cat_cosmetics_id, 30.50, 40.00, 23.75, 23.75, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 30.50,
      public_price = 40.00,
      cash_discount_percent = 23.75,
      credit_discount_percent = 23.75
    WHERE name = 'جل فاتيكا برطمان 250 جم';
  END IF;

  -- Product: جل فاتيكا برطمان 250 مل كبير
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'جل فاتيكا برطمان 250 مل كبير') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('جل فاتيكا برطمان 250 مل كبير', cat_cosmetics_id, 32.00, 40.00, 20.00, 20.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 32.00,
      public_price = 40.00,
      cash_discount_percent = 20.00,
      credit_discount_percent = 20.00
    WHERE name = 'جل فاتيكا برطمان 250 مل كبير';
  END IF;

  -- Product: جل هير كود ازرق انبوبه 250
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'جل هير كود ازرق انبوبه 250') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('جل هير كود ازرق انبوبه 250', cat_cosmetics_id, 30.80, 40.00, 23.00, 23.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 30.80,
      public_price = 40.00,
      cash_discount_percent = 23.00,
      credit_discount_percent = 23.00
    WHERE name = 'جل هير كود ازرق انبوبه 250';
  END IF;

  -- Product: جل هيركود أكياس بالشريط
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'جل هيركود أكياس بالشريط') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('جل هيركود أكياس بالشريط', cat_cosmetics_id, 30.50, 36.00, 15.28, 15.28, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 30.50,
      public_price = 36.00,
      cash_discount_percent = 15.28,
      credit_discount_percent = 15.28
    WHERE name = 'جل هيركود أكياس بالشريط';
  END IF;

  -- Product: جل صبار شكل صبار
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'جل صبار شكل صبار') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('جل صبار شكل صبار', cat_cosmetics_id, 20.00, 25.00, 20.00, 20.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 20.00,
      public_price = 25.00,
      cash_discount_percent = 20.00,
      credit_discount_percent = 20.00
    WHERE name = 'جل صبار شكل صبار';
  END IF;

  -- Product: شامبو فاتيكا صغير
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'شامبو فاتيكا صغير') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('شامبو فاتيكا صغير', cat_cosmetics_id, 36.00, 45.00, 20.00, 20.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 36.00,
      public_price = 45.00,
      cash_discount_percent = 20.00,
      credit_discount_percent = 20.00
    WHERE name = 'شامبو فاتيكا صغير';
  END IF;

  -- Product: شامبو استاركي 400مل
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'شامبو استاركي 400مل') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('شامبو استاركي 400مل', cat_cosmetics_id, 47.50, 62.00, 23.39, 23.39, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 47.50,
      public_price = 62.00,
      cash_discount_percent = 23.39,
      credit_discount_percent = 23.39
    WHERE name = 'شامبو استاركي 400مل';
  END IF;

  -- Product: شامبو اسباركل 190 مل
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'شامبو اسباركل 190 مل') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('شامبو اسباركل 190 مل', cat_cosmetics_id, 28.00, 35.00, 20.00, 20.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 28.00,
      public_price = 35.00,
      cash_discount_percent = 20.00,
      credit_discount_percent = 20.00
    WHERE name = 'شامبو اسباركل 190 مل';
  END IF;

  -- Product: شامبو اسباركل 350 مل
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'شامبو اسباركل 350 مل') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('شامبو اسباركل 350 مل', cat_cosmetics_id, 46.00, 60.00, 23.33, 23.33, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 46.00,
      public_price = 60.00,
      cash_discount_percent = 23.33,
      credit_discount_percent = 23.33
    WHERE name = 'شامبو اسباركل 350 مل';
  END IF;

  -- Product: شامبو اسباركل 600 مل
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'شامبو اسباركل 600 مل') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('شامبو اسباركل 600 مل', cat_cosmetics_id, 75.00, 100.00, 25.00, 25.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 75.00,
      public_price = 100.00,
      cash_discount_percent = 25.00,
      credit_discount_percent = 25.00
    WHERE name = 'شامبو اسباركل 600 مل';
  END IF;

  -- Product: شامبو دوف 180 مل عرض
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'شامبو دوف 180 مل عرض') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('شامبو دوف 180 مل عرض', cat_cosmetics_id, 74.00, 90.00, 17.78, 17.78, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 74.00,
      public_price = 90.00,
      cash_discount_percent = 17.78,
      credit_discount_percent = 17.78
    WHERE name = 'شامبو دوف 180 مل عرض';
  END IF;

  -- Product: شامبو دوف 350 مل عرض
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'شامبو دوف 350 مل عرض') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('شامبو دوف 350 مل عرض', cat_cosmetics_id, 98.50, 120.00, 17.92, 17.92, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 98.50,
      public_price = 120.00,
      cash_discount_percent = 17.92,
      credit_discount_percent = 17.92
    WHERE name = 'شامبو دوف 350 مل عرض';
  END IF;

  -- Product: شامبو جونسون 100 مل
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'شامبو جونسون 100 مل') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('شامبو جونسون 100 مل', cat_cosmetics_id, 48.00, 60.00, 20.00, 20.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 48.00,
      public_price = 60.00,
      cash_discount_percent = 20.00,
      credit_discount_percent = 20.00
    WHERE name = 'شامبو جونسون 100 مل';
  END IF;

  -- Product: شامبو جونسون 200 مل
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'شامبو جونسون 200 مل') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('شامبو جونسون 200 مل', cat_cosmetics_id, 71.70, 92.00, 22.07, 22.07, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 71.70,
      public_price = 92.00,
      cash_discount_percent = 22.07,
      credit_discount_percent = 22.07
    WHERE name = 'شامبو جونسون 200 مل';
  END IF;

  -- Product: شامبو جونسون 500 مل
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'شامبو جونسون 500 مل') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('شامبو جونسون 500 مل', cat_cosmetics_id, 135.00, 180.00, 25.00, 25.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 135.00,
      public_price = 180.00,
      cash_discount_percent = 25.00,
      credit_discount_percent = 25.00
    WHERE name = 'شامبو جونسون 500 مل';
  END IF;

  -- Product: شامبو جونسون 750 مل
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'شامبو جونسون 750 مل') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('شامبو جونسون 750 مل', cat_cosmetics_id, 181.50, 230.00, 21.09, 21.09, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 181.50,
      public_price = 230.00,
      cash_discount_percent = 21.09,
      credit_discount_percent = 21.09
    WHERE name = 'شامبو جونسون 750 مل';
  END IF;

  -- Product: شامبو ايفا 350 مل
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'شامبو ايفا 350 مل') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('شامبو ايفا 350 مل', cat_cosmetics_id, 92.00, 115.00, 20.00, 20.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 92.00,
      public_price = 115.00,
      cash_discount_percent = 20.00,
      credit_discount_percent = 20.00
    WHERE name = 'شامبو ايفا 350 مل';
  END IF;

  -- Product: شامبو الو ايفا
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'شامبو الو ايفا') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('شامبو الو ايفا', cat_cosmetics_id, 67.50, 90.00, 25.00, 25.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 67.50,
      public_price = 90.00,
      cash_discount_percent = 25.00,
      credit_discount_percent = 25.00
    WHERE name = 'شامبو الو ايفا';
  END IF;

  -- Product: شامبو املا180 مل
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'شامبو املا180 مل') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('شامبو املا180 مل', cat_cosmetics_id, 40.00, 50.00, 20.00, 20.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 40.00,
      public_price = 50.00,
      cash_discount_percent = 20.00,
      credit_discount_percent = 20.00
    WHERE name = 'شامبو املا180 مل';
  END IF;

  -- Product: شامبو اكتيفيا لتر
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'شامبو اكتيفيا لتر') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('شامبو اكتيفيا لتر', cat_cosmetics_id, 60.00, 75.00, 20.00, 20.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 60.00,
      public_price = 75.00,
      cash_discount_percent = 20.00,
      credit_discount_percent = 20.00
    WHERE name = 'شامبو اكتيفيا لتر';
  END IF;

  -- Product: شامبو ايففرست 1 لتر
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'شامبو ايففرست 1 لتر') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('شامبو ايففرست 1 لتر', cat_cosmetics_id, 56.25, 75.00, 25.00, 25.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 56.25,
      public_price = 75.00,
      cash_discount_percent = 25.00,
      credit_discount_percent = 25.00
    WHERE name = 'شامبو ايففرست 1 لتر';
  END IF;

  -- Product: شامبو بانتين 200 مل
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'شامبو بانتين 200 مل') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('شامبو بانتين 200 مل', cat_cosmetics_id, 91.00, 110.00, 17.27, 17.27, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 91.00,
      public_price = 110.00,
      cash_discount_percent = 17.27,
      credit_discount_percent = 17.27
    WHERE name = 'شامبو بانتين 200 مل';
  END IF;

  -- Product: شامبو بانتين 400 مل
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'شامبو بانتين 400 مل') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('شامبو بانتين 400 مل', cat_cosmetics_id, 156.00, 200.00, 22.00, 22.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 156.00,
      public_price = 200.00,
      cash_discount_percent = 22.00,
      credit_discount_percent = 22.00
    WHERE name = 'شامبو بانتين 400 ml';
  END IF;

  -- Product: شامبو بلوب 850 مل
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'شامبو بلوب 850 مل') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('شامبو بلوب 850 مل', cat_cosmetics_id, 71.00, 90.00, 21.11, 21.11, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 71.00,
      public_price = 90.00,
      cash_discount_percent = 21.11,
      credit_discount_percent = 21.11
    WHERE name = 'شامبو بلوب 850 مل';
  END IF;

  -- Product: شامبو كلير رجالي 180 مل
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'شامبو كلير رجالي 180 مل') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('شامبو كلير رجالي 180 مل', cat_cosmetics_id, 72.00, 90.00, 20.00, 20.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 72.00,
      public_price = 90.00,
      cash_discount_percent = 20.00,
      credit_discount_percent = 20.00
    WHERE name = 'شامبو كلير رجالي 180 مل';
  END IF;

  -- Product: شامبو كلير حريمي
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'شامبو كلير حريمي') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('شامبو كلير حريمي', cat_cosmetics_id, 76.00, 95.00, 20.00, 20.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 76.00,
      public_price = 95.00,
      cash_discount_percent = 20.00,
      credit_discount_percent = 20.00
    WHERE name = 'شامبو كلير حريمي';
  END IF;

  -- Product: شامبو منك 750 مل
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'شامبو منك 750 مل') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('شامبو منك 750 مل', cat_cosmetics_id, 54.75, 75.00, 27.00, 27.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 54.75,
      public_price = 75.00,
      cash_discount_percent = 27.00,
      credit_discount_percent = 27.00
    WHERE name = 'شامبو منك 750 مل';
  END IF;

  -- Product: حنه 5*5 صغير
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'حنه 5*5 صغير') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('حنه 5*5 صغير', cat_cosmetics_id, 18.50, 23.00, 19.57, 19.57, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 18.50,
      public_price = 23.00,
      cash_discount_percent = 19.57,
      credit_discount_percent = 19.57
    WHERE name = 'حنه 5*5 صغير';
  END IF;

  -- Product: حنه 5*5 كبير
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'حنه 5*5 كبير') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('حنه 5*5 كبير', cat_cosmetics_id, 30.00, 40.00, 25.00, 25.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 30.00,
      public_price = 40.00,
      cash_discount_percent = 25.00,
      credit_discount_percent = 25.00
    WHERE name = 'حنه 5*5 كبير';
  END IF;

  -- Product: صابون ديتول 85 مل جم 4 قطع
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'صابون ديتول 85 مل جم 4 قطع') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('صابون ديتول 85 مل جم 4 قطع', cat_cosmetics_id, 92.50, 110.00, 15.91, 15.91, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 92.50,
      public_price = 110.00,
      cash_discount_percent = 15.91,
      credit_discount_percent = 15.91
    WHERE name = 'صابون ديتول 85 مل جم 4 قطع';
  END IF;

  -- Product: صابون ديتول 115 جم عرض
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'صابون ديتول 115 جم عرض') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('صابون ديتول 115 جم عرض', cat_cosmetics_id, 140.00, 140.00, 0.00, 0.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 140.00,
      public_price = 140.00,
      cash_discount_percent = 0.00,
      credit_discount_percent = 0.00
    WHERE name = 'صابون ديتول 115 جم عرض';
  END IF;

  -- Product: صابون 165 جم
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'صابون 165 جم') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('صابون 165 جم', cat_cosmetics_id, 38.25, 45.00, 15.00, 15.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 38.25,
      public_price = 45.00,
      cash_discount_percent = 15.00,
      credit_discount_percent = 15.00
    WHERE name = 'صابون 165 جم';
  END IF;


  -- ==========================================
  -- PAGE 3 PRODUCTS
  -- ==========================================

  -- Product: صابو لايف بوي 85 جم
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'صابو لايف بوي 85 جم') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('صابو لايف بوي 85 جم', cat_cosmetics_id, 54.00, 65.00, 16.92, 16.92, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 54.00,
      public_price = 65.00,
      cash_discount_percent = 16.92,
      credit_discount_percent = 16.92
    WHERE name = 'صابو لايف بوي 85 جم';
  END IF;

  -- Product: صابون لايف بوي 115 جم
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'صابون لايف بوي 115 جم') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('صابون لايف بوي 115 جم', cat_cosmetics_id, 78.00, 95.00, 17.89, 17.89, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 78.00,
      public_price = 95.00,
      cash_discount_percent = 17.89,
      credit_discount_percent = 17.89
    WHERE name = 'صابون لايف بوي 115 جم';
  END IF;

  -- Product: شامبو نونو 100 مل
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'شامبو نونو 100 مل') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('شامبو نونو 100 مل', cat_cosmetics_id, 22.80, 30.00, 24.00, 24.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 22.80,
      public_price = 30.00,
      cash_discount_percent = 24.00,
      credit_discount_percent = 24.00
    WHERE name = 'شامبو نونو 100 مل';
  END IF;

  -- Product: باندولين شامبو 250 مل
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'باندولين شامبو 250 مل') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('باندولين شامبو 250 مل', cat_cosmetics_id, 151.50, 185.00, 18.11, 18.11, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 151.50,
      public_price = 185.00,
      cash_discount_percent = 18.11,
      credit_discount_percent = 18.11
    WHERE name = 'باندولين شامبو 250 مل';
  END IF;

  -- Product: باندولين شامبو 450 مل
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'باندولين شامبو 450 مل') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('باندولين شامبو 450 مل', cat_cosmetics_id, 205.00, 250.00, 18.00, 18.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 205.00,
      public_price = 250.00,
      cash_discount_percent = 18.00,
      credit_discount_percent = 18.00
    WHERE name = 'باندولين شامبو 450 مل';
  END IF;

  -- Product: باندولين شاور جل
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'باندولين شاور جل') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('باندولين شاور جل', cat_cosmetics_id, 154.00, 195.00, 21.03, 21.03, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 154.00,
      public_price = 195.00,
      cash_discount_percent = 21.03,
      credit_discount_percent = 21.03
    WHERE name = 'باندولين شاور جل';
  END IF;

  -- Product: باندولين كريم عادي 150 ملي
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'باندولين كريم عادي 150 ملي') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('باندولين كريم عادي 150 ملي', cat_cosmetics_id, 123.50, 150.00, 17.67, 17.67, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 123.50,
      public_price = 150.00,
      cash_discount_percent = 17.67,
      credit_discount_percent = 17.67
    WHERE name = 'باندولين كريم عادي 150 ملي';
  END IF;

  -- Product: باندولين كريم بالشيا
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'باندولين كريم بالشيا') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('باندولين كريم بالشيا', cat_cosmetics_id, 130.00, 155.00, 16.13, 16.13, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 130.00,
      public_price = 155.00,
      cash_discount_percent = 16.13,
      credit_discount_percent = 16.13
    WHERE name = 'باندولين كريم بالشيا';
  END IF;

  -- Product: شامبو نونو 200 مل
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'شامبو نونو 200 مل') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('شامبو نونو 200 مل', cat_cosmetics_id, 45.00, 55.00, 18.18, 18.18, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 45.00,
      public_price = 55.00,
      cash_discount_percent = 18.18,
      credit_discount_percent = 18.18
    WHERE name = 'شامبو نونو 200 مل';
  END IF;

  -- Product: شاور لوكس 500 مل
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'شاور لوكس 500 مل') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('شاور لوكس 500 مل', cat_cosmetics_id, 82.00, 98.00, 16.33, 16.33, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 82.00,
      public_price = 98.00,
      cash_discount_percent = 16.33,
      credit_discount_percent = 16.33
    WHERE name = 'شاور لوكس 500 مل';
  END IF;

  -- Product: شاور جل 1 لتر
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'شاور جل 1 لتر') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('شاور جل 1 لتر', cat_cosmetics_id, 45.00, 60.00, 25.00, 25.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 45.00,
      public_price = 60.00,
      cash_discount_percent = 25.00,
      credit_discount_percent = 25.00
    WHERE name = 'شاور جل 1 لتر';
  END IF;

  -- Product: فوج بليه
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'فوج بليه') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('فوج بليه', cat_cosmetics_id, 48.00, 60.00, 20.00, 20.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 48.00,
      public_price = 60.00,
      cash_discount_percent = 20.00,
      credit_discount_percent = 20.00
    WHERE name = 'فوج بليه';
  END IF;

  -- Product: برفان حبيبتي 50 مل
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'برفان حبيبتي 50 مل') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('برفان حبيبتي 50 مل', cat_cosmetics_id, 32.00, 40.00, 20.00, 20.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 32.00,
      public_price = 40.00,
      cash_discount_percent = 20.00,
      credit_discount_percent = 20.00
    WHERE name = 'برفان حبيبتي 50 مل';
  END IF;

  -- Product: برفان حبيبتي 100 مل
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'برفان حبيبتي 100 مل') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('برفان حبيبتي 100 مل', cat_cosmetics_id, 43.50, 60.00, 27.50, 27.50, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 43.50,
      public_price = 60.00,
      cash_discount_percent = 27.50,
      credit_discount_percent = 27.50
    WHERE name = 'برفان حبيبتي 100 مل';
  END IF;

  -- Product: مكن جلت حريمي عرض 5ق
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'مكن جلت حريمي عرض 5ق') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('مكن جلت حريمي عرض 5ق', cat_medical_id, 74.00, 95.00, 22.11, 22.11, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 74.00,
      public_price = 95.00,
      cash_discount_percent = 22.11,
      credit_discount_percent = 22.11
    WHERE name = 'مكن جلت حريمي عرض 5ق';
  END IF;

  -- Product: مخمريه رنه خلخال
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'مخمريه رنه خلخال') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('مخمريه رنه خلخال', cat_cosmetics_id, 12.00, 15.00, 20.00, 20.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 12.00,
      public_price = 15.00,
      cash_discount_percent = 20.00,
      credit_discount_percent = 20.00
    WHERE name = 'مخمريه رنه خلخال';
  END IF;

  -- Product: مخمريه اوليفا
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'مخمريه اوليفا') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('مخمريه اوليفا', cat_cosmetics_id, 11.25, 15.00, 25.00, 25.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 11.25,
      public_price = 15.00,
      cash_discount_percent = 25.00,
      credit_discount_percent = 25.00
    WHERE name = 'مخمريه اوليفا';
  END IF;

  -- Product: مكن لورد حديد
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'مكن لورد حديد') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('مكن لورد حديد', cat_medical_id, 34.00, 40.00, 15.00, 15.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 34.00,
      public_price = 40.00,
      cash_discount_percent = 15.00,
      credit_discount_percent = 15.00
    WHERE name = 'مكن لورد حديد';
  END IF;

  -- Product: معطر فريده
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'معطر فريده') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('معطر فريده', cat_cosmetics_id, 60.00, 75.00, 20.00, 20.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 60.00,
      public_price = 75.00,
      cash_discount_percent = 20.00,
      credit_discount_percent = 20.00
    WHERE name = 'معطر فريده';
  END IF;

  -- Product: معجون ديبرودنت صغير
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'معجون ديبرودنت صغير') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('معجون ديبرودنت صغير', cat_cosmetics_id, 32.00, 42.00, 23.81, 23.81, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 32.00,
      public_price = 42.00,
      cash_discount_percent = 23.81,
      credit_discount_percent = 23.81
    WHERE name = 'معجون ديبرودنت صغير';
  END IF;

  -- Product: معجون ديبرودنت 25 مل
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'معجون ديبرودنت 25 مل') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('معجون ديبرودنت 25 مل', cat_cosmetics_id, 45.00, 60.00, 25.00, 25.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 45.00,
      public_price = 60.00,
      cash_discount_percent = 25.00,
      credit_discount_percent = 25.00
    WHERE name = 'معجون ديبرودنت 25 مل';
  END IF;

  -- Product: معجون ديبرودنت كبير 50 مل
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'معجون ديبرودنت كبير 50 مل') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('معجون ديبرودنت كبير 50 مل', cat_cosmetics_id, 63.00, 80.00, 21.25, 21.25, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 63.00,
      public_price = 80.00,
      cash_discount_percent = 21.25,
      credit_discount_percent = 21.25
    WHERE name = 'معجون ديبرودنت كبير 50 مل';
  END IF;

  -- Product: فرش اسنان سيجنال كبار
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'فرش اسنان سيجنال كبار') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('فرش اسنان سيجنال كبار', cat_medical_id, 28.00, 35.00, 20.00, 20.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 28.00,
      public_price = 35.00,
      cash_discount_percent = 20.00,
      credit_discount_percent = 20.00
    WHERE name = 'فرش اسنان سيجنال كبار';
  END IF;

  -- Product: فرش اسنان سنسوداين
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'فرش اسنان سنسوداين') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('فرش اسنان سنسوداين', cat_medical_id, 50.50, 70.00, 27.86, 27.86, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 50.50,
      public_price = 70.00,
      cash_discount_percent = 27.86,
      credit_discount_percent = 27.86
    WHERE name = 'فرش اسنان سنسوداين';
  END IF;

  -- Product: فرش الجو
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'فرش الجو') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('فرش الجو', cat_medical_id, 7.50, 15.00, 50.00, 50.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 7.50,
      public_price = 15.00,
      cash_discount_percent = 50.00,
      credit_discount_percent = 50.00
    WHERE name = 'فرش الجو';
  END IF;

  -- Product: زبده كاكاو لونه
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'زبده كاكاو لونه') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('زبده كاكاو لونه', cat_cosmetics_id, 13.00, 15.00, 13.33, 13.33, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 13.00,
      public_price = 15.00,
      cash_discount_percent = 13.33,
      credit_discount_percent = 13.33
    WHERE name = 'زبده كاكاو لونه';
  END IF;

  -- Product: زبده كاكاو اوبال
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'زبده كاكاو اوبال') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('زبده كاكاو اوبال', cat_cosmetics_id, 10.00, 13.00, 23.08, 23.08, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 10.00,
      public_price = 13.00,
      cash_discount_percent = 23.08,
      credit_discount_percent = 23.08
    WHERE name = 'زبده كاكاو اوبال';
  END IF;

  -- Product: سم فران 2 دسته
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'سم فران 2 دسته') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('سم فران 2 دسته', cat_medical_id, 48.00, 75.00, 36.00, 36.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 48.00,
      public_price = 75.00,
      cash_discount_percent = 36.00,
      credit_discount_percent = 36.00
    WHERE name = 'سم فران 2 دسته';
  END IF;

  -- Product: جهاز ناموس ريد مع سائل
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'جهاز ناموس ريد مع سائل') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('جهاز ناموس ريد مع سائل', cat_medical_id, 141.00, 170.00, 17.06, 17.06, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 141.00,
      public_price = 170.00,
      cash_discount_percent = 17.06,
      credit_discount_percent = 17.06
    WHERE name = 'جهاز ناموس ريد مع سائل';
  END IF;

  -- Product: جهاز ناموس باور مع سائل
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'جهاز ناموس باور مع سائل') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('جهاز ناموس باور مع سائل', cat_medical_id, 90.00, 90.00, 0.00, 0.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 90.00,
      public_price = 90.00,
      cash_discount_percent = 0.00,
      credit_discount_percent = 0.00
    WHERE name = 'جهاز ناموس باور مع سائل';
  END IF;

  -- Product: جهاز محلول الترا
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'جهاز محلول الترا') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('جهاز محلول الترا', cat_medical_id, 8.00, 10.00, 20.00, 20.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 8.00,
      public_price = 10.00,
      cash_discount_percent = 20.00,
      credit_discount_percent = 20.00
    WHERE name = 'جهاز محلول الترا';
  END IF;

  -- Product: جهاز محلول الدوليه
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'جهاز محلول الدوليه') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('جهاز محلول الدوليه', cat_medical_id, 6.00, 10.00, 40.00, 40.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 6.00,
      public_price = 10.00,
      cash_discount_percent = 40.00,
      credit_discount_percent = 40.00
    WHERE name = 'جهاز محلول الدوليه';
  END IF;

  -- Product: جوانتي طبي ميديم
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'جوانتي طبي ميديم') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('جوانتي طبي ميديم', cat_medical_id, 210.00, 300.00, 30.00, 30.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 210.00,
      public_price = 300.00,
      cash_discount_percent = 30.00,
      credit_discount_percent = 30.00
    WHERE name = 'جوانتي طبي ميديم';
  END IF;

  -- Product: جوانتي عمال ماليزي
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'جوانتي عمال ماليزي') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('جوانتي عمال ماليزي', cat_medical_id, 40.00, 50.00, 20.00, 20.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 40.00,
      public_price = 50.00,
      cash_discount_percent = 20.00,
      credit_discount_percent = 20.00
    WHERE name = 'جوانتي عمال ماليزي';
  END IF;

  -- Product: جوانتي فحص خفيف باللفه
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'جوانتي فحص خفيف باللفه') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('جوانتي فحص خفيف باللفه', cat_medical_id, 4.00, 6.00, 33.33, 33.33, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 4.00,
      public_price = 6.00,
      cash_discount_percent = 33.33,
      credit_discount_percent = 33.33
    WHERE name = 'جوانتي فحص خفيف باللفه';
  END IF;

  -- Product: جوانتي فحص ثقيل باللفه
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'جوانتي فحص ثقيل باللفه') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('جوانتي فحص ثقيل باللفه', cat_medical_id, 9.00, 15.00, 40.00, 40.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 9.00,
      public_price = 15.00,
      cash_discount_percent = 40.00,
      credit_discount_percent = 40.00
    WHERE name = 'جوانتي فحص ثقيل باللفه';
  END IF;

  -- Product: جوانتي لاتكس
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'جوانتي لاتكس') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('جوانتي لاتكس', cat_medical_id, 210.00, 300.00, 30.00, 30.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 210.00,
      public_price = 300.00,
      cash_discount_percent = 30.00,
      credit_discount_percent = 30.00
    WHERE name = 'جوانتي لاتكس';
  END IF;

  -- Product: جوانتي مطبخ
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'جوانتي مطبخ') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('جوانتي مطبخ', cat_medical_id, 26.00, 35.00, 25.71, 25.71, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 26.00,
      public_price = 35.00,
      cash_discount_percent = 25.71,
      credit_discount_percent = 25.71
    WHERE name = 'جوانتي مطبخ';
  END IF;

  -- Product: حلمه الكو رضاعه
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'حلمه الكو رضاعه') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('حلمه الكو رضاعه', cat_medical_id, 7.00, 10.00, 30.00, 30.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 7.00,
      public_price = 10.00,
      cash_discount_percent = 30.00,
      credit_discount_percent = 30.00
    WHERE name = 'حلمه الكو رضاعه';
  END IF;

  -- Product: الكو سكاته سلسله بالكارت
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'الكو سكاته سلسله بالكارت') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('الكو سكاته سلسله بالكارت', cat_medical_id, 120.00, 160.00, 25.00, 25.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 120.00,
      public_price = 160.00,
      cash_discount_percent = 25.00,
      credit_discount_percent = 25.00
    WHERE name = 'الكو سكاته سلسله بالكارت';
  END IF;


  -- ==========================================
  -- PAGE 4 PRODUCTS
  -- ==========================================

  -- Product: سن انسولين 5 مل فري فاين
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'سن انسولين 5 مل فري فاين') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('سن انسولين 5 مل فري فاين', cat_medical_id, 240.00, 320.00, 25.00, 25.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 240.00,
      public_price = 320.00,
      cash_discount_percent = 25.00,
      credit_discount_percent = 25.00
    WHERE name = 'سن انسولين 5 مل فري فاين';
  END IF;

  -- Product: سن انسولين 6 مل فري فاين
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'سن انسولين 6 مل فري فاين') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('سن انسولين 6 مل فري فاين', cat_medical_id, 240.00, 320.00, 25.00, 25.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 240.00,
      public_price = 320.00,
      cash_discount_percent = 25.00,
      credit_discount_percent = 25.00
    WHERE name = 'سن انسولين 6 مل فري فاين';
  END IF;

  -- Product: بيرونه الكو ميني 60 مل
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'بيرونه الكو ميني 60 مل') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('بيرونه الكو ميني 60 مل', cat_medical_id, 19.00, 25.00, 24.00, 24.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 19.00,
      public_price = 25.00,
      cash_discount_percent = 24.00,
      credit_discount_percent = 24.00
    WHERE name = 'بيرونه الكو ميني 60 مل';
  END IF;

  -- Product: بيرونه بيبي روز 75 مل
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'بيرونه بيبي روز 75 مل') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('بيرونه بيبي روز 75 مل', cat_medical_id, 12.00, 15.00, 20.00, 20.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 12.00,
      public_price = 15.00,
      cash_discount_percent = 20.00,
      credit_discount_percent = 20.00
    WHERE name = 'بيرونه بيبي روز 75 مل';
  END IF;

  -- Product: بيرونه بيبي روز 150 مل
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'بيرونه بيبي روز 150 مل') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('بيرونه بيبي روز 150 مل', cat_medical_id, 15.00, 25.00, 40.00, 40.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 15.00,
      public_price = 25.00,
      cash_discount_percent = 40.00,
      credit_discount_percent = 40.00
    WHERE name = 'بيرونه بيبي روز 150 مل';
  END IF;

  -- Product: بيرونه بيبي روز 250 مل
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'بيرونه بيبي روز 250 مل') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('بيرونه بيبي روز 250 مل', cat_medical_id, 18.00, 25.00, 28.00, 28.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 18.00,
      public_price = 25.00,
      cash_discount_percent = 28.00,
      credit_discount_percent = 28.00
    WHERE name = 'بيرونه بيبي روز 250 مل';
  END IF;

  -- Product: أصابع طبيه ميدي
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'أصابع طبيه ميدي') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('أصابع طبيه ميدي', cat_medical_id, 45.00, 60.00, 25.00, 25.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 45.00,
      public_price = 60.00,
      cash_discount_percent = 25.00,
      credit_discount_percent = 25.00
    WHERE name = 'أصابع طبيه ميدي';
  END IF;

  -- Product: جهاز ناموس باور
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'جهاز ناموس باور') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('جهاز ناموس باور', cat_medical_id, 32.00, 40.00, 20.00, 20.00, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 32.00,
      public_price = 40.00,
      cash_discount_percent = 20.00,
      credit_discount_percent = 20.00
    WHERE name = 'جهاز ناموس باور';
  END IF;

END $$;
