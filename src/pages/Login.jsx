import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useShop } from '../context/ShopContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

import Button from '../components/Button'
import { Icon } from '../components/Icons'

const PERKS = [
  { icon: 'truck', title: 'Track every order', copy: 'Live delivery status and reorder in two taps.' },
  { icon: 'heart', title: 'Save for later', copy: 'Wishlists and carts that follow you between devices.' },
  { icon: 'gift', title: 'Member-only deals', copy: 'Early access to restocks and subscriber bundles.' },
]

const EMPTY = { email: '', password: '', remember: true }

/** Mock sign-in page — no backend, the form simply returns you to the shop. */
export function Login() {
  const navigate = useNavigate()
  const { pushToast } = useShop()
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)

  useDocumentTitle('Sign In')

  const update = (key) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    setForm((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const next = {}
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email address.'
    if (form.password.length < 6) next.password = 'Passwords are at least 6 characters.'

    setErrors(next)
    if (Object.keys(next).length) return

    pushToast('Welcome back — you are signed in.')
    navigate('/')
  }

  return (
    <div className="bg-white">
      <div className="container-page grid gap-10 py-12 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-20">
        {/* Form */}
        <div className="mx-auto w-full max-w-md">
          <span className="inline-flex items-center text-[0.7rem] font-bold uppercase tracking-[0.18em] text-brand-600">
            Account
          </span>
          <h1 className="mt-4 text-3xl font-extrabold text-ink-900">Welcome back</h1>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-500">
            Sign in to see your orders, saved items and personalised recommendations.
          </p>

          <form onSubmit={handleSubmit} noValidate className="mt-8">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-[0.76rem] font-bold uppercase tracking-[0.12em] text-ink-500"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={update('email')}
                className={`field ${errors.email ? 'border-rose-400' : ''}`}
                placeholder="you@example.com"
              />
              {errors.email ? (
                <p className="mt-1.5 text-[0.78rem] text-rose-600">{errors.email}</p>
              ) : null}
            </div>

            <div className="mt-5">
              <label
                htmlFor="password"
                className="mb-2 block text-[0.76rem] font-bold uppercase tracking-[0.12em] text-ink-500"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={update('password')}
                  className={`field pr-12 ${errors.password ? 'border-rose-400' : ''}`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute inset-y-0 right-0 grid w-11 place-items-center text-ink-400 transition hover:text-ink-700"
                >
                  <Icon name="eye" size={17} />
                </button>
              </div>
              {errors.password ? (
                <p className="mt-1.5 text-[0.78rem] text-rose-600">{errors.password}</p>
              ) : null}
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <label className="flex cursor-pointer items-center gap-2 text-[0.85rem] text-ink-600">
                <input
                  type="checkbox"
                  checked={form.remember}
                  onChange={update('remember')}
                  className="h-4 w-4 rounded border-ink-300 text-brand-600 accent-brand-600"
                />
                Keep me signed in
              </label>
              <button
                type="button"
                onClick={() => pushToast('Reset link sent (demo only).', 'info')}
                className="text-[0.85rem] font-semibold text-brand-700 transition hover:text-brand-800"
              >
                Forgot password?
              </button>
            </div>

            <Button type="submit" fullWidth size="lg" className="mt-7">
              Sign in
            </Button>
          </form>

          <p className="mt-6 text-center text-[0.9rem] text-ink-500">
            New to AS Store?{' '}
            <Link to="/signup" className="font-semibold text-brand-700 hover:text-brand-800">
              Create an account
            </Link>
          </p>
        </div>

        {/* Perks panel */}
        <aside className="relative overflow-hidden rounded-4xl bg-ink-950 p-8 text-white sm:p-10 lg:p-12">
          <div
            className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-500/20 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative">
            <span className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-brand-300">
              Member benefits
            </span>
            <h2 className="mt-3 font-display text-2xl font-extrabold sm:text-3xl">
              Your training, remembered.
            </h2>
            <p className="mt-3 max-w-md text-[0.94rem] leading-relaxed text-white/65">
              An account keeps your cart, wishlist and order history in one place, so restocking
              your usual stack takes seconds.
            </p>

            <ul className="mt-8 space-y-5">
              {PERKS.map((perk) => (
                <li key={perk.title} className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-brand-300">
                    <Icon name={perk.icon} size={20} />
                  </span>
                  <span>
                    <span className="block text-[0.95rem] font-bold text-white">{perk.title}</span>
                    <span className="mt-1 block text-[0.86rem] leading-relaxed text-white/60">
                      {perk.copy}
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-9 flex items-center gap-3 border-t border-white/10 pt-6 text-[0.85rem] text-white/55">
              <Icon name="lock" size={16} className="text-brand-300" />
              Demo storefront — no real accounts or payments are created.
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default Login
