export interface ScaleMetric {
  label: string
  value: string
}

export interface ProjectArchitecture {
  mermaid: string
  explanation: string
}

export interface ProjectScale {
  metrics: ScaleMetric[]
  details: string
}

export interface Project {
  slug: string
  name: string
  liveUrl: string
  githubUrl?: string
  tagline: string
  summary: string
  tags: string[]
  image?: string
  video?: string
  featured: boolean
  status: 'live' | 'beta' | 'archived'
  problem: string
  architecture: ProjectArchitecture
  scale: ProjectScale
  dataModel: { label: string; lang: string; content: string }[]
}

export interface ExperienceBullet {
  text: string
}

export interface Experience {
  company: string
  role: string
  period: string
  location: string
  summary: string
  bullets: string[]
  tags: string[]
  current?: boolean
  promoted?: boolean // true if this role was a promotion at the same company
}

export interface SkillCategory {
  category: string
  icon: string
  items: string[]
}
