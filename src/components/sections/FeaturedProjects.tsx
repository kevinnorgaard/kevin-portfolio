'use client'

import { useState } from 'react'
import { featuredProjects } from '@/data/projects'
import ProjectCard from '@/components/projects/ProjectCard'

const pinnedProjects = featuredProjects.slice(0, 3)
const extraProjects = featuredProjects.slice(3)

export default function FeaturedProjects() {
  const [showAll, setShowAll] = useState(false)

  const visible = showAll ? featuredProjects : pinnedProjects

  return (
    <section className="py-20" id="projects" aria-labelledby="projects-heading">
      <div className="section-container">
        <div className="mb-10">
          <h2 id="projects-heading" className="section-heading">
            Projects
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visible.map((project) => (
            <ProjectCard key={project.slug} project={project} maxTags={4} />
          ))}
        </div>

        {extraProjects.length > 0 && (
          <div className="mt-6">
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-sm font-semibold text-dark-slate/50 hover:text-teal transition-colors duration-200"
            >
              {showAll
                ? '↑ Hide earlier projects'
                : `+ View ${extraProjects.length} more projects`}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
