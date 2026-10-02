import { testimonials } from '../../data/testimonials'
import TestimonialMarquee from '../TestimonialMarquee'
import SectionTitle from '../SectionTitle'
import Reveal from '../Reveal'
import { Icon, StarIcon } from '../Icons'
import Button from '../Button'
import { formatCount } from '../../utils/format'

const SUMMARY = [
  { label: 'Average rating', value: '4.8 / 5' },
  { label: 'Reviews collected', value: '12.4k' },
  { label: 'Would recommend', value: '98%' },
]

/** Customer reviews with an aggregate rating summary. */
export function Testimonials() {
  return (
    <section className="bg-ink-50/70 py-16 lg:py-20">
      <div className="container-page">
        <Reveal>
          <SectionTitle
            align="left"
            eyebrow="Customer reviews"
            title="Thousands of lifters, one verdict"
            description="Verified feedback from customers who ordered, trained and came back for more."
          />
        </Reveal>

        {/* <Reveal className="mx-auto mt-8 max-w-3xl">
          <div className="flex flex-col items-center gap-6 rounded-2xl border border-ink-100 bg-white px-6 py-6 shadow-card sm:flex-row sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((index) => (
                  <StarIcon
                    key={index}
                    size={20}
                    filled={index < 5}
                    className={index < 4 ? 'text-amber-500' : 'text-amber-500/60'}
                  />
                ))}
              </div>
              <p className="text-[0.9rem] text-ink-600">
                Based on{' '}
                <strong className="font-semibold text-ink-900">{formatCount(12480)} reviews</strong>
              </p>
            </div>

            <dl className="flex items-center gap-8">
              {SUMMARY.map((item) => (
                <div key={item.label} className="text-center sm:text-left">
                  <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-ink-400">
                    {item.label}
                  </dt>
                  <dd className="mt-0.5 font-display text-base font-extrabold text-ink-900">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal> */}

        <TestimonialMarquee items={testimonials} className="mt-10" />

        <Reveal className="mt-10 flex justify-center">
          <Button
            to="/shop"
            variant="outline"
            iconLeft={<Icon name="verified" size={16} />}
            iconRight={<Icon name="arrowRight" size={16} />}
          >
            Join 48,000+ customers
          </Button>
        </Reveal>
      </div>
    </section>
  )
}

export default Testimonials
