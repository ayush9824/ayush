/**
 * Build-time SEO file generator.
 *
 * Writes `public/robots.txt` and `public/sitemap.xml` from the single
 * source of truth in src/data (siteConfig.siteUrl + the projects list), so
 * they are regenerated on every build and never drift from the app config.
 *
 * Static site. The XML sitemap covers the core navigation routes plus the
 * current set of published project detail pages (derived from projects.ts).
 *
 * Run via the `prebuild` script before `vite build`.
 */
import { writeFile, mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { siteConfig } from '../src/data/siteConfig.ts'
import { projects } from '../src/data/projects.ts'

const root = dirname(fileURLToPath(import.meta.url))
const outDir = join(root, '..', 'public')
const base = siteConfig.siteUrl.replace(/\/$/, '')

/** Core navigation routes, always present. */
const coreRoutes = [
  { path: '/', changeFreq: 'weekly', priority: '1.0' },
  { path: '/work', changeFreq: 'weekly', priority: '0.9' },
  { path: '/about', changeFreq: 'monthly', priority: '0.7' },
  { path: '/contact', changeFreq: 'monthly', priority: '0.6' },
]

const today = new Date().toISOString().slice(0, 10)

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function buildSitemap() {
  const entries = [
    ...coreRoutes.map((r) => ({
      loc: `${base}${r.path === '/' ? '/' : r.path}`,
      lastmod: today,
      changefreq: r.changeFreq,
      priority: r.priority,
    })),
    // Project detail pages — only those that actually exist.
    ...projects.map((p) => ({
      loc: `${base}/work/${p.slug}`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.8',
    })),
  ]

  const urls = entries
    .map(
      (e) =>
        `  <url>\n` +
        `    <loc>${escapeXml(e.loc)}</loc>\n` +
        `    <lastmod>${e.lastmod}</lastmod>\n` +
        `    <changefreq>${e.changefreq}</changefreq>\n` +
        `    <priority>${e.priority}</priority>\n` +
        `  </url>`,
    )
    .join('\n')

  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `${urls}\n` +
    `</urlset>\n`
  )
}

function buildRobots() {
  return [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${base}/sitemap.xml`,
    '',
  ].join('\n')
}

await mkdir(outDir, { recursive: true })
await writeFile(join(outDir, 'sitemap.xml'), buildSitemap(), 'utf8')
await writeFile(join(outDir, 'robots.txt'), buildRobots(), 'utf8')

console.log('[seo] Generated public/robots.txt and public/sitemap.xml')
