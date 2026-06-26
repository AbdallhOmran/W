import { supabase } from './lib/supabase';

async function check() {
  try {
    const { count: catCount, error: catError } = await supabase
      .from('categories')
      .select('*', { count: 'exact', head: true });
    
    const { count: prodCount, error: prodError } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });

    if (catError) console.error('❌ Categories Error:', catError);
    else console.log('📂 Categories count in DB:', catCount);

    if (prodError) console.error('❌ Products Error:', prodError);
    else console.log('📦 Products count in DB:', prodCount);

    // Let's print the first 5 products to see if they match the seeded ones
    const { data: sampleProducts, error: sampleError } = await supabase
      .from('products')
      .select('name, base_price, public_price')
      .limit(5);
    
    if (sampleError) console.error('❌ Sample Products Error:', sampleError);
    else {
      console.log('📝 Sample Products in DB:');
      console.table(sampleProducts);
    }
  } catch (err) {
    console.error(err);
  }
}

check();
