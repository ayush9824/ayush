import { useState } from 'react'
import ThumbnailPlaceholder from './ThumbnailPlaceholder'

interface ThumbnailImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  /** Accessible fallback label used when the image fails to load. */
  fallbackLabel: string
}

/**
 * Thumbnail image that gracefully falls back to the professional placeholder
 * if the source URL is broken / missing (e.g. a removed thumbnail). A bad
 * single image never leaves a broken <img> on screen.
 */
export default function ThumbnailImage({
  src,
  alt,
  width,
  height,
  className = '',
  fallbackLabel,
}: ThumbnailImageProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return <ThumbnailPlaceholder label={fallbackLabel} />
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
    />
  )
}
