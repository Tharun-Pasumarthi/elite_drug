import { notFound } from 'next/navigation';
import ProductPageClient from './ProductPageClient';
import type { Metadata } from 'next';

// Disable static generation - fetch fresh data on each request
export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getProduct(slug: string) {
  try {
    // Use relative URL for server-side fetching in production
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001';
    
    const res = await fetch(`${baseUrl}/api/products`, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache',
      },
    });
    
    if (!res.ok) {
      console.error('Failed to fetch products:', res.status);
      return null;
    }
    
    const products = await res.json();
    const product = products.find((p: any) => p.slug === slug);
    
    console.log('🔍 Found product for slug:', slug, product ? 'YES' : 'NO');
    if (product) {
      console.log('📦 Product images:', product.images);
    }
    
    return product;
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
  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001';

  return {
    title: `${product.name} | Elite Drug`,
    description: product.shortDescription || product.description,
    openGraph: {
      title: product.name,
      description: product.shortDescription || product.description,
      images: [{
        url: productImage,
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
      images: [productImage],
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
