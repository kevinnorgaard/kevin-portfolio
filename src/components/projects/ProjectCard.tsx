'use client'

import Link from 'next/link'
import type { Project } from '@/data/types'
import GlassCard from '@/components/ui/GlassCard'
import Tag from '@/components/ui/Tag'


interface ProjectCardProps {
  project: Project
  maxTags?: number
}

export default function ProjectCard({ project, maxTags = 4 }: ProjectCardProps) {
  return (
    // `relative` + `group` on the card itself (not the Link) — no nested <a>
    <div className="relative group outline-none focus-within:ring-2 focus-within:ring-salmon/50 rounded-2xl transition-transform duration-300 ease-out hover:-translate-y-1 motion-reduce:hover:translate-y-0">
      <GlassCard
        hover
        padding="none"
        className="h-full flex flex-col overflow-hidden"
      >
        {/* Thumbnail */}
        <div className="relative h-44 border-b border-white/50 overflow-hidden bg-gradient-to-br from-salmon/8 via-white/20 to-teal/8">
          {/* Browser chrome dots */}
          <div className="absolute top-3 left-4 flex gap-1.5 z-10" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-red-300/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-300/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-300/70" />
          </div>

          {project.image || project.video ? (
            <img
              src={project.image || `https://img.youtube.com/vi/${project.video}/maxresdefault.jpg`}
              alt={`${project.name} screenshot`}
              className="w-full h-full object-cover object-top"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full p-4 text-center">
              <p className="text-4xl font-bold text-dark-slate/10 select-none">{project.name}</p>
            </div>
          )}

          {project.video && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-12 h-12 rounded-full bg-dark-slate/60 backdrop-blur-sm flex items-center justify-center group-hover:bg-salmon/80 transition-colors duration-200">
                <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-salmon/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-5 flex flex-col flex-1">
          {/* Status + name — the Link here is the stretched anchor covering the whole card */}
          <div className="mb-2">
            <h3 className="font-bold text-dark-slate text-lg group-hover:text-salmon transition-colors duration-200">
              {/*
                Stretched link: after:absolute after:inset-0 makes this <a> cover the
                entire card. The card just needs `relative` on the outer div (already set).
              */}
              <Link
                href={`/projects/${project.slug}`}
                className="after:absolute after:inset-0 after:rounded-2xl focus:outline-none"
                aria-label={`View ${project.name} project details`}
              >
                {project.name}
              </Link>
            </h3>
          </div>

          <p className="text-dark-slate/60 text-sm sm:text-base leading-relaxed flex-1 line-clamp-3">
            {project.tagline}
          </p>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.slice(0, maxTags).map((tag) => (
              <Tag key={tag} variant="default">
                {tag}
              </Tag>
            ))}
            {project.tags.length > maxTags && (
              <Tag variant="default">+{project.tags.length - maxTags}</Tag>
            )}
          </div>

          {/* Footer — Live App sits above the stretched link via relative z-10 */}
          <div className="mt-4 pt-4 border-t border-white/50 flex items-center justify-between">
            <span className="text-xs text-dark-slate/40 font-mono">View details →</span>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white
                         text-xs font-semibold shadow-sm hover:opacity-90 transition-all duration-200
                         hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
              style={{ background: 'linear-gradient(90deg, #fca5a5, #f87171)' }}
              aria-label={`Open ${project.name} live app in new tab`}
            >
              {project.video ? 'Watch Demo ↗' : 'View Live App ↗'}
            </a>
          </div>
        </div>
      </GlassCard>
    </div>
  )
}
