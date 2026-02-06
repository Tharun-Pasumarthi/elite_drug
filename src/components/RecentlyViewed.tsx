'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '@/types';

export default function RecentlyViewed() {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadRecentlyViewed = async () => {
      try {
        // Get recently viewed product IDs from localStorage
        const viewedIds = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
        
        if (viewedIds.length === 0) {
          setLoading(false);
          return;
        }

        // Fetch products from API
        const response = await fetch('/api/products');
        if (response.ok) {
          const allProducts = await response.json();
          
          // Filter and sort by recently viewed order
          const viewed = viewedIds
            .map((id: string) => allProducts.find((p: Product) => p.id === id))
            .filter(Boolean)
            .slice(0, 5); // Show max 5 products
          
          setRecentProducts(viewed);
        }
      } catch (error) {
        console.error('Failed to load recently viewed:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRecentlyViewed();
  }, []);

  if (loading || recentProducts.length === 0) {
    return null;
  }

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 280;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-12 bg-gradient-to-b from-gray-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 text-[#FF8C00] dark:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
              Recently Viewed
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="relative">
          {/* Horizontal Scroll Container */}
          <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
            {recentProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex-shrink-0 w-64 snap-start"
              >
                <Link href={`/products/${product.slug}`}>
                  <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-slate-700 cursor-pointer h-full">
                    {/* Product Image */}
                    <div className="relative min-h-[180px] max-h-[200px] bg-transparent overflow-hidden">
                      <div className="absolute inset-0 p-2">
                        <div className="relative w-full h-full">
                          <Image
                            src={
                              ((product.images as any)?.main && typeof (product.images as any).main === 'string' && (product.images as any).main.trim() !== '') 
                                ? (product.images as any).main 
                                : ((product.images as any)?.gallery?.[0] && typeof (product.images as any).gallery[0] === 'string' && (product.images as any).gallery[0].trim() !== '')
                                  ? (product.images as any).gallery[0]
                                  : '/images/placeholder.svg'
                            }
                            alt={product.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                      {product.isPrescription && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-lg z-10">
                          Rx
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <div className="text-xs text-[#FF8C00] dark:text-orange-400 font-semibold mb-1">{product.category}</div>
                      <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">{product.name}</h3>
                      
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Custom Scrollbar Styles */}
        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </div>
    </section>
  );
}
