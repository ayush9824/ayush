import type { MouseEventHandler, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../utils/cn'

type Variant = 'primary' | 'outline'

const base =
  'inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium uppercase tracking-widest transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950'

const variants: Record<Variant, string> = {
  primary:
    'bg-ember-600 text-white shadow-glow-sm hover:bg-ember-500 hover:shadow-glow hover:scale-[1.02]',
  outline:
    'border border-ember-600 text-bone-100 hover:border-ember-400 hover:text-white hover:shadow-glow-sm hover:bg-ember-600/5',
}

interface ButtonLinkProps {
  to: string
  variant?: Variant
  className?: string
  children: ReactNode
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

export function ButtonLink({
  to,
  variant = 'outline',
  className,
  children,
  onClick,
}: ButtonLinkProps) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(base, variants[variant], className)}
    >
      {children}
    </Link>
  )
}

interface ExternalButtonLinkProps {
  href: string
  variant?: Variant
  className?: string
  children: ReactNode
  target?: string
}

export function ExternalButtonLink({
  href,
  variant = 'outline',
  className,
  children,
  target,
}: ExternalButtonLinkProps) {
  return (
    <a
      href={href}
      target={target}
      rel={target ? 'noopener noreferrer' : undefined}
      className={cn(base, variants[variant], className)}
    >
      {children}
    </a>
  )
}