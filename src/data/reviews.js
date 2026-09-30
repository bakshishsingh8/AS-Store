import { seededRandom } from '../utils/format'

/**
 * Deterministic review data. Reviews are generated from the product id so the
 * same product always shows the same feedback, without hand-writing hundreds
 * of rows.
 */
const REVIEWERS = [
  { name: 'Marcus D.', initials: 'MD', tone: 'bg-brand-100 text-brand-800' },
  { name: 'Priya S.', initials: 'PS', tone: 'bg-blue-100 text-blue-800' },
  { name: 'Daniel O.', initials: 'DO', tone: 'bg-amber-100 text-amber-800' },
  { name: 'Aisha K.', initials: 'AK', tone: 'bg-rose-100 text-rose-800' },
  { name: 'Tom B.', initials: 'TB', tone: 'bg-ink-100 text-ink-700' },
  { name: 'Lena M.', initials: 'LM', tone: 'bg-purple-100 text-purple-800' },
  { name: 'Jared W.', initials: 'JW', tone: 'bg-teal-100 text-teal-800' },
]

const TITLES = [
  'Exactly what I needed',
  'Great value for the price',
  'Solid quality, will rebuy',
  'Does what it says',
  'Now part of my routine',
  'Impressed with the quality',
]

const BODIES = [
  'Ordered on a Sunday and it arrived Tuesday morning, well packed with the seal intact. Two weeks in and I have no complaints at all.',
  'I was sceptical about the taste but it mixes smoothly with water and no clumps. Much better than the brand I was using before.',
  'Been using this consistently for a month and my numbers in the gym have moved. The quality feels genuinely premium.',
  'Good price compared to the local shops and the packaging is proper, sealed and dated. Will be ordering again.',
  'Does exactly what it claims. Nothing flashy, just a reliable product that I have already recommended to two training partners.',
  'My recovery between sessions has clearly improved since I added this in. Mixing is easy and there is no aftertaste.',
]

const FLAVOUR_NOTE = [
  'The flavour is subtle rather than overpowering, which I prefer.',
  'Not too sweet, which is a nice change from most of the market.',
  'Tastes good without the artificial aftertaste you usually get.',
  'Slightly sweeter than expected but genuinely enjoyable.',
]

/** Returns between 3 and 5 reviews for a product. */
export function getProductReviews(productId, count = 4) {
  const seed = String(productId)
  const total = 3 + Math.floor(seededRandom(`${seed}-count`) * 3)
  const limit = Math.min(count, total)

  return Array.from({ length: limit }, (_, index) => {
    const roll = seededRandom(`${seed}-review-${index}`)
    const reviewer = REVIEWERS[(index + Math.floor(roll * REVIEWERS.length)) % REVIEWERS.length]
    const rating = roll > 0.75 ? 4 : roll > 0.2 ? 5 : 3

    return {
      id: `${seed}-r${index}`,
      name: reviewer.name,
      initials: reviewer.initials,
      tone: reviewer.tone,
      rating,
      title: TITLES[Math.floor(seededRandom(`${seed}-t${index}`) * TITLES.length)],
      body:
        rating === 4
          ? `${BODIES[Math.floor(seededRandom(`${seed}-b${index}`) * BODIES.length)]} ${FLAVOUR_NOTE[Math.floor(seededRandom(`${seed}-f${index}`) * FLAVOUR_NOTE.length)]}`
          : BODIES[Math.floor(seededRandom(`${seed}-b${index}`) * BODIES.length)],
      verified: roll > 0.25,
      date: ['2 days ago', '1 week ago', '3 weeks ago', 'Last month'][index % 4],
      helpful: 4 + Math.floor(seededRandom(`${seed}-h${index}`) * 60),
    }
  })
}

/** Star distribution shown next to the average rating. */
export function getRatingBreakdown(product) {
  const average = Number(product?.rating) || 4.5
  const total = Number(product?.reviews) || 100
  const weights = [
    { stars: 5, share: average >= 4.7 ? 0.82 : average >= 4.5 ? 0.7 : 0.6 },
    { stars: 4, share: average >= 4.7 ? 0.13 : 0.2 },
    { stars: 3, share: 0.05 },
    { stars: 2, share: 0.015 },
    { stars: 1, share: 0.005 },
  ]
  let assigned = 0
  return weights.map((weight, index) => {
    const count =
      index === weights.length - 1 ? Math.max(total - assigned, 0) : Math.round(total * weight.share)
    assigned += count
    return { stars: weight.stars, count, percent: Math.round((count / total) * 100) }
  })
}

export default getProductReviews
