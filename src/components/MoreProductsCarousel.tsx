'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '@/types';
import { motion } from 'framer-motion';

interface MoreProductsCarouselProps {
  currentProductId: string;
}

export default function MoreProductsCarousel({ currentProductId }: MoreProductsCarouselProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const handleSectionClick = (e: React.MouseEvent) => {
    // Only toggle pause if clicking on the section background, not on products or buttons
    const target = e.target as HTMLElement;
    if (!target.closest('a') && !target.closest('button')) {
      setIsAutoPlaying(!isAutoPlaying);
    }
  };

  useEffect(() => {
    // Fetch random products
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const allProducts = await response.json();
        
        // Filter out current product and get random 10 products
        const filteredProducts = allProducts.filter((p: Product) => p.id !== currentProductId);
        const shuffled = filteredProducts.sort(() => 0.5 - Math.random());
        const randomProducts = shuffled.slice(0, 10);
        
        setProducts(randomProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [currentProductId]);

  // Auto-sliding effect
  useEffect(() => {
    if (!isAutoPlaying || products.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.max(1, products.length - 4));
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, products.length]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, products.length - 4)) % Math.max(1, products.length - 4));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, products.length - 4));
  };

  if (products.length === 0) return null;

  // Get 5 products to display based on current index
  const visibleProducts = [
    products[currentIndex],
    products[(currentIndex + 1) % products.length],
    products[(currentIndex + 2) % products.length],
    products[(currentIndex + 3) % products.length],
    products[(currentIndex + 4) % products.length],
  ];

  return (
    <section 
      className="py-20 bg-gradient-to-br from-orange-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      onClick={handleSectionClick}
    >
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              More <span className="text-[#FF8C00] dark:text-orange-400">Products</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300">Explore our wide range of pharmaceutical solutions</p>
          </div>
          
          {/* Navigation Arrows */}
          <div className="flex gap-3">
            <button
              onClick={handlePrevious}
              className="p-3 rounded-xl bg-gradient-to-br from-[#FF8C00] to-[#E67E00] text-white hover:shadow-lg hover:scale-110 transition-all duration-300"
              aria-label="Previous products"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-xl bg-gradient-to-br from-[#FF8C00] to-[#E67E00] text-white hover:shadow-lg hover:scale-110 transition-all duration-300"
              aria-label="Next products"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {visibleProducts.map((product, index) => (
            <motion.div
              key={`${product.id}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link
                href={`/products/${product.slug}`}
                className="block group bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-slate-700 hover:border-[#FF8C00] dark:hover:border-orange-500 hover:-translate-y-2 transform"
              >
                {/* Product Image */}
                <div className="relative h-40 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-700 dark:to-slate-600 overflow-hidden">
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
                    className="object-contain p-3 group-hover:scale-110 transition-transform duration-300"
                  />
                  {product.isPrescription && (
                    <div className="absolute top-2 right-2 bg-gradient-to-br from-red-500 to-red-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow">
                      Rx
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-3">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-1 group-hover:text-[#FF8C00] dark:group-hover:text-orange-400 transition-colors line-clamp-2 min-h-[2.5rem]">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-1">
                    {product.shortDescription}
                  </p>
                  
                  {/* Category Badge */}
                  {product.category && (
                    <span className="inline-block px-2 py-1 bg-gradient-to-r from-orange-100 to-purple-100 dark:from-orange-900/30 dark:to-purple-900/30 text-gray-800 dark:text-gray-300 text-[10px] font-semibold rounded-full">
                      {product.category}
                    </span>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
