import { HeroSection } from '../../components/common/HeroSection'
import { ClientLogosMarquee } from '../../components/common/ClientLogosMarquee'
import { CompanyOverviewSection } from '../../components/common/CompanyOverviewSection'
import { ProductsOrServicesSection } from '../../components/common/ProductsOrServicesSection'
import { TestimonialsSection } from '../../components/common/TestimonialsSection'
import { StatisticsCounterSection } from '../../components/common/StatisticsCounterSection'
import { CTASection } from '../../components/common/CTASection'
import { Footer } from '../../components/common/Footer'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ClientLogosMarquee />
      <CompanyOverviewSection />
      <ProductsOrServicesSection />
      <TestimonialsSection />
      <StatisticsCounterSection />
      <CTASection />
      <Footer />
    </main>
  )
}
