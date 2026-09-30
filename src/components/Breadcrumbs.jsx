import { Link } from 'react-router-dom'
import { Icon } from './Icons'

/**
 * Breadcrumb trail. The last item is rendered as plain text (current page).
 *
 * @param {{ label: string, to?: string }[]} items
 */
export function Breadcrumbs({ items = [], tone = 'light', className = '' }) {
  const isDark = tone === 'dark'

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.8rem]">
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 ? (
                <Icon
                  name="chevronRight"
                  size={13}
                  className={isDark ? 'text-white/30' : 'text-ink-300'}
                />
              ) : null}

              {item.to && !isLast ? (
                <Link
                  to={item.to}
                  className={`transition ${
                    isDark ? 'text-white/60 hover:text-white' : 'text-ink-500 hover:text-ink-900'
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className={`font-semibold ${isDark ? 'text-white' : 'text-ink-900'}`}
                >
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
