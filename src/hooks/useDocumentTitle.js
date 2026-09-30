import { useEffect } from 'react'

const BASE_TITLE = 'AS Store'

/** Keeps the document title in sync with the active route. */
export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${BASE_TITLE}` : `${BASE_TITLE} | Premium Sports Nutrition & Gym Gear`
  }, [title])
}

export default useDocumentTitle
