'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/types';
import ThemeToggle from '@/components/ThemeToggle';
import { Megaphone } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [announcementCount, setAnnouncementCount] = useState(0);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  // Fetch products from API
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    }
    fetchProducts();
  }, []);

  // Fetch announcement count
  useEffect(() => {
    async function fetchAnnouncementCount() {
      try {
        const response = await fetch('/api/announcements');
        if (response.ok) {
          const data = await response.json();
          setAnnouncementCount(data.announcements?.length || 0);
        }
      } catch (error) {
        console.error('Failed to fetch announcements:', error);
      }
    }
    fetchAnnouncementCount();
    
    // Refresh count every 5 minutes
    const interval = setInterval(fetchAnnouncementCount, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Filter products based on search query
  const filteredProducts = searchQuery.trim()
    ? products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.shortDescription?.toLowerCase().includes(searchQuery.toLowerCase())
      ).sort((a, b) => {
        // Check if images are uploaded (not placeholder SVG paths)
        const aImages = (a.images as any);
        const bImages = (b.images as any);
        const aHasImage = (aImages?.main || aImages?.gallery?.[0]) && !(aImages?.main || aImages?.gallery?.[0])?.includes('/images/products/');
        const bHasImage = (bImages?.main || bImages?.gallery?.[0]) && !(bImages?.main || bImages?.gallery?.[0])?.includes('/images/products/');
        
        // Prioritize products with uploaded images first
        if (aHasImage && !bHasImage) return -1;
        if (!aHasImage && bHasImage) return 1;
        
        // Then sort by relevance: name match first, then category, then description
        const aNameMatch = a.name.toLowerCase().includes(searchQuery.toLowerCase());
        const bNameMatch = b.name.toLowerCase().includes(searchQuery.toLowerCase());
        if (aNameMatch && !bNameMatch) return -1;
        if (!aNameMatch && bNameMatch) return 1;
        return 0;
      })
    : [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && filteredProducts.length > 0) {
      router.push(`/products/${filteredProducts[0].slug}`);
      setSearchQuery('');
      setShowSuggestions(false);
    }
  };

  const handleProductClick = (slug: string) => {
    setIsLoading(true);
    setSearchQuery('');
    setShowSuggestions(false);
    router.push(`/products/${slug}`);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <Image 
              src="/logo.png" 
              alt="Loading" 
              width={60} 
              height={60} 
              className="animate-spin"
              style={{ animationDuration: '2.5s' }}
            />
            <p className="text-white text-center mt-4 font-semibold">Loading...</p>
          </div>
        </div>
      )}
      
    <header className="bg-white dark:bg-slate-900 shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="container-custom">
        <div className="flex justify-between items-center py-4 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <Image 
              src="/logo.png" 
              alt="Elite Drug Logo" 
              width={40} 
              height={40} 
              className="h-8 w-8 sm:h-10 sm:w-10 object-contain"
              priority
            />
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl md:text-2xl font-bold lowercase" style={{ color: '#FF8C00' }}>elite drug</span>
              <span className="text-[8px] sm:text-[10px] text-black dark:text-white tracking-wide">enhancing your health</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 items-center">
            <Link 
              href="/" 
              className="relative text-gray-700 dark:text-gray-300 font-medium transition-colors group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FF8C00] to-[#E67E00] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/#about" 
              className="relative text-gray-700 dark:text-gray-300 font-medium transition-colors group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FF8C00] to-[#E67E00] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/#categories" 
              className="relative text-gray-700 dark:text-gray-300 font-medium transition-colors group"
            >
              Products
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FF8C00] to-[#E67E00] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/#contact" 
              className="relative text-gray-700 dark:text-gray-300 font-medium transition-colors group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FF8C00] to-[#E67E00] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/announcements" 
              className="relative text-gray-700 dark:text-gray-300 font-medium transition-colors group flex items-center gap-1"
            >
              <Megaphone size={18} />
              Announcements
              {announcementCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {announcementCount > 9 ? '9+' : announcementCount}
                </span>
              )}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FF8C00] to-[#E67E00] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <ThemeToggle />
          </nav>

          {/* Modern Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md">
            <div ref={searchRef} className="relative w-full">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  placeholder="Search products..."
                  className="w-full px-5 py-3 pr-12 rounded-2xl border-0 bg-gradient-to-r from-gray-50 to-white dark:from-slate-800 dark:to-slate-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 shadow-lg focus:shadow-2xl focus:shadow-orange-100 dark:focus:shadow-orange-900/30 transition-all duration-300 outline-none ring-2 ring-transparent focus:ring-orange-400/50 dark:focus:ring-orange-500/50"
                  style={{
                    backdropFilter: 'blur(10px)',
                  }}
                  onFocus={() => { 
                    if (searchQuery) setShowSuggestions(true);
                  }}
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-200"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              {/* Modern Search Suggestions Dropdown */}
              {showSuggestions && searchQuery && (
                <div className="absolute top-full mt-3 w-full bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 dark:border-slate-700 max-h-96 overflow-hidden z-50">
                  {filteredProducts.length > 0 ? (
                    <div className="py-2 overflow-y-auto max-h-96">
                      {filteredProducts.map((product, idx) => (
                        <button
                          key={product.id}
                          type="button"
                          onClick={() => handleProductClick(product.slug)}
                          className="w-full px-4 py-3 flex items-start gap-3 text-left transition-all duration-200 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100/50 dark:hover:from-orange-900/20 dark:hover:to-orange-800/20 group"
                          style={{
                            animation: `slideIn 0.3s ease-out ${idx * 0.05}s both`
                          }}
                        >
                          <div className="relative w-14 h-14 rounded-xl flex-shrink-0 overflow-hidden bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 shadow-md group-hover:shadow-lg transition-all duration-200">
                            <Image
                              src={
                                ((product.images as any)?.main && typeof (product.images as any).main === 'string' && (product.images as any).main.trim() !== '') 
                                  ? (product.images as any).main 
                                  : ((product.images as any)?.gallery?.[0] && typeof (product.images as any).gallery[0] === 'string' && (product.images as any).gallery[0].trim() !== '')
                                    ? (product.images as any).gallery[0]
                                    : '/images/placeholder.svg'
                              }
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100 truncate group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">{product.name}</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-0.5">{product.category}</p>
                            <div className="flex items-center gap-2 mt-1.5">
                              <svg className="w-4 h-4 text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24">
                                <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="px-4 py-10 text-center text-gray-500 dark:text-gray-400">
                      <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24">
                          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <p className="font-semibold text-gray-700 dark:text-gray-300">No products found</p>
                      <p className="text-sm mt-1 dark:text-gray-500">Try a different search term</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </form>

          <style jsx>{`
            @keyframes slideIn {
              from {
                opacity: 0;
                transform: translateY(-10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>

          {/* Mobile Theme Toggle & Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button 
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-4">
            <Link 
              href="/" 
              className="relative text-gray-700 dark:text-gray-300 font-medium pb-1 border-b-2 border-transparent hover:border-[#FF8C00] dark:hover:border-orange-500 transition-all" 
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/#about" 
              className="relative text-gray-700 dark:text-gray-300 font-medium pb-1 border-b-2 border-transparent hover:border-[#FF8C00] dark:hover:border-orange-500 transition-all" 
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/#categories" 
              className="relative text-gray-700 dark:text-gray-300 font-medium pb-1 border-b-2 border-transparent hover:border-[#FF8C00] dark:hover:border-orange-500 transition-all" 
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link 
              href="/#contact" 
              className="relative text-gray-700 dark:text-gray-300 font-medium pb-1 border-b-2 border-transparent hover:border-[#FF8C00] dark:hover:border-orange-500 transition-all" 
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link 
              href="/announcements" 
              className="relative text-gray-700 dark:text-gray-300 font-medium pb-1 border-b-2 border-transparent hover:border-[#FF8C00] dark:hover:border-orange-500 transition-all flex items-center gap-1" 
              onClick={() => setIsMenuOpen(false)}
            >
              <Megaphone size={18} />
              Announcements
              {announcementCount > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse ml-2">
                  {announcementCount > 9 ? '9+' : announcementCount}
                </span>
              )}
            </Link>
            
            {/* Modern Mobile Search */}
            <div className="relative">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full px-5 py-3 pr-12 rounded-2xl border-0 bg-gradient-to-r from-gray-50 to-white dark:from-slate-800 dark:to-slate-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 shadow-lg focus:shadow-xl focus:shadow-orange-100 dark:focus:shadow-orange-900/30 transition-all duration-300 outline-none ring-2 ring-transparent focus:ring-orange-400/50 dark:focus:ring-orange-500/50"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </form>

              {/* Modern Mobile Search Suggestions */}
              {searchQuery && filteredProducts.length > 0 && (
                <div className="mt-3 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 dark:border-slate-700 max-h-64 overflow-hidden">
                  <div className="overflow-y-auto max-h-64">
                    {filteredProducts.map((product, idx) => (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => {
                          handleProductClick(product.slug);
                          setIsMenuOpen(false);
                        }}
                        className="w-full px-3 py-2.5 flex items-center gap-2.5 text-left text-sm hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100/50 dark:hover:from-orange-900/20 dark:hover:to-orange-800/20 transition-all duration-200 group"
                        style={{
                          animation: `slideIn 0.3s ease-out ${idx * 0.05}s both`
                        }}
                      >
                        <div className="relative w-12 h-12 rounded-xl flex-shrink-0 overflow-hidden bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 shadow-md group-hover:shadow-lg transition-all">
                          <Image
                            src={
                              ((product.images as any)?.main && typeof (product.images as any).main === 'string' && (product.images as any).main.trim() !== '') 
                                ? (product.images as any).main 
                                : ((product.images as any)?.gallery?.[0] && typeof (product.images as any).gallery[0] === 'string' && (product.images as any).gallery[0].trim() !== '')
                                  ? (product.images as any).gallery[0]
                                  : '/images/placeholder.svg'
                            }
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100 truncate text-sm group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">{product.name}</h4>
                        </div>
                        <svg className="w-4 h-4 text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" fill="none" viewBox="0 0 24 24">
                          <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
    </>
  );
}
