import type { Project } from './types'

export const projects: Project[] = [
  {
    slug: 'uci-phi-psi',
    name: 'UCI Phi Kappa Psi Website',
    liveUrl: 'https://www.uciphipsi.kevinnorgaard.com',
    githubUrl: 'https://github.com/kevinnorgaard/pkp',
    tagline: 'Full-stack fraternity chapter website built with Angular, Firebase, and Hygraph CMS',
    summary:
      'A full-stack platform serving recruits, active members, and alumni — with CMS-driven exec board and leadership history profiles, a recruitment interest form and event check-in flow, per-event attendance tracking, composite photo galleries, and a password-protected admin dashboard. Collected 250+ PNM contacts and 150+ alumni profiles within two years.',
    image: '/images/uci-phi-psi.png',
    tags: ['Angular', 'TypeScript', 'Firebase', 'GraphQL', 'Apollo', 'Hygraph CMS', 'RxJS', 'Angular Material'],
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
    liveUrl: 'https://www.ucisba.kevinnorgaard.com',
    tagline: 'Student org website for the UC Irvine Sports Business Association, powered by Contentful CMS',
    summary:
      'An Angular SPA with a centralized Contentful-driven content layer — featuring an interactive FullCalendar event calendar, exec board and alumni directory profiles, toggleable speaker archives, and Mailchimp newsletter integration. Officers update all content without redeployment.',
    image: '/images/uci-sba.png',
    tags: ['Angular', 'TypeScript', 'Contentful', 'RxJS', 'FullCalendar', 'Bootstrap 3', 'Moment.js'],
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
    name: 'Lifestyle Blog Platform',
    liveUrl: 'https://www.carinacollective.kevinnorgaard.com',
    githubUrl: 'https://github.com/kevinnorgaard/contentful-blog',
    tagline: 'Full-stack blog platform with SSR built with Angular Universal and Contentful',
    summary:
      'A server-side rendered lifestyle content platform serving multi-category articles across fashion, beauty, wellness, and art — powered by Contentful CMS, with Disqus comments, Instagram feed integration, and strong SEO out of the box.',
    image: '/images/carina-collective.png',
    tags: ['Angular', 'TypeScript', 'Angular Universal', 'Express.js', 'Contentful SDK', 'RxJS', 'Disqus', 'Bootstrap 4'],
    featured: true,
    status: 'live',
    problem:
      'A lifestyle content creator needed a custom platform to publish multi-category content across fashion, beauty, wellness, and art — without the limitations of off-the-shelf blogging tools. The site needed strong SEO for content discovery, a smooth reading experience with rich-text rendering and comments, and a CMS workflow that kept the creator in control of content without developer involvement.',
    architecture: {
      mermaid: `graph TD
    A["Contentful CMS"]
    B["Angular Universal + Express.js"]
    C["Article Pages"]
    D["Category Views"]
    E["Disqus Comments"]
    F["Instagram Feed"]

    A -->|"Contentful SDK"| B
    B --> C
    B --> D
    C --> E
    C --> F`,
      explanation:
        'Angular Universal with Express.js handles server-side rendering, ensuring fully hydrated HTML is sent to the browser on first load — critical for SEO on content-heavy article pages. The Contentful SDK fetches article content, rich-text, and assets at request time. Disqus is embedded client-side for the comments system, and the Instagram feed is injected after hydration to keep SSR output clean.',
    },
    scale: {
      metrics: [
        { label: 'Content Categories', value: '4' },
        { label: 'Rendering', value: 'SSR' },
        { label: 'CMS', value: 'Contentful' },
        { label: 'Comments', value: 'Disqus' },
        { label: 'SEO', value: 'Server-rendered' },
        { label: 'Social', value: 'Instagram feed' },
      ],
      details:
        'SSR ensures search engines receive fully rendered HTML rather than a blank Angular shell — essential for a content-driven site where organic search is the primary traffic source. Rich-text from Contentful is rendered via the Contentful rich-text renderer, preserving formatting, embedded assets, and hyperlinks without custom parsing.',
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

export const featuredProjects = projects.filter((p) => p.featured)

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
