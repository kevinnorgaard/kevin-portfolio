import type { Metadata } from 'next'
import Link from 'next/link'
import { sortedProjects } from '@/data/projects'
import ProjectCard from '@/components/projects/ProjectCard'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Full-stack and backend projects by Kevin Z Norgaard.',
  alternates: {
    canonical: '/projects/',
  },
}

export default function ProjectsPage() {
  return (
    <div className="py-16 sm:py-20">
      <div className="section-container">

        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-dark-slate/50 font-mono" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-salmon transition-colors">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-dark-slate">Projects</span>
        </nav>

        <div className="mb-10">
          <h1 className="section-heading">Projects</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sortedProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} maxTags={4} />
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/40">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-dark-slate/60 hover:text-salmon transition-colors"
          >
            ← Back to home
          </Link>
        </div>

      </div>
    </div>
  )
}
