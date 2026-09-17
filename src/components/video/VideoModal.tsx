import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { ButtonLink, ExternalButtonLink } from '../Button'
import { CloseIcon } from '../Icons'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useVideoMetadata } from '../../hooks/useVideoMetadata'
import { PLATFORM_LABELS } from '../../lib/platforms'
import type { Project } from '../../data/projects'
import { cn } from '../../utils/cn'
import VideoEmbed from '../work/VideoEmbed'

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * In-page video modal.
 *
 * The portal overlay stays mounted for the whole session and only toggles
 * visibility via motion state, so React never re-wires DOM event handling on
 * open/close. While open it locks background scroll, traps focus, closes on
 * Escape/backdrop click and restores focus to the trigger on close. Respects
 * prefers-reduced-motion.
 */
export default function VideoModal({
  project,
  onClose,
}: {
  project: Project | null
  onClose: () => void
}) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const reduced = useReducedMotion()
  const open = project !== null
  const { metadata } = useVideoMetadata(
    project ?? { videoUrl: '', thumbnailUrl: null },
  )

  useEffect(() => {
    if (!open) return undefined

    const previouslyFocused = document.activeElement as HTMLElement | null
    const originalOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose()
        return
      }
      if (event.key !== 'Tab') return

      const panel = panelRef.current
      if (!panel) return

      const focusables = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => el.offsetParent !== null)

      if (focusables.length === 0) return

      const first = focusables[0]
      const last = focusables[focusables.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown, true)
    return () => {
      document.removeEventListener('keydown', onKeyDown, true)
      document.body.style.overflow = originalOverflow
      previouslyFocused?.focus()
    }
  }, [open, onClose])

  const transition = { duration: reduced ? 0 : 0.2, ease: 'easeOut' } as const

  const platform =
    metadata.platform !== 'other' ? metadata.platform : project?.platform

  return createPortal(
    <motion.div
      initial={false}
      animate={{ opacity: open ? 1 : 0 }}
      transition={transition}
      aria-hidden={!open}
      onClick={onClose}
      className={cn(
        'fixed inset-0 z-[100] flex overflow-y-auto bg-ink-950/85 p-4 backdrop-blur-sm sm:p-6',
        open ? 'visible' : 'pointer-events-none invisible',
      )}
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="video-modal-title"
        initial={false}
        animate={{ opacity: open ? 1 : 0, scale: open ? 1 : 0.98, y: open ? 0 : 8 }}
        transition={transition}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          'm-auto w-full max-w-4xl border border-ink-600/70 bg-ink-900 shadow-[0_25px_60px_-12px_rgba(0,0,0,0.9),0_0_70px_-15px_rgba(37,99,235,0.45)]',
          open ? 'visible' : 'pointer-events-none invisible',
        )}
      >
        {project && (
          <>
            <header className="flex items-start justify-between gap-4 border-b border-ink-800 px-5 py-4 sm:px-7 sm:py-5">
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-widest text-bone-500">
                  Now Playing
                </p>
                <h2
                  id="video-modal-title"
                  className="mt-1 truncate font-display text-lg font-semibold text-bone-50 sm:text-xl"
                >
                  {project.title}
                </h2>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close video"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-ink-600 text-bone-300 transition-colors hover:border-ember-400 hover:text-ember-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </header>

            <div className="p-5 sm:p-7">
              <VideoEmbed project={project} />

              <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
                <MetaItem label="Category" value={project.category} />
                <MetaItem label="Year" value={String(project.year)} />
                <MetaItem label="Role" value={project.role} />
                <MetaItem
                  label="Platform"
                  value={PLATFORM_LABELS[platform ?? project.platform]}
                />
              </dl>

              <p className="mt-5 text-sm leading-relaxed text-bone-300">
                {project.description}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <ExternalButtonLink
                  href={project.videoUrl}
                  target="_blank"
                  variant="primary"
                >
                  Watch Original
                </ExternalButtonLink>
                <ButtonLink to={`/work/${project.slug}`} onClick={onClose}>
                  View Full Details
                </ButtonLink>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>,
    document.body,
  )
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-widest text-bone-500">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-bone-100">{value}</dd>
    </div>
  )
}