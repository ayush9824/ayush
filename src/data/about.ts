/**
 * Central About-page profile data.
 *
 * Everything the About page and the homepage about-preview render comes from
 * this single file, so you edit your story in ONE place.
 *
 * Rules:
 *  - Only include what is real. Do NOT invent clients, awards, companies,
 *    years of experience or achievements.
 *  - Leave arrays empty (and `photoUrl` null) to hide sections entirely —
 *    only what you configure is displayed.
 */

export interface ExperienceItem {
  id: string
  title: string
  company: string
  period: string
  summary: string
}

export interface AboutProfile {
  /** Short introduction used on the homepage preview and about intro. */
  intro: string
  /** Paragraphs for the biography. Empty array hides the section. */
  biography: string[]
  /** Bullet points for the "editing approach". Empty array hides the block. */
  editingApproach: string[]
  /** Bullet points for the "videography approach". Empty array hides the block. */
  videographyApproach: string[]
  /** Portrait photo (path under /public or absolute URL). Null shows a frame. */
  photoUrl: string | null
  /** Only these skills are shown — drop any you don't have. */
  skills: string[]
  /** Tools you actually use. No proficiency levels are claimed. */
  software: string[]
  /** Experience entries. Empty array hides the section. */
  experience: ExperienceItem[]
}

export const about: AboutProfile = {
  intro:
    "I'm Ayush Ghimire, a video editor and videographer based in Kathmandu, Nepal. I'm passionate about transforming ideas and footage into engaging visual stories, from social media content to cinematic and promotional videos.",

  biography: [],

  editingApproach: [
    'Editing is where the story finds its rhythm — pacing, structure and sound come together to make an audience feel something.',
    'Every decision is made with the story in mind: what to keep, what to cut, and where the viewer should be looking.',
    'Sound and color are part of the edit, not afterthoughts — details that make the final cut feel intentional.',
  ],

  videographyApproach: [
    'Filming starts before the camera: planning the story, blocking the scene and understanding the light.',
    'Small, honest moments often carry the most weight — capture them with intention and restraint.',
    'Gear serves the shot, not the other way around — keep the approach light so subjects stay natural.',
  ],

  photoUrl: '/portrait.jpg',

  skills: [
    'Video Editing',
    'Color Grading',
    'Motion Graphics',
    'Cinematography',
    'Storytelling',
    'Social Media Editing',
  ],

  software: [],

  experience: [],
}

export default about