# Kevin Norgaard — Portfolio

Personal portfolio site for [kevinnorgaard.com](https://kevinnorgaard.com). Built with Next.js (App Router), TypeScript, and Tailwind CSS. Statically exported for Namecheap shared hosting (cPanel).

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Fonts | Inter + Fira Code (Google Fonts) |
| Architecture diagrams | Mermaid.js (client-side) |
| Hosting | Namecheap cPanel (static HTML) |

## Project Structure

```
src/
├── app/                  # Next.js App Router pages & layouts
│   ├── page.tsx          # Home page
│   ├── about/page.tsx    # About page
│   └── projects/
│       ├── page.tsx      # Projects index
│       └── [slug]/       # Dynamic project detail (statically generated)
├── components/
│   ├── layout/           # Nav + Footer
│   ├── projects/         # BrowserMockup, MermaidDiagram
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

### 3. `.htaccess` (optional, for clean URLs)

If you want `/about` to resolve without `.html`, add this to `public_html/.htaccess`:

```apache
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.+)$ /$1.html [L,QSA]
```

> Note: `trailingSlash: true` is already set in `next.config.js`, which generates `/about/index.html` style paths — these work natively on most Apache/Nginx hosts without `.htaccess` rewrites.

## Content Updates

All content lives in `src/data/`. No CMS needed.

| File | What to edit |
|---|---|
| `src/data/projects.ts` | Add/edit projects, summaries, architecture, metrics |
| `src/data/experience.ts` | Fill in actual job bullets |
| `src/data/skills.ts` | Add/remove skills |
| `src/app/about/page.tsx` | Edit bio narrative, quick facts |

After edits, re-run `npm run build` and re-upload the `out/` folder.

## Adding Real Screenshots / Videos

For each project, replace the placeholder visual in `BrowserMockup` by:

1. Adding your asset to `public/images/` or `public/videos/`
2. In `src/app/projects/[slug]/page.tsx`, replace the placeholder `<div>` inside `<BrowserMockup>` with:

```tsx
// Screenshot
import Image from 'next/image'
<Image
  src="/images/uci-sba-screenshot.png"
  alt="UCI SBA dashboard"
  fill
  className="object-cover object-top"
  unoptimized
/>

// Video (autoplay loop, no controls)
<video
  src="/videos/carina-collective-demo.mp4"
  autoPlay
  loop
  muted
  playsInline
  className="w-full h-full object-cover object-top"
/>
```

## Key Configuration Notes

- `output: 'export'` — enables static HTML generation (`next build` → `out/`)
- `images: { unoptimized: true }` — required for static export (no Next.js image optimization server)
- `trailingSlash: true` — generates `page/index.html` style paths for cPanel compatibility
- Mermaid.js is dynamically imported client-side to avoid SSR issues with the static export
