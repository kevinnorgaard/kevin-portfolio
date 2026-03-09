import type { SkillCategory } from './types'

export const skills: SkillCategory[] = [
  {
    category: 'Languages',
    icon: '{}',
    items: ['Java', 'Python', 'TypeScript', 'JavaScript', 'SQL'],
  },
  {
    category: 'Frameworks & Testing',
    icon: '🔩',
    items: ['Spring Boot', 'Angular', 'Spring AOP', 'Hibernate', 'JUnit', 'TestNG', 'Karate', 'Playwright'],
  },
  {
    category: 'AI & Automation',
    icon: '🤖',
    items: ['Prompt Engineering', 'MCP', 'Claude Code', 'Gemini CLI', 'Cline', 'n8n'],
  },
  {
    category: 'Infrastructure & Tools',
    icon: '🛠️',
    items: ['AWS', 'GCP', 'Kubernetes', 'Docker', 'Kafka', 'Jenkins', 'Grafana', 'Kibana'],
  },
  {
    category: 'Databases',
    icon: '💾',
    items: ['Cassandra', 'Memcached', 'MongoDB', 'MySQL'],
  },
]
