import { type HTMLAttributes } from 'react'
import { clsx } from 'clsx'

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  padding?: 'sm' | 'md' | 'lg' | 'none'
}

const paddingMap = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

export default function GlassCard({
  children,
  className,
  hover = false,
  padding = 'md',
  ...props
}: GlassCardProps) {
  return (
    <div
      className={clsx(
        'rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 shadow-sm',
        hover &&
          'transition-all duration-300 ease-out hover:bg-white/55 hover:shadow-md motion-reduce:transition-none cursor-pointer',
        paddingMap[padding],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
