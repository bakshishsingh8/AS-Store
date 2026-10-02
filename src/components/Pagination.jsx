import { Icon } from './Icons'

/** Builds 1 … 4 5 6 … 10 style page lists. */
function buildPageList(page, totalPages) {
  const pages = []
  const push = (value) => {
    if (!pages.includes(value)) pages.push(value)
  }

  push(1)
  if (page - 1 > 2) push('…left')
  for (let index = Math.max(2, page - 1); index <= Math.min(totalPages - 1, page + 1); index += 1) {
    push(index)
  }
  if (page + 1 < totalPages - 1) push('…right')
  if (totalPages > 1) push(totalPages)

  return pages
}

/** Numbered pagination with previous / next controls. */
export function Pagination({ page = 1, totalPages = 1, onChange, className = '' }) {
  if (totalPages <= 1) return null

  const base =
    'grid h-10 min-w-10 place-items-center rounded-full px-3 text-[0.88rem] font-semibold transition duration-200'

  return (
    <nav aria-label="Pagination" className={`flex flex-wrap items-center gap-2 ${className}`}>
      <button
        type="button"
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page <= 1}
        className={`${base} border border-ink-200 bg-white text-ink-700 hover:border-ink-900 hover:text-ink-900 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-ink-200 disabled:hover:text-ink-700`}
        aria-label="Previous page"
      >
        <Icon name="chevronLeft" size={16} />
      </button>

      {buildPageList(page, totalPages).map((entry) =>
        typeof entry === 'number' ? (
          <button
            key={entry}
            type="button"
            onClick={() => onChange(entry)}
            aria-current={entry === page ? 'page' : undefined}
            className={`${base} ${
              entry === page
                ? 'bg-ink-950 text-white'
                : 'border border-ink-200 bg-white text-ink-700 hover:border-ink-900 hover:text-ink-900'
            }`}
          >
            {entry}
          </button>
        ) : (
          <span key={entry} className="px-1 text-ink-400">
            …
          </span>
        ),
      )}

      <button
        type="button"
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page >= totalPages}
        className={`${base} border border-ink-200 bg-white text-ink-700 hover:border-ink-900 hover:text-ink-900 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-ink-200 disabled:hover:text-ink-700`}
        aria-label="Next page"
      >
        <Icon name="chevronRight" size={16} />
      </button>
    </nav>
  )
}

export default Pagination
