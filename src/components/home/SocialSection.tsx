import { configuredSocialProfiles, socialHref } from '../../lib/socialPlatforms'
import Section from '../Section'

/**
 * Social media section. Only renders social-network profiles that have a URL
 * configured in src/data/socialLinks.ts — empty accounts are never shown, and
 * contact channels (email, WhatsApp, phone) are intentionally excluded here.
 */
export default function SocialSection() {
  const items = configuredSocialProfiles()

  return (
    <Section as="section" aria-labelledby="social-heading">
      <div className="max-w-2xl">
        <p className="text-sm uppercase tracking-widest text-ember-400">
          Find Me Online
        </p>
        <h2
          id="social-heading"
          className="mt-3 font-display text-3xl font-semibold tracking-tight text-bone-50 sm:text-4xl"
        >
          Follow the Work
        </h2>
        <p className="mt-4 text-bone-300">
          New edits, behind the scenes and published work, in one place.
        </p>
      </div>

      {items.length > 0 ? (
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.key}>
              <a
                href={socialHref(item.key, item.href)}
                target={item.key === 'email' ? undefined : '_blank'}
                rel={item.key === 'email' ? undefined : 'noopener noreferrer'}
                className="group flex h-full items-center gap-4 border border-ink-600 bg-ink-900 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-ember-500/60 hover:bg-ink-800 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ember-400"
              >
                <item.Icon className="h-6 w-6 shrink-0 text-bone-300 transition-colors group-hover:text-ember-400" />
                <span className="text-sm font-medium uppercase tracking-widest text-bone-200 transition-colors group-hover:text-ember-400">
                  {item.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p
          role="status"
          className="mt-8 border-l-2 border-ink-700 pl-4 text-sm text-bone-400"
        >
          Add your profiles in{' '}
          <code className="font-mono text-bone-300">socialLinks.ts</code> and
          your channels will appear here.
        </p>
      )}
    </Section>
  )
}