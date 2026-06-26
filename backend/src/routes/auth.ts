import { Router, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { supabase } from '../lib/supabase';

export const authRouter = Router();

const loginSchema = z.object({
  email: z.string().email('بريد إلكتروني غير صالح'),
  password: z.string().min(1, 'كلمة المرور مطلوبة'),
});

// POST /api/auth/login
authRouter.post('/login', async (req, res: Response): Promise<void> => {
  try {
    const body = loginSchema.parse(req.body);

    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', body.email)
      .eq('is_active', true)
      .single();

    if (error || !user) {
      res.status(401).json({ success: false, message: 'بيانات الدخول غير صحيحة' });
      return;
    }

    const passwordMatch = await bcrypt.compare(body.password, user.password_hash);
    if (!passwordMatch) {
      res.status(401).json({ success: false, message: 'بيانات الدخول غير صحيحة' });
      return;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, branch_id: user.branch_id, name: user.name },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        branch_id: user.branch_id,
      },
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ success: false, message: err.errors[0].message });
      return;
    }
    res.status(500).json({ success: false, message: 'حدث خطأ في الخادم' });
  }
});

// POST /api/auth/setup - إنشاء أول مستخدم Super Admin (مرة واحدة فقط)
authRouter.post('/setup', async (req, res: Response): Promise<void> => {
  try {
    const { data: existingUsers } = await supabase.from('users').select('id').limit(1);
    if (existingUsers && existingUsers.length > 0) {
      res.status(400).json({ success: false, message: 'النظام مُعدّ مسبقاً' });
      return;
    }

    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({ success: false, message: 'جميع الحقول مطلوبة' });
      return;
    }

    const { data: branch } = await supabase.from('branches').select('id').limit(1).single();
    const passwordHash = await bcrypt.hash(password, 12);

    const { data: user, error } = await supabase.from('users').insert({
      name,
      email,
      password_hash: passwordHash,
      role: 'super_admin',
      branch_id: branch?.id,
    }).select().single();

    if (error) throw error;

    res.json({ success: true, message: 'تم إنشاء حساب المدير بنجاح', userId: user.id });
  } catch {
    res.status(500).json({ success: false, message: 'حدث خطأ في الخادم' });
  }
});
