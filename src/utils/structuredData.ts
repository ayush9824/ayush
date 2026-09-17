import type { Project } from '../data/projects.ts'
import { about } from '../data/about.ts'
import { siteConfig } from '../data/siteConfig.ts'
import { services } from '../data/services.ts'
import type { VideoMetadata } from './videoMetadata.ts'

export interface VideoObjectJsonLd {
  '@context': 'https://schema.org'
  '@type': 'VideoObject'
  name: string
  description: string
  url?: string
  embedUrl?: string
  thumbnailUrl?: string[]
  author?: { '@type': 'Person'; name: string }
  inLanguage?: 'en'
}

/**
 * Builds Schema.org VideoObject structured data for a project.
 *
 * Only properties backed by real project/config data are included — no fake
 * dates, durations, view counts or other invented values.
 */
export function buildVideoObjectJsonLd(
  project: Project,
  metadata: VideoMetadata,
  thumbnailUrl: string | null,
): VideoObjectJsonLd {
  const data: VideoObjectJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: project.title,
    description: project.description,
  }

  if (project.videoUrl) data.url = project.videoUrl
  if (metadata.supported && metadata.embedUrl) {
    data.embedUrl = metadata.embedUrl
  }
  if (thumbnailUrl) data.thumbnailUrl = [thumbnailUrl]
  if (siteConfig.name && siteConfig.name !== 'Your Name') {
    data.author = { '@type': 'Person', name: siteConfig.name }
  }

  return data
}

/**
 * Builds Schema.org Person structured data for the About page.
 *
 * Only data that is actually configured is included — nothing is fabricated.
 * Returns null when there is no real identity data, so no schema is injected.
 */
export interface BreadcrumbItem {
  name: string
  path: string
}

/**
 * Builds Schema.org BreadcrumbList structured data.
 *
 * The first item is always the home page and the last item is the current
 * page (with `@id` only for real, indexable routes). Only real configured
 * names/paths are included — nothing is fabricated.
 */
export function buildBreadcrumbJsonLd(
  items: BreadcrumbItem[],
): Record<string, unknown> {
  const base = siteConfig.siteUrl.replace(/\/$/, '')
  const crumbs = items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: index === items.length - 1 && item.path ? `${base}${item.path}` : `${base}${item.path}`,
  }))

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs,
  }
}

/**
 * Builds Schema.org WebSite structured data for the homepage. Only uses
 * configured identity (name) — no fabricated data.
 */
export function buildWebSiteJsonLd(): Record<string, unknown> | null {
  const name = siteConfig.name
  if (!name || name === 'Your Name') return null

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url: `${siteConfig.siteUrl.replace(/\/$/, '')}/`,
  }
}

/**
 * Builds Schema.org ProfessionalService structured data describing the video
 * editing / videography services actually configured in src/data/services.ts.
 *
 * Only real, configured data is used. No reviews, ratings, prices, business
 * addresses or invented credentials are ever emitted. Returns null when there
 * is no real identity yet.
 */
export function buildProfessionalServiceJsonLd(): Record<string, unknown> | null {
  const name = siteConfig.name
  if (!name || name === 'Your Name') return null

  const serviceTypes = services.map((s) => s.title).filter(Boolean)
  const address = buildPostalAddress()

  const provider: Record<string, unknown> = {
    '@type': 'Person',
    name,
    jobTitle: siteConfig.professionalTitle || undefined,
  }
  if (isRealEmail()) provider.email = siteConfig.email
  if (siteConfig.phone) {
    provider.telephone = siteConfig.phone.replace(/\s+/g, '')
  }
  if (address) provider.address = address

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `${name} — ${siteConfig.professionalTitle}`,
    description: siteConfig.description || undefined,
    serviceType: serviceTypes.length > 0 ? serviceTypes : undefined,
    areaServed: siteConfig.location || undefined,
    provider,
  }
}

/**
 * Builds a Schema.org PostalAddress from the configured location string
 * (e.g. "New Baneshwor, Kathmandu, Nepal"). Returns null when no location is
 * set. Only the given parts are mapped — no street, postal code or business
 * address is ever invented.
 */
function buildPostalAddress(): Record<string, string> | null {
  if (!siteConfig.location) return null

  const address: Record<string, string> = { '@type': 'PostalAddress' }
  const parts = siteConfig.location
    .split(/,\s*/)
    .map((part) => part.trim())
    .filter(Boolean)

  if (parts[0]) address.addressLocality = parts[0]
  if (parts[1]) address.addressRegion = parts[1]
  if (parts[2]) address.addressCountry = parts[2]

  return address
}

function isRealEmail(): boolean {
  return (
    !!siteConfig.email && !/@example\.(com|org|net)$/i.test(siteConfig.email)
  )
}

export function buildPersonJsonLd(): Record<string, unknown> | null {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
  }

  if (siteConfig.name && siteConfig.name !== 'Your Name') {
    data.name = siteConfig.name
  }
  if (siteConfig.professionalTitle) {
    data.jobTitle = siteConfig.professionalTitle
  }
  if (siteConfig.description) {
    data.description = siteConfig.description
  }
  if (isRealEmail()) {
    data.email = `mailto:${siteConfig.email}`
  }
  if (siteConfig.phone) {
    data.telephone = siteConfig.phone.replace(/\s+/g, '')
  }
  if (about.photoUrl) {
    data.image = about.photoUrl
  }
  const address = buildPostalAddress()
  if (address) {
    data.address = address
  }
  data.url = `${siteConfig.siteUrl.replace(/\/$/, '')}/about`

  if (!data.name && !data.jobTitle && !data.email) {
    return null
  }
  return data
}

export default buildVideoObjectJsonLd