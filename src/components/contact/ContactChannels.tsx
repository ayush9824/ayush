import { configuredSocials, socialHref } from '../../lib/socialPlatforms'

/**
 * One-click contact channels rendered from src/data/socialLinks.ts.
 *
 * Only accounts that are actually configured appear. Email becomes a mailto:
 * link, WhatsApp phone numbers become wa.me links, and every other channel
 * opens externally in a new tab. Icon buttons carry accessible labels.
 */
export default function ContactChannels({
  className = '',
}: {
  className?: string
}) {
  const items = configuredSocials()

  if (items.length === 0) {
    return (
      <p
        role="status"
        className={`border-l-2 border-ink-700 pl-4 text-sm text-bone-400 ${className}`}
      >
        Add your channels in{' '}
        <code className="font-mono text-bone-300">
          src/data/socialLinks.ts
        </code>{' '}
        and they will appear here.
      </p>
    )
  }

  return (
    <ul
      className={`grid gap-3 sm:grid-cols-2 ${className}`}
      aria-label="Ways to contact me"
    >
      {items.map((item) => {
        const href = socialHref(item.key, item.href)
        const external = item.key !== 'email' && item.key !== 'phone'
        return (
          <li key={item.key}>
            <a
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              className="group flex items-center gap-4 border border-ink-600 bg-ink-900 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-ember-500/60 hover:bg-ink-800 hover:shadow-glow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
            >
              <item.Icon className="h-5 w-5 shrink-0 text-bone-300 transition-colors group-hover:text-ember-400" />
              <span className="text-sm font-medium uppercase tracking-widest text-bone-200">
                {item.label}
              </span>
            </a>
          </li>
        )
      })}
    </ul>
  )
}