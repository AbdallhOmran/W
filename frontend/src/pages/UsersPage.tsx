import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Shield, User, Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import api from '../lib/api';
import { Modal, ConfirmDialog } from '../components/ui/Modal';
import { useToast } from '../components/ui/Toast';
import { formatDate, ROLE_LABELS } from '../utils';
import type { User as UserType } from '../types';
import { useAuthStore } from '../store/authStore';

const userSchema = z.object({
  name: z.string().min(2, 'الاسم مطلوب'),
  email: z.string().email('بريد إلكتروني غير صالح'),
  password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل').optional().or(z.literal('')),
  role: z.enum(['super_admin', 'admin', 'sales', 'warehouse', 'accountant']),
  is_active: z.boolean(),
});
type UserForm = z.infer<typeof userSchema>;

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState<UserType | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const { user: currentUser } = useAuthStore();

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<UserForm>({
    resolver: zodResolver(userSchema),
    defaultValues: { role: 'sales', is_active: true },
  });

  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/users');
      if (res.data.success) setUsers(res.data.data);
    } finally { setLoading(false); }
  };

  useEffect(() => { loadUsers(); }, []);

  useEffect(() => {
    if (editUser) {
      reset({ name: editUser.name, email: editUser.email, role: editUser.role, is_active: editUser.is_active, password: '' });
    } else {
      reset({ role: 'sales', is_active: true, password: '' });
    }
  }, [editUser, reset]);

  const onSubmit = async (data: UserForm) => {
    try {
      const payload = { ...data };
      if (!payload.password) delete payload.password;

      if (editUser) {
        await api.put(`/users/${editUser.id}`, payload);
        toast.success('تم تحديث بيانات المستخدم');
      } else {
        if (!data.password) { toast.error('كلمة المرور مطلوبة للمستخدم الجديد'); return; }
        await api.post('/users', payload);
        toast.success('تم إضافة المستخدم بنجاح');
      }
      setShowForm(false); setEditUser(null); loadUsers();
    } catch (err: any) { toast.error(err.response?.data?.message || 'حدث خطأ'); }
  };

  const ROLE_COLORS: Record<string, string> = {
    super_admin: 'badge-danger',
    admin: 'badge-primary',
    sales: 'badge-success',
    warehouse: 'badge-warning',
    accountant: 'badge-secondary',
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">إدارة المستخدمين والصلاحيات</h1>
          <p className="page-subtitle">{users.length} مستخدم مسجل</p>
        </div>
        <button onClick={() => { setEditUser(null); setShowForm(true); }} className="btn-primary">
          <Plus className="w-4 h-4" />إضافة مستخدم
        </button>
      </div>

      {/* Permission Guide */}
      <div className="card border-primary-100 bg-primary-50">
        <h3 className="font-bold text-primary-800 mb-3 flex items-center gap-2">
          <Shield className="w-4 h-4" />جدول الصلاحيات
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-primary-200">
                <th className="p-2 text-right font-bold text-primary-800">الصلاحية</th>
                {Object.entries(ROLE_LABELS).map(([role, label]) => (
                  <th key={role} className="p-2 text-center font-bold text-primary-800">{label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { label: 'لوحة التحكم', perms: [true, true, true, true, true] },
                { label: 'المنتجات', perms: [true, true, false, true, false] },
                { label: 'المخازن', perms: [true, true, false, true, false] },
                { label: 'الفواتير', perms: [true, true, true, false, false] },
                { label: 'المشتريات', perms: [true, true, false, true, false] },
                { label: 'العملاء', perms: [true, true, true, false, true] },
                { label: 'الموردون', perms: [true, true, false, false, true] },
                { label: 'الخزنة', perms: [true, true, false, false, true] },
                { label: 'التقارير', perms: [true, true, false, false, true] },
                { label: 'إدارة المستخدمين', perms: [true, false, false, false, false] },
              ].map((row, idx) => (
                <tr key={idx} className="border-b border-primary-100">
                  <td className="p-2 font-medium text-primary-900">{row.label}</td>
                  {row.perms.map((has, i) => (
                    <td key={i} className="p-2 text-center">{has ? '✅' : '—'}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Users List */}
      <div className="card p-0 overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-16"><div className="w-10 h-10 spinner" /></div>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>المستخدم</th>
                  <th>البريد الإلكتروني</th>
                  <th>الدور</th>
                  <th>تاريخ الإنشاء</th>
                  <th>الحالة</th>
                  <th>إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id}>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs font-bold">{u.name.charAt(0)}</span>
                        </div>
                        <span className="font-semibold">{u.name}</span>
                        {u.id === currentUser?.id && <span className="badge-primary">أنت</span>}
                      </div>
                    </td>
                    <td className="text-secondary-500 ltr-number">{u.email}</td>
                    <td><span className={`badge ${ROLE_COLORS[u.role]}`}>{ROLE_LABELS[u.role]}</span></td>
                    <td className="text-xs text-secondary-400">{formatDate(u.created_at)}</td>
                    <td><span className={`badge ${u.is_active ? 'badge-success' : 'badge-secondary'}`}>{u.is_active ? 'نشط' : 'معطل'}</span></td>
                    <td>
                      <button onClick={() => { setEditUser(u); setShowForm(true); }} className="btn-ghost btn-icon btn-sm text-primary-600">
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <Modal isOpen={showForm} onClose={() => { setShowForm(false); setEditUser(null); }}
        title={editUser ? 'تعديل مستخدم' : 'إضافة مستخدم جديد'}
        footer={
          <>
            <button onClick={() => { setShowForm(false); setEditUser(null); }} className="btn-secondary">إلغاء</button>
            <button form="user-form" type="submit" disabled={isSubmitting} className="btn-primary">
              {isSubmitting ? <div className="w-4 h-4 spinner" /> : (editUser ? 'حفظ' : 'إضافة')}
            </button>
          </>
        }
      >
        <form id="user-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="form-group">
            <label className="form-label">الاسم الكامل *</label>
            <input {...register('name')} className="form-input" placeholder="اسم المستخدم" />
            {errors.name && <p className="form-error">{errors.name.message}</p>}
          </div>
          <div className="form-group">
            <label className="form-label">البريد الإلكتروني *</label>
            <input {...register('email')} type="email" className="form-input" placeholder="user@company.com" dir="ltr" />
            {errors.email && <p className="form-error">{errors.email.message}</p>}
          </div>
          <div className="form-group">
            <label className="form-label">{editUser ? 'كلمة مرور جديدة (اتركها فارغة للإبقاء على الحالية)' : 'كلمة المرور *'}</label>
            <div className="relative">
              <input {...register('password')} type={showPassword ? 'text' : 'password'} className="form-input pl-10" placeholder={editUser ? '••••••' : 'كلمة المرور'} dir="ltr" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && <p className="form-error">{errors.password.message}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">الدور *</label>
              <select {...register('role')} className="form-select">
                {Object.entries(ROLE_LABELS).map(([role, label]) => (
                  <option key={role} value={role}>{label}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">الحالة</label>
              <select {...register('is_active', { setValueAs: v => v === 'true' })} className="form-select">
                <option value="true">نشط</option>
                <option value="false">معطل</option>
              </select>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default UsersPage;
