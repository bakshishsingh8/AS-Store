import { Link } from 'react-router-dom'
import { catalogBrands } from '../../data/products'
import { Icon } from '../Icons'

/** Thin band listing the brands we stock — a trust signal above the footer. */
export function BrandStrip() {
  return (
    <section className="border-y border-ink-100 bg-white py-8">
      <div className="container-page">
        <p className="text-center text-[0.7rem] font-bold uppercase tracking-[0.18em] text-ink-400">
          Authorised stockist for
        </p>

        <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {catalogBrands.map((brand) => (
            <li key={brand}>
              <Link
                to={`/shop?brand=${encodeURIComponent(brand)}`}
                className="inline-flex items-center gap-2 font-display text-[0.92rem] font-bold tracking-tight text-ink-400 transition duration-200 hover:text-ink-900"
              >
                <Icon name="verified" size={15} className="text-ink-300" />
                {brand}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default BrandStrip
