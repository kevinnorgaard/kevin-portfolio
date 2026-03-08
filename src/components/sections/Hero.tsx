import Link from 'next/link'
import Button from '@/components/ui/Button'
import Tag from '@/components/ui/Tag'

const RESUME_URL =
  'https://drive.google.com/file/d/1F6qMER9oUWYAym1Kn32JWDOP54n7XuRk/view?usp=drive_link'

const stats = [
  { value: '35M+', label: 'daily requests served' },
  { value: '99.99%', label: 'SLA maintained' },
  { value: '5+ yrs', label: 'production systems' },
  { value: '3', label: 'live apps shipped' },
]

const highlightTags = [
  'Java / Spring Boot',
  'Distributed Systems',
  'Next.js / TypeScript',
  'Redis · Kafka · PostgreSQL',
  'AWS · Kubernetes',
  'AI Integrations',
]

export default function Hero() {
  return (
    <section
      className="relative pt-20 pb-28 sm:pt-28 sm:pb-36 overflow-hidden"
      aria-label="Introduction"
    >
      {/* Decorative blobs */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-salmon/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 -right-16 w-[400px] h-[400px] rounded-full bg-teal/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="section-container relative z-10">
        <div className="max-w-3xl">
          {/* Status badge */}
          <div className="animate-fade-in opacity-0">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal/15 border border-teal/30 text-teal-dark text-xs font-mono font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" aria-hidden="true" />
              Available for senior engineering roles
            </span>
          </div>

          {/* Name & title */}
          <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-bold text-dark-slate tracking-tight animate-slide-up opacity-0">
            Kevin{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-salmon to-salmon-dark">
              Norgaard
            </span>
          </h1>

          <p className="mt-3 text-xl sm:text-2xl font-medium text-dark-slate/70 animate-slide-up opacity-0">
            Software Engineer III &mdash; Backend &amp; Full-Stack
          </p>

          {/* Tagline */}
          <p className="mt-5 text-base sm:text-lg text-dark-slate/60 max-w-xl leading-relaxed animate-slide-up-delay opacity-0">
            I design and build backend systems that handle real-world scale — from 35M+ daily
            requests at eBay to full-stack web apps used by real communities. I think in tradeoffs,
            ship with observability, and never commit code I wouldn&apos;t want to debug at 2am.
          </p>

          {/* Skill tags */}
          <div className="mt-6 flex flex-wrap gap-2 animate-slide-up-delay opacity-0">
            {highlightTags.map((tag) => (
              <Tag key={tag} variant="default">
                {tag}
              </Tag>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3 animate-slide-up-delay2 opacity-0">
            <Button href="/projects" variant="primary" size="lg">
              View My Work
            </Button>
            <Button href={RESUME_URL} variant="secondary" size="lg" external>
              Download Resume ↗
            </Button>
            <Button href="/#contact" variant="ghost" size="lg">
              Get in Touch
            </Button>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 animate-slide-up-delay2 opacity-0">
          {stats.map(({ value, label }) => (
            <div
              key={label}
              className="glass-card p-5 text-center hover:bg-white/55 transition-colors duration-200"
            >
              <p className="text-2xl sm:text-3xl font-bold text-salmon font-mono">{value}</p>
              <p className="text-dark-slate/55 text-sm mt-1 leading-snug">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
