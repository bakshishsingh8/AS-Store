import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { getProduct, getRelatedProducts } from '../data/products'
import { getCategory } from '../data/categories'
import { getProductReviews, getRatingBreakdown } from '../data/reviews'
import { useShop } from '../context/ShopContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { formatPrice, formatCount, formatRating } from '../utils/format'

import Breadcrumbs from '../components/Breadcrumbs'
import Button from '../components/Button'
import EmptyState from '../components/EmptyState'
import ProductGrid from '../components/ProductGrid'
import ProductImage from '../components/ProductImage'
import QuantitySelector from '../components/QuantitySelector'
import Rating from '../components/Rating'
import SectionTitle from '../components/SectionTitle'
import { ProductBadge } from '../components/ProductBadge'
import { Icon, StarIcon } from '../components/Icons'

const TABS = [
  { id: 'details', label: 'Product Details' },
  { id: 'ingredients', label: 'Ingredients' },
  { id: 'usage', label: 'Usage' },
  { id: 'benefits', label: 'Benefits' },
  { id: 'reviews', label: 'Reviews' },
]

const DELIVERY_NOTES = [
  { icon: 'truck', title: 'Free standard delivery', copy: 'On all orders over $60' },
  { icon: 'clock', title: 'Same-day dispatch', copy: 'Order before 4pm on a working day' },
  { icon: 'refresh', title: '30-day returns', copy: 'Unopened products, full refund' },
  { icon: 'shield', title: 'Authenticity guaranteed', copy: 'Batch code printed on every pack' },
]

function DeliveryNote({ icon, title, copy }) {
  return (
    <li className="flex items-start gap-3 rounded-xl border border-ink-100 bg-white p-3.5">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700">
        <Icon name={icon} size={17} />
      </span>
      <span className="min-w-0">
        <span className="block text-[0.84rem] font-semibold text-ink-900">{title}</span>
        <span className="block text-[0.78rem] text-ink-500">{copy}</span>
      </span>
    </li>
  )
}

