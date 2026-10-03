import Reveal from '../Reveal'
import Button from '../Button'
import ProductImage from '../ProductImage'
import { Icon } from '../Icons'
import { getProduct } from '../../data/products'
import { promoCodes } from '../../data/site'
import { formatPrice } from '../../utils/format'

const PERKS = [
  { icon: 'gift', label: '10% off your first order' },
  { icon: 'sparkle', label: 'Early access to restocks' },
  { icon: 'percent', label: 'Subscriber-only bundle deals' },
]

/** Newsletter capture band shown near the end of the home page. */
export function NewsletterBand() {
  const deal = getProduct('p-gold-whey')
  const welcome = promoCodes[0]

  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-4xl border border-ink-100 bg-ink-50/80 p-8 sm:p-10 lg:p-14">
            <div
              className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-500/10 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
              <div>
                <span className="inline-flex items-center text-[0.7rem] font-bold uppercase tracking-[0.18em] text-brand-600">
                  Newsletter
                </span>
                <h2 className="mt-3 text-2xl font-bold text-ink-900 sm:text-3xl lg:text-[2.15rem]">
                  Get Fitness Deals &amp; Updates
                </h2>
                <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-ink-500">
                  Join the list and we will send the deals worth knowing about — new arrivals,
                  restocks and the occasional subscriber-only discount.
                </p>

                <ul className="mt-6 space-y-3">
                  {PERKS.map((perk) => (
                    <li key={perk.label} className="flex items-center gap-3 text-[0.9rem] text-ink-700">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white text-brand-600 shadow-card">
                        <Icon name={perk.icon} size={16} />
                      </span>
                      {perk.label}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Promotional visual — welcome offer card (large screens only) */}
              <div className="relative mx-auto hidden w-full max-w-md lg:block lg:max-w-none">
                <div
                  className="absolute -inset-5 rounded-[2.5rem] bg-brand-500/15 blur-3xl"
                  aria-hidden="true"
                />

                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-ink-950 p-6 text-white shadow-brand sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-[0.66rem] font-bold uppercase tracking-[0.16em] text-amber-300">
                        <Icon name="gift" size={13} />
                        Welcome offer
                      </span>
                      <p className="mt-4 font-display text-3xl leading-[1.1] font-extrabold sm:text-[2.1rem]">
                        {welcome.value}% off your first order
                      </p>
                    </div>

                    <span className="grid h-16 w-16 shrink-0 rotate-6 place-items-center rounded-2xl bg-amber-400 font-display text-lg font-extrabold text-ink-950">
                      {welcome.value}%
                    </span>
                  </div>

                  <div className="relative mt-5 overflow-hidden rounded-2xl bg-white">
                    <ProductImage image={deal.image} title={deal.name} className="h-full w-full" />
                    <span className="absolute left-3 top-3 rounded-full bg-rose-600 px-2.5 py-1 text-[0.66rem] font-bold uppercase tracking-[0.1em] text-white">
                      Save {formatPrice(deal.originalPrice - deal.price)}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-[0.9rem] font-semibold text-white">{deal.name}</p>
                      <p className="mt-0.5 text-[0.78rem] text-white/60">
                        Use code{' '}
                        <span className="rounded border border-dashed border-brand-400/60 px-1.5 py-0.5 font-bold text-brand-300">
                          {welcome.code}
                        </span>{' '}
                        at checkout
                      </p>
                    </div>
                    <Button
                      to="/offers"
                      size="sm"
                      variant="amber"
                      iconRight={<Icon name="arrowRight" size={14} />}
                    >
                      Grab it
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default NewsletterBand
