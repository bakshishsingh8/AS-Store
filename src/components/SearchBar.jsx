import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { products } from '../data/products'
import { Icon } from './Icons'
import { formatPrice } from '../utils/format'

const SIZE_CLASSES = {
  sm: 'h-10 pl-9 pr-3 text-sm',
  md: 'h-11 pl-11 pr-4 text-[0.95rem]',
  lg: 'h-13 pl-12 pr-4 text-base',
}

const ICON_POSITION = {
  sm: 'left-3 h-4 w-4',
  md: 'left-4 h-[18px] w-[18px]',
  lg: 'left-4 h-5 w-5',
}

/**
 * Search input with live product suggestions. Used inside the navbar
 * overlay and as the search field on the shop page.
 */
export function SearchBar({
  value = '',
  onChange,
  onSubmit,
  onSuggestionClick,
  placeholder = 'Search protein, creatine, shakers…',
  size = 'md',
  className = '',
  autoFocus = false,
  showSuggestions = true,
}) {
  const [focused, setFocused] = useState(false)
  const blurTimer = useRef(null)

  const results = useMemo(() => {
    const query = value.trim().toLowerCase()
    if (query.length < 2 || !showSuggestions) return []
    return products
      .filter((product) =>
        `${product.name} ${product.brand} ${product.category}`
          .toLowerCase()
          .replace(/-/g, ' ')
          .includes(query),
      )
      .slice(0, 5)
  }, [value, showSuggestions])

  const showPanel = focused && results.length > 0

  const handleSubmit = (event) => {
    event.preventDefault()
    if (onSubmit) onSubmit(value.trim())
    setFocused(false)
  }

  const handleBlur = () => {
    // Let a click on a suggestion register before hiding the panel.
    blurTimer.current = window.setTimeout(() => setFocused(false), 140)
  }

  const handleFocus = () => {
    if (blurTimer.current) window.clearTimeout(blurTimer.current)
    setFocused(true)
  }

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className={`relative ${className}`}
      onBlur={handleBlur}
      onFocus={handleFocus}
    >
      <Icon
        name="search"
        className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-ink-400 ${ICON_POSITION[size] ?? ICON_POSITION.md}`}
      />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        aria-label="Search products"
        className={`w-full rounded-full border border-ink-200 bg-white text-ink-900 transition placeholder:text-ink-400 hover:border-ink-300 focus:border-brand-600 focus:ring-4 focus:ring-brand-600/10 focus:outline-none ${
          SIZE_CLASSES[size] ?? SIZE_CLASSES.md
        }`}
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange?.('')}
          aria-label="Clear search"
          className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 text-ink-400 transition hover:bg-ink-100 hover:text-ink-700"
        >
          <Icon name="close" size={15} />
        </button>
      ) : null}

      {showPanel ? (
        <div className="absolute inset-x-0 top-[calc(100%+0.5rem)] z-50 overflow-hidden rounded-2xl border border-ink-100 bg-white p-2 shadow-card-hover animate-fade-up">
          <p className="px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-ink-400">
            Products
          </p>
          <ul>
            {results.map((product) => (
              <li key={product.id}>
                <Link
                  to={`/product/${product.id}`}
                  onClick={() => {
                    setFocused(false)
                    onSuggestionClick?.(product)
                  }}
                  className="flex items-center gap-3 rounded-xl px-3 py-2 transition hover:bg-ink-50"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-ink-50">
                    <Icon name="sparkle" size={18} className="text-brand-600" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-ink-900">
                      {product.name}
                    </span>
                    <span className="block truncate text-xs text-ink-500">{product.brand}</span>
                  </span>
                  <span className="shrink-0 text-sm font-bold text-ink-900">
                    {formatPrice(product.price)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </form>
  )
}

export default SearchBar
