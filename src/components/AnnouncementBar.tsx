'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, AlertCircle, CheckCircle, Info, Megaphone, Tag, Sparkles } from 'lucide-react';

interface Announcement {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'sale' | 'new_product' | 'update';
  link: string | null;
  link_text: string | null;
  priority: number;
}

export default function AnnouncementBar() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dismissed, setDismissed] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // No longer load dismissed announcements from localStorage
    fetchAnnouncements();
  }, []);

  useEffect(() => {
    // Rotate through announcements every 5 seconds
    if (announcements.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % announcements.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [announcements.length]);

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch('/api/announcements');
      const data = await response.json();
      if (data.announcements && data.announcements.length > 0) {
        setAnnouncements(data.announcements);
        setIsVisible(true);
      }
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  const handleDismiss = (id: string) => {
    const newDismissed = [...dismissed, id];
    setDismissed(newDismissed);
    // No longer save to localStorage
    
    // Remove from current announcements
    const filtered = announcements.filter(a => a.id !== id);
    setAnnouncements(filtered);
    
    if (filtered.length === 0) {
      setIsVisible(false);
    }
  };

  const getStyles = (type: string) => {
    switch (type) {
      case 'success':
        return { bg: 'bg-green-600', icon: CheckCircle };
      case 'warning':
        return { bg: 'bg-yellow-500', icon: AlertCircle };
      case 'error':
        return { bg: 'bg-red-600', icon: AlertCircle };
      case 'sale':
        return { bg: 'bg-purple-600', icon: Tag };
      case 'new_product':
        return { bg: 'bg-blue-600', icon: Sparkles };
      case 'update':
        return { bg: 'bg-indigo-600', icon: Info };
      default:
        return { bg: 'bg-gray-800', icon: Megaphone };
    }
  };

  if (!isVisible || announcements.length === 0) return null;

  const visibleAnnouncements = announcements.filter(a => !dismissed.includes(a.id));
  if (visibleAnnouncements.length === 0) return null;

  const current = visibleAnnouncements[currentIndex % visibleAnnouncements.length];
  const styles = getStyles(current.type);
  const Icon = styles.icon;

  return (
    <div className={`${styles.bg} text-white py-3 px-4 relative z-50`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Icon className="flex-shrink-0" size={20} />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold">{current.title}</span>
              <span className="hidden sm:inline">•</span>
              <span className="text-sm opacity-90">{current.message}</span>
            </div>
          </div>

          {current.link && (
            <Link
              href={current.link}
              className="flex-shrink-0 bg-white/20 hover:bg-white/30 px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
            >
              {current.link_text || 'Learn More'}
            </Link>
          )}
        </div>

        <button
          onClick={() => handleDismiss(current.id)}
          className="flex-shrink-0 hover:bg-white/20 rounded-full p-1 transition-colors"
          aria-label="Dismiss announcement"
        >
          <X size={18} />
        </button>
      </div>

      {/* Progress indicator for multiple announcements */}
      {visibleAnnouncements.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20">
          <div
            className="h-full bg-white/60 transition-all duration-[5000ms] ease-linear"
            style={{
              width: `${((currentIndex % visibleAnnouncements.length) + 1) * (100 / visibleAnnouncements.length)}%`
            }}
          />
        </div>
      )}
    </div>
  );
}
