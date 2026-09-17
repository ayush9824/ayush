import { projects } from '../../data/projects'
import Section from '../Section'
import ProjectCard from '../work/ProjectCard'
import { ButtonLink } from '../Button'

/**
 * Homepage featured-work section. Only renders projects flagged
 * `featured: true` in src/data/projects.ts.
 */
export default function FeaturedWork() {
  const featured = projects.filter((p) => p.featured)

  return (
    <Section as="section" aria-labelledby="featured-heading">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-widest text-ember-400">
            Selected Work
          </p>
          <h2
            id="featured-heading"
            className="mt-3 font-display text-3xl font-semibold tracking-tight text-bone-50 sm:text-4xl"
          >
            Featured Projects
          </h2>
        </div>
        <ButtonLink to="/work" className="px-4 py-2">
          View All Work
        </ButtonLink>
      </div>

      {featured.length > 0 ? (
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p
          role="status"
          className="mt-8 border-l-2 border-ink-700 pl-4 text-sm text-bone-400"
        >
          Featured projects will appear here once you flag projects as
          featured in <code className="font-mono text-bone-300">projects.ts</code>.
        </p>
      )}
    </Section>
  )
}