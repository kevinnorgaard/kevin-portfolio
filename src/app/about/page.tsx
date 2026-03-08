import type { Metadata } from 'next'
import GlassCard from '@/components/ui/GlassCard'
import Tag from '@/components/ui/Tag'
import Button from '@/components/ui/Button'
import { skills } from '@/data/skills'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Kevin Norgaard — Software Engineer III with expertise in high-traffic backend systems, distributed architecture, and AI integrations.',
}

const RESUME_URL =
  'https://drive.google.com/file/d/1F6qMER9oUWYAym1Kn32JWDOP54n7XuRk/view?usp=drive_link'

const principles = [
  {
    icon: '🔬',
    title: 'Systems Thinking First',
    description:
      'Before writing a line of code, I map the data flows, identify failure modes, and think about what "done" looks like at 10× the expected load. Good architecture is boring by design.',
  },
  {
    icon: '📊',
    title: 'Observability is a Feature',
    description:
      'Shipping code without metrics, traces, and alerts is like flying blind. I instrument everything from day one — latency histograms, error rates, cache hit ratios — because you can\'t improve what you can\'t measure.',
  },
  {
    icon: '⚖️',
    title: 'Tradeoffs Over Perfection',
    description:
      'Every technical decision is a tradeoff. Strong consistency vs. availability. Normalization vs. query performance. I make these calls explicitly, document them, and revisit when the constraints change.',
  },
  {
    icon: '🚢',
    title: 'Ship, Then Refine',
    description:
      'A deployed system with 80% of the perfect design beats an undeployed perfect system every time. I bias toward getting working software into users\' hands, with clear tech-debt tracking for the rest.',
  },
]

export default function AboutPage() {
  return (
    <div className="py-16 sm:py-20">
      <div className="section-container">

        {/* Header */}
        <div className="max-w-3xl">
          <h1 className="section-heading text-5xl sm:text-6xl">
            About{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-salmon to-salmon-dark">
              Me
            </span>
          </h1>

          <div className="mt-8 space-y-4 text-dark-slate/70 text-base sm:text-lg leading-relaxed">
            <p>
              I&apos;m a Software Engineer III with a focus on backend systems that handle real-world
              scale — the kind where a slow query or a missed index costs real money and ruins someone&apos;s day.
              My current home is eBay, where I own services that process{' '}
              <strong className="text-dark-slate font-semibold">35M+ daily requests</strong> across
              eBay&apos;s core buying and selling platform.
            </p>
            <p>
              Before eBay, I built full-stack web applications and microservices at General Motors,
              where I got comfortable moving fast across the entire stack — from React frontends to
              Java Spring Boot APIs to CI/CD pipelines.
            </p>
            <p>
              Outside of enterprise work, I&apos;ve shipped three live web apps for real communities — a
              student org portal, a fraternity recruitment site, and a creative collective booking
              platform. Each one taught me something the day job doesn&apos;t: what it&apos;s like to be the
              on-call engineer, the product manager, and the UX designer simultaneously.
            </p>
            <p>
              I&apos;m currently exploring senior IC and staff-level roles where I can own technically
              complex systems, mentor engineers, and drive architectural decisions — ideally at a
              company where backend reliability and developer experience are genuinely valued.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={RESUME_URL} variant="primary" external>
              Download Resume ↗
            </Button>
            <Button href="mailto:kevinnorg@gmail.com" variant="secondary">
              Send an Email
            </Button>
            <Button
              href="https://www.linkedin.com/in/kevinnorgaard/"
              variant="secondary"
              external
            >
              LinkedIn ↗
            </Button>
          </div>
        </div>

        {/* Engineering Principles */}
        <div className="mt-24">
          <h2 className="section-heading mb-3">Engineering Principles</h2>
          <p className="section-subheading mb-10">How I think about building software.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {principles.map(({ icon, title, description }) => (
              <GlassCard key={title} padding="lg" className="hover:bg-white/55 transition-colors duration-200">
                <div className="flex items-start gap-4">
                  <span className="text-2xl flex-shrink-0 mt-0.5" aria-hidden="true">{icon}</span>
                  <div>
                    <h3 className="font-bold text-dark-slate mb-2">{title}</h3>
                    <p className="text-dark-slate/65 text-sm leading-relaxed">{description}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mt-24">
          <h2 className="section-heading mb-3">Tech Stack</h2>
          <p className="section-subheading mb-10">Tools I&apos;ve used in production.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {skills.map(({ category, icon, items }) => (
              <GlassCard key={category} padding="md" className="hover:bg-white/55 transition-colors duration-200">
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="text-xl" aria-hidden="true">{icon}</span>
                  <h3 className="font-semibold text-dark-slate text-sm">{category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <Tag key={item} variant="default">
                      {item}
                    </Tag>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Location / quick facts */}
        <div className="mt-24">
          <GlassCard padding="lg" className="max-w-2xl">
            <h2 className="font-bold text-dark-slate text-lg mb-5">Quick Facts</h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              {[
                { label: 'Currently', value: 'Software Engineer III @ eBay' },
                { label: 'Location', value: 'San Jose, CA' },
                { label: 'Education', value: 'B.S. Computer Science, UC Irvine' },
                { label: 'Open to', value: 'Senior IC / Staff eng. roles' },
                { label: 'Work auth.', value: 'US Citizen — no sponsorship needed' },
                { label: 'Timezone', value: 'Pacific (PT) — open to remote' },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <dt className="font-mono text-xs text-dark-slate/40 uppercase tracking-wider">{label}</dt>
                  <dd className="text-dark-slate font-medium">{value}</dd>
                </div>
              ))}
            </dl>
          </GlassCard>
        </div>

      </div>
    </div>
  )
}
