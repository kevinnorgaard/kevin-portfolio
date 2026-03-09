'use client'

import { useState } from 'react'
import { experience } from '@/data/experience'
import GlassCard from '@/components/ui/GlassCard'
import Tag from '@/components/ui/Tag'

// First 3 entries are the main roles (eBay III, eBay II, GM); last 2 are internships
const mainExperience = experience.slice(0, 3)
const internships = experience.slice(3)

export default function ExperiencePreview() {
  const [showAll, setShowAll] = useState(false)

  const visible = showAll ? experience : mainExperience

  return (
    <section className="py-20" id="experience" aria-labelledby="experience-heading">
      <div className="section-container">
        <div className="mb-10">
          <h2 id="experience-heading" className="section-heading">
            Experience
          </h2>
        </div>

        {/* Timeline — the line sits at left-4 (16px), dot is centered on it */}
        <div className="relative">
          <div
            className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-teal/40 via-teal/20 to-transparent hidden sm:block"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-5">
            {visible.map((exp, i) => (
              <div key={`${exp.company}-${i}`} className="sm:pl-14 relative">
                {/* Dot — centered on the line (left-4 = 16px, dot is w-4 = 16px → -left-2 centers it) */}
                <div
                  className="hidden sm:flex absolute left-4 top-[38px] -translate-x-1/2 w-4 h-4 rounded-full bg-white border-2 border-teal/50 items-center justify-center shadow-sm"
                  aria-hidden="true"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-teal" />
                </div>

                <GlassCard
                  padding="lg"
                  className="hover:bg-white/50 transition-colors duration-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-dark-slate text-lg">
                          {exp.role}, {exp.company}
                        </h3>
                        {exp.current && (
                          <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-teal/15 border border-teal/30 text-teal-dark">
                            current
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="sm:text-right shrink-0">
                      <p className="font-mono text-xs text-dark-slate">{exp.period}</p>
                      <p className="font-mono text-xs text-dark-slate mt-0.5">{exp.location}</p>
                    </div>
                  </div>

                  <ul className="mt-3 space-y-2">
                    {exp.bullets.map((bullet, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-dark-slate">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal/60 flex-shrink-0" aria-hidden="true" />
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {exp.tags.map((tag) => (
                      <Tag key={tag} variant="teal">
                        {tag}
                      </Tag>
                    ))}
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>

          {/* View all / collapse toggle */}
          <div className="mt-6 sm:pl-14">
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-sm font-semibold text-dark-slate/50 hover:text-teal transition-colors duration-200"
            >
              {showAll
                ? `↑ Hide internships`
                : `+ View ${internships.length} earlier internships`}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
