'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/types';
import Link from 'next/link';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!product) return null;

  const images = (product.images as any)?.gallery || [(product.images as any)?.main] || [];
  const validImages = images.filter((img: string) => img && typeof img === 'string' && img.trim() !== '');

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
            onClick={onClose}
          >
            <div
              className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="grid md:grid-cols-2 gap-8 p-8">
                {/* Left: Images */}
                <div className="space-y-4">
                  {/* Main Image */}
                  <div className="relative aspect-square bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl overflow-hidden">
                    <Image
                      src={validImages[selectedImageIndex] || '/images/placeholder.svg'}
                      alt={product.name}
                      fill
                      className="object-contain p-6"
                    />
                    {product.isPrescription && (
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                        Prescription Required
                      </div>
                    )}
                  </div>

                  {/* Thumbnail Gallery */}
                  {validImages.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {validImages.map((img: string, idx: number) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedImageIndex(idx)}
                          className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                            selectedImageIndex === idx
                              ? 'border-[#FF8C00] scale-105'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="relative w-full h-full p-0.5">
                            <Image
                              src={img}
                              alt={`${product.name} ${idx + 1}`}
                              fill
                              className="object-contain"
                            />
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right: Product Details */}
                <div className="space-y-6">
                  {/* Category */}
                  <div className="text-sm text-[#FF8C00] font-semibold">{product.category}</div>

                  {/* Product Name */}
                  <h2 className="text-3xl font-bold text-gray-900">{product.name}</h2>

                  {/* Short Description */}
                  <p className="text-gray-600 leading-relaxed">{product.shortDescription}</p>

                  {/* Key Info */}
                  <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-gray-200">
                    {product.composition && (
                      <div>
                        <p className="text-sm text-gray-500">Composition</p>
                        <p className="font-semibold text-gray-900 text-sm">{product.composition}</p>
                      </div>
                    )}
                    {product.manufacturer && (
                      <div>
                        <p className="text-sm text-gray-500">Manufacturer</p>
                        <p className="font-semibold text-gray-900 text-sm">{product.manufacturer}</p>
                      </div>
                    )}
                    {product.consumeType && (
                      <div>
                        <p className="text-sm text-gray-500">Form</p>
                        <p className="font-semibold text-gray-900 text-sm">{product.consumeType}</p>
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  {product.features && product.features.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
                      <ul className="space-y-2">
                        {product.features.slice(0, 4).map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                            <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Link
                      href={`/products/${product.slug}`}
                      className="flex-1 bg-gradient-to-r from-[#FF8C00] to-[#FF7C00] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all text-center"
                    >
                      View Full Details
                    </Link>
                    <button className="px-6 border-2 border-gray-200 rounded-xl hover:border-[#FF8C00] hover:text-[#FF8C00] transition-colors font-semibold">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
