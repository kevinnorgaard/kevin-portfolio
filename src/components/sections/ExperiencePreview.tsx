import Link from 'next/link'
import { experience } from '@/data/experience'
import GlassCard from '@/components/ui/GlassCard'
import Tag from '@/components/ui/Tag'

export default function ExperiencePreview() {
  return (
    <section className="py-20" id="experience" aria-labelledby="experience-heading">
      <div className="section-container">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 id="experience-heading" className="section-heading">
              Experience
            </h2>
            <p className="section-subheading">
              Backend systems at scale &mdash; enterprise grade.
            </p>
          </div>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div
            className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-salmon/40 via-teal/30 to-transparent hidden sm:block"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-6">
            {experience.map((exp, i) => (
              <GlassCard
                key={`${exp.company}-${i}`}
                padding="lg"
                className="sm:ml-16 relative hover:bg-white/50 transition-colors duration-200"
              >
                {/* Timeline dot */}
                <div
                  className="hidden sm:flex absolute -left-[52px] top-8 w-8 h-8 rounded-full bg-white/80 border-2 border-salmon/40 items-center justify-center shadow-sm"
                  aria-hidden="true"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-salmon" />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-dark-slate text-lg">{exp.role}</h3>
                      {exp.current && (
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-teal/15 border border-teal/30 text-teal-dark">
                          current
                        </span>
                      )}
                    </div>
                    <p className="text-salmon font-semibold text-sm mt-0.5">{exp.company}</p>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="font-mono text-xs text-dark-slate/50">{exp.period}</p>
                    <p className="font-mono text-xs text-dark-slate/40 mt-0.5">{exp.location}</p>
                  </div>
                </div>

                <p className="mt-3 text-dark-slate/65 text-sm leading-relaxed">
                  {exp.summary}
                </p>

                {/* Bullet highlights — show first 2 */}
                <ul className="mt-4 space-y-2">
                  {exp.bullets.slice(0, 2).map((bullet, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-dark-slate/60">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-salmon/60 flex-shrink-0" aria-hidden="true" />
                      {bullet}
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {exp.tags.slice(0, 6).map((tag) => (
                    <Tag key={tag} variant="teal">
                      {tag}
                    </Tag>
                  ))}
                  {exp.tags.length > 6 && (
                    <Tag variant="teal">+{exp.tags.length - 6}</Tag>
                  )}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
