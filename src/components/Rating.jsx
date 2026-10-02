import { StarIcon } from './Icons'
import { formatCount, formatRating } from '../utils/format'

/** A single star that can be filled 0 – 100%. */
function Star({ size, fill }) {
  return (
    <span className="relative inline-flex shrink-0" style={{ width: size, height: size }}>
      <StarIcon size={size} filled={false} className="text-ink-200" />
      {fill > 0 ? (
        <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
          <StarIcon size={size} filled className="text-amber-500" />
        </span>
      ) : null}
    </span>
  )
}

/**
 * Star rating with optional review count.
 *
 * @param {number} value      average rating, e.g. 4.7
 * @param {number} [reviews]  review count; hidden when omitted
 * @param {number} [size]     star size in px
 */
export function Rating({
  value = 0,
  reviews,
  size = 15,
  showValue = true,
  className = '',
  label = true,
}) {
  const rating = Math.max(0, Math.min(5, Number(value) || 0))

  return (
    <div className={`flex flex-wrap items-center gap-x-2 gap-y-1 ${className}`}>
      <div
        className="flex items-center gap-0.5"
        role="img"
        aria-label={label ? `Rated ${formatRating(rating)} out of 5` : undefined}
        aria-hidden={label ? undefined : true}
      >
        {[0, 1, 2, 3, 4].map((index) => (
          <Star key={index} size={size} fill={Math.max(0, Math.min(1, rating - index))} />
        ))}
      </div>

      {showValue ? (
        <span className="text-[0.8rem] font-semibold text-ink-800">{formatRating(rating)}</span>
      ) : null}

      {reviews === undefined || reviews === null ? null : (
        <span className="text-[0.8rem] text-ink-500">({formatCount(reviews)})</span>
      )}
    </div>
  )
}

export default Rating
