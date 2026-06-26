import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Calendar, Download, TrendingUp, Package, Users, DollarSign } from 'lucide-react';
import api from '../lib/api';
import { formatCurrency, formatDate, formatNumber } from '../utils';

const COLORS = ['#0ea5e9', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#84cc16'];

const ReportsPage: React.FC = () => {
  const [dateFrom, setDateFrom] = useState(() => {
    const d = new Date(); d.setDate(1);
    return d.toISOString().split('T')[0];
  });
  const [dateTo, setDateTo] = useState(new Date().toISOString().split('T')[0]);
  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const loadReport = async () => {
    setLoading(true);
    try {
      const res = await api.get('/reports/summary', { params: { from: dateFrom, to: dateTo } });
      if (res.data.success) setReportData(res.data.data);
    } catch { console.error('Report load failed'); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadReport(); }, [dateFrom, dateTo]);

  const mock = reportData || {
    totalSales: 0, totalProfit: 0, totalExpenses: 0, netProfit: 0,
    invoiceCount: 0, newCustomers: 0, totalDebt: 0,
    topProducts: [], salesByDay: [],
    categoryDistribution: [],
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">التقارير والإحصائيات</h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-secondary-200 rounded-xl px-3 py-2">
            <Calendar className="w-4 h-4 text-secondary-400" />
            <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="text-sm border-0 outline-none" dir="ltr" />
            <span className="text-secondary-400">—</span>
            <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="text-sm border-0 outline-none" dir="ltr" />
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'إجمالي المبيعات', value: formatCurrency(mock.totalSales), color: 'bg-primary-50 text-primary-600', icon: DollarSign },
          { label: 'إجمالي الأرباح', value: formatCurrency(mock.totalProfit), color: 'bg-success-50 text-success-600', icon: TrendingUp },
          { label: 'إجمالي المصروفات', value: formatCurrency(mock.totalExpenses), color: 'bg-danger-50 text-danger-500', icon: DollarSign },
          { label: 'صافي الربح', value: formatCurrency(mock.netProfit), color: 'bg-purple-50 text-purple-600', icon: TrendingUp },
        ].map((stat, idx) => (
          <div key={idx} className="card p-5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <p className="text-xl font-black text-secondary-900">{stat.value}</p>
            <p className="text-sm text-secondary-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Sales */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">المبيعات اليومية</h3>
          </div>
          {loading ? (
            <div className="flex justify-center py-10"><div className="w-8 h-8 spinner" /></div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={mock.salesByDay} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" tickFormatter={formatDate} tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip formatter={(val: number) => [formatCurrency(val), 'المبيعات']} labelFormatter={formatDate} />
                <Bar dataKey="sales" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Top Products */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">أعلى الأصناف مبيعاً</h3>
          </div>
          {mock.topProducts.length === 0 ? (
            <div className="empty-state py-10">
              <Package className="empty-icon w-12 h-12" />
              <p className="empty-text">لا توجد بيانات</p>
            </div>
          ) : (
            <div className="space-y-3">
              {mock.topProducts.slice(0, 8).map((item: any, idx: number) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{ backgroundColor: COLORS[idx % COLORS.length] }}>
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-0.5">
                      <p className="text-sm font-semibold truncate">{item.product_name}</p>
                      <p className="text-xs font-bold text-primary-600">{formatCurrency(item.total_revenue)}</p>
                    </div>
                    <div className="w-full bg-secondary-100 rounded-full h-1.5">
                      <div
                        className="h-1.5 rounded-full"
                        style={{
                          width: `${Math.min(100, (item.total_revenue / (mock.topProducts[0]?.total_revenue || 1)) * 100)}%`,
                          backgroundColor: COLORS[idx % COLORS.length],
                        }}
                      />
                    </div>
                    <p className="text-xs text-secondary-400">{formatNumber(item.total_quantity)} وحدة • {item.invoice_count} فاتورة</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-4 text-center">
          <p className="text-3xl font-black text-secondary-900">{formatNumber(mock.invoiceCount)}</p>
          <p className="text-secondary-500 mt-1">فاتورة صدرت</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-3xl font-black text-secondary-900">{formatNumber(mock.newCustomers)}</p>
          <p className="text-secondary-500 mt-1">عميل جديد</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-3xl font-black text-danger-600">{formatCurrency(mock.totalDebt)}</p>
          <p className="text-secondary-500 mt-1">إجمالي المديونيات</p>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
