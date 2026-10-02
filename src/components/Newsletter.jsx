import { useState } from 'react'
import { Icon } from './Icons'
import Button from './Button'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/**
 * Email capture. Frontend only — it validates and thanks the visitor, then
 * resets. Wire `onSubmit` to a real endpoint when the backend exists.
 */
export function Newsletter({ tone = 'light', className = '', buttonLabel = 'Subscribe' }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | error | done
  const [message, setMessage] = useState('')
  const isDark = tone === 'dark'

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmed = email.trim()

    if (!EMAIL_PATTERN.test(trimmed)) {
      setStatus('error')
      setMessage('Please enter a valid email address.')
      return
    }

    setStatus('done')
    setMessage('You are on the list. Watch your inbox for this week’s deals.')
    setEmail('')
  }

  if (status === 'done') {
    return (
      <div
        className={`flex items-start gap-3 rounded-2xl border p-4 ${
          isDark ? 'border-white/15 bg-white/5' : 'border-brand-200 bg-brand-50'
        } ${className}`}
        role="status"
      >
        <Icon
          name="checkCircle"
          size={20}
          className={`mt-0.5 shrink-0 ${isDark ? 'text-brand-300' : 'text-brand-600'}`}
        />
        <p className={`text-[0.88rem] leading-snug ${isDark ? 'text-white/80' : 'text-brand-800'}`}>
          {message}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={className} noValidate>
      <div className="flex flex-col gap-2.5 sm:flex-row">
        {/* <div className="relative flex-1">
          <Icon
            name="mail"
            size={17}
            className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 ${
              isDark ? 'text-white/45' : 'text-ink-400'
            }`}
          />
          <input
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)
              if (status === 'error') setStatus('idle')
            }}
            placeholder="Enter your email address"
            aria-label="Email address"
            aria-invalid={status === 'error'}
            className={`w-full rounded-full py-3 pl-11 pr-4 text-[0.92rem] transition focus:outline-none ${
              isDark
                ? 'border border-white/15 bg-white/5 text-white placeholder:text-white/45 hover:border-white/30 focus:border-brand-400 focus:ring-4 focus:ring-brand-400/20'
                : 'field'
            }`}
          />
        </div>

        <Button type="submit" size="md" className="shrink-0 sm:w-auto" variant={isDark ? 'amber' : 'primary'}>
          {buttonLabel}
        </Button> */}
      </div>

      {status === 'error' ? (
        <p className={`mt-2 text-[0.78rem] font-medium ${isDark ? 'text-amber-300' : 'text-rose-600'}`}>
          {message}
        </p>
      ) : (
        <p className={`mt-2 text-[0.78rem] ${isDark ? 'text-white/50' : 'text-ink-500'}`}>
          {/* No spam, ever. Unsubscribe with one click. */}
        </p>
      )}
    </form>
  )
}

export default Newsletter
