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

export default ProductBadge
