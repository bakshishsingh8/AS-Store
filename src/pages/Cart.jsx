import { useState } from 'react'
import { Link } from 'react-router-dom'
import { products } from '../data/products'
import { useShop, DELIVERY_METHODS } from '../context/ShopContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { formatPrice } from '../utils/format'

import Breadcrumbs from '../components/Breadcrumbs'
import Button from '../components/Button'
import EmptyState from '../components/EmptyState'
import ProductImage from '../components/ProductImage'
import QuantitySelector from '../components/QuantitySelector'
import SectionTitle from '../components/SectionTitle'
import { Icon } from '../components/Icons'

const TRUST = [
  { icon: 'lock', label: 'Secure encrypted checkout' },
  { icon: 'truck', label: 'Free delivery over $60' },
  { icon: 'refresh', label: '30-day easy returns' },
]

/** Cart page: line items, promo code, delivery choice and order summary. */
export function Cart() {
  const {
    cartItems,
    cartCount,
    subtotal,
    productSavings,
    promo,
    promoDiscount,
    promoError,
    applyPromo,
    removePromo,
    shippingCost,
    deliveryMethod,
    setDeliveryMethod,
    tax,
    total,
    amountToFreeShipping,
    freeShippingEarned,
    updateQuantity,
    removeFromCart,
    toggleWishlist,
    isInWishlist,
    clearCart,
  } = useShop()

  const [code, setCode] = useState('')
  const [promoMessage, setPromoMessage] = useState('')

  useDocumentTitle('Shopping Cart')

  const recommendations = products
    .filter((product) => !cartItems.some((item) => item.id === product.id))
    .filter((product) => product.bestSeller)
    .slice(0, 3)

  const handleApplyPromo = (event) => {
    event.preventDefault()
    const result = applyPromo(code)
    setPromoMessage(result.ok ? '' : result.message)
  }

  if (!cartItems.length) {
    return (
      <div className="container-page py-14 lg:py-20">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Cart' }]} />

        <div className="mt-8">
          <EmptyState
            icon="cart"
            title="Your cart is empty"
            description="Add a protein, a creatine or a shaker and it will appear here. Whatever you add is saved on this device."
            actionLabel="Start shopping"
            actionTo="/shop"
          />
        </div>

        <section className="mt-16">
          <SectionTitle
            eyebrow="Most popular"
            title="Popular right now"
            description="Best sellers our customers keep reordering."
          />
          <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
            {recommendations.map((product) => (
              <article
                key={product.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-card"
              >
                <Link to={`/product/${product.id}`} className="bg-ink-50">
                  <ProductImage
                    image={product.image}
                    title={product.name}
                    className="h-full w-full"
                  />
                </Link>
                <div className="flex flex-1 flex-col p-4">
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-ink-400">
                    {product.brand}
                  </p>
                  <h3 className="mt-1 line-clamp-2 font-display text-[0.92rem] leading-snug font-bold text-ink-900">
                    {product.name}
                  </h3>
                  <p className="mt-auto pt-3 font-display text-lg font-bold text-ink-900">
                    {formatPrice(product.price)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="bg-white">
      <div className="border-b border-ink-100 bg-ink-50/70">
        <div className="container-page py-8 lg:py-10">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Cart' }]} />
          <h1 className="mt-4 text-2xl font-extrabold text-ink-900 sm:text-3xl">Shopping Cart</h1>
          <p className="mt-2 text-[0.94rem] text-ink-500">
            You have {cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart.
          </p>
        </div>
      </div>

      <div className="container-page grid gap-8 py-8 lg:grid-cols-[1fr_23rem] lg:items-start lg:gap-10 lg:py-12">
        {/* Line items */}
        <div>
          <div className="hidden grid-cols-[1fr_auto_auto_auto] items-center gap-6 border-b border-ink-100 px-2 pb-3 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-ink-400 lg:grid">
            <span>Product</span>
            <span className="w-28 text-center">Quantity</span>
            <span className="w-24 text-right">Total</span>
            <span className="w-8" />
          </div>

          <ul className="divide-y divide-ink-100">
            {cartItems.map((item) => {
              const saved = isInWishlist(item.id)

              return (
                <li
                  key={item.id}
                  className="grid gap-4 py-5 lg:grid-cols-[1fr_auto_auto_auto] lg:items-center lg:gap-6 lg:px-2"
                >
                  <div className="flex gap-4">
                    <Link
                      to={`/product/${item.id}`}
                      className="h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-ink-100 bg-ink-50 sm:h-28 sm:w-28"
                    >
                      <ProductImage image={item.image} title={item.name} className="h-full w-full" />
                    </Link>

                    <div className="min-w-0 flex-1">
                      <p className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-ink-400">
                        {item.brand}
                      </p>
                      <h2 className="mt-1 font-display text-[0.98rem] leading-snug font-bold text-ink-900">
                        <Link to={`/product/${item.id}`} className="transition hover:text-brand-700">
                          {item.name}
                        </Link>
                      </h2>

                      <div className="mt-1.5 flex flex-wrap items-baseline gap-2">
                        <span className="font-display text-[0.98rem] font-bold text-ink-900">
                          {formatPrice(item.price)}
                        </span>
                        {item.discount > 0 ? (
                          <span className="text-[0.78rem] text-ink-400 line-through">
                            {formatPrice(item.originalPrice)}
                          </span>
                        ) : null}
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-4">
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="inline-flex items-center gap-1.5 text-[0.78rem] font-semibold text-ink-400 transition hover:text-rose-600"
                        >
                          <Icon name="trash" size={14} />
                          Remove
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleWishlist(item.id)}
                          className={`inline-flex items-center gap-1.5 text-[0.78rem] font-semibold transition ${
                            saved ? 'text-rose-600' : 'text-ink-400 hover:text-ink-800'
                          }`}
                        >
                          <Icon name="heart" size={14} filled={saved} />
                          {saved ? 'Saved' : 'Move to wishlist'}
                        </button>
                        <span className="text-[0.78rem] text-ink-400">SKU: {item.sku}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-start lg:w-28 lg:justify-center">
                    <QuantitySelector
                      value={item.qty}
                      max={20}
                      onChange={(qty) => updateQuantity(item.id, qty)}
                    />
                  </div>

                  <div className="lg:w-24 lg:text-right">
                    <span className="mr-2 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-ink-400 lg:hidden">
                      Total
                    </span>
                    <span className="font-display text-lg font-bold text-ink-900">
                      {formatPrice(item.lineTotal)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.name}`}
                    className="hidden h-8 w-8 place-items-center rounded-full text-ink-400 transition hover:bg-rose-50 hover:text-rose-600 lg:grid"
                  >
                    <Icon name="close" size={16} />
                  </button>
                </li>
              )
            })}
          </ul>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-ink-100 pt-6">
            <Button to="/shop" variant="outline" iconLeft={<Icon name="chevronLeft" size={16} />}>
              Continue Shopping
            </Button>
            <button
              type="button"
              onClick={clearCart}
              className="text-[0.82rem] font-semibold text-ink-400 transition hover:text-rose-600"
            >
              Clear cart
            </button>
          </div>
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-32">
          <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-card">
            <h2 className="font-display text-lg font-bold text-ink-900">Order Summary</h2>

            <form onSubmit={handleApplyPromo} className="mt-5">
              <label
                htmlFor="promo"
                className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-ink-500"
              >
                Promo code
              </label>

              {promo ? (
                <div className="mt-2 flex items-center justify-between gap-3 rounded-xl border border-brand-200 bg-brand-50 px-3.5 py-3">
                  <span className="inline-flex items-center gap-2 text-[0.85rem] font-bold text-brand-800">
                    <Icon name="tag" size={15} />
                    {promo.code}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      removePromo()
                      setCode('')
                      setPromoMessage('')
                    }}
                    className="text-[0.78rem] font-semibold text-brand-700 transition hover:text-brand-900"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <>
                  <div className="mt-2 flex gap-2">
                    <input
                      id="promo"
                      value={code}
                      onChange={(event) => {
                        setCode(event.target.value)
                        if (promoMessage) setPromoMessage('')
                      }}
                      placeholder="e.g. ASFIT10"
                      className="field flex-1"
                    />
                    <Button type="submit" variant="dark" className="shrink-0">
                      Apply
                    </Button>
                  </div>
                  {promoMessage || promoError ? (
                    <p className="mt-2 text-[0.78rem] font-medium text-rose-600">
                      {promoMessage || promoError}
                    </p>
                  ) : (
                    <p className="mt-2 text-[0.76rem] text-ink-400">
                      Try <strong className="font-semibold text-ink-600">ASFIT10</strong> or{' '}
                      <strong className="font-semibold text-ink-600">FREESHIP</strong>
                    </p>
                  )}
                </>
              )}
            </form>

            <dl className="mt-6 space-y-3 border-t border-ink-100 pt-5 text-[0.9rem]">
              <div className="flex items-center justify-between">
                <dt className="text-ink-600">Subtotal</dt>
                <dd className="font-semibold text-ink-900">{formatPrice(subtotal)}</dd>
              </div>

              {productSavings > 0 ? (
                <div className="flex items-center justify-between">
                  <dt className="text-ink-600">Product savings</dt>
                  <dd className="font-semibold text-brand-700">−{formatPrice(productSavings)}</dd>
                </div>
              ) : null}

              {promoDiscount > 0 ? (
                <div className="flex items-center justify-between">
                  <dt className="text-ink-600">Promo discount ({promo.code})</dt>
                  <dd className="font-semibold text-brand-700">−{formatPrice(promoDiscount)}</dd>
                </div>
              ) : null}

              <div className="flex items-center justify-between">
                <dt className="text-ink-600">Delivery</dt>
                <dd className="font-semibold text-ink-900">
                  {shippingCost === 0 ? (
                    <span className="text-brand-700">Free</span>
                  ) : (
                    formatPrice(shippingCost)
                  )}
                </dd>
              </div>

              <div className="flex items-center justify-between">
                <dt className="text-ink-600">Estimated tax</dt>
                <dd className="font-semibold text-ink-900">{formatPrice(tax)}</dd>
              </div>
            </dl>

            {!freeShippingEarned && shippingCost > 0 ? (
              <p className="mt-4 flex items-start gap-2 rounded-xl bg-amber-50 px-3.5 py-3 text-[0.8rem] text-amber-900">
                <Icon name="truck" size={15} className="mt-0.5 shrink-0" />
                Add {formatPrice(amountToFreeShipping)} more to qualify for free standard delivery.
              </p>
            ) : null}

            <div className="mt-5 flex items-end justify-between border-t border-ink-100 pt-5">
              <span className="font-display text-base font-bold text-ink-900">Total</span>
              <span className="font-display text-2xl font-extrabold text-ink-900">
                {formatPrice(total)}
              </span>
            </div>

            <fieldset className="mt-6">
              <legend className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-ink-500">
                Delivery method
              </legend>
              <div className="mt-2.5 space-y-2">
                {DELIVERY_METHODS.map((method) => (
                  <label
                    key={method.id}
                    className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl border px-3.5 py-3 transition ${
                      deliveryMethod === method.id
                        ? 'border-brand-600 bg-brand-50/60'
                        : 'border-ink-200 bg-white hover:border-ink-300'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="delivery"
                        value={method.id}
                        checked={deliveryMethod === method.id}
                        onChange={() => setDeliveryMethod(method.id)}
                        className="h-4 w-4 accent-brand-600"
                      />
                      <span>
                        <span className="block text-[0.86rem] font-semibold text-ink-900">
                          {method.label}
                        </span>
                        <span className="block text-[0.76rem] text-ink-500">
                          {method.description}
                        </span>
                      </span>
                    </span>
                    <span className="shrink-0 text-[0.84rem] font-semibold text-ink-900">
                      {deliveryMethod === 'standard' && freeShippingEarned
                        ? 'Free'
                        : formatPrice(method.rate)}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <Button size="lg" fullWidth className="mt-6" iconRight={<Icon name="arrowRight" size={18} />}>
              Proceed to Checkout
            </Button>
            <p className="mt-2.5 text-center text-[0.74rem] text-ink-400">
              Demo storefront — no payment is taken.
            </p>

            <ul className="mt-5 space-y-2.5 border-t border-ink-100 pt-5">
              {TRUST.map((item) => (
                <li key={item.label} className="flex items-center gap-2.5 text-[0.8rem] text-ink-600">
                  <Icon name={item.icon} size={15} className="text-brand-600" />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default Cart
