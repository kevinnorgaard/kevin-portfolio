'use client'

import { useState } from 'react'
import { clsx } from 'clsx'

const EMAIL = 'kevinnorg@gmail.com'

export default function CopyEmailButton() {
  const [state, setState] = useState<'idle' | 'copied'>('idle')

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setState('copied')
      setTimeout(() => setState('idle'), 2200)
    } catch {
      // Fallback for browsers that block clipboard API without user gesture
      const el = document.createElement('textarea')
      el.value = EMAIL
      el.style.position = 'fixed'
      el.style.opacity = '0'
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setState('copied')
      setTimeout(() => setState('idle'), 2200)
    }
  }

  return (
    <button
      onClick={handleCopy}
      aria-label={state === 'copied' ? 'Email copied!' : 'Copy email address'}
      className={clsx(
        'inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm',
        'border transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2',
        'motion-reduce:hover:translate-y-0 motion-reduce:transition-none',
        state === 'copied'
          ? 'bg-teal/20 border-teal/40 text-teal-dark focus:ring-teal/30'
          : 'bg-white/40 backdrop-blur-md border-white/60 text-dark-slate hover:bg-white/60 focus:ring-dark-slate/20',
      )}
    >
      <span className="text-base" aria-hidden="true">
        {state === 'copied' ? '✓' : '📋'}
      </span>
      {state === 'copied' ? 'Copied!' : 'Copy Email'}
    </button>
  )
}
