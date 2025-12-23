'use client';

import { useState } from 'react';
import { Product } from '@/types';
import { motion } from 'framer-motion';

interface ProductTabsProps {
  product: Product;
}

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState('about');

  const tabs = [
    { id: 'about', label: 'About' },
    { id: 'uses', label: 'Uses' },
    { id: 'benefits', label: 'Benefits' },
    { id: 'directions', label: 'Directions' },
    { id: 'storage', label: 'Storage' },
    { id: 'warnings', label: 'Warnings' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        {/* Tabs */}
        <div className="flex gap-2 border-b-2 border-gray-200 mb-10 overflow-x-auto pb-2 scrollbar-thin">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-8 py-4 font-semibold whitespace-nowrap transition-all rounded-t-lg ${
                activeTab === tab.id
                  ? 'text-primary bg-blue-50'
                  : 'text-gray-600 hover:text-primary hover:bg-gray-50'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-blue-700 rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div 
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {activeTab === 'about' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent">
                About {product.name}
              </h2>
              <div className="text-gray-600 leading-relaxed whitespace-pre-line bg-gradient-to-br from-gray-50 to-blue-50 p-8 rounded-2xl border border-gray-200">
                {product.details.about}
              </div>
            </div>
          )}

          {activeTab === 'uses' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent">
                Uses of {product.name}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {product.details.uses.map((use, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl hover:shadow-lg transition-all border border-blue-100 hover:border-primary"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold">{index + 1}</span>
                      </div>
                      <h3 className="text-xl font-bold text-primary">{use.title}</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed ml-13">{use.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'benefits' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent">
                Medicinal Benefits
              </h2>
              <ul className="space-y-4">
                {product.details.benefits.map((benefit, index) => (
                  <motion.li 
                    key={index} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex gap-4 items-start"
                  >
                    <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                      ✓
                    </span>
                    <p className="text-gray-600 leading-relaxed pt-1">{benefit}</p>
                  </motion.li>
                ))}
              </ul>
              {product.details.howItWorks && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">How {product.name} Works</h3>
                  <p className="text-gray-600 leading-relaxed">{product.details.howItWorks}</p>
                </motion.div>
              )}
            </div>
          )}

          {activeTab === 'directions' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent">
                Directions for Use
              </h2>
              <ul className="space-y-4">
                {product.details.directions.map((direction, index) => (
                  <motion.li 
                    key={index} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex gap-4 items-start"
                  >
                    <span className="text-primary text-2xl font-bold">→</span>
                    <p className="text-gray-600 leading-relaxed pt-1">{direction}</p>
                  </motion.li>
                ))}
              </ul>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8 bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-600 p-6 rounded-xl shadow-sm"
              >
                <h3 className="text-xl font-bold text-red-600 mb-3">⚠️ Overdose Warning</h3>
                <p className="text-gray-700">
                  Do not take more than the prescribed dose of {product.name} as it may cause overdose. 
                  If you suspect you have taken overdose, please consult a doctor immediately.
                </p>
              </motion.div>
            </div>
          )}

          {activeTab === 'storage' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent">
                Storage Instructions
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {product.details.storage.map((instruction, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-xl text-center hover:shadow-lg transition-all border border-gray-200"
                  >
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <path d="M16 8v16M8 16h16" stroke="#0066CC" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{instruction}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'warnings' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent">
                Drug Warnings
              </h2>
              <ul className="space-y-4">
                {product.details.warnings.map((warning, index) => (
                  <motion.li 
                    key={index} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex gap-4 items-start"
                  >
                    <span className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-lg">
                      ⚠
                    </span>
                    <p className="text-gray-600 leading-relaxed pt-1">{warning}</p>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
