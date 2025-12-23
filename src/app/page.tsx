import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSlideshow from '@/components/HeroSlideshow';
import AboutSection from '@/components/AboutSection';
import ProductsSection from '@/components/ProductsSection';

export default function Home() {
  return (
    <>
      <Header />
      <HeroSlideshow />
      <AboutSection />
      <ProductsSection />
      <Footer />
    </>
  );
}
