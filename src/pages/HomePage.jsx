// import SlideImages from '../components/SlideImages';
import HeroBanner from '../components/home/HeroBanner';
import CategorySection from '../components/home/CategorySection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import TestimonialsSection from '../components/home/TestimonialsSection';
import PromoSection from '../components/home/PromoSection';
import ServicesSection from '../components/home/ServicesSection';
import Footer from '../components/footer/Footer';

export default function HomePage() {
    return (
        <div className="min-h-screen">
          <HeroBanner />
          <CategorySection />
          <FeaturedProducts />
          <TestimonialsSection />
          <PromoSection />
          <ServicesSection />
          <Footer />
        </div>
      );
}




