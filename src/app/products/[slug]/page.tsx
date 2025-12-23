import { notFound } from 'next/navigation';
import { getProductBySlug, getAllProductSlugs } from '@/data/products';
import ProductPageClient from './ProductPageClient';

// Generate static params for all products
export async function generateStaticParams() {
  const slugs = getAllProductSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export default async function ProductPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductPageClient product={product} />;
}
