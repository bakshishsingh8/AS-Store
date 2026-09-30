import { useEffect, useState } from 'react'

/**
 * State that mirrors into localStorage so the cart / wishlist survive reloads.
 * Falls back to in-memory state when storage is unavailable (private mode, SSR).
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') return initialValue
    try {
      const raw = window.localStorage.getItem(key)
      return raw === null ? initialValue : JSON.parse(raw)
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* storage full or blocked — cart simply stays in memory */
    }
  }, [key, value])

  return [value, setValue]
}

export default useLocalStorage
