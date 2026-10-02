import { useMemo, useState } from 'react'
import { products } from '../../data/products'
import ProductGrid from '../ProductGrid'
import SectionTitle from '../SectionTitle'
import Reveal from '../Reveal'
import Button from '../Button'
import { Icon } from '../Icons'

const TABS = [
  { id: 'all', label: 'All Products' },
  { id: 'protein', label: 'Protein' },
  { id: 'creatine', label: 'Creatine' },
  { id: 'pre-workout', label: 'Pre-Workout' },
  { id: 'vitamins', label: 'Vitamins' },
  { id: 'supplements', label: 'Snacks & Aminos' },
]

/** Tabbed product grid showcasing eight items at a time. */
export function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState('all')

  const visible = useMemo(() => {
    const pool =
      activeTab === 'all'
        ? products.filter((product) => product.featured)
        : products.filter((product) => product.category === activeTab)

    return [...pool]
      .sort(
        (a, b) =>
          Number(b.featured) - Number(a.featured) ||
          Number(b.bestSeller) - Number(a.bestSeller) ||
          b.rating - a.rating,
      )
      .slice(0, 8)
  }, [activeTab])

  return (
    <section className="bg-ink-50/70 py-16 lg:py-20">
      <div className="container-page">
        <Reveal>
          <SectionTitle
            eyebrow="Handpicked"
            title="Featured products this week"
            description="The products our customers keep coming back for, across every category we stock."
            action={
              <Button
                to="/shop"
                variant="outline"
                size="sm"
                iconRight={<Icon name="arrowRight" size={15} />}
              >
                Shop All
              </Button>
            }
          />
        </Reveal>

        <Reveal className="mt-8">
          <div
            className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0"
            role="tablist"
            aria-label="Featured product categories"
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className={`shrink-0 rounded-full border px-4 py-2 text-[0.84rem] font-semibold transition duration-200 ${
                    isActive
                      ? 'border-ink-950 bg-ink-950 text-white'
                      : 'border-ink-200 bg-white text-ink-600 hover:border-ink-300 hover:text-ink-900'
                  }`}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>
        </Reveal>

        <ProductGrid products={visible} columns={4} className="mt-8" priorityCount={4} />
      </div>
    </section>
  )
}

export default FeaturedProducts
