# Kevin Norgaard — Portfolio

Personal portfolio site for [kevinnorgaard.com](https://kevinnorgaard.com). Built with Next.js (App Router), TypeScript, and Tailwind CSS. Statically exported for Namecheap shared hosting (cPanel).

## Tech Stack

| Layer | Choice |
|---|---|
| Runtime | Node.js 20 |
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Fonts | Inter + Fira Code (Google Fonts) |
| Syntax highlighting | Shiki (server-side) |
| Architecture diagrams | Mermaid.js (client-side) |
| Hosting | Namecheap cPanel (static HTML) |

## Project Structure

```
src/
├── app/                  # Next.js App Router pages & layouts
│   ├── page.tsx          # Home page
│   └── projects/
│       ├── page.tsx      # Projects index
│       └── [slug]/       # Dynamic project detail (statically generated)
├── components/
│   ├── layout/           # Nav + Footer
│   ├── projects/         # BrowserMockup, MermaidDiagram, CodeBlock
│   ├── sections/         # Hero, FeaturedProjects, Skills, Experience, Contact
│   └── ui/               # GlassCard, Button, Tag, CopyEmailButton
└── data/                 # Single source of truth — typed TS objects
    ├── types.ts
    ├── projects.ts       # All project data
    ├── experience.ts     # Work history
    └── skills.ts         # Tech skills
```

## Local Development

```bash
nvm use 20   # Node 20 required (pinned in .nvmrc)
npm install
npm run dev
# Open http://localhost:3000
```

## Production Build (cPanel Deployment)

### 1. Build the static export

```bash
npm run build
```

This generates an `out/` directory containing pure static HTML, CSS, and JS. No server runtime is required.

### 2. Upload to Namecheap cPanel

1. Log into cPanel → **File Manager**
2. Navigate to `public_html/` (or a subdirectory if using a subdomain)
3. Upload the entire contents of `out/` into that directory
4. Ensure `index.html` is at the root of `public_html/`

Alternatively, use FTP (FileZilla or similar):
- Host: `ftp.kevinnorgaard.com`
- Upload `out/*` → `public_html/`

## Key Configuration Notes

- `output: 'export'` — enables static HTML generation (`next build` → `out/`)
- `images: { unoptimized: true }` — required for static export (no Next.js image optimization server)
- `trailingSlash: true` — generates `page/index.html` style paths for cPanel compatibility
- Mermaid.js is dynamically imported client-side to avoid SSR issues with the static export
