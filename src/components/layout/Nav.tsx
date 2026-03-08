'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const RESUME_URL =
  'https://drive.google.com/file/d/1F6qMER9oUWYAym1Kn32JWDOP54n7XuRk/view?usp=drive_link'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
]

export default function Nav() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    if (href.startsWith('/#')) return false
    return pathname.startsWith(href)
  }

  return (
    <nav
      className="sticky top-0 z-50 bg-white/50 backdrop-blur-md border-b border-white/60 shadow-sm"
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="font-mono font-semibold text-lg tracking-tight text-dark-slate hover:opacity-80 transition-opacity"
            aria-label="Kevin Norgaard – Home"
          >
            <span className="text-salmon">{'<'}</span>
            KN
            <span className="text-salmon">{'/>'}</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  isActive(href)
                    ? 'text-salmon bg-salmon/8'
                    : 'text-dark-slate/65 hover:text-dark-slate hover:bg-white/50'
                }`}
              >
                {label}
              </Link>
            ))}

            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 px-4 py-2 rounded-xl bg-salmon text-white text-sm font-semibold
                         hover:bg-salmon-dark transition-colors duration-200 shadow-sm"
            >
              Resume ↗
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-dark-slate hover:bg-white/50 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileOpen}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-white/50 py-3 flex flex-col gap-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  isActive(href)
                    ? 'text-salmon bg-salmon/8'
                    : 'text-dark-slate/65 hover:text-dark-slate'
                }`}
              >
                {label}
              </Link>
            ))}
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 mx-0 px-4 py-2 rounded-xl bg-salmon text-white text-sm font-semibold text-center"
            >
              Resume ↗
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
