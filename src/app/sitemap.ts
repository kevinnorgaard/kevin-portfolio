import type { MetadataRoute } from 'next'
import { projects } from '@/data/projects'

export default function sitemap(): MetadataRoute.Sitemap {
  const projectUrls = projects.map((p) => ({
    url: `https://kevinnorgaard.com/projects/${p.slug}/`,
    priority: 0.7 as const,
  }))

  return [
    { url: 'https://kevinnorgaard.com/', priority: 1.0 },
    { url: 'https://kevinnorgaard.com/projects/', priority: 0.8 },
    ...projectUrls,
  ]
}
