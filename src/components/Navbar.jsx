import { useCallback, useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { navLinks, site } from '../data/site'
import { categories } from '../data/categories'
import { useShop } from '../context/ShopContext'
import { Icon, LogoMark } from './Icons'
import SearchBar from './SearchBar'
import Button from './Button'
import { useBodyScrollLock, useEscapeKey } from '../hooks/useMediaQuery'

const linkBase =
  'relative inline-flex items-center gap-1 rounded-full px-3 py-2 text-[0.9rem] font-semibold transition duration-200'

function navLinkClass({ isActive }) {
  return `${linkBase} ${
    isActive ? 'text-brand-700' : 'text-ink-600 hover:bg-ink-100 hover:text-ink-900'
  }`
}

/** Icon button with an optional count bubble (cart, wishlist). */
function IconButton({ name, label, to, onClick, count = 0, filled = false }) {
  const content = (
    <>
      <Icon name={name} size={20} filled={filled && count > 0} />
      {count > 0 ? (
        <span className="absolute -right-0.5 -top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-brand-600 px-1 text-[0.62rem] font-bold text-white ring-2 ring-white">
          {count > 99 ? '99+' : count}
        </span>
      ) : null}
    </>
  )

  const className =
    'relative grid h-10 w-10 place-items-center rounded-full text-ink-700 transition duration-200 hover:bg-ink-100 hover:text-ink-950'

  if (to) {
    return (
      <Link to={to} aria-label={label} title={label} className={className}>
        {content}
      </Link>
    )
  }

  return (
    <button type="button" onClick={onClick} aria-label={label} title={label} className={className}>
      {content}
    </button>
  )
}

function AnnouncementBar() {
  return (
    <div className="bg-ink-950 text-white">
      <div className="container-page flex h-10 items-center justify-between gap-4 text-[0.76rem]">
        <p className="flex items-center gap-2 truncate">
          <Icon name="truck" size={15} className="shrink-0 text-brand-400" />
          <span className="truncate">
            Free standard delivery on orders over <strong className="font-semibold">$60</strong>
          </span>
        </p>
        <div className="flex items-center gap-5">
          <span className="hidden items-center gap-2 sm:flex">
            <Icon name="percent" size={15} className="text-brand-400" />
            Use code <strong className="font-semibold text-brand-300">ASFIT10</strong> for 10% off
          </span>
          <a
            href={`tel:${site.phone.replace(/[^+\d]/g, '')}`}
            className="hidden items-center gap-1.5 transition hover:text-brand-300 lg:flex"
          >
            <Icon name="phone" size={14} />
            {site.phone}
          </a>
        </div>
      </div>
    </div>
  )
}

/** Horizontal desktop navigation, including the categories mega-menu. */
function DesktopNav() {
  return (
    <nav aria-label="Main" className="hidden lg:block">
      <ul className="flex items-center gap-0.5">
        {navLinks.map((link) => (
          <li
            key={link.to}
            className={link.label === 'Categories' ? 'group static' : 'relative'}
          >
            <NavLink to={link.to} className={navLinkClass} end={link.to === '/'}>
              {link.label}
              {link.label === 'Categories' ? (
                <Icon
                  name="chevronDown"
                  size={14}
                  className="transition duration-300 group-hover:rotate-180"
                />
              ) : null}
            </NavLink>

            {link.label === 'Categories' ? (
              <div className="invisible absolute inset-x-0 top-full z-40 pt-3 opacity-0 transition duration-200 group-hover:visible group-hover:opacity-100">
                <div className="mx-auto grid max-w-3xl grid-cols-2 gap-1 rounded-2xl border border-ink-100 bg-white p-3 shadow-card-hover">
                  {categories.map((category) => (
                    <Link
                      key={category.slug}
                      to={`/shop?category=${category.slug}`}
                      className="flex items-start gap-3 rounded-xl p-2.5 transition hover:bg-ink-50"
                    >
                      <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700">
                        <Icon name={category.icon} size={17} />
                      </span>
                      <span>
                        <span className="block text-[0.88rem] font-semibold text-ink-900">
                          {category.name}
                        </span>
                        <span className="block text-[0.75rem] text-ink-500">{category.tagline}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </nav>
  )
}

/** Slide-over navigation used below the `lg` breakpoint. */
function MobileDrawer({ open, onClose }) {
  const { wishlistCount, cartCount } = useShop()
  const [query, setQuery] = useState('')
  const [categoriesOpen, setCategoriesOpen] = useState(false)
  const navigate = useNavigate()

  useBodyScrollLock(open)

  if (!open) return null

  const submitSearch = (event) => {
    event.preventDefault()
    const trimmed = query.trim()
    onClose()
    navigate(trimmed ? `/shop?q=${encodeURIComponent(trimmed)}` : '/shop')
  }

  return (
    <div className="fixed inset-0 z-[65] lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 bg-ink-950/55 backdrop-blur-sm animate-fade-in"
      />

      <div className="absolute inset-y-0 right-0 flex w-[min(21rem,88vw)] flex-col bg-white shadow-2xl animate-slide-in-right">
        <div className="flex items-center justify-between border-b border-ink-100 px-4 py-3.5">
          <Link to="/" onClick={onClose} className="flex items-center gap-2.5">
            <LogoMark className="h-8 w-8" />
            <span className="font-display text-[0.98rem] font-extrabold tracking-tight text-ink-950">
              AS STORE
            </span>
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="grid h-9 w-9 place-items-center rounded-full text-ink-600 transition hover:bg-ink-100"
          >
            <Icon name="close" size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          <form onSubmit={submitSearch} className="mb-4">
            <SearchBar
              value={query}
              onChange={setQuery}
              onSubmit={() => {}}
              showSuggestions={false}
              placeholder="Search products…"
            />
          </form>

          <nav aria-label="Mobile">
            <ul className="space-y-0.5">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center justify-between rounded-xl px-3 py-2.5 text-[0.95rem] font-semibold transition ${
                        isActive ? 'bg-brand-50 text-brand-700' : 'text-ink-700 hover:bg-ink-100'
                      }`
                    }
                  >
                    {link.label}
                    <Icon name="chevronRight" size={15} className="text-ink-300" />
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-4 border-t border-ink-100 pt-4">
            <button
              type="button"
              onClick={() => setCategoriesOpen((current) => !current)}
              aria-expanded={categoriesOpen}
              className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-[0.95rem] font-semibold text-ink-700 transition hover:bg-ink-100"
            >
              Shop by Category
              <Icon
                name="chevronDown"
                size={16}
                className={`text-ink-400 transition duration-300 ${categoriesOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {categoriesOpen ? (
              <ul className="mt-1 space-y-0.5 pl-1">
                {categories.map((category) => (
                  <li key={category.slug}>
                    <Link
                      to={`/shop?category=${category.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-3 rounded-xl px-3 py-2 transition hover:bg-ink-50"
                    >
                      <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-50 text-brand-700">
                        <Icon name={category.icon} size={15} />
                      </span>
                      <span className="text-[0.86rem] font-medium text-ink-700">{category.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className="mt-4 border-t border-ink-100 pt-4">
            <ul className="space-y-0.5">
              <li>
                <Link
                  to="/wishlist"
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[0.9rem] font-semibold text-ink-700 transition hover:bg-ink-100"
                >
                  <Icon name="heart" size={18} className="text-ink-400" />
                  Wishlist
                  {wishlistCount > 0 ? (
                    <span className="ml-auto rounded-full bg-ink-100 px-2 py-0.5 text-[0.68rem] font-bold text-ink-700">
                      {wishlistCount}
                    </span>
                  ) : null}
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[0.9rem] font-semibold text-ink-700 transition hover:bg-ink-100"
                >
                  <Icon name="cart" size={18} className="text-ink-400" />
                  Cart
                  {cartCount > 0 ? (
                    <span className="ml-auto rounded-full bg-ink-100 px-2 py-0.5 text-[0.68rem] font-bold text-ink-700">
                      {cartCount}
                    </span>
                  ) : null}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-ink-100 p-4">
          <Button to="/login" onClick={onClose} fullWidth iconLeft={<Icon name="user" size={17} />}>
            Login / Sign Up
          </Button>
          <p className="mt-3 text-center text-[0.78rem] text-ink-500">
            Need help?{' '}
            <a
              href={`tel:${site.phone.replace(/[^+\d]/g, '')}`}
              className="font-semibold text-brand-700"
            >
              {site.phone}
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

/**
 * Sticky storefront header: announcement bar, brand, desktop navigation with
 * a categories mega-menu, search, wishlist / cart / account shortcuts and the
 * mobile drawer.
 */
export function Navbar() {
  const { cartCount, wishlistCount, openCart, mobileNavOpen, openMobileNav, closeMobileNav } =
    useShop()
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  // Close transient UI whenever the route changes.
  useEffect(() => {
    closeMobileNav()
    setSearchOpen(false)
  }, [location.pathname, location.search, closeMobileNav])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useBodyScrollLock(searchOpen)
  useEscapeKey(
    useCallback(() => {
      closeMobileNav()
      setSearchOpen(false)
    }, [closeMobileNav]),
  )

  const submitSearch = (value) => {
    setSearchOpen(false)
    navigate(value ? `/shop?q=${encodeURIComponent(value)}` : '/shop')
  }

  return (
    <header className="sticky top-0 z-50">
      <AnnouncementBar />

      <div
        className={`border-b bg-white/90 backdrop-blur-md transition duration-300 ${
          scrolled
            ? 'border-ink-200 shadow-[0_10px_30px_-22px_rgba(10,13,17,0.5)]'
            : 'border-ink-100'
        }`}
      >
        <div className="container-page flex h-16 items-center gap-3 lg:h-[4.4rem]">
          <button
            type="button"
            onClick={openMobileNav}
            aria-label="Open menu"
            className="grid h-10 w-10 place-items-center rounded-full text-ink-800 transition hover:bg-ink-100 lg:hidden"
          >
            <Icon name="menu" size={22} />
          </button>

          <Link to="/" className="flex shrink-0 items-center gap-2.5" aria-label="AS Store home">
            <LogoMark className="h-9 w-9 lg:h-10 lg:w-10" />
            <span className="flex flex-col leading-none">
              <span className="font-display text-[1.02rem] font-extrabold tracking-tight text-ink-950 lg:text-[1.12rem]">
                AS STORE
              </span>
              <span className="mt-0.5 text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-brand-600">
                Fuel your performance
              </span>
            </span>
          </Link>

          <div className="mx-auto hidden lg:block">
            <DesktopNav />
          </div>

          <div className="ml-auto flex items-center gap-0.5 lg:ml-0">
            <IconButton
              name="search"
              label="Search products"
              onClick={() => setSearchOpen((current) => !current)}
            />
            <IconButton name="heart" label="Wishlist" to="/wishlist" count={wishlistCount} />
            <IconButton name="cart" label="Open cart" onClick={openCart} count={cartCount} />
            <IconButton name="user" label="Account" to="/login" />
            <Button to="/shop" size="sm" className="ml-2 hidden xl:inline-flex">
              Shop All
            </Button>
          </div>
        </div>

        {searchOpen ? (
          <div className="hidden border-t border-ink-100 bg-white/95 py-3 lg:block">
            <div className="container-page max-w-2xl">
              <SearchBar value={query} onChange={setQuery} onSubmit={submitSearch} autoFocus />
            </div>
          </div>
        ) : null}
      </div>

      <div className="border-b border-ink-100 bg-white px-4 py-2.5 lg:hidden">
        <SearchBar
          value={query}
          onChange={setQuery}
          onSubmit={submitSearch}
          placeholder="Search protein, creatine, shakers…"
        />
      </div>

      <MobileDrawer open={mobileNavOpen} onClose={closeMobileNav} />
    </header>
  )
}

export default Navbar


