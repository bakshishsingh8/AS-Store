import { useEffect, useState } from 'react'
import { getProduct } from '../../data/products'
import ProductImage from '../ProductImage'
import Button from '../Button'
import Reveal from '../Reveal'
import { Icon } from '../Icons'
import { formatPrice } from '../../utils/format'

/** Live countdown so the "limited time" offer feels genuine. */
function useCountdown(hoursFromNow = 71) {
  const [target] = useState(() => Date.now() + hoursFromNow * 3600 * 1000)
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const diff = Math.max(target - now, 0)

  return [
    { label: 'Days', value: Math.floor(diff / 86400000) },
    { label: 'Hours', value: Math.floor((diff % 86400000) / 3600000) },
    { label: 'Mins', value: Math.floor((diff % 3600000) / 60000) },
    { label: 'Secs', value: Math.floor((diff % 60000) / 1000) },
  ]
}

const PAD = (value) => String(value).padStart(2, '0')

/** Full-width promotional band with a live countdown and a code to copy. */
export function PromoBanner() {
  const countdown = useCountdown()
  const deal = getProduct('p-mass-5000')
  const partner = getProduct('p-multivitamin')

  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-4xl bg-ink-950 text-white">
            <div className="absolute inset-0 grid-floor opacity-25" aria-hidden="true" />
            <div
              className="absolute -left-24 top-1/2 h-[26rem] w-[26rem] -translate-y-1/2 rounded-full bg-brand-600/30 blur-[110px]"
              aria-hidden="true"
            />

            <div className="relative grid gap-10 p-8 sm:p-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-14 lg:p-14">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-400/10 px-3.5 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-brand-300">
                  <Icon name="bolt" size={14} />
                  Limited time offer
                </span>

                <h2 className="mt-5 text-3xl leading-tight font-extrabold text-white sm:text-4xl lg:text-[2.7rem]">
                  Fuel Your Performance
                </h2>
                <p className="mt-4 max-w-lg text-[0.98rem] leading-relaxed text-white/65">
                  Up to <strong className="font-semibold text-brand-300">30% off</strong> selected
                  supplements and gym gear. Stock your shelf for the whole training block and pay
                  less per serving.
                </p>

                <div className="mt-7 flex flex-wrap items-end gap-3">
                  {countdown.map((unit) => (
                    <div
                      key={unit.label}
                      className="min-w-[3.75rem] rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-center"
                    >
                      <p className="font-display text-xl font-extrabold text-white tabular-nums">
                        {PAD(unit.value)}
                      </p>
                      <p className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-white/45">
                        {unit.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button to="/offers" size="lg" iconRight={<Icon name="arrowRight" size={18} />}>
                    Shop the Sale
                  </Button>
                  <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-brand-400/40 bg-brand-400/5 px-4 py-3 text-[0.85rem] font-semibold text-brand-300">
                    <Icon name="tag" size={16} />
                    Code: ASFIT10
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[deal, partner].map((product) => (
                  <div
                    key={product.id}
                    className="rounded-3xl border border-white/10 bg-white/[0.06] p-3 backdrop-blur-sm"
                  >
                    <div className="overflow-hidden rounded-2xl bg-white">
                      <ProductImage
                        image={product.image}
                        title={product.name}
                        className="h-full w-full"
                      />
                    </div>
                    <p className="mt-3 truncate text-[0.68rem] font-bold uppercase tracking-[0.12em] text-white/45">
                      {product.brand}
                    </p>
                    <p className="mt-0.5 line-clamp-2 font-display text-[0.85rem] leading-snug font-bold text-white">
                      {product.name}
                    </p>
                    <p className="mt-2 flex items-baseline gap-2">
                      <span className="font-display text-base font-extrabold text-brand-300">
                        {formatPrice(product.price)}
                      </span>
                      <span className="text-[0.72rem] text-white/35 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default PromoBanner
