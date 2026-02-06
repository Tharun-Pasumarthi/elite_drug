'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

const milestones = [
  {
    year: '2016',
    title: '🏪 Founded 2016',
    description: 'Started with a vision to provide quality pharmaceuticals',
    icon: 'M12 2L2 7l10 5 10-5-10-5z',
  },
  {
    year: '2024',
    title: '📈 Growing Today',
    description: 'Expanding product range across 13+ therapeutic categories',
    icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
  },
  {
    year: '2025',
    title: '⚡ Future Vision',
    description: 'Leading India\'s pharmaceutical innovation & healthcare accessibility',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
  },
];

const founderStory = `Founded in 2016, Elite Drug was established on a strong ideology rooted in Integrity, Quality, and Kindness. The journey reflects the transformation of a common man into a successful role model, driven by Ethical Leadership, Clear Vision, and Unwavering Discipline. The founder believed that meaningful success is built through Values-Based Decision Making, Long-Term Thinking, and Respect for People, creating a foundation of Trust and Professional Excellence.

Strategically, the focus remained on Quality-First Practices, Relationship-Driven Growth, and Consistent Execution. Through Responsible Innovation, People-Centric Leadership, and Transparent Business Practices, Elite Drug evolved into a Dynamic and Respected Pharmaceutical Enterprise. Over nearly a decade, this principled approach elevated the founder from a common man to a Successful Business Leader and Inspirational Role Model, positioning Elite Drug as a brand defined by Purpose, Credibility, and Sustainable Success.`;

export default function AboutSection() {
  const [showStoryModal, setShowStoryModal] = useState(false);
  
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-slate-950 dark:to-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4"
          >
            About Elite Drug Pharma
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300"
          >
            A decade of excellence in pharmaceutical care
          </motion.p>
        </div>

        {/* Founder Image and Timeline Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-start mb-24">
          {/* Left: Founder Image (Clickable) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <button
              onClick={() => setShowStoryModal(true)}
              className="relative group w-full cursor-pointer"
            >
              {/* Hover Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-400 via-amber-400 to-orange-400 dark:from-orange-500 dark:via-amber-500 dark:to-orange-500 rounded-3xl opacity-0 group-hover:opacity-40 transition-all duration-500 blur-2xl group-hover:blur-3xl"></div>
              
              {/* Image container */}
              <div className="relative bg-white dark:bg-slate-800 rounded-3xl p-3 shadow-2xl group-hover:shadow-orange-500/30 group-hover:shadow-[0_20px_70px_-10px] transition-all duration-500 transform group-hover:scale-105">
                <div className="relative h-[500px] rounded-2xl overflow-hidden">
                  <Image
                    src="/images/founder.jpg"
                    alt="Founder of Elite Drug Pharma"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    priority
                  />
                  {/* Gradient overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  
                  {/* Click to Read Story Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                      <div className="bg-white dark:bg-slate-800 px-6 py-3 rounded-xl shadow-2xl border-2 border-orange-500">
                        <p className="text-orange-600 dark:text-orange-400 font-bold text-lg">Click to Read Our Story</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Founder Info Badge */}
                <div className="absolute bottom-8 right-8 bg-gradient-to-br from-orange-500 to-amber-500 text-white px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-transform duration-300">
                  <p className="text-2xl font-bold mb-1">Ranjit Jayajii</p>
                  <p className="text-sm opacity-90">Founder & CEO</p>
                </div>
              </div>

              {/* Founder Title Below Image */}
              <div className="mt-6 text-center">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">
                  Founder of Elite Drug Pharma
                </h3>
                <p className="text-gray-600 dark:text-gray-400 italic">
                  "Committed to making quality healthcare accessible to all"
                </p>
              </div>
            </button>
          </motion.div>

          {/* Right: Timeline Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="mb-8">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Our Journey
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                From humble beginnings to pharmaceutical excellence
              </p>
            </div>

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-slate-700 hover:border-orange-300 dark:hover:border-orange-600">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-14 h-14 bg-gradient-to-br from-primary to-blue-700 dark:from-orange-500 dark:to-orange-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                          <path d={milestone.icon} stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <h3 className="text-2xl font-black text-primary dark:text-orange-400">{milestone.year}</h3>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{milestone.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{milestone.description}</p>
                  </div>
</motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Story Modal */}
      <AnimatePresence>
        {showStoryModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowStoryModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowStoryModal(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-full flex items-center justify-center transition-colors z-10"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>

              {/* Modal Header */}
              <div className="bg-gradient-to-br from-orange-500 to-amber-500 p-8 rounded-t-3xl">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  📖 Our Story
                </h2>
                <p className="text-white/90 text-lg">The Journey of Elite Drug Pharma</p>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify whitespace-pre-line">
                    {founderStory}
                  </p>
                </div>

                {/* Decorative Quote */}
                <div className="mt-8 border-l-4 border-orange-500 pl-6 py-4 bg-orange-50 dark:bg-slate-700/50 rounded-r-xl">
                  <p className="text-gray-800 dark:text-gray-200 italic font-medium">
                    "From a common man to a successful business leader - a journey built on integrity, quality, and kindness."
                  </p>
                  <p className="text-orange-600 dark:text-orange-400 text-sm mt-2 font-semibold">
                    — Ranjit Jayajii, Founder & CEO
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
