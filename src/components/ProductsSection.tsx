'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

function ProductCard({ product, index }: { product: Product; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <Image 
              src="/logo.png" 
              alt="Loading" 
              width={60} 
              height={60} 
              className="animate-spin"
              style={{ animationDuration: '2.5s' }}
            />
            <p className="text-white text-center mt-4 font-semibold">Loading...</p>
          </div>
        </div>
      )}
      
      <Link href={`/products/${product.slug}`} onClick={() => setIsLoading(true)}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-orange-500/30 transition-all duration-500 hover:-translate-y-4 border-2 border-transparent hover:border-orange-400 dark:hover:border-orange-500 cursor-pointer h-full group"
      >
              <div className="relative min-h-[240px] max-h-[280px] bg-gradient-to-br from-gray-50/50 to-white dark:from-slate-800/50 dark:to-slate-900/50 overflow-hidden">
                <div className="absolute inset-0 p-4 group-hover:scale-105 transition-transform duration-500">
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
                      className="object-contain drop-shadow-md group-hover:drop-shadow-2xl transition-all duration-500"
                    />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  {product.shortDescription}
                </p>
                
                {/* Price Display */}
                <div className="mb-4 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">MRP</p>
                    <p className="text-2xl font-black text-orange-600 dark:text-orange-400">₹{product.price}</p>
                <ul className="space-y-2 mb-4">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                      <span className="text-primary mt-1">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
    </Link>
    </>
  );
}

export default function ProductsSection() {
  const [showAll, setShowAll] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const displayedProducts = showAll ? products : products.slice(0, 6);

  return (
    <section id="products" className="py-24 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Products
          </h2>
          <p className="text-xl text-gray-600">
            Comprehensive medical solutions for modern healthcare
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* View More/Less Button */}
        {products.length > 6 && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all hover:shadow-lg inline-flex items-center gap-2"
            >
              {showAll ? (
                <>
                  View Less
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M18 15l-6-6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </>
              ) : (
                <>
                  View More Products
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
