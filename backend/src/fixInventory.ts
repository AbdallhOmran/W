import { supabase } from './lib/supabase';

async function fix() {
  console.log('⏳ Starting inventory fix...');
  try {
    // 1. Fetch all products
    const { data: products, error: prodErr } = await supabase
      .from('products')
      .select('id, name');

    if (prodErr) {
      console.error('❌ Error fetching products:', prodErr);
      return;
    }

    console.log(`📦 Found ${products?.length} products in DB.`);

    // 2. Fetch all branches
    const { data: branches, error: branchErr } = await supabase
      .from('branches')
      .select('id, name');

    if (branchErr) {
      console.error('❌ Error fetching branches:', branchErr);
      return;
    }

    console.log(`🏢 Found ${branches?.length} branches in DB.`);

    if (!products || products.length === 0 || !branches || branches.length === 0) {
      console.log('⚠️ No products or branches found. Exiting.');
      return;
    }

    // 3. Insert inventory records
    console.log('⏳ Creating missing inventory links (quantity = 0)...');
    
    let insertCount = 0;
    for (const prod of products) {
      for (const branch of branches) {
        const { error: insErr } = await supabase
          .from('inventory')
          .insert({
            product_id: prod.id,
            branch_id: branch.id,
            quantity: 0
          });
        
        // If it fails with duplicate key constraint, it means the record already exists, which is fine
        if (!insErr) {
          insertCount++;
        }
      }
    }

    console.log(`🎉 Inventory fix complete. Created ${insertCount} new inventory links!`);
  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

fix();
