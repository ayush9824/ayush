import { useState } from 'react'
import SEO from '../components/seo/SEO'
import Section from '../components/Section'
import ContactCTA from '../components/shared/ContactCTA'
import ProjectCard from '../components/work/ProjectCard'
import { projects } from '../data/projects'
import { siteConfig } from '../data/siteConfig'
import { buildBreadcrumbJsonLd } from '../utils/structuredData'
import { cn } from '../utils/cn'

/**
 * Work / Portfolio index page with category filtering.
 *
 * Filter buttons include "All" plus only the categories actually present in
 * the projects data — nothing is invented if data is missing.
 */
export default function WorkPage() {
  const [active, setActive] = useState('All')

  const categories = Array.from(
    new Set(projects.map((p) => p.category.trim()).filter(Boolean)),
  )

  const visible = active === 'All' ? projects : projects.filter((p) => p.category === active)

  return (
    <>
      <SEO
        title={`${siteConfig.name} | Video Editing & Videography Portfolio`}
        description="Selected video editing and videography work across YouTube, Instagram, TikTok and more."
        ogType="website"
        jsonLd={buildBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Work', path: '/work' },
        ])}
      />

      <Section as="section" aria-labelledby="work-heading">
        <p className="mb-4 text-sm uppercase tracking-widest text-bone-400">
          Portfolio
        </p>
        <h1
          id="work-heading"
          className="font-display text-3xl font-semibold tracking-tight text-bone-50 sm:text-4xl"
        >
          Selected Work
        </h1>
        <p className="mt-4 max-w-prose text-bone-300">
          A selection of published projects across platforms. Click any project
          to watch it, or open the original post.
        </p>

        {projects.length === 0 ? (
          <div
            className="mt-10 rounded-lg border border-dashed border-ink-600 p-8 text-sm text-bone-400"
            role="status"
          >
            No projects published yet — add your work to{' '}
            <code className="font-mono text-bone-300">src/data/projects.ts</code>
            .
          </div>
        ) : (
          <>
            <div
              role="group"
              aria-label="Filter projects by category"
              className="mt-8 flex flex-wrap gap-2"
            >
              {['All', ...categories].map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActive(category)}
                  aria-pressed={active === category}
                  className={cn(
                    'rounded-md border px-4 py-2 text-sm font-medium transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950',
                    active === category
                      ? 'border-ember-600 bg-ember-600 text-white shadow-glow-sm'
                      : 'border-ink-600 text-bone-300 hover:border-ember-500/60 hover:text-ember-400',
                  )}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </>
        )}
      </Section>

      <ContactCTA />
    </>
  )
}