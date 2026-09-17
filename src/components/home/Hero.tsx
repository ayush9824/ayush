import { useState } from 'react'
import { siteConfig } from '../../data/siteConfig'
import { ButtonLink } from '../Button'
import { PlayIcon } from '../Icons'

function GradientBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#12294d_0%,#050B18_65%)]"
    />
  )
}

interface HeroVisualProps {
  playing: boolean
  onPlay: () => void
}

function HeroVisual({ playing, onPlay }: HeroVisualProps) {
  const { videoUrl, posterUrl } = siteConfig.showreel
  const [posterFailed, setPosterFailed] = useState(false)

  if (videoUrl) {
    return (
      <div className="relative aspect-video w-full overflow-hidden border border-ink-700/60 bg-ink-900">
        {playing ? (
          <video
            className="h-full w-full object-cover"
            src={videoUrl}
            poster={posterUrl ?? undefined}
            controls
            autoPlay
            playsInline
          />
        ) : (
          <div className="relative h-full w-full">
            {posterUrl && !posterFailed ? (
              <img
                src={posterUrl}
                alt="Showreel preview"
                width={1280}
                height={720}
                fetchPriority="high"
                decoding="async"
                onError={() => setPosterFailed(true)}
                className="h-full w-full object-cover"
              />
            ) : (
              <GradientBackdrop />
            )}
            <button
              type="button"
              onClick={onPlay}
              className="group absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-4 bg-ink-950/20 transition-colors hover:bg-ink-950/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ember-400"
              aria-label="Play showreel"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-bone-50/25 bg-ink-950/60 backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:border-ember-400 group-hover:bg-ember-600/90 group-hover:shadow-glow">
                <PlayIcon className="ml-1 h-6 w-6 text-bone-50" />
              </span>
              <span className="text-xs uppercase tracking-widest text-bone-200">
                Watch Showreel
              </span>
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      role="img"
      aria-label="Showreel — coming soon"
      className="relative aspect-video w-full overflow-hidden border border-ink-700/60 bg-ink-900"
    >
      <GradientBackdrop />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
        <PlayIcon className="h-10 w-10 text-ink-600" />
        <div>
          <p className="font-display text-lg text-bone-200">Showreel</p>
          <p className="mt-1 text-sm text-bone-400">Coming soon</p>
        </div>
      </div>
    </div>
  )
}

/**
 * Cinematic hero. No autoplaying video: the showreel is poster-first and only
 * loads a video element after the user clicks play.
 */
export default function Hero() {
  const [playing, setPlaying] = useState(false)
  const titleParts = siteConfig.professionalTitle.split('&').map((part) => part.trim())

  return (
    <section aria-labelledby="home-heading" className="relative">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-12 sm:px-8 sm:pt-16 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-14 lg:pt-20">
        <div>
          <p className="flex items-center gap-2 text-xs uppercase tracking-widest text-bone-400">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ember-400" />
            {siteConfig.name}
            {siteConfig.location ? ` — ${siteConfig.location}` : ''}
          </p>

          <h1
            id="home-heading"
            className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tighter text-bone-50 text-balance sm:text-5xl lg:text-6xl"
          >
            {titleParts.length > 1 ? (
              <>
                {titleParts.slice(0, -1).join(' & ')} &{' '}
                <span className="text-ember-400">{titleParts[titleParts.length - 1]}</span>
              </>
            ) : (
              siteConfig.professionalTitle
            )}
          </h1>

          <p className="mt-6 max-w-prose text-lg leading-relaxed text-bone-300">
            {siteConfig.heroIntro}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <ButtonLink to="/work" variant="primary">
              View My Work
            </ButtonLink>
            <ButtonLink to="/contact">Let&apos;s Work Together</ButtonLink>
          </div>
        </div>

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(circle_at_50%_40%,rgba(37,99,235,0.35),transparent_70%)] blur-2xl"
          />
          <HeroVisual playing={playing} onPlay={() => setPlaying(true)} />
        </div>
      </div>
    </section>
  )
}