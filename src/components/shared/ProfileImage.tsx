import { useState } from 'react'

interface ProfileImageProps {
  src: string | null
  name: string
}

/**
 * Profile photo with a graceful "coming soon" frame fallback.
 *
 * When no photo is configured, or the configured photo fails to load, a
 * neutral portrait frame is shown instead of a broken image.
 */
export default function ProfileImage({ src, name }: ProfileImageProps) {
  const [failed, setFailed] = useState(false)
  const showFrame = !src || failed

  if (showFrame) {
    return (
      <div
        role="img"
        aria-label={`Portrait of ${name}${src ? ' — unavailable' : ' — coming soon'}`}
        className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_30%_20%,#12294d_0%,#050B18_65%)]"
      >
        <span className="text-xs uppercase tracking-widest text-bone-500">
          Portrait
        </span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={`Portrait of ${name}`}
      width={800}
      height={1000}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className="h-full w-full object-cover"
    />
  )
}
