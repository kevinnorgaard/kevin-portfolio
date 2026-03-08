import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { projects, getProjectBySlug } from '@/data/projects'
import GlassCard from '@/components/ui/GlassCard'
import Tag from '@/components/ui/Tag'
import BrowserMockup from '@/components/projects/BrowserMockup'
import MermaidDiagram from '@/components/projects/MermaidDiagram'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProjectBySlug(params.slug)
  if (!project) return {}
  return {
    title: project.name,
    description: project.tagline,
  }
}

export default function ProjectDetailPage({ params }: Props) {
  const project = getProjectBySlug(params.slug)
  if (!project) notFound()

  return (
    <div className="py-16 sm:py-20">
      <div className="section-container">

        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-dark-slate/50 font-mono" aria-label="Breadcrumb">
          <Link href="/projects" className="hover:text-salmon transition-colors">
            Projects
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-dark-slate">{project.name}</span>
        </nav>

        {/* Hero */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h1 className="section-heading text-4xl sm:text-5xl">{project.name}</h1>
              <p className="section-subheading max-w-2xl">{project.tagline}</p>
            </div>

            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-salmon text-white
                         font-semibold text-sm shadow-sm hover:bg-salmon-dark transition-all duration-200
                         hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-salmon/50
                         motion-reduce:hover:translate-y-0 whitespace-nowrap self-start"
            >
              View Live App ↗
            </a>
          </div>

          {/* Tags */}
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Tag key={tag} variant="default">
                {tag}
              </Tag>
            ))}
          </div>
        </div>

        {/* Browser mockup */}
        <BrowserMockup url={project.liveUrl.replace('https://', '')} className="mb-16">
          <div className="absolute inset-0 bg-gradient-to-br from-salmon/8 via-off-white to-teal/8 flex items-center justify-center">
            <div className="text-center p-8">
              <p className="font-mono text-sm text-dark-slate/30 mb-2">{project.liveUrl}</p>
              <p className="text-8xl font-black text-dark-slate/5 select-none">{project.name}</p>
              <p className="mt-4 text-dark-slate/30 text-sm max-w-sm">
                Screenshot or screen recording — add your media here.
              </p>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-mono text-salmon hover:text-salmon-dark"
              >
                Visit {project.liveUrl.replace('https://', '')} ↗
              </a>
            </div>
          </div>
        </BrowserMockup>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left column — main content */}
          <div className="lg:col-span-2 space-y-10">

            {/* Problem */}
            <section aria-labelledby="problem-heading">
              <GlassCard padding="lg">
                <h2
                  id="problem-heading"
                  className="font-bold text-dark-slate text-xl mb-1 flex items-center gap-2"
                >
                  <span className="text-salmon font-mono text-sm">01</span>
                  Problem Statement
                </h2>
                <div className="mt-4 h-px bg-white/50" aria-hidden="true" />
                <p className="mt-4 text-dark-slate/70 leading-relaxed text-sm sm:text-base">
                  {project.problem}
                </p>
              </GlassCard>
            </section>

            {/* Architecture */}
            <section aria-labelledby="architecture-heading">
              <GlassCard padding="lg">
                <h2
                  id="architecture-heading"
                  className="font-bold text-dark-slate text-xl mb-1 flex items-center gap-2"
                >
                  <span className="text-salmon font-mono text-sm">02</span>
                  Architecture
                </h2>
                <div className="mt-4 h-px bg-white/50" aria-hidden="true" />

                <div className="mt-6">
                  <MermaidDiagram chart={project.architecture.mermaid} />
                </div>

                <p className="mt-5 text-dark-slate/70 leading-relaxed text-sm sm:text-base">
                  {project.architecture.explanation}
                </p>
              </GlassCard>
            </section>

            {/* Data Model */}
            <section aria-labelledby="datamodel-heading">
              <GlassCard padding="lg">
                <h2
                  id="datamodel-heading"
                  className="font-bold text-dark-slate text-xl mb-1 flex items-center gap-2"
                >
                  <span className="text-salmon font-mono text-sm">04</span>
                  Data Model
                </h2>
                <div className="mt-4 h-px bg-white/50" aria-hidden="true" />
                <div className="mt-5 overflow-x-auto">
                  <pre className="text-xs font-mono text-dark-slate/70 bg-white/50 rounded-xl p-5 leading-relaxed whitespace-pre overflow-x-auto border border-white/60">
                    {project.dataModel}
                  </pre>
                </div>
              </GlassCard>
            </section>
          </div>

          {/* Right column — sidebar */}
          <div className="space-y-6">

            {/* Scale metrics */}
            <section aria-labelledby="scale-heading">
              <GlassCard padding="md">
                <h2
                  id="scale-heading"
                  className="font-bold text-dark-slate text-base mb-1 flex items-center gap-2"
                >
                  <span className="text-salmon font-mono text-sm">03</span>
                  Scale &amp; Reliability
                </h2>
                <div className="mt-3 h-px bg-white/50" aria-hidden="true" />

                <div className="mt-4 grid grid-cols-2 gap-3">
                  {project.scale.metrics.map(({ label, value }) => (
                    <div
                      key={label}
                      className="bg-white/40 rounded-xl p-3 border border-white/60 text-center"
                    >
                      <p className="font-mono text-base font-bold text-salmon">{value}</p>
                      <p className="text-dark-slate/50 text-xs mt-0.5 leading-snug">{label}</p>
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-dark-slate/60 text-xs leading-relaxed">
                  {project.scale.details}
                </p>
              </GlassCard>
            </section>

            {/* Live app CTA */}
            <GlassCard padding="md" className="text-center">
              <p className="text-dark-slate/50 text-xs font-mono mb-3 uppercase tracking-widest">
                see it in action
              </p>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl
                           bg-salmon text-white font-semibold text-sm shadow-sm
                           hover:bg-salmon-dark transition-all duration-200 hover:-translate-y-0.5
                           focus:outline-none focus:ring-2 focus:ring-salmon/50
                           motion-reduce:hover:translate-y-0"
              >
                View Live App ↗
              </a>
              <p className="mt-2 text-dark-slate/40 text-xs font-mono">
                {project.liveUrl.replace('https://', '')}
              </p>
            </GlassCard>

            {/* Tags */}
            <GlassCard padding="md">
              <p className="text-dark-slate/50 text-xs font-mono mb-3 uppercase tracking-widest">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Tag key={tag} variant="teal">
                    {tag}
                  </Tag>
                ))}
              </div>
            </GlassCard>

            {/* Nav to other projects */}
            <GlassCard padding="md">
              <p className="text-dark-slate/50 text-xs font-mono mb-3 uppercase tracking-widest">
                More Projects
              </p>
              <div className="space-y-2">
                {projects
                  .filter((p) => p.slug !== project.slug)
                  .map((p) => (
                    <Link
                      key={p.slug}
                      href={`/projects/${p.slug}`}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-white/50 transition-colors group"
                    >
                      <span className="text-sm font-medium text-dark-slate group-hover:text-salmon transition-colors">
                        {p.name}
                      </span>
                      <span className="text-dark-slate/30 text-xs group-hover:text-salmon transition-colors">
                        →
                      </span>
                    </Link>
                  ))}
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-16 pt-8 border-t border-white/40">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-dark-slate/60 hover:text-salmon transition-colors"
          >
            ← Back to all projects
          </Link>
        </div>

      </div>
    </div>
  )
}
