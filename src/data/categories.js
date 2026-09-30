/**
 * Storefront categories.
 *
 * `art` describes the vector artwork rendered by <ProductArt /> so each
 * category card gets a consistent, on-brand visual without shipping photos.
 */
export const categories = [
  {
    slug: 'protein',
    name: 'Protein',
    tagline: 'Whey, isolate, casein & plant',
    description:
      'Everyday protein for muscle repair, recovery and hitting your daily grams without the guesswork.',
    icon: 'muscle',
    art: { shape: 'tub', tone: 'ink', short: 'PROTEIN' },
  },
  {
    slug: 'mass-gainer',
    name: 'Mass Gainer',
    tagline: 'Calorie-dense bulking fuel',
    description:
      'High-calorie blends with quality protein and carbs built for hard gainers chasing size.',
    icon: 'flame',
    art: { shape: 'sack', tone: 'ink', short: 'MASS GAIN' },
  },
  {
    slug: 'creatine',
    name: 'Creatine',
    tagline: 'Strength & power output',
    description:
      'The most researched supplement in sport. Micronized monohydrate, HCL capsules and daily blends.',
    icon: 'bolt',
    art: { shape: 'jar', tone: 'ink', short: 'CREATINE' },
  },
  {
    slug: 'pre-workout',
    name: 'Pre-Workout',
    tagline: 'Energy, focus & pumps',
    description:
      'Potent stimulant and stim-free formulas engineered for longer, sharper, heavier sessions.',
    icon: 'flame',
    art: { shape: 'tub', tone: 'red', short: 'PRE-WORK' },
  },
  {
    slug: 'vitamins',
    name: 'Vitamins',
    tagline: 'Daily health foundation',
    description:
      'Vitamins, minerals and omega oils that keep your immune system and joints training ready.',
    icon: 'leaf',
    art: { shape: 'bottle', tone: 'amber', short: 'VITAMINS' },
  },
  {
    slug: 'supplements',
    name: 'Supplements',
    tagline: 'Aminos, recovery & snacks',
    description:
      'BCAAs, glutamine, ZMA, protein bars and spreads that fill the gaps around your training.',
    icon: 'drop',
    art: { shape: 'jar', tone: 'blue', short: 'AMINOS' },
  },
  {
    slug: 'gym-accessories',
    name: 'Gym Accessories',
    tagline: 'Shakers, gloves & bottles',
    description:
      'Hard-wearing everyday gear that makes hitting your numbers easier, session after session.',
    icon: 'shaker',
    art: { shape: 'shaker', tone: 'steel', short: 'ACCESS' },
  },
  {
    slug: 'equipment',
    name: 'Fitness Equipment',
    tagline: 'Train at home, properly',
    description:
      'Dumbbells, kettlebells and free weights built to survive daily progressive overload.',
    icon: 'dumbbell',
    art: { shape: 'dumbbell', tone: 'ink', short: 'EQUIP' },
  },
]

export const categoryBySlug = new Map(categories.map((category) => [category.slug, category]))

export function getCategory(slug) {
  return categoryBySlug.get(String(slug)) ?? null
}

/** The six categories highlighted on the home page. */
export const featuredCategorySlugs = [
  'protein',
  'mass-gainer',
  'creatine',
  'pre-workout',
  'vitamins',
  'gym-accessories',
]

export const featuredCategories = featuredCategorySlugs
  .map((slug) => getCategory(slug))
  .filter(Boolean)

export default categories
