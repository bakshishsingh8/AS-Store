import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { products } from '../data/products'
import { getCategory } from '../data/categories'
import { useProductFilters, SORT_OPTIONS, priceBounds } from '../hooks/useProductFilters'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useBodyScrollLock, useEscapeKey } from '../hooks/useMediaQuery'
import { toArray } from '../utils/format'

import Breadcrumbs from '../components/Breadcrumbs'
import Button from '../components/Button'
import EmptyState from '../components/EmptyState'
import FilterSidebar from '../components/FilterSidebar'
import Pagination from '../components/Pagination'
import ProductGrid from '../components/ProductGrid'
import SearchBar from '../components/SearchBar'
import { Icon } from '../components/Icons'

const PER_PAGE = 9

/** Removable chip summarising one active filter. */
function FilterChip({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-white py-1.5 pr-2 pl-3.5 text-[0.8rem] font-semibold text-ink-700">
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove filter ${label}`}
        className="grid h-5 w-5 place-items-center rounded-full text-ink-400 transition hover:bg-ink-100 hover:text-ink-900"
      >
        <Icon name="close" size={13} />
      </button>
    </span>
  )
}

/** Slide-over filter panel for phones and tablets. */
function MobileFilters({ open, onClose, activeCount, filterProps }) {
  useBodyScrollLock(open)
  useEscapeKey(useCallback(() => onClose(), [onClose]), open)

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[66] lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
      <button
        type="button"
        aria-label="Close filters"
        onClick={onClose}
        className="absolute inset-0 bg-ink-950/55 backdrop-blur-sm animate-fade-in"
      />

      <div className="absolute inset-y-0 left-0 flex w-[min(21rem,90vw)] flex-col bg-ink-50 shadow-2xl animate-slide-in-left">
        <div className="flex items-center justify-between border-b border-ink-100 bg-white px-4 py-3.5">
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
            onClick={onClose}
            aria-label="Close filters"
            className="grid h-9 w-9 place-items-center rounded-full text-ink-600 transition hover:bg-ink-100"
          >
            <Icon name="close" size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <FilterSidebar {...filterProps} className="shadow-none" />
        </div>

        <div className="border-t border-ink-100 bg-white p-4">
          <Button fullWidth onClick={onClose}>
            Show results
          </Button>
        </div>
      </div>
    </div>
  )
}

/** Shop page: search, filters, sorting and pagination — all driven by the URL. */
export function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filtersOpen, setFiltersOpen] = useState(false)

  const query = searchParams.get('q') ?? ''
  const selectedCategories = toArray(searchParams.get('category'))
  const selectedBrands = toArray(searchParams.get('brand'))
  const maxPrice = Number(searchParams.get('max') ?? priceBounds.max)
  const minRating = searchParams.get('rating') ?? ''
  const sortBy = searchParams.get('sort') ?? 'featured'
  const page = Number(searchParams.get('page') ?? 1)
  const inStockOnly = searchParams.get('stock') === '1'
  const onSaleOnly = searchParams.get('sale') === '1'

  const activeCategory = selectedCategories.length === 1 ? getCategory(selectedCategories[0]) : null

  useDocumentTitle(activeCategory ? `${activeCategory.name} — Shop` : 'Shop All Products')
  useBodyScrollLock(filtersOpen)
  useEscapeKey(useCallback(() => setFiltersOpen(false), []), filtersOpen)

  /** Merge a patch into the query string; any change resets pagination. */
  const updateParams = useCallback(
    (patch) => {
      const { __replace, ...rest } = patch
      const next = new URLSearchParams(searchParams)

      Object.entries(rest).forEach(([key, value]) => {
        const isEmpty =
          value === '' ||
          value === null ||
          value === undefined ||
          (Array.isArray(value) && value.length === 0)

        if (isEmpty) next.delete(key)
        else next.set(key, Array.isArray(value) ? value.join(',') : String(value))
      })

      if (!('page' in rest)) next.delete('page')
      setSearchParams(next, { replace: Boolean(__replace) })
    },
    [searchParams, setSearchParams],
  )

  const toggleArrayParam = useCallback(
    (key, value) => {
      const current = toArray(searchParams.get(key))
      const next = current.includes(value)
        ? current.filter((entry) => entry !== value)
        : [...current, value]
      updateParams({ [key]: next })
    },
    [searchParams, updateParams],
  )

  const clearAll = useCallback(() => {
    setSearchParams(new URLSearchParams(), { replace: true })
  }, [setSearchParams])

  const activeFilterCount =
    selectedCategories.length +
    selectedBrands.length +
    (minRating ? 1 : 0) +
    (maxPrice < priceBounds.max ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (onSaleOnly ? 1 : 0)

  const filterProps = {
    selectedCategories,
    selectedBrands,
    maxPrice,
    minRating,
    inStockOnly,
    onSaleOnly,
    activeCount: activeFilterCount,
    onToggleCategory: (value) => toggleArrayParam('category', value),
    onToggleBrand: (value) => toggleArrayParam('brand', value),
    onMaxPriceChange: (value) => updateParams({ max: value === priceBounds.max ? '' : value }),
    onMinRatingChange: (value) => updateParams({ rating: value === '0' ? '' : value }),
    onInStockChange: (checked) => updateParams({ stock: checked ? '1' : '' }),
    onOnSaleChange: (checked) => updateParams({ sale: checked ? '1' : '' }),
    onClearAll: clearAll,
  }

  const { items, totalResults, totalPages, page: safePage, hasResults } = useProductFilters({
    source: products,
    query,
    selectedCategories,
    selectedBrands,
    maxPrice,
    minRating,
    sortBy,
    inStockOnly,
    onSaleOnly,
    page,
    perPage: PER_PAGE,
  })

  useEffect(() => {
    if (page !== safePage) updateParams({ page: safePage })
  }, [page, safePage, updateParams])

  const breadcrumbItems = [
    { label: 'Home', to: '/' },
    { label: 'Shop', to: activeCategory ? '/shop' : undefined },
    ...(activeCategory ? [{ label: activeCategory.name }] : []),
  ]

  return (
    <div className="bg-white">
      {/* Page header */}
      <section className="border-b border-ink-100 bg-ink-50/70">
        <div className="container-page py-8 lg:py-10">
          <Breadcrumbs items={breadcrumbItems} />

          <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h1 className="text-2xl font-extrabold text-ink-900 sm:text-3xl lg:text-[2.15rem]">
                {activeCategory ? activeCategory.name : 'Shop All Products'}
              </h1>
              <p className="mt-2.5 text-[0.94rem] leading-relaxed text-ink-500">
                {activeCategory
                  ? activeCategory.description
                  : 'The full AS Store range — lab-tested supplements, everyday gym gear and home equipment. Filter by category, brand, price or rating to narrow it down.'}
              </p>
            </div>

            <p className="shrink-0 text-[0.84rem] font-semibold text-ink-500">
              <span className="font-display text-lg font-extrabold text-ink-900">
                {totalResults}
              </span>{' '}
              {totalResults === 1 ? 'product' : 'products'} found
            </p>
          </div>
        </div>
      </section>

      <div className="container-page py-8 lg:py-10">
        <div className="grid gap-8 lg:grid-cols-[16.5rem_1fr] xl:grid-cols-[18rem_1fr] xl:gap-10">
          {/* Desktop filter rail */}
          <aside className="hidden lg:block">
            <div className="sticky top-32">
              <FilterSidebar {...filterProps} />
            </div>
          </aside>

          <div className="min-w-0">
            {/* Toolbar */}
            <div className="flex flex-col gap-3 rounded-2xl border border-ink-100 bg-white p-3 shadow-card sm:flex-row sm:items-center">
              <SearchBar
                value={query}
                onChange={(value) => updateParams({ q: value, __replace: true })}
                onSubmit={() => {}}
                showSuggestions={false}
                placeholder="Search within products…"
                className="flex-1"
              />

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setFiltersOpen(true)}
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-ink-200 px-4 text-[0.88rem] font-semibold text-ink-700 transition hover:border-ink-900 hover:text-ink-900 lg:hidden"
                >
                  <Icon name="sliders" size={17} />
                  Filters
                  {activeFilterCount > 0 ? (
                    <span className="grid h-5 min-w-5 place-items-center rounded-full bg-brand-600 px-1 text-[0.68rem] font-bold text-white">
                      {activeFilterCount}
                    </span>
                  ) : null}
                </button>

                <label className="relative inline-flex h-11 items-center gap-2 rounded-full border border-ink-200 pl-3.5 pr-2 transition hover:border-ink-300">
                  <Icon name="list" size={15} className="shrink-0 text-ink-400" />
                  <span className="hidden text-[0.82rem] font-semibold text-ink-500 sm:inline">
                    Sort
                  </span>
                  <select
                    value={sortBy}
                    onChange={(event) =>
                      updateParams({
                        sort: event.target.value === 'featured' ? '' : event.target.value,
                      })
                    }
                    aria-label="Sort products"
                    className="cursor-pointer appearance-none bg-transparent pr-6 text-[0.86rem] font-semibold text-ink-900 focus:outline-none"
                  >
                    {SORT_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <Icon
                    name="chevronDown"
                    size={15}
                    className="pointer-events-none absolute right-3 text-ink-400"
                  />
                </label>
              </div>
            </div>

            {/* Active filter chips */}
            {activeFilterCount > 0 || query ? (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {query ? (
                  <FilterChip label={`“${query}”`} onRemove={() => updateParams({ q: '' })} />
                ) : null}

                {selectedCategories.map((slug) => (
                  <FilterChip
                    key={slug}
                    label={getCategory(slug)?.name ?? slug}
                    onRemove={() => toggleArrayParam('category', slug)}
                  />
                ))}

                {selectedBrands.map((brand) => (
                  <FilterChip
                    key={brand}
                    label={brand}
                    onRemove={() => toggleArrayParam('brand', brand)}
                  />
                ))}

                {minRating ? (
                  <FilterChip
                    label={`${minRating}★ & above`}
                    onRemove={() => updateParams({ rating: '' })}
                  />
                ) : null}

                {maxPrice < priceBounds.max ? (
                  <FilterChip
                    label={`Under $${maxPrice}`}
                    onRemove={() => updateParams({ max: '' })}
                  />
                ) : null}

                {inStockOnly ? (
                  <FilterChip label="In stock" onRemove={() => updateParams({ stock: '' })} />
                ) : null}

                {onSaleOnly ? (
                  <FilterChip label="On sale" onRemove={() => updateParams({ sale: '' })} />
                ) : null}

                <button
                  type="button"
                  onClick={clearAll}
                  className="ml-1 text-[0.8rem] font-semibold text-brand-700 transition hover:text-brand-800"
                >
                  Clear all
                </button>
              </div>
            ) : null}

            {/* Results */}
            {hasResults ? (
              <>
                <ProductGrid products={items} columns={3} className="mt-6" priorityCount={3} />
                <Pagination
                  page={safePage}
                  totalPages={totalPages}
                  onChange={(nextPage) => {
                    updateParams({ page: nextPage })
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  className="mt-10 justify-center"
                />
              </>
            ) : (
              <EmptyState
                className="mt-6"
                icon="search"
                title="No products match those filters"
                description="Try removing a filter or searching for something broader — most products are also available in a related category."
                actionLabel="Clear all filters"
                onAction={clearAll}
              />
            )}
          </div>
        </div>
      </div>

      <MobileFilters
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        activeCount={activeFilterCount}
        filterProps={filterProps}
      />
    </div>
  )
}

export default Shop

