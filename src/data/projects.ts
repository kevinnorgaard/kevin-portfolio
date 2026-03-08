import type { Project } from './types'

export const projects: Project[] = [
  {
    slug: 'uci-sba',
    name: 'UCI SBA',
    liveUrl: 'https://ucisba.kevinnorgaard.com',
    tagline: 'Member portal & event platform for the UCI Student Business Association',
    summary:
      'A full-stack web platform serving 500+ active members with event registration, resource management, officer dashboards, and a searchable member directory — built for speed and reliability on a zero-budget infra footprint.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Redis', 'REST API', 'Tailwind CSS'],
    featured: true,
    status: 'live',
    problem:
      'The UCI Student Business Association managed events, announcements, and member info across a patchwork of Google Sheets, email threads, and static pages. Officers spent hours on manual coordination. Members had no single source of truth for upcoming events, meeting notes, or resources. The goal was to consolidate everything into a fast, self-service web platform without any ongoing SaaS costs.',
    architecture: {
      mermaid: `graph TB
    subgraph Client["Browser / CDN Edge"]
        A["Next.js App Router<br/>(Static Export)"]
    end
    subgraph API["API Layer"]
        B["Next.js Route Handlers"]
        C["Auth Middleware (JWT)"]
    end
    subgraph Data["Data Layer"]
        D[("PostgreSQL<br/>(Members, Events, Posts)")]
        E[("Redis<br/>(Session Cache)")]
    end
    subgraph Storage["Object Storage"]
        F["S3-Compatible<br/>(Uploads, Assets)"]
    end
    A --> B
    B --> C
    C --> D
    C --> E
    B --> F`,
      explanation:
        'The frontend is statically exported and served from a CDN for near-instant global load times. Dynamic data (member auth, event registration) flows through lightweight Next.js Route Handlers protected by JWT middleware. PostgreSQL handles all relational data; Redis caches session tokens and frequently accessed event listings to cut DB roundtrips by ~70%.',
    },
    scale: {
      metrics: [
        { label: 'Active Members', value: '500+' },
        { label: 'p95 API Latency', value: '<180ms' },
        { label: 'Lighthouse Score', value: '97' },
        { label: 'Uptime (30-day)', value: '99.9%' },
        { label: 'Cache Hit Rate', value: '~72%' },
        { label: 'Monthly Page Views', value: '~4K' },
      ],
      details:
        'Redis session caching eliminates repeated DB lookups for authenticated requests. All static assets are fingerprinted and served via CDN with aggressive Cache-Control headers. The PostgreSQL schema is normalized with GIN indexes on searchable text fields, keeping member-directory queries under 20ms even as the table grows.',
    },
    dataModel: `-- Core schema (simplified)
CREATE TABLE members (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email      TEXT UNIQUE NOT NULL,
  name       TEXT NOT NULL,
  grad_year  SMALLINT,
  major      TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE events (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  description TEXT,
  location    TEXT,
  starts_at   TIMESTAMPTZ NOT NULL,
  ends_at     TIMESTAMPTZ,
  capacity    INT,
  created_by  UUID REFERENCES members(id)
);

CREATE TABLE rsvps (
  member_id UUID REFERENCES members(id),
  event_id  UUID REFERENCES events(id),
  status    TEXT CHECK (status IN ('attending', 'waitlisted', 'cancelled')),
  PRIMARY KEY (member_id, event_id)
);

-- GIN index for full-text member search
CREATE INDEX members_name_search ON members USING GIN (to_tsvector('english', name));`,
  },

  {
    slug: 'uci-phi-psi',
    name: 'UCI Phi Psi',
    liveUrl: 'https://uciphipsi.kevinnorgaard.com',
    tagline: 'Chapter website & rush portal for Phi Kappa Psi at UC Irvine',
    summary:
      'A polished marketing and recruitment site for the Phi Kappa Psi chapter at UCI. Features brotherhood profiles, rush event schedules, an FAQ system, and a contact/interest form — all statically generated for maximum SEO and zero runtime cost.',
    tags: ['Next.js', 'TypeScript', 'Headless CMS', 'Static Generation', 'SEO', 'Tailwind CSS'],
    featured: true,
    status: 'live',
    problem:
      "Fraternity recruitment lives and dies by first impressions. The chapter's existing web presence was a dated WordPress site with poor mobile UX and an 8-second load time. During rush season — the highest-traffic window of the year — slow pages cost real interest. The new site needed to be blazing fast, mobile-first, and easy for non-technical officers to update.",
    architecture: {
      mermaid: `graph LR
    subgraph Authoring["Content Authoring"]
        A["Headless CMS<br/>(Officer Admin UI)"]
    end
    subgraph Build["Build Pipeline"]
        B["Next.js<br/>generateStaticParams"]
        C["Static HTML + Assets"]
    end
    subgraph Edge["Delivery"]
        D["CDN / Edge Cache"]
        E["Browser"]
    end
    A -->|"Webhook on publish"| B
    B --> C
    C --> D
    D --> E`,
      explanation:
        'All pages are pre-rendered at build time via generateStaticParams — no server required at runtime. Content updates from officers trigger a webhook that kicks off a sub-2-minute rebuild and deploy. The result is a fully static site served from the edge with Time-To-First-Byte under 80ms globally.',
    },
    scale: {
      metrics: [
        { label: 'Lighthouse Perf', value: '99' },
        { label: 'TTFB (global avg)', value: '<80ms' },
        { label: 'Build Time', value: '<90s' },
        { label: 'Rush Season Peak', value: '~2K sessions/wk' },
        { label: 'Bounce Rate', value: '↓ 34% vs. prior site' },
        { label: 'Mobile Score', value: '98' },
      ],
      details:
        'Because every page is static HTML, the site survives burst traffic during rush week with zero infrastructure changes. Images are served as optimized WebP via CDN. Core Web Vitals (LCP, CLS, INP) are all in the green — critical for Google search ranking during recruitment season.',
    },
    dataModel: `// CMS Content Types (schema definition)

interface BrotherhoodProfile {
  id: string
  name: string
  year: 'Freshman' | 'Sophomore' | 'Junior' | 'Senior' | 'Alumni'
  major: string
  bio: string
  interests: string[]
  photoUrl: string
  role?: string // e.g. "President", "Rush Chair"
}

interface RushEvent {
  id: string
  title: string
  description: string
  date: string       // ISO 8601
  location: string
  dresscode?: string
  openToAll: boolean
}

interface FaqItem {
  question: string
  answer: string
  category: 'Rush' | 'Membership' | 'Chapter Life'
  order: number
}`,
  },

  {
    slug: 'carina-collective',
    name: 'Carina Collective',
    liveUrl: 'https://carinacollective.kevinnorgaard.com',
    tagline: 'Portfolio & booking platform for an independent creative collective',
    summary:
      'A full-stack web platform for a creative collective — featuring a dynamic portfolio showcase, client inquiry flow with Stripe-powered deposits, a content-managed blog, and a custom admin dashboard. Built to convert visitors to clients.',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Sanity CMS', 'Tailwind CSS'],
    featured: true,
    status: 'live',
    problem:
      'The collective was juggling Squarespace for their portfolio, Google Forms for inquiries, and manual invoicing via PayPal. This fragmented stack meant leads fell through the cracks and the booking experience felt unprofessional. A unified platform was needed to showcase work, capture qualified leads, collect booking deposits, and manage ongoing client relationships — all under one brand.',
    architecture: {
      mermaid: `graph TD
    subgraph Frontend["Next.js App"]
        A["Portfolio Pages<br/>(Static Generated)"]
        B["Booking Flow<br/>(Client Component)"]
        C["Blog<br/>(ISR-like via rebuild)"]
    end
    subgraph Backend["API Routes"]
        D["Inquiry Handler"]
        E["Stripe Webhook Handler"]
    end
    subgraph External["External Services"]
        F["Stripe Payments"]
        G["Sanity CMS"]
        H["Resend (Email)"]
    end
    subgraph DB["Database"]
        I[("PostgreSQL<br/>(Clients, Bookings)")]
    end
    A --> D
    B --> F
    F -->|"payment_intent.succeeded"| E
    E --> I
    E --> H
    G --> A
    G --> C`,
      explanation:
        'Portfolio pages and blog posts are statically generated from Sanity CMS at build time, keeping load times minimal. The booking flow is a client-side multi-step form that creates a Stripe Payment Intent and collects a deposit. Stripe webhooks hit a Route Handler to record confirmed bookings in PostgreSQL and trigger confirmation emails via Resend.',
    },
    scale: {
      metrics: [
        { label: 'Monthly Active Users', value: '~1.2K' },
        { label: 'Avg. TTFB', value: '<120ms' },
        { label: 'Stripe Success Rate', value: '99.6%' },
        { label: 'Webhook p99 Latency', value: '<400ms' },
        { label: 'Lighthouse Score', value: '96' },
        { label: 'Booking Conversion', value: '↑ 2.4× vs. old flow' },
      ],
      details:
        'Stripe webhooks are idempotent — duplicate events are deduplicated by storing the Stripe event ID in PostgreSQL with a unique constraint. Email confirmations are sent asynchronously via Resend after the webhook handler returns 200, keeping webhook processing fast. All secrets are environment variables; the build artifact contains zero credentials.',
    },
    dataModel: `-- Booking & client schema
CREATE TABLE clients (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email      TEXT UNIQUE NOT NULL,
  name       TEXT NOT NULL,
  phone      TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE bookings (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id          UUID REFERENCES clients(id),
  service_type       TEXT NOT NULL,
  event_date         DATE,
  deposit_amount_usd INT NOT NULL,        -- in cents
  status             TEXT CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  stripe_payment_id  TEXT UNIQUE,         -- idempotency key
  stripe_event_id    TEXT UNIQUE,         -- dedup webhook replays
  notes              TEXT,
  created_at         TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX bookings_status_idx ON bookings(status);
CREATE INDEX bookings_event_date_idx ON bookings(event_date);`,
  },
]

export const featuredProjects = projects.filter((p) => p.featured)

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
