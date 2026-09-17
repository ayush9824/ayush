/**
 * Accessible skip link — lets keyboard users jump past the header nav
 * directly to the main content. Hidden until focused.
 */
export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-ember-400 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ink-950"
    >
      Skip to main content
    </a>
  )
}
