import { siteConfig } from '../../data/siteConfig'
import Section from '../Section'
import { ButtonLink, ExternalButtonLink } from '../Button'

interface ContactCTAProps {
  /**
   * Optional external destination for the primary button (e.g. a mailto: link
   * on the contact page). When unset the primary button routes to /contact.
   */
  primaryHref?: string | null
}

/**
 * Consistent contact call-to-action used across the homepage, work, about and
 * contact pages. Uses configured email for a direct email link; internal
 * buttons route to the contact and work pages.
 */
export default function ContactCTA({ primaryHref }: ContactCTAProps) {
  const emailHref = siteConfig.email ? `mailto:${siteConfig.email}` : null

  return (
    <Section
      as="section"
      aria-labelledby="cta-heading"
      className="relative overflow-hidden border-t border-ink-800"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_90%_at_50%_110%,rgba(37,99,235,0.28),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-3xl text-center">
        <p className="text-sm uppercase tracking-widest text-ember-400">
          Contact
        </p>
        <h2
          id="cta-heading"
          className="mt-3 font-display text-3xl font-semibold tracking-tight text-bone-50 text-balance sm:text-5xl"
        >
          Have a project in mind?
        </h2>
        <p className="mt-4 font-display text-xl text-bone-300">
          Let&apos;s create something worth watching.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {primaryHref ? (
            <ExternalButtonLink href={primaryHref} variant="primary">
              Contact Me
            </ExternalButtonLink>
          ) : (
            <ButtonLink to="/contact" variant="primary">
              Contact Me
            </ButtonLink>
          )}
          <ButtonLink to="/work">View My Work</ButtonLink>
        </div>

        {!primaryHref && emailHref && (
          <p className="mt-8 text-sm text-bone-400">
            Or email me directly at{' '}
            <a
              href={emailHref}
              className="font-medium text-ember-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 hover:text-ember-500"
            >
              {siteConfig.email}
            </a>
          </p>
        )}
      </div>
    </Section>
  )
}