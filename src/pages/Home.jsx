import Hero from '../components/home/Hero'
import FeaturedCategories from '../components/home/FeaturedCategories'
import FeaturedProducts from '../components/home/FeaturedProducts'
import PromoBanner from '../components/home/PromoBanner'
import BestSellers from '../components/home/BestSellers'
import WhyChooseUs from '../components/home/WhyChooseUs'
import LifestyleSection from '../components/home/LifestyleSection'
import Testimonials from '../components/home/Testimonials'
import BrandStrip from '../components/home/BrandStrip'
import NewsletterBand from '../components/home/NewsletterBand'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

/** The marketing home page — one scroll from hero to newsletter. */
export function Home() {
  useDocumentTitle('Premium Sports Nutrition & Gym Gear')

  return (
    <>
      <Hero />
      <FeaturedCategories />
      <FeaturedProducts />
      <PromoBanner />
      <BestSellers />
      <WhyChooseUs />
      <LifestyleSection />
      <Testimonials />
      <BrandStrip />
      <NewsletterBand />
    </>
  )
}

export default Home
