import SEO from '../components/seo/SEO'
import Section from '../components/Section'
import ContactCTA from '../components/shared/ContactCTA'
import ProfileImage from '../components/shared/ProfileImage'
import { about } from '../data/about'
import { siteConfig } from '../data/siteConfig'
import {
  buildBreadcrumbJsonLd,
  buildPersonJsonLd,
} from '../utils/structuredData'

function SectionHeading({
  id,
  eyebrow,
  title,
}: {
  id: string
  eyebrow: string
  title: string
}) {
  return (
    <div>
      <p className="text-sm uppercase tracking-widest text-bone-400">{eyebrow}</p>
      <h2
        id={id}
        className="mt-3 font-display text-2xl font-semibold tracking-tight text-bone-50 sm:text-3xl"
      >
        {title}
      </h2>
    </div>
  )
}

/**
 * About page — a professional profile built entirely from
 * src/data/about.ts and src/data/siteConfig.ts. Nothing is invented: sections
 * with no configured content are hidden, and only configured skills and
 * software are shown.
 */
export default function AboutPage() {
  const { name, professionalTitle } = siteConfig
  const personLd = buildPersonJsonLd()
  const jsonLd = [
    personLd,
    buildBreadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
    ]),
  ].filter(Boolean)

  const seoDescription =
    `About ${name} — ${professionalTitle}. ${about.intro}`.slice(0, 160)

  return (
    <>
      <SEO
        title={`About ${name} | ${professionalTitle}`}
        description={seoDescription}
        canonicalPath="/about"
        ogType="profile"
        jsonLd={jsonLd.length > 0 ? jsonLd : null}
      />

      <Section as="article" aria-labelledby="about-heading">
        <p className="text-sm uppercase tracking-widest text-bone-400">
          About
        </p>
        <h1
          id="about-heading"
          className="mt-3 font-display text-4xl font-bold tracking-tighter text-bone-50 text-balance sm:text-5xl"
        >
          About {name}
        </h1>
        <p className="mt-4 font-display text-xl text-bone-300">
          {professionalTitle}
        </p>

        <div className="mt-12 grid gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:items-start">
          <div className="md:sticky md:top-24">
            <div className="relative aspect-[4/5] overflow-hidden border border-ink-700/60 bg-ink-900">
              <ProfileImage src={about.photoUrl} name={name} />
            </div>
            <p className="mt-4 font-display text-lg font-medium text-bone-100">
              {name}
            </p>
            <p className="text-sm text-bone-400">{professionalTitle}</p>
          </div>

          <div>
            <p className="max-w-prose text-lg leading-relaxed text-bone-300">
              {about.intro}
            </p>

            {about.biography.length > 0 && (
              <section
                aria-labelledby="biography-heading"
                className="mt-10 border-t border-ink-800 pt-8"
              >
                <h2
                  id="biography-heading"
                  className="text-sm uppercase tracking-widest text-bone-500"
                >
                  Biography
                </h2>
                <div className="mt-4 space-y-4">
                  {about.biography.map((paragraph, index) => (
                    <p
                      key={index}
                      className="max-w-prose leading-relaxed text-bone-300"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>

        {(about.editingApproach.length > 0 ||
          about.videographyApproach.length > 0) && (
          <section
            aria-labelledby="approach-heading"
            className="mt-16 border-t border-ink-800 pt-12"
          >
            <SectionHeading
              id="approach-heading"
              eyebrow="Approach"
              title="How I Work"
            />
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {about.editingApproach.length > 0 && (
                <div className="border border-ink-700/60 bg-ink-900 p-6 sm:p-8">
                  <h3 className="font-display text-xl font-medium text-bone-100">
                    Editing
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {about.editingApproach.map((point, index) => (
                      <li
                        key={index}
                        className="flex gap-3 text-sm leading-relaxed text-bone-400"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ember-400"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {about.videographyApproach.length > 0 && (
                <div className="border border-ink-700/60 bg-ink-900 p-6 sm:p-8">
                  <h3 className="font-display text-xl font-medium text-bone-100">
                    Videography
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {about.videographyApproach.map((point, index) => (
                      <li
                        key={index}
                        className="flex gap-3 text-sm leading-relaxed text-bone-400"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ember-400"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {about.skills.length > 0 && (
          <section
            aria-labelledby="skills-heading"
            className="mt-16 border-t border-ink-800 pt-12"
          >
            <SectionHeading
              id="skills-heading"
              eyebrow="What I Bring"
              title="Skills"
            />
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Skill tags">
              {about.skills.map((skill) => (
                <li
                  key={skill}
                  className="border border-ink-700 px-3 py-1.5 text-xs uppercase tracking-widest text-bone-300"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </section>
        )}

        {about.software.length > 0 && (
          <section
            aria-labelledby="software-heading"
            className="mt-16 border-t border-ink-800 pt-12"
          >
            <SectionHeading
              id="software-heading"
              eyebrow="Tools"
              title="Software &amp; Tools"
            />
            <ul className="mt-8 grid gap-px border border-ink-700/60 bg-ink-700/60 sm:grid-cols-2 lg:grid-cols-4">
              {about.software.map((tool) => (
                <li
                  key={tool}
                  className="bg-ink-950 p-5 font-medium text-bone-100"
                >
                  {tool}
                </li>
              ))}
            </ul>
          </section>
        )}

        {about.experience.length > 0 && (
          <section
            aria-labelledby="experience-heading"
            className="mt-16 border-t border-ink-800 pt-12"
          >
            <SectionHeading
              id="experience-heading"
              eyebrow="Background"
              title="Experience"
            />
            <ul className="mt-8">
              {about.experience.map((item) => (
                <li
                  key={item.id}
                  className="border-b border-ink-800 py-5 first:border-t"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className="font-display text-lg font-medium text-bone-100">
                      {item.title}
                    </h3>
                    {item.period && (
                      <p className="text-sm text-bone-500">{item.period}</p>
                    )}
                  </div>
                  {item.company && (
                    <p className="mt-1 text-sm text-ember-400">{item.company}</p>
                  )}
                  {item.summary && (
                    <p className="mt-2 max-w-prose text-sm leading-relaxed text-bone-400">
                      {item.summary}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}
      </Section>

      <ContactCTA />
    </>
  )
}