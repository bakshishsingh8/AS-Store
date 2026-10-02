import { discountPercent, savingsAmount, slugify } from '../utils/format'
import { categoryTemplates, defaultSpec } from './productContent'

export const brands = [
  'AS Elite',
  'IronForge Nutrition',
  'PureForm Labs',
  'Titan Fuel',
  'CoreVital',
  'AlphaGrit',
  'NordicPure',
  'Peak Athletics',
]

/**
 * Mock catalogue — this is the single source of truth for the storefront.
 * Swap in a real API later by replacing this array (or the `products` export
 * below) with a fetch; nothing else in the app needs to change.
 */
const RAW_PRODUCTS = [
  {
    id: 'p-gold-whey',
    name: 'AS Elite Gold Whey Protein Isolate',
    brand: 'AS Elite',
    category: 'protein',
    price: 54.99,
    originalPrice: 79.99,
    rating: 4.8,
    reviews: 1284,
    badge: 'Best Seller',
    featured: true,
    stock: 64,
    highlights: [
      '27 g of ultra-filtered whey isolate per scoop',
      'Just 1.2 g of fat and 1.9 g of carbs per serving',
      'Instantly soluble with a smooth, milkshake-like texture',
    ],
    spec: { weight: '2.27 kg', serving: '32 g', servings: 71, flavour: 'Double Chocolate' },
    image: { shape: 'tub', tone: 'ink', short: 'GOLD ISO' },
    description:
      'Our flagship isolate, low-temperature filtered to preserve the protein fractions while stripping out almost all lactose and fat. Built for athletes who want clean grams that count towards the day, not a dessert.',
  },
  {
    id: 'p-whey-blend',
    name: 'IronForge 100% Whey Protein Blend',
    brand: 'IronForge Nutrition',
    category: 'protein',
    price: 44.99,
    originalPrice: 59.99,
    rating: 4.6,
    reviews: 842,
    featured: true,
    stock: 88,
    highlights: [
      '24 g of protein from isolate, concentrate and hydrolysate',
      'Great value for everyday, high-volume protein intake',
      'Includes 5.5 g of naturally occurring BCAAs',
    ],
    spec: { weight: '2 kg', serving: '31 g', servings: 64, flavour: 'Vanilla Cream' },
    image: { shape: 'tub', tone: 'emerald', short: '100% WHEY' },
    description:
      'A no-nonsense three-source whey blend that delivers fast and slower digesting protein in one scoop. The dependable everyday pick whether you are cutting, maintaining or slowly adding size.',
  },
  {
    id: 'p-hydro-iso',
    name: 'PureForm Hydrolyzed Whey Isolate',
    brand: 'PureForm Labs',
    category: 'protein',
    price: 62.5,
    originalPrice: 74.99,
    rating: 4.9,
    reviews: 517,
    badge: 'New',
    stock: 31,
    highlights: [
      'Pre-digested peptides for the fastest possible absorption',
      'Virtually lactose free — ideal for sensitive stomachs',
      'No artificial colours and no added sugar',
    ],
    spec: { weight: '1.8 kg', serving: '30 g', servings: 60, flavour: 'Strawberry Milkshake' },
    image: { shape: 'tub', tone: 'steel', short: 'HYDRO ISO' },
    description:
      'Hydrolysed into smaller peptides so it reaches the bloodstream faster than standard isolate. The pick for intra-workout shakes and anyone who reacts badly to regular whey.',
  },
  {
    id: 'p-casein-night',
    name: 'AS Elite Night Release Casein',
    brand: 'AS Elite',
    category: 'protein',
    price: 39.99,
    originalPrice: 49.99,
    rating: 4.5,
    reviews: 386,
    stock: 47,
    highlights: [
      'Slow-digesting casein drips amino acids for hours',
      'Thick, pudding-like texture that keeps you full',
      'Ideal as your final protein feed before sleep',
    ],
    spec: { weight: '1.8 kg', serving: '33 g', servings: 54, flavour: 'Cookies & Cream' },
    image: { shape: 'tub', tone: 'blue', short: 'CASEIN' },
    description:
      'A slow release protein built for the hours you are not eating. Micellar casein gels in the stomach, delivering a steady supply of amino acids right through the night.',
  },
  {
    id: 'p-plant-protein',
    name: 'Titan Fuel Plant Protein Blend',
    brand: 'Titan Fuel',
    category: 'protein',
    price: 41.99,
    originalPrice: 54.99,
    rating: 4.4,
    reviews: 298,
    featured: true,
    stock: 52,
    highlights: [
      'Pea and rice protein combined for a complete amino profile',
      '100% vegan, dairy free and soy free',
      'Smooth texture with no gritty aftertaste',
    ],
    spec: { weight: '1.6 kg', serving: '34 g', servings: 47, flavour: 'Vanilla Cream' },
    image: { shape: 'sack', tone: 'purple', short: 'PLANT PRO' },
    description:
      'A complete plant protein that does not taste like one. Pea isolate carries the lysine, rice protein fills in the methionine, and the blend smooths out into a genuinely drinkable shake.',
  },
  {
    id: 'p-clear-whey',
    name: 'CoreVital Clear Whey Refresher',
    brand: 'CoreVital',
    category: 'protein',
    price: 34.99,
    originalPrice: 44.99,
    rating: 4.3,
    reviews: 231,
    stock: 39,
    highlights: [
      'Light, juice-like protein drink instead of a milky shake',
      '20 g of whey isolate per serving, fat free',
      'Refreshing over ice on hot training days',
    ],
    spec: { weight: '1.1 kg', serving: '24 g', servings: 45, flavour: 'Mango Peach' },
    image: { shape: 'jar', tone: 'teal', short: 'CLEAR WHEY' },
    description:
      'Clear whey is isolate filtered to remove the fats and lactose that make shakes cloudy. The result is a crisp, fruity drink you can genuinely look forward to on a hot day.',
  },
  {
    id: 'p-mass-5000',
    name: 'AS Elite Mass Gainer Extreme 5000',
    brand: 'AS Elite',
    category: 'mass-gainer',
    price: 64.99,
    originalPrice: 84.99,
    rating: 4.7,
    reviews: 764,
    badge: 'Best Seller',
    featured: true,
    stock: 42,
    highlights: [
      'Over 1250 kcal per serving for a real calorie surplus',
      '62 g of protein and 250 g of carbohydrates per serve',
      'Added creatine, MCTs and digestive enzymes',
    ],
    spec: { weight: '5.4 kg', serving: '334 g', servings: 16, flavour: 'Chocolate Fudge' },
    image: { shape: 'sack', tone: 'ink', short: 'MASS 5000' },
    description:
      'For the lifter who eats everything and still cannot gain. A dense, complete gainer that turns one shake into a genuine meal you can actually finish without feeling bloated.',
  },
  {
    id: 'p-mass-builder',
    name: 'IronForge Serious Mass Builder',
    brand: 'IronForge Nutrition',
    category: 'mass-gainer',
    price: 58.99,
    originalPrice: 72.99,
    rating: 4.5,
    reviews: 411,
    stock: 36,
    highlights: [
      'Balanced 1:3 protein to carbohydrate ratio',
      'Slow release carbs from oats for steady energy',
      'No added sugar and no maltodextrin overload',
    ],
    spec: { weight: '4.5 kg', serving: '150 g', servings: 30, flavour: 'Vanilla Ice Cream' },
    image: { shape: 'sack', tone: 'emerald', short: 'MASS BUILD' },
    description:
      'A cleaner route to gaining size. Oat-based carbohydrates keep the calorie load steady through the day while the protein is split between fast whey and slower casein.',
  },
  {
    id: 'p-lean-bulk',
    name: 'Titan Fuel Lean Bulk Gainer',
    brand: 'Titan Fuel',
    category: 'mass-gainer',
    price: 49.99,
    originalPrice: 62.99,
    rating: 4.4,
    reviews: 254,
    stock: 44,
    highlights: [
      'Designed for size without unnecessary fat gain',
      '450 kcal per serving with 35 g of protein',
      'Low GI carbohydrate sources keep energy stable',
    ],
    spec: { weight: '3 kg', serving: '110 g', servings: 27, flavour: 'Banana Cream' },
    image: { shape: 'sack', tone: 'blue', short: 'LEAN BULK' },
    description:
      'Not everyone wants a 1200 calorie shake. Lean Bulk delivers a measured surplus with quality carbohydrates and enough protein to actually build tissue.',
  },
  {
    id: 'p-creatine-mono',
    name: 'AS Elite Micronized Creatine Monohydrate',
    brand: 'AS Elite',
    category: 'creatine',
    price: 24.99,
    originalPrice: 34.99,
    rating: 4.9,
    reviews: 2106,
    badge: 'Best Seller',
    featured: true,
    stock: 118,
    highlights: [
      '5 g of 99.9% pure micronized creatine per scoop',
      'Dissolves almost instantly in cold water',
      'Unflavoured, so it stacks with any drink you already use',
    ],
    spec: { weight: '500 g', serving: '5 g', servings: 100, flavour: 'Unflavoured' },
    image: { shape: 'jar', tone: 'ink', short: 'CREATINE' },
    description:
      'The most proven strength supplement there is, in the format that makes sense: pure micronized monohydrate and nothing else. Take it daily, train hard, get stronger.',
  },
  {
    id: 'p-creatine-hcl',
    name: 'PureForm Creatine HCL Capsules',
    brand: 'PureForm Labs',
    category: 'creatine',
    price: 29.99,
    originalPrice: 37.99,
    rating: 4.6,
    reviews: 388,
    stock: 61,
    highlights: [
      'Highly water-soluble creatine HCL needs no loading phase',
      'Convenient capsules for travel and on-the-go dosing',
      'Zero bloat and no need for a shaker',
    ],
    spec: { weight: '120 capsules', serving: '2 capsules', servings: 60, flavour: 'Unflavoured' },
    image: { shape: 'bottle', tone: 'steel', short: 'HCL 3000' },
    description:
      'For lifters who travel or simply cannot stand powder. Creatine HCL dissolves far more readily than monohydrate, and the capsule format means your dose is never left at home.',
  },
  {
    id: 'p-creatine-electro',
    name: 'AlphaGrit Creatine + Electrolytes',
    brand: 'AlphaGrit',
    category: 'creatine',
    price: 27.99,
    originalPrice: 33.99,
    rating: 4.5,
    reviews: 176,
    badge: 'New',
    stock: 55,
    highlights: [
      '5 g of creatine with a full electrolyte replacement blend',
      'Supports hydration during long, sweaty sessions',
      'Light citrus taste mixes into a genuinely drinkable glass',
    ],
    spec: { weight: '420 g', serving: '12 g', servings: 35, flavour: 'Lemon Lime' },
    image: { shape: 'jar', tone: 'blue', short: 'CREA+ELEC' },
    description:
      'Creatine performs best in a well-hydrated muscle. This blend pairs a full 5 g dose with sodium, potassium and magnesium so you can top up both at once.',
  },
  {
    id: 'p-rage-pre',
    name: 'AS Elite Rage Pre-Workout',
    brand: 'AS Elite',
    category: 'pre-workout',
    price: 34.99,
    originalPrice: 44.99,
    rating: 4.7,
    reviews: 932,
    badge: 'Best Seller',
    featured: true,
    stock: 73,
    highlights: [
      'Full-dose citrulline and beta-alanine, fully disclosed',
      '300 mg of caffeine with L-theanine for smooth focus',
      'Massive pumps without the jittery crash afterwards',
    ],
    spec: { weight: '390 g', serving: '13 g', servings: 30, flavour: 'Blue Raspberry' },
    image: { shape: 'tub', tone: 'red', short: 'RAGE' },
    description:
      'A no-compromise pre-workout with every dose printed on the label. Rage is built for the sessions that matter: heavy squats, long rows, personal bests.',
  },
  {
    id: 'p-stim-free-pre',
    name: 'IronForge Stim-Free Pump Formula',
    brand: 'IronForge Nutrition',
    category: 'pre-workout',
    price: 32.99,
    originalPrice: 39.99,
    rating: 4.5,
    reviews: 320,
    stock: 48,
    highlights: [
      'All the pump and focus with zero stimulants',
      'Perfect for evening sessions and late-night training',
      'Stacks safely with your existing caffeine intake',
    ],
    spec: { weight: '360 g', serving: '12 g', servings: 30, flavour: 'Fruit Punch' },
    image: { shape: 'tub', tone: 'steel', short: 'PUMP' },
    description:
      'Training after work should not cost you sleep. Stim-Free pairs a heavy citrulline and nitrate load with betaine to drive blood flow and endurance, minus the caffeine.',
  },
  {
    id: 'p-nitric-pre',
    name: 'AlphaGrit Nitric Oxide Pre-Workout',
    brand: 'AlphaGrit',
    category: 'pre-workout',
    price: 36.99,
    originalPrice: 47.99,
    rating: 4.4,
    reviews: 268,
    stock: 40,
    highlights: [
      'Nitrate-rich formula for vascular, long-lasting pumps',
      'Glycerol and taurine draw water into the muscle cell',
      'Ideal for high-volume hypertrophy training',
    ],
    spec: { weight: '420 g', serving: '14 g', servings: 30, flavour: 'Sour Watermelon' },
    image: { shape: 'tub', tone: 'purple', short: 'NITRIC' },
    description:
      'Built for bodybuilding-style sessions where the pump is the point. Nitric Oxide floods the muscle with blood and keeps it there through high-rep, short-rest work.',
  },
  {
    id: 'p-zero-pre',
    name: 'CoreVital Pre-Workout Zero Sugar',
    brand: 'CoreVital',
    category: 'pre-workout',
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.3,
    reviews: 197,
    badge: 'New',
    stock: 57,
    highlights: [
      'Only 5 calories per serving, sweetened with stevia',
      'Moderate 150 mg caffeine dose, easy to tolerate',
      'No artificial colours or sugar alcohols',
    ],
    spec: { weight: '300 g', serving: '10 g', servings: 30, flavour: 'Green Apple' },
    image: { shape: 'tub', tone: 'teal', short: 'ZERO' },
    description:
      'A lighter, cleaner pre-workout for people counting calories or cutting back on stimulants. Enough energy to sharpen a session without the racing heart.',
  },
  {
    id: 'p-multivitamin',
    name: 'CoreVital Daily Multivitamin Complex',
    brand: 'CoreVital',
    category: 'vitamins',
    price: 21.99,
    originalPrice: 29.99,
    rating: 4.6,
    reviews: 674,
    badge: 'Best Seller',
    featured: true,
    stock: 96,
    highlights: [
      '28 essential vitamins and minerals in one daily dose',
      'Formulated around the higher demands of training',
      'One tablet a day, easy to swallow, no aftertaste',
    ],
    spec: { weight: '90 tablets', serving: '1 tablet', servings: 90, flavour: 'Unflavoured' },
    image: { shape: 'bottle', tone: 'amber', short: 'MULTI' },
    description:
      'Training increases your need for micronutrients and simultaneously increases what you lose through sweat. This is the baseline insurance policy for a hard training week.',
  },
  {
    id: 'p-vitamin-d3k2',
    name: 'CoreVital Vitamin D3 + K2',
    brand: 'CoreVital',
    category: 'vitamins',
    price: 16.99,
    originalPrice: 22.99,
    rating: 4.7,
    reviews: 452,
    stock: 104,
    highlights: [
      '2000 IU of vitamin D3 with 100 mcg of vitamin K2',
      'Supports bone density, immunity and testosterone levels',
      'Oil-based softgels for reliable absorption',
    ],
    spec: { weight: '120 softgels', serving: '1 softgel', servings: 120, flavour: 'Unflavoured' },
    image: { shape: 'bottle', tone: 'cream', short: 'D3 + K2' },
    description:
      'Most indoor training takes place out of the sun, which is exactly where vitamin D comes from. Pairing D3 with K2 makes sure the calcium ends up in your bones, not your arteries.',
  },
  {
    id: 'p-omega3',
    name: 'NordicPure Omega-3 Fish Oil',
    brand: 'NordicPure',
    category: 'vitamins',
    price: 23.99,
    originalPrice: 31.99,
    rating: 4.5,
    reviews: 388,
    stock: 72,
    highlights: [
      '1000 mg of triglyceride-form fish oil per softgel',
      'Molecularly distilled with no fishy repeat',
      'Supports joint comfort and cardiovascular health',
    ],
    spec: { weight: '120 softgels', serving: '2 softgels', servings: 60, flavour: 'Unflavoured' },
    image: { shape: 'bottle', tone: 'blue', short: 'OMEGA 3' },
    description:
      'Heavy lifting is an inflammatory process. A quality omega-3 keeps the balance tipped the right way, supporting joints, recovery and heart health over the long run.',
  },
  {
    id: 'p-magnesium',
    name: 'CoreVital Magnesium Glycinate',
    brand: 'CoreVital',
    category: 'vitamins',
    price: 18.99,
    originalPrice: 24.99,
    rating: 4.6,
    reviews: 296,
    stock: 88,
    highlights: [
      'Highly bioavailable glycinate form, gentle on digestion',
      'Supports muscle relaxation, sleep quality and recovery',
      'Caffeine-free evening dose that will not leave you groggy',
    ],
    spec: { weight: '120 capsules', serving: '2 capsules', servings: 60, flavour: 'Unflavoured' },
    image: { shape: 'bottle', tone: 'emerald', short: 'MAGNESIUM' },
    description:
      'Magnesium is involved in more than 300 reactions in the body, including muscle contraction and sleep. Glycinate is the form that absorbs well without upsetting your stomach.',
  },
  {
    id: 'p-bcaa',
    name: 'AS Elite BCAA 2:1:1 Recovery',
    brand: 'AS Elite',
    category: 'supplements',
    price: 26.99,
    originalPrice: 35.99,
    rating: 4.5,
    reviews: 521,
    featured: true,
    stock: 68,
    highlights: [
      '7 g of BCAAs in the research-backed 2:1:1 ratio',
      'Sip during training to reduce muscle breakdown',
      'Caffeine free and light enough to drink all day',
    ],
    spec: { weight: '400 g', serving: '9 g', servings: 44, flavour: 'Mixed Berry' },
    image: { shape: 'tub', tone: 'blue', short: 'BCAA' },
    description:
      'A refreshing intra-workout drink that helps protect muscle during long, fasted or high-volume sessions, and makes hitting your daily water intake considerably easier.',
  },
  {
    id: 'p-zma',
    name: 'Titan Fuel ZMA Recovery Stack',
    brand: 'Titan Fuel',
    category: 'supplements',
    price: 22.99,
    originalPrice: 29.99,
    rating: 4.3,
    reviews: 187,
    stock: 63,
    highlights: [
      'Zinc, magnesium and vitamin B6 in a proven daily dose',
      'Often chosen to support deeper sleep and recovery',
      'Convenient capsules taken before bed',
    ],
    spec: { weight: '180 capsules', serving: '3 capsules', servings: 60, flavour: 'Unflavoured' },
    image: { shape: 'bottle', tone: 'ink', short: 'ZMA' },
    description:
      'A simple, well-understood stack for hard trainers. Zinc and magnesium are both lost through sweat, and both play a role in sleep quality and hormone support.',
  },
  {
    id: 'p-protein-bar',
    name: 'AS Elite Protein Bar Box of 12',
    brand: 'AS Elite',
    category: 'supplements',
    price: 24.99,
    originalPrice: 32.99,
    rating: 4.6,
    reviews: 634,
    badge: 'Best Seller',
    featured: true,
    stock: 84,
    highlights: [
      '20 g of protein and only 2 g of sugar per bar',
      'Genuinely soft texture with a real chocolate coating',
      'Perfect for a meal on the move between sessions',
    ],
    spec: {
      weight: '12 x 60 g',
      serving: '1 bar (60 g)',
      servings: 12,
      flavour: 'Chocolate Caramel',
    },
    image: { shape: 'bar', tone: 'amber', short: 'PROTEIN BAR' },
    description:
      'The bar you keep in the car, the desk drawer and the gym bag. High protein, low sugar, and textured so that it actually tastes like food rather than a protein bar.',
  },
  {
    id: 'p-peanut-butter',
    name: 'PureForm Peanut Butter Protein Spread',
    brand: 'PureForm Labs',
    category: 'supplements',
    price: 12.99,
    originalPrice: 16.99,
    rating: 4.7,
    reviews: 421,
    stock: 126,
    highlights: [
      'Smooth peanut butter with 12 g of added protein per serving',
      'Only two core ingredients, no palm oil and no added sugar',
      'Easy way to add clean calories to toast, oats or shakes',
    ],
    spec: { weight: '500 g', serving: '30 g', servings: 16, flavour: 'Smooth Original' },
    image: { shape: 'jar', tone: 'cream', short: 'PB PROTEIN' },
    description:
      'Real peanut butter, blended with whey protein for a thicker spread and a bigger protein number. Spread it, spoon it, or stir it into your oats.',
  },
  {
    id: 'p-steel-shaker',
    name: 'AS Elite Insulated Steel Shaker 700ml',
    brand: 'AS Elite',
    category: 'gym-accessories',
    price: 17.99,
    originalPrice: 24.99,
    rating: 4.8,
    reviews: 912,
    badge: 'Best Seller',
    featured: true,
    stock: 142,
    highlights: [
      'Double-walled vacuum steel keeps shakes cold for 12 hours',
      'Silicone-sealed lid that genuinely does not leak in a gym bag',
      'Includes a removable mixing ball for lump-free shakes',
    ],
    specs: [
      { label: 'Capacity', value: '700 ml' },
      { label: 'Material', value: '18/8 stainless steel, BPA-free lid' },
      { label: 'Weight', value: '430 g' },
      { label: 'Care', value: 'Hand wash recommended' },
    ],
    image: { shape: 'shaker', tone: 'steel', short: 'SHAKER 700' },
    description:
      'The shaker that finally solves the problem: no leaks, no smell, and a shake that is still cold by the time you finish the last set.',
  },
  {
    id: 'p-lifting-gloves',
    name: 'Peak Athletics Pro Lifting Gloves',
    brand: 'Peak Athletics',
    category: 'gym-accessories',
    price: 19.99,
    originalPrice: 27.99,
    rating: 4.6,
    reviews: 341,
    stock: 97,
    highlights: [
      'Padded leather palms protect against bar calluses',
      'Integrated wrist wrap adds support on pulling days',
      'Breathable mesh backing keeps hands cool',
    ],
    specs: [
      { label: 'Sizes', value: 'S / M / L / XL' },
      { label: 'Material', value: 'Leather palm, mesh backing' },
      { label: 'Weight', value: '110 g per pair' },
      { label: 'Care', value: 'Hand wash, air dry' },
    ],
    image: { shape: 'gloves', tone: 'ink', short: 'PRO GRIP' },
    description:
      'A snug, well-stitched glove with real padding where the bar bites. The wrist wrap give you a little extra support on heavy deadlifts and rows.',
  },
  {
    id: 'p-steel-bottle',
    name: 'Peak Athletics 1L Steel Water Bottle',
    brand: 'Peak Athletics',
    category: 'gym-accessories',
    price: 24.99,
    originalPrice: 32.99,
    rating: 4.7,
    reviews: 268,
    stock: 113,
    highlights: [
      'A full litre so you actually hit your daily water target',
      'Wide mouth fits ice cubes and cleans easily',
      'Powder-coated finish resists scratches and dents',
    ],
    specs: [
      { label: 'Capacity', value: '1 litre' },
      { label: 'Material', value: 'Double-walled stainless steel' },
      { label: 'Weight', value: '560 g' },
      { label: 'Care', value: 'Hand wash the body, lid is dishwasher safe' },
    ],
    image: { shape: 'steelBottle', tone: 'blue', short: 'HYDRO 1L' },
    description:
      'Simple, heavy-duty hydration. Carries a full litre, keeps it cold all session, and the powder coating survives being thrown in the bottom of a bag.',
  },
  {
    id: 'p-dumbbell-set',
    name: 'AS Elite Adjustable Dumbbell Set',
    brand: 'AS Elite',
    category: 'equipment',
    price: 129.99,
    originalPrice: 179.99,
    rating: 4.8,
    reviews: 476,
    badge: 'Best Seller',
    featured: true,
    stock: 24,
    highlights: [
      'Adjusts from 2.5 kg to 24 kg per dumbbell in seconds',
      'Replaces an entire rack of fixed dumbbells',
      'Textured chrome handle with a secure, non-slip grip',
    ],
    specs: [
      { label: 'Weight range', value: '2.5 – 24 kg per dumbbell' },
      { label: 'Increment', value: '2.5 kg plates' },
      { label: 'Material', value: 'Cast iron plates, chrome handle' },
      { label: 'Includes', value: 'Pair of dumbbells and storage tray' },
    ],
    image: { shape: 'dumbbell', tone: 'ink', short: 'ADJUST 24' },
    description:
      'A full dumbbell rack compressed into two handles. Turn the dial, change the weight, keep training — no more rearranging plates between sets.',
  },
  {
    id: 'p-kettlebell',
    name: 'Peak Athletics Cast Iron Kettlebell 16kg',
    brand: 'Peak Athletics',
    category: 'equipment',
    price: 64.99,
    originalPrice: 89.99,
    rating: 4.7,
    reviews: 312,
    stock: 38,
    highlights: [
      'Single-piece cast iron with a smooth, seam-free handle',
      'Flat base sits stable for renegade rows and goblet squats',
      'Powder-coated finish grips well even with sweaty hands',
    ],
    specs: [
      { label: 'Weight', value: '16 kg' },
      { label: 'Material', value: 'Solid cast iron, powder coated' },
      { label: 'Handle', value: '35 mm diameter, textured' },
      { label: 'Base', value: 'Flat, machine-ground' },
    ],
    image: { shape: 'kettlebell', tone: 'ink', short: '16 KG' },
    description:
      'One kettlebell, endless conditioning work. Swings, cleans, presses and carries are all covered by a single piece of well-made iron.',
  },
  {
    id: 'p-hex-dumbbell',
    name: 'AS Elite Hex Dumbbell Pair 20kg',
    brand: 'AS Elite',
    category: 'equipment',
    price: 99.99,
    originalPrice: 139.99,
    rating: 4.6,
    reviews: 224,
    badge: 'Sale',
    stock: 19,
    highlights: [
      'Rubber-encased heads protect floors and stay quiet',
      'Hex shape stops the dumbbell rolling between sets',
      'Knurled chrome handle for a confident grip on heavy presses',
    ],
    specs: [
      { label: 'Weight', value: '20 kg each (40 kg total)' },
      { label: 'Material', value: 'Rubber-encased cast iron' },
      { label: 'Handle', value: '32 mm knurled chrome' },
      { label: 'Warranty', value: '2 years against manufacturing defects' },
    ],
    image: { shape: 'dumbbell', tone: 'steel', short: 'HEX 20' },
    description:
      'Fixed-weight dumbbells that will outlive your programme. The rubber heads keep the noise down and your floor intact when you set them down hard.',
  },
]

