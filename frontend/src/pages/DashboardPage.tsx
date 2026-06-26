import React, { useEffect, useState } from 'react';
import {
  TrendingUp, ShoppingCart, DollarSign, Package,
  Users, AlertTriangle, ArrowUpRight, ArrowDownRight,
  Calendar, RefreshCw, Wallet
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts';
import api from '../lib/api';
import { formatCurrency, formatDate, formatNumber, formatFullDate } from '../utils';
import type { DashboardStats, Invoice, Product } from '../types';

const COLORS = ['#0ea5e9', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6'];

const StatCard: React.FC<{
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ElementType;
  color: string;
  trend?: { value: number; label: string };
}> = ({ title, value, subtitle, icon: Icon, color, trend }) => (
  <div className="card p-5 hover:shadow-elevated transition-shadow duration-200">
    <div className="flex items-start justify-between mb-3">
      <div className={`stat-icon ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-xs font-semibold ${trend.value >= 0 ? 'text-success-600' : 'text-danger-500'}`}>
          {trend.value >= 0 ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
          {Math.abs(trend.value)}%
        </div>
      )}
    </div>
    <p className="text-2xl font-black text-secondary-900 mb-0.5 ltr-number">{value}</p>
    <p className="text-sm font-semibold text-secondary-600">{title}</p>
    {subtitle && <p className="text-xs text-secondary-400 mt-0.5">{subtitle}</p>}
  </div>
);

const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadStats = async (showRefresh = false) => {
    if (showRefresh) setRefreshing(true);
    try {
      const res = await api.get('/reports/dashboard');
      if (res.data.success) setStats(res.data.data);
    } catch (err) {
      console.error('Failed to load dashboard stats', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { loadStats(); }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 spinner" />
      </div>
    );
  }

  // Fallback mock data for display if API not connected yet
  const mockStats: DashboardStats = stats || {
    todaySales: 0, todayProfit: 0, todayInvoicesCount: 0,
    monthSales: 0, monthProfit: 0, totalCustomers: 0,
    totalDebt: 0, cashBalance: 0,
    lowStockProducts: [], topProducts: [], recentInvoices: [],
    salesChart: Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() - (6-i) * 86400000).toISOString(),
      sales: Math.random() * 5000,
      profit: Math.random() * 2000,
    })),
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">لوحة التحكم</h1>
          <p className="page-subtitle flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {formatFullDate(new Date())}
          </p>
        </div>
        <button
          onClick={() => loadStats(true)}
          disabled={refreshing}
          className="btn-secondary"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          تحديث
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="مبيعات اليوم"
          value={formatCurrency(mockStats.todaySales)}
          subtitle={`${mockStats.todayInvoicesCount} فاتورة`}
          icon={ShoppingCart}
          color="bg-primary-50 text-primary-600"
        />
        <StatCard
          title="أرباح اليوم"
          value={formatCurrency(mockStats.todayProfit)}
          icon={TrendingUp}
          color="bg-success-50 text-success-600"
        />
        <StatCard
          title="مبيعات الشهر"
          value={formatCurrency(mockStats.monthSales)}
          icon={DollarSign}
          color="bg-warning-50 text-warning-600"
        />
        <StatCard
          title="رصيد الخزنة"
          value={formatCurrency(mockStats.cashBalance)}
          icon={Wallet}
          color="bg-purple-50 text-purple-600"
        />
      </div>

      {/* Second Row Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <StatCard
          title="إجمالي العملاء"
          value={formatNumber(mockStats.totalCustomers)}
          icon={Users}
          color="bg-blue-50 text-blue-600"
        />
        <StatCard
          title="إجمالي المديونيات"
          value={formatCurrency(mockStats.totalDebt)}
          icon={DollarSign}
          color="bg-orange-50 text-orange-600"
        />
        <StatCard
          title="منتجات قرب النفاد"
          value={formatNumber(mockStats.lowStockProducts.length)}
          icon={AlertTriangle}
          color="bg-red-50 text-red-600"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <div className="card lg:col-span-2">
          <div className="card-header">
            <h3 className="card-title">المبيعات والأرباح (آخر 7 أيام)</h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={mockStats.salesChart} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
              <defs>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="date"
                tickFormatter={(v) => formatDate(v)}
                tick={{ fontSize: 11, fill: '#64748b' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip
                formatter={(val: number, name: string) => [
                  formatCurrency(val),
                  name === 'sales' ? 'المبيعات' : 'الأرباح'
                ]}
                labelFormatter={(label) => formatDate(label)}
                contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
              />
              <Legend formatter={(v) => v === 'sales' ? 'المبيعات' : 'الأرباح'} />
              <Area type="monotone" dataKey="sales" stroke="#0ea5e9" strokeWidth={2} fill="url(#salesGrad)" />
              <Area type="monotone" dataKey="profit" stroke="#22c55e" strokeWidth={2} fill="url(#profitGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Top Products */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">أعلى المنتجات مبيعاً</h3>
          </div>
          {mockStats.topProducts.length === 0 ? (
            <div className="empty-state py-10">
              <Package className="empty-icon w-12 h-12" />
              <p className="empty-text">لا توجد بيانات</p>
            </div>
          ) : (
            <div className="space-y-3">
              {mockStats.topProducts.slice(0, 5).map((item, idx) => (
                <div key={item.product.id} className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                  >
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-secondary-800 truncate">{item.product.name}</p>
                    <p className="text-xs text-secondary-500">{formatNumber(item.total_quantity)} وحدة</p>
                  </div>
                  <p className="text-sm font-bold text-primary-600">{formatCurrency(item.total_revenue)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Invoices */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">آخر الفواتير</h3>
            <a href="/invoices" className="text-primary-600 text-sm font-semibold hover:text-primary-700">عرض الكل</a>
          </div>
          {mockStats.recentInvoices.length === 0 ? (
            <div className="empty-state py-8">
              <ShoppingCart className="empty-icon w-12 h-12" />
              <p className="empty-text">لا توجد فواتير حديثة</p>
            </div>
          ) : (
            <div className="space-y-3">
              {mockStats.recentInvoices.slice(0, 5).map((inv: Invoice) => (
                <div key={inv.id} className="flex items-center gap-3 p-3 rounded-xl bg-secondary-50 hover:bg-secondary-100 transition-colors">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ShoppingCart className="w-4 h-4 text-primary-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-secondary-900">{inv.customer?.name}</p>
                    <p className="text-xs text-secondary-500">{inv.invoice_number} • {formatDate(inv.created_at)}</p>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-secondary-900">{formatCurrency(inv.total)}</p>
                    {inv.remaining > 0 && (
                      <p className="text-xs text-danger-500">متبقي: {formatCurrency(inv.remaining)}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Low Stock Alerts */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">تنبيهات نقص المخزون</h3>
            <a href="/inventory" className="text-primary-600 text-sm font-semibold hover:text-primary-700">إدارة المخزون</a>
          </div>
          {mockStats.lowStockProducts.length === 0 ? (
            <div className="empty-state py-8">
              <Package className="w-12 h-12 text-success-300 mb-3" />
              <p className="text-success-600 font-semibold text-sm">المخزون في مستوى جيد</p>
            </div>
          ) : (
            <div className="space-y-3">
              {mockStats.lowStockProducts.slice(0, 6).map((product: Product) => (
                <div key={product.id} className="flex items-center gap-3 p-3 rounded-xl bg-danger-50 border border-danger-100">
                  <AlertTriangle className="w-5 h-5 text-danger-500 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-secondary-900 truncate">{product.name}</p>
                    <p className="text-xs text-danger-600">
                      الكمية: {product.stock_quantity} • الحد الأدنى: {product.min_stock_alert}
                    </p>
                  </div>
                  <span className="badge-danger badge">نقص</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
