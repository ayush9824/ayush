/**
 * Video URL metadata parsing.
 *
 * Detects the platform a published video URL belongs to and derives the
 * video id, an embed URL (for click-to-play playback) and — where a public
 * thumbnail can be obtained WITHOUT scraping, private accounts or API
 * credentials — a thumbnail URL.
 *
 * Supported platforms:
 *  - YouTube (watch / shorts / youtu.be / embed / live)
 *  - Instagram (reels / posts / video posts)
 *  - TikTok (video embed ids)
 *  - Facebook (watch / page videos / fb.watch)
 *  - Vimeo (plain / channels / groups / player)
 *
 * Design rules:
 *  - No scraping of HTML pages.
 *  - No private API credentials in frontend code.
 *  - Platforms with no reliable public thumbnail (Instagram, TikTok,
 *    Facebook) intentionally return `thumbnailUrl: null` so the caller can
 *    fall back to a manually configured thumbnail or a generic placeholder.
 *  - Vimeo thumbnails require the public oEmbed endpoint, so they are
 *    resolved asynchronously by the calling code rather than here.
 */

export type VideoPlatform =
  | 'youtube'
  | 'instagram'
  | 'tiktok'
  | 'facebook'
  | 'vimeo'
  | 'other'

export interface VideoMetadata {
  platform: VideoPlatform
  videoId: string | null
  /** The original user-supplied URL, preserved as-is. */
  originalUrl: string
  /** iframe embed URL safe to load on user interaction (click to play). */
  embedUrl: string | null
  /** Deterministic public thumbnail, when one exists. */
  thumbnailUrl: string | null
  thumbnailSource: 'automatic' | null
  supported: boolean
}

const YT_ID_RE = /^[A-Za-z0-9_-]{6,30}$/
const INSTA_CODE_RE = /^[\w-]{5,30}$/
const NUMERIC_ID_RE = /^\d{4,12}$/

function unsupported(
  originalUrl: string,
  platform: VideoPlatform = 'other',
): VideoMetadata {
  return {
    platform,
    videoId: null,
    originalUrl,
    embedUrl: null,
    thumbnailUrl: null,
    thumbnailSource: null,
    supported: false,
  }
}

function youtube(url: URL, originalUrl: string): VideoMetadata {
  let videoId: string | null = null

  if (url.hostname === 'youtu.be') {
    videoId = url.pathname.split('/')[1] ?? null
  } else {
    const match = url.pathname.match(/^\/(?:shorts|embed|live|v|watch)\/([^/]+)/)
    if (match) videoId = match[1]
    else videoId = url.searchParams.get('v')
  }

  if (!videoId || !YT_ID_RE.test(videoId)) {
    return unsupported(originalUrl, 'youtube')
  }

  return {
    platform: 'youtube',
    videoId,
    originalUrl,
    embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`,
    thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    thumbnailSource: 'automatic',
    supported: true,
  }
}

function instagram(url: URL, originalUrl: string): VideoMetadata {
  const match = url.pathname.match(/^\/(p|reel|reels|tv)\/([^/]+)/)
  if (!match) return unsupported(originalUrl, 'instagram')

  const kind = match[1]
  const code = match[2]

  if (!INSTA_CODE_RE.test(code)) {
    return unsupported(originalUrl, 'instagram')
  }

  const embedKind = kind === 'p' ? 'p' : kind === 'reels' ? 'reel' : kind
  const embedUrl = `https://www.instagram.com/${embedKind}/${code}/embed${
    kind === 'p' ? '/captioned' : ''
  }/`

  return {
    platform: 'instagram',
    videoId: code,
    originalUrl,
    embedUrl,
    // No scraping: no reliable public thumbnail without the owner's media.
    thumbnailUrl: null,
    thumbnailSource: null,
    supported: true,
  }
}

function tiktok(url: URL, originalUrl: string): VideoMetadata {
  // Short share links (vm.tiktok.com) can't be resolved statically.
  if (url.hostname === 'vm.tiktok.com' || url.hostname === 'vt.tiktok.com') {
    return unsupported(originalUrl, 'tiktok')
  }

  const profileMatch = url.pathname.match(
    /^\/@[^/]+\/(?:video|photo)\/(\d{6,25})/,
  )
  const embedMatch = url.pathname.match(/^\/embed\/v2\/(\d{6,25})/)
  const videoId = profileMatch?.[1] ?? embedMatch?.[1] ?? null

  if (!videoId) return unsupported(originalUrl, 'tiktok')

  return {
    platform: 'tiktok',
    videoId,
    originalUrl,
    embedUrl: `https://www.tiktok.com/embed/v2/${videoId}`,
    // No public thumbnail endpoint without the undocumented API.
    thumbnailUrl: null,
    thumbnailSource: null,
    supported: true,
  }
}

