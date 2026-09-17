import { useState } from 'react'
import type { Project } from '../../data/projects'
import { useVideoMetadata } from '../../hooks/useVideoMetadata'
import { PlayIcon } from '../Icons'
import ThumbnailImage from './ThumbnailImage'
import ThumbnailPlaceholder from './ThumbnailPlaceholder'

/**
 * Click-to-play video embed.
 *
 * Shows the thumbnail/poster first and only mounts the embed iframe after the
 * user presses play — no iframes load on the work page itself. Unsupported or
 * unrecognized URLs render a graceful "Preview unavailable" fallback.
 */
export default function VideoEmbed({ project }: { project: Project }) {
  const { metadata, thumbnailUrl } = useVideoMetadata(project)
  const [playing, setPlaying] = useState(false)

  const embedUrl = metadata.supported ? metadata.embedUrl : null

  if (playing && embedUrl) {
    return (
      <div className="relative aspect-video w-full overflow-hidden border border-ink-700/60 bg-ink-900">
        <iframe
          src={embedUrl}
          title={`Play ${project.title}`}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
    )
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden border border-ink-700/60 bg-ink-900">
      <div className="relative h-full w-full">
        {thumbnailUrl ? (
          <ThumbnailImage
            src={thumbnailUrl}
            alt={`${project.title} — video preview`}
            width={1280}
            height={720}
            fallbackLabel={`${project.title} — video preview`}
            className="h-full w-full object-cover"
          />
        ) : (
          <ThumbnailPlaceholder label={`${project.title} — video preview`} />
        )}

        {embedUrl ? (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play ${project.title}`}
            className="group absolute inset-0 flex h-full w-full items-center justify-center bg-ink-950/20 transition-colors hover:bg-ink-950/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ember-400"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-bone-50/25 bg-ink-950/60 backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:border-ember-400 group-hover:bg-ember-600/90 group-hover:shadow-glow">
              <PlayIcon className="ml-1 h-6 w-6 text-bone-50" />
            </span>
          </button>
        ) : (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-ink-950/70 p-6 text-center"
            role="status"
          >
            <p className="text-sm text-bone-300">
              Unable to display this video here.
            </p>
            <a
              href={project.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium uppercase tracking-widest text-ember-400 transition-colors hover:text-ember-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
            >
              Watch Original
            </a>
          </div>
        )}
      </div>
    </div>
  )
}