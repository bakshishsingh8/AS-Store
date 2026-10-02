import ProductCard from './ProductCard'

const COLUMN_CLASSES = {
  2: 'grid-cols-2',
  3: 'grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
}

/**
 * Responsive product grid. Cards always sit two-up on phones so the layout
 * never collapses into a single long column.
 */
export function ProductGrid({
  products = [],
  columns = 4,
  className = '',
  emptyState = null,
  priorityCount = 0,
  tone = 'light',
}) {
  if (!products.length) return emptyState

  return (
    <div
      className={`grid gap-4 sm:gap-5 lg:gap-6 ${COLUMN_CLASSES[columns] ?? COLUMN_CLASSES[4]} ${className}`}
    >
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          tone={tone}
          priority={index < priorityCount}
        />
      ))}
    </div>
  )
}

export default ProductGrid
