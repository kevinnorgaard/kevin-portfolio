import { type AnchorHTMLAttributes, type ButtonHTMLAttributes } from 'react'
import { clsx } from 'clsx'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface BaseProps {
  variant?: Variant
  size?: Size
  className?: string
}

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }
type AnchorProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; external?: boolean }

type Props = ButtonProps | AnchorProps

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-teal text-white hover:bg-teal-dark shadow-sm focus:ring-teal/50',
  secondary:
    'bg-transparent border border-dark-slate/25 text-dark-slate hover:border-dark-slate/50 focus:ring-dark-slate/20',
  ghost: 'text-dark-slate hover:text-salmon hover:bg-white/30 focus:ring-dark-slate/10',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-5 py-2 text-xs rounded-xl gap-1.5',
  md: 'px-7 py-2.5 text-sm rounded-xl gap-2',
  lg: 'px-8 py-3.5 text-base rounded-xl gap-2',
}

const base =
  'inline-flex items-center font-semibold transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 motion-reduce:hover:translate-y-0 motion-reduce:transition-none'

export default function Button(props: Props) {
  const { variant = 'primary', size = 'md', className, children } = props

  const classes = clsx(base, variantClasses[variant], sizeClasses[size], className)

  if ('href' in props && props.href !== undefined) {
    const { href, external, variant: _v, size: _s, className: _c, ...rest } = props
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {children}
      </a>
    )
  }

  const { variant: _v, size: _s, className: _c, ...rest } = props as ButtonProps
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  )
}
