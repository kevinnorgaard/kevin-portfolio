import Link from 'next/link'

const RESUME_URL =
  'https://drive.google.com/file/d/1SSiXrhUnJI8cMZq8-PT2zF2ZWuDIauV0/view?usp=sharing'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-10 border-t border-white/60 bg-[#F8F9FA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo + tagline */}
          <div className="text-center sm:text-left">
            <span className="font-sans font-bold tracking-[-0.08em] text-dark-slate">
              <span className="text-salmon">{'<'}</span>KZN<span className="text-salmon">{'/>'}</span>
            </span>
            <p className="text-dark-slate/50 text-sm mt-1">
              Backend depth. Full-stack range.
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex items-center gap-5 text-sm text-dark-slate/60" aria-label="Footer navigation">
            <Link href="/" className="hover:text-salmon transition-colors">Home</Link>
            <Link href="/projects" className="hover:text-salmon transition-colors">Projects</Link>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-salmon transition-colors"
            >
              Resume ↗
            </a>
          </nav>

          {/* Social links — Email + LinkedIn only */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
            <a
              href="mailto:kevinnorg@gmail.com"
              aria-label="Send email to Kevin Z Norgaard"
              className="text-dark-slate/50 hover:text-salmon transition-colors text-sm font-mono"
            >
              kevinnorg@gmail.com
            </a>
            <span className="text-dark-slate/20">·</span>
            <a
              href="https://www.linkedin.com/in/kevinnorgaard/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Kevin Z Norgaard on LinkedIn"
              className="text-dark-slate/50 hover:text-teal transition-colors text-sm font-semibold"
            >
              LinkedIn ↗
            </a>
            <span className="text-dark-slate/20">·</span>
            <a
              href="https://github.com/kevinnorgaard"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Kevin Z Norgaard on GitHub"
              className="text-dark-slate/50 hover:text-dark-slate transition-colors text-sm font-semibold"
            >
              GitHub ↗
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/40 text-center">
          <p className="text-dark-slate/40 text-xs">
            © {year} Kevin Z Norgaard
          </p>
        </div>
      </div>
    </footer>
  )
}
