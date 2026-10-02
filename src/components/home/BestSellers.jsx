import { Link } from 'react-router-dom'
import { bestSellers } from '../../data/products'
import ProductImage from '../ProductImage'
import Rating from '../Rating'
import SectionTitle from '../SectionTitle'
import Reveal from '../Reveal'
import Button from '../Button'
import { Icon } from '../Icons'
import { useShop } from '../../context/ShopContext'
import { formatPrice } from '../../utils/format'

/**
 * Best sellers rail. Intentionally a different presentation from the standard
 * product grid (ranked, horizontal, scroll-snapping) so the page has rhythm.
 */
export function BestSellers() {
  const { addToCart } = useShop()
  const items = bestSellers.slice(0, 8)

  return (
    <section className="bg-ink-950 py-16 text-white lg:py-20">
      <div className="container-page">
        <Reveal>
          <SectionTitle
            tone="dark"
            eyebrow="Most loved"
            title="This month's best sellers"
            description="Ranked by what actually leaves our warehouse. If it is on this list, it works."
            action={
              <Button
                to="/shop?sort=popularity"
                variant="outlineLight"
                size="sm"
                iconRight={<Icon name="arrowRight" size={15} />}
              >
                View Ranking
              </Button>
            }
          />
        </Reveal>

        <div className="no-scrollbar -mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
          {items.map((product, index) => (
            <Reveal
              key={product.id}
              delay={index * 50}
              className="w-[17rem] shrink-0 snap-start sm:w-[18rem]"
            >
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-900 p-4 transition duration-300 hover:-translate-y-1 hover:border-white/20">
                <Link
                  to={`/product/${product.id}`}
                  className="mt-4 overflow-hidden rounded-xl bg-white"
                  aria-label={product.name}
                >
                  <ProductImage
                    image={product.image}
                    title={product.name}
                    className="h-full w-full transition duration-500 group-hover:scale-105"
                  />
                </Link>

                <p className="mt-4 text-[0.66rem] font-bold uppercase tracking-[0.14em] text-white/40">
                  {product.brand}
                </p>
                <h3 className="mt-1 line-clamp-2 font-display text-[0.92rem] leading-snug font-bold text-white">
                  <Link to={`/product/${product.id}`} className="transition hover:text-brand-300">
                    {product.name}
                  </Link>
                </h3>

                <Rating
                  value={product.rating}
                  reviews={product.reviews}
                  size={13}
                  className="mt-2"
                />

                <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                  <span className="font-display text-lg font-bold text-white">
                    {formatPrice(product.price)}
                  </span>
                  <Button
                    size="sm"
                    variant="amber"
                    onClick={() => addToCart(product.id, 1)}
                    iconLeft={<Icon name="plus" size={15} />}
                    aria-label={`Add ${product.name} to cart`}
                  >
                    Add
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BestSellers
