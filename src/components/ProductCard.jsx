import { Link } from 'react-router-dom'
import ProductImage from './ProductImage'
import Rating from './Rating'
import Button from './Button'
import { DiscountBadge, ProductBadge } from './ProductBadge'
import { Icon } from './Icons'
import { useShop } from '../context/ShopContext'
import { formatPrice } from '../utils/format'

/**
 * The product tile used everywhere: home rails, shop grid, wishlist,
 * offers, related products and best sellers.
 */
export function ProductCard({ product, className = '', priority = false, tone = 'light' }) {
  const { addToCart, toggleWishlist, isInWishlist } = useShop()
  const saved = isInWishlist(product.id)
  const lowStock = product.inStock && product.stock <= 25
  const isDark = tone === 'dark'

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-2xl border shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-card-hover ${
        isDark
          ? 'border-white/10 bg-ink-900 hover:border-white/20'
          : 'border-ink-100 bg-white hover:border-ink-200'
      } ${className}`}
    >
      <div className="relative aspect-square overflow-hidden bg-ink-50">
        <Link
          to={`/product/${product.id}`}
          aria-label={product.name}
          className="block h-full w-full focus-visible:outline-offset-4"
        >
          <ProductImage
            image={product.image}
            title={product.name}
            eager={priority}
            className="h-full w-full transition duration-500 ease-out group-hover:scale-[1.06]"
          />
        </Link>

        <div className="pointer-events-none absolute left-3 top-3 flex flex-col items-start gap-1.5">
          <ProductBadge label={product.badge} />
          <DiscountBadge percent={product.discount} />
        </div>

        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          className={`absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full backdrop-blur transition duration-200 ${
            saved
              ? 'bg-rose-600 text-white shadow-sm'
              : 'bg-white/85 text-ink-600 hover:bg-white hover:text-rose-600'
          }`}
        >
          <Icon name="heart" size={17} filled={saved} />
        </button>

        {/* Quick add — appears on hover on pointer devices only. */}
        <div className="pointer-events-none absolute inset-x-3 bottom-3 hidden opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:block sm:translate-y-2">
          <Button
            size="sm"
            fullWidth
            className="pointer-events-auto shadow-lg"
            onClick={() => addToCart(product.id, 1)}
            iconLeft={<Icon name="cart" size={16} />}
          >
            Add to Cart
          </Button>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between gap-2">
          <span
            className={`truncate text-[0.68rem] font-bold uppercase tracking-[0.12em] ${
              isDark ? 'text-white/45' : 'text-ink-400'
            }`}
          >
            {product.brand}
          </span>
          {lowStock ? (
            <span className="shrink-0 text-[0.66rem] font-semibold text-rose-600">
              Only {product.stock} left
            </span>
          ) : null}
        </div>

        <h3
          className={`mt-1.5 line-clamp-2 font-display text-[0.95rem] leading-snug font-bold ${
            isDark ? 'text-white' : 'text-ink-900'
          }`}
        >
          <Link to={`/product/${product.id}`} className="transition hover:text-brand-700">
            {product.name}
          </Link>
        </h3>

        <Rating value={product.rating} reviews={product.reviews} size={13} className="mt-2" />

        <div className="mt-auto pt-3.5">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className={`font-display text-lg font-bold ${isDark ? 'text-white' : 'text-ink-900'}`}>
              {formatPrice(product.price)}
            </span>
            {product.discount > 0 ? (
              <>
                <span className={`text-[0.82rem] line-through ${isDark ? 'text-white/40' : 'text-ink-400'}`}>
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="text-[0.72rem] font-semibold text-rose-600">
                  Save {product.discount}%
                </span>
              </>
            ) : null}
          </div>

          {/* Touch devices get an always-visible button. */}
          <Button
            size="sm"
            fullWidth
            variant={product.inStock ? 'dark' : 'outline'}
            disabled={!product.inStock}
            className="mt-3.5 sm:hidden"
            onClick={() => addToCart(product.id, 1)}
            iconLeft={<Icon name="cart" size={15} />}
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
