import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useShop } from '../context/ShopContext'
import { Icon } from './Icons'
import Button from './Button'
import QuantitySelector from './QuantitySelector'
import ProductImage from './ProductImage'
import { formatPrice } from '../utils/format'
import { useBodyScrollLock, useEscapeKey } from '../hooks/useMediaQuery'

/**
 * Slide-over cart. Opens on every "add to cart" so the shopper always gets
 * immediate confirmation and a route towards checkout.
 */
export function MiniCart() {
  const {
    cartOpen,
    closeCart,
    cartItems,
    cartCount,
    subtotal,
    updateQuantity,
    removeFromCart,
    amountToFreeShipping,
    freeShippingEarned,
    shippingRules,
  } = useShop()

  useBodyScrollLock(cartOpen)
  useEscapeKey(
    useCallback(() => closeCart(), [closeCart]),
    cartOpen,
  )

  if (!cartOpen) return null

  const progress = Math.min(100, Math.round((subtotal / shippingRules.freeShippingThreshold) * 100))

  return (
    <div className="fixed inset-0 z-[68]" role="dialog" aria-modal="true" aria-label="Shopping cart">
      <button
        type="button"
        aria-label="Close cart"
        onClick={closeCart}
        className="absolute inset-0 bg-ink-950/55 backdrop-blur-sm animate-fade-in"
      />

      <aside className="absolute inset-y-0 right-0 flex w-[min(26rem,92vw)] flex-col bg-white shadow-2xl animate-slide-in-right">
        <header className="flex items-center justify-between border-b border-ink-100 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <Icon name="cart" size={19} className="text-brand-600" />
            <h2 className="font-display text-base font-bold text-ink-900">Your Cart</h2>
            <span className="rounded-full bg-ink-100 px-2 py-0.5 text-[0.7rem] font-bold text-ink-700">
              {cartCount}
            </span>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="grid h-9 w-9 place-items-center rounded-full text-ink-600 transition hover:bg-ink-100"
          >
            <Icon name="close" size={18} />
          </button>
        </header>

        {cartItems.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-ink-50 text-ink-400">
              <Icon name="cart" size={26} />
            </span>
            <h3 className="mt-4 font-display text-base font-bold text-ink-900">Your cart is empty</h3>
            <p className="mt-1.5 text-sm text-ink-500">
              Add a protein, a shaker or your daily vitamins and they will show up here.
            </p>
            <Button
              to="/shop"
              onClick={closeCart}
              className="mt-6"
              iconRight={<Icon name="arrowRight" size={16} />}
            >
              Start Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="border-b border-ink-100 bg-ink-50/70 px-5 py-3">
              {freeShippingEarned ? (
                <p className="flex items-center gap-2 text-[0.8rem] font-semibold text-brand-700">
                  <Icon name="checkCircle" size={16} />
                  Nice — you have unlocked free standard delivery.
                </p>
              ) : (
                <>
                  <p className="text-[0.8rem] text-ink-600">
                    Add{' '}
                    <strong className="font-semibold text-ink-900">
                      {formatPrice(amountToFreeShipping)}
                    </strong>{' '}
                    more for free delivery
                  </p>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-ink-200">
                    <div
                      className="h-full rounded-full bg-brand-500 transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </>
              )}
            </div>

            <ul className="flex-1 divide-y divide-ink-100 overflow-y-auto px-5">
              {cartItems.map((item) => (
                <li key={item.id} className="flex gap-3 py-4">
                  <Link
                    to={`/product/${item.id}`}
                    onClick={closeCart}
                    className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-ink-50"
                  >
                    <ProductImage image={item.image} className="h-full w-full" />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-[0.68rem] font-bold uppercase tracking-[0.1em] text-ink-400">
                          {item.brand}
                        </p>
                        <Link
                          to={`/product/${item.id}`}
                          onClick={closeCart}
                          className="line-clamp-2 font-display text-[0.88rem] leading-snug font-bold text-ink-900 transition hover:text-brand-700"
                        >
                          {item.name}
                        </Link>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Remove ${item.name}`}
                        className="shrink-0 rounded-full p-1 text-ink-400 transition hover:bg-rose-50 hover:text-rose-600"
                      >
                        <Icon name="trash" size={15} />
                      </button>
                    </div>

                    <div className="mt-2 flex items-center justify-between gap-2">
                      <QuantitySelector
                        size="sm"
                        value={item.qty}
                        onChange={(qty) => updateQuantity(item.id, qty)}
                      />
                      <span className="font-display text-[0.95rem] font-bold text-ink-900">
                        {formatPrice(item.lineTotal)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="border-t border-ink-100 px-5 py-4">
              <div className="flex items-center justify-between text-[0.92rem]">
                <span className="text-ink-600">Subtotal</span>
                <span className="font-display text-lg font-bold text-ink-900">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="mt-1 text-[0.75rem] text-ink-500">
                Delivery, taxes and promo codes are calculated at checkout.
              </p>

              <div className="mt-4 flex flex-col gap-2">
                <Button
                  to="/cart"
                  onClick={closeCart}
                  fullWidth
                  iconRight={<Icon name="arrowRight" size={16} />}
                >
                  View Cart
                </Button>
                <Button to="/cart" onClick={closeCart} variant="outline" fullWidth>
                  Proceed to Checkout
                </Button>
              </div>
            </footer>
          </>
        )}
      </aside>
    </div>
  )
}

export default MiniCart
