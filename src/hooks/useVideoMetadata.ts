import { useEffect, useMemo, useState } from 'react'
import { getVideoMetadata } from '../utils/videoMetadata'
import type { Project } from '../data/projects'

/**
 * Module-level cache so the same Vimeo oEmbed URL is only fetched once
 * across the whole session (grid cards + detail page share thumbnails).
 */
const vimeoThumbnailCache = new Map<string, string | null>()

async function fetchVimeoThumbnail(videoUrl: string): Promise<string | null> {
  if (vimeoThumbnailCache.has(videoUrl)) {
    return vimeoThumbnailCache.get(videoUrl) ?? null
  }

  try {
    const query = encodeURIComponent(videoUrl)
    const res = await fetch(
      `https://vimeo.com/api/oembed.json?url=${query}`,
      { headers: { accept: 'application/json' } },
    )
    if (!res.ok) {
      vimeoThumbnailCache.set(videoUrl, null)
      return null
    }
    const data = (await res.json()) as { thumbnail_url?: string }
    const thumbnail = data.thumbnail_url ?? null
    vimeoThumbnailCache.set(videoUrl, thumbnail)
    return thumbnail
  } catch {
    vimeoThumbnailCache.set(videoUrl, null)
    return null
  }
}

interface UseVideoMetadataResult {
  /** Platform + embed info derived from the video URL. */
  metadata: ReturnType<typeof getVideoMetadata>
  /**
   * Effective thumbnail following the priority chain:
   * 1. manual project.thumbnailUrl
   * 2. automatic platform thumbnail (YouTube)
   * 3. platform thumbnail resolved at runtime (Vimeo oEmbed)
   * 4. null → caller renders the generic professional placeholder
   */
  thumbnailUrl: string | null
}

/**
 * Derives video metadata for a project and resolves the effective thumbnail.
 */
export function useVideoMetadata(
  project: Pick<Project, 'videoUrl' | 'thumbnailUrl'>,
): UseVideoMetadataResult {
  const metadata = useMemo(
    () => getVideoMetadata(project.videoUrl),
    [project.videoUrl],
  )

  const [vimeoThumbnail, setVimeoThumbnail] = useState<string | null>(null)

  useEffect(() => {
    if (metadata.platform !== 'vimeo' || project.thumbnailUrl) {
      setVimeoThumbnail(null)
      return undefined
    }

    let active = true
    void fetchVimeoThumbnail(metadata.originalUrl).then((thumb) => {
      if (active) setVimeoThumbnail(thumb)
    })
    return () => {
      active = false
    }
  }, [metadata, project.thumbnailUrl])

  const thumbnailUrl =
    project.thumbnailUrl ?? metadata.thumbnailUrl ?? vimeoThumbnail

  return { metadata, thumbnailUrl }
}

export default useVideoMetadata