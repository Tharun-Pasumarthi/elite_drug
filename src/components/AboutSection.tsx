'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const milestones = [
  {
    year: '2016',
    title: ' Founded 2016',
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
    title: ' Future Vision',
    description: 'Leading India\'s pharmaceutical innovation & healthcare accessibility',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
  },
];

function MilestoneCard({ milestone, index }: { milestone: typeof milestones[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -50 : 50 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`flex gap-8 items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-slate-700">
          <div className={`flex items-center gap-3 mb-3 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-700 dark:from-orange-500 dark:to-orange-700 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d={milestone.icon} stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-primary dark:text-orange-400">{milestone.year}</h3>
          </div>
          <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{milestone.title}</h4>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{milestone.description}</p>
        </div>
      </div>
      
      {/* Timeline dot */}
      <div className="relative flex-shrink-0">
        <div className="w-6 h-6 bg-primary dark:bg-orange-500 rounded-full border-4 border-white dark:border-slate-900 shadow-lg z-10"></div>
      </div>
      
      <div className="flex-1 hidden md:block"></div>
    </motion.div>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-slate-950 dark:to-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4"
          >
            Our Journey
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

        {/* Timeline line */}
        <div className="absolute left-1/2 top-48 bottom-24 w-0.5 bg-gradient-to-b from-primary via-blue-400 to-primary dark:from-orange-500 dark:via-orange-600 dark:to-orange-500 hidden md:block"></div>

        <div className="space-y-12 md:space-y-16">
          {milestones.map((milestone, index) => (
            <MilestoneCard key={milestone.year} milestone={milestone} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
