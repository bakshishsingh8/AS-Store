import { Link } from 'react-router-dom'
import { categories, getCategory } from '../data/categories'
import { getProductsByCategory } from '../data/products'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

import Breadcrumbs from '../components/Breadcrumbs'
import Button from '../components/Button'
import CategoryCard from '../components/CategoryCard'
import ProductGrid from '../components/ProductGrid'
import Reveal from '../components/Reveal'
import SectionTitle from '../components/SectionTitle'
import NewsletterBand from '../components/home/NewsletterBand'
import { Icon } from '../components/Icons'

const GOALS = [
  {
    icon: 'dumbbell',
    title: 'Build muscle',
    copy: 'Calorie-dense gainers and high-protein staples for a proper surplus.',
    to: '/shop?category=mass-gainer',
  },
  {
    icon: 'pulse',
    title: 'Get stronger',
    copy: 'Creatine monohydrate — the most researched strength supplement there is.',
    to: '/shop?category=creatine',
  },
  {
    icon: 'flame',
    title: 'Train harder',
    copy: 'Pre-workouts for energy, focus and pumps on the days that matter.',
    to: '/shop?category=pre-workout',
  },
  {
    icon: 'refresh',
    title: 'Recover faster',
    copy: 'Aminos, vitamins and snacks that keep you ready for the next session.',
    to: '/shop?category=supplements',
  },
]

const SPOTLIGHT = ['protein', 'creatine', 'pre-workout']

/** Full catalogue index: every category, shop-by-goal shortcuts and previews. */
export function Categories() {
  useDocumentTitle('Shop by Category')

  return (
    <div className="bg-white">
      <div className="border-b border-ink-100 bg-ink-50/70">
        <div className="container-page py-8 lg:py-10">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Categories' }]} />
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-ink-900 sm:text-3xl">
                Shop by Category
              </h1>
              <p className="mt-2 max-w-xl text-[0.94rem] text-ink-500">
                Everything we stock, sorted the way you train. Pick a category to jump straight into
                a filtered shop.
              </p>
            </div>
            <Button to="/shop" variant="outline" iconRight={<Icon name="arrowRight" size={16} />}>
              Browse everything
            </Button>
          </div>
        </div>
      </div>

      {/* Category grid */}
      <div className="container-page py-10 lg:py-14">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => (
            <Reveal key={category.slug}>
              <CategoryCard
                category={{ ...category, count: getProductsByCategory(category.slug).length }}
              />
            </Reveal>
          ))}
        </div>

        {/* Shop by goal */}
        <section className="mt-16">
          <SectionTitle
            eyebrow="Not sure where to start?"
            title="Shop by goal"
            description="Four straightforward routes into the catalogue — pick the outcome you are chasing."
          />
          <div className="mt-8 grid gap-4 sm:gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {GOALS.map((goal) => (
              <Reveal key={goal.title}>
                <Link
                  to={goal.to}
                  className="flex h-full flex-col rounded-2xl border border-ink-100 bg-ink-50/70 p-6 transition duration-300 hover:border-brand-200 hover:bg-white hover:shadow-card"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-brand-700 shadow-card">
                    <Icon name={goal.icon} size={21} />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-ink-900">{goal.title}</h3>
                  <p className="mt-2 flex-1 text-[0.88rem] leading-relaxed text-ink-500">
                    {goal.copy}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                    Explore
                    <Icon name="arrowRight" size={15} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Preview rails */}
        {SPOTLIGHT.map((slug) => {
          const category = getCategory(slug)
          if (!category) return null
          const items = getProductsByCategory(slug).slice(0, 4)
          if (!items.length) return null

          return (
            <section key={slug} className="mt-16">
              <SectionTitle
                eyebrow={category.tagline}
                title={`Popular in ${category.name}`}
                description={category.description}
                action={
                  <Button to={`/shop?category=${slug}`} variant="outline" size="sm">
                    View all {category.name}
                  </Button>
                }
              />
              <ProductGrid products={items} columns={4} className="mt-8" />
            </section>
          )
        })}
      </div>

      <NewsletterBand />
    </div>
  )
}

export default Categories
