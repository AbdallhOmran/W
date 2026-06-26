import { supabase } from './lib/supabase';

async function updateBranch() {
  console.log('⏳ Updating branch name in database...');
  try {
    const { data, error } = await supabase
      .from('branches')
      .update({ name: 'مخزن الأصدقاء' })
      .eq('name', 'الفرع الرئيسي');

    if (error) {
      console.error('❌ Error updating branch name:', error);
      return;
    }

    console.log('🎉 Branch name successfully updated to "مخزن الأصدقاء"!');
  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

updateBranch();
