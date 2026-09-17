import type { ComponentType, SVGProps } from 'react'
import { socialLinks } from '../data/socialLinks'
import {
  EmailIcon,
  FacebookIcon,
  InstagramIcon,
  PhoneIcon,
  TikTokIcon,
  WhatsAppIcon,
  YouTubeIcon,
} from '../components/Icons'

/**
 * Single registry of the platforms the site can display, with their
 * accessible labels and icons. Used by the social sections, the footer and the
 * contact page so each channel is always rendered the same way.
 *
 * Social-network profiles (Instagram, YouTube, TikTok, Facebook) are shown only
 * in the "social" sections and only when a URL is configured. Email, WhatsApp
 * and phone are contact channels that appear on the contact page.
 */

export type SocialPlatformKey = keyof typeof socialLinks

export interface SocialPlatform {
  key: SocialPlatformKey
  label: string
  Icon: ComponentType<SVGProps<SVGSVGElement>>
}

export interface ConfiguredSocial extends SocialPlatform {
  /** Raw value from src/data/socialLinks.ts (non-empty). */
  href: string
}

/** Keys that represent real social-network profiles (not contact channels). */
export const SOCIAL_PROFILE_KEYS: readonly SocialPlatformKey[] = [
  'instagram',
  'youtube',
  'tiktok',
  'facebook',
]

export const socialPlatforms: SocialPlatform[] = [
  { key: 'instagram', label: 'Instagram', Icon: InstagramIcon },
  { key: 'youtube', label: 'YouTube', Icon: YouTubeIcon },
  { key: 'tiktok', label: 'TikTok', Icon: TikTokIcon },
  { key: 'facebook', label: 'Facebook', Icon: FacebookIcon },
  { key: 'whatsapp', label: 'WhatsApp', Icon: WhatsAppIcon },
  { key: 'email', label: 'Email', Icon: EmailIcon },
  { key: 'phone', label: 'Call Me', Icon: PhoneIcon },
]

/**
 * Everything that has a value configured in socialLinks.ts (contact channels
 * plus social profiles). Unconfigured accounts are never rendered.
 */
export function configuredSocials(): ConfiguredSocial[] {
  return socialPlatforms
    .map((p) => ({ ...p, href: socialLinks[p.key] }))
    .filter((p) => p.href)
}

/**
 * Social-network profiles only (Instagram, YouTube, TikTok, Facebook) that
 * actually have a URL configured. Used by the homepage and footer social
 * sections, where contact channels like WhatsApp and email should not appear.
 */
export function configuredSocialProfiles(): ConfiguredSocial[] {
  return socialPlatforms
    .filter((p) => SOCIAL_PROFILE_KEYS.includes(p.key))
    .map((p) => ({ ...p, href: socialLinks[p.key] }))
    .filter((p) => p.href)
}

/**
 * Normalizes a raw social value into a usable href:
 *  - email becomes a mailto: link
 *  - a WhatsApp phone number (or +/digits) becomes a wa.me link
 *  - a phone number becomes a tel: link
 *  - everything else is treated as an external URL already
 */
export function socialHref(key: SocialPlatformKey, value: string): string {
  if (key === 'email') {
    return value.startsWith('mailto:') ? value : `mailto:${value}`
  }

  if (key === 'whatsapp') {
    const clean = value.trim()
    if (/^https?:\/\//i.test(clean)) return clean
    const digits = clean.replace(/[^\d]/g, '')
    return digits ? `https://wa.me/${digits}` : clean
  }

  if (key === 'phone') {
    const clean = value.trim()
    if (/^tel:/i.test(clean)) return clean
    const digits = clean.replace(/[^\d]/g, '')
    return digits ? `tel:+${digits}` : clean
  }

  return value
}

export default { socialPlatforms, configuredSocials, configuredSocialProfiles, socialHref }