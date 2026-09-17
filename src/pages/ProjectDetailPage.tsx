import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import SEO from '../components/seo/SEO'
import Section from '../components/Section'
import VideoEmbed from '../components/work/VideoEmbed'
import { ExternalButtonLink } from '../components/Button'
import NotFoundPage from './NotFoundPage'
import { projects } from '../data/projects'
import { siteConfig } from '../data/siteConfig'
import { PLATFORM_LABELS } from '../lib/platforms'
import { useVideoMetadata } from '../hooks/useVideoMetadata'
import {
  buildBreadcrumbJsonLd,
  buildVideoObjectJsonLd,
} from '../utils/structuredData'

/**
 * Project detail page.
 *
 * Displays the click-to-play embed, full project metadata, a "Watch Original"
 * link that always points back to the published post, dynamic per-project SEO
 * and Schema.org VideoObject structured data.
 */
export default function ProjectDetailPage() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)

  // Same hook used by cards, so the effective thumbnail (and any fetched
  // Vimeo thumbnail) is shared across grid + detail views.
  const { metadata, thumbnailUrl } = useVideoMetadata(
    project ?? { videoUrl: '', thumbnailUrl: null },
  )

  const jsonLd = useMemo(() => {
    if (!project || !metadata) return null
    return [
      buildVideoObjectJsonLd(project, metadata, thumbnailUrl),
      buildBreadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Work', path: '/work' },
        { name: project.title, path: `/work/${project.slug}` },
      ]),
    ]
  }, [project, metadata, thumbnailUrl])

  if (!project) {
    return <NotFoundPage />
  }

  const platformLabel = PLATFORM_LABELS[metadata?.platform ?? project.platform]
  const canonicalPath = `/work/${project.slug}`

  return (
    <>
      <SEO
        title={`${project.title} | ${siteConfig.name}`}
        description={project.description}
        canonicalPath={canonicalPath}
        ogImage={thumbnailUrl ?? undefined}
        ogType="video.other"
        jsonLd={jsonLd}
      />

      <Section as="article" aria-labelledby="project-title">
        <p className="text-sm uppercase tracking-widest text-bone-400">
          Project — {platformLabel}
        </p>
        <h1
          id="project-title"
          className="mt-3 font-display text-3xl font-semibold tracking-tight text-bone-50 text-balance sm:text-4xl md:text-5xl"
        >
          {project.title}
        </h1>

        <div className="mt-8">
          <VideoEmbed project={project} />
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div>
            <h2 className="text-sm uppercase tracking-widest text-bone-500">
              About this project
            </h2>
            <p className="mt-4 max-w-prose text-lg leading-relaxed text-bone-300">
              {project.description}
            </p>
            <Link
              to="/work"
              className="mt-6 inline-flex text-sm font-medium uppercase tracking-widest text-bone-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 hover:text-ember-400"
            >
              &larr; Back to Work
            </Link>
          </div>

          <dl className="border-t border-ink-800">
            <DetailRow label="Category" value={project.category} />
            <DetailRow label="Year" value={String(project.year)} />
            <DetailRow label="Role" value={project.role} />
            {project.client && <DetailRow label="Client" value={project.client} />}
            <DetailRow label="Platform" value={platformLabel} />
          </dl>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <ExternalButtonLink
            href={project.videoUrl}
            target="_blank"
            variant="primary"
          >
            Watch Original
          </ExternalButtonLink>
        </div>
      </Section>
    </>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-ink-800 py-3">
      <dt className="text-xs uppercase tracking-widest text-bone-500">
        {label}
      </dt>
      <dd className="text-right text-sm text-bone-100">{value}</dd>
    </div>
  )
}