import type { Experience } from './types'

export const experience: Experience[] = [
  {
    company: 'eBay',
    role: 'Software Engineer III',
    period: 'Jun 2022 – Present',
    location: 'San Jose, CA (Hybrid)',
    current: true,
    summary:
      'Building and scaling high-traffic backend systems that process 35M+ daily requests across eBay\'s core buying and selling platform. Focus on distributed systems reliability, observability, and developer experience.',
    bullets: [
      'Placeholder — architected and owned a critical Java/Spring Boot microservice handling 35M+ daily requests with 99.99% SLA, reducing P95 latency by X% through query optimization and Redis caching.',
      'Placeholder — led observability initiative integrating DataDog APM and distributed tracing across N services, reducing mean-time-to-detect (MTTD) for production incidents by X%.',
      'Placeholder — designed and shipped [feature] — add details about the business impact and technical approach here.',
      'Placeholder — collaborated with platform team to migrate legacy monolith service to domain-driven microservice architecture, improving deployment frequency and reducing blast radius of incidents.',
      'Placeholder — mentored junior engineers and conducted technical interviews; contributed to team growth from N to N engineers.',
    ],
    tags: ['Java', 'Spring Boot', 'Microservices', 'Redis', 'Kafka', 'PostgreSQL', 'DataDog', 'AWS', 'Docker', 'Kubernetes'],
  },
  {
    company: 'General Motors',
    role: 'Software Engineer',
    period: 'Jan 2021 – Jun 2022',
    location: 'Detroit, MI (Remote)',
    current: false,
    summary:
      'Developed full-stack web applications and internal tooling for GM\'s digital platform teams, working across microservices and frontend systems in an agile environment.',
    bullets: [
      'Placeholder — built and maintained [feature/service] using React and Java Spring Boot, serving X internal/external users and supporting [business function].',
      'Placeholder — contributed to microservices migration effort, decomposing a monolithic application into independently deployable services with CI/CD pipelines on [platform].',
      'Placeholder — implemented [integration or API] that reduced manual process time by X hours/week, enabling the team to [outcome].',
      'Placeholder — participated in on-call rotation; authored runbooks and improved alerting coverage that reduced alert fatigue by X%.',
    ],
    tags: ['Java', 'Spring Boot', 'React', 'TypeScript', 'REST APIs', 'Jenkins', 'Docker', 'PostgreSQL', 'Agile'],
  },
]
