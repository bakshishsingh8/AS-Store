import { aboutMilestones, missionValues, site } from '../data/site'
import { storeStats, testimonials } from '../data/testimonials'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

import Button from '../components/Button'
import Reveal from '../components/Reveal'
import SectionTitle from '../components/SectionTitle'
import TestimonialMarquee from '../components/TestimonialMarquee'
import NewsletterBand from '../components/home/NewsletterBand'
import { Icon } from '../components/Icons'

/** Brand story: hero, statistics, timeline, values and customer voices. */
export function About() {
  useDocumentTitle('About Us')

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink-950 text-white">
        <div
          className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-rose-500/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="container-page relative grid gap-10 py-16 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16 lg:py-24">
          <div>
            <span className="inline-flex items-center text-[0.7rem] font-bold uppercase tracking-[0.18em] text-brand-300">
              Our story
            </span>
            <h1 className="mt-4 text-3xl font-extrabold leading-[1.08] sm:text-4xl lg:text-[3rem]">
              Built inside a gym, not a boardroom.
            </h1>
            <p className="mt-5 max-w-xl text-[1rem] leading-relaxed text-white/70">
              {site.name} started as a single counter selling three protein blends to members who
              could not find honest labelling anywhere else. A decade later we stock more than a
              thousand products — and we still test every one before it earns a shelf.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/shop" iconRight={<Icon name="arrowRight" size={16} />}>
                Shop the range
              </Button>
              <Button to="/contact" variant="outlineLight">
                Talk to the team
              </Button>
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-4">
            {storeStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
              >
                <dt className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-brand-300">
                  {stat.label}
                </dt>
                <dd className="mt-2 font-display text-3xl font-extrabold text-white">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Timeline */}
      <div className="container-page py-14 lg:py-20">
        <SectionTitle
          eyebrow="Milestones"
          title="Ten years of doing it properly"
          description="The short version of how a gym counter became a nationwide storefront."
        />

        <ol className="mt-10 space-y-6 border-l border-ink-200 pl-6 sm:pl-8">
          {aboutMilestones.map((milestone) => (
            <Reveal as="li" key={milestone.year} className="relative">
              <span
                className="absolute -left-[1.95rem] top-1.5 h-3 w-3 rounded-full border-2 border-white bg-brand-600 ring-4 ring-brand-100 sm:-left-[2.7rem]"
                aria-hidden="true"
              />
              <div className="rounded-2xl border border-ink-100 bg-white p-5 shadow-card sm:p-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-display text-lg font-extrabold text-brand-700">
                    {milestone.year}
                  </span>
                  <h3 className="font-display text-base font-bold text-ink-900">
                    {milestone.title}
                  </h3>
                </div>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-ink-500">
                  {milestone.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>

      {/* Values */}
      <section className="bg-ink-50/70 py-14 lg:py-20">
        <div className="container-page">
          <SectionTitle
            eyebrow="What we stand for"
            title="Four promises we do not bend on"
            description="They are not slogans — they are the reasons customers come back for a second order."
          />

          <div className="mt-10 grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-4">
            {missionValues.map((value) => (
              <Reveal key={value.title}>
                <article className="flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-6 shadow-card">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-700">
                    <Icon name={value.icon} size={20} />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-ink-900">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-[0.88rem] leading-relaxed text-ink-500">
                    {value.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <div className="container-page py-14 lg:py-20">
        <SectionTitle
          eyebrow="Customer voices"
          title="Trained by people who actually train"
          description="Real feedback from members of the AS Store community."
        />

        <TestimonialMarquee items={testimonials} className="mt-10" />
      </div>

      {/* CTA */}
      <section className="bg-white pb-14 lg:pb-20">
        <div className="container-page">
          <Reveal>
            <div className="flex flex-col items-start gap-6 rounded-3xl border border-ink-100 bg-gradient-to-br from-ink-950 to-ink-900 p-8 text-white sm:p-10 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
                  Questions? Ask someone who trains.
                </h2>
                <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-white/65">
                  Our support team includes qualified nutrition coaches. Tell us your goal, your
                  schedule and your budget and we will build a simple stack — including telling you
                  what you do not need.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                <Button to="/contact" iconRight={<Icon name="arrowRight" size={16} />}>
                  Contact us
                </Button>
                <Button href={`mailto:${site.email}`} variant="outlineLight">
                  {site.email}
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <NewsletterBand />
    </div>
  )
}

export default About
