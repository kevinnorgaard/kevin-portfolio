import Hero from '@/components/sections/Hero'
import FeaturedProjects from '@/components/sections/FeaturedProjects'
import SkillsSnapshot from '@/components/sections/SkillsSnapshot'
import ExperiencePreview from '@/components/sections/ExperiencePreview'
import ContactSection from '@/components/sections/ContactSection'

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* Spacer to push content below the fixed hero */}
      <div className="h-dvh" aria-hidden="true" />
      {/* Content slides over the hero */}
      <div className="relative z-10 parallax-content rounded-t-3xl shadow-[0_-20px_60px_rgba(0,0,0,0.08)]">
        <FeaturedProjects />
        <SkillsSnapshot />
        <ExperiencePreview />
        <ContactSection />
      </div>
    </>
  )
}
