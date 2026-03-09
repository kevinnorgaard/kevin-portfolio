'use client'

import { useRef, useEffect } from 'react'

export default function Hero() {
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const overlay = overlayRef.current
    const content = contentRef.current
    const indicator = scrollIndicatorRef.current
    if (!overlay || !content || !indicator) return

    // Fade-in on mount
    requestAnimationFrame(() => {
      overlay.style.transition = 'background-color 1.2s ease-out'
      overlay.style.backgroundColor = 'rgba(248, 249, 250, 0.78)'

      content.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out'
      content.style.opacity = '1'
      content.style.transform = 'scale(1)'

      indicator.style.transition = 'opacity 0.8s ease-out'
      indicator.style.opacity = '1'
    })

    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const vh = window.innerHeight
        const s = Math.min(window.scrollY / (vh * 0.6), 1)

        overlay.style.transition = 'none'
        overlay.style.backgroundColor = `rgba(248, 249, 250, ${0.78 - s * 0.3})`

        content.style.transition = 'none'
        content.style.opacity = String(1 - s)
        content.style.transform = `scale(${1 - s * 0.05})`

        indicator.style.transition = 'none'
        indicator.style.opacity = String(Math.max(0, 1 - s * 2))

        ticking = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      className="fixed inset-0 min-h-dvh flex flex-col justify-center overflow-hidden"
      aria-label="Introduction"
    >
      {/* Brooklyn sunset background */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <img
          src="/images/brooklyn-sunset.jpg"
          alt=""
          className="w-full h-full object-cover object-[center_60%]"
        />
        {/* Heavy light overlay to blend with site palette */}
        <div
          ref={overlayRef}
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(248, 249, 250, 0.5)' }}
        />
        {/* Salmon/teal gradient blobs on top */}
        <div className="hidden sm:block absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-teal/10 blur-3xl" />
        <div className="hidden sm:block absolute -bottom-32 -right-16 w-[400px] h-[400px] rounded-full bg-salmon/10 blur-3xl" />
      </div>

      <div
        ref={contentRef}
        className="section-container relative z-10 flex flex-col items-center text-center flex-1 justify-center will-change-[transform,opacity]"
        style={{ opacity: 0, transform: 'scale(0.95)' }}
      >
        <div className="max-w-2xl w-full">
          {/* Name & title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-dark-slate tracking-tight animate-slide-up opacity-0">
            Kevin Z Norgaard
          </h1>

          {/* Tagline */}
          <p className="mt-3 sm:mt-5 text-sm sm:text-lg text-dark-slate max-w-2xl leading-relaxed animate-slide-up-delay opacity-0">
            I&apos;m a product-minded software engineer who builds scalable systems handling 35M+ daily requests. Beyond the code, my real strength is zooming out to solve complex technical challenges across domains. I thrive in highly collaborative environments, partnering across teams to ship high-impact features and custom AI workflows.
          </p>

          {/* Quick Facts */}
          <dl className="mt-4 sm:mt-6 glass-card p-3 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-3 sm:gap-y-4 max-w-2xl animate-slide-up-delay opacity-0">
            <div className="flex flex-col items-center justify-center">
              <dt className="font-mono text-[10px] text-dark-slate/40 uppercase tracking-widest">Background</dt>
              <dd className="mt-0.5 text-xs sm:text-sm font-bold text-dark-slate/80">Software Engineer III @ eBay</dd>
            </div>
            <div className="flex flex-col items-center justify-center">
              <dt className="font-mono text-[10px] text-dark-slate/40 uppercase tracking-widest">Experience</dt>
              <dd className="mt-0.5 text-xs sm:text-sm font-bold text-dark-slate/80">6 Years</dd>
            </div>
            <div className="flex flex-col items-center justify-center">
              <dt className="font-mono text-[10px] text-dark-slate/40 uppercase tracking-widest">Location</dt>
              <dd className="mt-1 text-xs sm:text-sm font-bold text-dark-slate/80 leading-snug">Brooklyn, NY<br />Open to CA / Remote</dd>
            </div>
            <div className="flex flex-col items-center justify-center">
              <dt className="font-mono text-[10px] text-dark-slate/40 uppercase tracking-widest">Education</dt>
              <dd className="mt-1 text-xs sm:text-sm font-bold text-dark-slate/80 leading-snug">B.S. Computer Science<br />& Engineering, UC Irvine</dd>
            </div>
          </dl>

        </div>

      </div>

      {/* Scroll indicator — pinned to bottom */}
      <div
        ref={scrollIndicatorRef}
        className="relative z-10 pb-4 sm:pb-8 flex flex-col items-center gap-1"
        style={{ opacity: 0 }}
      >
        <span className="text-[11px] font-mono text-dark-slate/50 tracking-wide">Scroll to explore</span>
        <svg
          className="w-5 h-5 text-dark-slate/45 animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
