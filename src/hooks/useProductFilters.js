import { useMemo } from 'react'
import { catalogBrands, catalogPriceRange, products } from '../data/products'
import { categories } from '../data/categories'

export const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'popularity', label: 'Most Popular' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest Arrivals' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'discount', label: 'Biggest Discount' },
]

export const RATING_OPTIONS = [
  { value: '0', label: 'All ratings' },
  { value: '4.5', label: '4.5 & above' },
  { value: '4', label: '4.0 & above' },
  { value: '3.5', label: '3.5 & above' },
]

export const PRICE_RANGES = [
  { label: 'Under $20', min: 0, max: 20 },
  { label: '$20 – $40', min: 20, max: 40 },
  { label: '$40 – $70', min: 40, max: 70 },
  { label: '$70 – $120', min: 70, max: 120 },
  { label: '$120 & above', min: 120, max: Infinity },
]

/** Category options with a live product count, used by the filter sidebar. */
export const categoryOptions = categories.map((category) => ({
  value: category.slug,
  label: category.name,
  count: products.filter((product) => product.category === category.slug).length,
}))

export const brandOptions = catalogBrands.map((brand) => ({
  value: brand,
  label: brand,
  count: products.filter((product) => product.brand === brand).length,
}))

export const priceBounds = catalogPriceRange

function matchesPrice(product, maxPrice) {
  return product.price <= maxPrice
}

function matchesRating(product, minRating) {
  if (!minRating) return true
  return product.rating >= Number(minRating)
}

function sortProducts(list, sortBy) {
  const sorted = [...list]

  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price)
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews)
    case 'popularity':
      return sorted.sort((a, b) => b.popularity - a.popularity)
    case 'newest':
      return sorted.sort((a, b) => b.addedAt - a.addedAt)
    case 'discount':
      return sorted.sort((a, b) => b.discount - a.discount)
    default:
      return sorted.sort(
        (a, b) =>
          Number(b.featured) - Number(a.featured) ||
          Number(b.bestSeller) - Number(a.bestSeller) ||
          b.rating - a.rating,
      )
  }
}

/**
 * Pure filtering/sorting/pagination pipeline for the shop and offers pages.
 * Everything is memoised so typing in the search box stays smooth.
 */
export function useProductFilters({
  source = products,
  query = '',
  selectedCategories = [],
  selectedBrands = [],
  maxPrice = null,
  minRating = '',
  sortBy = 'featured',
  inStockOnly = false,
  onSaleOnly = false,
  page = 1,
  perPage = 9,
} = {}) {
  const filtered = useMemo(() => {
    const search = String(query || '').trim().toLowerCase()

    return source.filter((product) => {
      if (search) {
        const haystack = `${product.name} ${product.brand} ${product.category} ${product.description}`
          .toLowerCase()
          .replace(/-/g, ' ')
        if (!haystack.includes(search.replace(/-/g, ' '))) return false
      }

      if (selectedCategories.length && !selectedCategories.includes(product.category)) return false
      if (selectedBrands.length && !selectedBrands.includes(product.brand)) return false
      if (maxPrice !== null && maxPrice !== '' && !matchesPrice(product, Number(maxPrice))) return false
      if (!matchesRating(product, minRating)) return false
      if (inStockOnly && !product.inStock) return false
      if (onSaleOnly && !product.onSale) return false

      return true
    })
  }, [source, query, selectedCategories, selectedBrands, maxPrice, minRating, inStockOnly, onSaleOnly])

  const sorted = useMemo(() => sortProducts(filtered, sortBy), [filtered, sortBy])

  const totalPages = Math.max(1, Math.ceil(sorted.length / perPage))
  const safePage = Math.min(Math.max(1, Number(page) || 1), totalPages)
  const start = (safePage - 1) * perPage

  const items = useMemo(() => sorted.slice(start, start + perPage), [sorted, start, perPage])

  const priceCounts = useMemo(
    () =>
      PRICE_RANGES.map((range) => ({
        ...range,
        count: source.filter((product) => product.price >= range.min && product.price < range.max)
          .length,
      })),
    [source],
  )

  return {
    items,
    allFiltered: sorted,
    totalResults: sorted.length,
    totalPages,
    page: safePage,
    perPage,
    priceCounts,
    hasResults: sorted.length > 0,
  }
}

export default useProductFilters
