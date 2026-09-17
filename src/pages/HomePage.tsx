import SEO from '../components/seo/SEO'
import Hero from '../components/home/Hero'
import FeaturedWork from '../components/home/FeaturedWork'
import Services from '../components/home/Services'
import AboutPreview from '../components/home/AboutPreview'
import SocialSection from '../components/home/SocialSection'
import ContactCTA from '../components/shared/ContactCTA'
import { siteConfig } from '../data/siteConfig'
import {
  buildBreadcrumbJsonLd,
  buildPersonJsonLd,
  buildProfessionalServiceJsonLd,
  buildWebSiteJsonLd,
} from '../utils/structuredData'

/**
 * Homepage — cinematic hero, featured work, services, about preview,
 * social links and a final contact CTA.
 */
export default function HomePage() {
  const jsonLd = [
    buildWebSiteJsonLd(),
    buildPersonJsonLd(),
    buildProfessionalServiceJsonLd(),
    buildBreadcrumbJsonLd([{ name: 'Home', path: '/' }]),
  ].filter(Boolean)

  return (
    <>
      <SEO
        title={undefined}
        description={`Portfolio of ${siteConfig.name}, a ${siteConfig.professionalTitle} based in Kathmandu, Nepal.`}
        ogType="website"
        jsonLd={jsonLd.length > 0 ? jsonLd : null}
      />

      <Hero />
      <FeaturedWork />
      <Services />
      <AboutPreview />
      <SocialSection />
      <ContactCTA />
    </>
  )
}