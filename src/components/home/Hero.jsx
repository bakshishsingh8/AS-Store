import { Link } from 'react-router-dom'
import { getProduct } from '../../data/products'
import { storeStats } from '../../data/testimonials'
import { Icon } from '../Icons'
import Button from '../Button'
import ProductImage from '../ProductImage'
import { DiscountBadge, ProductBadge } from '../ProductBadge'
import { formatPrice } from '../../utils/format'

const TRUST_POINTS = [
  { icon: 'verified', label: '100% genuine' },
  { icon: 'truck', label: 'Free delivery over $60' },
  { icon: 'refresh', label: '30-day returns' },
]

/**
 * Above-the-fold marketing block: headline, dual CTA and a layered
 * composition built from real catalogue products.
 */
export function Hero() {
  const flagship = getProduct('p-gold-whey')
  const creatine = getProduct('p-creatine-mono')
  const shaker = getProduct('p-steel-shaker')

  return (
    <section className="relative overflow-hidden bg-ink-950 text-white">
      <div className="absolute inset-0 grid-floor opacity-[0.35]" aria-hidden="true" />
      <div
        className="absolute -left-40 top-[-10rem] h-[34rem] w-[34rem] rounded-full bg-brand-600/25 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="absolute -right-32 bottom-[-14rem] h-[30rem] w-[30rem] rounded-full bg-brand-400/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative container-page grid gap-14 py-14 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16 lg:py-20">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 text-[0.72rem] font-semibold tracking-wide text-brand-300">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-brand-400 animate-pulse-ring" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-400" />
            </span>
            Trusted by 48,000+ athletes
          </span>

          <h1 className="mt-6 text-4xl leading-[1.06] font-extrabold tracking-tight text-white sm:text-5xl lg:text-[3.55rem]">
            Fuel Your Performance.
            <span className="block text-brand-400">Build Your Best Body.</span>
          </h1>

          <p className="mt-6 max-w-xl text-[1.02rem] leading-relaxed text-white/65">
            Lab-tested protein, creatine, pre-workout and gym gear — sourced from certified
            manufacturers and priced without the middleman markup. Everything you need to train
            harder and recover faster.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              to="/shop"
              size="lg"
              iconRight={<Icon name="arrowRight" size={18} />}
              className="shadow-brand"
            >
              Shop Now
            </Button>
            <Button to="/categories" size="lg" variant="outlineLight">
              Explore Products
            </Button>
          </div>

          <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            {TRUST_POINTS.map((point) => (
              <li key={point.label} className="flex items-center gap-2 text-[0.84rem] text-white/60">
                <Icon name={point.icon} size={16} className="text-brand-400" />
                {point.label}
              </li>
            ))}
          </ul>

          <dl className="mt-10 grid max-w-lg grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4 sm:gap-4">
            {storeStats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-white/40">
                  {stat.label}
                </dt>
                <dd className="mt-1 font-display text-lg font-extrabold text-white">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Product composition */}
        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div
            className="absolute -inset-8 rounded-[3rem] bg-brand-500/15 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative rounded-4xl border border-white/10 bg-white/[0.06] p-3 backdrop-blur-sm sm:p-4">
            <div className="relative overflow-hidden rounded-3xl bg-white">
              <ProductImage
                image={flagship.image}
                title={flagship.name}
                eager
                className="h-full w-full"
              />
              <div className="absolute left-4 top-4 flex flex-col items-start gap-2">
                <ProductBadge label={flagship.badge} />
                <DiscountBadge percent={flagship.discount} />
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 px-1 pt-4 pb-1">
              <div className="min-w-0">
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-white/45">
                  {flagship.brand}
                </p>
                <p className="truncate font-display text-[0.95rem] font-bold text-white">
                  {flagship.name}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="font-display text-xl font-extrabold text-brand-300">
                  {formatPrice(flagship.price)}
                </p>
                <p className="text-[0.72rem] text-white/40 line-through">
                  {formatPrice(flagship.originalPrice)}
                </p>
              </div>
            </div>
          </div>

          <Link
            to={`/product/${creatine.id}`}
            className="absolute -bottom-6 -left-4 hidden w-36 rounded-2xl border border-white/12 bg-ink-900/95 p-3 shadow-2xl backdrop-blur transition duration-300 hover:-translate-y-1 sm:block lg:-left-10"
          >
            <div className="overflow-hidden rounded-xl bg-white">
              <ProductImage image={creatine.image} className="h-full w-full" />
            </div>
            <p className="mt-2 truncate text-[0.72rem] font-semibold text-white/80">
              {creatine.brand}
            </p>
            <p className="text-[0.72rem] font-bold text-brand-300">{formatPrice(creatine.price)}</p>
          </Link>

          <Link
            to={`/product/${shaker.id}`}
            className="absolute -top-4 right-2 hidden w-32 animate-float rounded-2xl border border-white/12 bg-ink-900/95 p-3 shadow-2xl backdrop-blur transition duration-300 hover:-translate-y-1 sm:block lg:-right-6"
          >
            <div className="overflow-hidden rounded-xl bg-white">
              <ProductImage image={shaker.image} className="h-full w-full" />
            </div>
            <p className="mt-2 truncate text-[0.72rem] font-semibold text-white/80">
              {shaker.brand}
            </p>
            <p className="text-[0.72rem] font-bold text-brand-300">{formatPrice(shaker.price)}</p>
          </Link>

          <div className="absolute -bottom-4 right-4 rounded-2xl bg-brand-500 px-4 py-3 text-ink-950 shadow-brand sm:right-8">
            <p className="font-display text-2xl leading-none font-extrabold">30%</p>
            <p className="text-[0.64rem] font-bold uppercase tracking-[0.1em]">Off selected</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
