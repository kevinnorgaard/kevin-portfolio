import type { SkillCategory } from './types'

export const skills: SkillCategory[] = [
  {
    category: 'Backend',
    icon: '⚙️',
    items: ['Java', 'Spring Boot', 'Python', 'Node.js', 'REST APIs', 'GraphQL', 'gRPC', 'Kafka', 'Microservices'],
  },
  {
    category: 'Frontend',
    icon: '🖥️',
    items: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'HTML/CSS', 'Zustand', 'React Query'],
  },
  {
    category: 'Data & Storage',
    icon: '🗄️',
    items: ['PostgreSQL', 'MySQL', 'Redis', 'Elasticsearch', 'MongoDB', 'S3', 'DynamoDB'],
  },
  {
    category: 'Infrastructure',
    icon: '☁️',
    items: ['AWS (EC2, S3, Lambda, ECS)', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'Nginx'],
  },
  {
    category: 'Observability',
    icon: '📊',
    items: ['DataDog', 'Splunk', 'OpenTelemetry', 'Prometheus', 'Grafana', 'PagerDuty'],
  },
  {
    category: 'AI & ML',
    icon: '🤖',
    items: ['LangChain', 'OpenAI API', 'Prompt Engineering', 'Vector DBs (Pinecone)', 'RAG Pipelines', 'Fine-tuning'],
  },
]
