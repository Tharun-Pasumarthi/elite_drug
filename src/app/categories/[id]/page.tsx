'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuickViewModal from '@/components/QuickViewModal';
import RecentlyViewed from '@/components/RecentlyViewed';
import ScrollToTop from '@/components/ScrollToTop';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Product } from '@/types';
import { motion } from 'framer-motion';
import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { 
  Activity, 
  Heart, 
  Sandwich, 
  Wine, 
  Bone, 
  Droplets, 
  Sparkles, 
  Wind, 
  Pill, 
  Flower2, 
  Dumbbell, 
  Brain, 
  Syringe 
} from 'lucide-react';

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

const categoryInfo: Record<string, { name: string; description: string; icon: React.ElementType; color: string }> = {
  'diabetes': {
    name: 'Diabetes Care',
    description: 'Comprehensive solutions for blood sugar management and diabetic care',
    icon: Activity,
    color: 'from-orange-400 to-red-400',
  },
  'heart-care': {
    name: 'Heart Care',
    description: 'Cardiovascular health and wellness products',
    icon: Heart,
    color: 'from-purple-400 to-pink-400',
  },
  'stomach-care': {
    name: 'Stomach & Digestive Care',
    description: 'Complete digestive health and gastro solutions',
    icon: Sandwich,
    color: 'from-green-400 to-teal-400',
  },
  'liver-care': {
    name: 'Liver Care',
    description: 'Liver health and detoxification support',
    icon: Wine,
    color: 'from-red-400 to-orange-400',
  },
  'bone-joint': {
    name: 'Bone, Joint & Muscle Care',
    description: 'Support for bone strength, joint mobility, and muscle health',
    icon: Bone,
    color: 'from-blue-400 to-cyan-400',
  },
  'kidney-care': {
    name: 'Kidney Care',
    description: 'Renal health and urinary wellness',
    icon: Droplets,
    color: 'from-cyan-400 to-blue-400',
  },
  'derma-care': {
    name: 'Derma Care',
    description: 'Skin health and dermatology solutions',
    icon: Sparkles,
    color: 'from-pink-400 to-rose-400',
  },
  'respiratory-care': {
    name: 'Respiratory Care',
    description: 'Breathing and lung health support',
    icon: Wind,
    color: 'from-teal-400 to-green-400',
  },
  'pain-management': {
    name: 'Pain Management',
    description: 'Effective pain relief and inflammation control',
    icon: Pill,
    color: 'from-orange-400 to-amber-400',
  },
  'womens-health': {
    name: "Women's Health",
    description: 'Prenatal care, anemia management, and hormonal support',
    icon: Flower2,
    color: 'from-pink-400 to-purple-400',
  },
  'vitamins-supplements': {
    name: 'Vitamins & Supplements',
    description: 'Complete nutritional support and wellness products',
    icon: Dumbbell,
    color: 'from-yellow-400 to-orange-400',
  },
  'neuropathy': {
    name: 'Neuropathy & Brain Health',
    description: 'Nerve health and neurological support',
    icon: Brain,
    color: 'from-indigo-400 to-purple-400',
  },
  'antibiotics': {
    name: 'Antibiotics',
    description: 'Bacterial infection treatment and management',
    icon: Syringe,
    color: 'from-red-400 to-pink-400',
  },
};

function ProductCard({ product, index, onQuickView }: { product: Product; index: number; onQuickView: (product: Product) => void }) {
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
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-3 border border-gray-100 dark:border-slate-700 cursor-pointer h-full group"
        >
          <div className="relative h-48 bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-900/20 dark:to-orange-800/20 overflow-hidden">
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
              className="object-cover"
            />
            {product.isPrescription && (
              <div className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-lg">
                Rx
              </div>
            )}
            
            {/* Quick View Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(product);
              }}
              className="absolute top-3 left-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm text-gray-900 dark:text-gray-100 px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg hover:bg-white dark:hover:bg-slate-800 transition-all opacity-0 group-hover:opacity-100"
            >
              Quick View
            </button>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {product.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
              {product.shortDescription}
            </p>
            <div className="flex items-center justify-between mb-4">
              {product.isPrescription && (
                <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-xs font-semibold">
                  Rx
                </span>
              )}
            </div>
            <button className="w-full bg-[#FF8C00] dark:bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-[#FF7C00] dark:hover:bg-orange-700 transition-colors">
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
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

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
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);
  
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
  }, [categoryFilters, searchQuery, products]);

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
      
      {/* Loading Overlay */}
      {loading && (
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
            <p className="text-white text-center mt-4 font-semibold text-lg">Loading Products...</p>
          </div>
        </div>
      )}
      
      {/* Breadcrumbs */}
      <div className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 py-4">
        <div className="container mx-auto px-6">
          <Breadcrumbs 
            items={[
              { label: 'Categories', href: '/#categories' },
              { label: category.name, href: `/categories/${categoryId}` }
            ]}
          />
        </div>
      </div>
      
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
            <div className="mb-6 flex justify-center">
              <category.icon className="w-24 h-24 text-white" strokeWidth={1.5} />
            </div>
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
      <section className="py-8 bg-gray-50 dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products by name or composition..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pl-14 rounded-full border-2 border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-[#FF8C00] dark:focus:border-orange-500 focus:outline-none text-lg"
              />
              <svg
                className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 dark:text-gray-500"
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
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
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
      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-6">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">No Products Found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
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
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  index={index} 
                  onQuickView={(p) => {
                    setQuickViewProduct(p);
                    setIsQuickViewOpen(true);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Back to Categories */}
      <section className="py-12 bg-gray-50 dark:bg-slate-900">
        <div className="container mx-auto px-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 rounded-full font-semibold hover:border-[#FF8C00] dark:hover:border-orange-500 hover:text-[#FF8C00] dark:hover:text-orange-400 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to All Categories</span>
          </Link>
        </div>
      </section>

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

      <Footer />
    </>
  );
}
