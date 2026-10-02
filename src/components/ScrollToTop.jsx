import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Resets the scroll position on every navigation and honours `#anchor`
 * links so in-page links (e.g. /contact#faq) still work.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}

export default ScrollToTop
