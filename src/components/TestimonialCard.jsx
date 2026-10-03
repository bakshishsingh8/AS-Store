import { Icon, StarIcon } from './Icons'

/** One customer review, used on the home page and the About page. */
export function TestimonialCard({ testimonial, className = '' }) {
  if (!testimonial) return null

  return (
    <figure
      className={`flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-6 shadow-card transition duration-300 hover:-translate-y-1 ${className}`}
    >
      <div className="flex items-center gap-1" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((index) => (
          <StarIcon
            key={index}
            size={15}
            filled={index < testimonial.rating}
            className={index < testimonial.rating ? 'text-amber-500' : 'text-ink-200'}
          />
        ))}
      </div>

      <blockquote className="mt-4 flex-1 text-[0.92rem] leading-relaxed text-ink-600">
        “{testimonial.review}”
      </blockquote>

      <figcaption className="mt-5 flex items-center gap-3 border-t border-ink-100 pt-5">
        <span
          className={`grid h-11 w-11 shrink-0 place-items-center rounded-full font-display text-sm font-extrabold ${testimonial.tone}`}
        >
          {testimonial.initials}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[0.9rem] font-bold text-ink-900">
            {testimonial.name}
          </span>
          <span className="block truncate text-[0.78rem] text-ink-500">
            {testimonial.role} · {testimonial.location}
          </span>
        </span>
      </figcaption>

      <p className="mt-3 flex items-center gap-1.5 text-[0.72rem] font-semibold text-brand-700">
        <Icon name="checkCircle" size={13} />
        <span className="truncate">{testimonial.product}</span>
      </p>
    </figure>
  )
}

export default TestimonialCard
