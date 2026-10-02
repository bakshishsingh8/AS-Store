import { useEffect, useState } from 'react'

/** Tailwind-like breakpoint helper: useMediaQuery('(min-width: 1024px)') */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return false
    }
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined
    }
    const list = window.matchMedia(query)
    const onChange = (event) => setMatches(event.matches)
    setMatches(list.matches)
    list.addEventListener('change', onChange)
    return () => list.removeEventListener('change', onChange)
  }, [query])

  return matches
}

/** Prevents the page behind a drawer / modal from scrolling. */
export function useBodyScrollLock(locked) {
  useEffect(() => {
    if (!locked || typeof document === 'undefined') return undefined
    const { overflow, paddingRight } = document.body.style
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`
    return () => {
      document.body.style.overflow = overflow
      document.body.style.paddingRight = paddingRight
    }
  }, [locked])
}

/** Closes on Escape — used by drawers and modals. */
export function useEscapeKey(handler, active = true) {
  useEffect(() => {
    if (!active || typeof window === 'undefined') return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') handler(event)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [handler, active])
}

export default useMediaQuery
