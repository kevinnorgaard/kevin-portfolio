import { skills } from '@/data/skills'
import GlassCard from '@/components/ui/GlassCard'
import Tag from '@/components/ui/Tag'

export default function SkillsSnapshot() {
  return (
    <section className="py-20 bg-white/10" id="skills" aria-labelledby="skills-heading">
      <div className="section-container">
        <div className="mb-10">
          <h2 id="skills-heading" className="section-heading">
            Technical Skills
          </h2>
          <p className="section-subheading">
            Production experience across the full backend &amp; infra stack.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map(({ category, icon, items }) => (
            <GlassCard key={category} padding="md" className="hover:bg-white/50 transition-colors duration-200">
              <div className="flex items-center gap-2.5 mb-4">
                <span className="text-xl" aria-hidden="true">{icon}</span>
                <h3 className="font-semibold text-dark-slate text-sm">{category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <Tag key={item} variant="default">
                    {item}
                  </Tag>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
