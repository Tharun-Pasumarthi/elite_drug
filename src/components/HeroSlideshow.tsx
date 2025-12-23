'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const slides = [
  {
    id: 1,
    title: 'Advanced Medical Solutions',
    description: 'Revolutionizing healthcare with cutting-edge medical technology and innovative products',
    buttonText: 'Explore Products',
    gradient: 'from-blue-600 to-blue-800',
    image: '/images/hero/slide1.jpg',
  },
  {
    id: 2,
    title: 'Precision Diagnostics',
    description: 'State-of-the-art diagnostic equipment for accurate and reliable results',
    buttonText: 'Learn More',
    gradient: 'from-teal-600 to-teal-800',
    image: '/images/hero/slide2.jpg',
  },
  {
    id: 3,
    title: 'Patient Care Excellence',
    description: 'Comprehensive medical solutions designed for superior patient outcomes',
    buttonText: 'View Solutions',
    gradient: 'from-blue-700 to-blue-900',
    image: '/images/hero/slide3.jpg',
  },
];

export default function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[600px] bg-primary overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className={`absolute inset-0 bg-gradient-to-r ${slides[currentSlide].gradient}`}
        >
          <div className="container-custom h-full flex items-center">
            <div className="grid md:grid-cols-2 gap-16 items-center w-full">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-white"
              >
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  {slides[currentSlide].title}
                </h1>
                <p className="text-xl mb-8 opacity-95">
                  {slides[currentSlide].description}
                </p>
                <button className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:-translate-y-1 transition-all shadow-lg hover:shadow-xl">
                  {slides[currentSlide].buttonText}
                </button>
              </motion.div>
              
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="hidden md:flex justify-center items-center"
              >
                <div className="relative w-96 h-96 rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src={slides[currentSlide].image}
                    alt={slides[currentSlide].title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all ${
              currentSlide === index
                ? 'w-10 h-3 bg-white rounded-full'
                : 'w-3 h-3 bg-white/40 rounded-full hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
