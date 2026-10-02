import { Link } from 'react-router-dom'
import { getProduct } from '../../data/products'
import ProductImage from '../ProductImage'
import Button from '../Button'
import Reveal from '../Reveal'
import { Icon } from '../Icons'

const PILLARS = [
  {
    icon: 'dumbbell',
    title: 'Train',
    copy: 'Progressive overload, week after week. Gear that keeps up.',
  },
  {
    icon: 'bolt',
    title: 'Fuel',
    copy: 'Protein, creatine and pre-workout dosed at levels that matter.',
  },
  {
    icon: 'refresh',
    title: 'Recover',
    copy: 'Sleep, aminos and hydration — the half of the equation most people skip.',
  },
]

const TILES = ['p-kettlebell', 'p-hydro-iso', 'p-dumbbell-set', 'p-protein-bar']

/**
 * Editorial band that ties the brand to the training lifestyle, using the
 * same pack artwork as the catalogue for a consistent identity.
 */
export function LifestyleSection() {
  const tiles = TILES.map((id) => getProduct(id)).filter(Boolean)

  return (
    <section className="relative overflow-hidden bg-ink-950 py-16 text-white lg:py-24">
      <div className="absolute inset-0 grid-floor opacity-20" aria-hidden="true" />
      <div
        className="absolute right-[-10rem] top-[-6rem] h-[28rem] w-[28rem] rounded-full bg-brand-500/20 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative container-page grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16">
        <div>
          <span className="inline-flex items-center text-[0.7rem] font-bold uppercase tracking-[0.18em] text-brand-400">
            More than a shop
          </span>

          <h2 className="mt-4 text-3xl leading-[1.1] font-extrabold text-white sm:text-4xl lg:text-[2.9rem]">
            Build Strength.
            <span className="block text-brand-400">Fuel Performance.</span>
            <span className="block">Become Better.</span>
          </h2>

          <p className="mt-5 max-w-xl text-[1rem] leading-relaxed text-white/65">
            The gym does not care about shortcuts. Neither do we. AS Store exists to put properly
            dosed, honestly labelled supplements and dependable equipment in the hands of people who
            show up — week after week, set after set.
          </p>

          <ul className="mt-9 space-y-4">
            {PILLARS.map((pillar) => (
              <li key={pillar.title} className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5 text-brand-400">
                  <Icon name={pillar.icon} size={20} />
                </span>
                <span>
                  <span className="block font-display text-[1rem] font-bold text-white">
                    {pillar.title}
                  </span>
                  <span className="mt-0.5 block text-[0.88rem] leading-relaxed text-white/60">
                    {pillar.copy}
                  </span>
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button to="/shop" size="lg" iconRight={<Icon name="arrowRight" size={18} />}>
              Shop All Products
            </Button>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-[0.92rem] font-semibold text-white/70 transition hover:text-white"
            >
              Read our story
              <Icon name="chevronRight" size={15} />
            </Link>
          </div>
        </div>

        <Reveal className="grid grid-cols-2 gap-4">
          {tiles.map((product, index) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className={`group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-3 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-white/25 ${
                index % 2 === 1 ? 'sm:translate-y-6' : ''
              }`}
            >
              <div className="overflow-hidden rounded-2xl bg-white">
                <ProductImage
                  image={product.image}
                  title={product.name}
                  className="h-full w-full transition duration-500 group-hover:scale-105"
                />
              </div>
              <p className="mt-3 truncate text-[0.7rem] font-bold uppercase tracking-[0.12em] text-white/45">
                {product.brand}
              </p>
              <p className="mt-0.5 line-clamp-2 font-display text-[0.84rem] leading-snug font-bold text-white">
                {product.name}
              </p>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

export default LifestyleSection
