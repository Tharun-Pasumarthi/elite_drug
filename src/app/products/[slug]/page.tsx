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

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return <ProductPageClient product={product} />;
}
