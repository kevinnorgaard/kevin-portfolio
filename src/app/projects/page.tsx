import type { Metadata } from 'next'
import Link from 'next/link'
import { projects } from '@/data/projects'
import GlassCard from '@/components/ui/GlassCard'
import Tag from '@/components/ui/Tag'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Full-stack and backend projects by Kevin Norgaard — live apps with real users, production architecture, and measurable outcomes.',
}

const statusColors: Record<string, string> = {
  live: 'bg-teal/15 text-teal-dark border-teal/30',
  beta: 'bg-salmon/15 text-salmon-dark border-salmon/30',
  archived: 'bg-dark-slate/10 text-dark-slate/50 border-dark-slate/20',
}

export default function ProjectsPage() {
  return (
    <div className="py-16 sm:py-20">
      <div className="section-container">

        {/* Header */}
        <div className="mb-12">
          <h1 className="section-heading text-5xl sm:text-6xl">
            Projects
          </h1>
          <p className="section-subheading max-w-xl">
            Every app here is live, deployed, and serving real users. No CRUD demos — actual systems
            with architectural decisions behind them.
          </p>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="block group outline-none focus-visible:ring-2 focus-visible:ring-salmon/50 rounded-2xl"
              aria-label={`View ${project.name} project details`}
            >
              <GlassCard hover padding="none" className="h-full flex flex-col overflow-hidden">
                {/* Visual placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-salmon/8 via-white/20 to-teal/8 flex items-center justify-center border-b border-white/50 overflow-hidden">
                  <div className="absolute top-3 left-4 flex gap-1.5" aria-hidden="true">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-300/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-300/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-300/70" />
                  </div>
                  <div className="text-center p-6">
                    <p className="font-mono text-xs text-dark-slate/40 mb-1">
                      {project.liveUrl.replace('https://', '')}
                    </p>
                    <p className="text-5xl font-black text-dark-slate/8 select-none">
                      {project.name}
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-salmon/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h2 className="font-bold text-dark-slate text-lg group-hover:text-salmon transition-colors duration-200">
                      {project.name}
                    </h2>
                    <span
                      className={`flex-shrink-0 font-mono text-[10px] px-2 py-0.5 rounded-full border ${statusColors[project.status]}`}
                    >
                      {project.status}
                    </span>
                  </div>

                  <p className="text-dark-slate/60 text-sm leading-relaxed flex-1 line-clamp-3">
                    {project.tagline}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 5).map((tag) => (
                      <Tag key={tag} variant="default">
                        {tag}
                      </Tag>
                    ))}
                    {project.tags.length > 5 && (
                      <Tag variant="default">+{project.tags.length - 5}</Tag>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/50 flex items-center justify-between">
                    <span className="text-xs text-dark-slate/40 font-mono">
                      View case study →
                    </span>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs font-semibold text-teal hover:text-teal-dark transition-colors"
                      aria-label={`Open ${project.name} live app in new tab`}
                    >
                      Live App ↗
                    </a>
                  </div>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
