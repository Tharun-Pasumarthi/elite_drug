'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuickViewModal from '@/components/QuickViewModal';
import RecentlyViewed from '@/components/RecentlyViewed';
import ScrollToTop from '@/components/ScrollToTop';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Product } from '@/types';
import { useRouter } from 'next/navigation';

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const router = useRouter();

  // Fetch products from API
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
        setFetchLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.composition?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.shortDescription?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleProductClick = (slug: string) => {
    setLoadingProduct(slug);
    setIsLoading(true);
    setTimeout(() => {
      router.push(`/products/${slug}`);
    }, 300);
  };

  return (
    <>
      <Header />
      
      {/* Breadcrumbs */}
      <div className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 py-4">
        <div className="container mx-auto px-6">
          <Breadcrumbs 
            items={[
              { label: 'Products', href: '/products' }
            ]}
          />
        </div>
      </div>
      
      {/* Initial Fetch Loading */}
      {fetchLoading && (
        <div className="fixed inset-0 bg-white dark:bg-slate-950 z-[100] flex items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <Image 
              src="/logo.png" 
              alt="Loading" 
              width={60} 
              height={60} 
              className="animate-spin"
              style={{ animationDuration: '2.5s' }}
            />
            <p className="text-gray-900 dark:text-gray-100 text-center mt-4 font-semibold">Loading Products...</p>
          </div>
        </div>
      )}
      
      {/* Loading Overlay */}
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
            <p className="text-white dark:text-gray-100 text-center mt-4 font-semibold">Loading...</p>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-950 dark:to-slate-900 py-12">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              All <span className="text-[#FF8C00] dark:text-orange-400">Products</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Browse our complete collection of pharmaceutical products
            </p>
          </motion.div>

          {/* Filters */}
          <div className="mb-8 space-y-4">
            {/* Search */}
            <div className="max-w-2xl mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full px-6 py-3 border-2 border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 rounded-full focus:outline-none focus:border-[#FF8C00] dark:focus:border-orange-500 transition-colors placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-semibold transition-all ${
                    selectedCategory === category
                      ? 'bg-[#FF8C00] dark:bg-orange-600 text-white shadow-lg'
                      : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Products Count */}
          <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </p>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => handleProductClick(product.slug)}
                className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-gray-100 dark:border-slate-700 group"
              >
                {/* Product Image */}
                <div className="relative h-48 bg-gradient-to-br from-orange-100 to-orange-50 overflow-hidden">
                  <Image
                    src={(() => {
                      const images = product.images as any;
                      
                      // Try main image first
                      if (images?.main && typeof images.main === 'string' && images.main.trim() !== '') {
                        return images.main;
                      }
                      
                      // Try first gallery image
                      if (images?.gallery && Array.isArray(images.gallery) && images.gallery.length > 0) {
                        const firstGallery = images.gallery[0];
                        if (firstGallery && typeof firstGallery === 'string' && firstGallery.trim() !== '') {
                          return firstGallery;
                        }
                      }
                      
                      // Fallback to placeholder
                      return '/images/placeholder.svg';
                    })()}
                    alt={product.name}
                    fill
                    className="object-contain p-4"
                  />
                  {product.isPrescription && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-lg">
                      Rx
                    </div>
                  )}
                  
                  {/* Quick View Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setQuickViewProduct(product);
                      setIsQuickViewOpen(true);
                    }}
                    className="absolute top-3 left-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm text-gray-900 dark:text-gray-100 px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg hover:bg-white dark:hover:bg-slate-800 transition-all opacity-0 group-hover:opacity-100"
                  >
                    Quick View
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="text-sm text-[#FF8C00] dark:text-orange-400 font-semibold mb-1">{product.category}</div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{product.shortDescription}</p>
                  
                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">₹{product.price}</span>
                      {product.mrp !== product.price && (
                        <span className="text-sm text-gray-400 dark:text-gray-500 line-through ml-2">₹{product.mrp}</span>
                      )}
                    </div>
                  </div>

                  {/* View Details Button */}
                  <button className="mt-4 w-full bg-[#FF8C00] text-white py-2 rounded-full font-semibold hover:bg-[#FF7C00] transition-colors">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
{/* Recently Viewed */}
      <RecentlyViewed />

      {/* Quick View Modal */}
      <QuickViewModal 
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={() => {
          setIsQuickViewOpen(false);
          setQuickViewProduct(null);
        }}
      />

      {/* Scroll to Top */}
      <ScrollToTop />

      
          {/* No Results */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">No products found</h3>
              <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
