import { Icon } from './Icons'
import { formatPrice } from '../utils/format'
import { RATING_OPTIONS, brandOptions, categoryOptions, priceBounds } from '../hooks/useProductFilters'

/** Reusable checkbox row with a live count badge. */
function CheckboxRow({ checked, onChange, label, count }) {
  return (
    <label className="group flex cursor-pointer items-center gap-3 rounded-lg px-1 py-1.5 transition hover:bg-ink-50">
      <span className="relative flex h-[18px] w-[18px] shrink-0 items-center justify-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="peer h-[18px] w-[18px] cursor-pointer appearance-none rounded-[5px] border border-ink-300 bg-white transition checked:border-brand-600 checked:bg-brand-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
        />
        <Icon
          name="check"
          size={12}
          strokeWidth={3}
          className="pointer-events-none absolute text-white opacity-0 peer-checked:opacity-100"
        />
      </span>
      <span className="flex-1 text-[0.86rem] font-medium text-ink-700 transition group-hover:text-ink-900">
        {label}
      </span>
      {count === undefined ? null : (
        <span className="text-[0.72rem] font-semibold text-ink-400">{count}</span>
      )}
    </label>
  )
}

function FilterSection({ title, children, defaultOpen = true }) {
  return (
    <details open={defaultOpen} className="group border-b border-ink-100 py-4 last:border-0">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2">
        <span className="font-display text-[0.82rem] font-bold uppercase tracking-[0.12em] text-ink-900">
          {title}
        </span>
        <Icon
          name="chevronDown"
          size={16}
          className="shrink-0 text-ink-400 transition duration-300 group-open:rotate-180"
        />
      </summary>
      <div className="pt-3.5">{children}</div>
    </details>
  )
}

/**
 * Shop filters. Rendered inline in the desktop sidebar and inside a
 * slide-over drawer on mobile (the shop page owns that behaviour).
 */
export function FilterSidebar({
  selectedCategories = [],
  selectedBrands = [],
  maxPrice = priceBounds.max,
  minRating = '',
  inStockOnly = false,
  onSaleOnly = false,
  onToggleCategory,
  onToggleBrand,
  onMaxPriceChange,
  onMinRatingChange,
  onInStockChange,
  onOnSaleChange,
  onClearAll,
  activeCount = 0,
  className = '',
}) {
  return (
    <div className={`rounded-2xl border border-ink-100 bg-white p-5 shadow-card ${className}`}>
      <div className="flex items-center justify-between gap-3 pb-4">
        <div className="flex items-center gap-2">
          <Icon name="sliders" size={18} className="text-brand-600" />
          <h2 className="font-display text-base font-bold text-ink-900">Filters</h2>
          {activeCount > 0 ? (
            <span className="rounded-full bg-brand-600 px-2 py-0.5 text-[0.68rem] font-bold text-white">
              {activeCount}
            </span>
          ) : null}
        </div>
        <button
          type="button"
          onClick={onClearAll}
          disabled={activeCount === 0}
          className="text-[0.78rem] font-semibold text-brand-700 transition hover:text-brand-800 disabled:text-ink-300"
        >
          Clear all
        </button>
      </div>

      <div className="border-t border-ink-100">
        <FilterSection title="Category">
          <div className="space-y-0.5">
            {categoryOptions.map((option) => (
              <CheckboxRow
                key={option.value}
                label={option.label}
                count={option.count}
                checked={selectedCategories.includes(option.value)}
                onChange={() => onToggleCategory(option.value)}
              />
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Price">
          <div className="px-1">
            <div className="flex items-center justify-between text-[0.82rem] font-semibold text-ink-700">
              <span>{formatPrice(priceBounds.min)}</span>
              <span className="text-brand-700">Up to {formatPrice(maxPrice)}</span>
            </div>
            <input
              type="range"
              min={priceBounds.min}
              max={priceBounds.max}
              step="1"
              value={maxPrice}
              onChange={(event) => onMaxPriceChange(Number(event.target.value))}
              aria-label="Maximum price"
              className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-ink-200 accent-brand-600"
            />
          </div>
        </FilterSection>
        <FilterSection title="Brand">
          <div className="no-scrollbar max-h-60 space-y-0.5 overflow-y-auto pr-1">
            {brandOptions.map((option) => (
              <CheckboxRow
                key={option.value}
                label={option.label}
                count={option.count}
                checked={selectedBrands.includes(option.value)}
                onChange={() => onToggleBrand(option.value)}
              />
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Rating">
          <div className="space-y-0.5">
            {RATING_OPTIONS.map((option) => (
              <label
                key={option.value}
                className="group flex cursor-pointer items-center gap-3 rounded-lg px-1 py-1.5 transition hover:bg-ink-50"
              >
                <span className="relative flex h-[18px] w-[18px] shrink-0 items-center justify-center">
                  <input
                    type="radio"
                    name="min-rating"
                    value={option.value}
                    checked={String(minRating) === option.value}
                    onChange={() => onMinRatingChange(option.value)}
                    className="peer h-[18px] w-[18px] cursor-pointer appearance-none rounded-full border border-ink-300 bg-white transition checked:border-[5px] checked:border-brand-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                  />
                </span>
                <span className="flex-1 text-[0.86rem] font-medium text-ink-700 transition group-hover:text-ink-900">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Availability">
          <div className="space-y-0.5">
            <CheckboxRow
              label="In stock only"
              checked={inStockOnly}
              onChange={(event) => onInStockChange(event.target.checked)}
            />
            <CheckboxRow
              label="On sale only"
              checked={onSaleOnly}
              onChange={(event) => onOnSaleChange(event.target.checked)}
            />
          </div>
        </FilterSection>
      </div>
    </div>
  )
}

export default FilterSidebar
