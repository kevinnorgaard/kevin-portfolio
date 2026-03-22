import type { Project } from './types'

export const projects: Project[] = [
  {
    slug: 'pulse',
    name: 'Pulse Analytics',
    liveUrl: 'https://pulse.kevinnorgaard.com/?mock=true',
    // githubUrl: 'https://github.com/kevinnorgaard/pulse',
    tagline: 'Custom analytics dashboard tracking pageviews, clicks, and full user journeys across multiple sites',
    period: '2025',
    summary:
      'A lightweight analytics platform built as an alternative to Google Analytics — designed to track pageviews, clicks, scroll depth, and session timelines across multiple sites without cookies or third-party scripts. Features real-time user journey visualization, cross-subdomain session stitching, geographic breakdowns, and a first-party tracker that works even when ad blockers are active.',
    image: '/images/pulse.png',
    detailImage: '/images/pulse-detail.png',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Vercel', 'Tailwind CSS', 'PostgreSQL'],
    order: 4,
    featured: true,
    status: 'live',
    problem:
      'Google Analytics is bloated, privacy-invasive, and blocked by most ad blockers — meaning traffic data for personal projects is incomplete and unreliable. I needed a lightweight, self-hosted analytics tool that could track real user behavior across multiple subdomains (portfolio, project sites) with full session-level detail, without relying on third-party cookies or scripts that get blocked.',
    architecture: {
      mermaid: `graph TD
    A["Tracked Sites"] -->|"First-party JS"| B["Pulse Tracker (tracker.js)"]
    B -->|"POST /api/track"| C["Next.js API Route"]
    C -->|"Geo headers"| D["Vercel Edge"]
    C -->|"Insert"| E["Supabase (PostgreSQL)"]
    F["Dashboard (Next.js)"] -->|"Query"| E
    F -->|"Auth"| G["iron-session"]`,
      explanation:
        'A lightweight first-party tracker script (< 4 KB) is embedded on each site and sends events (pageviews, clicks, scrolls, time-on-page) to the Pulse API. The API route enriches events with geo data from Vercel edge headers (country, region, city) and device metadata, then inserts into Supabase. The dashboard queries Supabase to render metrics, charts, geographic breakdowns, and full session-level user journey timelines with cross-subdomain stitching.',
    },
    scale: {
      metrics: [
        { label: 'Sites Tracked', value: '4' },
        { label: 'Tracker Size', value: '< 4 KB' },
        { label: 'Event Types', value: '6' },
        { label: 'Session Replay', value: 'Timeline' },
        { label: 'Cross-domain', value: 'Cookie-based' },
        { label: 'Data Retention', value: '90 days' },
      ],
      details:
        'The tracker captures 6 event types (pageview, click, scroll, time_on_page, dead_click, rage_click) and uses a shared first-party cookie across subdomains for cross-site session stitching. Session timelines visualize the full user journey — page navigations, clicks, scroll milestones, and away gaps — with color-coded nodes per site. Events auto-expire after 90 days via a pg_cron job.',
    },
    dataModel: [
      {
        label: 'Supabase Events Table',
        lang: 'sql',
        content: `CREATE TABLE events (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  site_id       TEXT NOT NULL,
  visitor_id    TEXT NOT NULL,
  session_id    TEXT NOT NULL,
  event_type    TEXT NOT NULL,        -- pageview | click | scroll | time_on_page | dead_click | rage_click
  timestamp     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  url           TEXT,
  title         TEXT,
  referrer      TEXT,
  scroll_depth  SMALLINT,
  element_text  TEXT,
  element_href  TEXT,
  active_time   INTEGER,              -- ms spent on page
  click_count   SMALLINT,             -- for rage clicks
  country       TEXT,
  region        TEXT,
  city          TEXT,
  device_type   TEXT,
  browser       TEXT,
  os            TEXT
);`,
      },
    ],
  },

  {
    slug: 'ai-fitness-coach',
    name: 'AI Fitness Coach',
    liveUrl: 'https://youtu.be/lWX_sNq0rns',
    githubUrl: 'https://github.com/kevinnorgaard/ai-fitness-coach',
    tagline: 'AI agent that plans workouts based on Strava biometric data and Google Calendar workout history',
    period: '2025',
    summary:
      'A personalized fitness coaching system powered by Claude AI that automatically reviews Strava activity data and Google Calendar history to plan, adjust, and log hypertrophy/strength workouts and running sessions. Uses MCP servers hosted in n8n to connect Claude Code to real-time fitness and scheduling APIs.',
    video: 'lWX_sNq0rns',
    tags: ['Claude Code', 'MCP', 'Skills', 'Docker', 'n8n'],
    order: 1,
    featured: true,
    status: 'live',
    problem:
      'Maintaining a structured 5-day upper/lower strength split alongside a running program requires constant manual tracking — logging sets, monitoring progression, adjusting for readiness, and coordinating schedules. Traditional fitness apps lack the intelligence to dynamically adapt workouts based on real performance data, recovery signals, and calendar constraints.',
    architecture: {
      mermaid: `graph TD
    A["Claude Code CLI"] -->|"MCP Protocol"| B["n8n (Docker)"]
    B --> C["Strava MCP Server"]
    B --> D["Google Calendar MCP Server"]
    C -->|"Activities, HR, Metrics"| E["Strava API"]
    D -->|"Schedule & History"| F["Google Calendar API"]
    A -->|"Reads"| G["Workout Program (XLSX/CSV)"]`,
      explanation:
        'Claude Code acts as the coaching agent, reading the workout program spreadsheet as ground truth and connecting to two MCP servers hosted in an n8n Docker container. The Strava MCP server fetches activity data, heart rate, and performance metrics from the Strava API. The Google Calendar MCP server reads past workout events to track progression and creates new scheduled sessions. Claude applies progression logic, readiness adjustments, and periodization rules to generate and log each workout.',
    },
    scale: {
      metrics: [
        { label: 'Training Split', value: '5-day U/L' },
        { label: 'MCP Servers', value: '2' },
        { label: 'Run Target', value: '10+ mi/wk' },
        { label: 'Progression', value: 'Auto' },
        { label: 'Data Sources', value: 'Strava + GCal' },
        { label: 'Coaching Agent', value: 'Claude AI' },
      ],
      details:
        'The system manages a 5-day upper/lower hypertrophy split (Bench, Squat, OHP, Hinge, Accessories) plus running sessions targeting 10+ miles per week. Progression is automatic — Claude adds reps first, then weight (2.5–5% increments) based on logged performance. Readiness metrics (HRV, sleep, RHR) adjust intensity per session.',
    },
    dataModel: [
      {
        label: 'Strava MCP Tools',
        lang: 'json',
        content: `{
  "tools": [
    {
      "name": "get_strava_activities",
      "description": "Get the last 30 Strava activities. Provides high-level summaries. Use get_strava_activity_by_id for full details.",
      "inputSchema": {
        "type": "object",
        "properties": {}
      }
    },
    {
      "name": "get_strava_activity_by_id",
      "description": "Get a Strava activity by ID. Returns full details including heart rate, best efforts by segment, etc.",
      "inputSchema": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "description": "activity id"
          }
        },
        "required": ["id"]
      }
    }
  ]
}`,
      },
      {
        label: 'Google Calendar MCP Tools',
        lang: 'json',
        content: `{
  "tools": [
    {
      "name": "calendar_listEvents",
      "description": "Get many events in Google Calendar",
      "inputSchema": {
        "type": "object",
        "properties": {
          "Limit": { "type": "number" },
          "After": { "type": "string" },
          "Before": { "type": "string" }
        },
        "required": ["Limit", "After", "Before"]
      }
    },
    {
      "name": "calendar_getEvent",
      "description": "Get an event in Google Calendar",
      "inputSchema": {
        "type": "object",
        "properties": {
          "Event_ID": { "type": "string" }
        },
        "required": ["Event_ID"]
      }
    },
    {
      "name": "calendar_createEvent",
      "description": "Create an event in Google Calendar",
      "inputSchema": {
        "type": "object",
        "properties": {
          "Start": { "type": "string" },
          "End": { "type": "string" },
          "event_title": { "type": "string" },
          "event_description": { "type": "string" }
        },
        "required": ["Start", "End", "event_title", "event_description"]
      }
    },
    {
      "name": "calendar_updateEvent",
      "description": "Update an event in Google Calendar",
      "inputSchema": {
        "type": "object",
        "properties": {
          "Event_ID": { "type": "string" },
          "Start": { "type": "string" },
          "End": { "type": "string" },
          "event_title": { "type": "string" },
          "event_description": { "type": "string" }
        },
        "required": ["Event_ID", "Start", "End", "event_title", "event_description"]
      }
    }
  ]
}`,
      },
    ],
  },


  {
    slug: 'uci-phi-psi',
    name: 'UCI Phi Kappa Psi Website',
    liveUrl: 'https://uciphipsi.kevinnorgaard.com',
    githubUrl: 'https://github.com/kevinnorgaard/pkp',
    tagline: 'Chapter platform serving recruits, members, and alumni with CMS-driven content and event check-ins',
    period: '2018 – 2022',
    summary:
      'A full-stack platform serving recruits, active members, and alumni — with CMS-driven exec board and leadership history profiles, a recruitment interest form and event check-in flow, per-event attendance tracking, composite photo galleries, and a password-protected admin dashboard. Collected 250+ PNM contacts and 150+ alumni profiles within two years.',
    image: '/images/uci-phi-psi.png',
    tags: ['Angular 21', 'TypeScript', 'Firebase', 'GraphQL', 'Apollo'],
    order: 2,
    featured: true,
    status: 'live',
    problem:
      'The Phi Kappa Psi chapter at UCI had no centralized digital presence — recruitment, alumni outreach, event coordination, and leadership history were all managed manually or scattered across disconnected tools. Officers needed a platform that could serve three distinct audiences (recruits, active members, alumni) and stay relevant year-round without requiring a developer for every content update or seasonal change.',
    architecture: {
      mermaid: `graph TD
    C["Angular SPA — Public"] -->|"GraphQL / Apollo"| A["Hygraph CMS"]
    C -.->|"route mode"| B["Environment Flag"]
    D["Angular SPA — Admin"] --> E["Firebase Auth"]
    D --> F["Firebase Realtime DB"]`,
      explanation:
        'Hygraph serves exec profiles, leadership history, and composite galleries via Apollo GraphQL — zero redeployment for content updates. The root route swaps at build time via an environment flag (normal / rush / philanthropy) to serve different seasonal landing pages from the same codebase. The admin dashboard is gated behind Firebase Auth and reads/writes rushee forms, event check-ins, and alumni records to Firebase Realtime Database.',
    },
    scale: {
      metrics: [
        { label: 'PNMs Collected', value: '250+' },
        { label: 'Alumni Profiles', value: '150+' },
        { label: 'Seasons Supported', value: '3' },
        { label: 'Deployments to Update', value: '0' },
        { label: 'Admin Auth', value: 'Firebase' },
        { label: 'CMS Updates', value: 'Real-time' },
      ],
      details:
        'Within two years of launch, the platform collected contact information for 250+ potential new members and 150+ alumni profiles. Seasonal transitions (rush, philanthropy) are handled by swapping the root route at build time via an environment flag — no backend changes required.',
    },
    dataModel: [
      {
        label: 'Firebase Realtime Database',
        lang: 'yaml',
        content: `forms:
  "{phone}":
    name:         "LastName, FirstName"
    email:        string
    year:         string
    major:        string
    minor:        string
    cumGpa:       string
    prevGpa:      string
    sports:       string
    achievements: string
    reasons:      string
    referral:     string
    notes:        string  # admin-added
    socialMedia:
      facebook:   string
      instagram:  string
      linkedin:   string

checkins:
  "{phone}":
    "{date}": true  # date format: "YYYY-M-D"

alumni:
  "{name}":
    fullName: string
    email:    string`,
      },
      {
        label: 'Hygraph CMS',
        lang: 'graphql',
        content: `type Image {
  fileName: String!
  url:      String!
}

type Executive {
  name:     String!
  position: String!
  image:    Image
  url:      String
  order:    Int!
}

type Leader {
  name:  String!
  title: String!
  year:  Int!
}

type MembershipPage {
  compositeImage: Image!
  compositeYear:  Int!
}`,
      },
    ],
  },

  {
    slug: 'uci-sba',
    name: 'UCI Sports Business Association Website',
    liveUrl: 'https://ucisba.kevinnorgaard.com',
    tagline: 'Student org website for the UC Irvine Sports Business Association, powered by Contentful CMS',
    period: '2020 – 2021',
    summary:
      'An Angular SPA with a centralized Contentful-driven content layer — featuring an interactive FullCalendar event calendar, exec board and alumni directory profiles, toggleable speaker archives, and Mailchimp newsletter integration. Officers update all content without redeployment.',
    image: '/images/uci-sba.png',
    tags: ['Angular', 'TypeScript', 'Contentful', 'RxJS', 'FullCalendar', 'Bootstrap 3', 'Moment.js'],
    order: 5,
    featured: true,
    status: 'live',
    problem:
      'The UCI Sports Business Association had no centralized web presence — event announcements, speaker archives, membership info, and officer profiles were scattered and required developer involvement to update. Officers needed a platform that non-technical members could maintain through a CMS, with an event calendar that could display both upcoming and past speakers and a newsletter integration to grow their membership funnel.',
    architecture: {
      mermaid: `graph TD
    A["Contentful CMS"]
    B["Content Service"]
    C["Public Pages"]
    D["FullCalendar"]
    E["Mailchimp API"]

    A -->|"Delivery API"| B
    B --> C
    B --> D
    C -->|"newsletter signup"| E`,
      explanation:
        'A centralized Angular content service decouples all page data from the codebase — homepage sections, membership rates, event listings, exec board profiles, and alumni directory entries are all fetched from Contentful at runtime via the Delivery API. This means officers can publish changes without any redeployment. FullCalendar renders events with toggleable upcoming/past views, and Mailchimp handles newsletter subscriptions directly from the site.',
    },
    scale: {
      metrics: [
        { label: 'CMS-Driven Pages', value: '100%' },
        { label: 'Deployments to Update', value: '0' },
        { label: 'Event Views', value: 'Calendar + List' },
        { label: 'Newsletter', value: 'Mailchimp' },
        { label: 'Speaker Archive', value: 'Toggleable' },
        { label: 'Content Authors', value: 'Non-technical' },
      ],
      details:
        'The centralized content service means all data — from homepage copy to alumni directory entries — is managed in Contentful and reflected on the site in real time. Officers with no engineering background can update membership rates, post new events, and add speaker recaps without touching the codebase.',
    },
    dataModel: [
      {
        label: 'Contentful CMS',
        lang: 'graphql',
        content: `type Image {
  fileName: String!
  url:      String!
}

type ExecBoardMember {
  name:     String!
  role:     String!
  semester: String!
  bio:      String
  photo:    Image
  linkedIn: String
}

type Event {
  title:        String!
  date:         DateTime!
  type:         String   # "upcoming" | "past"
  speaker:      String
  speakerPhoto: Image
  location:     String
  description:  RichText
  recordingUrl: String
}

type AlumniEntry {
  name:           String!
  graduationYear: Int!
  company:        String
  role:           String
  linkedIn:       String
  photo:          Image
}

type HomepageSection {
  sectionKey: String!    # "hero" | "about" | "membership"
  heading:    String
  body:       RichText
  ctaLabel:   String
  ctaUrl:     String
}`,
      },
    ],
  },

  {
    slug: 'carina-collective',
    name: 'Carina Collective',
    liveUrl: 'https://blog.kevinnorgaard.com',
    githubUrl: 'https://github.com/kevinnorgaard/blog',
    tagline: 'Server-rendered lifestyle content platform with CMS-managed blog posts across four categories',
    period: '2020',
    summary:
      'A server-side rendered lifestyle content platform serving multi-category articles across fashion, beauty, wellness, and art -- powered by Angular 21 with Express 5, Contentful CMS, Disqus comments, and strong SEO, deployed on Google Cloud Run.',
    image: '/images/carina-collective.png',
    tags: ['Angular 21', 'TypeScript', 'GCP', 'Docker', 'Express 5', 'Cloud Run'],
    order: 3,
    featured: true,
    status: 'live',
    problem:
      'A lifestyle content creator needed a custom platform to publish multi-category content across fashion, beauty, wellness, and art -- without the limitations of off-the-shelf blogging tools. The site needed strong SEO for content discovery, a smooth reading experience with rich-text rendering and comments, and a CMS workflow that kept the creator in control of content without developer involvement.',
    architecture: {
      mermaid: `graph TD
    A["Contentful CMS"]
    B["Angular 21 SSR + Express 5"]
    C["Article Pages"]
    D["Category Views"]
    E["Disqus Comments"]
    F["Google Cloud Run"]

    A -->|"Contentful SDK"| B
    B --> C
    B --> D
    C --> E
    B -->|"Docker + Cloud Build"| F`,
      explanation:
        'Angular 21 with built-in SSR and Express 5 handles server-side rendering, ensuring fully hydrated HTML is sent to the browser on first load -- critical for SEO on content-heavy article pages. The Contentful SDK fetches article content, rich-text, and assets at request time. Disqus is embedded client-side for comments. The app is containerized and deployed to Google Cloud Run via Cloud Build with Kaniko caching.',
    },
    scale: {
      metrics: [
        { label: 'Content Categories', value: '4' },
        { label: 'Rendering', value: 'SSR' },
        { label: 'CMS', value: 'Contentful' },
        { label: 'Comments', value: 'Disqus' },
        { label: 'SEO', value: 'Server-rendered' },
        { label: 'Hosting', value: 'Cloud Run' },
      ],
      details:
        'SSR ensures search engines receive fully rendered HTML rather than a blank Angular shell -- essential for a content-driven site where organic search is the primary traffic source. Rich-text from Contentful is rendered via the Contentful rich-text renderer, preserving formatting, embedded assets, and hyperlinks without custom parsing.',
    },
    dataModel: [
      {
        label: 'Contentful CMS',
        lang: 'graphql',
        content: `type Image {
  fileName: String!
  url:      String!
}

type Article {
  title:       String!
  slug:        String!
  category:    String   # "fashion" | "beauty" | "wellness" | "art"
  heroImage:   Image!
  body:        RichText!
  publishedAt: DateTime!
  excerpt:     String
  tags:        [String]
  author:      Author
}

type Author {
  name:            String!
  bio:             String
  photo:           Image
  instagramHandle: String
}

type HomepageFeatured {
  heroHeading:      String
  heroSubheading:   String
  featuredArticles: [Article]
}`,
      },
    ],
  },
]

export const sortedProjects = [...projects].sort((a, b) => a.order - b.order)

export const featuredProjects = sortedProjects.filter((p) => p.featured)

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
