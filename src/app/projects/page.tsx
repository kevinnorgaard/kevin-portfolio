import type { Metadata } from 'next'
import { projects } from '@/data/projects'
import ProjectCard from '@/components/projects/ProjectCard'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Full-stack and backend projects by Kevin Norgaard — live apps with real users, production architecture, and measurable outcomes.',
}

export default function ProjectsPage() {
  return (
    <div className="py-16 sm:py-20">
      <div className="section-container">
        {/* Header */}
        <div className="mb-12">
          <h1 className="section-heading text-5xl sm:text-6xl">Projects</h1>
          <p className="section-subheading max-w-xl">
            Every app here is live, deployed, and serving real users. No CRUD demos — actual systems
            with architectural decisions behind them.
          </p>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} maxTags={5} />
          ))}
        </div>
      </div>
    </div>
  )
}
