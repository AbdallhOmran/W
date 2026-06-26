-- ============================================================
-- SQL Seed Script to Insert Categories and 115 Products
-- ============================================================

-- 1. Insert Categories (Using INSERT ON CONFLICT DO NOTHING)
INSERT INTO categories (name) VALUES 
  ('مستحضرات تجميل وعناية'),
  ('مستلزمات طبية')
ON CONFLICT (name) DO NOTHING;

-- 2. Insert/Update Products
DO $$
DECLARE
  cat_cosmetics_id UUID;
  cat_medical_id UUID;
BEGIN
  SELECT id INTO cat_cosmetics_id FROM categories WHERE name = 'مستحضرات تجميل وعناية';
  SELECT id INTO cat_medical_id FROM categories WHERE name = 'مستلزمات طبية';

  -- Product: موفى 5
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'مونى 5') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('مونى 5', cat_cosmetics_id, 168, 200, 12, 9, 5, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 168,
      public_price = 200,
      cash_discount_percent = 12,
      credit_discount_percent = 9,
      box_quantity = 5
    WHERE name = 'مونى 5';
  END IF;

  -- Product: موفى 4
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'مونى 4') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('مونى 4', cat_cosmetics_id, 148, 200, 21.5, 6, 5, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 148,
      public_price = 200,
      cash_discount_percent = 21.5,
      credit_discount_percent = 6,
      box_quantity = 5
    WHERE name = 'مونى 4';
  END IF;

  -- Product: موفى 3
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'مونى 3') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('مونى 3', cat_cosmetics_id, 148, 200, 21.5, 17, 5, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 148,
      public_price = 200,
      cash_discount_percent = 21.5,
      credit_discount_percent = 17,
      box_quantity = 5
    WHERE name = 'مونى 3';
  END IF;

  -- Product: موفى 2
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'مونى 2') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('مونى 2', cat_cosmetics_id, 144, 180, 18.33, 15, 5, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 144,
      public_price = 180,
      cash_discount_percent = 18.33,
      credit_discount_percent = 15,
      box_quantity = 5
    WHERE name = 'مونى 2';
  END IF;

  -- Product: هالو 5
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'هالو 5') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('هالو 5', cat_cosmetics_id, 181, 220, 13.64, 12.73, 5, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 181,
      public_price = 220,
      cash_discount_percent = 13.64,
      credit_discount_percent = 12.73,
      box_quantity = 5
    WHERE name = 'هالو 5';
  END IF;

  -- Product: هالو 4
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'هالو 4') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('هالو 4', cat_cosmetics_id, 166, 220, 20.45, 19.55, 5, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 166,
      public_price = 220,
      cash_discount_percent = 20.45,
      credit_discount_percent = 19.55,
      box_quantity = 5
    WHERE name = 'هالو 4';
  END IF;

  -- Product: هالو 3
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'هالو 3') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('هالو 3', cat_cosmetics_id, 165, 200, 13.5, 12.5, 5, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 165,
      public_price = 200,
      cash_discount_percent = 13.5,
      credit_discount_percent = 12.5,
      box_quantity = 5
    WHERE name = 'هالو 3';
  END IF;

  -- Product: هالو 2
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'هالو 2') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('هالو 2', cat_cosmetics_id, 153, 200, 20, 18.5, 5, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 153,
      public_price = 200,
      cash_discount_percent = 20,
      credit_discount_percent = 18.5,
      box_quantity = 5
    WHERE name = 'هالو 2';
  END IF;

  -- Product: هالو 1
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'هالو 1') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('هالو 1', cat_cosmetics_id, 151, 200, 22.5, 20, 5, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 151,
      public_price = 200,
      cash_discount_percent = 22.5,
      credit_discount_percent = 20,
      box_quantity = 5
    WHERE name = 'هالو 1';
  END IF;

  -- Product: بيبى دوا
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'بيبى دوا') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('بيبى دوا', cat_medical_id, 124, 180, 19.44, 18.33, 5, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 124,
      public_price = 180,
      cash_discount_percent = 19.44,
      credit_discount_percent = 18.33,
      box_quantity = 5
    WHERE name = 'بيبى دوا';
  END IF;

  -- Product: VIP 50 مم
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'VIP 50 مم') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('VIP 50 مم', cat_medical_id, 3.4, 5, 20, 20, 200, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 3.4,
      public_price = 5,
      cash_discount_percent = 20,
      credit_discount_percent = 20,
      box_quantity = 200
    WHERE name = 'VIP 50 مم';
  END IF;

  -- Product: حب تمارا 18 مم
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'حب تمارا 18 مم') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('حب تمارا 18 مم', cat_medical_id, 19, 30, 33.33, 26.67, 18, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 19,
      public_price = 30,
      cash_discount_percent = 33.33,
      credit_discount_percent = 26.67,
      box_quantity = 18
    WHERE name = 'حب تمارا 18 مم';
  END IF;

  -- Product: فرش
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'فرش') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('فرش', cat_medical_id, 6.25, 20, 62.5, 50, 12, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 6.25,
      public_price = 20,
      cash_discount_percent = 62.5,
      credit_discount_percent = 50,
      box_quantity = 12
    WHERE name = 'فرش';
  END IF;

  -- Product: جهاز ريد
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'جهاز ريد') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('جهاز ريد', cat_medical_id, 140, 175, 17.14, 15.43, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 140,
      public_price = 175,
      cash_discount_percent = 17.14,
      credit_discount_percent = 15.43,
      box_quantity = 1
    WHERE name = 'جهاز ريد';
  END IF;

  -- Product: معجون حلاقة 5X5
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'معجون حلاقة 5X5') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('معجون حلاقة 5X5', cat_cosmetics_id, 16.25, 25, 24, 20, 12, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 16.25,
      public_price = 25,
      cash_discount_percent = 24,
      credit_discount_percent = 20,
      box_quantity = 12
    WHERE name = 'معجون حلاقة 5X5';
  END IF;

  -- Product: ستبلس
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'ستبلس') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('ستبلس', cat_medical_id, 17, 25, 24, 20, 12, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 17,
      public_price = 25,
      cash_discount_percent = 24,
      credit_discount_percent = 20,
      box_quantity = 12
    WHERE name = 'ستبلس';
  END IF;

  -- Product: وان
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'وان') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('وان', cat_medical_id, 18, 25, 20, 20, 12, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 18,
      public_price = 25,
      cash_discount_percent = 20,
      credit_discount_percent = 20,
      box_quantity = 12
    WHERE name = 'وان';
  END IF;

  -- Product: قرص صغير
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'قرص صغير') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('قرص صغير', cat_medical_id, 13.75, 20, 25, 25, 12, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 13.75,
      public_price = 20,
      cash_discount_percent = 25,
      credit_discount_percent = 25,
      box_quantity = 12
    WHERE name = 'قرص صغير';
  END IF;

  -- Product: قرص كبير
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'قرص كبير') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('قرص كبير', cat_medical_id, 27, 40, 25, 22.5, 12, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 27,
      public_price = 40,
      cash_discount_percent = 25,
      credit_discount_percent = 22.5,
      box_quantity = 12
    WHERE name = 'قرص كبير';
  END IF;

  -- Product: جيل ستار 24 مم
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'جيل ستار 24 مم') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('جيل ستار 24 مم', cat_medical_id, 25, 35, 25.71, 24.29, 24, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 25,
      public_price = 35,
      cash_discount_percent = 25.71,
      credit_discount_percent = 24.29,
      box_quantity = 24
    WHERE name = 'جيل ستار 24 مم';
  END IF;

  -- Product: زيت فاتيكا كبير
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'زيت فاتيكا كبير') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('زيت فاتيكا كبير', cat_cosmetics_id, 28.8, 40, 22.5, 20, 12, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 28.8,
      public_price = 40,
      cash_discount_percent = 22.5,
      credit_discount_percent = 20,
      box_quantity = 12
    WHERE name = 'زيت فاتيكا كبير';
  END IF;

  -- Product: زيت فاتيكا وسط
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'زيت فاتيكا وسط') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('زيت فاتيكا وسط', cat_cosmetics_id, 16.25, 25, 26, 20, 12, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 16.25,
      public_price = 25,
      cash_discount_percent = 26,
      credit_discount_percent = 20,
      box_quantity = 12
    WHERE name = 'زيت فاتيكا وسط';
  END IF;

  -- Product: زيت فاتيكا صغير
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'زيت فاتيكا صغير') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('زيت فاتيكا صغير', cat_cosmetics_id, 7.9, 15, 46.67, 40, 12, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 7.9,
      public_price = 15,
      cash_discount_percent = 46.67,
      credit_discount_percent = 40,
      box_quantity = 12
    WHERE name = 'زيت فاتيكا صغير';
  END IF;

  -- Product: كريم ليبة
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'كريم ليبة') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('كريم ليبة', cat_cosmetics_id, 25.8, 35, 20, 17.14, 12, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 25.8,
      public_price = 35,
      cash_discount_percent = 20,
      credit_discount_percent = 17.14,
      box_quantity = 12
    WHERE name = 'كريم ليبة';
  END IF;

  -- Product: بلوبوكس
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'بلوبوكس') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('بلوبوكس', cat_cosmetics_id, 34.16, 40, 12.5, 12.5, 12, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 34.16,
      public_price = 40,
      cash_discount_percent = 12.5,
      credit_discount_percent = 12.5,
      box_quantity = 12
    WHERE name = 'بلوبوكس';
  END IF;

  -- Product: مارينا صغير
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'مارينا صغير') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('مارينا صغير', cat_cosmetics_id, 12, 20, 37.5, 37.5, 12, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 12,
      public_price = 20,
      cash_discount_percent = 37.5,
      credit_discount_percent = 37.5,
      box_quantity = 12
    WHERE name = 'مارينا صغير';
  END IF;

  -- Product: مارينا كبير
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'مارينا كبير') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('مارينا كبير', cat_cosmetics_id, 24.25, 35, 25.71, 22.86, 12, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 24.25,
      public_price = 35,
      cash_discount_percent = 25.71,
      credit_discount_percent = 22.86,
      box_quantity = 12
    WHERE name = 'مارينا كبير';
  END IF;

  -- Product: نيفيا وفت وسط 100 مم
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'نيفيا وفت وسط 100 مم') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('نيفيا وفت وسط 100 مم', cat_cosmetics_id, 45, 65, 26.15, 24.62, 12, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 45,
      public_price = 65,
      cash_discount_percent = 26.15,
      credit_discount_percent = 24.62,
      box_quantity = 12
    WHERE name = 'نيفيا وفت وسط 100 مم';
  END IF;

  -- Product: نيفيا وفت صغير 50 مم
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'نيفيا وفت صغير 50 مم') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('نيفيا وفت صغير 50 مم', cat_cosmetics_id, 25, 35, 22.86, 20, 12, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 25,
      public_price = 35,
      cash_discount_percent = 22.86,
      credit_discount_percent = 20,
      box_quantity = 12
    WHERE name = 'نيفيا وفت صغير 50 مم';
  END IF;

  -- Product: حنة جوليشيا
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'حنة جوليشيا') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('حنة جوليشيا', cat_cosmetics_id, 30, 40, 20, 17.5, 12, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 30,
      public_price = 40,
      cash_discount_percent = 20,
      credit_discount_percent = 17.5,
      box_quantity = 12
    WHERE name = 'حنة جوليشيا';
  END IF;

  -- Product: حنة فاتيكا
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'حنة فاتيكا') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('حنة فاتيكا', cat_cosmetics_id, 26.25, 40, 26.25, 25, 6, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 26.25,
      public_price = 40,
      cash_discount_percent = 26.25,
      credit_discount_percent = 25,
      box_quantity = 6
    WHERE name = 'حنة فاتيكا';
  END IF;

  -- Product: حنة جومانا
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'حنة جومانا') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('حنة جومانا', cat_cosmetics_id, 9.5, 15, 30, 30, 12, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 9.5,
      public_price = 15,
      cash_discount_percent = 30,
      credit_discount_percent = 30,
      box_quantity = 12
    WHERE name = 'حنة جومانا';
  END IF;

  -- Product: حنة جلورى
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'حنة جلورى') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('حنة جلورى', cat_cosmetics_id, 205, 280, 17.86, 14.29, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 205,
      public_price = 280,
      cash_discount_percent = 17.86,
      credit_discount_percent = 14.29,
      box_quantity = 1
    WHERE name = 'حنة جلورى';
  END IF;

  -- Product: فيانسيه صغير
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'فيانسيه صغير') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('فيانسيه صغير', cat_cosmetics_id, 26, 30, 10, 10, 12, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 26,
      public_price = 30,
      cash_discount_percent = 10,
      credit_discount_percent = 10,
      box_quantity = 12
    WHERE name = 'فيانسيه صغير';
  END IF;

  -- Product: فيانسيه وسط
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'فيانسيه وسط') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('فيانسيه وسط', cat_cosmetics_id, 35, 50, 26, 22, 12, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 35,
      public_price = 50,
      cash_discount_percent = 26,
      credit_discount_percent = 22,
      box_quantity = 12
    WHERE name = 'فيانسيه وسط';
  END IF;

  -- Product: زيت أملا صغير
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'زيت أملا صغير') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('زيت أملا صغير', cat_cosmetics_id, 38, 55, 27.27, 25.45, 12, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 38,
      public_price = 55,
      cash_discount_percent = 27.27,
      credit_discount_percent = 25.45,
      box_quantity = 12
    WHERE name = 'زيت أملا صغير';
  END IF;

  -- Product: زيت أملا وسط
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'زيت أملا وسط') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('زيت أملا وسط', cat_cosmetics_id, 61, 85, 23.53, 21.76, 12, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 61,
      public_price = 85,
      cash_discount_percent = 23.53,
      credit_discount_percent = 21.76,
      box_quantity = 12
    WHERE name = 'زيت أملا وسط';
  END IF;

  -- Product: زيت أملا كبير
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'زيت أملا كبير') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('زيت أملا كبير', cat_cosmetics_id, 81, 105, 18.1, 15.24, 12, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 81,
      public_price = 105,
      cash_discount_percent = 18.1,
      credit_discount_percent = 15.24,
      box_quantity = 12
    WHERE name = 'زيت أملا كبير';
  END IF;

  -- Product: ديسكو صغير
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'ديسكو صغير') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('ديسكو صغير', cat_cosmetics_id, 22, 30, 20, 20, 12, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 22,
      public_price = 30,
      cash_discount_percent = 20,
      credit_discount_percent = 20,
      box_quantity = 12
    WHERE name = 'ديسكو صغير';
  END IF;

  -- Product: ديسكو وسط
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'ديسكو وسط') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('ديسكو وسط', cat_cosmetics_id, 32.5, 40, 17.5, 17.5, 12, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 32.5,
      public_price = 40,
      cash_discount_percent = 17.5,
      credit_discount_percent = 17.5,
      box_quantity = 12
    WHERE name = 'ديسكو وسط';
  END IF;

  -- Product: لزق فار
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'لزق فار') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('لزق فار', cat_medical_id, 12, 20, 35, 30, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 12,
      public_price = 20,
      cash_discount_percent = 35,
      credit_discount_percent = 30,
      box_quantity = 1
    WHERE name = 'لزق فار';
  END IF;

  -- Product: سيجنال صغير
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'سيجنال صغير') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('سيجنال صغير', cat_cosmetics_id, 12.5, 20, 25, 25, 12, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 12.5,
      public_price = 20,
      cash_discount_percent = 25,
      credit_discount_percent = 25,
      box_quantity = 12
    WHERE name = 'سيجنال صغير';
  END IF;

  -- Product: سيجنال وسط
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'سيجنال وسط') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('سيجنال وسط', cat_cosmetics_id, 24, 35, 28.57, 20, 12, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 24,
      public_price = 35,
      cash_discount_percent = 28.57,
      credit_discount_percent = 20,
      box_quantity = 12
    WHERE name = 'سيجنال وسط';
  END IF;

  -- Product: ايفا صغير
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'ايفا صغير') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('ايفا صغير', cat_cosmetics_id, 13.75, 15, 8.33, 6.67, 12, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 13.75,
      public_price = 15,
      cash_discount_percent = 8.33,
      credit_discount_percent = 6.67,
      box_quantity = 12
    WHERE name = 'ايفا صغير';
  END IF;

  -- Product: ايفا وسط
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'ايفا وسط') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('ايفا وسط', cat_cosmetics_id, 22, 30, 21.67, 20, 12, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 22,
      public_price = 30,
      cash_discount_percent = 21.67,
      credit_discount_percent = 20,
      box_quantity = 12
    WHERE name = 'ايفا وسط';
  END IF;

  -- Product: جل فاتيكا أكياس 30 مم
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'جل فاتيكا أكياس 30 مم') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('جل فاتيكا أكياس 30 مم', cat_cosmetics_id, 13.32, 18, 22.22, 16.67, 30, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 13.32,
      public_price = 18,
      cash_discount_percent = 22.22,
      credit_discount_percent = 16.67,
      box_quantity = 30
    WHERE name = 'جل فاتيكا أكياس 30 مم';
  END IF;

  -- Product: بيرسول
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'بيرسول') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('بيرسول', cat_medical_id, 46, 60, 20, 20, 12, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 46,
      public_price = 60,
      cash_discount_percent = 20,
      credit_discount_percent = 20,
      box_quantity = 12
    WHERE name = 'بيرسول';
  END IF;

  -- Product: راجونج فايتر
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'راجونج فايتر') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('راجونج فايتر', cat_medical_id, 30.4, 40, 18.75, 16.25, 12, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 30.4,
      public_price = 40,
      cash_discount_percent = 18.75,
      credit_discount_percent = 16.25,
      box_quantity = 12
    WHERE name = 'راجونج فايتر';
  END IF;

  -- Product: راجونج زاحف
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'راجونج زاحف') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('راجونج زاحف', cat_medical_id, 43.75, 55, 15.45, 12.73, 12, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 43.75,
      public_price = 55,
      cash_discount_percent = 15.45,
      credit_discount_percent = 12.73,
      box_quantity = 12
    WHERE name = 'راجونج زاحف';
  END IF;

  -- Product: أقراص ناموس
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'أقراص ناموس') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('أقراص ناموس', cat_medical_id, 78, 120, 30, 26.67, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 78,
      public_price = 120,
      cash_discount_percent = 30,
      credit_discount_percent = 26.67,
      box_quantity = 1
    WHERE name = 'أقراص ناموس';
  END IF;

  -- Product: سائل ناموس ريد
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'سائل ناموس ريد') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('سائل ناموس ريد', cat_medical_id, 93, 125, 20, 16, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 93,
      public_price = 125,
      cash_discount_percent = 20,
      credit_discount_percent = 16,
      box_quantity = 1
    WHERE name = 'سائل ناموس ريد';
  END IF;

  -- Product: لويز سوبر
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'لويز سوبر') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('لويز سوبر', cat_medical_id, 26.25, 35, 20, 14.29, 16, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 26.25,
      public_price = 35,
      cash_discount_percent = 20,
      credit_discount_percent = 14.29,
      box_quantity = 16
    WHERE name = 'لويز سوبر';
  END IF;

  -- Product: لويز ديوبالك
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'لويز ديوبالك') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('لويز ديوبالك', cat_medical_id, 45.42, 65, 26.92, 23.08, 16, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 45.42,
      public_price = 65,
      cash_discount_percent = 26.92,
      credit_discount_percent = 23.08,
      box_quantity = 16
    WHERE name = 'لويز ديوبالك';
  END IF;

  -- Product: سوفن طويل
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'سوفن طويل') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('سوفن طويل', cat_medical_id, 40.31, 55, 20, 18.18, 16, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 40.31,
      public_price = 55,
      cash_discount_percent = 20,
      credit_discount_percent = 18.18,
      box_quantity = 16
    WHERE name = 'سوفن طويل';
  END IF;

  -- Product: سوفن طويل جداً
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'سوفن طويل جداً') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('سوفن طويل جداً', cat_medical_id, 40.31, 55, 20, 18.18, 16, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 40.31,
      public_price = 55,
      cash_discount_percent = 20,
      credit_discount_percent = 18.18,
      box_quantity = 16
    WHERE name = 'سوفن طويل جداً';
  END IF;

  -- Product: سويت حرير
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'سويت حرير') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('سويت حرير', cat_medical_id, 14.16, 20, 25, 25, 12, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 14.16,
      public_price = 20,
      cash_discount_percent = 25,
      credit_discount_percent = 25,
      box_quantity = 12
    WHERE name = 'سويت حرير';
  END IF;

  -- Product: سويت دادا
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'سويت دادا') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('سويت دادا', cat_medical_id, 6, 15, 53.33, 46.67, 12, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 6,
      public_price = 15,
      cash_discount_percent = 53.33,
      credit_discount_percent = 46.67,
      box_quantity = 12
    WHERE name = 'سويت دادا';
  END IF;

  -- Product: مناديل جيب فاين
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'مناديل جيب فاين') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('مناديل جيب فاين', cat_medical_id, 14.6, 20, 25, 25, 12, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 14.6,
      public_price = 20,
      cash_discount_percent = 25,
      credit_discount_percent = 25,
      box_quantity = 12
    WHERE name = 'مناديل جيب فاين';
  END IF;

  -- Product: سلك دولار
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'سلك دولار') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('سلك دولار', cat_medical_id, 10, 15, 20, 13.33, 12, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 10,
      public_price = 15,
      cash_discount_percent = 20,
      credit_discount_percent = 13.33,
      box_quantity = 12
    WHERE name = 'سلك دولار';
  END IF;

  -- Product: قطان قلب
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'قطان قلب') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('قطان قلب', cat_medical_id, 6.66, 15, 50, 43.33, 12, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 6.66,
      public_price = 15,
      cash_discount_percent = 50,
      credit_discount_percent = 43.33,
      box_quantity = 12
    WHERE name = 'قطان قلب';
  END IF;

  -- Product: صابون لبان دكر
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'صابون لبان دكر') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('صابون لبان دكر', cat_medical_id, 13, 20, 25, 25, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 13,
      public_price = 20,
      cash_discount_percent = 25,
      credit_discount_percent = 25,
      box_quantity = 1
    WHERE name = 'صابون لبان دكر';
  END IF;

  -- Product: صابون نابلسى
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'صابون نابلسى') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('صابون نابلسى', cat_medical_id, 4.09, 7, 21.43, 21.43, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 4.09,
      public_price = 7,
      cash_discount_percent = 21.43,
      credit_discount_percent = 21.43,
      box_quantity = 1
    WHERE name = 'صابون نابلسى';
  END IF;

  -- Product: ديتول وسط
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'ديتول وسط') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('ديتول وسط', cat_medical_id, 100, 140, 17.86, 14.29, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 100,
      public_price = 140,
      cash_discount_percent = 17.86,
      credit_discount_percent = 14.29,
      box_quantity = 1
    WHERE name = 'ديتول وسط';
  END IF;

  -- Product: شامبو فاتيكا 190
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'شامبو فاتيكا 190') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('شامبو فاتيكا 190', cat_cosmetics_id, 33.5, 45, 22.22, 17.78, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 33.5,
      public_price = 45,
      cash_discount_percent = 22.22,
      credit_discount_percent = 17.78,
      box_quantity = 1
    WHERE name = 'شامبو فاتيكا 190';
  END IF;

  -- Product: بودرة قدم اوبال
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'بودرة قدم اوبال') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('بودرة قدم اوبال', cat_medical_id, 14, 25, 38, 36, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 14,
      public_price = 25,
      cash_discount_percent = 38,
      credit_discount_percent = 36,
      box_quantity = 1
    WHERE name = 'بودرة قدم اوبال';
  END IF;

  -- Product: معجون دبرودنت
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'معجون دبرودنت') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('معجون دبرودنت', cat_cosmetics_id, 31, 40, 20, 20, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 31,
      public_price = 40,
      cash_discount_percent = 20,
      credit_discount_percent = 20,
      box_quantity = 1
    WHERE name = 'معجون دبرودنت';
  END IF;

  -- Product: مسواك كبير
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'مسواك كبير') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('مسواك كبير', cat_cosmetics_id, 16.25, 25, 30, 28, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 16.25,
      public_price = 25,
      cash_discount_percent = 30,
      credit_discount_percent = 28,
      box_quantity = 1
    WHERE name = 'مسواك كبير';
  END IF;

  -- Product: مناديل بكرة 18 م
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'مناديل بكرة 18 م') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('مناديل بكرة 18 م', cat_medical_id, 8.8, 15, 30, 30, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 8.8,
      public_price = 15,
      cash_discount_percent = 30,
      credit_discount_percent = 30,
      box_quantity = 1
    WHERE name = 'مناديل بكرة 18 م';
  END IF;

  -- Product: هاى سول 36 مم
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'هاى سول 36 مم') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('هاى سول 36 مم', cat_medical_id, 6.8, 15, 50, 43.33, 36, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 6.8,
      public_price = 15,
      cash_discount_percent = 50,
      credit_discount_percent = 43.33,
      box_quantity = 36
    WHERE name = 'هاى سول 36 مم';
  END IF;

  -- Product: فايبكس 10م
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'فايبكس 10م') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('فايبكس 10م', cat_medical_id, 27.3, 35, 14.29, 8.57, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 27.3,
      public_price = 35,
      cash_discount_percent = 14.29,
      credit_discount_percent = 8.57,
      box_quantity = 1
    WHERE name = 'فايبكس 10م';
  END IF;

  -- Product: فايبكس 15م
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'فايبكس 15م') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('فايبكس 15م', cat_medical_id, 36, 45, 17.78, 17.78, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 36,
      public_price = 45,
      cash_discount_percent = 17.78,
      credit_discount_percent = 17.78,
      box_quantity = 1
    WHERE name = 'فايبكس 15م';
  END IF;

  -- Product: كلوز اب صغير
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'كلوز اب صغير') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('كلوز اب صغير', cat_cosmetics_id, 14.6, 20, 25, 20, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 14.6,
      public_price = 20,
      cash_discount_percent = 25,
      credit_discount_percent = 20,
      box_quantity = 1
    WHERE name = 'كلوز اب صغير';
  END IF;

  -- Product: كلوز اب وسط
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'كلوز اب وسط') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('كلوز اب وسط', cat_cosmetics_id, 28.5, 35, 17.14, 17.14, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 28.5,
      public_price = 35,
      cash_discount_percent = 17.14,
      credit_discount_percent = 17.14,
      box_quantity = 1
    WHERE name = 'كلوز اب وسط';
  END IF;

  -- Product: بودرة تلك 5X5
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'بودرة تلك 5X5') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('بودرة تلك 5X5', cat_medical_id, 21, 28, 21.43, 17.86, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 21,
      public_price = 28,
      cash_discount_percent = 21.43,
      credit_discount_percent = 17.86,
      box_quantity = 1
    WHERE name = 'بودرة تلك 5X5';
  END IF;

  -- Product: فرشة الأسنان
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'فرشة الأسنان') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('فرشة الأسنان', cat_medical_id, 85, 120, 20.83, 16.67, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 85,
      public_price = 120,
      cash_discount_percent = 20.83,
      credit_discount_percent = 16.67,
      box_quantity = 1
    WHERE name = 'فرشة الأسنان';
  END IF;

  -- Product: مغربية العود الملكي
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'مغربية العود الملكي') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('مغربية العود الملكي', cat_cosmetics_id, 23, 35, 31.43, 28.57, 12, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_cosmetics_id,
      base_price = 23,
      public_price = 35,
      cash_discount_percent = 31.43,
      credit_discount_percent = 28.57,
      box_quantity = 12
    WHERE name = 'مغربية العود الملكي';
  END IF;

  -- Product: سكاتة حصيرة
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'سكاتة حصيرة') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('سكاتة حصيرة', cat_medical_id, 100, 180, 8.33, 5.56, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 100,
      public_price = 180,
      cash_discount_percent = 8.33,
      credit_discount_percent = 5.56,
      box_quantity = 1
    WHERE name = 'سكاتة حصيرة';
  END IF;

  -- Product: سرنجات رضع 250 مم
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'سرنجات رضع 250 مم') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('سرنجات رضع 250 مم', cat_medical_id, 305, 500, 37, 36, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 305,
      public_price = 500,
      cash_discount_percent = 37,
      credit_discount_percent = 36,
      box_quantity = 1
    WHERE name = 'سرنجات رضع 250 مم';
  END IF;

  -- Product: سرنجات أطفال
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'سرنجات أطفال') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('سرنجات أطفال', cat_medical_id, 305, 500, 37, 36, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 305,
      public_price = 500,
      cash_discount_percent = 37,
      credit_discount_percent = 36,
      box_quantity = 1
    WHERE name = 'سرنجات أطفال';
  END IF;

  -- Product: سرنجات كبار
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'سرنجات كبار') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('سرنجات كبار', cat_medical_id, 305, 500, 37, 36, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 305,
      public_price = 500,
      cash_discount_percent = 37,
      credit_discount_percent = 36,
      box_quantity = 1
    WHERE name = 'سرنجات كبار';
  END IF;

  -- Product: سرنجات 5سم
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'سرنجات 5سم') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('سرنجات 5سم', cat_medical_id, 305, 750, 58, 57.33, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 305,
      public_price = 750,
      cash_discount_percent = 58,
      credit_discount_percent = 57.33,
      box_quantity = 1
    WHERE name = 'سرنجات 5سم';
  END IF;

  -- Product: لزقة النمر
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'لزقة النمر') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('لزقة النمر', cat_medical_id, 9.4, 17, 17.65, 11.76, 50, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 9.4,
      public_price = 17,
      cash_discount_percent = 17.65,
      credit_discount_percent = 11.76,
      box_quantity = 50
    WHERE name = 'لزقة النمر';
  END IF;

  -- Product: حلمة الجو 24 مم
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'حلمة الجو 24 مم') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('حلمة الجو 24 مم', cat_medical_id, 6.2, 15, 53.33, 46.67, 24, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 6.2,
      public_price = 15,
      cash_discount_percent = 53.33,
      credit_discount_percent = 46.67,
      box_quantity = 24
    WHERE name = 'حلمة الجو 24 مم';
  END IF;

  -- Product: بيرونة 250
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'بيرونة 250') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('بيرونة 250', cat_medical_id, 20.8, 30, 25, 20, 12, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 20.8,
      public_price = 30,
      cash_discount_percent = 25,
      credit_discount_percent = 20,
      box_quantity = 12
    WHERE name = 'بيرونة 250';
  END IF;

  -- Product: بيرونة 150
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'بيرونة 150') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('بيرونة 150', cat_medical_id, 19.6, 25, 20, 12, 12, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 19.6,
      public_price = 25,
      cash_discount_percent = 20,
      credit_discount_percent = 12,
      box_quantity = 12
    WHERE name = 'بيرونة 150';
  END IF;

  -- Product: رباط ضاغط 15
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'رباط ضاغط 15') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('رباط ضاغط 15', cat_medical_id, 17, 25, 24, 20, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 17,
      public_price = 25,
      cash_discount_percent = 24,
      credit_discount_percent = 20,
      box_quantity = 1
    WHERE name = 'رباط ضاغط 15';
  END IF;

  -- Product: رباط ضاغط 10
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'رباط ضاغط 10') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('رباط ضاغط 10', cat_medical_id, 12, 20, 30, 30, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 12,
      public_price = 20,
      cash_discount_percent = 30,
      credit_discount_percent = 30,
      box_quantity = 1
    WHERE name = 'رباط ضاغط 10';
  END IF;

  -- Product: رباط ضاغط 8
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'رباط ضاغط 8') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('رباط ضاغط 8', cat_medical_id, 10, 15, 25, 23.33, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 10,
      public_price = 15,
      cash_discount_percent = 25,
      credit_discount_percent = 23.33,
      box_quantity = 1
    WHERE name = 'رباط ضاغط 8';
  END IF;

  -- Product: رباط ضاغط 6
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'رباط ضاغط 6') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('رباط ضاغط 6', cat_medical_id, 8, 13, 26.92, 26.92, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 8,
      public_price = 13,
      cash_discount_percent = 26.92,
      credit_discount_percent = 26.92,
      box_quantity = 1
    WHERE name = 'رباط ضاغط 6';
  END IF;

  -- Product: لزقة صابع مدور
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'لزقة صابع مدور') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('لزقة صابع مدور', cat_medical_id, 25, 35, 20, 14.29, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 25,
      public_price = 35,
      cash_discount_percent = 20,
      credit_discount_percent = 14.29,
      box_quantity = 1
    WHERE name = 'لزقة صابع مدور';
  END IF;

  -- Product: لزقة صابع طويل
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'لزقة صابع طويل') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('لزقة صابع طويل', cat_medical_id, 25, 35, 20, 14.29, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 25,
      public_price = 35,
      cash_discount_percent = 20,
      credit_discount_percent = 14.29,
      box_quantity = 1
    WHERE name = 'لزقة صابع طويل';
  END IF;

  -- Product: جهاز محلول 30 مم
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'جهاز محلول 30 مم') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('جهاز محلول 30 مم', cat_medical_id, 5.5, 10, 30, 30, 30, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 5.5,
      public_price = 10,
      cash_discount_percent = 30,
      credit_discount_percent = 30,
      box_quantity = 30
    WHERE name = 'جهاز محلول 30 مم';
  END IF;

  -- Product: كانيولا صفراء 100م
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'كانيولا صفراء 100م') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('كانيولا صفراء 100م', cat_medical_id, 8.5, 15, 36.67, 33.33, 100, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 8.5,
      public_price = 15,
      cash_discount_percent = 36.67,
      credit_discount_percent = 33.33,
      box_quantity = 100
    WHERE name = 'كانيولا صفراء 100م';
  END IF;

  -- Product: كانيولا زرقاء 100م
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'كانيولا زرقاء 100م') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('كانيولا زرقاء 100م', cat_medical_id, 6.5, 15, 50, 46.67, 100, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 6.5,
      public_price = 15,
      cash_discount_percent = 50,
      credit_discount_percent = 46.67,
      box_quantity = 100
    WHERE name = 'كانيولا زرقاء 100م';
  END IF;

  -- Product: حقن انسولين 100م
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'حقن انسولين 100م') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('حقن انسولين 100م', cat_medical_id, 2.3, 3, 16.67, 16.67, 100, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 2.3,
      public_price = 3,
      cash_discount_percent = 16.67,
      credit_discount_percent = 16.67,
      box_quantity = 100
    WHERE name = 'حقن انسولين 100م';
  END IF;

  -- Product: غيار عين
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'غيار عين') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('غيار عين', cat_medical_id, 40, 100, 53, 51, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 40,
      public_price = 100,
      cash_discount_percent = 53,
      credit_discount_percent = 51,
      box_quantity = 1
    WHERE name = 'غيار عين';
  END IF;

  -- Product: بلاستر 2.5
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'بلاستر 2.5') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('بلاستر 2.5', cat_medical_id, 21, 25, 12, 12, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 21,
      public_price = 25,
      cash_discount_percent = 12,
      credit_discount_percent = 12,
      box_quantity = 1
    WHERE name = 'بلاستر 2.5';
  END IF;

  -- Product: بلاستر 5
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'بلاستر 5') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('بلاستر 5', cat_medical_id, 36, 45, 17.78, 15.56, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 36,
      public_price = 45,
      cash_discount_percent = 17.78,
      credit_discount_percent = 15.56,
      box_quantity = 1
    WHERE name = 'بلاستر 5';
  END IF;

  -- Product: بلاستر 10
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'بلاستر 10') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('بلاستر 10', cat_medical_id, 67, 90, 23.33, 22.22, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 67,
      public_price = 90,
      cash_discount_percent = 23.33,
      credit_discount_percent = 22.22,
      box_quantity = 1
    WHERE name = 'بلاستر 10';
  END IF;

  -- Product: ترمومتر ديجيتال
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'ترمومتر ديجيتال') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('ترمومتر ديجيتال', cat_medical_id, 45, 65, 24.62, 20, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 45,
      public_price = 65,
      cash_discount_percent = 24.62,
      credit_discount_percent = 20,
      box_quantity = 1
    WHERE name = 'ترمومتر ديجيتال';
  END IF;

  -- Product: غيار قسطرة 10X25 20مم
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'غيار قسطرة 10X25 20مم') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('غيار قسطرة 10X25 20مم', cat_medical_id, 50, 70, 14.29, 14.29, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 50,
      public_price = 70,
      cash_discount_percent = 14.29,
      credit_discount_percent = 14.29,
      box_quantity = 1
    WHERE name = 'غيار قسطرة 10X25 20مم';
  END IF;

  -- Product: غيار قسطرة 10X35 20مم
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'غيار قسطرة 10X35 20مم') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('غيار قسطرة 10X35 20مم', cat_medical_id, 3.5, 10, 55, 50, 20, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 3.5,
      public_price = 10,
      cash_discount_percent = 55,
      credit_discount_percent = 50,
      box_quantity = 20
    WHERE name = 'غيار قسطرة 10X35 20مم';
  END IF;

  -- Product: قطن 100 جم
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'قطن 100 جم') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('قطن 100 جم', cat_medical_id, 8, 15, 36.67, 36.67, 10, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 8,
      public_price = 15,
      cash_discount_percent = 36.67,
      credit_discount_percent = 36.67,
      box_quantity = 10
    WHERE name = 'قطن 100 جم';
  END IF;

  -- Product: قطن 50 جم
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'قطن 50 جم') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('قطن 50 جم', cat_medical_id, 4, 10, 50, 50, 20, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 4,
      public_price = 10,
      cash_discount_percent = 50,
      credit_discount_percent = 50,
      box_quantity = 20
    WHERE name = 'قطن 50 جم';
  END IF;

  -- Product: شاش فازلين صغير 40 مم
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'شاش فازلين صغير 40 مم') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('شاش فازلين صغير 40 مم', cat_medical_id, 1.75, 5, 50, 40, 40, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 1.75,
      public_price = 5,
      cash_discount_percent = 50,
      credit_discount_percent = 40,
      box_quantity = 40
    WHERE name = 'شاش فازلين صغير 40 مم';
  END IF;

  -- Product: شاش فازلين وسط
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'شاش فازلين وسط') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('شاش فازلين وسط', cat_medical_id, 3.5, 5, 30, 0, 20, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 3.5,
      public_price = 5,
      cash_discount_percent = 30,
      credit_discount_percent = 0,
      box_quantity = 20
    WHERE name = 'شاش فازلين وسط';
  END IF;

  -- Product: شاش فازلين كبير 12 مم
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'شاش فازلين كبير 12 مم') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('شاش فازلين كبير 12 مم', cat_medical_id, 5, 7, 14.29, 0, 12, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 5,
      public_price = 7,
      cash_discount_percent = 14.29,
      credit_discount_percent = 0,
      box_quantity = 12
    WHERE name = 'شاش فازلين كبير 12 مم';
  END IF;

  -- Product: ماء اوكسجين 20%
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'ماء اوكسجين 20%') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('ماء اوكسجين 20%', cat_medical_id, 8.75, 15, 26.67, 26.67, 6, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 8.75,
      public_price = 15,
      cash_discount_percent = 26.67,
      credit_discount_percent = 26.67,
      box_quantity = 6
    WHERE name = 'ماء اوكسجين 20%';
  END IF;

  -- Product: ماء اوكسجين 30%
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'ماء اوكسجين 30%') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('ماء اوكسجين 30%', cat_medical_id, 9.58, 15, 26.67, 26.67, 6, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 9.58,
      public_price = 15,
      cash_discount_percent = 26.67,
      credit_discount_percent = 26.67,
      box_quantity = 6
    WHERE name = 'ماء اوكسجين 30%';
  END IF;

  -- Product: شاش 15
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'شاش 15') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('شاش 15', cat_medical_id, 35, 75, 33.33, 30.67, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 35,
      public_price = 75,
      cash_discount_percent = 33.33,
      credit_discount_percent = 30.67,
      box_quantity = 1
    WHERE name = 'شاش 15';
  END IF;

  -- Product: شاش 10
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'شاش 10') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('شاش 10', cat_medical_id, 45, 60, 16.67, 13.33, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 45,
      public_price = 60,
      cash_discount_percent = 16.67,
      credit_discount_percent = 13.33,
      box_quantity = 1
    WHERE name = 'شاش 10';
  END IF;

  -- Product: شاش 7
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'شاش 7') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('شاش 7', cat_medical_id, 40, 70, 32.86, 28.57, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 40,
      public_price = 70,
      cash_discount_percent = 32.86,
      credit_discount_percent = 28.57,
      box_quantity = 1
    WHERE name = 'شاش 7';
  END IF;

  -- Product: شاش 5
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'شاش 5') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('شاش 5', cat_medical_id, 40, 70, 32.86, 28.57, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 40,
      public_price = 70,
      cash_discount_percent = 32.86,
      credit_discount_percent = 28.57,
      box_quantity = 1
    WHERE name = 'شاش 5';
  END IF;

  -- Product: اختبار حمل
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'اختبار حمل') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('اختبار حمل', cat_medical_id, 5.5, 20, 62.5, 50, 10, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 5.5,
      public_price = 20,
      cash_discount_percent = 62.5,
      credit_discount_percent = 50,
      box_quantity = 10
    WHERE name = 'اختبار حمل';
  END IF;

  -- Product: ماسك فاركولين
  IF NOT EXISTS (SELECT 1 FROM products WHERE name = 'ماسك فاركولين') THEN
    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)
    VALUES ('ماسك فاركولين', cat_medical_id, 11, 25, 44, 32, 1, 'قطعة', true);
  ELSE
    UPDATE products SET
      category_id = cat_medical_id,
      base_price = 11,
      public_price = 25,
      cash_discount_percent = 44,
      credit_discount_percent = 32,
      box_quantity = 1
    WHERE name = 'ماسك فاركولين';
  END IF;

END $$;