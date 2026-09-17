/**
 * Services offered.
 *
 * Keep this list editable and accurate to what you actually provide — the
 * homepage services section renders exactly what is configured here. Remove
 * any service you do not offer.
 */
export interface Service {
  id: string
  title: string
  description: string
}

export const services: Service[] = [
  {
    id: 'video-editing',
    title: 'Video Editing',
    description: 'Story-driven edits with rhythm, pacing and intention.',
  },
  {
    id: 'videography',
    title: 'Videography',
    description: 'Cinematic capture, planned around the story you want to tell.',
  },
  {
    id: 'social-content',
    title: 'Social Media Content',
    description: 'Native cuts made for Instagram, TikTok, YouTube and beyond.',
  },
  {
    id: 'commercial-videos',
    title: 'Commercial Videos',
    description: 'Promo and brand films built to move people and perform.',
  },
  {
    id: 'motion-graphics',
    title: 'Motion Graphics',
    description: 'Titles, lower thirds and a polished visual language.',
  },
]

export default services