import { offers, shippingRules } from '../data/site'
import { saleProducts } from '../data/products'
import { useShop } from '../context/ShopContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { formatPrice } from '../utils/format'

import Breadcrumbs from '../components/Breadcrumbs'
import Button from '../components/Button'
import ProductGrid from '../components/ProductGrid'
import Reveal from '../components/Reveal'
import SectionTitle from '../components/SectionTitle'
import NewsletterBand from '../components/home/NewsletterBand'
import { Icon } from '../components/Icons'

const ACCENT = {
  brand: 'from-brand-600 to-brand-800',
  ink: 'from-ink-800 to-ink-950',
  amber: 'from-amber-500 to-orange-600',
}

const TIERS = [
  { threshold: '$0 – $59', label: 'Standard delivery', rate: formatPrice(shippingRules.standardRate) },
  { threshold: '$60+', label: 'Standard delivery', rate: 'Free' },
  { threshold: 'Any order', label: 'Express delivery', rate: formatPrice(shippingRules.expressRate) },
  { threshold: '$150+', label: 'Bulk order saving', rate: '15% off' },
]

/** Deals hub: promo codes, the clearance grid and delivery savings. */
export function Offers() {
  const { pushToast } = useShop()
  const spotlight = saleProducts[0]

  useDocumentTitle('Offers & Deals')

  const copyCode = async (code) => {
    try {
      await navigator.clipboard.writeText(code)
      pushToast(`Code ${code} copied to your clipboard`)
    } catch {
      pushToast(`Use code ${code} at checkout`, 'info')
    }
  }

  return (
    <div className="bg-white">
      <div className="border-b border-ink-100 bg-ink-50/70">
        <div className="container-page py-8 lg:py-10">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Offers' }]} />
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-ink-900 sm:text-3xl">Offers &amp; Deals</h1>
              <p className="mt-2 max-w-xl text-[0.94rem] text-ink-500">
                Live promotions, clearance lines and delivery savings. Copy a code and paste it into
                the cart to see it applied.
              </p>
            </div>
            <Button to="/shop" variant="outline" iconRight={<Icon name="arrowRight" size={16} />}>
              Shop all products
            </Button>
          </div>
        </div>
      </div>

      <div className="container-page py-10 lg:py-14">
        <SectionTitle
          eyebrow="Promo codes"
          title="Three ways to save today"
          description="Codes apply to the whole basket, including items already on sale."
        />

        <div className="mt-8 grid gap-4 sm:gap-5 md:grid-cols-3">
          {offers.map((offer) => (
            <Reveal key={offer.code}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-card">
                <div className={`bg-gradient-to-br ${ACCENT[offer.accent] ?? ACCENT.brand} p-5`}>
                  <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-white">
                    {offer.highlight}
                  </span>
                  <h2 className="mt-4 font-display text-xl font-bold text-white">{offer.title}</h2>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[0.9rem] leading-relaxed text-ink-500">{offer.description}</p>

                  <div className="mt-4 flex items-center gap-2 rounded-xl border border-dashed border-brand-300 bg-brand-50/60 px-3.5 py-3">
                    <Icon name="tag" size={16} className="text-brand-700" />
                    <span className="flex-1 font-mono text-sm font-bold tracking-widest text-brand-800">
                      {offer.code}
                    </span>
                    <button
                      type="button"
                      onClick={() => copyCode(offer.code)}
                      className="text-[0.76rem] font-bold uppercase tracking-wide text-brand-700 transition hover:text-brand-900"
                    >
                      Copy
                    </button>
                  </div>

                  <p className="mt-3 text-[0.78rem] text-ink-400">
                    {offer.minimumSpend > 0
                      ? `Minimum spend ${formatPrice(offer.minimumSpend)}`
                      : 'No minimum spend'}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Deal spotlight */}
        {spotlight ? (
          <Reveal className="mt-14">
            <div className="grid overflow-hidden rounded-3xl border border-ink-100 bg-ink-50/70 lg:grid-cols-[1.1fr_1fr]">
              <div className="p-7 sm:p-9 lg:p-11">
                <span className="inline-flex items-center gap-2 rounded-full bg-rose-600 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-white">
                  <Icon name="bolt" size={12} />
                  Deal of the week
                </span>
                <h2 className="mt-4 font-display text-2xl font-extrabold text-ink-900 sm:text-3xl">
                  Save {spotlight.discount}% on {spotlight.name}
                </h2>
                <p className="mt-3 max-w-lg text-[0.94rem] leading-relaxed text-ink-500">
                  {spotlight.description}
                </p>

                <div className="mt-6 flex flex-wrap items-baseline gap-3">
                  <span className="font-display text-3xl font-extrabold text-ink-900">
                    {formatPrice(spotlight.price)}
                  </span>
                  <span className="text-base text-ink-400 line-through">
                    {formatPrice(spotlight.originalPrice)}
                  </span>
                  <span className="rounded-full bg-brand-100 px-2.5 py-1 text-[0.75rem] font-bold text-brand-800">
                    Save {formatPrice(spotlight.originalPrice - spotlight.price)}
                  </span>
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Button to={`/product/${spotlight.id}`} iconRight={<Icon name="arrowRight" size={16} />}>
                    View deal
                  </Button>
                  <Button
                    to="/shop?sale=1&sort=discount"
                    variant="outline"
                    iconLeft={<Icon name="percent" size={16} />}
                  >
                    All clearance
                  </Button>
                </div>
              </div>

              <div className="relative flex items-center justify-center bg-white p-8">
                <ProductGrid
                  products={saleProducts.slice(1, 3)}
                  columns={2}
                  className="w-full"
                />
              </div>
            </div>
          </Reveal>
        ) : null}

        {/* Delivery savings */}
        <section className="mt-14">
          <SectionTitle
            eyebrow="Delivery savings"
            title="Shipping that pays for itself"
            description="The more you bundle in one order, the less you spend on delivery."
          />
          <div className="mt-8 overflow-hidden rounded-2xl border border-ink-100">
            <table className="w-full text-left text-[0.9rem]">
              <thead className="bg-ink-50 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-ink-500">
                <tr>
                  <th scope="col" className="px-4 py-3.5 sm:px-5">
                    Order value
                  </th>
                  <th scope="col" className="px-4 py-3.5 sm:px-5">
                    Method
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-right sm:px-5">
                    You pay
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100 bg-white">
                {TIERS.map((tier) => (
                  <tr key={tier.threshold}>
                    <td className="px-4 py-3.5 font-semibold text-ink-900 sm:px-5">
                      {tier.threshold}
                    </td>
                    <td className="px-4 py-3.5 text-ink-600 sm:px-5">{tier.label}</td>
                    <td
                      className={`px-4 py-3.5 text-right font-bold sm:px-5 ${
                        tier.rate === 'Free' ? 'text-brand-700' : 'text-ink-900'
                      }`}
                    >
                      {tier.rate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 flex items-start gap-2 text-[0.82rem] text-ink-500">
            <Icon name="info" size={15} className="mt-0.5 shrink-0 text-brand-600" />
            Prices shown include taxes where applicable. This is a demo storefront — no payment is
            processed.
          </p>
        </section>
      </div>

      <NewsletterBand />
    </div>
  )
}

export default Offers
