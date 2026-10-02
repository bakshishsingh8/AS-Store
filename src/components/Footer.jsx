import { Link } from 'react-router-dom'
import { footerColumns, paymentMethods, site, socialLinks } from '../data/site'
import { Icon, LogoMark, SocialIcon } from './Icons'
import Newsletter from './Newsletter'
import { storeStats } from '../data/testimonials'

const TRUST_ITEMS = [
  { icon: 'verified', label: 'Genuine products', detail: 'Batch verified' },
  { icon: 'truck', label: 'Fast delivery', detail: 'Free over $60' },
  { icon: 'lock', label: 'Secure payment', detail: 'Encrypted checkout' },
  { icon: 'refresh', label: 'Easy returns', detail: '30-day policy' },
]

function BrandColumn() {
  return (
    <div className="lg:col-span-2 lg:pr-8">
      <Link to="/" className="flex items-center gap-3" aria-label="AS Store home">
        <LogoMark className="h-10 w-10" />
        <span className="flex flex-col leading-none">
          <span className="font-display text-[1.15rem] font-extrabold tracking-tight text-white">
            AS STORE
          </span>
          <span className="mt-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-brand-400">
            Fuel your performance
          </span>
        </span>
      </Link>

      <p className="mt-5 max-w-sm text-[0.9rem] leading-relaxed text-white/60">
        Premium sports nutrition and gym equipment, sourced directly from certified manufacturers
        and lab tested for purity. Everything you need to train harder and recover faster, at a fair
        price.
      </p>

      <ul className="mt-6 space-y-3 text-[0.88rem]">
        <li className="flex items-start gap-3 text-white/70">
          <Icon name="pin" size={17} className="mt-0.5 shrink-0 text-brand-400" />
          <span>{site.address}</span>
        </li>
        <li className="flex items-center gap-3">
          <Icon name="phone" size={17} className="shrink-0 text-brand-400" />
          <a
            href={`tel:${site.phone.replace(/[^+\d]/g, '')}`}
            className="text-white/70 transition hover:text-white"
          >
            {site.phone}
          </a>
        </li>
        <li className="flex items-center gap-3">
          <Icon name="mail" size={17} className="shrink-0 text-brand-400" />
          <a
            href={`mailto:${site.email}`}
            className="text-white/70 transition hover:text-white"
          >
            {site.email}
          </a>
        </li>
      </ul>

      <div className="mt-6 flex items-center gap-2">
        {socialLinks.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={social.label}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/12 text-white/70 transition hover:border-brand-400 hover:bg-brand-400/10 hover:text-brand-300"
          >
            <SocialIcon name={social.icon} size={17} />
          </a>
        ))}
      </div>
    </div>
  )
}

/**
 * Site footer: newsletter capture, brand + link columns, store statistics,
 * trust badges, payment methods and legal links.
 */
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto bg-ink-950 text-white">
      {/* Newsletter band */}
      <div className="border-b border-white/10">
        <div className="container-page grid gap-8 py-12 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-14">
          <div>
            <span className="inline-flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-brand-400">
              <span className="h-px w-6 bg-brand-400/60" />
              Stay in the loop
            </span>
            <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
              Get Fitness Deals &amp; Updates
            </h2>
            <p className="mt-3 max-w-md text-[0.92rem] leading-relaxed text-white/60">
              New arrivals, restock alerts and subscriber-only discounts. One email a fortnight, no
              noise.
            </p>
          </div>

          <Newsletter tone="dark" className="w-full" buttonLabel="Subscribe" />
        </div>
      </div>

      {/* Main columns */}
      <div className="container-page grid gap-10 py-12 lg:grid-cols-12 lg:gap-8 lg:py-16">
        <BrandColumn />

        {footerColumns.map((column) => (
          <div key={column.title} className="lg:col-span-2">
            <h3 className="font-display text-[0.78rem] font-bold uppercase tracking-[0.14em] text-white">
              {column.title}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {column.links.map((link) => (
                <li key={`${column.title}-${link.label}`}>
                  <Link
                    to={link.to}
                    className="text-[0.88rem] text-white/60 transition hover:text-brand-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="lg:col-span-2">
          <h3 className="font-display text-[0.78rem] font-bold uppercase tracking-[0.14em] text-white">
            Opening Hours
          </h3>
          <ul className="mt-4 space-y-2.5">
            {site.hours.map((entry) => (
              <li key={entry.day} className="text-[0.88rem] text-white/60">
                <span className="block text-white/80">{entry.day}</span>
                <span className="text-[0.82rem]">{entry.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Store stats + trust badges */}
      <div className="border-t border-white/10">
        <div className="container-page grid gap-8 py-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {storeStats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-white/45">
                  {stat.label}
                </dt>
                <dd className="mt-1 font-display text-xl font-extrabold text-brand-300">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>

          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
            {TRUST_ITEMS.map((item) => (
              <li
                key={item.label}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3.5 py-3"
              >
                <Icon name={item.icon} size={18} className="shrink-0 text-brand-400" />
                <span className="min-w-0">
                  <span className="block text-[0.8rem] font-semibold text-white">{item.label}</span>
                  <span className="block text-[0.7rem] text-white/50">{item.detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-4 py-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-[0.82rem] text-white/50">
            © {year} {site.name}. All rights reserved.
          </p>

          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.82rem]">
            <li>
              <Link to="/contact#privacy" className="text-white/60 transition hover:text-brand-300">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/contact#terms" className="text-white/60 transition hover:text-brand-300">
                Terms &amp; Conditions
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-white/60 transition hover:text-brand-300">
                Shipping &amp; Returns
              </Link>
            </li>
          </ul>

          <ul className="flex flex-wrap items-center gap-2">
            {paymentMethods.map((method) => (
              <li
                key={method}
                className="rounded-md border border-white/12 bg-white/5 px-2.5 py-1 text-[0.68rem] font-semibold tracking-wide text-white/60"
              >
                {method}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer

