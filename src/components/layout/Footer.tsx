import Link from 'next/link'

const RESUME_URL =
  'https://drive.google.com/file/d/1F6qMER9oUWYAym1Kn32JWDOP54n7XuRk/view?usp=drive_link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/60 bg-white/30 backdrop-blur-sm mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo + tagline */}
          <div className="text-center sm:text-left">
            <span className="font-mono font-semibold text-dark-slate">
              <span className="text-salmon">{'<'}</span>KN<span className="text-salmon">{'/>'}</span>
            </span>
            <p className="text-dark-slate/50 text-sm mt-1">
              Building systems that scale.
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex items-center gap-5 text-sm text-dark-slate/60" aria-label="Footer navigation">
            <Link href="/" className="hover:text-salmon transition-colors">Home</Link>
            <Link href="/projects" className="hover:text-salmon transition-colors">Projects</Link>
            <Link href="/about" className="hover:text-salmon transition-colors">About</Link>
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
          <div className="flex items-center gap-4">
            <a
              href="mailto:kevinnorg@gmail.com"
              aria-label="Send email to Kevin Norgaard"
              className="text-dark-slate/50 hover:text-salmon transition-colors text-sm font-mono"
            >
              kevinnorg@gmail.com
            </a>
            <span className="text-dark-slate/20">·</span>
            <a
              href="https://www.linkedin.com/in/kevinnorgaard/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Kevin Norgaard on LinkedIn"
              className="text-dark-slate/50 hover:text-teal transition-colors text-sm font-semibold"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/40 text-center">
          <p className="text-dark-slate/40 text-xs">
            © {year} Kevin Norgaard · Built with Next.js &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}
