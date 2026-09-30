/**
 * Global, frontend-only store configuration: navigation, footer content,
 * contact details and the mock checkout + promo rules.
 * Swap these for API responses later without touching component code.
 */

export const site = {
  name: 'AS Store',
  tagline: 'Fuel Your Performance',
  email: 'support@asstore.com',
  salesEmail: 'orders@asstore.com',
  phone: '+1 (415) 555-0148',
  whatsapp: '+1 (415) 555-0172',
  address: 'Unit 12, Ironworks Business Park, 240 Foundry Road, Springfield, IL 62704',
  hours: [
    { day: 'Monday – Friday', time: '8:00 – 20:00' },
    { day: 'Saturday', time: '9:00 – 18:00' },
    { day: 'Sunday', time: '10:00 – 16:00' },
  ],
}

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Categories', to: '/categories' },
  { label: 'Offers', to: '/offers' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export const footerColumns = [
  {
    title: 'Quick Links',
    links: [
      { label: 'Home', to: '/' },
      { label: 'Shop All', to: '/shop' },
      { label: 'Categories', to: '/categories' },
      { label: 'Offers & Deals', to: '/offers' },
      { label: 'About Us', to: '/about' },
    ],
  },
  {
    title: 'Shop',
    links: [
      { label: 'Protein', to: '/shop?category=protein' },
      { label: 'Mass Gainers', to: '/shop?category=mass-gainer' },
      { label: 'Creatine', to: '/shop?category=creatine' },
      { label: 'Pre-Workout', to: '/shop?category=pre-workout' },
      { label: 'Vitamins', to: '/shop?category=vitamins' },
      { label: 'Gym Accessories', to: '/shop?category=gym-accessories' },
    ],
  },
  {
    title: 'Customer Support',
    links: [
      { label: 'Contact Us', to: '/contact' },
      { label: 'Shipping Information', to: '/contact#shipping' },
      { label: 'Returns & Refunds', to: '/contact#returns' },
      { label: 'Track Your Order', to: '/contact#tracking' },
      { label: 'FAQ', to: '/contact#faq' },
      { label: 'My Account', to: '/login' },
    ],
  },
]

export const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
  { label: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
  { label: 'X', href: 'https://x.com', icon: 'x' },
  { label: 'YouTube', href: 'https://youtube.com', icon: 'youtube' },
]

export const paymentMethods = ['Visa', 'Mastercard', 'Amex', 'PayPal', 'Apple Pay']

/** Checkout rules for the mock cart (all frontend only). */
export const shippingRules = {
  freeShippingThreshold: 60,
  standardRate: 4.99,
  expressRate: 12.99,
  taxRate: 0.05,
}

/** Promo codes the cart accepts. Frontend only — nothing is charged. */
export const promoCodes = [
  { code: 'ASFIT10', type: 'percent', value: 10, label: '10% off your order', minimumSpend: 0 },
  {
    code: 'ASBULK15',
    type: 'percent',
    value: 15,
    label: '15% off orders over $150',
    minimumSpend: 150,
  },
  { code: 'FREESHIP', type: 'shipping', value: 100, label: 'Free delivery', minimumSpend: 0 },
]

export const offers = [
  {
    code: 'ASFIT10',
    title: '10% Off Everything',
    description: 'Use on your first order and take 10% off the whole basket, including sale items.',
    highlight: '10% OFF',
    accent: 'brand',
    minimumSpend: 0,
  },
  {
    code: 'ASBULK15',
    title: '15% Off Bulk Orders',
    description: 'Stock up on protein, gainers and creatine together and save on the full order.',
    highlight: '15% OFF',
    accent: 'ink',
    minimumSpend: 150,
  },
  {
    code: 'FREESHIP',
    title: 'Free Delivery, No Minimum',
    description: 'Use at checkout on any order this month and we will cover the shipping.',
    highlight: 'FREE SHIP',
    accent: 'amber',
    minimumSpend: 0,
  },
]

export const whyChooseUs = [
  {
    icon: 'shield',
    title: '100% Genuine Products',
    description:
      'Every item is sourced from the manufacturer or an authorised distributor, with batch codes you can verify.',
  },
  {
    icon: 'truck',
    title: 'Fast, Tracked Delivery',
    description:
      'Dispatched the same working day with free standard shipping over $60 and live tracking door to door.',
  },
  {
    icon: 'lock',
    title: 'Secure Shopping',
    description:
      'Encrypted checkout, no card details stored on our servers, and buyer protection on every order.',
  },
  {
    icon: 'verified',
    title: 'Quality Guaranteed',
    description:
      'Third-party lab tested for purity and label accuracy. If a product is not right, we replace it.',
  },
  {
    icon: 'support',
    title: 'Expert Support',
    description:
      'Real advice from qualified nutrition coaches, not a chatbot — by phone, email or live chat seven days a week.',
  },
  {
    icon: 'refresh',
    title: 'Easy 30-Day Returns',
    description:
      'Unopened products can be returned within 30 days for a full refund. Wrong flavour? We will swap it.',
  },
]

export const missionValues = [
  {
    icon: 'target',
    title: 'Our Mission',
    description:
      'To make genuinely effective, honestly labelled supplements accessible to everyone who trains — from first-time lifters to competing athletes — at a price that respects their budget.',
  },
  {
    icon: 'eye',
    title: 'Our Vision',
    description:
      'To become the most trusted sports nutrition store in the country, measured not by volume sold but by how many customers choose to stay with us for years.',
  },
  {
    icon: 'heart',
    title: 'Our Philosophy',
    description:
      'Supplements support a good programme, they never replace one. We stock the essentials that are backed by real evidence and tell you honestly when you do not need something.',
  },
  {
    icon: 'badge',
    title: 'Our Commitment',
    description:
      'Every batch is third-party tested for purity and label accuracy. If a certificate is out of date, that product does not go on the shelf.',
  },
]

export const aboutMilestones = [
  {
    year: '2016',
    title: 'Where it started',
    description:
      'AS Store began as a single counter inside a family gym, selling three protein blends to members who could not find honest labelling anywhere else.',
  },
  {
    year: '2019',
    title: 'Online and nationwide',
    description:
      'We launched the online store and moved into a purpose-built warehouse, cutting out two layers of middlemen in the process.',
  },
  {
    year: '2022',
    title: 'Own label launched',
    description:
      'AS Elite was developed with a certified manufacturer so we could control the formula, the dosage and the price from start to finish.',
  },
  {
    year: '2026',
    title: 'A community, not a shop',
    description:
      'Over 48,000 orders delivered, a coaching team answering real questions daily, and a catalogue that only grows when the evidence does.',
  },
]

export const faqs = [
  {
    question: 'How quickly will my order arrive?',
    answer:
      'Orders placed before 4pm on a working day are dispatched the same day. Standard delivery takes 2–4 working days and express arrives the next working day. You will receive a tracking link by email as soon as your parcel leaves our warehouse.',
  },
  {
    question: 'Are your supplements genuine and lab tested?',
    answer:
      'Yes. We buy directly from manufacturers or their authorised distributors only, and every batch is third-party tested for purity, heavy metals and label accuracy. Batch certificates are available on request.',
  },
  {
    question: 'What is your returns policy?',
    answer:
      'Unopened products in their original packaging can be returned within 30 days for a full refund. If a product arrives damaged or the seal is broken, contact us within 48 hours and we will replace it at our cost.',
  },
  {
    question: 'Do you ship internationally?',
    answer:
      'We currently ship to 62 cities nationwide. International shipping is available on request for bulk and team orders — contact our sales team for a quote before placing the order.',
  },
  {
    question: 'Can I change or cancel my order?',
    answer:
      'If your order has not yet been dispatched you can change or cancel it from your account page or by contacting support. Once a parcel is with the courier it becomes a return.',
  },
  {
    question: 'Do you offer guidance on which products to take?',
    answer:
      'Our support team includes qualified nutrition coaches. Tell us your goal, schedule and budget and we will recommend a simple stack — including telling you what you do not need.',
  },
]

export default site

