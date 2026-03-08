import { clsx } from 'clsx'

interface BrowserMockupProps {
  url: string
  children: React.ReactNode
  className?: string
}

export default function BrowserMockup({ url, children, className }: BrowserMockupProps) {
  return (
    <div
      className={clsx(
        'rounded-xl overflow-hidden border border-white/60 shadow-xl bg-white/20 backdrop-blur-sm',
        className,
      )}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-3 px-4 py-3 bg-white/50 border-b border-white/60">
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="w-3 h-3 rounded-full bg-red-400/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
          <span className="w-3 h-3 rounded-full bg-green-400/80" />
        </div>

        {/* URL bar */}
        <div className="flex-1 max-w-sm mx-auto">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/60 border border-white/70">
            <svg
              className="w-3 h-3 text-teal flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <span className="font-mono text-xs text-dark-slate/60 truncate">{url}</span>
          </div>
        </div>

        {/* Spacer to balance the traffic lights */}
        <div className="w-14" aria-hidden="true" />
      </div>

      {/* Viewport */}
      <div className="relative aspect-video bg-off-white overflow-hidden">
        {children}
      </div>
    </div>
  )
}
