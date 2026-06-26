import React, { useState, useEffect } from 'react';
import { Printer, BookOpen, Eye } from 'lucide-react';
import api from '../lib/api';
import { formatCurrency } from '../utils';
import type { Product } from '../types';

const MenuPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'internal' | 'external'>('internal');

  useEffect(() => {
    api.get('/products').then(res => {
      if (res.data.success) {
        const activeProds = res.data.data.filter((p: Product) => p.is_active);
        activeProds.sort((a: Product, b: Product) => a.name.localeCompare(b.name, 'ar'));
        setProducts(activeProds);
      }
    }).finally(() => setLoading(false));
  }, []);

  const handlePrint = () => window.print();

  const half = Math.ceil(products.length / 2);
  const rightProducts = products.slice(0, half);
  const leftProducts = products.slice(half);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="page-header no-print">
        <div>
          <h1 className="page-title">قائمة الأسعار</h1>
          <p className="page-subtitle">المرجع الداخلي وقائمة العملاء</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-1 bg-secondary-100 p-1 rounded-2xl">
            <button
              onClick={() => setView('internal')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${view === 'internal' ? 'bg-white text-secondary-900 shadow-card' : 'text-secondary-600'
                }`}
            >
              <Eye className="w-4 h-4" />
              مرجع داخلي
            </button>
            <button
              onClick={() => setView('external')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${view === 'external' ? 'bg-white text-secondary-900 shadow-card' : 'text-secondary-600'
                }`}
            >
              <BookOpen className="w-4 h-4" />
              قائمة العملاء
            </button>
          </div>
          <button onClick={handlePrint} className="btn-primary">
            <Printer className="w-4 h-4" />
            طباعة
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><div className="w-10 h-10 spinner" /></div>
      ) : (
        <>
          {/* ==================== Screen-Only View (Vibrant & Interactive) ==================== */}
          <div className="bg-white rounded-2xl shadow-card overflow-hidden print:hidden">
            {view === 'internal' ? (
              /* Internal Menu (Screen) */
              <>
                <div className="bg-primary-700 text-white p-6 text-center">
                  <h2 className="text-xl font-black">قائمة الأسعار - المرجع الداخلي</h2>
                  <p className="text-primary-200 text-sm mt-1">تحتوي على كل الأسعار والخصومات (للاستخدام الداخلي فقط)</p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full" style={{ borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#0284c7', color: 'white' }}>
                        {['م', 'اسم الصنف', 'السعر الأساسي', 'سعر الجمهور', 'خصم كاش %', 'سعر الصيدلي (كاش)', 'خصم آجل %', 'سعر الصيدلي (آجل)', 'العلبة'].map((h, i) => (
                          <th key={i} style={{ padding: '12px', textAlign: i <= 1 ? 'right' : 'center', fontSize: '12px', fontWeight: 700, whiteSpace: 'nowrap' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((p, idx) => (
                        <tr key={p.id} style={{ backgroundColor: idx % 2 === 0 ? '#f8fafc' : 'white', borderBottom: '1px solid #e2e8f0' }}>
                          <td style={{ padding: '10px 12px', fontSize: '13px' }}>{idx + 1}</td>
                          <td style={{ padding: '10px 12px', fontWeight: 600, fontSize: '13px' }}>{p.name}</td>
                          <td style={{ padding: '10px 12px', textAlign: 'center', fontSize: '13px' }}>{formatCurrency(p.base_price)}</td>
                          <td style={{ padding: '10px 12px', textAlign: 'center', fontSize: '13px', fontWeight: 600 }}>{formatCurrency(p.public_price)}</td>
                          <td style={{ padding: '10px 12px', textAlign: 'center', fontSize: '13px', color: '#0369a1' }}>{p.cash_discount_percent}%</td>
                          <td style={{ padding: '10px 12px', textAlign: 'center', fontSize: '13px', fontWeight: 700, color: '#0369a1' }}>{formatCurrency(p.pharmacist_cash_price)}</td>
                          <td style={{ padding: '10px 12px', textAlign: 'center', fontSize: '13px', color: '#c2410c' }}>{p.credit_discount_percent}%</td>
                          <td style={{ padding: '10px 12px', textAlign: 'center', fontSize: '13px', fontWeight: 700, color: '#c2410c' }}>{formatCurrency(p.pharmacist_credit_price)}</td>
                          <td style={{ padding: '10px 12px', textAlign: 'center', fontSize: '13px' }}>{p.box_quantity} قطعة</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              /* External Menu (Screen) */
              <>
                <div className="bg-gradient-to-r from-primary-700 to-primary-900 text-white p-8 text-center flex flex-col items-center justify-center">
                  <img src="/logo.png" alt="Logo" className="w-16 h-16 object-contain mb-3 filter brightness-110" />
                  <h1 className="text-2xl font-black mb-1">مخزن الأصدقاء</h1>
                  <p className="text-primary-200 text-sm">مخزن الأصدقاء للأكسسوارات والأدوات الطبية</p>
                  <p className="text-primary-300 text-xs mt-2">{new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full" style={{ borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                        {['م', 'اسم الصنف', 'سعر الجمهور', 'نسبة الخصم', 'سعر الصيدلي'].map((h, i) => (
                          <th key={i} style={{ padding: '12px', textAlign: i <= 1 ? 'right' : 'center', fontSize: '13px', fontWeight: 700, color: '#374151', whiteSpace: 'nowrap' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((p, idx) => (
                        <tr key={p.id} style={{ backgroundColor: idx % 2 === 0 ? 'white' : '#fafafa', borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '12px', fontSize: '13px', color: '#6b7280' }}>{idx + 1}</td>
                          <td style={{ padding: '12px', fontWeight: 700, fontSize: '14px', color: '#111827' }}>{p.name}</td>
                          <td style={{ padding: '12px', textAlign: 'center', fontSize: '13px', color: '#6b7280' }}>{formatCurrency(p.public_price)}</td>
                          <td style={{ padding: '12px', textAlign: 'center' }}>
                            <span style={{ backgroundColor: '#dbeafe', color: '#1d4ed8', padding: '2px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 700 }}>
                              {p.cash_discount_percent}%
                            </span>
                          </td>
                          <td style={{ padding: '12px', textAlign: 'center', fontSize: '15px', fontWeight: 900, color: '#0369a1' }}>
                            {formatCurrency(p.pharmacist_cash_price)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div style={{ padding: '16px', textAlign: 'center', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
                  <p style={{ color: '#9ca3af', fontSize: '11px' }}>* الأسعار قابلة للتغيير • شكراً لتعاملكم معنا</p>
                </div>
              </>
            )}
          </div>

          {/* ==================== Print-Only Layout (Matches PDF Screenshot Exactly) ==================== */}
          <div className="hidden print:block w-full text-secondary-900 bg-white" style={{ direction: 'rtl' }}>

            {/* Fixed Footer at the bottom of every printed page */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-secondary-950 flex flex-col justify-center py-2" style={{ zIndex: 1000, direction: 'rtl', height: '1.4cm' }}>
              <div className="flex items-center justify-between text-secondary-700 font-bold mb-1 px-2" style={{ fontSize: '10px' }}>
                <span>📞 د. أحمد فرغلي: <span className="ltr-number">01008433565</span></span>
                <span>📞 د. عبد الرحمن يوسف: <span className="ltr-number">01220246178</span></span>
                <span>📞 د. محمد عمران طرش: <span className="ltr-number">01062996457</span></span>
              </div>
              <div className="flex items-center justify-between border-t border-secondary-300 pt-1 text-secondary-500 font-semibold px-2" style={{ fontSize: '9px' }}>
                <span>مخزن الأصدقاء للأدوات الطبية • شعارنا الأمانة والتميز</span>
                <span>صفحة <span className="page-num"></span></span>
              </div>
            </div>

            {view === 'internal' ? (
              /* Wide Internal Table Layout (Single Column) */
              <table className="w-full" style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                  {/* Clean repeating Shop Header */}
                  <tr>
                    <th colSpan={9} style={{ border: 'none', padding: '0 0 15px 0' }}>
                      <div className="flex items-center justify-between border-b-2 border-secondary-950 pb-3" style={{ textAlign: 'right' }}>
                        <div>
                          <h1 className="text-2xl font-black text-secondary-900 mb-1" style={{ fontFamily: "'Cairo', sans-serif" }}>مخزن الأصدقاء</h1>
                          <p className="text-secondary-600 text-xs font-bold mb-1">شعارنا الأمانة والتميز</p>
                          <p className="text-secondary-800 text-sm font-bold mt-1">قائمة الأسعار - المرجع الداخلي</p>
                        </div>
                        <div className="w-20 h-20 border-2 border-secondary-950 flex items-center justify-center p-1 bg-white" style={{ borderRadius: '12px' }}>
                          <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
                        </div>
                      </div>
                    </th>
                  </tr>

                  {/* Repeating Column Headers */}
                  <tr style={{ backgroundColor: '#0f172a', color: 'white' }}>
                    <th style={{ padding: '8px 6px', border: '1px solid #334155', textAlign: 'center', fontSize: '11px', fontWeight: 900 }}>م</th>
                    <th style={{ padding: '8px 6px', border: '1px solid #334155', textAlign: 'right', fontSize: '11px', fontWeight: 900 }}>اسم الصنف</th>
                    <th style={{ padding: '8px 6px', border: '1px solid #334155', textAlign: 'center', fontSize: '11px', fontWeight: 900 }}>العلبة</th>
                    <th style={{ padding: '8px 6px', border: '1px solid #334155', textAlign: 'center', fontSize: '11px', fontWeight: 900 }}>سعر الشراء</th>
                    <th style={{ padding: '8px 6px', border: '1px solid #334155', textAlign: 'center', fontSize: '11px', fontWeight: 900 }}>سعر الجمهور</th>
                    <th style={{ padding: '8px 6px', border: '1px solid #334155', textAlign: 'center', fontSize: '11px', fontWeight: 900 }}>كاش %</th>
                    <th style={{ padding: '8px 6px', border: '1px solid #334155', textAlign: 'center', fontSize: '11px', fontWeight: 900 }}>صيدلي كاش</th>
                    <th style={{ padding: '8px 6px', border: '1px solid #334155', textAlign: 'center', fontSize: '11px', fontWeight: 900 }}>أجل %</th>
                    <th style={{ padding: '8px 6px', border: '1px solid #334155', textAlign: 'center', fontSize: '11px', fontWeight: 900 }}>صيدلي أجل</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((p, idx) => (
                    <tr key={p.id} style={{ backgroundColor: idx % 2 === 0 ? 'white' : '#f8fafc' }}>
                      <td style={{ padding: '5px 4px', border: '1px solid #94a3b8', textAlign: 'center', fontSize: '11px' }}>{idx + 1}</td>
                      <td style={{ padding: '5px 6px', border: '1px solid #94a3b8', fontSize: '11px', fontWeight: 700 }}>{p.name}</td>
                      <td style={{ padding: '5px 4px', border: '1px solid #94a3b8', textAlign: 'center', fontSize: '11px' }}>{p.box_quantity} قطعة</td>
                      <td style={{ padding: '5px 4px', border: '1px solid #94a3b8', textAlign: 'center', fontSize: '11px' }}>{p.base_price}</td>
                      <td style={{ padding: '5px 4px', border: '1px solid #94a3b8', textAlign: 'center', fontSize: '11px', fontWeight: 700 }}>{p.public_price}</td>
                      <td style={{ padding: '5px 4px', border: '1px solid #94a3b8', textAlign: 'center', fontSize: '11px', color: '#0369a1' }}>{p.cash_discount_percent}%</td>
                      <td style={{ padding: '5px 4px', border: '1px solid #94a3b8', textAlign: 'center', fontSize: '11px', fontWeight: 700, color: '#0369a1' }}>{p.pharmacist_cash_price}</td>
                      <td style={{ padding: '5px 4px', border: '1px solid #94a3b8', textAlign: 'center', fontSize: '11px', color: '#c2410c' }}>{p.credit_discount_percent}%</td>
                      <td style={{ padding: '5px 4px', border: '1px solid #94a3b8', textAlign: 'center', fontSize: '11px', fontWeight: 700, color: '#c2410c' }}>{p.pharmacist_credit_price}</td>
                    </tr>
                  ))}
                </tbody>

                <tfoot>
                  <tr>
                    <td colSpan={9} style={{ border: 'none' }}>
                      <div style={{ height: '1.6cm' }}></div>
                    </td>
                  </tr>
                </tfoot>
              </table>
            ) : (
              /* Two-Column Side-by-Side Customer Table Layout */
              <div className="flex gap-6 w-full items-start">
                {/* Right Column Table (First Half) */}
                <table className="w-1/2" style={{ borderCollapse: 'collapse', tableLayout: 'fixed', width: '50%' }}>
                  <colgroup>
                    <col style={{ width: '55%' }} />
                    <col style={{ width: '15%' }} />
                    <col style={{ width: '12%' }} />
                    <col style={{ width: '18%' }} />
                  </colgroup>
                  <thead>
                    {/* Clean repeating Shop Header */}
                    <tr>
                      <th colSpan={4} style={{ border: 'none', padding: '0 0 15px 0' }}>
                        <div className="flex items-center justify-between border-b-2 border-secondary-950 pb-3" style={{ textAlign: 'right' }}>
                          <div>
                            <h1 className="text-xl font-black text-secondary-900 mb-0.5" style={{ fontFamily: "'Cairo', sans-serif" }}>مخزن الأصدقاء</h1>
                            <p className="text-secondary-600 text-xs font-bold">قائمة الأسعار - الأصناف للعملاء</p>
                          </div>
                          {/* Logo in a clean bordered square box */}
                          <div className="w-12 h-12 border-2 border-secondary-950 flex items-center justify-center p-0.5 bg-white" style={{ borderRadius: '8px' }}>
                            <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
                          </div>
                        </div>
                      </th>
                    </tr>

                    {/* Repeating Column Headers */}
                    <tr style={{ backgroundColor: '#0f172a', color: 'white' }}>
                      <th style={{ padding: '8px 4px', border: '1px solid #334155', textAlign: 'right', fontSize: '11px', fontWeight: 900 }}>اسم الصنف</th>
                      <th style={{ padding: '8px 4px', border: '1px solid #334155', textAlign: 'center', fontSize: '11px', fontWeight: 900 }}>جمهور</th>
                      <th style={{ padding: '8px 4px', border: '1px solid #334155', textAlign: 'center', fontSize: '11px', fontWeight: 900 }}>خصم</th>
                      <th style={{ padding: '8px 4px', border: '1px solid #334155', textAlign: 'center', fontSize: '11px', fontWeight: 900 }}>صيدلي</th>
                    </tr>
                  </thead>

                  <tbody>
                    {rightProducts.map((p, idx) => (
                      <tr key={p.id} style={{ backgroundColor: idx % 2 === 0 ? 'white' : '#f8fafc' }}>
                        <td style={{ padding: '6px 4px', border: '1px solid #94a3b8', fontSize: '11px', fontWeight: 700 }}>{p.name}</td>
                        <td style={{ padding: '6px 4px', border: '1px solid #94a3b8', textAlign: 'center', fontSize: '11px' }}>{p.public_price}</td>
                        <td style={{ padding: '6px 4px', border: '1px solid #94a3b8', textAlign: 'center', fontSize: '11px' }}>{p.cash_discount_percent}%</td>
                        <td style={{ padding: '6px 4px', border: '1px solid #94a3b8', textAlign: 'center', fontSize: '11px', fontWeight: 700, color: '#0369a1' }}>{p.pharmacist_cash_price}</td>
                      </tr>
                    ))}
                  </tbody>

                  <tfoot>
                    <tr>
                      <td colSpan={4} style={{ border: 'none' }}>
                        <div style={{ height: '1.6cm' }}></div>
                      </td>
                    </tr>
                  </tfoot>
                </table>

                {/* Left Column Table (Second Half) */}
                <table className="w-1/2" style={{ borderCollapse: 'collapse', tableLayout: 'fixed', width: '50%' }}>
                  <colgroup>
                    <col style={{ width: '55%' }} />
                    <col style={{ width: '15%' }} />
                    <col style={{ width: '12%' }} />
                    <col style={{ width: '18%' }} />
                  </colgroup>
                  <thead>
                    {/* Clean repeating Shop Header */}
                    <tr>
                      <th colSpan={4} style={{ border: 'none', padding: '0 0 15px 0' }}>
                        <div className="flex items-center justify-between border-b-2 border-secondary-950 pb-3" style={{ textAlign: 'right' }}>
                          <div>
                            <h1 className="text-xl font-black text-secondary-900 mb-0.5" style={{ fontFamily: "'Cairo', sans-serif" }}>مخزن الأصدقاء</h1>
                            <p className="text-secondary-600 text-xs font-bold">قائمة الأسعار - الأصناف للعملاء</p>
                          </div>
                          {/* Logo in a clean bordered square box */}
                          <div className="w-12 h-12 border-2 border-secondary-950 flex items-center justify-center p-0.5 bg-white" style={{ borderRadius: '8px' }}>
                            <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
                          </div>
                        </div>
                      </th>
                    </tr>

                    {/* Repeating Column Headers */}
                    <tr style={{ backgroundColor: '#0f172a', color: 'white' }}>
                      <th style={{ padding: '8px 4px', border: '1px solid #334155', textAlign: 'right', fontSize: '11px', fontWeight: 900 }}>اسم الصنف</th>
                      <th style={{ padding: '8px 4px', border: '1px solid #334155', textAlign: 'center', fontSize: '11px', fontWeight: 900 }}>جمهور</th>
                      <th style={{ padding: '8px 4px', border: '1px solid #334155', textAlign: 'center', fontSize: '11px', fontWeight: 900 }}>خصم</th>
                      <th style={{ padding: '8px 4px', border: '1px solid #334155', textAlign: 'center', fontSize: '11px', fontWeight: 900 }}>صيدلي</th>
                    </tr>
                  </thead>

                  <tbody>
                    {leftProducts.map((p, idx) => (
                      <tr key={p.id} style={{ backgroundColor: idx % 2 === 0 ? 'white' : '#f8fafc' }}>
                        <td style={{ padding: '6px 4px', border: '1px solid #94a3b8', fontSize: '11px', fontWeight: 700 }}>{p.name}</td>
                        <td style={{ padding: '6px 4px', border: '1px solid #94a3b8', textAlign: 'center', fontSize: '11px' }}>{p.public_price}</td>
                        <td style={{ padding: '6px 4px', border: '1px solid #94a3b8', textAlign: 'center', fontSize: '11px' }}>{p.cash_discount_percent}%</td>
                        <td style={{ padding: '6px 4px', border: '1px solid #94a3b8', textAlign: 'center', fontSize: '11px', fontWeight: 700, color: '#0369a1' }}>{p.pharmacist_cash_price}</td>
                      </tr>
                    ))}
                  </tbody>

                  <tfoot>
                    <tr>
                      <td colSpan={4} style={{ border: 'none' }}>
                        <div style={{ height: '1.6cm' }}></div>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MenuPage;
