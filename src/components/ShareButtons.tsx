'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
  imageUrl?: string;
}

interface ShareOption {
  name: string;
  icon: JSX.Element;
  color: string;
  hoverColor: string;
  gradient: string;
  action: () => void;
}

export default function ShareButtons({ url, title, description = '', imageUrl }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  // Construct full absolute image URL for proper embedding
  const getAbsoluteImageUrl = () => {
    if (!imageUrl) return '';
    
    // Already absolute URL (Cloudinary or other CDN)
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    
    // Relative URL - make it absolute
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                    (typeof window !== 'undefined' ? window.location.origin : '');
    return `${baseUrl}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
  };

  const fullImageUrl = getAbsoluteImageUrl();

  const shareOnWhatsApp = () => {
    // WhatsApp will fetch the Open Graph image from the URL
    // We also include it in text for reference
    let text = `📦 *${title}*\n\n${description}`;
    if (fullImageUrl) {
      text += `\n\n📸 ${fullImageUrl}`;
    }
    text += `\n\n🔗 View Product: ${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareOnFacebook = () => {
    // Facebook will use Open Graph meta tags from the page
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      '_blank',
      'width=600,height=400'
    );
  };

  const shareOnTwitter = () => {
    // Twitter will use Twitter Card meta tags from the page
    const text = encodeURIComponent(title);
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${text}`,
      '_blank',
      'width=600,height=400'
    );
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      '_blank',
      'width=600,height=400'
    );
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent(title);
    let emailBody = `${description}\n\n`;
    if (fullImageUrl) {
      emailBody += `Image: ${fullImageUrl}\n\n`;
    }
    emailBody += `Link: ${url}`;
    const body = encodeURIComponent(emailBody);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareOptions: ShareOption[] = [
    {
      name: 'WhatsApp',
      color: 'bg-emerald-500',
      hoverColor: 'hover:bg-emerald-600',
      gradient: 'from-emerald-400 to-emerald-600',
      action: shareOnWhatsApp,
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
    },
    {
      name: 'Facebook',
      color: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700',
      gradient: 'from-blue-500 to-blue-700',
      action: shareOnFacebook,
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
    },
    {
      name: 'Twitter',
      color: 'bg-slate-900',
      hoverColor: 'hover:bg-slate-800',
      gradient: 'from-slate-700 to-slate-900',
      action: shareOnTwitter,
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      color: 'bg-sky-600',
      hoverColor: 'hover:bg-sky-700',
      gradient: 'from-sky-500 to-sky-700',
      action: shareOnLinkedIn,
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      name: 'Email',
      color: 'bg-rose-600',
      hoverColor: 'hover:bg-rose-700',
      gradient: 'from-rose-500 to-rose-700',
      action: shareViaEmail,
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      name: 'Copy Link',
      color: 'bg-gradient-to-r from-orange-500 to-amber-600',
      hoverColor: 'hover:from-orange-600 hover:to-amber-700',
      gradient: 'from-orange-500 to-amber-600',
      action: copyLink,
      icon: copied ? (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full">
      {/* Compact Header */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-semibold text-gray-600">Share:</span>
      </div>

      {/* Minimal Flex Layout */}
      <div className="flex flex-wrap gap-2">
        {shareOptions.map((option, index) => (
          <motion.div
            key={option.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.03 }}
            className="relative group"
            onMouseEnter={() => setHoveredButton(option.name)}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={option.action}
              className={`
                w-10 h-10 rounded-lg ${option.color} ${option.hoverColor}
                text-white shadow-md hover:shadow-lg transition-all duration-300
                flex items-center justify-center relative overflow-hidden
                border border-white/20
              `}
              aria-label={`Share on ${option.name}`}
            >
              {/* Animated Background Gradient */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${option.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                initial={false}
              />
              
              {/* Shine Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />

              {/* Icon */}
              <div className="relative z-10 w-4 h-4">
                {option.icon}
              </div>

              {/* Pulse Effect for Copy */}
              {option.name === 'Copy Link' && copied && (
                <motion.div
                  className="absolute inset-0 bg-white/30 rounded-xl"
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                />
              )}
            </motion.button>

            {/* Tooltip */}
            <AnimatePresence>
              {hoveredButton === option.name && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none"
                >
                  <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
                    {option.name === 'Copy Link' && copied ? 'Copied!' : option.name}
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>


    </div>
  );
}
