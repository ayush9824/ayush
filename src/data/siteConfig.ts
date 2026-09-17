import { socialLinks } from './socialLinks.ts'
import { about } from './about.ts'

/**
 * Central site configuration.
 *
 * Update this single file to change your site-wide identity, SEO defaults,
 * contact details, and social links across the whole website. Email and phone
 * are imported from src/data/socialLinks.ts so they only live in one place.
 */

export const siteConfig = {
  name: 'Ayush Ghimire',
  professionalTitle: 'Video Editor & Videographer',

  // Short description used as the SEO meta-description fallback.
  description:
    'Ayush Ghimire is a Video Editor & Videographer based in Kathmandu, Nepal, creating engaging visual stories, social media content and cinematic video experiences.',

  // One-line homepage intro shown in the hero.
  heroIntro:
    'I edit and create visual stories that turn ideas into engaging videos.',

  // Placeholder domain. Replace once a real domain is available.
  siteUrl: 'https://example.com',

  // Contact details — single source is src/data/socialLinks.ts.
  email: socialLinks.email,
  phone: socialLinks.phone,

  // Location used in the header, footer and structured data.
  location: 'New Baneshwor, Kathmandu, Nepal',

  // Default OG image (relative to siteUrl or absolute URL). Placeholder.
  ogImage: '/og-image.jpg',

  // Social links are composed from the shared socialLinks config.
  socialLinks,

  // About profile shared by the homepage preview and the About page.
  // Edit src/data/about.ts to change your story, skills and tools.
  about,

  // Cinematic hero showreel. Replace with your own hosted video and poster.
  // Loading stays click-to-play, so nothing heavy loads on page load.
  showreel: {
    videoUrl: null as string | null,
    posterUrl: null as string | null,
  },
}

export default siteConfig