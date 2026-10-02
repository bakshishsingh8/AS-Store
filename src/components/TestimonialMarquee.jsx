import TestimonialCard from './TestimonialCard'

/**
 * Customer reviews on a single horizontal line, travelling right to left in a
 * continuous loop. The list is rendered twice so the track can wrap without a
 * visible jump (the animation shifts the track by exactly 50%). The duplicate
 * set is hidden from assistive tech, and hovering pauses the motion.
 */
export function TestimonialMarquee({ items, className = '' }) {
  if (!items?.length) return null

  const track = [...items, ...items]

  return (
    <div className={`marquee-mask relative overflow-hidden ${className}`}>
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {track.map((testimonial, index) => (
          <div
            key={`${testimonial.id}-${index}`}
            aria-hidden={index >= items.length ? 'true' : undefined}
            className="w-[19rem] shrink-0 pr-4 sm:w-[22rem] sm:pr-5"
          >
            <TestimonialCard testimonial={testimonial} className="h-full" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default TestimonialMarquee