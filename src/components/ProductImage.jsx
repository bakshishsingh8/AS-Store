import { useState } from 'react'
import ProductArt from './ProductArt'

/**
 * Renders a product's visual.
 *
 * By default every product is drawn with <ProductArt /> (inline SVG, no
 * network request). If a product ever gets `image.src` — a real photograph —
 * that is used instead, and ProductArt quietly takes over again if the photo
 * fails to load. So swapping in photography later is a one-field change in
 * the catalogue.
 */
export function ProductImage({
  image,
  variant = 'studio',
  dark = false,
  className = '',
  title,
  eager = false,
}) {
  const [failed, setFailed] = useState(false)
  const src = image?.src
  const alt = image?.alt || title || ''

  if (src && !failed) {
    return (
      <img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onError={() => setFailed(true)}
        className={className}
      />
    )
  }

  return (
    <ProductArt
      shape={image?.shape}
      tone={image?.tone}
      short={image?.short}
      sub={image?.sub}
      variant={image?.variant ?? variant}
      dark={dark}
      className={className}
      title={title}
    />
  )
}

export default ProductImage
