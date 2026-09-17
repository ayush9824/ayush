import type { ComponentType, SVGProps } from 'react'
import { services } from '../../data/services'
import Section from '../Section'
import {
  CameraIcon,
  ClapperIcon,
  FilmIcon,
  LayersIcon,
  ShareIcon,
} from '../Icons'

const SERVICE_ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  'video-editing': ClapperIcon,
  videography: CameraIcon,
  'social-content': ShareIcon,
  'commercial-videos': FilmIcon,
  'motion-graphics': LayersIcon,
}

/**
 * Services section — renders exactly what is configured in
 * src/data/services.ts. Edit that file to change what is advertised.
 */
export default function Services() {
  return (
    <Section as="section" aria-labelledby="services-heading">
      <div className="max-w-2xl">
        <p className="text-sm uppercase tracking-widest text-ember-400">
          What I Do
        </p>
        <h2
          id="services-heading"
          className="mt-3 font-display text-3xl font-semibold tracking-tight text-bone-50 sm:text-4xl"
        >
          Services
        </h2>
        <p className="mt-4 text-bone-300">
          From first frame to final export — everything a story needs to land.
        </p>
      </div>

      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const Icon = SERVICE_ICONS[service.id] ?? ClapperIcon
          return (
            <li
              key={service.id}
              className="group border border-ink-600 bg-ink-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ember-500/60 hover:shadow-glow sm:p-8"
            >
              <Icon className="h-6 w-6 text-ember-400 transition-colors group-hover:text-ember-500" />
              <h3 className="mt-4 font-display text-xl font-medium text-bone-100">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-bone-400">
                {service.description}
              </p>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}