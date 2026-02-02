'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, CheckCircle, Info, Megaphone, Tag, Sparkles, Calendar, ExternalLink } from 'lucide-react';

interface Announcement {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'sale' | 'new_product' | 'update';
  link: string | null;
  link_text: string | null;
  created_at: string;
  expires_at: string | null;
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch('/api/announcements');
      const data = await response.json();
      setAnnouncements(data.announcements || []);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return CheckCircle;
      case 'warning': return AlertCircle;
      case 'error': return AlertCircle;
      case 'sale': return Tag;
      case 'new_product': return Sparkles;
      case 'update': return Info;
      default: return Megaphone;
    }
  };

  const getColors = (type: string) => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-50 dark:bg-green-900/20',
          border: 'border-green-200 dark:border-green-800',
          icon: 'text-green-600 dark:text-green-400',
          badge: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
        };
      case 'warning':
        return {
          bg: 'bg-yellow-50 dark:bg-yellow-900/20',
          border: 'border-yellow-200 dark:border-yellow-800',
          icon: 'text-yellow-600 dark:text-yellow-400',
          badge: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
        };
      case 'error':
        return {
          bg: 'bg-red-50 dark:bg-red-900/20',
          border: 'border-red-200 dark:border-red-800',
          icon: 'text-red-600 dark:text-red-400',
          badge: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
        };
      case 'sale':
        return {
          bg: 'bg-purple-50 dark:bg-purple-900/20',
          border: 'border-purple-200 dark:border-purple-800',
          icon: 'text-purple-600 dark:text-purple-400',
          badge: 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
        };
      case 'new_product':
        return {
          bg: 'bg-blue-50 dark:bg-blue-900/20',
          border: 'border-blue-200 dark:border-blue-800',
          icon: 'text-blue-600 dark:text-blue-400',
          badge: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
        };
      case 'update':
        return {
          bg: 'bg-indigo-50 dark:bg-indigo-900/20',
          border: 'border-indigo-200 dark:border-indigo-800',
          icon: 'text-indigo-600 dark:text-indigo-400',
          badge: 'bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200'
        };
      default:
        return {
          bg: 'bg-gray-50 dark:bg-gray-800',
          border: 'border-gray-200 dark:border-gray-700',
          icon: 'text-gray-600 dark:text-gray-400',
          badge: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
        };
    }
  };

  const filteredAnnouncements = filter === 'all'
    ? announcements
    : announcements.filter(a => a.type === filter);

  const types = ['all', 'sale', 'new_product', 'update', 'info', 'success', 'warning'];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Megaphone className="text-primary" size={40} />
            <h1 className="text-4xl font-bold dark:text-white">Announcements & Updates</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Stay updated with our latest products, offers, and important information
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                filter === type
                  ? 'bg-primary text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {type.replace('_', ' ').charAt(0).toUpperCase() + type.slice(1).replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading announcements...</p>
          </div>
        )}

        {/* Announcements Grid */}
        {!loading && (
          <div className="space-y-6">
            {filteredAnnouncements.length > 0 ? (
              filteredAnnouncements.map((announcement) => {
                const colors = getColors(announcement.type);
                const Icon = getIcon(announcement.type);
                
                return (
                  <div
                    key={announcement.id}
                    className={`${colors.bg} ${colors.border} border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`${colors.icon} flex-shrink-0 mt-1`}>
                        <Icon size={28} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <h2 className="text-2xl font-bold dark:text-white">
                            {announcement.title}
                          </h2>
                          <span className={`${colors.badge} px-3 py-1 rounded-full text-xs font-semibold uppercase whitespace-nowrap`}>
                            {announcement.type.replace('_', ' ')}
                          </span>
                        </div>
                        
                        <p className="text-gray-700 dark:text-gray-300 text-lg mb-4 leading-relaxed">
                          {announcement.message}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <Calendar size={16} />
                              {new Date(announcement.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </div>
                            {announcement.expires_at && (
                              <div className="flex items-center gap-1">
                                <span>•</span>
                                Expires: {new Date(announcement.expires_at).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </div>
                            )}
                          </div>
                          
                          {announcement.link && (
                            <Link
                              href={announcement.link}
                              className={`${colors.icon} font-semibold flex items-center gap-2 hover:gap-3 transition-all group`}
                            >
                              {announcement.link_text || 'Learn More'}
                              <ExternalLink size={18} className="group-hover:scale-110 transition-transform" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl">
                <Megaphone className="mx-auto mb-4 text-gray-400" size={64} />
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  No announcements found
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {filter === 'all' 
                    ? "We don't have any announcements at the moment."
                    : `No ${filter.replace('_', ' ')} announcements available.`}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-dark transition-all hover:scale-105"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
