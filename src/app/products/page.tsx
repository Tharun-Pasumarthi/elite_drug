'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { products } from '@/data/products';
import { useRouter } from 'next/navigation';

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState<string | null>(null);
  const router = useRouter();

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.composition?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleProductClick = (slug: string) => {
    setLoadingProduct(slug);
    setIsLoading(true);
    setTimeout(() => {
      router.push(`/products/${slug}`);
    }, 500);
  };

  return (
    <>
      <Header />
      
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center">
          <div className="relative">
            <Image 
              src="/logo.png" 
              alt="Loading" 
              width={80} 
              height={80} 
              className="animate-spin"
              style={{ animationDuration: '1s' }}
            />
            <p className="text-white text-center mt-4 font-semibold">Loading...</p>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              All <span className="text-[#FF8C00]">Products</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
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
                className="w-full px-6 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:border-[#FF8C00] transition-colors"
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
                      ? 'bg-[#FF8C00] text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Products Count */}
          <p className="text-center text-gray-600 mb-6">
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
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-gray-100"
              >
                {/* Product Image */}
                <div className="relative h-48 bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center">
                  <div className="w-32 h-32 bg-white rounded-full shadow-lg flex items-center justify-center">
                    <span className="text-4xl font-bold text-[#FF8C00]">{product.name.charAt(0)}</span>
                  </div>
                  {product.isPrescription && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                      Rx
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="text-sm text-[#FF8C00] font-semibold mb-1">{product.category}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.shortDescription}</p>
                  
                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
                      {product.mrp !== product.price && (
                        <span className="text-sm text-gray-400 line-through ml-2">₹{product.mrp}</span>
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

          {/* No Results */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
