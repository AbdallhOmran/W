import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Package, Warehouse, ShoppingCart, Truck,
  Users, Building2, Wallet, BarChart3, BookOpen, Settings,
  LogOut, Menu, X, ChevronRight, Bell, Store
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { hasPermission, ROLE_LABELS } from '../../utils';

interface NavItem {
  to: string;
  icon: React.ElementType;
  label: string;
  permission?: string;
}

const NAV_ITEMS: NavItem[] = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'لوحة التحكم' },
  { to: '/products', icon: Package, label: 'المنتجات', permission: 'products' },
  { to: '/inventory', icon: Warehouse, label: 'المخازن', permission: 'inventory' },
  { to: '/invoices', icon: ShoppingCart, label: 'المبيعات والفواتير', permission: 'invoices' },
  { to: '/purchases', icon: Truck, label: 'المشتريات', permission: 'purchases' },
  { to: '/customers', icon: Users, label: 'العملاء', permission: 'customers' },
  { to: '/suppliers', icon: Building2, label: 'الموردون', permission: 'suppliers' },
  { to: '/cash', icon: Wallet, label: 'الخزنة والحسابات', permission: 'cash' },
  { to: '/reports', icon: BarChart3, label: 'التقارير', permission: 'reports' },
  { to: '/menu', icon: BookOpen, label: 'قائمة الأسعار', permission: 'menu' },
  { to: '/users', icon: Settings, label: 'إدارة المستخدمين', permission: 'users' },
];

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const visibleItems = NAV_ITEMS.filter(item => {
    if (!item.permission) return true;
    if (!user) return false;
    if (item.permission === 'users') return user.role === 'super_admin';
    return hasPermission(user.role as any, item.permission);
  });

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-secondary-100">
        <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
          <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain rounded-xl" />
        </div>
        <div>
          <h1 className="text-sm font-bold text-secondary-900 leading-tight">مخزن الأصدقاء</h1>
          <p className="text-xs text-secondary-500">Friends Warehouse</p>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {visibleItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              isActive ? 'sidebar-item-active flex' : 'sidebar-item-inactive flex'
            }
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            <span className="flex-1">{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User Info */}
      <div className="border-t border-secondary-100 p-4">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary-50 mb-2">
          <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm font-bold">
              {user?.name?.charAt(0) || 'م'}
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-secondary-900 truncate">{user?.name}</p>
            <p className="text-xs text-secondary-500">{user?.role ? ROLE_LABELS[user.role as keyof typeof ROLE_LABELS] : ''}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full sidebar-item-inactive flex text-danger-600 hover:bg-danger-50 hover:text-danger-700"
        >
          <LogOut className="w-5 h-5" />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-secondary-50 flex overflow-x-hidden w-full relative">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-l border-secondary-200 fixed h-full right-0 z-40 shadow-soft no-print">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed right-0 top-0 h-full w-72 bg-white border-l border-secondary-200 z-50 md:hidden transition-all duration-300 shadow-elevated no-print ${sidebarOpen ? 'translate-x-0' : 'translate-x-full invisible pointer-events-none'
          }`}
      >
        <div className="absolute top-4 left-4">
          <button
            onClick={() => setSidebarOpen(false)}
            className="btn-ghost btn-icon"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:mr-64 min-h-screen flex flex-col min-w-0">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-sm border-b border-secondary-200 px-4 md:px-6 py-3 flex items-center justify-between no-print">
          <button
            onClick={() => setSidebarOpen(true)}
            className="btn-ghost btn-icon md:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4 text-secondary-400 hidden md:block" />
          </div>

          <div className="flex items-center gap-3">
            <button className="btn-ghost btn-icon relative">
              <Bell className="w-5 h-5 text-secondary-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger-500 rounded-full" />
            </button>
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {user?.name?.charAt(0) || 'م'}
              </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
