import SEO from '../components/seo/SEO'
import Section from '../components/Section'
import ContactChannels from '../components/contact/ContactChannels'
import ContactForm from '../components/contact/ContactForm'
import ContactCTA from '../components/shared/ContactCTA'
import { siteConfig } from '../data/siteConfig'
import { configuredSocials, socialHref } from '../lib/socialPlatforms'
import { buildBreadcrumbJsonLd } from '../utils/structuredData'
import { MapPinIcon } from '../components/Icons'

/**
 * Contact page — one-click channels plus a contact form.
 *
 * The headline, email, WhatsApp, social links and form options all render from
 * config in src/data/socialLinks.ts and src/data/contactForm.ts. Only
 * configured accounts are shown.
 */
export default function ContactPage() {
  const { name, email, professionalTitle } = siteConfig
  const emailHref = email ? socialHref('email', email) : null
  const emailConfigured = configuredSocials().some((s) => s.key === 'email')

  return (
    <>
      <SEO
        title={`Contact ${name} | ${professionalTitle}`}
        description={`Contact ${name} — ${professionalTitle}. Ready to start a project? Let's create something worth watching.`}
        canonicalPath="/contact"
        ogType="website"
        jsonLd={buildBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ])}
      />

      <Section as="article" aria-labelledby="contact-heading">
        <p className="text-sm uppercase tracking-widest text-bone-400">
          Contact
        </p>
        <h1
          id="contact-heading"
          className="mt-3 font-display text-4xl font-bold tracking-tighter text-bone-50 text-balance sm:text-5xl"
        >
          Let&apos;s create something worth watching.
        </h1>
        <p className="mt-6 max-w-prose text-lg leading-relaxed text-bone-300">
          Tell me about your project in a sentence or two, or reach out on the
          channel you already use. I&apos;ll get back to you as soon as I can.
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <h2 className="text-sm uppercase tracking-widest text-bone-400">
              Reach Me Directly
            </h2>
            <ContactChannels className="mt-5" />

            {emailConfigured && emailHref && (
              <p className="mt-6 text-sm text-bone-400">
                Prefer email? Write to{' '}
                <a
                  href={emailHref}
                  className="font-medium text-ember-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 hover:text-ember-500"
                >
                  {email}
                </a>{' '}
                and I&apos;ll reply directly.
              </p>
            )}

            {siteConfig.location && (
              <p className="mt-6 flex items-center gap-2 text-sm text-bone-400">
                <MapPinIcon className="h-4 w-4 shrink-0 text-ember-400" />
                Based in {siteConfig.location}
              </p>
            )}
          </div>

          <ContactForm />
        </div>
      </Section>

      <ContactCTA primaryHref={emailHref} />
    </>
  )
}