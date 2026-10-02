const BADGE_TONES = {
  'Best Seller': 'bg-ink-950 text-white',
  New: 'bg-brand-600 text-white',
  Sale: 'bg-rose-600 text-white',
  Limited: 'bg-amber-400 text-ink-950',
  Out: 'bg-ink-500 text-white',
}

/** Small pill shown on a product image ("Best Seller", "New", ...). */
export function ProductBadge({ label, className = '' }) {
  if (!label) return null

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[0.66rem] font-bold uppercase tracking-[0.1em] shadow-sm ${
        BADGE_TONES[label] ?? 'bg-ink-900 text-white'
      } ${className}`}
    >
      {label}
    </span>
  )
}

/** "-31%" style discount flag. */
export function DiscountBadge({ percent, className = '' }) {
  const value = Math.round(Number(percent) || 0)
  if (value <= 0) return null

  return (
    <span
      className={`inline-flex items-center rounded-full bg-rose-600 px-2.5 py-1 text-[0.66rem] font-bold tracking-wide text-white shadow-sm ${className}`}
    >
      -{value}%
    </span>
  )
}

export default ProductBadge
