import React from 'react';
import { formatCurrency, formatFullDate, formatDate, formatDateTime } from '../utils';
import type { Invoice } from '../types';

interface InvoicePDFProps {
  invoice: Invoice;
}

export const InvoicePDF: React.FC<InvoicePDFProps> = ({ invoice }) => {
  const items = invoice.items || [];
  const dayName = formatFullDate(invoice.created_at);

  return (
    <div
      id="invoice-print"
      className="bg-white p-4 sm:p-8 font-arabic text-secondary-900 relative"
      style={{ fontFamily: "'Cairo', sans-serif", direction: 'rtl' }}
    >
      {/* Repeating Fixed Footer for Printing */}
      <div className="hidden print:flex fixed bottom-0 left-0 right-0 bg-white border-t-2 border-secondary-950 flex-col justify-center py-2" style={{ zIndex: 1000, direction: 'rtl', height: '1.4cm' }}>
        <div className="flex items-center justify-between text-secondary-700 font-bold mb-1 px-2" style={{ fontSize: '10px' }}>
          <span>📞 د. أحمد فرغلي: <span className="ltr-number">01008433565</span></span>
          <span>📞 د. عبد الرحمن يوسف: <span className="ltr-number">01220246178</span></span>
          <span>📞 د. محمد عمران طرش: <span className="ltr-number">01062996457</span></span>
        </div>
        <div className="flex items-center justify-between border-t border-secondary-300 pt-1 text-secondary-500 font-semibold px-2" style={{ fontSize: '9px' }}>
          <span>مخزن الأصدقاء للأدوات الطبية • شكراً لتعاملكم معنا</span>
          <span>صفحة <span className="page-num"></span></span>
        </div>
      </div>

      {/* Screen view footer */}
      <div className="print:hidden border-t-2 border-secondary-950 mt-8 pt-4">
        <div className="flex flex-col sm:flex-row items-center justify-between text-secondary-700 font-bold mb-2 gap-2 text-xs">
          <span>📞 د. أحمد فرغلي: <span className="ltr-number">01008433565</span></span>
          <span>📞 د. عبد الرحمن يوسف: <span className="ltr-number">01220246178</span></span>
          <span>📞 د. محمد عمران طرش: <span className="ltr-number">01062996457</span></span>
        </div>
        <div className="flex items-center justify-between border-t border-secondary-200 pt-2 text-secondary-500 text-xs">
          <span>مخزن الأصدقاء للأدوات الطبية • شكراً لتعاملكم معنا</span>
          <span>تم الإصدار: {formatDateTime(invoice.created_at)}</span>
        </div>
      </div>

      {/* Main Print Table Layout */}
      <table className="w-full" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead className="hidden print:table-header-group">
          <tr>
            <th style={{ border: 'none', padding: '0 0 15px 0' }}>
              <div className="flex items-center justify-between border-b-2 border-secondary-950 pb-3" style={{ textAlign: 'right' }}>
                <div>
                  <h1 className="text-2xl font-black text-secondary-900 mb-1">مخزن الأصدقاء</h1>
                  <p className="text-secondary-600 text-xs font-bold mb-1">شعارنا الأمانة والتميز</p>
                  <p className="text-secondary-800 text-sm font-bold mt-1">فاتورة مبيعات</p>
                </div>
                <div className="w-20 h-20 border-2 border-secondary-950 flex items-center justify-center p-1 bg-white" style={{ borderRadius: '12px' }}>
                  <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
                </div>
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td style={{ border: 'none', padding: 0 }}>
              {/* Screen Header */}
              <div className="print:hidden flex flex-col items-center justify-center text-center mb-6 border-b-2 border-primary-600 pb-6">
                <img src="/logo.png" alt="Logo" className="w-16 h-16 object-contain mb-3" />
                <h1 className="text-2xl font-black text-primary-700 mb-1">مخزن الأصدقاء</h1>
                <p className="text-secondary-500 text-sm">Friends Warehouse</p>
              </div>

              {/* Invoice Meta Row (Common for both print & screen) */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-secondary-50 p-4 rounded-xl border border-secondary-200">
                <div>
                  <span className="text-xs text-secondary-500 block mb-0.5">رقم الفاتورة</span>
                  <span className="font-black text-lg text-primary-700">{invoice.invoice_number}</span>
                </div>
                <div className="hidden sm:block w-px h-8 bg-secondary-200" />
                <div>
                  <span className="text-xs text-secondary-500 block mb-0.5">التاريخ</span>
                  <span className="font-bold text-sm text-secondary-800">{formatDate(invoice.created_at)}</span>
                </div>
                <div className="hidden sm:block w-px h-8 bg-secondary-200" />
                <div>
                  <span className="text-xs text-secondary-500 block mb-0.5">اليوم</span>
                  <span className="font-bold text-sm text-secondary-800">{dayName.split('،')[0]}</span>
                </div>
                <div className="hidden sm:block w-px h-8 bg-secondary-200" />
                <div>
                  <span className="text-xs text-secondary-500 block mb-0.5">حالة الدفع</span>
                  <span className={`badge ${invoice.remaining > 0 ? 'badge-warning' : 'badge-success'}`}>
                    {invoice.remaining > 0 ? 'آجل' : 'مدفوع بالكامل'}
                  </span>
                </div>
              </div>

              {/* Customer Info */}
              <div className="border border-secondary-200 rounded-xl p-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white">
                <div>
                  <p className="text-xs text-secondary-400 mb-0.5">العميل / الصيدلية</p>
                  <p className="font-black text-lg text-secondary-900">{invoice.customer?.name}</p>
                  {invoice.customer?.phone && (
                    <p className="text-sm text-secondary-500 mt-0.5">{invoice.customer.phone}</p>
                  )}
                </div>
                {invoice.customer?.address && (
                  <div className="text-right sm:text-left">
                    <p className="text-xs text-secondary-400 mb-0.5">العنوان</p>
                    <p className="text-sm text-secondary-700">{invoice.customer.address}</p>
                  </div>
                )}
              </div>

              {/* Items Table */}
              <table className="w-full mb-6" style={{ borderCollapse: 'collapse', width: '100%', border: '1px solid #475569' }}>
                <thead>
                  <tr style={{ backgroundColor: '#0f172a', color: 'white' }}>
                    <th style={{ padding: '8px 10px', border: '1px solid #475569', textAlign: 'center', fontSize: '12px', fontWeight: 700 }}>م</th>
                    <th style={{ padding: '8px 10px', border: '1px solid #475569', textAlign: 'right', fontSize: '12px', fontWeight: 700 }}>اسم الصنف</th>
                    <th style={{ padding: '8px 10px', border: '1px solid #475569', textAlign: 'center', fontSize: '12px', fontWeight: 700 }}>الكمية</th>
                    <th style={{ padding: '8px 10px', border: '1px solid #475569', textAlign: 'center', fontSize: '12px', fontWeight: 700 }}>سعر الجمهور</th>
                    <th style={{ padding: '8px 10px', border: '1px solid #475569', textAlign: 'center', fontSize: '12px', fontWeight: 700 }}>سعر الصيدلي</th>
                    <th style={{ padding: '8px 10px', border: '1px solid #475569', textAlign: 'center', fontSize: '12px', fontWeight: 700 }}>الإجمالي</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, idx) => (
                    <tr
                      key={item.id || idx}
                      style={{ backgroundColor: idx % 2 === 0 ? 'white' : '#f8fafc' }}
                    >
                      <td style={{ padding: '7px 8px', border: '1px solid #94a3b8', textAlign: 'center', fontSize: '12px' }}>{idx + 1}</td>
                      <td style={{ padding: '7px 8px', border: '1px solid #94a3b8', fontWeight: 600, fontSize: '12px' }}>{item.product_name}</td>
                      <td style={{ padding: '7px 8px', border: '1px solid #94a3b8', textAlign: 'center', fontSize: '12px' }}>
                        {item.is_box
                          ? `${item.quantity} علبة (${item.quantity_units} قطعة)`
                          : `${item.quantity_units} قطعة`}
                      </td>
                      <td style={{ padding: '7px 8px', border: '1px solid #94a3b8', textAlign: 'center', fontSize: '12px' }}>
                        {formatCurrency(item.public_price)}
                      </td>
                      <td style={{ padding: '7px 8px', border: '1px solid #94a3b8', textAlign: 'center', fontWeight: 700, color: '#0369a1', fontSize: '12px' }}>
                        {formatCurrency(item.pharmacist_price)}
                      </td>
                      <td style={{ padding: '7px 8px', border: '1px solid #94a3b8', textAlign: 'center', fontWeight: 700, fontSize: '12px' }}>
                        {formatCurrency(item.total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Totals & Notes Summary Row */}
              <div className="flex flex-col sm:flex-row justify-between items-stretch gap-6 mt-4 invoice-summary-section">
                {/* Notes */}
                <div className="flex-1 w-full">
                  {invoice.notes ? (
                    <div className="p-4 bg-secondary-50 rounded-xl border border-secondary-200 h-full">
                      <p className="text-xs text-secondary-500 font-bold mb-1">ملاحظات الفاتورة:</p>
                      <p className="text-sm text-secondary-700 leading-relaxed">{invoice.notes}</p>
                    </div>
                  ) : (
                    <div className="p-4 bg-secondary-50/50 rounded-xl border border-dashed border-secondary-200 h-full flex items-center justify-center min-h-[100px]">
                      <p className="text-xs text-secondary-400">لا توجد ملاحظات على هذه الفاتورة</p>
                    </div>
                  )}
                </div>

                {/* Totals */}
                <div className="w-full sm:w-80 space-y-2 border border-secondary-200 rounded-xl p-4 bg-white">
                  <div className="flex justify-between items-center py-1.5 border-b border-secondary-100">
                    <span className="text-secondary-600 font-semibold text-sm">إجمالي الفاتورة:</span>
                    <span className="font-black text-base text-secondary-900">{formatCurrency(invoice.total)}</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-secondary-100">
                    <span className="text-secondary-600 font-semibold text-sm">المبلغ المدفوع:</span>
                    <span className="font-bold text-success-600 text-sm">{formatCurrency(invoice.paid_amount)}</span>
                  </div>
                  {invoice.remaining > 0 ? (
                    <div className="flex justify-between items-center py-1.5 bg-danger-50 px-3 rounded-lg border border-danger-100 mt-1">
                      <span className="text-danger-700 font-bold text-sm">المتبقي:</span>
                      <span className="font-black text-danger-700 text-base">{formatCurrency(invoice.remaining)}</span>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center py-1.5 bg-success-50 px-3 rounded-lg border border-success-200 mt-1">
                      <span className="text-success-700 font-bold text-sm">مدفوع بالكامل ✓</span>
                    </div>
                  )}
                </div>
              </div>
            </td>
          </tr>
        </tbody>

        {/* Repeating Spacer Footer */}
        <tfoot className="hidden print:table-footer-group">
          <tr>
            <td style={{ border: 'none' }}>
              <div style={{ height: '1.6cm' }}></div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
