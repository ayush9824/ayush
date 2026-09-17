/**
 * Central project data store.
 *
 * Each project describes a video already published on a social platform.
 * Populate this file with your real work as it becomes available.
 *
 * `thumbnailUrl` defaults to `null` — the platform is auto-detected from
 * `videoUrl` by src/utils/videoMetadata.ts, which derives the thumbnail and
 * embed automatically where the platform provides them publicly. Set
 * `thumbnailUrl` manually only when no automatic thumbnail can be obtained
 * (Instagram, TikTok, Facebook) or to override.
 */
export type Platform =
  | 'youtube'
  | 'instagram'
  | 'tiktok'
  | 'facebook'
  | 'vimeo'
  | 'other'

export interface Project {
  id: string
  slug: string
  title: string
  category: string
  platform: Platform
  videoUrl: string
  thumbnailUrl: string | null
  description: string
  year: number
  role: string
  client: string | null
  featured: boolean
}

/**
 * Projects list. Initially empty — add your published work here.
 *
 * Example entry:
 * {
 *   id: "project-1",
 *   slug: "project-name",
 *   title: "Project Name",
 *   category: "Video Editing",
 *   platform: "youtube",
 *   videoUrl: "https://www.youtube.com/watch?v=XXXXXXXX",
 *   thumbnailUrl: null,
 *   description: "...",
 *   year: 2026,
 *   role: "Video Editor",
 *   client: null,
 *   featured: true
 * }
 */
export const projects: Project[] = [
  {
    id: 'project-1',
    slug: 'infinix-hot-70-smart-20-review',
    title: 'Infinix Hot 70 and Smart 20 Review: Best Budget Phones in Nepal?',
    category: 'Video Editing',
    platform: 'youtube',
    videoUrl: 'https://youtu.be/8zk2B8wljo4',
    thumbnailUrl: null,
    description:
      'A hands-on review of the Infinix Hot 70 and Smart 20 covering design, performance and what makes them the best budget phones in Nepal.',
    year: 2026,
    role: 'Video Editor',
    client: null,
    featured: true,
  },
  {
    id: 'project-2',
    slug: 'redmi-17-5g-review',
    title: 'Redmi 17 5G Review: Tough Competition at Rs. 34K!',
    category: 'Videography',
    platform: 'youtube',
    videoUrl: 'https://youtu.be/djuxnD6GA6E',
    thumbnailUrl: null,
    description:
      'A comprehensive review of the Redmi 17 5G covering design, performance, camera and value at Rs. 34K price point.',
    year: 2026,
    role: 'Videographer',
    client: null,
    featured: true,
  },
  {
    id: 'project-3',
    slug: 'ultraviolette-x47-crossover-electric-bike',
    title:
      '323 km IDC range दिने ⚡🏍️ Electric Bike, Ultraviolette X47 Crossover, नेपालमा officially आइसकेको छ!',
    category: 'Video Editing',
    platform: 'instagram',
    videoUrl: 'https://www.instagram.com/tech.lekh/reel/DcEDHAlzX2W/',
    thumbnailUrl: null,
    description:
      '323 km IDC range दिने ⚡🏍️ Electric Bike, Ultraviolette X47 Crossover, नेपालमा officially आइसकेको छ!',
    year: 2026,
    role: 'Video Editor',
    client: null,
    featured: true,
  },
]

export default projects