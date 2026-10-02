import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useShop } from '../context/ShopContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

import Button from '../components/Button'
import { Icon } from '../components/Icons'

const EMPTY = { name: '', email: '', password: '', confirm: '', terms: false }

/** Mock registration page — everything stays in the browser. */
export function Signup() {
  const navigate = useNavigate()
  const { pushToast } = useShop()
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)

  useDocumentTitle('Create Account')

  const update = (key) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    setForm((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const next = {}
    if (!form.name.trim()) next.name = 'Please tell us your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email address.'
    if (form.password.length < 8) next.password = 'Use at least 8 characters.'
    if (form.confirm !== form.password) next.confirm = 'Passwords do not match.'
    if (!form.terms) next.terms = 'Please accept the terms to continue.'

    setErrors(next)
    if (Object.keys(next).length) return

    setForm(EMPTY)
    pushToast('Account created — welcome to AS Store.')
    navigate('/')
  }

  return (
    <div className="bg-white">
      <div className="container-page grid gap-10 py-12 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-20">
        <div className="mx-auto w-full max-w-md">
          <span className="inline-flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-brand-600">
            <span className="h-px w-6 bg-brand-500/60" />
            Join AS Store
          </span>
          <h1 className="mt-4 text-3xl font-extrabold text-ink-900">Create your account</h1>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-500">
            One minute to set up, and your cart, wishlist and orders all stick around.
          </p>

          <form onSubmit={handleSubmit} noValidate className="mt-8">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-[0.76rem] font-bold uppercase tracking-[0.12em] text-ink-500"
              >
                Full name
              </label>
              <input
                id="name"
                value={form.name}
                onChange={update('name')}
                className={`field ${errors.name ? 'border-rose-400' : ''}`}
                placeholder="Jordan Blake"
              />
              {errors.name ? (
                <p className="mt-1.5 text-[0.78rem] text-rose-600">{errors.name}</p>
              ) : null}
            </div>

            <div className="mt-5">
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
                  placeholder="At least 8 characters"
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

            <div className="mt-5">
              <label
                htmlFor="confirm"
                className="mb-2 block text-[0.76rem] font-bold uppercase tracking-[0.12em] text-ink-500"
              >
                Confirm password
              </label>
              <input
                id="confirm"
                type={showPassword ? 'text' : 'password'}
                value={form.confirm}
                onChange={update('confirm')}
                className={`field ${errors.confirm ? 'border-rose-400' : ''}`}
                placeholder="Type it again"
              />
              {errors.confirm ? (
                <p className="mt-1.5 text-[0.78rem] text-rose-600">{errors.confirm}</p>
              ) : null}
            </div>

            <label className="mt-5 flex cursor-pointer items-start gap-3 text-[0.85rem] leading-relaxed text-ink-600">
              <input
                type="checkbox"
                checked={form.terms}
                onChange={update('terms')}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-ink-300 accent-brand-600"
              />
              I agree to the terms of service and the privacy policy, and I understand this is a
              demo storefront.
            </label>
            {errors.terms ? (
              <p className="mt-1.5 text-[0.78rem] text-rose-600">{errors.terms}</p>
            ) : null}

            <Button type="submit" fullWidth size="lg" className="mt-7">
              Create account
            </Button>
          </form>

          <p className="mt-6 text-center text-[0.9rem] text-ink-500">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-brand-700 hover:text-brand-800">
              Sign in
            </Link>
          </p>
        </div>

        {/* What you get */}
        <aside className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-brand-700 to-brand-900 p-8 text-white sm:p-10 lg:p-12">
          <div
            className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative">
            <span className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-white/70">
              Why join
            </span>
            <h2 className="mt-3 font-display text-2xl font-extrabold sm:text-3xl">
              More than a checkout.
            </h2>

            <ul className="mt-8 space-y-5">
              {[
                { icon: 'truck', title: 'Track your deliveries', copy: 'Live status from dispatch to doorstep.' },
                { icon: 'heart', title: 'Synced wishlist', copy: 'Saved products follow you across devices.' },
                { icon: 'gift', title: 'Subscriber discounts', copy: 'Codes and bundles before anyone else sees them.' },
                { icon: 'support', title: 'Talk to a coach', copy: 'Ask product questions straight from your account.' },
              ].map((item) => (
                <li key={item.title} className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/15">
                    <Icon name={item.icon} size={20} />
                  </span>
                  <span>
                    <span className="block text-[0.95rem] font-bold text-white">{item.title}</span>
                    <span className="mt-1 block text-[0.86rem] text-white/70">{item.copy}</span>
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-9 flex items-center gap-3 border-t border-white/20 pt-6 text-[0.85rem] text-white/75">
              <Icon name="shield" size={16} />
              We never sell your data. Unsubscribe from marketing in one click.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default Signup
