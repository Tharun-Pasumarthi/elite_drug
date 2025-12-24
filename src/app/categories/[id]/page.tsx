'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { products } from '@/data/products';
import { Product } from '@/types';
import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import Image from 'next/image';

// Category mapping
const categoryMapping: Record<string, string[]> = {
  'diabetes': ['Diabetes Care'],
  'heart-care': ['Cardiovascular'],
  'stomach-care': ['Gastro & Digestive', 'Digestive Health', 'Injectable Gastro'],
  'liver-care': ['Liver Care'],
  'bone-joint': ['Bone & Joint Health'],
  'kidney-care': ['Kidney Care'],
  'derma-care': ['Derma Care'],
  'respiratory-care': ['Respiratory Care'],
  'pain-management': ['Pain Management', 'Pain & Inflammation', 'Neuropathic Pain'],
  'womens-health': ["Women's Health", 'Anemia Care', 'Prenatal & Anemia Care', 'Hormonal'],
  'vitamins-supplements': ['Vitamin Supplements', 'Nutritional Supplements', 'Nutritional Support', 'Antioxidant & Brain Health'],
  'neuropathy': ['Neuropathic Pain', 'Diabetic Neuropathy', 'Injectable Vitamins', 'Antioxidant & Brain Health'],
  'antibiotics': ['Antibiotics'],
};

const categoryInfo: Record<string, { name: string; description: string; icon: string; color: string }> = {
  'diabetes': {
    name: 'Diabetes Care',
    description: 'Comprehensive solutions for blood sugar management and diabetic care',
    icon: '🩸',
    color: 'from-orange-400 to-red-400',
  },
  'heart-care': {
    name: 'Heart Care',
    description: 'Cardiovascular health and wellness products',
    icon: '❤️',
    color: 'from-purple-400 to-pink-400',
  },
  'stomach-care': {
    name: 'Stomach & Digestive Care',
    description: 'Complete digestive health and gastro solutions',
    icon: '🫃',
    color: 'from-green-400 to-teal-400',
  },
  'liver-care': {
    name: 'Liver Care',
    description: 'Liver health and detoxification support',
    icon: '🫀',
    color: 'from-red-400 to-orange-400',
  },
  'bone-joint': {
    name: 'Bone, Joint & Muscle Care',
    description: 'Support for bone strength, joint mobility, and muscle health',
    icon: '🦴',
    color: 'from-blue-400 to-cyan-400',
  },
  'kidney-care': {
    name: 'Kidney Care',
    description: 'Renal health and urinary wellness',
    icon: '🫘',
    color: 'from-cyan-400 to-blue-400',
  },
  'derma-care': {
    name: 'Derma Care',
    description: 'Skin health and dermatology solutions',
    icon: '✨',
    color: 'from-pink-400 to-rose-400',
  },
  'respiratory-care': {
    name: 'Respiratory Care',
    description: 'Breathing and lung health support',
    icon: '🫁',
    color: 'from-teal-400 to-green-400',
  },
  'pain-management': {
    name: 'Pain Management',
    description: 'Effective pain relief and inflammation control',
    icon: '💊',
    color: 'from-orange-400 to-amber-400',
  },
  'womens-health': {
    name: "Women's Health",
    description: 'Prenatal care, anemia management, and hormonal support',
    icon: '🌸',
    color: 'from-pink-400 to-purple-400',
  },
  'vitamins-supplements': {
    name: 'Vitamins & Supplements',
    description: 'Complete nutritional support and wellness products',
    icon: '💪',
    color: 'from-yellow-400 to-orange-400',
  },
  'neuropathy': {
    name: 'Neuropathy & Brain Health',
    description: 'Nerve health and neurological support',
    icon: '🧠',
    color: 'from-indigo-400 to-purple-400',
  },
  'antibiotics': {
    name: 'Antibiotics',
    description: 'Bacterial infection treatment and management',
    icon: '💉',
    color: 'from-red-400 to-pink-400',
  },
};

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center">
          <div className="relative">
            <Image 
              src="/logo.png" 
              alt="Loading" 
              width={80} 
              height={80} 
              className="animate-spin"
              style={{ animationDuration: '5s' }}
            />
            <p className="text-white text-center mt-4 font-semibold">Loading...</p>
          </div>
        </div>
      )}
      
      <Link href={`/products/${product.slug}`} onClick={() => setIsLoading(true)}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-3 border border-gray-100 cursor-pointer h-full"
        >
          <div className="h-48 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
            <svg width="100" height="100" viewBox="0 0 120 120" fill="none">
              <circle cx="60" cy="60" r="30" stroke="#fff" strokeWidth="3" opacity="0.8"/>
              <path d="M60 40v40M40 60h40" stroke="#fff" strokeWidth="4" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {product.name}
            </h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {product.shortDescription}
            </p>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-2xl font-bold text-[#FF8C00]">₹{product.price}</p>
                {product.mrp > product.price && (
                  <p className="text-sm text-gray-400 line-through">₹{product.mrp}</p>
                )}
              </div>
              {product.isPrescription && (
                <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-semibold">
                  Rx
                </span>
              )}
            </div>
            <button className="w-full bg-[#FF8C00] text-white py-3 rounded-lg font-semibold hover:bg-[#FF7C00] transition-colors">
              View Details
            </button>
          </div>
        </motion.div>
      </Link>
    </>
  );
}

export default function CategoryPage() {
  const params = useParams();
  const categoryId = params?.id as string;
  const [searchQuery, setSearchQuery] = useState('');
  
  const category = categoryInfo[categoryId];
  const categoryFilters = categoryMapping[categoryId] || [];

  // Filter products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => 
      categoryFilters.includes(product.category)
    );

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.composition && product.composition.toLowerCase().includes(searchQuery.toLowerCase())) ||
        product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [categoryFilters, searchQuery]);

  if (!category) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Category Not Found</h1>
            <Link href="/" className="text-[#FF8C00] hover:underline">
              Return to Home
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      
      {/* Category Header */}
      <section className={`relative py-20 bg-gradient-to-br ${category.color} overflow-hidden`}>
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <div className="text-6xl mb-4">{category.icon}</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{category.name}</h1>
            <p className="text-xl max-w-2xl mx-auto opacity-90">{category.description}</p>
            <div className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full">
              <span className="font-semibold">{filteredProducts.length}</span>
              <span>Products Available</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products by name or composition..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pl-14 rounded-full border-2 border-gray-200 focus:border-[#FF8C00] focus:outline-none text-lg"
              />
              <svg
                className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Products Found</h3>
              <p className="text-gray-600 mb-6">
                {searchQuery ? 'Try adjusting your search terms' : 'Products coming soon to this category'}
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-6 py-3 bg-[#FF8C00] text-white rounded-full font-semibold hover:bg-[#FF7C00] transition-colors"
                >
                  Clear Search
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Back to Categories */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-full font-semibold hover:border-[#FF8C00] hover:text-[#FF8C00] transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to All Categories</span>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
