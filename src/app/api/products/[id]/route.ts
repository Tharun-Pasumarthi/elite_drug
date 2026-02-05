import { NextRequest, NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';

// GET - Fetch single product
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const params = await Promise.resolve(context.params);
    const { id } = params;

    const { data, error } = await supabaseAdmin
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    if (!data) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Normalize images format for backward compatibility
    if (data.images && Array.isArray(data.images)) {
      data.images = {
        main: data.images[0] || '/images/placeholder.png',
        gallery: data.images
      };
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

// PUT - Update product
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const productData = await request.json();
    const params = await Promise.resolve(context.params);
    const { id } = params;

    console.log('🔄 Updating product:', id);

    // Convert camelCase to snake_case for PostgreSQL
    const dbData: any = {
      updated_at: new Date().toISOString(),
    };

    // Map all fields with proper snake_case conversion
    if (productData.name !== undefined) dbData.name = productData.name;
    if (productData.slug !== undefined) dbData.slug = productData.slug;
    if (productData.short_description !== undefined) dbData.short_description = productData.short_description;
    if (productData.shortDescription !== undefined) dbData.short_description = productData.shortDescription;
    if (productData.about !== undefined) dbData.about = productData.about;
    if (productData.price !== undefined) dbData.price = productData.price;
    if (productData.mrp !== undefined) dbData.mrp = productData.mrp;
    if (productData.category !== undefined) dbData.category = productData.category;
    if (productData.is_prescription !== undefined) dbData.is_prescription = productData.is_prescription;
    if (productData.isPrescription !== undefined) dbData.is_prescription = productData.isPrescription;
    if (productData.composition !== undefined) dbData.composition = productData.composition;
    if (productData.manufacturer !== undefined) dbData.manufacturer = productData.manufacturer;
    if (productData.consume_type !== undefined) dbData.consume_type = productData.consume_type;
    if (productData.consumeType !== undefined) dbData.consume_type = productData.consumeType;
    if (productData.expiry_date !== undefined) dbData.expiry_date = productData.expiry_date;
    if (productData.expiryDate !== undefined) dbData.expiry_date = productData.expiryDate;
    if (productData.features !== undefined) dbData.features = productData.features;
    
    // Handle detail fields at root level
    if (productData.usage !== undefined) dbData.usage = productData.usage;
    if (productData.side_effects !== undefined) dbData.side_effects = productData.side_effects;
    if (productData.sideEffects !== undefined) dbData.side_effects = productData.sideEffects;
    if (productData.precautions !== undefined) dbData.precautions = productData.precautions;
    if (productData.benefits !== undefined) dbData.benefits = productData.benefits;
    if (productData.how_it_works !== undefined) dbData.how_it_works = productData.how_it_works;
    if (productData.howItWorks !== undefined) dbData.how_it_works = productData.howItWorks;
    
    // Handle images - convert array to proper format
    if (productData.images !== undefined) {
      console.log('📸 Received images for update:', productData.images);
      if (Array.isArray(productData.images) && productData.images.length > 0) {
        console.log('✅ Saving as array:', productData.images);
        dbData.images = productData.images;
      } else if (typeof productData.images === 'string') {
        try {
          dbData.images = JSON.parse(productData.images);
          console.log('✅ Parsed from string:', dbData.images);
        } catch (e) {
          console.error('❌ Failed to parse images string:', e);
        }
      } else if (productData.images && typeof productData.images === 'object') {
        console.log('✅ Saving as object:', productData.images);
        dbData.images = productData.images;
      } else {
        console.log('⚠️ Images is undefined or empty');
      }
    }
    
    console.log('💾 Database data:', JSON.stringify(dbData, null, 2));

    const { data, error } = await supabase
      .from('products')
      .update(dbData)
      .eq('id', id)
      .select();

    if (error) {
      console.error('❌ Supabase update error:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      return NextResponse.json({ 
        error: 'Failed to update product',
        details: error.message,
        hint: error.hint,
        code: error.code
      }, { status: 500 });
    }

    if (!data || data.length === 0) {
      console.error('❌ No product found with ID:', id);
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    console.log('✅ Product updated successfully:', id);
    return NextResponse.json(data[0]);
  } catch (error: any) {
    console.error('❌ Error updating product:', error);
    console.error('❌ Error details:', error?.message || error);
    return NextResponse.json({ 
      error: 'Failed to update product',
      details: error?.message || 'Unknown error'
    }, { status: 500 });
  }
}

// DELETE - Delete product
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const params = await Promise.resolve(context.params);
    const { id } = params;

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
