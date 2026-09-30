import { Link } from 'react-router-dom'
import { Icon } from './Icons'

/** Friendly placeholder for empty grids, empty carts and 404s. */
export function EmptyState({
  icon = 'sparkle',
  title,
  description,
  actionLabel,
  actionTo,
  onAction,
  className = '',
}) {
  return (
    <div
      className={`flex flex-col items-center rounded-2xl border border-dashed border-ink-200 bg-ink-50/60 px-6 py-14 text-center ${className}`}
    >
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-brand-600 shadow-card">
        <Icon name={icon} size={26} />
      </span>
      <h3 className="mt-4 font-display text-lg font-bold text-ink-900">{title}</h3>
      {description ? <p className="mt-1.5 max-w-md text-sm text-ink-500">{description}</p> : null}

      {actionLabel ? (
        actionTo ? (
          <Link
            to={actionTo}
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-brand-600 px-6 text-[0.95rem] font-semibold text-white transition hover:bg-brand-700"
          >
            {actionLabel}
            <Icon name="arrowRight" size={16} />
          </Link>
        ) : (
          <button
            type="button"
            onClick={onAction}
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-brand-600 px-6 text-[0.95rem] font-semibold text-white transition hover:bg-brand-700"
          >
            {actionLabel}
          </button>
        )
      ) : null}
    </div>
  )
}

export default EmptyState
