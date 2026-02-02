import { supabase } from '@/lib/supabase';
import { products } from '@/data/products';

export async function migrateProducts(clearFirst: boolean = false) {
  try {
    console.log('🚀 Starting product migration...');
    
    // Clear existing products if requested
    if (clearFirst) {
      console.log('🗑️ Clearing existing products...');
      const { error: deleteError } = await supabase
        .from('products')
        .delete()
        .neq('id', ''); // Delete all
      
      if (deleteError) {
        console.error('❌ Clear error:', deleteError);
      } else {
        console.log('✅ Existing products cleared');
      }
    }

    console.log(`📦 Found ${products.length} products to migrate`);

    // Convert camelCase to snake_case for PostgreSQL
    const productsForDb = products.map(product => ({
      id: product.id,
      slug: product.slug,
      name: product.name,
      short_description: product.shortDescription,
      price: product.price,
      mrp: product.mrp,
      category: product.category,
      is_prescription: product.isPrescription,
      composition: product.composition,
      manufacturer: product.manufacturer,
      consume_type: product.consumeType,
      expiry_date: product.expiryDate,
      features: product.features,
      images: product.images,
      details: product.details,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }));

    // Insert all products
    const { data, error } = await supabase
      .from('products')
      .insert(productsForDb)
      .select();

    if (error) {
      console.error('❌ Migration error:', error);
      throw error;
    }

    console.log(`✅ Successfully migrated ${data?.length || 0} products!`);
    return { success: true, count: data?.length || 0 };
  } catch (error) {
    console.error('❌ Migration failed:', error);
    return { success: false, error };
  }
}
