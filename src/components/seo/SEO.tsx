import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { siteConfig } from '../../data/siteConfig'

export interface SEOProps {
  /** Complete <title> for the page, used verbatim. When omitted it falls back
   *  to `${siteConfig.name} | ${siteConfig.professionalTitle}`. */
  title?: string
  description?: string
  canonicalPath?: string
  ogImage?: string
  ogType?: 'website' | 'article' | 'profile' | 'video.other'
  noindex?: boolean
  /** Optional Schema.org JSON-LD object injected into <head>. */
  jsonLd?: object | null
}

function getFullUrl(path: string): string {
  return `${siteConfig.siteUrl.replace(/\/$/, '')}${path}`
}

/**
 * Renders SEO metadata into <head> for a given page.
 *
 * Every page passes its own title, description and canonical path. The
 * `title` prop is used verbatim as the document <title>; when omitted it
 * falls back to `${siteConfig.name} | ${siteConfig.professionalTitle}`.
 * Description fallbacks come from siteConfig.
 */
export function SEO({
  title,
  description,
  canonicalPath,
  ogImage,
  ogType = 'website',
  noindex = false,
  jsonLd,
}: SEOProps) {
  const { pathname } = useLocation()

  useEffect(() => {
    const fullTitle = title || `${siteConfig.name} | ${siteConfig.professionalTitle}`

    const metaDescription = description || siteConfig.description
    const canonical = getFullUrl(canonicalPath || pathname)
    const ogImageUrl = ogImage || siteConfig.ogImage
    const absoluteOgImage = /^https?:\/\//.test(ogImageUrl)
      ? ogImageUrl
      : getFullUrl(ogImageUrl)

    document.title = fullTitle

    function setMeta(attr: 'name' | 'property', key: string, content: string) {
      let el = document.head.querySelector<HTMLMetaElement>(
        `meta[${attr}="${key}"]`,
      )
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, key)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    const setLink = (rel: string, href: string) => {
      let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
      if (!el) {
        el = document.createElement('link')
        el.setAttribute('rel', rel)
        document.head.appendChild(el)
      }
      el.setAttribute('href', href)
    }

    setMeta('name', 'description', metaDescription)
    setLink('canonical', canonical)

    // Open Graph
    setMeta('property', 'og:type', ogType)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', metaDescription)
    setMeta('property', 'og:url', canonical)
    setMeta('property', 'og:image', absoluteOgImage)
    setMeta('property', 'og:site_name', siteConfig.name)

    // Twitter / X
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', metaDescription)
    setMeta('name', 'twitter:image', absoluteOgImage)

    // Robots
    setMeta(
      'name',
      'robots',
      noindex ? 'noindex, nofollow' : 'index, follow',
    )

    // Schema.org structured data (single script tag, replaced per page).
    const existingLd = document.getElementById('seo-jsonld')
    if (jsonLd) {
      // Normalize an array of schemas into a valid JSON-LD @graph document.
      const payload = Array.isArray(jsonLd)
        ? { '@context': 'https://schema.org', '@graph': jsonLd }
        : jsonLd
      let ldEl = existingLd as HTMLScriptElement | null
      if (!ldEl) {
        ldEl = document.createElement('script')
        ldEl.id = 'seo-jsonld'
        ldEl.type = 'application/ld+json'
        document.head.appendChild(ldEl)
      }
      ldEl.textContent = JSON.stringify(payload)
    } else if (existingLd) {
      existingLd.remove()
    }

    return () => {
      // Cleanup handled on next mount via overwrite.
    }
  }, [title, description, canonicalPath, ogImage, ogType, noindex, pathname, jsonLd])

  return null
}

export default SEO
