/**
 * Icons
 * -----
 * A single inline SVG icon set (24x24, stroke based) so the UI never depends
 * on an icon font or a network request. Usage:
 *
 *   <Icon name="cart" className="h-5 w-5" />
 *   <Icon name="heart" filled />
 *
 * <StarIcon /> and <SocialIcon /> cover the filled glyphs (ratings, socials).
 */

const PATHS = {
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.3-3.3" />
    </>
  ),
  heart: (
    <path d="M12 20.3S4.2 15.5 4.2 10.2A4.9 4.9 0 0 1 12 6.9a4.9 4.9 0 0 1 7.8 3.3c0 5.3-7.8 10.1-7.8 10.1Z" />
  ),
  cart: (
    <>
      <circle cx="9.5" cy="19.5" r="1.5" />
      <circle cx="17.5" cy="19.5" r="1.5" />
      <path d="M2.5 3.5h2.3l2.4 11.3h11.5l2-8.3H5.6" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M4.6 20a7.4 7.4 0 0 1 14.8 0" />
    </>
  ),
  menu: <path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h17" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  chevronDown: <path d="m6 9.5 6 6 6-6" />,
  chevronRight: <path d="m9.5 6 6 6-6 6" />,
  chevronLeft: <path d="m14.5 6-6 6 6 6" />,
  arrowRight: <path d="M4 12h15M13.5 6.5 19 12l-5.5 5.5" />,
  arrowUp: <path d="M12 20V4.5M6 10.5 12 4.5l6 6" />,
  plus: <path d="M12 5.5v13M5.5 12h13" />,
  minus: <path d="M5.5 12h13" />,
  trash: (
    <path d="M4 7h16M9.2 7V4.9c0-.5.4-.9.9-.9h3.8c.5 0 .9.4.9.9V7M6.6 7l.9 12.1c.1.8.8 1.4 1.6 1.4h5.8c.8 0 1.5-.6 1.6-1.4L17.4 7" />
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7" />,
  checkCircle: (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <path d="m8.2 12.4 2.6 2.6L15.9 9.5" />
    </>
  ),
  truck: (
    <>
      <path d="M2.5 7h10.6v8.5H2.5z" />
      <path d="M13.1 10h3.5l3 3v2.5h-6.5z" />
      <circle cx="6.6" cy="17.6" r="1.7" />
      <circle cx="16.4" cy="17.6" r="1.7" />
    </>
  ),
  shield: <path d="M12 3.4 5.2 6.1v5c0 4.3 2.9 7.7 6.8 9.4 3.9-1.7 6.8-5.1 6.8-9.4v-5L12 3.4Z" />,
  lock: (
    <>
      <rect x="4.5" y="10.4" width="15" height="9.6" rx="2.3" />
      <path d="M8.2 10.4V8a3.8 3.8 0 0 1 7.6 0v2.4" />
    </>
  ),
  verified: (
    <>
      <path d="m12 3 2.2 1.6 2.7-.2 1 2.5 2.3 1.4-.8 2.7.8 2.5-2.3 1.4-1 2.5-2.7-.2L12 21l-2.2-1.6-2.7.2-1-2.5L3.8 15.7l.8-2.5-.8-2.7 2.3-1.4 1-2.5 2.7.2z" />
      <path d="m9 12.3 2.1 2.1 4-4.4" />
    </>
  ),
  support: (
    <>
      <path d="M4.6 14v-2a7.4 7.4 0 0 1 14.8 0v2" />
      <rect x="2.6" y="13.2" width="4" height="6.2" rx="1.7" />
      <rect x="17.4" y="13.2" width="4" height="6.2" rx="1.7" />
      <path d="M19.4 19.4c0 1.2-1.7 2.1-4.2 2.1" />
    </>
  ),
  refresh: (
    <>
      <path d="M4 10.2a8 8 0 1 1 2.4 5.9" />
      <path d="M4 4.6v5.6h5.6" />
    </>
  ),
  sliders: (
    <>
      <path d="M4 7.5h8.5M18 7.5h2M4 16.5h4M13.5 16.5h6.5" />
      <circle cx="15.3" cy="7.5" r="2.2" />
      <circle cx="10.5" cy="16.5" r="2.2" />
    </>
  ),
  grid: (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1.8" />
      <rect x="13" y="4" width="7" height="7" rx="1.8" />
      <rect x="4" y="13" width="7" height="7" rx="1.8" />
      <rect x="13" y="13" width="7" height="7" rx="1.8" />
    </>
  ),
  tag: (
    <>
      <path d="M20.4 12.6 12.9 20a2.1 2.1 0 0 1-2.9 0l-6.1-6.1a2 2 0 0 1-.6-1.5V5.6a2 2 0 0 1 2-2h6.8a2 2 0 0 1 1.5.6l6.8 6.8a1.4 1.4 0 0 1 0 1.6Z" />
      <circle cx="8.6" cy="8.6" r="1.4" />
    </>
  ),
  percent: (
    <>
      <path d="M18.5 5.5 5.5 18.5" />
      <circle cx="7.6" cy="7.6" r="2.3" />
      <circle cx="16.4" cy="16.4" r="2.3" />
    </>
  ),
  gift: (
    <>
      <rect x="3.5" y="8.6" width="17" height="4" rx="1.5" />
      <path d="M5.2 12.6v6.4a1.6 1.6 0 0 0 1.6 1.6h10.4a1.6 1.6 0 0 0 1.6-1.6v-6.4" />
      <path d="M12 8.6v11.9" />
      <path d="M12 8.6S11.2 4 8.8 4a2.3 2.3 0 0 0 0 4.6zM12 8.6S12.8 4 15.2 4a2.3 2.3 0 0 1 0 4.6z" />
    </>
  ),

  /* Category + contact glyphs */
  pulse: <path d="M3 12h3.6l2.6-6.4L13 19l2.6-7H21" />,
  flame: (
    <path d="M12.6 3s4.6 4.3 4.6 8.6a5.2 5.2 0 0 1-10.4 0c0-2.1 1.4-3.4 2.3-4.8.6 1.2.5 2.5-.2 3.5 1.9-1 3.1-3.9 3.7-7.3Z" />
  ),
  bolt: <path d="M13.8 2.8 5.6 13.9h5.1l-1 7.3 8.7-11.6h-5.2z" />,
  drop: <path d="M12 3.4s6.1 6.4 6.1 10.4a6.1 6.1 0 0 1-12.2 0C5.9 9.8 12 3.4 12 3.4Z" />,
  pill: (
    <>
      <rect x="2.6" y="8.4" width="18.8" height="7.2" rx="3.6" transform="rotate(-45 12 12)" />
      <path d="M9.5 9.5l5 5" />
    </>
  ),
  dumbbell: <path d="M4 9.6v4.8M7.2 7.4v9.2M16.8 7.4v9.2M20 9.6v4.8M7.2 12h9.6" />,
  shaker: (
    <>
      <path d="M8.4 8.6h7.2l-1.1 10.1a2 2 0 0 1-2 1.8h-1a2 2 0 0 1-2-1.8z" />
      <path d="M7.6 8.6h8.8M10.2 5.6h3.6v3h-3.6z" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.4" />
      <circle cx="12" cy="12" r="4.4" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  eye: (
    <>
      <path d="M2.6 12S6.2 6.6 12 6.6 21.4 12 21.4 12 17.8 17.4 12 17.4 2.6 12 2.6 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  badge: (
    <>
      <circle cx="12" cy="9.4" r="5.6" />
      <path d="m8.6 14.1-1.3 6.1L12 17.9l4.7 2.3-1.3-6.1" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M12 11v5.6M12 7.8h.01" />
    </>
  ),
  sparkle: (
    <>
      <path d="m12 3.4 1.8 5 4.9 1.8-4.9 1.8-1.8 5-1.8-5L5.3 10.2l4.9-1.8z" />
      <path d="m18.6 16.4.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" />
    </>
  ),
  mail: (
    <>
      <rect x="2.8" y="5" width="18.4" height="14" rx="2.5" />
      <path d="m3.6 7.2 8.4 5.9 8.4-5.9" />
    </>
  ),
  phone: (
    <path d="M7.5 3.6h2.2l1.4 3.6-1.8 1.3a11.2 11.2 0 0 0 5.3 5.3l1.4-1.8 3.6 1.4v2.2a2.4 2.4 0 0 1-2.6 2.4A15.6 15.6 0 0 1 5.1 6.2a2.4 2.4 0 0 1 2.4-2.6Z" />
  ),
  pin: (
    <>
      <path d="M12 21s7-6.3 7-11.1a7 7 0 0 0-14 0C5 14.7 12 21 12 21Z" />
      <circle cx="12" cy="9.9" r="2.6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M12 7.4V12l3.2 2" />
    </>
  ),
  list: <path d="M4 6.5h16M4 12h16M4 17.5h16" />,
  muscle: (
    <>
      <path d="M5.2 4.9h4.1c1.1 0 2 .6 2.5 1.6.9.1 1.8.6 2.4 1.4 1 1.3 1.2 3 .7 4.6-.4 1.3-1.4 2.4-2.7 3l-.6 3.9a1.8 1.8 0 0 1-1.8 1.5H9.5a1.8 1.8 0 0 1-1.8-1.5l-.4-3C5.1 16 3.4 14 3.2 11.7V6.7c0-1 .8-1.8 2-1.8Z" />
      <path d="M15 9.6c1.7-.7 3.6-.3 4.9 1.1" />
    </>
  ),
  leaf: (
    <>
      <path d="M19.4 4.6c1 7.7-3.5 13.5-10.4 14.3A5.9 5.9 0 0 1 4.5 14C5.3 7.1 11.1 3.6 19.4 4.6Z" />
      <path d="M5.6 18.4 15 9" />
    </>
  ),
}

/** Stroke-based icon. Renders nothing for an unknown name. */
export function Icon({ name, size = 20, className = '', strokeWidth = 1.8, filled = false, title, ...rest }) {
  const content = PATHS[name]
  if (!content) return null

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={filled ? 0 : strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      focusable="false"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {content}
    </svg>
  )
}

/** Filled star used by ratings and review cards. */
export function StarIcon({ size = 16, className = '', filled = true }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 1.6}
      strokeLinejoin="round"
    >
      <path d="m12 3.6 2.6 5.3 5.9.9-4.3 4.1 1 5.9-5.2-2.9-5.2 2.9 1-5.9-4.3-4.1 5.9-.9z" />
    </svg>
  )
}

