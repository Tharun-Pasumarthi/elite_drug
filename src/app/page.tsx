import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSlideshow from '@/components/HeroSlideshow';

const AboutSection = dynamic(() => import('@/components/AboutSection'));
const CategorySection = dynamic(() => import('@/components/CategorySection'));
const RecentlyViewed = dynamic(() => import('@/components/RecentlyViewed'));
const ScrollToTop = dynamic(() => import('@/components/ScrollToTop'));

export default function Home() {
  return (
    <>
      <Header />
      <HeroSlideshow />
      <AboutSection />
      <CategorySection />
      <RecentlyViewed />
      <ScrollToTop />
      <Footer />
    </>
  );
}
