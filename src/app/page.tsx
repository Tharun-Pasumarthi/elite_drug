import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSlideshow from '@/components/HeroSlideshow';
import AboutSection from '@/components/AboutSection';
import CategorySection from '@/components/CategorySection';
import RecentlyViewed from '@/components/RecentlyViewed';
import ScrollToTop from '@/components/ScrollToTop';

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