const SOCIAL_PATHS = {
  instagram: (
    <>
      <rect x="3.4" y="3.4" width="17.2" height="17.2" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1.15" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: (
    <path d="M13.6 21v-7.6h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2H7.8v3h2.6V21z" />
  ),
  x: <path d="M17.4 3h3l-6.6 7.5L21.6 21h-5.4l-4.2-5.5L7.1 21H4l6.9-7.9L2.5 3H8l3.9 5.1zm-1.1 16h1.7L8 4.9H6.2z" />,
  youtube: (
    <path d="M21.6 7.5c-.2-1.3-.9-2.2-2.2-2.4-2-.3-7.4-.3-7.4-.3s-5.4 0-7.4.3c-1.3.2-2 1.1-2.2 2.4C2.1 9.3 2.1 12 2.1 12s0 2.7.3 4.5c.2 1.3.9 2.2 2.2 2.4 2 .3 7.4.3 7.4.3s5.4 0 7.4-.3c1.3-.2 2-1.1 2.2-2.4.3-1.8.3-4.5.3-4.5s0-2.7-.3-4.5zM10.2 15.3V8.7l5.5 3.3z" />
  ),
}

/** Filled social brand glyphs. */
export function SocialIcon({ name, size = 18, className = '' }) {
  const content = SOCIAL_PATHS[name]
  if (!content) return null
  const isOutline = name === 'instagram'

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      fill={isOutline ? 'none' : 'currentColor'}
      stroke={isOutline ? 'currentColor' : 'none'}
      strokeWidth={isOutline ? 1.7 : 0}
    >
      {content}
    </svg>
  )
}

/** AS Store monogram — the bolt tile used in the navbar, footer and auth pages. */
export function LogoMark({ className = '' }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect width="40" height="40" rx="11" fill="#0A0D11" />
      <rect
        x="0.75"
        y="0.75"
        width="38.5"
        height="38.5"
        rx="10.25"
        fill="none"
        stroke="#FFFFFF"
        strokeOpacity="0.16"
        strokeWidth="1.5"
      />
      <path d="M22.9 8.4 12.3 22.3h5.4L14.5 31.6 25.9 16.8h-5.5z" fill="#3BC885" />
    </svg>
  )
}

export default Icon

