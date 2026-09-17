import { Link } from 'react-router-dom'
import { siteConfig } from '../../data/siteConfig'
import Section from '../Section'
import ProfileImage from '../shared/ProfileImage'
import { ArrowRightIcon } from '../Icons'

/**
 * Homepage about preview. The intro text and skills come from siteConfig and
 * should be replaced with real, accurate details.
 */
export default function AboutPreview() {
  const { about } = siteConfig

  return (
    <Section as="section" aria-labelledby="about-preview-heading">
      <div className="grid gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:items-center">
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute -inset-5 rounded-[2rem] bg-[radial-gradient(circle_at_30%_20%,rgba(37,99,235,0.28),transparent_70%)] blur-2xl"
          />
          <div className="relative aspect-[4/5] overflow-hidden border border-ink-600 bg-ink-900">
            <ProfileImage src={about.photoUrl} name={siteConfig.name} />
          </div>
        </div>

        <div>
          <p className="text-sm uppercase tracking-widest text-ember-400">
            Behind the Lens
          </p>
          <h2
            id="about-preview-heading"
            className="mt-3 font-display text-3xl font-semibold tracking-tight text-bone-50 sm:text-4xl"
          >
            About {siteConfig.name}
          </h2>
          <p className="mt-5 max-w-prose text-lg leading-relaxed text-bone-300">
            {about.intro}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Skills">
            {about.skills.map((skill) => (
              <li
                key={skill}
                className="border border-ink-600 px-3 py-1.5 text-xs uppercase tracking-widest text-bone-300 transition-colors hover:border-ember-500/60 hover:text-ember-300"
              >
                {skill}
              </li>
            ))}
          </ul>

          <Link
            to="/about"
            className="group mt-8 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-ember-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 hover:text-ember-500"
          >
            More About Me
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </Section>
  )
}