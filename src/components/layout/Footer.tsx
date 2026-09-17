import { Link } from 'react-router-dom'
import { siteConfig } from '../../data/siteConfig'
import { socialLinks } from '../../data/socialLinks'
import { configuredSocialProfiles, socialHref } from '../../lib/socialPlatforms'
import { ExternalButtonLink } from '../Button'

const navItems = [
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Footer() {
  const activeSocials = configuredSocialProfiles()
  const emailHref = socialLinks.email
    ? socialHref('email', socialLinks.email)
    : null

  return (
    <footer className="border-t border-ink-700/60 bg-ink-900">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[2fr_1fr_1.4fr]">
        <div className="flex flex-col items-start gap-3">
          <p className="font-display text-xl font-semibold text-bone-50">
            {siteConfig.name}
          </p>
          <p className="text-xs uppercase tracking-widest text-bone-400">
            {siteConfig.professionalTitle}
          </p>
          <p className="mt-1 max-w-xs text-sm leading-relaxed text-bone-400">
            {siteConfig.description}
          </p>
          {emailHref && (
            <ExternalButtonLink href={emailHref} variant="outline" className="mt-2 px-4 py-2">
              Start a Project
            </ExternalButtonLink>
          )}
        </div>

        <nav aria-label="Footer">
          <h2 className="text-xs uppercase tracking-widest text-bone-500">
            Pages
          </h2>
          <ul className="mt-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="rounded text-sm text-bone-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-400 hover:text-ember-400"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xs uppercase tracking-widest text-bone-500">
            Follow
          </h2>
          {activeSocials.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-3">
              {activeSocials.map((s) => (
                <li key={s.key}>
                  <a
                    href={socialHref(s.key, s.href)}
                    target={s.key === 'email' ? undefined : '_blank'}
                    rel={s.key === 'email' ? undefined : 'noopener noreferrer'}
                    aria-label={s.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-ink-600 text-bone-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-ember-400/70 hover:text-ember-400 hover:shadow-glow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
                  >
                    <s.Icon className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-bone-500">
              Social links will appear here once configured.
            </p>
          )}
        </div>
      </div>

      <div className="border-t border-ink-800 py-4">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="text-xs text-bone-500">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
          {siteConfig.email && (
            <a
              href={socialHref('email', siteConfig.email)}
              className="rounded text-xs text-bone-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-400 hover:text-ember-400"
            >
              Email me
            </a>
          )}
        </div>
      </div>
    </footer>
  )
}