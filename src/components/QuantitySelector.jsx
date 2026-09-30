import { Icon } from './Icons'

/**
 * Quantity stepper used in the cart, the mini cart and on the product page.
 * Buttons are 40px tall so they stay comfortably tappable on mobile.
 */
export function QuantitySelector({
  value = 1,
  onChange,
  min = 1,
  max = 99,
  size = 'md',
  className = '',
  label = 'Quantity',
}) {
  const small = size === 'sm'
  const button = small ? 'h-8 w-8' : 'h-10 w-10'
  const iconSize = small ? 14 : 16

  return (
    <div
      className={`inline-flex items-center rounded-full border border-ink-200 bg-white ${className}`}
      role="group"
      aria-label={label}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className={`grid ${button} place-items-center rounded-full text-ink-600 transition hover:bg-ink-100 hover:text-ink-900 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent`}
      >
        <Icon name="minus" size={iconSize} />
      </button>

      <span
        className={`text-center font-display font-bold text-ink-900 ${small ? 'w-8 text-sm' : 'w-10'}`}
        aria-live="polite"
      >
        {value}
      </span>

      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Increase quantity"
        className={`grid ${button} place-items-center rounded-full text-ink-600 transition hover:bg-ink-100 hover:text-ink-900 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent`}
      >
        <Icon name="plus" size={iconSize} />
      </button>
    </div>
  )
}

export default QuantitySelector
