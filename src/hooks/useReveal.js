import { useEffect, useRef, useState } from 'react'

/**
 * Reveals an element the first time it scrolls into view by adding
 * `is-visible` (see `.reveal` in index.css). IntersectionObserver based, so it
 * costs nothing on scroll and degrades gracefully.
 */
export function useReveal({ threshold = 0.12, rootMargin = '0px 0px -60px 0px' } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    if (typeof IntersectionObserver === 'undefined') {
      node.classList.add('is-visible')
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold, rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return ref
}

/**
 * Counts up to `target` once the returned ref enters the viewport.
 * Used by the About page statistics.
 */
export function useCountUp(target, { duration = 1400 } = {}) {
  const ref = useRef(null)
  const [value, setValue] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      setValue(target)
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || started.current) return
          started.current = true

          const reduceMotion =
            typeof window.matchMedia === 'function' &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches

          if (reduceMotion) {
            setValue(target)
            return
          }

          const start = performance.now()
          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setValue(Math.round(target * eased))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        })
      },
      { threshold: 0.4 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [target, duration])

  return { ref, value }
}

export default useReveal
