import type { Experience } from './types'

export const experience: Experience[] = [
  {
    company: 'eBay',
    role: 'Software Engineer III',
    period: 'Jan 2024 – Present',
    location: 'New York, NY',
    current: true,
    promoted: true,
    summary:
      'Promoted to SWE III after driving high-impact backend initiatives on the seller listing platform (35M+ daily requests). Currently leading delivery of complex global features and AI-driven tooling.',
    bullets: [
      'Led backend delivery for phased rollout of Simple Delivery on the seller listing platform (35M+ daily requests) in Java and Spring Boot, driving an estimated $74.4M increase in 30-day revenue.',
      'Designed and implemented high-priority global market initiatives, including expanding international shipping solutions to mitigate tariff uncertainties and eliminating UK seller fees.',
      'Created AI-driven workflows with custom MCP servers for production alert triage using AI agents Claude Code and Cline, and accelerated org-wide adoption by hosting weekly GenAI demo sessions.',
    ],
    tags: ['Java', 'Spring Boot', 'MCP', 'AI Agents', 'GraphQL'],
  },
  {
    company: 'eBay',
    role: 'Software Engineer II',
    period: 'May 2022 – Dec 2023',
    location: 'New York, NY',
    current: false,
    summary:
      'Built core backend infrastructure for the seller listing platform, focusing on latency reduction, observability, and developer tooling.',
    bullets: [
      'Architected routing logic and Memcached schemas to simplify listing initialization flows, eliminating 500ms of latency, reducing E2E listing time by 2.8%, and increasing completion rate by 5.5%.',
      'Built an instrumentation library using Spring AOP to integrate GraphQL subgraphs with an internal observability platform, establishing monitoring and SLO dashboards for failed customer interactions.',
      'Won 1st Place in the 2023 eBay hackathon for an AI-assisted listing generation prototype.',
    ],
    tags: ['Java', 'Spring Boot', 'Memcached', 'Spring AOP', 'GraphQL', 'Grafana', 'Kibana'],
  },
  {
    company: 'General Motors',
    role: 'Software Engineer',
    period: 'July 2020 – May 2022',
    location: 'Detroit, MI',
    current: false,
    summary:
      'Developed full-stack web applications and vehicle communication microservices across a modern Java and TypeScript stack.',
    bullets: [
      'Developed and tested full-stack web apps and vehicle communication microservices using Java, Spring Boot, TypeScript, Angular, SQL, Hibernate, Cassandra, and Kafka.',
      'Automated provisioning of 30,000+ vehicles to sync databases with performance test simulator input.',
    ],
    tags: ['Java', 'Spring Boot', 'TypeScript', 'Angular', 'Kafka', 'Cassandra', 'Hibernate'],
  },
  {
    company: 'EAVE',
    role: 'Software Engineer Intern',
    period: 'July 2019 – Sept 2019',
    location: 'London, UK',
    current: false,
    summary: 'Worked on embedded systems and hardware communication protocols for audio hardware.',
    bullets: [
      'Boosted data transfer speed by 150% by implementing USB HID protocol using C++ and Python.',
      'Reduced production costs by automating headset quality assessment using Python.',
    ],
    tags: ['C++', 'Python', 'USB HID', 'Embedded Systems'],
  },
  {
    company: 'Laserfiche',
    role: 'Software Engineer Intern',
    period: 'June 2018 – Sept 2018',
    location: 'Long Beach, CA',
    current: false,
    summary: 'Built and tested full-stack web features in a production enterprise SaaS environment.',
    bullets: [
      'Developed and tested full-stack web apps using TypeScript, Angular, C# and ASP.NET.',
    ],
    tags: ['TypeScript', 'Angular', 'C#', 'ASP.NET'],
  },
]
