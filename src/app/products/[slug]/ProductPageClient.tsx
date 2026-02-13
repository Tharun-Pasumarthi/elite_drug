'use client';

import ProductSlideshow from '@/components/ProductSlideshow';
import ProductTabs from '@/components/ProductTabs';
import MoreProductsCarousel from '@/components/MoreProductsCarousel';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';
import ScrollToTop from '@/components/ScrollToTop';
import ThemeToggle from '@/components/ThemeToggle';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { useEffect } from 'react';
import { getAbsoluteProductUrl, getAbsoluteImageUrl } from '@/lib/urlUtils';

export default function ProductPageClient({ product }: { product: Product }) {
  // Track recently viewed products
  useEffect(() => {
    const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    const filtered = recentlyViewed.filter((id: string) => id !== product.id);
    const updated = [product.id, ...filtered].slice(0, 5);
    localStorage.setItem('recentlyViewed', JSON.stringify(updated));
  }, [product.id]);

  console.log('🔍 ProductPageClient received product:');
  console.log('  Name:', product.name);
  console.log('  Images:', product.images);
  console.log('  Images type:', typeof product.images);
  console.log('  Is Array:', Array.isArray(product.images));
  if (product.images) {
    console.log('  Images.main:', product.images.main);
    console.log('  Images.gallery:', product.images.gallery);
    if (Array.isArray(product.images.gallery)) {
      product.images.gallery.forEach((img, i) => {
        console.log(`    [${i}]:`, img);
      });
    }
  }
  
  return (
    <>
      {/* Sticky Product Header */}
      <div className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 shadow-md">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <Image 
                src="/logo.png" 
                alt="Elite Drug Logo" 
                width={40} 
                height={40} 
                className="h-8 w-8 sm:h-10 sm:w-10 object-contain"
                priority
              />
              <div className="flex flex-col">
                <span className="text-base sm:text-xl font-bold lowercase" style={{ color: '#FF8C00' }}>elite drug</span>
                <span className="text-[8px] text-black dark:text-white tracking-wide hidden sm:block">enhancing your health</span>
              </div>
            </Link>
            
            {/* Product Name */}
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 px-4 text-center flex-1">
              {product.name}
            </h1>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <Link 
                href="/" 
                className="flex-shrink-0 flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 text-white rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:from-orange-600 hover:to-orange-700 dark:hover:from-orange-700 dark:hover:to-orange-800 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="hidden sm:inline">Home</span>
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <motion.section 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 py-6 border-b border-gray-200 dark:border-slate-700"
      >
        <div className="container-custom">
          <Breadcrumbs 
            items={[
              { label: 'Products', href: '/products' },
              { label: product.category, href: `/products?category=${encodeURIComponent(product.category)}` },
              { label: product.name, href: `/products/${product.slug}` }
            ]}
          />
        </div>
      </motion.section>

      {/* Product Details */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-slate-950 dark:to-slate-900">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100 dark:border-slate-700 overflow-hidden relative"
          >
            {/* Decorative gradient blob */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-slate-700 dark:to-slate-800 rounded-full blur-3xl opacity-20 -z-0"></div>
            
            <div className="grid lg:grid-cols-5 gap-12 relative z-10">
              {/* Product Slideshow - 3 columns */}
              <div className="lg:col-span-3">
                <ProductSlideshow images={Array.isArray(product.images) ? product.images : (product.images?.gallery || [product.images?.main])} />
              </div>

              {/* Product Info - 2 columns with sticky behavior */}
              <div className="lg:col-span-2 lg:sticky lg:top-24 self-start">
                {product.isPrescription && (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 text-orange-700 dark:text-orange-400 px-5 py-2.5 rounded-full font-semibold mb-4 border border-orange-200 dark:border-orange-800 shadow-sm"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2"/>
                      <path d="M10 6v4M10 14h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    Prescription Required
                  </motion.div>
                )}
                
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 leading-tight"
                >
                  {product.name}
                </motion.h1>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-slate-700 dark:to-slate-800 rounded-2xl p-6 space-y-4 border border-gray-200 dark:border-slate-600 shadow-sm"
                >
                  {product.composition && (
                    <div>
                      <strong className="block text-gray-900 dark:text-gray-100 mb-1 flex items-center gap-2">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                          <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Composition:
                      </strong>
                      <p className="text-gray-600 dark:text-gray-300 ml-6 font-medium">{product.composition}</p>
                    </div>
                  )}
                  {product.manufacturer && (
                    <div>
                      <strong className="block text-gray-900 dark:text-gray-100 mb-1 flex items-center gap-2">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                          <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Manufacturer:
                      </strong>
                      <p className="text-gray-600 dark:text-gray-300 ml-6">{product.manufacturer}</p>
                    </div>
                  )}
                  {product.consumeType && (
                    <div>
                      <strong className="block text-gray-900 dark:text-gray-100 mb-1 flex items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M8 2v12M4 6h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        Consume Type:
                      </strong>
                      <p className="text-gray-600 dark:text-gray-300 ml-6">{product.consumeType}</p>
                    </div>
                  )}
                  {product.expiryDate && (
                    <div>
                      <strong className="block text-gray-900 dark:text-gray-100 mb-1 flex items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2"/>
                          <path d="M8 5v3l2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        Expires on or after:
                      </strong>
                      <p className="text-gray-600 dark:text-gray-300 ml-6">{product.expiryDate}</p>
                    </div>
                  )}
                </motion.div>

                {/* Price Display */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-6 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-2xl p-6 border-2 border-orange-200 dark:border-orange-800 shadow-lg"
                >
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">MRP</p>
                  <p className="text-4xl font-black text-orange-600 dark:text-orange-400">₹{product.price}</p>
                </motion.div>

                {/* Share Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="mt-8 pt-6 border-t border-gray-200 dark:border-slate-600"
                >
                  <ShareButtons 
                    url={getAbsoluteProductUrl(product.slug)}
                    title={product.name}
                    description={product.shortDescription}
                    imageUrl={getAbsoluteImageUrl((product.images as any)?.main)}
                  />
                </motion.div>

                {product.isPrescription && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-l-4 border-primary dark:border-blue-600 p-5 rounded-xl shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">⚕️</div>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        This medicine requires a valid prescription. Please consult your doctor before use.
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product Tabs */}
      <ProductTabs product={product} />

      {/* Glossary */}
      {product.details?.glossary && (
        <section className="py-16 bg-gray-50 dark:bg-slate-900">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
              Disease/Condition Glossary
            </h2>
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-slate-700">
              <h3 className="text-2xl font-bold text-primary dark:text-orange-400 mb-4">
                {product.details.glossary.title}
              </h3>
              <div className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {product.details.glossary.content}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* More Products Carousel */}
      <MoreProductsCarousel currentProductId={product.id} />

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </>
  );
}
