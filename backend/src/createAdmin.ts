import { supabase } from './lib/supabase';
import bcrypt from 'bcryptjs';

async function main() {
  console.log('⏳ Starting admin user creation...');
  try {
    // 1. Ensure main branch exists
    let { data: branch, error: branchErr } = await supabase
      .from('branches')
      .select('id')
      .limit(1)
      .single();

    if (branchErr || !branch) {
      console.log('ℹ️ No branch found. Creating default branch...');
      const { data: newBranch, error: createBranchErr } = await supabase
        .from('branches')
        .insert({ name: 'الفرع الرئيسي', address: '' })
        .select('id')
        .single();

      if (createBranchErr) {
        console.error('❌ Error creating default branch:', createBranchErr);
        return;
      }
      branch = newBranch;
    }

    console.log('✅ Branch ID:', branch?.id);

    // 2. Check if users already exist
    const { data: users, error: usersErr } = await supabase
      .from('users')
      .select('id')
      .limit(1);

    if (usersErr) {
      console.error('❌ Error checking users:', usersErr);
      return;
    }

    if (users && users.length > 0) {
      console.log('✅ Users already exist in the database.');
      return;
    }

    // 3. Create default Super Admin user
    const email = 'admin@example.com';
    const password = 'admin123';
    const passwordHash = await bcrypt.hash(password, 12);

    const { data: user, error: userErr } = await supabase
      .from('users')
      .insert({
        name: 'المدير العام',
        email: email,
        password_hash: passwordHash,
        role: 'super_admin',
        branch_id: branch?.id,
        is_active: true
      })
      .select('id, email')
      .single();

    if (userErr) {
      console.error('❌ Error creating admin user:', userErr);
      return;
    }

    console.log('\n🎉 Default admin user created successfully!');
    console.log('-------------------------------------------');
    console.log(`Email:    ${email}`);
    console.log(`Password: ${password}`);
    console.log('-------------------------------------------');
  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

main();
