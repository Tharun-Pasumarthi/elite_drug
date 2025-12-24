'use client';

import ProductSlideshow from '@/components/ProductSlideshow';
import ProductTabs from '@/components/ProductTabs';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';

export default function ProductPageClient({ product }: { product: Product }) {
  return (
    <>
      {/* Sticky Product Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-md">
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
                <span className="text-[8px] text-gray-600 tracking-wide hidden sm:block">enhancing your health</span>
              </div>
            </Link>
            
            {/* Product Name */}
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 px-4 text-center flex-1">
              {product.name}
            </h1>
            
            {/* Home Button */}
            <Link 
              href="/" 
              className="flex-shrink-0 flex items-center gap-2 px-3 sm:px-4 py-2 text-white rounded-lg transition-colors font-semibold text-sm sm:text-base" 
              style={{ backgroundColor: '#FF8C00' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E67E00'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FF8C00'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="hidden sm:inline">Home</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <motion.section 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-gray-50 to-blue-50 py-6 border-b border-gray-200"
      >
        <div className="container-custom">
          <div className="flex gap-2 text-sm text-gray-600 items-center">
            <a href="/" className="text-primary hover:underline hover:text-primary-dark transition-colors">Home</a>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
            <a href="/#products" className="text-primary hover:underline hover:text-primary-dark transition-colors">Products</a>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
            <span className="text-gray-900 font-semibold">{product.name}</span>
          </div>
        </div>
      </motion.section>

      {/* Product Details */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100 overflow-hidden relative"
          >
            {/* Decorative gradient blob */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-20 -z-0"></div>
            
            <div className="grid lg:grid-cols-5 gap-12 relative z-10">
              {/* Product Slideshow - 3 columns */}
              <div className="lg:col-span-3">
                <ProductSlideshow images={product.images.gallery} />
              </div>

              {/* Product Info - 2 columns with sticky behavior */}
              <div className="lg:col-span-2 lg:sticky lg:top-24 self-start">
                {product.isPrescription && (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-50 to-red-50 text-orange-700 px-5 py-2.5 rounded-full font-semibold mb-4 border border-orange-200 shadow-sm"
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
                  className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight"
                >
                  {product.name}
                </motion.h1>
                
                {product.price > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mb-8"
                  >
                    <div className="flex items-baseline gap-2 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 px-6 py-4 rounded-lg shadow-sm">
                      <span className="text-sm font-semibold text-gray-600">MRP:</span>
                      <span className="text-3xl font-bold text-green-700">₹{product.price.toFixed(2)}</span>
                    </div>
                  </motion.div>
                )}

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 space-y-4 border border-gray-200 shadow-sm"
                >
                  {product.composition && (
                    <div>
                      <strong className="block text-gray-900 mb-1 flex items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        Composition:
                      </strong>
                      <p className="text-gray-600 ml-6 font-medium">{product.composition}</p>
                    </div>
                  )}
                  {product.manufacturer && (
                    <div>
                      <strong className="block text-gray-900 mb-1 flex items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <rect x="2" y="4" width="12" height="10" rx="2" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        Manufacturer:
                      </strong>
                      <p className="text-gray-600 ml-6">{product.manufacturer}</p>
                    </div>
                  )}
                  {product.consumeType && (
                    <div>
                      <strong className="block text-gray-900 mb-1 flex items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M8 2v12M4 6h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        Consume Type:
                      </strong>
                      <p className="text-gray-600 ml-6">{product.consumeType}</p>
                    </div>
                  )}
                  {product.expiryDate && (
                    <div>
                      <strong className="block text-gray-900 mb-1 flex items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2"/>
                          <path d="M8 5v3l2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        Expires on or after:
                      </strong>
                      <p className="text-gray-600 ml-6">{product.expiryDate}</p>
                    </div>
                  )}
                </motion.div>

                {product.isPrescription && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-primary p-5 rounded-xl shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">⚕️</div>
                      <p className="text-gray-700 leading-relaxed">
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
      {product.details.glossary && (
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Disease/Condition Glossary
            </h2>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-primary mb-4">
                {product.details.glossary.title}
              </h3>
              <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                {product.details.glossary.content}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
