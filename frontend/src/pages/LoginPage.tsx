import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Store, Lock, Mail, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { useAuthStore } from '../store/authStore';
import { useToast } from '../components/ui/Toast';

const loginSchema = z.object({
  email: z.string().email('بريد إلكتروني غير صالح'),
  password: z.string().min(1, 'كلمة المرور مطلوبة'),
});

type LoginForm = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const toast = useToast();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await api.post('/auth/login', data);
      if (res.data.success) {
        login(res.data.user, res.data.token);
        toast.success('تم تسجيل الدخول بنجاح');
        navigate('/dashboard');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'بيانات الدخول غير صحيحة');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-950 via-primary-900 to-secondary-900 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative">
        {/* Logo Card */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-elevated mb-5">
            <img src="/logo.png" alt="Logo" className="w-20 h-20 object-contain" />
          </div>
          <h1 className="text-3xl font-black text-white mb-2">مخزن الأصدقاء</h1>
          <p className="text-primary-300 text-sm">إدارة الأكسسوارات والأدوات الطبية</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-elevated">
          <h2 className="text-xl font-bold text-white mb-6 text-center">تسجيل الدخول</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div className="form-group">
              <label className="form-label text-primary-200">البريد الإلكتروني</label>
              <div className="relative">
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-primary-300">
                  <Mail className="w-4.5 h-4.5" />
                </div>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="example@company.com"
                  className="form-input pr-10 bg-white/10 border-white/20 text-white placeholder-primary-400 focus:border-primary-400 focus:ring-primary-400/30"
                  dir="ltr"
                />
              </div>
              {errors.email && <p className="form-error text-red-300">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div className="form-group">
              <label className="form-label text-primary-200">كلمة المرور</label>
              <div className="relative">
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-primary-300">
                  <Lock className="w-4.5 h-4.5" />
                </div>
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="form-input pr-10 pl-10 bg-white/10 border-white/20 text-white placeholder-primary-400 focus:border-primary-400 focus:ring-primary-400/30"
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary-300 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
              {errors.password && <p className="form-error text-red-300">{errors.password.message}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg hover:shadow-xl active:scale-95 py-3 text-base font-bold rounded-2xl"
            >
              {isSubmitting ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> جاري الدخول...</>
              ) : (
                'دخول للنظام'
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-primary-400 text-xs mt-6">
          مخزن الأصدقاء للأدوات الطبية | جميع الحقوق محفوظة
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
