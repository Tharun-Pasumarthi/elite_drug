'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
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

interface Category {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  productCount: number;
}

const categories: Category[] = [
  {
    id: 'diabetes',
    name: 'Diabetes',
    description: 'Blood sugar management & diabetic care',
    icon: Activity,
    color: 'from-orange-400 to-red-400',
    productCount: 15,
  },
  {
    id: 'heart-care',
    name: 'Heart Care',
    description: 'Cardiovascular health & wellness',
    icon: Heart,
    color: 'from-purple-400 to-pink-400',
    productCount: 7,
  },
  {
    id: 'stomach-care',
    name: 'Stomach Care',
    description: 'Digestive health & gastro solutions',
    icon: Sandwich,
    color: 'from-green-400 to-teal-400',
    productCount: 13,
  },
  {
    id: 'liver-care',
    name: 'Liver Care',
    description: 'Liver health & detoxification',
    icon: Wine,
    color: 'from-red-400 to-orange-400',
    productCount: 0,
  },
  {
    id: 'bone-joint',
    name: 'Bone, Joint & Muscle Care',
    description: 'Bone strength & joint mobility',
    icon: Bone,
    color: 'from-blue-400 to-cyan-400',
    productCount: 5,
  },
  {
    id: 'kidney-care',
    name: 'Kidney Care',
    description: 'Renal health & urinary wellness',
    icon: Droplets,
    color: 'from-cyan-400 to-blue-400',
    productCount: 0,
  },
  {
    id: 'derma-care',
    name: 'Derma Care',
    description: 'Skin health & dermatology',
    icon: Sparkles,
    color: 'from-pink-400 to-rose-400',
    productCount: 0,
  },
  {
    id: 'respiratory-care',
    name: 'Respiratory Care',
    description: 'Breathing & lung health',
    icon: Wind,
    color: 'from-teal-400 to-green-400',
    productCount: 2,
  },
  {
    id: 'pain-management',
    name: 'Pain Management',
    description: 'Pain relief & inflammation control',
    icon: Pill,
    color: 'from-orange-400 to-amber-400',
    productCount: 7,
  },
  {
    id: 'womens-health',
    name: "Women's Health",
    description: 'Prenatal, anemia & hormonal care',
    icon: Flower2,
    color: 'from-pink-400 to-purple-400',
    productCount: 6,
  },
  {
    id: 'vitamins-supplements',
    name: 'Vitamins & Supplements',
    description: 'Nutritional support & wellness',
    icon: Dumbbell,
    color: 'from-yellow-400 to-orange-400',
    productCount: 9,
  },
  {
    id: 'neuropathy',
    name: 'Neuropathy & Brain Health',
    description: 'Nerve health & neurological support',
    icon: Brain,
    color: 'from-indigo-400 to-purple-400',
    productCount: 10,
  },
  {
    id: 'antibiotics',
    name: 'Antibiotics',
    description: 'Bacterial infection treatment',
    icon: Syringe,
    color: 'from-red-400 to-pink-400',
    productCount: 2,
  },
];

function CategoryCard({ category, index }: { category: Category; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      router.push(`/categories/${category.id}`);
    }, 300);
  };

  return (
    <>
      {/* Loading Overlay for this card */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center">
          <div className="relative">
            <Image 
              src="/logo.png" 
              alt="Loading" 
              width={80} 
              height={80} 
              className="animate-spin"
              style={{ animationDuration: '3s' }}
            />
            <p className="text-white dark:text-gray-100 text-center mt-4 font-semibold">Loading...</p>
          </div>
        </div>
      )}

      <div onClick={handleClick} className="cursor-pointer">
        <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        className="group relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-slate-700 cursor-pointer h-full"
      >
        {/* Gradient Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
        
        {/* Content */}
        <div className="relative p-6 flex flex-col items-center text-center h-full">
          {/* Icon */}
          <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
            <category.icon className="w-10 h-10 text-white" strokeWidth={1.5} />
          </div>
          
          {/* Category Name */}
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-[#FF8C00] dark:group-hover:text-orange-400 transition-colors">
            {category.name}
          </h3>
          
          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow">
            {category.description}
          </p>
          
          {/* Product Count Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-slate-700 rounded-full text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:bg-[#FF8C00] dark:group-hover:bg-orange-600 group-hover:text-white transition-colors">
            <span>{category.productCount}</span>
            <span>Products</span>
          </div>
        </div>

        {/* Arrow Icon */}
        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white dark:bg-slate-700 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <svg className="w-4 h-4 text-[#FF8C00] dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </motion.div>
    </div>
    </>
  );
}

export default function CategorySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="categories" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Browse by <span className="text-[#FF8C00] dark:text-orange-400">Category</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Find the right healthcare solution for your specific needs
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>

        {/* View All Products Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF8C00] text-white rounded-full font-semibold hover:bg-[#FF7C00] transition-all hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span>View All Products</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
