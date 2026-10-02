/**
 * Formatting + money helpers.
 *
 * The whole storefront renders prices through `formatPrice`, so switching the
 * store currency later is a one-line change (see CURRENCY below).
 */

export const CURRENCY = 'USD'
export const LOCALE = 'en-US'

const currencyFormatter = new Intl.NumberFormat(LOCALE, {
  style: 'currency',
  currency: CURRENCY,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

/** 49.9 -> "$49.90" */
export function formatPrice(value) {
  const amount = Number(value)
  if (!Number.isFinite(amount)) return currencyFormatter.format(0)
  return currencyFormatter.format(amount)
}

/** Always rounds to 2 decimals and dodges float artefacts (0.1 + 0.2). */
export function round2(value) {
  const amount = Number(value)
  if (!Number.isFinite(amount)) return 0
  return Math.round((amount + Number.EPSILON) * 100) / 100
}

/** Percentage saved, e.g. (54.99, 79.99) -> 31 */
export function discountPercent(price, originalPrice) {
  const now = Number(price)
  const was = Number(originalPrice)
  if (!Number.isFinite(now) || !Number.isFinite(was) || was <= 0 || was <= now) {
    return 0
  }
  return Math.round(((was - now) / was) * 100)
}

/** Absolute amount saved, rounded to cents. */
export function savingsAmount(price, originalPrice) {
  const now = Number(price)
  const was = Number(originalPrice)
  if (!Number.isFinite(now) || !Number.isFinite(was) || was <= now) return 0
  return round2(was - now)
}

export function formatRating(rating) {
  const value = Number(rating)
  return Number.isFinite(value) ? value.toFixed(1) : '0.0'
}

export function formatCount(value) {
  const count = Number(value) || 0
  if (count >= 1000) {
    const short = count / 1000
    return `${short >= 10 ? Math.round(short) : short.toFixed(1)}k`
  }
  return String(count)
}

export function pluralize(count, singular, plural) {
  return Number(count) === 1 ? singular : plural || `${singular}s`
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

/** "as-elite-gold-whey" -> used for stable, readable ids/keys */
export function slugify(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** Deterministic pseudo-random number in [0,1) from a string seed. */
export function seededRandom(seed) {
  let hash = 2166136261
  const input = String(seed)
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return ((hash >>> 0) % 100000) / 100000
}

/** Reads a query param that may be repeated, returning a clean array. */
export function toArray(value) {
  if (Array.isArray(value)) return value.filter(Boolean)
  if (typeof value === 'string' && value.length > 0) return value.split(',').filter(Boolean)
  return []
}
