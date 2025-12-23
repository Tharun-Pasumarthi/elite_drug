'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const milestones = [
  {
    year: '2015',
    title: 'Foundation',
    description: 'Elite Drug was established with a vision to revolutionize pharmaceutical distribution and healthcare accessibility.',
    icon: 'M12 2L2 7l10 5 10-5-10-5z',
  },
  {
    year: '2017',
    title: 'Expansion',
    description: 'Expanded our product portfolio to 500+ medications and established partnerships with leading manufacturers.',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  },
  {
    year: '2019',
    title: 'Digital Transformation',
    description: 'Launched our online platform, making quality medications accessible to customers across the country.',
    icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  },
  {
    year: '2022',
    title: 'Healthcare Excellence',
    description: 'Achieved ISO certification and won "Best Pharmaceutical Distributor" award for exceptional service quality.',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  },
  {
    year: '2024',
    title: 'Innovation & Growth',
    description: 'Introduced AI-powered inventory management and expanded to serve 10,000+ healthcare providers nationwide.',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
  },
  {
    year: '2025',
    title: 'Future Vision',
    description: 'Pioneering next-generation healthcare solutions with cutting-edge technology and patient-centric approach.',
    icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
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
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
          <div className={`flex items-center gap-3 mb-3 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-700 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d={milestone.icon} stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-primary">{milestone.year}</h3>
          </div>
          <h4 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h4>
          <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
        </div>
      </div>
      
      {/* Timeline dot */}
      <div className="relative flex-shrink-0">
        <div className="w-6 h-6 bg-primary rounded-full border-4 border-white shadow-lg z-10"></div>
      </div>
      
      <div className="flex-1 hidden md:block"></div>
    </motion.div>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
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
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Our Journey
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            A decade of excellence in pharmaceutical care
          </motion.p>
        </div>

        {/* Timeline line */}
        <div className="absolute left-1/2 top-48 bottom-24 w-0.5 bg-gradient-to-b from-primary via-blue-400 to-primary hidden md:block"></div>

        <div className="space-y-12 md:space-y-16">
          {milestones.map((milestone, index) => (
            <MilestoneCard key={milestone.year} milestone={milestone} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
