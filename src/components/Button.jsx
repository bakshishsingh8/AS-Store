import { Link } from 'react-router-dom'

const BASE =
  'inline-flex select-none items-center justify-center gap-2 font-semibold tracking-tight transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-55'

const VARIANTS = {
  primary:
    'bg-brand-600 text-white shadow-sm hover:bg-brand-700 hover:shadow-brand active:bg-brand-800',
  dark: 'bg-ink-950 text-white hover:bg-ink-800 active:bg-ink-900',
  outline: 'border border-ink-200 bg-white text-ink-900 hover:border-ink-900 hover:bg-ink-50',
  outlineLight:
    'border border-white/25 bg-transparent text-white hover:border-white/70 hover:bg-white/10',
  soft: 'bg-brand-50 text-brand-700 hover:bg-brand-100',
  ghost: 'text-ink-600 hover:bg-ink-100 hover:text-ink-900',
  danger: 'bg-rose-600 text-white hover:bg-rose-700',
  amber: 'bg-amber-400 text-ink-950 hover:bg-amber-300',
}

const SIZES = {
  sm: 'h-9 rounded-full px-4 text-sm',
  md: 'h-11 rounded-full px-6 text-[0.95rem]',
  lg: 'h-14 rounded-full px-8 text-base',
}

/**
 * The single button used across the storefront. Renders a <button>, a
 * react-router <Link> (when `to` is set) or an <a> (when `href` is set) so
 * navigation and actions share exactly the same look.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  to,
  href,
  fullWidth = false,
  iconLeft = null,
  iconRight = null,
  className = '',
  children,
  ...rest
}) {
  const classes = [
    BASE,
    VARIANTS[variant] ?? VARIANTS.primary,
    SIZES[size] ?? SIZES.md,
    fullWidth ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      {iconLeft}
      {children}
      {iconRight}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  )
}

export default Button
