'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
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

const storyTabs = [
  {
    id: 'story',
    label: 'Our Story',
    icon: '📖',
    content: `In 2016, with a heart full of dreams and commitment to healthcare excellence, Elite Drug Pharma was founded. What started as a small pharmacy with a big vision has grown into a trusted name in pharmaceutical care.

Our journey began with a simple belief: every individual deserves access to quality medications and professional healthcare guidance. Over the years, we've stayed true to this mission, expanding our reach while maintaining the personal touch that defines us.

Today, we serve thousands of families, offering not just medicines, but peace of mind. Our team of dedicated pharmacists works tirelessly to ensure that every prescription is filled with care, every question is answered with expertise, and every customer is treated like family.`,
  },
  {
    id: 'mission',
    label: 'Our Mission',
    icon: '🎯',
    content: `To provide accessible, affordable, and quality pharmaceutical care to communities across India. We are committed to:

• Ensuring the highest standards of medication safety and quality
• Delivering professional healthcare consultation with compassion
• Making essential medicines accessible to all, regardless of location
• Continuously innovating to improve healthcare delivery
• Building lasting relationships based on trust and reliability

We believe that good health is not a luxury—it's a fundamental right. Through our services, we strive to make quality healthcare a reality for everyone.`,
  },
  {
    id: 'vision',
    label: 'Our Vision',
    icon: '🌟',
    content: `To become India's most trusted and innovative pharmaceutical partner, revolutionizing healthcare accessibility through technology and compassionate service.

We envision a future where:
• Every home has access to quality medicines within minutes
• Healthcare consultations are just a click away
• Medication adherence is simplified through smart solutions
• Pharmaceutical care is personalized to individual needs
• Communities are empowered with health knowledge

By 2030, we aim to touch 10 million lives, expand to 100+ locations, and set new benchmarks in pharmaceutical excellence. Our vision extends beyond business—it's about creating a healthier, happier India.`,
  },
  {
    id: 'values',
    label: 'Our Values',
    icon: '💎',
    content: `The principles that guide everything we do:

🤝 INTEGRITY
We operate with unwavering honesty and transparency in all our dealings. Your trust is our most valuable asset.

❤️ COMPASSION
Every customer is treated with empathy and understanding. We care about your health as much as you do.

🔬 EXCELLENCE
We never compromise on quality. From sourcing to delivery, excellence is our standard.

🌱 INNOVATION
We embrace technology and new ideas to continuously improve our services and your experience.

🤲 SERVICE
Going the extra mile isn't extra for us—it's our way. Your satisfaction is our success.

These values aren't just words on paper; they're reflected in every interaction, every prescription, and every service we provide.`,
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
  const [activeTab, setActiveTab] = useState('story');
  
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

        {/* Founder Section with Story Tabs */}
        <div className="mb-24">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left: Founder Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative group">
                {/* Decorative elements */}
                <div className="absolute -inset-4 bg-gradient-to-r from-orange-400 to-amber-400 dark:from-orange-500 dark:to-amber-500 rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity blur-xl"></div>
                
                {/* Image container */}
                <div className="relative bg-white dark:bg-slate-800 rounded-3xl p-3 shadow-2xl">
                  <div className="relative h-[500px] rounded-2xl overflow-hidden">
                    <Image
                      src="/images/founder.jpg"
                      alt="Ranjit Jayajii - Founder & CEO"
                      fill
                      className="object-cover"
                      priority
                    />
                    {/* Gradient overlay at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  </div>
                  
                  {/* Founder Info Badge */}
                  <div className="absolute bottom-8 right-8 bg-gradient-to-br from-orange-500 to-amber-500 text-white px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-sm border border-white/20">
                    <p className="text-2xl font-bold mb-1">Ranjit Jayajii</p>
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
            </motion.div>

            {/* Right: Story Tabs & Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Tab Buttons */}
              <div className="flex flex-wrap gap-3 mb-6">
                {storyTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30 scale-105'
                        : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Content Area */}
              <div className="relative min-h-[400px]">
                {storyTabs.map((tab) => (
                  <motion.div
                    key={tab.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: activeTab === tab.id ? 1 : 0,
                      y: activeTab === tab.id ? 0 : 20,
                      display: activeTab === tab.id ? 'block' : 'none'
                    }}
                    transition={{ duration: 0.5 }}
                    className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-slate-700"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-4xl">{tab.icon}</span>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {tab.label}
                      </h3>
                    </div>
                    
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                        {tab.content}
                      </p>
                    </div>

                    {/* Decorative quote mark */}
                    <div className="absolute top-4 right-4 text-orange-200 dark:text-orange-900/30 text-9xl font-serif leading-none pointer-events-none">
                      "
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mt-24">
          <div className="text-center mb-16">
            <motion.h3 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4"
            >
              Our Journey
            </motion.h3>
          </div>

          {/* Timeline line */}
          <div className="absolute left-1/2 top-[1400px] bottom-24 w-0.5 bg-gradient-to-b from-primary via-blue-400 to-primary dark:from-orange-500 dark:via-orange-600 dark:to-orange-500 hidden md:block"></div>

          <div className="space-y-12 md:space-y-16">
            {milestones.map((milestone, index) => (
              <MilestoneCard key={milestone.year} milestone={milestone} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
