'use client';

import { motion } from 'framer-motion';
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
  const [isFlipped, setIsFlipped] = useState(false);
  
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
          {/* Left: Founder Flip Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div 
              className="relative w-full h-[600px] perspective-[1000px] cursor-pointer"
              onMouseEnter={() => setIsFlipped(true)}
              onMouseLeave={() => setIsFlipped(false)}
            >
              <motion.div
                className="relative w-full h-full transition-transform duration-700 transform-style-3d"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Front of Card - Founder Image */}
                <div 
                  className="absolute inset-0 backface-hidden"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  {/* Glow Effect */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-orange-400 via-amber-400 to-orange-400 dark:from-orange-500 dark:via-amber-500 dark:to-orange-500 rounded-3xl opacity-20 group-hover:opacity-40 blur-2xl transition-opacity duration-500"></div>
                  
                  {/* Image container */}
                  <div className="relative bg-white dark:bg-slate-800 rounded-3xl p-3 shadow-2xl hover:shadow-orange-500/30 hover:shadow-[0_20px_70px_-10px] transition-all duration-500 h-full">
                    <div className="relative h-[500px] rounded-2xl overflow-hidden">
                      <Image
                        src="/images/founder.jpg"
                        alt="Founder of Elite Drug Pharma"
                        fill
                        className="object-cover"
                        priority
                      />
                      {/* Gradient overlay at bottom */}
                      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                      
                      {/* Hover Hint */}
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 hover:opacity-100 transition-all duration-300">
                          <div className="bg-white dark:bg-slate-800 px-4 py-2 rounded-xl shadow-2xl border-2 border-orange-500">
                            <p className="text-orange-600 dark:text-orange-400 font-bold">Hover to Read Story</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Founder Info Badge */}
                    <div className="absolute bottom-8 right-8 bg-gradient-to-br from-orange-500 to-amber-500 text-white px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-sm border border-white/20">
                      <p className="text-2xl font-bold mb-1">Ranjit Javvaji</p>
                      <p className="text-sm opacity-90">Founder & CEO</p>
                    </div>
                  </div>

                  {/* Founder Title Below Image */}
                  <div className="mt-6 text-center">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                      Founder of Elite Drug Pharma
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 italic">
                      "Committed to making quality healthcare accessible to all"
                    </p>
                  </div>
                </div>

                {/* Back of Card - Story */}
                <div 
                  className="absolute inset-0 backface-hidden rotate-y-180"
                  style={{ 
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                >
                  <div className="relative bg-gradient-to-br from-orange-500 to-amber-500 dark:from-orange-600 dark:to-amber-600 rounded-3xl p-8 shadow-2xl h-full overflow-y-auto">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-4xl">📖</span>
                      <h3 className="text-3xl font-bold text-white">
                        Our Story
                      </h3>
                    </div>
                    
                    <div className="prose prose-lg prose-invert max-w-none">
                      <p className="text-white leading-relaxed text-justify whitespace-pre-line">
                        {founderStory}
                      </p>
                    </div>

                    {/* Decorative Quote */}
                    <div className="mt-6 border-l-4 border-white/50 pl-6 py-4 bg-white/10 rounded-r-xl backdrop-blur-sm">
                      <p className="text-white italic font-medium">
                        "From a common man to a successful business leader - a journey built on integrity, quality, and kindness."
                      </p>
                      <p className="text-white/80 text-sm mt-2 font-semibold">
                        — Ranjit Javvaji, Founder & CEO
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Timeline Section with Connections */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="mb-8">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Our Journey
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                From humble beginnings to pharmaceutical excellence
              </p>
            </div>

            {/* Timeline with connecting lines */}
            <div className="relative space-y-8">
              {/* Vertical connecting line */}
              <div className="absolute left-7 top-14 bottom-14 w-1 bg-gradient-to-b from-orange-400 via-amber-400 to-orange-400 dark:from-orange-500 dark:via-amber-500 dark:to-orange-500 rounded-full"></div>

              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="relative pl-20"
                >
                  {/* Timeline dot/connector */}
                  <div className="absolute left-4 top-7 w-7 h-7 bg-gradient-to-br from-orange-400 to-amber-400 dark:from-orange-500 dark:to-amber-500 rounded-full border-4 border-white dark:border-slate-900 shadow-lg z-10"></div>
                  
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
    </section>
  );
}
