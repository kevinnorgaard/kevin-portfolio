'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const RESUME_URL =
  'https://drive.google.com/file/d/1SSiXrhUnJI8cMZq8-PT2zF2ZWuDIauV0/view?usp=sharing'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/#contact', label: 'Contact' },
]

export default function Nav() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(0)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(Math.min(window.scrollY / 80, 1))
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (pathname !== '/') return
    const sections = ['contact']
    const observers = sections.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
          else setActiveSection((prev) => (prev === id ? null : prev))
        },
        { rootMargin: '-20% 0px -60% 0px' }
      )
      observer.observe(el)
      return observer
    })
    return () => observers.forEach((o) => o?.disconnect())
  }, [pathname])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/' && activeSection === null
    if (href.startsWith('/#')) {
      const section = href.slice(2)
      return pathname === '/' && activeSection === section
    }
    return pathname.startsWith(href)
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-shadow duration-300"
      style={{
        background: mobileOpen ? 'rgba(248,249,250,1)' : `rgba(255,255,255,${scrolled * 0.5})`,
        backdropFilter: mobileOpen ? 'none' : `blur(${scrolled * 12}px)`,
        WebkitBackdropFilter: mobileOpen ? 'none' : `blur(${scrolled * 12}px)`,
        borderBottom: scrolled === 0 && !mobileOpen ? 'none' : `1px solid rgba(255,255,255,${scrolled * 0.6})`,
        boxShadow: mobileOpen ? '0 4px 12px rgba(0,0,0,0.08)' : scrolled > 0.5 ? `0 1px 3px rgba(0,0,0,${scrolled * 0.06})` : 'none',
      }}
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="font-sans font-bold text-xl tracking-[-0.08em] text-dark-slate hover:opacity-80 transition-opacity"
            aria-label="Kevin Norgaard – Home"
          >
            <span className="text-salmon">{'<'}</span>
            KZN
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
              className="ml-3 px-5 py-2.5 rounded-xl text-white text-sm font-medium
                         transition-all duration-200 shadow-sm hover:opacity-90 inline-flex items-center gap-1.5"
              style={{ background: 'linear-gradient(90deg, #fca5a5, #f87171)' }}
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
              className="mt-2 mx-0 px-4 py-2 rounded-xl text-white text-sm font-semibold text-center inline-flex items-center justify-center gap-1.5"
              style={{ background: 'linear-gradient(90deg, #fca5a5, #f87171)' }}
            >
              Resume ↗
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
