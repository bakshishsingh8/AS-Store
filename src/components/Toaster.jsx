import { Icon } from './Icons'
import { useShop } from '../context/ShopContext'

const TONES = {
  success: { icon: 'checkCircle', accent: 'text-brand-600', bar: 'bg-brand-500' },
  info: { icon: 'info', accent: 'text-ink-500', bar: 'bg-ink-400' },
  error: { icon: 'info', accent: 'text-rose-600', bar: 'bg-rose-500' },
}

/** Bottom-right stack of transient confirmations (added to cart, saved, ...). */
export function Toaster() {
  const { toasts, dismissToast } = useShop()

  if (!toasts.length) return null

  return (
    <div
      className="pointer-events-none fixed inset-x-4 bottom-4 z-[70] flex flex-col items-stretch gap-2 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[22rem]"
      aria-live="polite"
      aria-atomic="false"
    >
      {toasts.map((toast) => {
        const tone = TONES[toast.tone] ?? TONES.success

        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-start gap-3 overflow-hidden rounded-xl border border-ink-100 bg-white p-3.5 pl-4 shadow-card-hover animate-fade-up"
          >
            <Icon name={tone.icon} size={19} className={`mt-0.5 shrink-0 ${tone.accent}`} />
            <p className="flex-1 text-[0.85rem] leading-snug font-medium text-ink-800">
              {toast.message}
            </p>
            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              aria-label="Dismiss notification"
              className="shrink-0 rounded-full p-1 text-ink-400 transition hover:bg-ink-100 hover:text-ink-700"
            >
              <Icon name="close" size={14} />
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default Toaster
