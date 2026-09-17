import { Link } from 'react-router-dom'
import SEO from '../components/seo/SEO'
import Section from '../components/Section'

export default function NotFoundPage() {
  return (
    <>
      <SEO
        title="Page Not Found"
        description="The page you were looking for could not be found."
        ogType="website"
        noindex
      />
      <Section as="section" aria-labelledby="notfound-heading">
        <p className="mb-4 text-sm uppercase tracking-widest text-bone-400">
          404
        </p>
        <h1
          id="notfound-heading"
          className="font-display text-3xl font-semibold tracking-tight text-bone-50 sm:text-4xl"
        >
          Page Not Found
        </h1>
        <p className="mt-6 max-w-prose text-lg text-bone-300">
          The page you were looking for doesn&apos;t exist or has moved.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block rounded-md border border-ink-600 px-4 py-2 text-sm font-medium text-bone-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 hover:border-ember-500/60 hover:text-ember-400"
        >
          Back home
        </Link>
      </Section>
    </>
  )
}