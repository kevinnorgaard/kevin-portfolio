'use client'

import { useEffect, useRef, useState } from 'react'

type RevealState = 'idle' | 'hidden' | 'shown'

/**
 * Reveals its children with a fade + slide-up the first time they scroll into
 * view. Content renders visible by default (good for no-JS / SEO and avoids a
 * flash, since wrapped sections sit below the fold). On mount we hide it and
 * arm an IntersectionObserver — unless the user prefers reduced motion, in
 * which case it stays visible and static.
 */
export default function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<RevealState>('idle')

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Hide now (the element is below the fold, so no visible flash), then
    // reveal once it scrolls into view. Intentional: we render visible for
    // no-JS/SEO and only hide on mount after checking reduced-motion + DOM.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState('hidden')

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setState('shown')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const style =
    state === 'idle'
      ? undefined
      : state === 'shown'
        ? {
            opacity: 1,
            transform: 'none',
            transition: `opacity 0.7s ease-out ${delay}ms, transform 0.7s ease-out ${delay}ms`,
            willChange: 'opacity, transform',
          }
        : { opacity: 0, transform: 'translateY(24px)' }

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  )
}