/** Full product page: gallery, buy box, information tabs and related items. */
export function ProductDetails() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const product = getProduct(productId)

  const { addToCart, toggleWishlist, isInWishlist } = useShop()
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [activeTab, setActiveTab] = useState('details')
  const [flavour, setFlavour] = useState(product?.flavours?.[0] ?? null)

  useDocumentTitle(product ? product.name : 'Product not found')

  if (!product) {
    return (
      <div className="container-page py-20">
        <EmptyState
          icon="search"
          title="We could not find that product"
          description="It may have sold out or been renamed. Try searching the shop for something similar."
          actionLabel="Browse all products"
          actionTo="/shop"
        />
      </div>
    )
  }

  const category = getCategory(product.category)
  const saved = isInWishlist(product.id)
  const gallery = product.gallery ?? [product.image]
  const reviews = getProductReviews(product.id, 4)
  const breakdown = getRatingBreakdown(product)
  const related = getRelatedProducts(product, 4)

  const handleBuyNow = () => {
    addToCart(product.id, quantity, { openDrawer: false })
    navigate('/cart')
  }

  return (
    <div className="bg-white">
      <div className="container-page pt-6 lg:pt-8">
        <Breadcrumbs
          items={[
            { label: 'Home', to: '/' },
            { label: 'Shop', to: '/shop' },
            { label: category?.name ?? 'Products', to: `/shop?category=${product.category}` },
            { label: product.name },
          ]}
        />
      </div>

      <div className="container-page py-8 lg:py-10">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Gallery */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="relative overflow-hidden rounded-3xl border border-ink-100 bg-ink-50">
              <ProductImage
                key={gallery[activeImage]?.variant}
                image={gallery[activeImage]}
                title={product.name}
                eager
                className="h-full w-full animate-fade-in"
              />

              <div className="absolute left-4 top-4 flex flex-col items-start gap-2">
                <ProductBadge label={product.badge} />
              </div>

              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                aria-pressed={saved}
                aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
                className={`absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full backdrop-blur transition ${
                  saved
                    ? 'bg-rose-600 text-white'
                    : 'bg-white/90 text-ink-600 hover:bg-white hover:text-rose-600'
                }`}
              >
                <Icon name="heart" size={20} filled={saved} />
              </button>
            </div>

            <div className="mt-3 grid grid-cols-4 gap-3">
              {gallery.map((image, index) => (
                <button
                  key={`${image.variant}-${index}`}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  aria-label={`View image ${index + 1} of ${gallery.length}`}
                  aria-current={index === activeImage}
                  className={`overflow-hidden rounded-xl border-2 bg-ink-50 transition ${
                    index === activeImage
                      ? 'border-brand-600'
                      : 'border-transparent hover:border-ink-200'
                  }`}
                >
                  <ProductImage image={image} className="h-full w-full" />
                </button>
              ))}
            </div>
          </div>

          {/* Buy box */}
          <div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <Link
                to={`/shop?brand=${encodeURIComponent(product.brand)}`}
                className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-brand-700 transition hover:text-brand-800"
              >
                {product.brand}
              </Link>
              <span className="h-3 w-px bg-ink-200" />
              <Link
                to={`/shop?category=${product.category}`}
                className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-ink-400 transition hover:text-ink-700"
              >
                {category?.name ?? 'Products'}
              </Link>
            </div>

            <h1 className="mt-3 text-2xl font-extrabold text-ink-900 sm:text-3xl lg:text-[2.15rem] lg:leading-tight">
              {product.name}
            </h1>

            <div className="mt-3.5 flex flex-wrap items-center gap-x-5 gap-y-2">
              <button
                type="button"
                onClick={() => setActiveTab('reviews')}
                className="transition hover:opacity-80"
              >
                <Rating value={product.rating} reviews={product.reviews} size={16} />
              </button>

              <span
                className={`inline-flex items-center gap-1.5 text-[0.8rem] font-semibold ${
                  product.inStock ? 'text-brand-700' : 'text-rose-600'
                }`}
              >
                <Icon name="checkCircle" size={15} />
                {product.inStock
                  ? product.stock <= 25
                    ? `Low stock — ${product.stock} left`
                    : 'In stock'
                  : 'Out of stock'}
              </span>

              <span className="text-[0.78rem] text-ink-400">SKU: {product.sku}</span>
            </div>

            <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-display text-3xl font-extrabold text-ink-900 sm:text-[2.1rem]">
                {formatPrice(product.price)}
              </span>
              {product.discount > 0 ? (
                <>
                  <span className="text-lg text-ink-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="text-[0.82rem] font-semibold text-brand-700">
                    You save {formatPrice(product.savings)}
                  </span>
                </>
              ) : null}
            </div>

            <p className="mt-5 text-[0.95rem] leading-relaxed text-ink-600">{product.description}</p>

            {product.flavours?.length ? (
              <div className="mt-6">
                <p className="text-[0.78rem] font-bold uppercase tracking-[0.12em] text-ink-500">
                  Flavour
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {product.flavours.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setFlavour(option)}
                      aria-pressed={flavour === option}
                      className={`rounded-full border px-3.5 py-2 text-[0.82rem] font-semibold transition ${
                        flavour === option
                          ? 'border-ink-950 bg-ink-950 text-white'
                          : 'border-ink-200 bg-white text-ink-600 hover:border-ink-900 hover:text-ink-900'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <QuantitySelector value={quantity} onChange={setQuantity} max={20} />

              <Button
                size="lg"
                className="flex-1"
                disabled={!product.inStock}
                onClick={() => addToCart(product.id, quantity, { openDrawer: false })}
                iconLeft={<Icon name="cart" size={18} />}
              >
                Add to Cart
              </Button>

              <Button
                size="lg"
                variant="dark"
                disabled={!product.inStock}
                onClick={handleBuyNow}
                className="flex-1"
              >
                Buy Now
              </Button>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <Button
                variant="outline"
                onClick={() => toggleWishlist(product.id)}
                iconLeft={<Icon name="heart" size={17} filled={saved} />}
              >
                {saved ? 'Saved to Wishlist' : 'Add to Wishlist'}
              </Button>
              <a
                href="#product-info"
                className="text-[0.85rem] font-semibold text-ink-500 transition hover:text-ink-900"
              >
                View full specifications
              </a>
            </div>

            <ul className="mt-6 space-y-2.5">
              {product.benefits.slice(0, 3).map((benefit) => (
                <li key={benefit} className="flex items-start gap-2.5 text-[0.9rem] text-ink-700">
                  <Icon name="check" size={16} strokeWidth={2.6} className="mt-0.5 shrink-0 text-brand-600" />
                  {benefit}
                </li>
              ))}
            </ul>

            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {DELIVERY_NOTES.map((note) => (
                <DeliveryNote key={note.title} {...note} />
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Product information */}
      <section id="product-info" className="container-page scroll-mt-32 pb-14 lg:pb-20">
        <SectionTitle
          eyebrow="Product information"
          title="Everything on the label, explained"
          description="Full transparency on what is inside, how to use it and what you should expect from it."
        />

        <div
          className="no-scrollbar mt-8 flex gap-1 overflow-x-auto border-b border-ink-100"
          role="tablist"
          aria-label="Product information"
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id)}
                className={`relative shrink-0 px-4 py-3.5 text-[0.88rem] font-semibold transition ${
                  isActive ? 'text-ink-900' : 'text-ink-500 hover:text-ink-900'
                }`}
              >
                {tab.label}
                {tab.id === 'reviews' ? (
                  <span className="ml-1.5 text-ink-400">({formatCount(product.reviews)})</span>
                ) : null}
                {isActive ? (
                  <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-brand-600" />
                ) : null}
              </button>
            )
          })}
        </div>

        <div className="mt-8">
          {activeTab === 'details' ? (
            <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
              <div>
                <h3 className="font-display text-lg font-bold text-ink-900">About this product</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-600">
                  {product.description}
                </p>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-600">
                  Sold and shipped by {product.brand} through AS Store. Every batch is third-party
                  tested for purity and label accuracy, and the batch code is printed on the pack so
                  you can verify it yourself.
                </p>

                <h4 className="mt-7 font-display text-[1.05rem] font-bold text-ink-900">
                  What is included
                </h4>
                <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                  {product.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-start gap-2.5 rounded-xl border border-ink-100 bg-white p-3.5 text-[0.88rem] text-ink-700"
                    >
                      <Icon
                        name="check"
                        size={16}
                        strokeWidth={2.6}
                        className="mt-0.5 shrink-0 text-brand-600"
                      />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <aside className="rounded-2xl border border-ink-100 bg-ink-50/70 p-5">
                <h3 className="font-display text-base font-bold text-ink-900">Specifications</h3>
                <dl className="mt-4 divide-y divide-ink-200/70">
                  {product.specRows.map((row) => (
                    <div key={row.label} className="flex items-start justify-between gap-4 py-3">
                      <dt className="text-[0.82rem] font-semibold text-ink-500">{row.label}</dt>
                      <dd className="text-right text-[0.85rem] font-semibold text-ink-900">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                  <div className="flex items-start justify-between gap-4 py-3">
                    <dt className="text-[0.82rem] font-semibold text-ink-500">Brand</dt>
                    <dd className="text-right text-[0.85rem] font-semibold text-ink-900">
                      {product.brand}
                    </dd>
                  </div>
                  <div className="flex items-start justify-between gap-4 py-3">
                    <dt className="text-[0.82rem] font-semibold text-ink-500">Category</dt>
                    <dd className="text-right text-[0.85rem] font-semibold text-ink-900">
                      {category?.name ?? product.category}
                    </dd>
                  </div>
                </dl>
              </aside>
            </div>
          ) : null}

          {activeTab === 'ingredients' ? (
            <div className="max-w-3xl">
              <h3 className="font-display text-lg font-bold text-ink-900">
                {product.ingredientsLabel}
              </h3>
              <p className="mt-2 text-[0.9rem] text-ink-500">
                Listed in descending order of weight, as printed on the pack.
              </p>
              <ul className="mt-5 space-y-2.5">
                {product.ingredients.map((ingredient) => (
                  <li
                    key={ingredient}
                    className="flex items-start gap-3 rounded-xl border border-ink-100 bg-white p-3.5 text-[0.9rem] text-ink-700"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                    {ingredient}
                  </li>
                ))}
              </ul>
              <p className="mt-5 flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-[0.85rem] leading-relaxed text-amber-900">
                <Icon name="info" size={17} className="mt-0.5 shrink-0" />
                Not intended to diagnose, treat or cure any disease. Consult your doctor before use
                if you are pregnant, nursing, under 18 or taking prescription medication.
              </p>
            </div>
          ) : null}

          {activeTab === 'usage' ? (
            <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
              <div className="max-w-2xl">
                <h3 className="font-display text-lg font-bold text-ink-900">{product.usageLabel}</h3>
                <ol className="mt-5 space-y-3">
                  {product.usage.map((step, index) => (
                    <li
                      key={step}
                      className="flex items-start gap-3.5 rounded-xl border border-ink-100 bg-white p-4"
                    >
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-600 text-[0.78rem] font-bold text-white">
                        {index + 1}
                      </span>
                      <span className="text-[0.9rem] leading-relaxed text-ink-700">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <aside className="rounded-2xl border border-ink-100 bg-ink-50/70 p-5">
                <h3 className="font-display text-base font-bold text-ink-900">At a glance</h3>
                <ul className="mt-4 space-y-3 text-[0.85rem] text-ink-600">
                  <li className="flex items-center justify-between gap-3">
                    <span className="text-ink-500">Serving size</span>
                    <span className="font-semibold text-ink-900">{product.specRows[1]?.value}</span>
                  </li>
                  <li className="flex items-center justify-between gap-3">
                    <span className="text-ink-500">Best taken</span>
                    <span className="font-semibold text-ink-900">Around training</span>
                  </li>
                  <li className="flex items-center justify-between gap-3">
                    <span className="text-ink-500">Storage</span>
                    <span className="font-semibold text-ink-900">Cool, dry place</span>
                  </li>
                </ul>
                {flavour ? (
                  <p className="mt-5 rounded-xl border border-ink-200 bg-white px-3.5 py-3 text-[0.82rem] text-ink-600">
                    Selected flavour: <strong className="font-semibold text-ink-900">{flavour}</strong>
                  </p>
                ) : null}
              </aside>
            </div>
          ) : null}

          {activeTab === 'benefits' ? (
            <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
              <div>
                <h3 className="font-display text-lg font-bold text-ink-900">What this does for you</h3>
                <ul className="mt-5 space-y-3">
                  {product.benefits.map((benefit, index) => (
                    <li
                      key={benefit}
                      className="flex items-start gap-4 rounded-2xl border border-ink-100 bg-white p-5"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 font-display text-[0.85rem] font-extrabold text-brand-700">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[0.92rem] leading-relaxed text-ink-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <aside className="rounded-2xl bg-ink-950 p-6 text-white">
                <Icon name="verified" size={24} className="text-brand-400" />
                <h4 className="mt-4 font-display text-[1.05rem] font-bold text-white">
                  Tested, not just claimed
                </h4>
                <p className="mt-2 text-[0.88rem] leading-relaxed text-white/60">
                  Every batch of {product.name} is third-party tested for purity, heavy metals and
                  label accuracy before it reaches our warehouse.
                </p>
                <ul className="mt-5 space-y-2.5 text-[0.84rem] text-white/70">
                  <li className="flex items-center gap-2">
                    <Icon name="check" size={15} className="text-brand-400" /> Batch certificate on
                    request
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="check" size={15} className="text-brand-400" /> Full dose disclosure
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="check" size={15} className="text-brand-400" /> Sourced direct from
                    the maker
                  </li>
                </ul>
              </aside>
            </div>
          ) : null}

          {activeTab === 'reviews' ? (
            <div className="grid gap-8 lg:grid-cols-[20rem_1fr]">
              {/* Summary */}
              <aside className="h-max rounded-2xl border border-ink-100 bg-ink-50/70 p-6">
                <div className="flex items-end gap-3">
                  <span className="font-display text-4xl font-extrabold text-ink-900">
                    {formatRating(product.rating)}
                  </span>
                  <span className="pb-1.5 text-[0.82rem] text-ink-500">
                    out of 5 · {formatCount(product.reviews)} reviews
                  </span>
                </div>
                <Rating
                  value={product.rating}
                  size={17}
                  showValue={false}
                  label={false}
                  className="mt-2"
                />

                <ul className="mt-5 space-y-2.5">
                  {breakdown.map((row) => (
                    <li key={row.stars} className="flex items-center gap-3">
                      <span className="flex w-8 shrink-0 items-center gap-1 text-[0.78rem] font-semibold text-ink-600">
                        {row.stars}
                        <StarIcon size={11} className="text-amber-500" />
                      </span>
                      <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-200">
                        <span
                          className="block h-full rounded-full bg-amber-500"
                          style={{ width: `${Math.min(100, row.percent)}%` }}
                        />
                      </span>
                      <span className="w-10 shrink-0 text-right text-[0.75rem] text-ink-500">
                        {row.percent}%
                      </span>
                    </li>
                  ))}
                </ul>

                <Button variant="outline" fullWidth className="mt-6">
                  Write a review
                </Button>
              </aside>

              {/* Reviews */}
              <div>
                <ul className="space-y-4">
                  {reviews.map((review) => (
                    <li key={review.id} className="rounded-2xl border border-ink-100 bg-white p-5">
                      <div className="flex items-start gap-4">
                        <span
                          className={`grid h-11 w-11 shrink-0 place-items-center rounded-full font-display text-sm font-extrabold ${review.tone}`}
                        >
                          {review.initials}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                            <span className="text-[0.92rem] font-bold text-ink-900">
                              {review.name}
                            </span>
                            {review.verified ? (
                              <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2 py-0.5 text-[0.68rem] font-bold text-brand-700">
                                <Icon name="checkCircle" size={11} />
                                Verified purchase
                              </span>
                            ) : null}
                            <span className="text-[0.75rem] text-ink-400">{review.date}</span>
                          </div>

                          <Rating
                            value={review.rating}
                            size={13}
                            showValue={false}
                            className="mt-2"
                          />

                          <h4 className="mt-2.5 font-display text-[0.95rem] font-bold text-ink-900">
                            {review.title}
                          </h4>
                          <p className="mt-1.5 text-[0.9rem] leading-relaxed text-ink-600">
                            {review.body}
                          </p>

                          <button
                            type="button"
                            className="mt-3 text-[0.78rem] font-semibold text-ink-400 transition hover:text-ink-700"
                          >
                            Helpful ({review.helpful})
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* Related products */}
      {related.length ? (
        <section className="border-t border-ink-100 bg-ink-50/70 py-14 lg:py-20">
          <div className="container-page">
            <SectionTitle
              eyebrow="You may also like"
              title="Pairs well with this product"
              description="Customers who bought this item usually add these to the same order."
            />
            <ProductGrid products={related} columns={4} className="mt-8" />
          </div>
        </section>
      ) : null}
    </div>
  )
}

export default ProductDetails