/** Categories whose "specs" table describes hardware rather than nutrition. */
const NON_CONSUMABLE = new Set(['gym-accessories', 'equipment'])

/** Turns a raw catalogue entry into the shape every component consumes. */
function buildProduct(raw, index) {
  const template = categoryTemplates[raw.category] ?? {}
  const image = raw.image ?? { shape: 'tub', tone: 'ink', short: 'AS STORE' }
  const discount = discountPercent(raw.price, raw.originalPrice)
  const spec = raw.spec ?? defaultSpec

  const specRows = NON_CONSUMABLE.has(raw.category)
    ? (raw.specs ?? [])
    : [
        { label: 'Net weight', value: spec.weight },
        { label: 'Serving size', value: spec.serving },
        { label: 'Servings per container', value: String(spec.servings) },
        { label: 'Flavour', value: spec.flavour },
      ]

  return {
    ...raw,
    sku: `AS-${String(index + 1).padStart(4, '0')}`,
    slug: slugify(raw.name),
    discount,
    savings: savingsAmount(raw.price, raw.originalPrice),
    onSale: discount > 0,
    badge: raw.badge ?? null,
    featured: Boolean(raw.featured),
    bestSeller: raw.badge === 'Best Seller',
    newArrival: raw.badge === 'New',
    stock: raw.stock ?? 50,
    inStock: (raw.stock ?? 50) > 0,
    popularity: Math.round(raw.reviews * (raw.rating / 5)),
    addedAt: index + 1,
    flavours: raw.flavours ?? template.flavours ?? [],
    benefits: raw.highlights ?? template.benefits ?? [],
    ingredients: raw.ingredients ?? template.ingredients ?? [],
    ingredientsLabel: template.ingredientsLabel ?? 'Ingredients',
    usage: raw.usage ?? template.usage ?? [],
    usageLabel: template.usageLabel ?? 'How to use',
    specRows,
    image,
    /** Four presentation views of the same pack, used by the detail gallery. */
    gallery: [
      { ...image, variant: 'studio' },
      { ...image, variant: 'label' },
      { ...image, variant: 'flat' },
      { ...image, variant: 'duo' },
    ],
  }
}

