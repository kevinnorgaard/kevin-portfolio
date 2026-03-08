import { clsx } from 'clsx'

type TagVariant = 'default' | 'salmon' | 'teal' | 'dark'

interface TagProps {
  children: React.ReactNode
  variant?: TagVariant
  className?: string
}

const variantClasses: Record<TagVariant, string> = {
  default: 'bg-white/60 border-white/80 text-dark-slate/70',
  salmon: 'bg-salmon/10 border-salmon/30 text-salmon-dark',
  teal: 'bg-teal/10 border-teal/30 text-teal-dark',
  dark: 'bg-dark-slate/10 border-dark-slate/20 text-dark-slate',
}

export default function Tag({ children, variant = 'default', className }: TagProps) {
  return (
    <span
      className={clsx(
        'font-mono text-xs px-2.5 py-1 rounded-md border inline-block',
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
