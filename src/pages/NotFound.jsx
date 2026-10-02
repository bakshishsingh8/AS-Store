import { Link } from 'react-router-dom'
import { bestSellers } from '../data/products'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

import Button from '../components/Button'
import ProductGrid from '../components/ProductGrid'
import SectionTitle from '../components/SectionTitle'
import { Icon } from '../components/Icons'

const SUGGESTIONS = [
  { label: 'Home', to: '/' },
  { label: 'Shop all', to: '/shop' },
  { label: 'Categories', to: '/categories' },
  { label: 'Offers', to: '/offers' },
  { label: 'Contact us', to: '/contact' },
]

/** 404 page rendered by the catch-all route in App.jsx. */
export function NotFound() {
  useDocumentTitle('Page Not Found')

  return (
    <div className="bg-white">
      <div className="container-page py-16 text-center lg:py-24">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-brand-50 text-brand-700 shadow-card">
          <Icon name="search" size={28} />
        </span>

        <p className="mt-8 font-display text-6xl font-extrabold tracking-tight text-ink-900 sm:text-7xl">
          404
        </p>
        <h1 className="mt-3 text-2xl font-extrabold text-ink-900 sm:text-3xl">
          This page skipped leg day
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-[0.95rem] leading-relaxed text-ink-500">
          The address you followed does not exist — it may have been moved, renamed, or it was
          never here in the first place.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button to="/" iconLeft={<Icon name="arrowRight" size={16} className="rotate-180" />}>
            Back to home
          </Button>
          <Button to="/shop" variant="outline" iconLeft={<Icon name="cart" size={16} />}>
            Browse the shop
          </Button>
        </div>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[0.86rem]">
          {SUGGESTIONS.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="font-semibold text-ink-500 transition hover:text-brand-700"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <section className="border-t border-ink-100 bg-ink-50/70 py-14 lg:py-20">
        <div className="container-page">
          <SectionTitle
            eyebrow="While you are here"
            title="Best sellers worth a look"
            description="Chances are you came for one of these anyway."
          />
          <ProductGrid products={bestSellers.slice(0, 4)} columns={4} className="mt-8" />
        </div>
      </section>
    </div>
  )
}

export default NotFound