export const products = RAW_PRODUCTS.map(buildProduct)

const productById = new Map(products.map((product) => [product.id, product]))

export function getProduct(id) {
  return productById.get(String(id)) ?? null
}

export function getProductsByCategory(categorySlug) {
  return products.filter((product) => product.category === categorySlug)
}

export function getProductsByBrand(brand) {
  return products.filter((product) => product.brand === brand)
}

/** Same category first, then anything else sharing a brand. */
export function getRelatedProducts(product, limit = 4) {
  if (!product) return []
  const sameCategory = products.filter(
    (item) => item.category === product.category && item.id !== product.id,
  )
  const sameBrand = products.filter(
    (item) =>
      item.brand === product.brand &&
      item.id !== product.id &&
      !sameCategory.some((entry) => entry.id === item.id),
  )
  return [...sameCategory, ...sameBrand].slice(0, limit)
}

export const featuredProducts = products.filter((product) => product.featured)
export const bestSellers = products.filter((product) => product.bestSeller)
export const newArrivals = products.filter((product) => product.newArrival)
export const saleProducts = products
  .filter((product) => product.onSale)
  .sort((a, b) => b.discount - a.discount)

const allPrices = products.map((product) => product.price)

export const catalogPriceRange = {
  min: Math.floor(Math.min(...allPrices)),
  max: Math.ceil(Math.max(...allPrices)),
}

/** Only brands that actually have stock on the shelf. */
export const catalogBrands = brands.filter((brand) =>
  products.some((product) => product.brand === brand),
)

export default products