function facebook(url: URL, originalUrl: string): VideoMetadata {
  let videoId: string | null = null

  if (url.hostname === 'fb.watch') {
    videoId = url.pathname.split('/')[1] ?? url.searchParams.get('v') ?? null
  } else if (url.pathname === '/watch' || url.pathname.startsWith('/watch/')) {
    videoId = url.searchParams.get('v')
  } else {
    const pageVideo = url.pathname.match(/\/videos\/(\d+)/)
    const queryVideo = url.searchParams.get('v')
    videoId = pageVideo?.[1] ?? queryVideo
  }

  if (!videoId) return unsupported(originalUrl, 'facebook')

  const encode = (href: string) => encodeURIComponent(href)
  return {
    platform: 'facebook',
    videoId,
    originalUrl,
    // Officially supported video plugin, referencing the original public URL.
    embedUrl: `https://www.facebook.com/plugins/video.php?height=476&href=${encode(
      originalUrl,
    )}&show_text=false&width=560`,
    // No public thumbnail without page-scoped API credentials.
    thumbnailUrl: null,
    thumbnailSource: null,
    supported: true,
  }
}

function vimeo(url: URL, originalUrl: string): VideoMetadata {
  const segments = url.pathname.split('/')
  let videoId: string | null = null

  for (const segment of segments) {
    if (NUMERIC_ID_RE.test(segment)) {
      videoId = segment
      break
    }
  }

  if (!videoId) return unsupported(originalUrl, 'vimeo')

  return {
    platform: 'vimeo',
    videoId,
    originalUrl,
    embedUrl: `https://player.vimeo.com/video/${videoId}?autoplay=1`,
    // Thumbnail resolved via public oEmbed endpoint by the caller.
    thumbnailUrl: null,
    thumbnailSource: null,
    supported: true,
  }
}

/**
 * Normalizes a published video URL into platform + embed + thumbnail data.
 */
export function getVideoMetadata(input: string): VideoMetadata {
  const trimmed = input.trim()
  if (!trimmed) return unsupported(trimmed)

  const withScheme = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`

  let url: URL
  try {
    url = new URL(withScheme)
  } catch {
    return unsupported(trimmed)
  }

  const host = url.hostname.toLowerCase().replace(/^www\./, '')

  if (host === 'youtu.be' || host.endsWith('youtube.com')) {
    return youtube(url, trimmed)
  }
  if (host === 'instagram.com' || host.endsWith('.instagram.com')) {
    return instagram(url, trimmed)
  }
  if (host === 'tiktok.com' || host.endsWith('.tiktok.com')) {
    return tiktok(url, trimmed)
  }
  if (host === 'fb.watch' || host === 'facebook.com' || host.endsWith('.facebook.com')) {
    return facebook(url, trimmed)
  }
  if (host === 'vimeo.com' || host === 'player.vimeo.com' || host.endsWith('.vimeo.com')) {
    return vimeo(url, trimmed)
  }

  return unsupported(trimmed)
}

export default getVideoMetadata