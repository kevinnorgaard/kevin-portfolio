# Kevin Portfolio

## Development Workflow
1. Make changes
2. Run `nvm use 24` then verify locally with `npm run dev`
3. For visual/content changes: `npm run screenshots -- <page>`
   - Pages: `home`, `projects`, `project-detail`
   - Captures mobile (iPhone 14) + desktop (1440p) in Chromium
   - Review the screenshots to verify changes look correct and are reasonably aesthetic
   - Clean up with `rm -f screenshots/*.png` when done
4. Deploy with `npm run deploy` (builds and rsyncs to kevinnorgaard.com)
5. Sanity check the live site at kevinnorgaard.com (confirm deploy succeeded and pages load)
6. Update README.md if the changes affect the tech stack, setup instructions, or project description

## Key Constraints
- Static export only: no server actions, no API routes, no dynamic server features (deployed to Namecheap cPanel via rsync, no Node server)

## Tech Stack
- Next.js 16.2 (App Router, Turbopack) + React 19 + TypeScript + Tailwind CSS 4
- Static export (`output: 'export'`) with unoptimized images and trailing slashes

## Design System
- Background: #F8F9FA + mesh gradient (salmon/teal radial blobs)
- Glass UI: `bg-white/40 backdrop-blur-md border border-white/60`
- Colors: salmon (#F28482), teal (#84A59D), dark-slate (#2B2D42)
- Fonts: Inter (sans), Fira Code (mono)
