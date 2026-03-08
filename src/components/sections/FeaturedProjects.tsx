import Link from 'next/link'
import { featuredProjects } from '@/data/projects'
import Button from '@/components/ui/Button'
import ProjectCard from '@/components/projects/ProjectCard'

export default function FeaturedProjects() {
  return (
    <section className="py-20" id="projects" aria-labelledby="featured-projects-heading">
      <div className="section-container">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 id="featured-projects-heading" className="section-heading">
              Featured Projects
            </h2>
            <p className="section-subheading">
              Live apps — full-stack, production, real users.
            </p>
          </div>
          <Link
            href="/projects"
            className="hidden sm:flex items-center gap-1 text-sm font-semibold text-salmon hover:text-salmon-dark transition-colors"
          >
            All projects →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} maxTags={4} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Button href="/projects" variant="secondary">
            All Projects →
          </Button>
        </div>
      </div>
    </section>
  )
}
