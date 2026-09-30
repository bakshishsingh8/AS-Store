import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import { getProduct } from '../data/products'
import { promoCodes, shippingRules } from '../data/site'
import { round2 } from '../utils/format'
import useLocalStorage from '../hooks/useLocalStorage'

export const ShopContext = createContext(null)

export const DELIVERY_METHODS = [
  {
    id: 'standard',
    label: 'Standard Delivery',
    description: '2 – 4 working days',
    rate: shippingRules.standardRate,
  },
  {
    id: 'express',
    label: 'Express Delivery',
    description: 'Next working day',
    rate: shippingRules.expressRate,
  },
]

const CART_KEY = 'as-store:cart'
const WISHLIST_KEY = 'as-store:wishlist'
const PROMO_KEY = 'as-store:promo'

/**
 * Holds every piece of cross-page storefront state: cart, wishlist, the
 * applied promo code and UI drawers. Everything is persisted to localStorage
 * so a refresh does not lose the basket — swap the storage calls for API
 * requests when a backend is added.
 */
export function ShopProvider({ children }) {
  const [cart, setCart] = useLocalStorage(CART_KEY, [])
  const [wishlist, setWishlist] = useLocalStorage(WISHLIST_KEY, [])
  const [promoInput, setPromoInput] = useLocalStorage(PROMO_KEY, null)
  const [deliveryMethod, setDeliveryMethod] = useState('standard')
  const [cartOpen, setCartOpen] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [toasts, setToasts] = useState([])
  const toastSeq = useRef(0)

  /* ------------------------------ toasts ------------------------------ */
  const dismissToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const pushToast = useCallback(
    (message, tone = 'success') => {
      toastSeq.current += 1
      const id = toastSeq.current
      setToasts((current) => [...current, { id, message, tone }])
      window.setTimeout(() => dismissToast(id), 3000)
    },
    [dismissToast],
  )

  /* ------------------------------- cart ------------------------------- */
  const cartItems = useMemo(
    () =>
      cart
        .map((line) => {
          const product = getProduct(line.id)
          if (!product) return null
          return {
            ...product,
            qty: line.qty,
            lineTotal: round2(product.price * line.qty),
            lineSaving: round2((product.originalPrice - product.price) * line.qty),
          }
        })
        .filter(Boolean),
    [cart],
  )

  const cartCount = useMemo(() => cart.reduce((total, line) => total + line.qty, 0), [cart])

  const subtotal = useMemo(
    () => round2(cartItems.reduce((total, item) => total + item.lineTotal, 0)),
    [cartItems],
  )

  const productSavings = useMemo(
    () => round2(cartItems.reduce((total, item) => total + item.lineSaving, 0)),
    [cartItems],
  )

  /* ------------------------------ promo ------------------------------- */
  const promoResult = useMemo(() => {
    if (!promoInput) return { promo: null, error: null }
    const match = promoCodes.find(
      (entry) => entry.code.toLowerCase() === String(promoInput).toLowerCase(),
    )
    if (!match) return { promo: null, error: 'That code is not recognised.' }
    if (subtotal < match.minimumSpend) {
      return { promo: null, error: `Spend $${match.minimumSpend} to use ${match.code}.` }
    }
    return { promo: match, error: null }
  }, [promoInput, subtotal])

  const promo = promoResult.promo

  const promoDiscount = useMemo(() => {
    if (!promo || promo.type !== 'percent') return 0
    return round2((subtotal * promo.value) / 100)
  }, [promo, subtotal])

  /* ----------------------------- totals ------------------------------- */
  const freeShippingEarned = subtotal >= shippingRules.freeShippingThreshold
  const promoFreeShipping = promo?.type === 'shipping'

  const shippingCost = useMemo(() => {
    if (cartItems.length === 0) return 0
    if (deliveryMethod === 'express') return shippingRules.expressRate
    if (freeShippingEarned || promoFreeShipping) return 0
    return shippingRules.standardRate
  }, [cartItems.length, deliveryMethod, freeShippingEarned, promoFreeShipping])

  const taxableAmount = Math.max(round2(subtotal - promoDiscount), 0)
  const tax = round2(taxableAmount * shippingRules.taxRate)
  const total = round2(taxableAmount + shippingCost + tax)
  const amountToFreeShipping = Math.max(
    round2(shippingRules.freeShippingThreshold - subtotal),
    0,
  )

  /* ------------------------------ cart actions ------------------------ */
  const addToCart = useCallback(
    (id, qty = 1, options = {}) => {
      const product = getProduct(id)
      if (!product) return
      const amount = Math.max(1, Math.floor(Number(qty) || 1))

      setCart((current) => {
        const existing = current.find((line) => line.id === id)
        if (existing) {
          return current.map((line) =>
            line.id === id ? { ...line, qty: Math.min(line.qty + amount, 99) } : line,
          )
        }
        return [...current, { id, qty: Math.min(amount, 99) }]
      })

      if (options.silent !== true) pushToast(`${product.name} added to your cart`)
      if (options.openDrawer !== false) setCartOpen(true)
    },
    [pushToast, setCart],
  )

  const updateQuantity = useCallback(
    (id, qty) => {
      const amount = Math.max(0, Math.min(99, Math.floor(Number(qty) || 0)))
      setCart((current) =>
        amount === 0
          ? current.filter((line) => line.id !== id)
          : current.map((line) => (line.id === id ? { ...line, qty: amount } : line)),
      )
    },
    [setCart],
  )

  const removeFromCart = useCallback(
    (id) => {
      const product = getProduct(id)
      setCart((current) => current.filter((line) => line.id !== id))
      if (product) pushToast(`${product.name} removed from your cart`, 'info')
    },
    [pushToast, setCart],
  )

  const clearCart = useCallback(() => setCart([]), [setCart])

  const isInCart = useCallback((id) => cart.some((line) => line.id === id), [cart])

  /* ----------------------------- wishlist ----------------------------- */
  const isInWishlist = useCallback((id) => wishlist.includes(id), [wishlist])

  const toggleWishlist = useCallback(
    (id) => {
      const product = getProduct(id)
      setWishlist((current) => {
        const exists = current.includes(id)
        if (product) {
          pushToast(
            exists ? `${product.name} removed from wishlist` : `${product.name} saved to wishlist`,
            exists ? 'info' : 'success',
          )
        }
        return exists ? current.filter((entry) => entry !== id) : [...current, id]
      })
    },
    [pushToast, setWishlist],
  )

  const removeFromWishlist = useCallback(
    (id) => setWishlist((current) => current.filter((entry) => entry !== id)),
    [setWishlist],
  )

  const wishlistItems = useMemo(
    () => wishlist.map((id) => getProduct(id)).filter(Boolean),
    [wishlist],
  )

  const moveToCart = useCallback(
    (id, qty = 1) => {
      addToCart(id, qty)
      removeFromWishlist(id)
    },
    [addToCart, removeFromWishlist],
  )

  /* ------------------------------- promo ------------------------------ */
  const applyPromo = useCallback(
    (code) => {
      const trimmed = String(code || '').trim()
      if (!trimmed) return { ok: false, message: 'Enter a promo code first.' }

      const match = promoCodes.find(
        (entry) => entry.code.toLowerCase() === trimmed.toLowerCase(),
      )
      if (!match) return { ok: false, message: 'That code is not recognised.' }
      if (subtotal < match.minimumSpend) {
        return {
          ok: false,
          message: `Add $${round2(match.minimumSpend - subtotal)} more to use ${match.code}.`,
        }
      }

      setPromoInput(match.code)
      pushToast(`Promo ${match.code} applied — ${match.label}`)
      return { ok: true, message: match.label }
    },
    [pushToast, setPromoInput, subtotal],
  )

  const removePromo = useCallback(() => setPromoInput(null), [setPromoInput])

  /* ------------------------------- value ------------------------------ */
  const value = useMemo(
    () => ({
      // cart
      cart,
      cartItems,
      cartCount,
      subtotal,
      productSavings,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      isInCart,
      // wishlist
      wishlist,
      wishlistItems,
      wishlistCount: wishlist.length,
      toggleWishlist,
      removeFromWishlist,
      moveToCart,
      isInWishlist,
      // promo + totals
      promo,
      promoCode: promoInput,
      promoError: promoResult.error,
      applyPromo,
      removePromo,
      promoDiscount,
      shippingCost,
      shippingRules,
      deliveryMethod,
      setDeliveryMethod,
      tax,
      total,
      amountToFreeShipping,
      freeShippingEarned,
      // ui
      cartOpen,
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      mobileNavOpen,
      openMobileNav: () => setMobileNavOpen(true),
      closeMobileNav: () => setMobileNavOpen(false),
      // feedback
      toasts,
      pushToast,
      dismissToast,
    }),
    [
      cart,
      cartItems,
      cartCount,
      subtotal,
      productSavings,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      isInCart,
      wishlist,
      wishlistItems,
      toggleWishlist,
      removeFromWishlist,
      moveToCart,
      isInWishlist,
      promo,
      promoInput,
      promoResult.error,
      applyPromo,
      removePromo,
      promoDiscount,
      shippingCost,
      deliveryMethod,
      tax,
      total,
      amountToFreeShipping,
      freeShippingEarned,
      cartOpen,
      mobileNavOpen,
      toasts,
      pushToast,
      dismissToast,
    ],
  )

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

/** Access the storefront state. Throws if used outside <ShopProvider>. */
export function useShop() {
  const context = useContext(ShopContext)
  if (!context) throw new Error('useShop must be used within a <ShopProvider>')
  return context
}

export default ShopContext


