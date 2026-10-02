/**
 * Shared category copy used to fill in product detail sections, so every
 * product page has full Ingredients / Usage / Benefits content without
 * duplicating the same paragraphs 30 times.
 *
 * Each product overrides `highlights` (its own benefits list) and may override
 * anything else on its record.
 */

export const categoryTemplates = {
  protein: {
    ingredientsLabel: 'Ingredients',
    usageLabel: 'How to use',
    benefits: [
      'Supports lean muscle growth and post-training recovery',
      'Fast-absorbing, low-lactose formula that is easy on the stomach',
      'Dissolves cleanly in water with no clumping or chalky finish',
    ],
    ingredients: [
      'Whey protein isolate (milk)',
      'Whey protein concentrate (milk)',
      'Natural and artificial flavours',
      'Digestive enzyme blend (papain, bromelain)',
      'Soy lecithin',
      'Sucralose, acesulfame potassium',
    ],
    usage: [
      'Add one scoop to 250 ml of cold water or milk.',
      'Shake for 20–30 seconds until completely dissolved.',
      'Take 1–2 servings per day, ideally within 30 minutes of training.',
      'Best consumed fresh — refrigerate if mixed in advance.',
    ],
    flavours: ['Double Chocolate', 'Vanilla Cream', 'Strawberry Milkshake', 'Cookies & Cream'],
  },

  'mass-gainer': {
    ingredientsLabel: 'Ingredients',
    usageLabel: 'How to use',
    benefits: [
      'Packs serious calories into a single, easy-to-drink serving',
      'Combines fast and slow release carbohydrates for sustained fuel',
      'Added creatine and digestive enzymes for better utilisation',
    ],
    ingredients: [
      'Maltodextrin',
      'Whey protein concentrate (milk)',
      'Milk protein isolate',
      'Oat flour',
      'Medium chain triglycerides (coconut oil)',
      'Creatine monohydrate',
      'Vitamin and mineral premix',
    ],
    usage: [
      'Mix one full serving with 400–500 ml of milk or water.',
      'Use a blender or a shaker with a mixing ball for a smooth texture.',
      'Take one serving between meals on training days.',
      'Start with half a serving to assess tolerance.',
    ],
    flavours: ['Chocolate Fudge', 'Vanilla Ice Cream', 'Banana Cream'],
  },

  creatine: {
    ingredientsLabel: 'Ingredients',
    usageLabel: 'How to use',
    benefits: [
      'Increases strength and power output on heavy compound lifts',
      'Supports greater training volume and faster recovery between sets',
      'One of the most researched and safest supplements available',
    ],
    ingredients: [
      'Micronized creatine monohydrate (99.9% pure)',
      'Silicon dioxide (anti-caking agent)',
    ],
    usage: [
      'Take 5 g (one scoop) daily, every day — including rest days.',
      'Mix into water, juice or your protein shake.',
      'No loading phase required, though 20 g per day for 5 days saturates faster.',
      'Drink plenty of water throughout the day.',
    ],
    flavours: ['Unflavoured'],
  },

  'pre-workout': {
    ingredientsLabel: 'Ingredients',
    usageLabel: 'How to use',
    benefits: [
      'Sharp, sustained energy without a harsh crash',
      'Improves focus, blood flow and muscular endurance',
      'Supports bigger pumps and better mind-muscle connection',
    ],
    ingredients: [
      'L-citrulline malate 2:1',
      'Beta-alanine',
      'Caffeine anhydrous',
      'L-theanine',
      'Betaine anhydrous',
      'Taurine',
      'Natural and artificial flavours',
    ],
    usage: [
      'Mix one scoop with 300 ml of cold water.',
      'Drink 20–30 minutes before training.',
      'Start with half a scoop to assess your caffeine tolerance.',
      'Avoid taking within 6 hours of bedtime.',
    ],
    flavours: ['Blue Raspberry', 'Fruit Punch', 'Sour Watermelon', 'Green Apple'],
  },

  vitamins: {
    ingredientsLabel: 'Ingredients',
    usageLabel: 'How to use',
    benefits: [
      'Fills the micronutrient gaps a hard training diet usually leaves behind',
      'Supports immunity, energy metabolism and joint health',
      'Convenient once-a-day dose with no aftertaste',
    ],
    ingredients: [
      'Vitamin and mineral blend (see nutrition panel)',
      'Rice flour',
      'Vegetable cellulose capsule',
      'Magnesium stearate',
    ],
    usage: [
      'Take one serving daily with a meal.',
      'Swallow with a full glass of water.',
      'Do not exceed the recommended daily dose.',
      'Store below 25°C in a cool, dry place.',
    ],
    flavours: [],
  },

  supplements: {
    ingredientsLabel: 'Ingredients',
    usageLabel: 'How to use',
    benefits: [
      'Targeted support for recovery, hydration and daily performance',
      'Premium raw materials with no fillers or proprietary blends',
      'Stacks cleanly with your existing protein and creatine routine',
    ],
    ingredients: [
      'Active amino acid or nutrient blend (see label)',
      'Citric acid',
      'Natural flavours and colours',
      'Stevia leaf extract',
    ],
    usage: [
      'Take one serving per day, before or after training.',
      'Mix with 250–400 ml of cold water.',
      'Use consistently for at least four weeks for best results.',
      'Keep sealed and store away from direct sunlight.',
    ],
    flavours: ['Mixed Berry', 'Lemon Lime', 'Unflavoured'],
  },

  'gym-accessories': {
    ingredientsLabel: 'Materials',
    usageLabel: 'Care instructions',
    benefits: [
      'Built from durable, training-grade materials',
      'Leak-resistant, comfortable and easy to carry',
      'Rinse-clean design with no trapped odours',
    ],
    ingredients: [
      'Food-grade Tritan or 18/8 stainless steel',
      'BPA-free polypropylene lid',
      'Silicone seal and gasket',
      'Textured, sweat-resistant grip panels',
    ],
    usage: [
      'Rinse immediately after every use.',
      'Hand wash the lid and seal to extend gasket life.',
      'Do not place steel components in a microwave.',
      'Air dry fully before re-assembling.',
    ],
    flavours: [],
  },

  equipment: {
    ingredientsLabel: 'Materials & specs',
    usageLabel: 'Care & safety',
    benefits: [
      'Solid build quality that handles progressive overload',
      'Comfortable, secure grip for long working sets',
      'Compact footprint for home or garage training',
    ],
    ingredients: [
      'Cast iron with rubber or urethane encasing',
      'Chrome-plated or powder-coated steel',
      'Knurled or textured grip surface',
      'Anti-roll hex or flat base design',
    ],
    usage: [
      'Inspect for damage before every session.',
      'Keep away from damp floors to prevent corrosion.',
      'Wipe down with a dry cloth after use.',
      'Lift with a controlled tempo and a neutral spine.',
    ],
    flavours: [],
  },
}

/** Sensible fallback specs used when a product does not define its own. */
export const defaultSpec = {
  weight: '2.27 kg',
  serving: '30 g',
  servings: 75,
  flavour: 'Double Chocolate',
}

