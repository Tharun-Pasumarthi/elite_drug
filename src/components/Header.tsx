'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { products } from '@/data/products';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  // Filter products based on search query
  const filteredProducts = searchQuery.trim()
    ? products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
      ).sort((a, b) => {
        // Sort by relevance: name match first, then category, then description
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
          <div className="relative">
            <Image 
              src="/logo.png" 
              alt="Loading" 
              width={80} 
              height={80} 
              className="animate-spin"
              style={{ animationDuration: '1s' }}
            />
            <p className="text-white text-center mt-4 font-semibold">Loading...</p>
          </div>
        </div>
      )}
      
    <header className="bg-white shadow-md sticky top-0 z-50">
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
              <span className="text-[8px] sm:text-[10px] text-gray-600 tracking-wide hidden sm:block">enhancing your health</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            <Link href="/" className="text-gray-700 font-medium transition-colors" style={{ '&:hover': { color: '#FF8C00' } }} onMouseEnter={(e) => e.currentTarget.style.color = '#FF8C00'} onMouseLeave={(e) => e.currentTarget.style.color = ''}>
              Home
            </Link>
            <Link href="/#about" className="text-gray-700 font-medium transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = '#FF8C00'} onMouseLeave={(e) => e.currentTarget.style.color = ''}>
              About
            </Link>
            <Link href="/#categories" className="text-gray-700 font-medium transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = '#FF8C00'} onMouseLeave={(e) => e.currentTarget.style.color = ''}>
              Products
            </Link>
            <Link href="/#contact" className="text-gray-700 font-medium transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = '#FF8C00'} onMouseLeave={(e) => e.currentTarget.style.color = ''}>
              Contact
            </Link>
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md">
            <div ref={searchRef} className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => searchQuery && setShowSuggestions(true)}
                placeholder="Search products..."
                className="w-full px-4 py-2 pr-10 border-2 border-gray-200 rounded-lg focus:outline-none transition-colors"
                style={{ '--focus-border-color': '#FF8C00' } as React.CSSProperties}
                onFocus={(e) => { 
                  if (searchQuery) setShowSuggestions(true);
                  e.currentTarget.style.borderColor = '#FF8C00';
                }}
                onBlur={(e) => e.currentTarget.style.borderColor = '#E5E7EB'}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 transition-colors"
                onMouseEnter={(e) => e.currentTarget.style.color = '#FF8C00'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* Search Suggestions Dropdown */}
              {showSuggestions && searchQuery && (
                <div className="absolute top-full mt-2 w-full bg-white border-2 border-gray-200 rounded-lg shadow-xl max-h-96 overflow-y-auto z-50">
                  {filteredProducts.length > 0 ? (
                    <div className="py-2">
                      {filteredProducts.map((product) => (
                        <button
                          key={product.id}
                          type="button"
                          onClick={() => handleProductClick(product.slug)}
                          className="w-full px-4 py-3 flex items-start gap-3 text-left transition-colors"
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFF5E6'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
                        >
                          <div className="w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center" style={{ background: 'linear-gradient(to bottom right, rgba(255, 140, 0, 0.1), rgba(255, 140, 0, 0.2))' }}>
                            <span className="font-bold text-sm" style={{ color: '#FF8C00' }}>{product.name.charAt(0)}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 truncate">{product.name}</h4>
                            <p className="text-sm text-gray-500 truncate">{product.category}</p>
                            <p className="text-sm font-semibold mt-1" style={{ color: '#FF8C00' }}>₹{product.price}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="px-4 py-8 text-center text-gray-500">
                      <svg className="w-12 h-12 mx-auto mb-2 text-gray-300" fill="none" viewBox="0 0 24 24">
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <p>No products found</p>
                      <p className="text-sm mt-1">Try a different search term</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </form>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-4">
            <Link href="/" className="text-gray-700 font-medium" onClick={() => setIsMenuOpen(false)} onMouseEnter={(e) => e.currentTarget.style.color = '#FF8C00'} onMouseLeave={(e) => e.currentTarget.style.color = ''}>Home</Link>
            <Link href="/#about" className="text-gray-700 font-medium" onClick={() => setIsMenuOpen(false)} onMouseEnter={(e) => e.currentTarget.style.color = '#FF8C00'} onMouseLeave={(e) => e.currentTarget.style.color = ''}>About</Link>
            <Link href="/#categories" className="text-gray-700 font-medium" onClick={() => setIsMenuOpen(false)} onMouseEnter={(e) => e.currentTarget.style.color = '#FF8C00'} onMouseLeave={(e) => e.currentTarget.style.color = ''}>Products</Link>
            <Link href="/#contact" className="text-gray-700 font-medium" onClick={() => setIsMenuOpen(false)} onMouseEnter={(e) => e.currentTarget.style.color = '#FF8C00'} onMouseLeave={(e) => e.currentTarget.style.color = ''}>Contact</Link>
            
            {/* Mobile Search */}
            <div className="relative">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full px-4 py-2 pr-10 border-2 border-gray-200 rounded-lg focus:outline-none"
                  onFocus={(e) => e.currentTarget.style.borderColor = '#FF8C00'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#E5E7EB'}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
                  onMouseEnter={(e) => e.currentTarget.style.color = '#FF8C00'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#9CA3AF'}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </form>

              {/* Mobile Search Suggestions */}
              {searchQuery && filteredProducts.length > 0 && (
                <div className="mt-2 bg-white border-2 border-gray-200 rounded-lg shadow-xl max-h-64 overflow-y-auto">
                  {filteredProducts.map((product) => (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => {
                        handleProductClick(product.slug);
                        setIsMenuOpen(false);
                      }}
                      className="w-full px-3 py-2 flex items-center gap-2 text-left text-sm"
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFF5E6'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
                    >
                      <div className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center" style={{ background: 'linear-gradient(to bottom right, rgba(255, 140, 0, 0.1), rgba(255, 140, 0, 0.2))' }}>
                        <span className="font-bold text-xs" style={{ color: '#FF8C00' }}>{product.name.charAt(0)}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 truncate text-sm">{product.name}</h4>
                        <p className="text-xs font-semibold" style={{ color: '#FF8C00' }}>₹{product.price}</p>
                      </div>
                    </button>
                  ))}
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
