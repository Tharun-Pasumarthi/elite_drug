import { NextRequest, NextResponse } from 'next/server';
import { createServerClient, createAdminClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

// GET - Fetch all products
export async function GET() {
  try {
    console.log('📡 Fetching products from Supabase...');
    
    const supabase = await createAdminClient();
    
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ Supabase error:', error);
      throw error;
    }

    // Normalize images format for backward compatibility
    const normalizedData = (data || []).map(product => {
      // Helper function to flatten and clean image arrays
      const flattenImages = (data: any): string[] => {
        if (!data) return [];
        if (typeof data === 'string' && data.trim() !== '') return [data];
        if (Array.isArray(data)) {
          return data.flatMap(item => flattenImages(item)).filter(img => img && typeof img === 'string' && img.trim() !== '');
        }
        return [];
      };

      if (!product.images) {
        return {
          ...product,
          images: {
            main: '/images/placeholder.svg',
            gallery: []
          }
        };
      }

      const images = product.images as any;

      // Case 1: Already normalized object with main and gallery
      if (images.main && !Array.isArray(images.main) && typeof images.main === 'string') {
        return {
          ...product,
          images: {
            main: images.main.trim() || '/images/placeholder.svg',
            gallery: flattenImages(images.gallery)
          }
        };
      }

      // Case 2: Object with nested arrays in main and gallery (malformed)
      if (images.main && Array.isArray(images.main)) {
        const flatMain = flattenImages(images.main);
        const flatGallery = flattenImages(images.gallery);
        const allImages = [...new Set([...flatMain, ...flatGallery])]; // Remove duplicates
        
        return {
          ...product,
          images: {
            main: allImages[0] || '/images/placeholder.svg',
            gallery: allImages
          }
        };
      }

      // Case 3: Simple array of images
      if (Array.isArray(images)) {
        const flatImages = flattenImages(images);
        return {
          ...product,
          images: {
            main: flatImages[0] || '/images/placeholder.svg',
            gallery: flatImages
          }
        };
      }

      // Case 4: Object with only gallery array
      if (images.gallery) {
        const flatGallery = flattenImages(images.gallery);
        return {
          ...product,
          images: {
            main: flatGallery[0] || '/images/placeholder.svg',
            gallery: flatGallery
          }
        };
      }

      // Fallback
      return {
        ...product,
        images: {
          main: '/images/placeholder.svg',
          gallery: []
        }
      };
    });

    console.log('✅ Fetched products:', normalizedData.length);
    return NextResponse.json(normalizedData);
  } catch (error) {
    console.error('❌ Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

// POST - Create new product
export async function POST(request: NextRequest) {
  try {
    const supabase = await createAdminClient();
    const productData = await request.json();
    
    // Generate base slug from name
    let baseSlug = productData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Check if slug exists and make it unique if necessary
    let slug = baseSlug;
    let counter = 1;
    let slugExists = true;

    while (slugExists) {
      const { data: existing } = await supabase
        .from('products')
        .select('id')
        .eq('slug', slug)
        .single();

      if (!existing) {
        slugExists = false;
      } else {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
    }

    console.log('📝 Generated unique slug:', slug);

    // Convert camelCase to snake_case for PostgreSQL
    const dbData: any = {
      id: crypto.randomUUID(), // Generate unique ID
      slug: slug,
      name: productData.name,
      short_description: productData.shortDescription || productData.short_description || '',
      about: productData.about || '',
      price: productData.price,
      mrp: productData.mrp,
      category: productData.category,
      is_prescription: productData.isPrescription || productData.is_prescription || false,
      composition: productData.composition,
      manufacturer: productData.manufacturer || '',
      consume_type: productData.consumeType || productData.consume_type || 'Tablet',
      expiry_date: productData.expiryDate || productData.expiry_date || null,
      features: productData.features || [],
      usage: productData.usage || '',
      side_effects: productData.sideEffects || productData.side_effects || '',
      precautions: productData.precautions || '',
      benefits: productData.benefits || '',
      how_it_works: productData.howItWorks || productData.how_it_works || '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Only add images if they exist and are valid
    if (productData.images && Array.isArray(productData.images) && productData.images.length > 0) {
      console.log('📸 Saving images array:', productData.images);
      dbData.images = productData.images;
    } else if (productData.images && typeof productData.images === 'object') {
      // Handle old object format if needed
      console.log('📸 Saving images object:', productData.images);
      dbData.images = productData.images;
    } else {
      console.log('⚠️ No valid images provided');
    }

    console.log('💾 About to insert into DB:', JSON.stringify(dbData, null, 2));

    const { data, error } = await supabase
      .from('products')
      .insert([dbData])
      .select()
      .single();

    if (error) {
      console.error('❌ Supabase Create Error:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      return NextResponse.json(
        { 
          error: 'Failed to create product',
          details: error.message,
          hint: error.hint
        },
        { status: 500 }
      );
    }

    // Revalidate pages that show products
    revalidatePath('/');
    revalidatePath('/products');
    revalidatePath(`/products/${slug}`);

    console.log('✅ Product created:', data.id);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('❌ Error creating product:', {
      message: error.message,
      stack: error.stack
    });
    return NextResponse.json(
      { 
        error: 'Failed to create product',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
