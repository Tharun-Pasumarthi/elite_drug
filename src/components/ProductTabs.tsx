'use client';

import { useState } from 'react';
import { Product } from '@/types';
import { motion } from 'framer-motion';

interface ProductTabsProps {
  product: Product;
}

// Helper function to ensure we have an array
function toArray(value: any): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') {
    // Split by comma, newline, or semicolon
    return value.split(/[,;\n]/).map(item => item.trim()).filter(item => item.length > 0);
  }
  return [];
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
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="container-custom">
        {/* Tabs */}
        <div className="flex gap-2 border-b-2 border-gray-200 dark:border-slate-700 mb-10 overflow-x-auto pb-2 scrollbar-thin">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-8 py-4 font-semibold whitespace-nowrap transition-all rounded-t-lg ${
                activeTab === tab.id
                  ? 'text-primary dark:text-orange-400 bg-blue-50 dark:bg-slate-800'
                  : 'text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-orange-400 hover:bg-gray-50 dark:hover:bg-slate-800'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-blue-700 dark:from-orange-500 dark:to-orange-700 rounded-full"
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
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 bg-gradient-to-r from-primary to-blue-700 dark:from-orange-500 dark:to-orange-700 bg-clip-text text-transparent">
                About {product.name}
              </h2>
              <div className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line bg-gradient-to-br from-gray-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 p-8 rounded-2xl border border-gray-200 dark:border-slate-600">
                {product.about || product.details?.about || 'No information available.'}
              </div>
            </div>
          )}

          {activeTab === 'uses' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 bg-gradient-to-r from-primary to-blue-700 dark:from-orange-500 dark:to-orange-700 bg-clip-text text-transparent">
                Uses of {product.name}
              </h2>
              {product.usage || product.details?.usage ? (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 p-8 rounded-2xl border border-blue-100 dark:border-slate-600">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                    {product.usage || product.details?.usage || 'No usage information available.'}
                  </p>
                </div>
              ) : (
                <div className="text-gray-500 dark:text-gray-400 text-center py-8">No usage information available.</div>
              )}
            </div>
          )}

          {activeTab === 'benefits' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 bg-gradient-to-r from-primary to-blue-700 dark:from-orange-500 dark:to-orange-700 bg-clip-text text-transparent">
                Medicinal Benefits
              </h2>
              <ul className="space-y-4">
                {toArray(product.benefits || product.details?.benefits).map((benefit, index) => (
                  <motion.li 
                    key={index} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex gap-4 items-start"
                  >
                    <span className="flex-shrink-0 w-8 h-8 bg-primary dark:bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                      ✓
                    </span>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed pt-1">{benefit}</p>
                  </motion.li>
                ))}
              </ul>
              {(product.howItWorks || product.details?.howItWorks) && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 p-8 rounded-2xl border border-blue-100 dark:border-slate-600"
                >
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">How {product.name} Works</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{product.howItWorks || product.details?.howItWorks}</p>
                </motion.div>
              )}
            </div>
          )}

          {activeTab === 'directions' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 bg-gradient-to-r from-primary to-blue-700 dark:from-orange-500 dark:to-orange-700 bg-clip-text text-transparent">
                Directions for Use
              </h2>
              {product.usage || product.details?.usage ? (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 p-8 rounded-2xl border border-blue-100 dark:border-slate-600 mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Usage Instructions</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                    {product.usage || product.details?.usage}
                  </p>
                </div>
              ) : null}
              
              {(product.precautions || product.details?.precautions) && (
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-l-4 border-yellow-600 dark:border-yellow-500 p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-bold text-yellow-700 dark:text-yellow-400 mb-3">⚠️ Precautions</h3>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {product.precautions || product.details?.precautions}
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'storage' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 bg-gradient-to-r from-primary to-blue-700 dark:from-orange-500 dark:to-orange-700 bg-clip-text text-transparent">
                Storage Instructions
              </h2>
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 p-8 rounded-2xl border border-gray-200 dark:border-slate-600">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 dark:bg-orange-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M3 3h18v18H3V3z" stroke="#0066CC" strokeWidth="2"/>
                      <path d="M12 8v8M8 12h8" stroke="#0066CC" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">Storage Guidelines</h3>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                      <li>• Store in a cool, dry place away from direct sunlight</li>
                      <li>• Keep out of reach of children</li>
                      <li>• Do not freeze unless required</li>
                      <li>• Check expiry date before use</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'warnings' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 bg-gradient-to-r from-primary to-blue-700 dark:from-orange-500 dark:to-orange-700 bg-clip-text text-transparent">
                Side Effects & Warnings
              </h2>
              
              {/* Side Effects */}
              {(product.sideEffects || product.details?.sideEffects) && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Common Side Effects</h3>
                  <ul className="space-y-3">
                    {toArray(product.sideEffects || product.details?.sideEffects).map((effect, index) => (
                      <motion.li 
                        key={index} 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex gap-4 items-start"
                      >
                        <span className="flex-shrink-0 w-8 h-8 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center text-lg">
                          ⚠
                        </span>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed pt-1">{effect}</p>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Precautions */}
              {(product.precautions || product.details?.precautions) && (
                <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-l-4 border-red-600 dark:border-red-500 p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-3">⚠️ Important Precautions</h3>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {product.precautions || product.details?.precautions}
                  </p>
                </div>
              )}
              
              {!product.sideEffects && !product.details?.sideEffects && !product.precautions && !product.details?.precautions && (
                <div className="text-gray-500 dark:text-gray-400 text-center py-8">No warnings or side effects information available.</div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
