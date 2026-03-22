# Kevin Portfolio

## Tech Stack
- Next.js 16 (App Router, Turbopack) + React 19 + TypeScript + Tailwind CSS
- Static export (`output: 'export'`) with unoptimized images and trailing slashes
- Node 20 (pinned in `.nvmrc`) -- run `nvm use 20` before building

## Development Workflow
1. Make changes
2. Verify locally with `npm run dev`
3. For visual/content changes: `rm -f screenshots/*.png` then `npm run screenshots -- <page>`
   - Pages: `home`, `projects`, `project-detail`
   - Captures mobile (iPhone 14) + desktop (1440p) in Chromium
   - Review the screenshots to verify changes look correct and are reasonably aesthetic
4. Deploy with `npm run deploy` (builds and rsyncs to kevinnorgaard.com)
5. Verify the live site at kevinnorgaard.com

## Key Constraints
- Static export only: no server actions, no API routes, no dynamic server features
- Images must use `unoptimized: true` in next.config.js
- Server Components cannot have `onClick` -- extract interactive elements to `'use client'` components
- No iframes

## Data
- Projects: `src/data/projects.ts`
- Experience: `src/data/experience.ts`
- Skills: `src/data/skills.ts`
- Types: `src/data/types.ts`

## Design System
- Background: #F8F9FA + mesh gradient (salmon/teal radial blobs)
- Glass UI: `bg-white/40 backdrop-blur-md border border-white/60`
- Colors: salmon (#F28482), teal (#84A59D), dark-slate (#2B2D42)
- Fonts: Inter (sans), Fira Code (mono)
