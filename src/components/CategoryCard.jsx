import { Link } from 'react-router-dom'
import ProductImage from './ProductImage'
import { Icon } from './Icons'

/**
 * Category tile used on the home page and the categories page.
 * `showDescription` is switched off for the compact home-page grid.
 */
export function CategoryCard({ category, showDescription = true, className = '' }) {
  return (
    <Link
      to={`/shop?category=${category.slug}`}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white p-4 shadow-card transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-card-hover sm:p-5 ${className}`}
    >
      <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-xl bg-ink-50">
        <ProductImage
          image={category.art}
          title={`${category.name} products`}
          className="h-full w-full transition duration-500 ease-out group-hover:scale-[1.07]"
        />
        <span className="absolute left-3 top-3 grid h-8 w-8 place-items-center rounded-lg bg-white/90 text-brand-700 backdrop-blur">
          <Icon name={category.icon} size={17} />
        </span>
      </div>

      <div className="flex items-center justify-between gap-2">
        <h3 className="font-display text-base font-bold text-ink-900 sm:text-[1.05rem]">
          {category.name}
        </h3>
        {category.count !== undefined ? (
          <span className="shrink-0 rounded-full bg-ink-100 px-2 py-0.5 text-[0.68rem] font-semibold text-ink-600">
            {category.count}
          </span>
        ) : null}
      </div>

      <p className="mt-0.5 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-brand-600">
        {category.tagline}
      </p>

      {showDescription ? (
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-500">{category.description}</p>
      ) : null}

      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-900 transition group-hover:text-brand-700">
        Shop Now
        <Icon name="arrowRight" size={16} className="transition duration-300 group-hover:translate-x-1" />
      </span>
    </Link>
  )
}

export default CategoryCard
