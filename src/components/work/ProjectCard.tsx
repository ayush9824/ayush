import { Link } from 'react-router-dom'
import type { Project } from '../../data/projects'
import { useVideoModal } from '../../hooks/useVideoModal'
import { useVideoMetadata } from '../../hooks/useVideoMetadata'
import { PLATFORM_LABELS } from '../../lib/platforms'
import { PlayIcon } from '../Icons'
import ThumbnailImage from './ThumbnailImage'
import ThumbnailPlaceholder from './ThumbnailPlaceholder'

/**
 * Premium project card used across the site.
 *
 * Clicking a card opens the in-page video modal (click-to-play, no iframe
 * before the user asks); a discreet "View details" link keeps the deep-link /
 * /work/:slug page reachable for SEO. The thumbnail follows the priority chain
 * (manual → automatic platform → runtime platform → generic placeholder). The
 * aspect-ratio container and explicit image dimensions reserve space to avoid
 * layout shift, and images are lazy-loaded.
 */
export default function ProjectCard({ project }: { project: Project }) {
  const { metadata, thumbnailUrl } = useVideoMetadata(project)
  const { openVideo } = useVideoModal()

  const platform =
    metadata.platform !== 'other' ? metadata.platform : project.platform

  return (
    <article className="group">
      <button
        type="button"
        onClick={() => openVideo(project)}
        aria-haspopup="dialog"
        aria-label={`Play ${project.title}`}
        className="block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
      >
        <div className="relative aspect-video overflow-hidden border border-ink-700/60 bg-ink-900 transition-all duration-300 group-hover:border-ember-500/70 group-hover:shadow-glow">
          {thumbnailUrl ? (
            <ThumbnailImage
              src={thumbnailUrl}
              alt={project.title}
              width={480}
              height={270}
              fallbackLabel={`${project.title} — thumbnail unavailable`}
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          ) : (
            <ThumbnailPlaceholder label={`${project.title} — thumbnail unavailable`} />
          )}

          {/* Hover overlay */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-ember-600/0 transition-colors duration-300 group-hover:bg-ember-600/25"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-bone-50/30 bg-ink-950/60 backdrop-blur-sm transition-all duration-300 group-hover:border-ember-400 group-hover:bg-ember-600/90 group-hover:shadow-glow">
              <PlayIcon className="ml-0.5 h-5 w-5 text-bone-50" />
            </span>
          </div>

          {/* Platform badge */}
          <span className="absolute right-3 top-3 border border-ember-400/25 bg-ink-950/70 px-2 py-1 text-[10px] uppercase tracking-widest text-bone-200 backdrop-blur-sm">
            {PLATFORM_LABELS[platform]}
          </span>
        </div>
      </button>

      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate font-display text-lg font-medium text-bone-100 transition-colors group-hover:text-ember-400">
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-bone-400">{project.category}</p>
          <Link
            to={`/work/${project.slug}`}
            className="mt-2 inline-flex text-xs font-medium uppercase tracking-widest text-bone-500 transition-colors hover:text-ember-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
          >
            View details &rarr;
          </Link>
        </div>
        <p
          className="shrink-0 text-sm text-bone-500"
          aria-label={`Year ${project.year}`}
        >
          {project.year}
        </p>
      </div>
    </article>
  )
}