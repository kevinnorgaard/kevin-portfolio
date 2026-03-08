import Hero from '@/components/sections/Hero'
import FeaturedProjects from '@/components/sections/FeaturedProjects'
import SkillsSnapshot from '@/components/sections/SkillsSnapshot'
import ExperiencePreview from '@/components/sections/ExperiencePreview'
import ContactSection from '@/components/sections/ContactSection'

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <SkillsSnapshot />
      <ExperiencePreview />
      <ContactSection />
    </>
  )
}
