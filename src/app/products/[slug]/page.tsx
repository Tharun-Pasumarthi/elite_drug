import { notFound } from 'next/navigation';
import ProductPageClient from './ProductPageClient';
import type { Metadata } from 'next';
import { createAdminClient } from '@/lib/supabase/server';
import { getOriginalSlug } from '@/lib/urlEncryption';

// Disable static generation - fetch fresh data on each request
export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getProduct(slug: string) {
  try {
    // Decode slug if URL encryption is enabled
    const originalSlug = getOriginalSlug(slug);
    console.log('🔍 Fetching product with slug:', originalSlug, '(from:', slug, ')');
    
    const supabase = await createAdminClient();
    
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', originalSlug)
      .single();
    
    if (error) {
      console.error('❌ Supabase error:', error);
      return null;
    }
    
    if (!data) {
      console.log('❌ No product found for slug:', originalSlug);
      return null;
    }
    
    console.log('✅ Found product:', data.name);
    
    // Normalize images format
    const normalizeImages = (images: any) => {
      if (!images) {
        return {
          main: '/images/placeholder.svg',
          gallery: []
        };
      }
      
      if (typeof images === 'object' && images.main && !Array.isArray(images.main)) {
        return {
          main: images.main,
          gallery: Array.isArray(images.gallery) ? images.gallery : []
        };
      }
      
      if (Array.isArray(images)) {
        return {
          main: images[0] || '/images/placeholder.svg',
          gallery: images
        };
      }
      
      return {
        main: '/images/placeholder.svg',
        gallery: []
      };
    };
    
    return {
      ...data,
      images: normalizeImages(data.images)
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: 'Product Not Found | Elite Drug',
    };
  }

  const productImage = (product.images as any)?.main || (product.images as any)?.gallery?.[0] || '/logo.png';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://elite-drug.vercel.app';
  
  // Ensure image URL is absolute for proper embedding
  const absoluteImageUrl = productImage.startsWith('http') 
    ? productImage 
    : `${baseUrl}${productImage.startsWith('/') ? '' : '/'}${productImage}`;

  return {
    title: `${product.name} | Elite Drug`,
    description: product.shortDescription || product.description,
    openGraph: {
      title: product.name,
      description: product.shortDescription || product.description,
      images: [{
        url: absoluteImageUrl,
        width: 1200,
        height: 630,
        alt: product.name,
      }],
      type: 'website',
      url: `${baseUrl}/products/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.shortDescription || product.description,
      images: [absoluteImageUrl],
    },
  };
}

export default async function ProductPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return <ProductPageClient product={product} />;
}
