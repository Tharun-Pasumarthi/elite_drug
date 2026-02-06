'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';

const slides = [
  {
    id: 1,
    title: 'Elite Drug Pharmacy',
    subtitle: 'Your Trusted Healthcare Partner',
    description: 'Quality Medicines & Professional Care - Serving Your Health Needs Since 2016',
    buttonText: 'Browse Products',
    buttonLink: '/products',
    gradient: 'from-blue-950 via-blue-800 to-slate-900',
    image: '/images/hero/slide1.jpg',
  },
  {
    id: 2,
    title: 'Expert Medical Consultation',
    subtitle: 'Professional Healthcare Guidance',
    description: 'Get personalized medical advice from certified pharmacists and healthcare professionals',
    buttonText: 'Learn More',
    buttonLink: '/products',
    gradient: 'from-emerald-950 via-teal-800 to-slate-900',
    image: '/images/hero/slide2.jpg',
  },
  {
    id: 3,
    title: 'Modern Pharmacy Solutions',
    subtitle: 'Advanced Healthcare Technology',
    description: 'FDA-certified medicines with fast delivery and complete safety assurance',
    buttonText: 'View Catalog',
    buttonLink: '/products',
    gradient: 'from-purple-950 via-indigo-800 to-slate-900',
    image: '/images/hero/slide3.jpg',
  },
];

const stats = [
  { label: 'Products', value: '100+' },
  { label: 'Partners', value: '50+' },
  { label: 'Years Experience', value: '10+' },
];

export default function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    if (isPaused) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section 
      className="relative h-[700px] overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-300"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
    >
      {/* Mobile Pause/Play Button */}
      <button
        onClick={() => setIsPaused(!isPaused)}
        className="md:hidden absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/70 transition-all duration-200"
        aria-label={isPaused ? 'Play slideshow' : 'Pause slideshow'}
      >
        {isPaused ? (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
          </svg>
        )}
      </button>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {/* Background Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-r ${slides[currentSlide].gradient} opacity-95`} />
          
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }} />
          </div>

          <div className="container-custom h-full flex items-center relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center w-full">
              {/* Left Content */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-gray-900 dark:text-white"
              >
                {/* Badge */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/20 backdrop-blur-md border border-orange-400/30 mb-6"
                >
                  <span className="text-2xl">✨</span>
                  <span className="text-sm font-semibold text-orange-300">Trusted by 10,000+ Consumers</span>
                </motion.div>

                <motion.h1 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-6xl md:text-7xl font-black mb-3 leading-tight bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent"
                >
                  {slides[currentSlide].title}
                </motion.h1>
                
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-2xl font-semibold mb-4 text-orange-300"
                >
                  {slides[currentSlide].subtitle}
                </motion.p>
                
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-lg mb-8 text-white dark:text-white"
                >
                  {slides[currentSlide].description}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex flex-wrap gap-4"
                >
                  <Link href={slides[currentSlide].buttonLink}>
                    <motion.button 
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-bold text-lg shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all"
                    >
                      {slides[currentSlide].buttonText}
                    </motion.button>
                  </Link>
                  <Link href="/#contact">
                    <motion.button 
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-8 py-4 rounded-xl font-bold text-lg transition-all bg-gray-100 dark:bg-white/10 backdrop-blur-md border-2 border-gray-300 dark:border-white/30 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20"
                    >
                      Contact Us
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>
              
              {/* Right Content - Image Display */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="hidden md:flex justify-center items-center"
              >
                <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src={slides[currentSlide].image}
                    alt={slides[currentSlide].title}
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Glowing border effect */}
                  <div className="absolute inset-0 rounded-3xl ring-2 ring-orange-500/30 ring-offset-4 ring-offset-transparent" />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Compact Stats Bar - Left Side */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-20 left-6 z-20"
      >
        <div className="flex items-center gap-4 px-6 py-3 rounded-full backdrop-blur-xl shadow-2xl border bg-white/80 dark:bg-white/5 border-gray-200 dark:border-white/10">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              className="flex items-center gap-2 px-4 py-1"
            >
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-black bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
                  {stat.value}
                </span>
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  {stat.label}
                </span>
              </div>
              {index < stats.length - 1 && (
                <div className="w-px h-6 ml-4 bg-gray-300 dark:bg-white/20" />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentSlide(index)}
            whileHover={{ scale: 1.2 }}
            className={`transition-all ${
              currentSlide === index
                ? 'w-12 h-3 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full shadow-lg shadow-orange-500/50'
                : 'w-3 h-3 bg-gray-400 dark:bg-white/30 rounded-full hover:bg-gray-500 dark:hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
