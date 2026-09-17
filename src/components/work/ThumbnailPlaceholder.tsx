import { PlayIcon } from '../Icons'

/**
 * Generic professional thumbnail fallback. Rendered when no manual thumbnail
 * and no automatic platform thumbnail is available.
 */
export default function ThumbnailPlaceholder({
  label = 'Thumbnail unavailable',
}: {
  label?: string
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_30%_20%,#12294d_0%,#050B18_65%)]"
    >
      <div className="flex flex-col items-center gap-3 p-6 text-center">
        <PlayIcon className="h-10 w-10 text-ink-600" />
        <span className="text-[10px] uppercase tracking-widest text-bone-500">
          Preview unavailable
        </span>
      </div>
    </div>
  )
}