import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Footer from './layout/Footer'
import Header from './layout/Header'
import SkipLink from './layout/SkipLink'

/**
 * Root layout wrapping every route with shared semantic structure.
 *
 * Uses Outlet for nested routing and a lightweight AnimatePresence page
 * transition keyed on the current pathname.
 */
export default function Layout() {
  const { pathname } = useLocation()

  return (
    <div className="flex min-h-screen flex-col bg-ink-950 bg-[radial-gradient(90%_40%_at_50%_-10%,rgba(37,99,235,0.10),transparent_65%)] text-bone-100 antialiased">
      <SkipLink />
      <Header />
      <main id="main-content" className="flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}
