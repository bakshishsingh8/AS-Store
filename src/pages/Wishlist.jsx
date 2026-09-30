import { Link } from 'react-router-dom'
import { bestSellers } from '../data/products'
import { useShop } from '../context/ShopContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { formatPrice } from '../utils/format'

import Breadcrumbs from '../components/Breadcrumbs'
import Button from '../components/Button'
import EmptyState from '../components/EmptyState'
import ProductImage from '../components/ProductImage'
import ProductGrid from '../components/ProductGrid'
import Rating from '../components/Rating'
import SectionTitle from '../components/SectionTitle'
import { DiscountBadge } from '../components/ProductBadge'
import { Icon } from '../components/Icons'

/** Saved products with quick add-to-cart and remove actions. */
export function Wishlist() {
  const { wishlistItems, moveToCart, toggleWishlist, addToCart } = useShop()

  useDocumentTitle('My Wishlist')

  const recommendations = bestSellers
    .filter((product) => !wishlistItems.some((item) => item.id === product.id))
    .slice(0, 4)

  return (
    <div className="bg-white">
      <div className="border-b border-ink-100 bg-ink-50/70">
        <div className="container-page py-8 lg:py-10">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Wishlist' }]} />
          <h1 className="mt-4 text-2xl font-extrabold text-ink-900 sm:text-3xl">My Wishlist</h1>
          <p className="mt-2 text-[0.94rem] text-ink-500">
            {wishlistItems.length
              ? `${wishlistItems.length} saved ${wishlistItems.length === 1 ? 'product' : 'products'}.`
              : 'Keep track of the products you are considering.'}
          </p>
        </div>
      </div>

      <div className="container-page py-8 lg:py-12">
        {wishlistItems.length === 0 ? (
          <EmptyState
            icon="heart"
            title="Your wishlist is empty"
            description="Tap the heart on any product to save it here. Your wishlist is stored on this device."
            actionLabel="Browse products"
            actionTo="/shop"
          />
        ) : (
          <ul className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
            {wishlistItems.map((product) => (
              <li
                key={product.id}
                className="flex gap-4 rounded-2xl border border-ink-100 bg-white p-4 shadow-card transition duration-300 hover:shadow-card-hover sm:p-5"
              >
                <Link
                  to={`/product/${product.id}`}
                  className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl border border-ink-100 bg-ink-50 sm:h-32 sm:w-32"
                >
                  <ProductImage
                    image={product.image}
                    title={product.name}
                    className="h-full w-full"
                  />
                  <span className="absolute left-2 top-2">
                    <DiscountBadge percent={product.discount} />
                  </span>
                </Link>

                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-ink-400">
                        {product.brand}
                      </p>
                      <h2 className="mt-1 line-clamp-2 font-display text-[0.95rem] leading-snug font-bold text-ink-900">
                        <Link
                          to={`/product/${product.id}`}
                          className="transition hover:text-brand-700"
                        >
                          {product.name}
                        </Link>
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleWishlist(product.id)}
                      aria-label={`Remove ${product.name} from wishlist`}
                      className="shrink-0 rounded-full p-1.5 text-ink-400 transition hover:bg-rose-50 hover:text-rose-600"
                    >
                      <Icon name="trash" size={16} />
                    </button>
                  </div>

                  <Rating value={product.rating} reviews={product.reviews} size={13} className="mt-2" />

                  <div className="mt-auto pt-3">
                    <div className="flex flex-wrap items-baseline gap-2">
                      <span className="font-display text-lg font-bold text-ink-900">
                        {formatPrice(product.price)}
                      </span>
                      {product.discount > 0 ? (
                        <span className="text-[0.8rem] text-ink-400 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      ) : null}
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        onClick={() => moveToCart(product.id, 1)}
                        iconLeft={<Icon name="cart" size={15} />}
                      >
                        Add to Cart
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => addToCart(product.id, 1, { openDrawer: false })}
                      >
                        Keep &amp; Add
                      </Button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {recommendations.length ? (
          <section className="mt-16">
            <SectionTitle
              eyebrow="You might like"
              title="Popular picks to add next"
              description="The products most often bought alongside saved items."
            />
            <ProductGrid products={recommendations} columns={4} className="mt-8" />
          </section>
        ) : null}
      </div>
    </div>
  )
}

export default Wishlist
