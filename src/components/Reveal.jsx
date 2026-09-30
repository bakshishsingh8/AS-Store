import { useReveal } from '../hooks/useReveal'

/**
 * Fades a block up as it scrolls into view (see `.reveal` in index.css).
 * Respects prefers-reduced-motion and renders plain markup when JS is off.
 */
export function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useReveal()

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export default Reveal
