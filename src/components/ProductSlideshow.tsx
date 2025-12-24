'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface ProductSlideshowProps {
  images: string[];
}

export default function ProductSlideshow({ images }: ProductSlideshowProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  
  // Filter out empty images
  const validImages = images.filter(img => img && img.trim() !== '');
  
  // If no valid images, show placeholder
  if (validImages.length === 0) {
    return (
      <div className="relative h-[500px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden shadow-xl border border-gray-200 flex items-center justify-center">
        <div className="text-center">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="mx-auto mb-4">
            <circle cx="60" cy="60" r="30" stroke="#0066CC" strokeWidth="3" opacity="0.3"/>
            <path d="M60 40v40M40 60h40" stroke="#0066CC" strokeWidth="4" strokeLinecap="round"/>
          </svg>
          <p className="text-gray-400 font-medium">No product images available</p>
        </div>
      </div>
    );
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % validImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + validImages.length) % validImages.length);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div 
        className="relative h-[500px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden shadow-xl border border-gray-200 cursor-zoom-in"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              scale: isZoomed ? 1.3 : 1 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: isZoomed ? 0.3 : 0.5 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Image
              src={validImages[currentSlide]}
              alt={`Product image ${currentSlide + 1}`}
              fill
              className="object-contain p-8"
              priority={currentSlide === 0}
            />
          </motion.div>
        </AnimatePresence>

        {/* Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all"
          aria-label="Previous slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all"
          aria-label="Next slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 justify-center flex-wrap">
        {validImages.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`relative w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${
              currentSlide === index ? 'border-primary ring-2 ring-primary' : 'border-gray-300 opacity-60 hover:opacity-100'
            }`}
          >
            <Image
              src={image}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
