import fs from 'fs';
import path from 'path';

interface ProductInput {
  name: string;
  categoryName: string;
  dozenPrice: number | null;
  piecePrice: number;
  publicPrice: number;
  cashPrice: number;
  creditPrice: number;
  boxQuantity?: number;
}

// Re-use the data from seedProducts.ts
const productsData: ProductInput[] = [
  // --- Page 1 ---
  { name: 'موفى 5', categoryName: 'مستحضرات تجميل وعناية', dozenPrice: 840, piecePrice: 168, publicPrice: 200, cashPrice: 176, creditPrice: 182 },
  { name: 'موفى 4', categoryName: 'مستحضرات تجميل وعناية', dozenPrice: 740, piecePrice: 148, publicPrice: 200, cashPrice: 157, creditPrice: 188 },
  { name: 'موفى 3', categoryName: 'مستحضرات تجميل وعناية', dozenPrice: 740, piecePrice: 148, publicPrice: 200, cashPrice: 157, creditPrice: 166 },
  { name: 'موفى 2', categoryName: 'مستحضرات تجميل وعناية', dozenPrice: 720, piecePrice: 144, publicPrice: 180, cashPrice: 147, creditPrice: 153 },
  { name: 'هالو 5', categoryName: 'مستحضرات تجميل وعناية', dozenPrice: 905, piecePrice: 181, publicPrice: 220, cashPrice: 190, creditPrice: 192 },
  { name: 'هالو 4', categoryName: 'مستحضرات تجميل وعناية', dozenPrice: 830, piecePrice: 166, publicPrice: 220, cashPrice: 175, creditPrice: 177 },
  { name: 'هالو 3', categoryName: 'مستحضرات تجميل وعناية', dozenPrice: 825, piecePrice: 165, publicPrice: 200, cashPrice: 173, creditPrice: 175 },
  { name: 'هالو 2', categoryName: 'مستحضرات تجميل وعناية', dozenPrice: 765, piecePrice: 153, publicPrice: 200, cashPrice: 160, creditPrice: 163 },
  { name: 'هالو 1', categoryName: 'مستحضرات تجميل وعناية', dozenPrice: 755, piecePrice: 151, publicPrice: 200, cashPrice: 155, creditPrice: 160 },
  { name: 'بيبى دوا', categoryName: 'مستلزمات طبية', dozenPrice: 620, piecePrice: 124, publicPrice: 180, cashPrice: 145, creditPrice: 147 },
  { name: 'VIP 50 مم', categoryName: 'مستلزمات طبية', dozenPrice: 680, piecePrice: 3.4, publicPrice: 5, cashPrice: 4, creditPrice: 4, boxQuantity: 200 },
  { name: 'حب تمارا 18 مم', categoryName: 'مستلزمات طبية', dozenPrice: 342, piecePrice: 19, publicPrice: 30, cashPrice: 20, creditPrice: 22 },
  { name: 'فرش', categoryName: 'مستلزمات طبية', dozenPrice: 75, piecePrice: 6.25, publicPrice: 20, cashPrice: 7.5, creditPrice: 10 },
  { name: 'جهاز ريد', categoryName: 'مستلزمات طبية', dozenPrice: null, piecePrice: 140, publicPrice: 175, cashPrice: 145, creditPrice: 148 },
  { name: 'معجون حلاقة 5X5', categoryName: 'مستحضرات تجميل وعناية', dozenPrice: 195, piecePrice: 16.25, publicPrice: 25, cashPrice: 19, creditPrice: 20 },
  { name: 'ستبلس', categoryName: 'مستلزمات طبية', dozenPrice: 205, piecePrice: 17, publicPrice: 25, cashPrice: 19, creditPrice: 20 },
  { name: 'وان', categoryName: 'مستلزمات طبية', dozenPrice: 215, piecePrice: 18, publicPrice: 25, cashPrice: 20, creditPrice: 20 },
  { name: 'قرص صغير', categoryName: 'مستلزمات طبية', dozenPrice: 165, piecePrice: 13.75, publicPrice: 20, cashPrice: 15, creditPrice: 15 },
  { name: 'قرص كبير', categoryName: 'مستلزمات طبية', dozenPrice: 330, piecePrice: 27, publicPrice: 40, cashPrice: 30, creditPrice: 31 },
  { name: 'جيل ستار 24 مم', categoryName: 'مستلزمات طبية', dozenPrice: 600, piecePrice: 25, publicPrice: 35, cashPrice: 26, creditPrice: 26.5 },
  { name: 'زيت فاتيكا كبير', categoryName: 'مستحضرات تجميل وعناية', dozenPrice: 346, piecePrice: 28.8, publicPrice: 40, cashPrice: 31, creditPrice: 32 },
  { name: 'زيت فاتيكا وسط', categoryName: 'مستحضرات تجميل وعناية', dozenPrice: 195, piecePrice: 16.25, publicPrice: 25, cashPrice: 18.5, creditPrice: 20 },
  { name: 'زيت فاتيكا صغير', categoryName: 'مستحضرات تجميل وعناية', dozenPrice: 95, piecePrice: 7.9, publicPrice: 15, cashPrice: 8, creditPrice: 9 },

  // --- Page 2 ---
  { name: 'كريم ليبة', categoryName: 'مستحضرات تجميل وعناية', dozenPrice: 310, piecePrice: 25.8, publicPrice: 35, cashPrice: 28, creditPrice: 29 },
  { name: 'بلوبوكس', categoryName: 'مستحضرات تجميل وعناية', dozenPrice: 410, piecePrice: 34.16, publicPrice: 40, cashPrice: 35, creditPrice: 35 },
  { name: 'مارينا صغير', categoryName: 'مستحضرات تجميل وعناية', dozenPrice: 145, piecePrice: 12, publicPrice: 20, cashPrice: 12.5, creditPrice: 12.5 },
  { name: 'مارينا كبير', categoryName: 'مستحضرات تجميل وعناية', dozenPrice: 290, piecePrice: 24.25, publicPrice: 35, cashPrice: 26, creditPrice: 27 },
  { name: 'نيفيا وفت وسط 100 مم', categoryName: 'مستحضرات تجميل وعناية', dozenPrice: 540, piecePrice: 45, publicPrice: 65, cashPrice: 48, creditPrice: 49 },
  { name: 'نيفيا وفت صغير 50 مم', categoryName: 'مستحضرات تجميل وعناية', dozenPrice: 300, piecePrice: 25, publicPrice: 35, cashPrice: 27, creditPrice: 28 },
  { name: 'حنة جوليشيا', categoryName: 'مستحضرات تجميل وعناية', dozenPrice: 360, piecePrice: 30, publicPrice: 40, cashPrice: 32, creditPrice: 33 },
  { name: 'حنة فاتيكا', categoryName: 'مستحضرات تجميل وعناية', dozenPrice: 157.5, piecePrice: 26.25, publicPrice: 40, cashPrice: 29.5, creditPrice: 30 },
  { name: 'حنة جومانا', categoryName: 'مستحضرات تجميل وعناية', dozenPrice: 114, piecePrice: 9.5, publicPrice: 15, cashPrice: 10.5, creditPrice: 10.5 },
  { name: 'حنة جلورى', categoryName: 'مستحضرات تجميل وعناية', dozenPrice: null, piecePrice: 205, publicPrice: 280, cashPrice: 230, creditPrice: 240 },
  { name: 'فيانسيه صغير', categoryName: 'مستحضرات تجميل وعناية', dozenPrice: 312, piecePrice: 26, publicPrice: 30, cashPrice: 27, creditPrice: 27 },
  { name: 'فيانسيه وسط', categoryName: 'مستحضرات تجميل وعناية', dozenPrice: 420, piecePrice: 35, publicPrice: 50, cashPrice: 37, creditPrice: 39 },
  { name: 'زيت أملا صغير', categoryName: 'مستحضرات تجميل وعناية', dozenPrice: 456, piecePrice: 38, publicPrice: 55, cashPrice: 40, creditPrice: 41 },
  { name: 'زيت أملا وسط', categoryName: 'مستحضرات تجميل وعناية', dozenPrice: 732, piecePrice: 61, publicPrice: 85, cashPrice: 65, creditPrice: 66.5 },
  { name: 'زيت أملا كبير', categoryName: 'مستحضرات تجميل وعناية', dozenPrice: 972, piecePrice: 81, publicPrice: 105, cashPrice: 86, creditPrice: 89 },
  { name: 'ديسكو صغير', categoryName: 'مستحضرات تجميل وعناية', dozenPrice: 260, piecePrice: 22, publicPrice: 30, cashPrice: 24, creditPrice: 24 },
  { name: 'ديسكو وسط', categoryName: 'مستحضرات تجميل وعناية', dozenPrice: 390, piecePrice: 32.5, publicPrice: 40, cashPrice: 33, creditPrice: 33 },
  { name: 'لزق فار', categoryName: 'مستلزمات طبية', dozenPrice: null, piecePrice: 12, publicPrice: 20, cashPrice: 13, creditPrice: 14 },
  { name: 'سيجنال صغير', categoryName: 'مستحضرات تجميل وعناية', dozenPrice: 150, piecePrice: 12.5, publicPrice: 20, cashPrice: 15, creditPrice: 15 },
  { name: 'سيجنال وسط', categoryName: 'مستحضرات تجميل وعناية', dozenPrice: 288, piecePrice: 24, publicPrice: 35, cashPrice: 25, creditPrice: 28 },
  { name: 'ايفا صغير', categoryName: 'مستحضرات تجميل وعناية', dozenPrice: 165, piecePrice: 13.75, publicPrice: 15, cashPrice: 13.75, creditPrice: 14 },
  { name: 'ايفا وسط', categoryName: 'مستحضرات تجميل وعناية', dozenPrice: 264, piecePrice: 22, publicPrice: 30, cashPrice: 23.5, creditPrice: 24 },
  { name: 'جل فاتيكا أكياس 30 مم', categoryName: 'مستحضرات تجميل وعناية', dozenPrice: 400, piecePrice: 13.32, publicPrice: 18, cashPrice: 14, creditPrice: 15 },

  // --- Page 3 ---
  { name: 'بيرسول', categoryName: 'مستلزمات طبية', dozenPrice: 545, piecePrice: 46, publicPrice: 60, cashPrice: 48, creditPrice: 48 },
  { name: 'راجونج فايتر', categoryName: 'مستلزمات طبية', dozenPrice: 365, piecePrice: 30.4, publicPrice: 40, cashPrice: 32.5, creditPrice: 33.5 },
  { name: 'راجونج زاحف', categoryName: 'مستلزمات طبية', dozenPrice: 525, piecePrice: 43.75, publicPrice: 55, cashPrice: 46.5, creditPrice: 48 },
  { name: 'أقراص ناموس', categoryName: 'مستلزمات طبية', dozenPrice: null, piecePrice: 78, publicPrice: 120, cashPrice: 84, creditPrice: 88 },
  { name: 'سائل ناموس ريد', categoryName: 'مستلزمات طبية', dozenPrice: null, piecePrice: 93, publicPrice: 125, cashPrice: 100, creditPrice: 105 },
  { name: 'لويز سوبر', categoryName: 'مستلزمات طبية', dozenPrice: 420, piecePrice: 26.25, publicPrice: 35, cashPrice: 28, creditPrice: 30 },
  { name: 'لويز ديوبالك', categoryName: 'مستلزمات طبية', dozenPrice: 725, piecePrice: 45.42, publicPrice: 65, cashPrice: 47.5, creditPrice: 50 },
  { name: 'سوفن طويل', categoryName: 'مستلزمات طبية', dozenPrice: 645, piecePrice: 40.31, publicPrice: 55, cashPrice: 44, creditPrice: 45 },
  { name: 'سوفن طويل جداً', categoryName: 'مستلزمات طبية', dozenPrice: 645, piecePrice: 40.31, publicPrice: 55, cashPrice: 44, creditPrice: 45 },
  { name: 'سويت حرير', categoryName: 'مستلزمات طبية', dozenPrice: 170, piecePrice: 14.16, publicPrice: 20, cashPrice: 15, creditPrice: 15 },
  { name: 'سويت دادا', categoryName: 'مستلزمات طبية', dozenPrice: 72, piecePrice: 6, publicPrice: 15, cashPrice: 7, creditPrice: 8 },
  { name: 'مناديل جيب فاين', categoryName: 'مستلزمات طبية', dozenPrice: 175, piecePrice: 14.6, publicPrice: 20, cashPrice: 15, creditPrice: 15 },
  { name: 'سلك دولار', categoryName: 'مستلزمات طبية', dozenPrice: 120, piecePrice: 10, publicPrice: 15, cashPrice: 12, creditPrice: 13 },
  { name: 'قطان قلب', categoryName: 'مستلزمات طبية', dozenPrice: 80, piecePrice: 6.66, publicPrice: 15, cashPrice: 7.5, creditPrice: 8.5 },
  { name: 'صابون لبان دكر', categoryName: 'مستلزمات طبية', dozenPrice: null, piecePrice: 13, publicPrice: 20, cashPrice: 15, creditPrice: 15 },
  { name: 'صابون نابلسى', categoryName: 'مستلزمات طبية', dozenPrice: null, piecePrice: 4.09, publicPrice: 7, cashPrice: 5.5, creditPrice: 5.5 },
  { name: 'ديتول وسط', categoryName: 'مستلزمات طبية', dozenPrice: null, piecePrice: 100, publicPrice: 140, cashPrice: 115, creditPrice: 120 },
  { name: 'شامبو فاتيكا 190', categoryName: 'مستحضرات تجميل وعناية', dozenPrice: null, piecePrice: 33.5, publicPrice: 45, cashPrice: 35, creditPrice: 37 },
  { name: 'بودرة قدم اوبال', categoryName: 'مستلزمات طبية', dozenPrice: null, piecePrice: 14, publicPrice: 25, cashPrice: 15.5, creditPrice: 16 },
  { name: 'معجون دبرودنت', categoryName: 'مستحضرات تجميل وعناية', dozenPrice: null, piecePrice: 31, publicPrice: 40, cashPrice: 32, creditPrice: 32 },
  { name: 'مسواك كبير', categoryName: 'مستحضرات تجميل وعناية', dozenPrice: null, piecePrice: 16.25, publicPrice: 25, cashPrice: 17.5, creditPrice: 18 },
  { name: 'مناديل بكرة 18 م', categoryName: 'مستلزمات طبية', dozenPrice: null, piecePrice: 8.8, publicPrice: 15, cashPrice: 10.5, creditPrice: 10.5 },
  { name: 'هاى سول 36 مم', categoryName: 'مستلزمات طبية', dozenPrice: 245, piecePrice: 6.8, publicPrice: 15, cashPrice: 7.5, creditPrice: 8.5 },

  // --- Page 4 ---
  { name: 'فايبكس 10م', categoryName: 'مستلزمات طبية', dozenPrice: null, piecePrice: 27.30, publicPrice: 35, cashPrice: 30, creditPrice: 32 },
  { name: 'فايبكس 15م', categoryName: 'مستلزمات طبية', dozenPrice: null, piecePrice: 36, publicPrice: 45, cashPrice: 37, creditPrice: 37 },
  { name: 'كلوز اب صغير', categoryName: 'مستحضرات تجميل وعناية', dozenPrice: null, piecePrice: 14.6, publicPrice: 20, cashPrice: 15, creditPrice: 16 },
  { name: 'كلوز اب وسط', categoryName: 'مستحضرات تجميل وعناية', dozenPrice: null, piecePrice: 28.5, publicPrice: 35, cashPrice: 29, creditPrice: 29 },
  { name: 'بودرة تلك 5X5', categoryName: 'مستلزمات طبية', dozenPrice: null, piecePrice: 21, publicPrice: 28, cashPrice: 22, creditPrice: 23 },
  { name: 'فرشة الأسنان', categoryName: 'مستلزمات طبية', dozenPrice: null, piecePrice: 85, publicPrice: 120, cashPrice: 95, creditPrice: 100 },
  { name: 'مغربية العود الملكي', categoryName: 'مستحضرات تجميل وعناية', dozenPrice: 276, piecePrice: 23, publicPrice: 35, cashPrice: 24, creditPrice: 25 },
  { name: 'سكاتة حصيرة', categoryName: 'مستلزمات طبية', dozenPrice: null, piecePrice: 100, publicPrice: 180, cashPrice: 165, creditPrice: 170 },
  { name: 'سرنجات رضع 250 مم', categoryName: 'مستلزمات طبية', dozenPrice: null, piecePrice: 305, publicPrice: 500, cashPrice: 315, creditPrice: 320 },
  { name: 'سرنجات أطفال', categoryName: 'مستلزمات طبية', dozenPrice: null, piecePrice: 305, publicPrice: 500, cashPrice: 315, creditPrice: 320 },
  { name: 'سرنجات كبار', categoryName: 'مستلزمات طبية', dozenPrice: null, piecePrice: 305, publicPrice: 500, cashPrice: 315, creditPrice: 320 },
  { name: 'سرنجات 5سم', categoryName: 'مستلزمات طبية', dozenPrice: null, piecePrice: 305, publicPrice: 750, cashPrice: 315, creditPrice: 320 },
  { name: 'لزقة النمر', categoryName: 'مستلزمات طبية', dozenPrice: 470, piecePrice: 9.4, publicPrice: 17, cashPrice: 14, creditPrice: 15 },
  { name: 'حلمة الجو 24 مم', categoryName: 'مستلزمات طبية', dozenPrice: 148, piecePrice: 6.2, publicPrice: 15, cashPrice: 7, creditPrice: 8 },
  { name: 'بيرونة 250', categoryName: 'مستلزمات طبية', dozenPrice: 250, piecePrice: 20.8, publicPrice: 30, cashPrice: 22.5, creditPrice: 24 },
  { name: 'بيرونة 150', categoryName: 'مستلزمات طبية', dozenPrice: 235, piecePrice: 19.6, publicPrice: 25, cashPrice: 20, creditPrice: 22 },
  { name: 'رباط ضاغط 15', categoryName: 'مستلزمات طبية', dozenPrice: null, piecePrice: 17, publicPrice: 25, cashPrice: 19, creditPrice: 20 },
  { name: 'رباط ضاغط 10', categoryName: 'مستلزمات طبية', dozenPrice: null, piecePrice: 12, publicPrice: 20, cashPrice: 14, creditPrice: 14 },
  { name: 'رباط ضاغط 8', categoryName: 'مستلزمات طبية', dozenPrice: null, piecePrice: 10, publicPrice: 15, cashPrice: 11.25, creditPrice: 11.5 },
  { name: 'رباط ضاغط 6', categoryName: 'مستلزمات طبية', dozenPrice: null, piecePrice: 8, publicPrice: 13, cashPrice: 9.5, creditPrice: 9.5 },
  { name: 'لزقة صابع مدور', categoryName: 'مستلزمات طبية', dozenPrice: null, piecePrice: 25, publicPrice: 35, cashPrice: 28, creditPrice: 30 },
  { name: 'لزقة صابع طويل', categoryName: 'مستلزمات طبية', dozenPrice: null, piecePrice: 25, publicPrice: 35, cashPrice: 28, creditPrice: 30 },
  { name: 'جهاز محلول 30 مم', categoryName: 'مستلزمات طبية', dozenPrice: 165, piecePrice: 5.5, publicPrice: 10, cashPrice: 7, creditPrice: 7 },

  // --- Page 5 ---
  { name: 'كانيولا صفراء 100م', categoryName: 'مستلزمات طبية', dozenPrice: 850, piecePrice: 8.5, publicPrice: 15, cashPrice: 9.5, creditPrice: 10 },
  { name: 'كانيولا زرقاء 100م', categoryName: 'مستلزمات طبية', dozenPrice: 650, piecePrice: 6.5, publicPrice: 15, cashPrice: 7.5, creditPrice: 8 },
  { name: 'حقن انسولين 100م', categoryName: 'مستلزمات طبية', dozenPrice: null, piecePrice: 2.30, publicPrice: 3, cashPrice: 2.5, creditPrice: 2.5, boxQuantity: 100 },
  { name: 'غيار عين', categoryName: 'مستلزمات طبية', dozenPrice: null, piecePrice: 40, publicPrice: 100, cashPrice: 47, creditPrice: 49 },
  { name: 'بلاستر 2.5', categoryName: 'مستلزمات طبية', dozenPrice: null, piecePrice: 21, publicPrice: 25, cashPrice: 22, creditPrice: 22 },
  { name: 'بلاستر 5', categoryName: 'مستلزمات طبية', dozenPrice: null, piecePrice: 36, publicPrice: 45, cashPrice: 37, creditPrice: 38 },
  { name: 'بلاستر 10', categoryName: 'مستلزمات طبية', dozenPrice: null, piecePrice: 67, publicPrice: 90, cashPrice: 69, creditPrice: 70 },
  { name: 'ترمومتر ديجيتال', categoryName: 'مستلزمات طبية', dozenPrice: null, piecePrice: 45, publicPrice: 65, cashPrice: 49, creditPrice: 52 },
  { name: 'غيار قسطرة 10X25 20مم', categoryName: 'مستلزمات طبية', dozenPrice: null, piecePrice: 50, publicPrice: 70, cashPrice: 60, creditPrice: 60 },
  { name: 'غيار قسطرة 10X35 20مم', categoryName: 'مستلزمات طبية', dozenPrice: null, piecePrice: 3.5, publicPrice: 10, cashPrice: 4.5, creditPrice: 5, boxQuantity: 20 },
  { name: 'قطن 100 جم', categoryName: 'مستلزمات طبية', dozenPrice: null, piecePrice: 8, publicPrice: 15, cashPrice: 9.5, creditPrice: 9.5, boxQuantity: 10 },
  { name: 'قطن 50 جم', categoryName: 'مستلزمات طبية', dozenPrice: null, piecePrice: 4, publicPrice: 10, cashPrice: 5, creditPrice: 5, boxQuantity: 20 },
  { name: 'شاش فازلين صغير 40 مم', categoryName: 'مستلزمات طبية', dozenPrice: null, piecePrice: 1.75, publicPrice: 5, cashPrice: 2.5, creditPrice: 3, boxQuantity: 40 },
  { name: 'شاش فازلين وسط', categoryName: 'مستلزمات طبية', dozenPrice: null, piecePrice: 3.5, publicPrice: 5, cashPrice: 3.5, creditPrice: 5, boxQuantity: 20 },
  { name: 'شاش فازلين كبير 12 مم', categoryName: 'مستلزمات طبية', dozenPrice: null, piecePrice: 5, publicPrice: 7, cashPrice: 6, creditPrice: 7.5, boxQuantity: 12 },
  { name: 'ماء اوكسجين 20%', categoryName: 'مستلزمات طبية', dozenPrice: null, piecePrice: 8.75, publicPrice: 15, cashPrice: 11, creditPrice: 11, boxQuantity: 6 },
  { name: 'ماء اوكسجين 30%', categoryName: 'مستلزمات طبية', dozenPrice: null, piecePrice: 9.58, publicPrice: 15, cashPrice: 11, creditPrice: 11, boxQuantity: 6 },
  { name: 'شاش 15', categoryName: 'مستلزمات طبية', dozenPrice: null, piecePrice: 35, publicPrice: 75, cashPrice: 50, creditPrice: 52 },
  { name: 'شاش 10', categoryName: 'مستلزمات طبية', dozenPrice: null, piecePrice: 45, publicPrice: 60, cashPrice: 50, creditPrice: 52 },
  { name: 'شاش 7', categoryName: 'مستلزمات طبية', dozenPrice: null, piecePrice: 40, publicPrice: 70, cashPrice: 47, creditPrice: 50 },
  { name: 'شاش 5', categoryName: 'مستلزمات طبية', dozenPrice: null, piecePrice: 40, publicPrice: 70, cashPrice: 47, creditPrice: 50 },
  { name: 'اختبار حمل', categoryName: 'مستلزمات طبية', dozenPrice: 55, piecePrice: 5.5, publicPrice: 20, cashPrice: 7.5, creditPrice: 10 },
  { name: 'ماسك فاركولين', categoryName: 'مستلزمات طبية', dozenPrice: null, piecePrice: 11, publicPrice: 25, cashPrice: 14, creditPrice: 17 }
];

