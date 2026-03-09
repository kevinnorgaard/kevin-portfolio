import Link from 'next/link'
import { featuredProjects } from '@/data/projects'
import ProjectCard from '@/components/projects/ProjectCard'

export default function FeaturedProjects() {
  return (
    <section className="py-20" id="projects" aria-labelledby="projects-heading">
      <div className="section-container">
        <div className="mb-10 flex items-end justify-between gap-4">
          <h2 id="projects-heading" className="section-heading">
            Projects
          </h2>
          <Link
            href="/projects"
            className="text-sm font-semibold text-dark-slate/50 hover:text-salmon transition-colors whitespace-nowrap"
          >
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} maxTags={4} />
          ))}
        </div>
      </div>
    </section>
  )
}
