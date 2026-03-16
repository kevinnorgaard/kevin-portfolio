import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { projects, getProjectBySlug } from '@/data/projects'
import GlassCard from '@/components/ui/GlassCard'
import Tag from '@/components/ui/Tag'
import BrowserMockup from '@/components/projects/BrowserMockup'
import MermaidDiagram from '@/components/projects/MermaidDiagram'
import CodeBlock from '@/components/projects/CodeBlock'

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
    alternates: {
      canonical: `/projects/${project.slug}/`,
    },
    openGraph: {
      title: `${project.name} | Kevin Z Norgaard`,
      description: project.tagline,
      url: `https://kevinnorgaard.com/projects/${project.slug}`,
      ...(project.image && { images: [{ url: project.image }] }),
    },
  }
}

export default function ProjectDetailPage({ params }: Props) {
  const project = getProjectBySlug(params.slug)
  if (!project) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: project.name,
    description: project.summary,
    url: `https://kevinnorgaard.com/projects/${project.slug}/`,
    ...(project.githubUrl && { codeRepository: project.githubUrl }),
    programmingLanguage: project.tags,
    author: {
      '@type': 'Person',
      name: 'Kevin Z Norgaard',
      url: 'https://kevinnorgaard.com',
    },
    ...(project.video && {
      video: {
        '@type': 'VideoObject',
        name: `${project.name} Demo`,
        description: project.tagline,
        embedUrl: `https://www.youtube.com/embed/${project.video}`,
        thumbnailUrl: `https://img.youtube.com/vi/${project.video}/maxresdefault.jpg`,
      },
    }),
  }

  return (
    <div className="py-16 sm:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="section-container">

        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-dark-slate/50 font-mono" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-salmon transition-colors">
            Home
          </Link>
          <span aria-hidden="true">/</span>
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

            <div className="flex items-center gap-3 self-start flex-wrap">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white
                           font-semibold text-sm shadow-sm hover:opacity-90 transition-all duration-200
                           hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-salmon/50
                           motion-reduce:hover:translate-y-0 whitespace-nowrap"
                style={{ background: 'linear-gradient(90deg, #fca5a5, #f87171)' }}
              >
                {project.video ? 'Watch Demo ↗' : 'View Live App ↗'}
              </a>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-dark-slate/20
                             text-dark-slate font-semibold text-sm hover:border-dark-slate/40 transition-all
                             duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2
                             focus:ring-dark-slate/20 motion-reduce:hover:translate-y-0 whitespace-nowrap"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub ↗
                </a>
              )}
            </div>
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
        {project.video ? (
          <div className="mb-16 rounded-xl overflow-hidden border border-white/60 shadow-xl bg-white/20 backdrop-blur-sm">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src={`https://www.youtube.com/embed/${project.video}?rel=0`}
                title={`${project.name} demo video`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        ) : (
          <BrowserMockup url={project.liveUrl.replace('https://', '')} className="mb-16">
            {project.image ? (
              <img
                src={project.image}
                alt={`${project.name} screenshot`}
                className="w-full h-auto block"
              />
            ) : (
              <div className="aspect-video bg-gradient-to-br from-salmon/8 via-off-white to-teal/8 flex items-center justify-center">
                <div className="text-center p-8">
                  <p className="text-8xl font-black text-dark-slate/5 select-none">{project.name}</p>
                  <p className="mt-4 text-dark-slate/30 text-sm">Add a screenshot or video here.</p>
                </div>
              </div>
            )}
          </BrowserMockup>
        )}

        {/* Content */}
        <div className="space-y-10">

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
                <span className="text-salmon font-mono text-sm">03</span>
                Data Model
              </h2>
              <div className="mt-4 h-px bg-white/50" aria-hidden="true" />
              <div className={`mt-5 grid gap-5 ${project.dataModel.length > 1 ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
                {project.dataModel.map(({ label, lang, content }) => (
                  <div key={label}>
                    <p className="text-xs font-mono font-semibold text-salmon/80 uppercase tracking-widest mb-2">
                      {label}
                    </p>
                    <CodeBlock code={content} lang={lang} />
                  </div>
                ))}
              </div>
            </GlassCard>
          </section>
        </div>

        {/* More Projects */}
        <div className="mt-16 pt-8 border-t border-white/40">
          <p className="text-dark-slate/50 text-xs font-mono mb-4 uppercase tracking-widest">
            More Projects
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projects
              .filter((p) => p.slug !== project.slug)
              .map((p) => (
                <Link
                  key={p.slug}
                  href={`/projects/${p.slug}`}
                  className="glass-card p-4 flex items-center justify-between rounded-xl hover:bg-white/50 transition-colors group"
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
          <div className="mt-6">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-semibold text-dark-slate/60 hover:text-salmon transition-colors"
            >
              ← Back to all projects
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
