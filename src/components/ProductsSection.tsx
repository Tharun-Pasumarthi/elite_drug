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
        className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-3 border border-gray-100 cursor-pointer h-full"
      >
              <div className="relative min-h-[240px] max-h-[280px] bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 overflow-hidden border-b-2 border-orange-100 dark:border-orange-900/30">
                <div className="absolute inset-0 p-4">
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
                      className="object-contain drop-shadow-lg"
                    />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {product.shortDescription}
                </p>
                <ul className="space-y-2 mb-4">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-600">
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
