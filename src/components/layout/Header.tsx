import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { siteConfig } from '../../data/siteConfig'
import useReducedMotion from '../../hooks/useReducedMotion'
import { cn } from '../../utils/cn'
import { ButtonLink } from '../Button'
import { CloseIcon, MenuIcon } from '../Icons'

const navItems = [
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

function navLinkClass(isActive: boolean): string {
  return cn(
    'rounded-md px-3 py-2 text-sm font-medium transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950',
    isActive ? 'text-ember-400' : 'text-bone-300 hover:text-ember-400',
  )
}

/**
 * Responsive header: logo, desktop nav + CTA, and a keyboard-accessible
 * animated mobile menu.
 */
export default function Header() {
  const [open, setOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const wasOpen = useRef(false)
  const hamburgerRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)
  const { pathname } = useLocation()
  const reduce = useReducedMotion()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const update = () => setIsMobile(!mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (open) {
      firstLinkRef.current?.focus()
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setOpen(false)
      }
      document.addEventListener('keydown', onKeyDown)
      return () => document.removeEventListener('keydown', onKeyDown)
    }
    return undefined
  }, [open])

  // Return focus to the hamburger button when the menu closes.
  useEffect(() => {
    if (wasOpen.current && !open) {
      hamburgerRef.current?.focus()
    }
    wasOpen.current = open
  }, [open])

  return (
    <header className="sticky top-0 z-40 border-b border-ink-600/50 bg-ink-950/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <NavLink
          to="/"
          end
          className="font-display text-sm font-semibold uppercase tracking-widest text-bone-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 hover:text-ember-400"
          aria-label={`${siteConfig.name} — home`}
        >
          {siteConfig.name}
        </NavLink>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className={({ isActive }) => navLinkClass(isActive)}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <ButtonLink to="/contact" variant="primary" className="hidden px-4 py-2 md:inline-flex">
            Let&apos;s Talk
          </ButtonLink>

          <button
            ref={hamburgerRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex items-center justify-center rounded-md border border-ink-600 p-2 text-bone-200 transition-colors hover:border-ember-400/70 hover:text-ember-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 md:hidden"
          >
            {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobile && open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-ink-700/60 md:hidden"
          >
            <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4 sm:px-8">
              {navItems.map((item, index) => (
                <li key={item.to}>
                  <NavLink
                    ref={index === 0 ? firstLinkRef : undefined}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) => navLinkClass(isActive)}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
              <li className="pt-2">
                <ButtonLink
                  to="/contact"
                  variant="primary"
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  Let&apos;s Talk
                </ButtonLink>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}