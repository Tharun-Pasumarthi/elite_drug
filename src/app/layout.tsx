import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/contexts/ThemeContext';
import AnnouncementBar from '@/components/AnnouncementBar';

export const metadata: Metadata = {
  title: 'Elite Drug - Professional Medical Products & Healthcare Solutions',
  description: 'Leading provider of innovative medical technology and comprehensive healthcare solutions. Browse our extensive range of pharmaceutical products, nutritional supplements, and medical equipment.',
  keywords: ['medical products', 'healthcare', 'pharmaceuticals', 'nutritional supplements', 'medical equipment', 'Elite Drug', 'health solutions'],
  authors: [{ name: 'Elite Drug' }],
  creator: 'Elite Drug',
  publisher: 'Elite Drug',
  metadataBase: new URL('https://elitedrug.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://elitedrug.com',
    title: 'Elite Drug - Professional Medical Products & Healthcare Solutions',
    description: 'Leading provider of innovative medical technology and comprehensive healthcare solutions. Browse our extensive range of pharmaceutical products.',
    siteName: 'Elite Drug',
    images: [
      {
        url: '/icon.svg',
        width: 256,
        height: 256,
        alt: 'Elite Drug Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elite Drug - Professional Medical Products',
    description: 'Leading provider of innovative medical technology and comprehensive healthcare solutions.',
    images: ['/icon.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon.svg', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-icon.svg', type: 'image/svg+xml' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <AnnouncementBar />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
