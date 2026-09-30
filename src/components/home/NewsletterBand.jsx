import Newsletter from '../Newsletter'
import Reveal from '../Reveal'
import { Icon } from '../Icons'

const PERKS = [
  { icon: 'gift', label: '10% off your first order' },
  { icon: 'sparkle', label: 'Early access to restocks' },
  { icon: 'percent', label: 'Subscriber-only bundle deals' },
]

/** Newsletter capture band shown near the end of the home page. */
export function NewsletterBand() {
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
                <span className="inline-flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-brand-600">
                  <span className="h-px w-6 bg-brand-500/60" />
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

              <div className="rounded-3xl border border-ink-100 bg-white p-6 shadow-card sm:p-8">
                <h3 className="font-display text-lg font-bold text-ink-900">
                  Subscribe in one click
                </h3>
                <p className="mt-1.5 text-[0.88rem] text-ink-500">
                  No spam. Unsubscribe whenever you like.
                </p>
                <Newsletter className="mt-5" buttonLabel="Subscribe" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default NewsletterBand