function generateSql() {
  const sqlLines: string[] = [];
  
  sqlLines.push('-- ============================================================');
  sqlLines.push('-- SQL Seed Script to Insert Categories and 115 Products');
  sqlLines.push('-- ============================================================');
  sqlLines.push('');
  sqlLines.push('-- 1. Insert Categories (Using INSERT ON CONFLICT DO NOTHING)');
  sqlLines.push("INSERT INTO categories (name) VALUES ");
  sqlLines.push("  ('مستحضرات تجميل وعناية'),");
  sqlLines.push("  ('مستلزمات طبية')");
  sqlLines.push("ON CONFLICT (name) DO NOTHING;");
  sqlLines.push('');
  
  sqlLines.push('-- 2. Insert/Update Products');
  sqlLines.push('DO $$');
  sqlLines.push('DECLARE');
  sqlLines.push('  cat_cosmetics_id UUID;');
  sqlLines.push('  cat_medical_id UUID;');
  sqlLines.push('BEGIN');
  sqlLines.push("  SELECT id INTO cat_cosmetics_id FROM categories WHERE name = 'مستحضرات تجميل وعناية';");
  sqlLines.push("  SELECT id INTO cat_medical_id FROM categories WHERE name = 'مستلزمات طبية';");
  sqlLines.push('');

  for (const p of productsData) {
    const catVar = p.categoryName === 'مستحضرات تجميل وعناية' ? 'cat_cosmetics_id' : 'cat_medical_id';
    
    // Calculate discounts
    const cashDiscountPercent = Math.max(0, Number(((p.publicPrice - p.cashPrice) / p.publicPrice * 100).toFixed(2)));
    const creditDiscountPercent = Math.max(0, Number(((p.publicPrice - p.creditPrice) / p.publicPrice * 100).toFixed(2)));
    
    // Calculate box qty
    let calculatedBoxQty = 1;
    if (p.boxQuantity !== undefined) {
      calculatedBoxQty = p.boxQuantity;
    } else if (p.dozenPrice !== null && p.piecePrice > 0) {
      calculatedBoxQty = Math.round(p.dozenPrice / p.piecePrice);
    }

    // Escape name for single quotes
    const escapedName = p.name.replace(/'/g, "''");

    sqlLines.push(`  -- Product: ${p.name}`);
    sqlLines.push(`  IF NOT EXISTS (SELECT 1 FROM products WHERE name = '${escapedName}') THEN`);
    sqlLines.push(`    INSERT INTO products (name, category_id, base_price, public_price, cash_discount_percent, credit_discount_percent, box_quantity, unit, is_active)`);
    sqlLines.push(`    VALUES ('${escapedName}', ${catVar}, ${p.piecePrice}, ${p.publicPrice}, ${cashDiscountPercent}, ${creditDiscountPercent}, ${calculatedBoxQty}, 'قطعة', true);`);
    sqlLines.push(`  ELSE`);
    sqlLines.push(`    UPDATE products SET`);
    sqlLines.push(`      category_id = ${catVar},`);
    sqlLines.push(`      base_price = ${p.piecePrice},`);
    sqlLines.push(`      public_price = ${p.publicPrice},`);
    sqlLines.push(`      cash_discount_percent = ${cashDiscountPercent},`);
    sqlLines.push(`      credit_discount_percent = ${creditDiscountPercent},`);
    sqlLines.push(`      box_quantity = ${calculatedBoxQty}`);
    sqlLines.push(`    WHERE name = '${escapedName}';`);
    sqlLines.push(`  END IF;`);
    sqlLines.push('');
  }

  sqlLines.push('END $$;');

  const outputPath = path.join(__dirname, '../../supabase/insert_products.sql');
  fs.writeFileSync(outputPath, sqlLines.join('\n'));
  console.log('✅ Generated SQL seed script at:', outputPath);
}

generateSql();
