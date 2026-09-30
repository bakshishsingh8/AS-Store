import { whyChooseUs } from '../../data/site'
import { Icon } from '../Icons'
import SectionTitle from '../SectionTitle'
import Reveal from '../Reveal'

/** Six reasons to buy from AS Store, shown as an icon grid. */
export function WhyChooseUs() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="container-page">
        <Reveal>
          <SectionTitle
            align="center"
            eyebrow="Why AS Store"
            title="Shopping you can actually trust"
            description="We built AS Store around the things that frustrated us as lifters: unclear labels, slow shipping and support that never answers. Here is how we fixed them."
          />
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {whyChooseUs.map((item, index) => (
            <Reveal key={item.title} delay={index * 70}>
              <article className="group h-full rounded-2xl border border-ink-100 bg-white p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-card-hover">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-700 transition duration-300 group-hover:bg-brand-600 group-hover:text-white">
                  <Icon name={item.icon} size={22} />
                </span>
                <h3 className="mt-5 font-display text-[1.05rem] font-bold text-ink-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-ink-500">
                  {item.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
