'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface ProductSlideshowProps {
  images: string[];
}

export default function ProductSlideshow({ images }: ProductSlideshowProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [magnifierPos, setMagnifierPos] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isPaused, setIsPaused] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  
  // Filter out empty images
  const validImages = images.filter(img => img && typeof img === 'string' && img.trim() !== '');
  
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

  // Auto-slide every 3 seconds
  useEffect(() => {
    if (validImages.length <= 1 || isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % validImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [validImages.length, isPaused]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Cursor position relative to image (percentage)
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    setCursorPos({ x: xPercent, y: yPercent });

    // Determine magnifier position based on cursor location
    const magnifierWidth = 400;
    const magnifierHeight = 400;
    const gap = 20;

    let magnifierX = rect.right + gap; // Default: right side
    let magnifierY = rect.top;

    // If cursor is on right half, show magnifier on left
    if (x > rect.width / 2) {
      magnifierX = rect.left - magnifierWidth - gap;
    }

    // Keep magnifier vertically centered with cursor
    magnifierY = e.clientY - magnifierHeight / 2;

    // Boundary checks
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // If magnifier goes off-screen on the right, move to left
    if (magnifierX + magnifierWidth > viewportWidth) {
      magnifierX = rect.left - magnifierWidth - gap;
    }

    // If magnifier goes off-screen on the left, move to right
    if (magnifierX < 0) {
      magnifierX = rect.right + gap;
    }

    // Vertical boundary checks
    if (magnifierY < 0) {
      magnifierY = 0;
    } else if (magnifierY + magnifierHeight > viewportHeight) {
      magnifierY = viewportHeight - magnifierHeight;
    }

    setMagnifierPos({ x: magnifierX, y: magnifierY });
  };

  return (
    <div className="space-y-4">
      {/* Main Image with Professional Magnifier */}
      <div 
        ref={imageRef}
        className="relative h-[500px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden shadow-xl border border-gray-200 cursor-crosshair"
        onMouseEnter={() => {
          setShowMagnifier(true);
          setIsPaused(true);
        }}
        onMouseLeave={() => {
          setShowMagnifier(false);
          setIsPaused(false);
        }}
        onMouseMove={handleMouseMove}
        onTouchStart={() => setIsPaused(true)}
      >
        {/* Mobile Pause/Play Button */}
        {validImages.length > 1 && (
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="md:hidden absolute top-4 right-4 z-20 bg-gradient-to-r from-orange-500 to-orange-600 text-white p-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
            aria-label={isPaused ? 'Play slideshow' : 'Pause slideshow'}
          >
            {isPaused ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
              </svg>
            )}
          </button>
        )}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
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

        {/* Hover hint */}
        {!showMagnifier && (
          <div className="absolute bottom-6 right-6 bg-black/70 backdrop-blur-sm text-white text-xs px-4 py-2 rounded-full flex items-center gap-2 pointer-events-none shadow-lg">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Hover to zoom
          </div>
        )}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110 active:scale-95 z-10"
          aria-label="Previous slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110 active:scale-95 z-10"
          aria-label="Next slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Slide Counter */}
        {validImages.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white text-xs px-4 py-2 rounded-full shadow-lg">
            {currentSlide + 1} / {validImages.length}
          </div>
        )}
      </div>

      {/* Professional Magnifier Box */}
      <AnimatePresence>
        {showMagnifier && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed w-[400px] h-[400px] rounded-2xl overflow-hidden shadow-2xl border-4 border-orange-500 pointer-events-none z-50 bg-white"
            style={{
              left: `${magnifierPos.x}px`,
              top: `${magnifierPos.y}px`,
            }}
          >
            {/* Magnified Image */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${validImages[currentSlide]})`,
                backgroundSize: '250%',
                backgroundPosition: `${cursorPos.x}% ${cursorPos.y}%`,
                backgroundRepeat: 'no-repeat',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Thumbnails */}
      <div className="flex gap-3 justify-center flex-wrap">
        {validImages.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`relative w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${
              currentSlide === index 
                ? 'border-orange-500 ring-2 ring-orange-400/50 scale-105 shadow-lg' 
                : 'border-gray-300 opacity-60 hover:opacity-100 hover:scale-105'
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
