/**
 * Future reserved utility library.
 *
 * Phase 2+ will add lazy video embed loaders and platform-specific helpers
 * here (e.g. turning a YouTube URL into an embeddable oEmbed/iframe URL,
 * Instagram/TikTok/Vimeo embed handling) so heavy players are only loaded
 * on demand.
 */
export const PLATFORM_LABELS: Record<string, string> = {
  youtube: 'YouTube',
  instagram: 'Instagram',
  tiktok: 'TikTok',
  facebook: 'Facebook',
  vimeo: 'Vimeo',
  other: 'Other',
}

export default { PLATFORM_LABELS }