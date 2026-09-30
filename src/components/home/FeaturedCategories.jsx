import { Link } from 'react-router-dom'
import { featuredCategories } from '../../data/categories'
import CategoryCard from '../CategoryCard'
import SectionTitle from '../SectionTitle'
import Reveal from '../Reveal'
import Button from '../Button'
import { Icon } from '../Icons'

/** Home-page category grid (six tiles in a 2/3/6 column responsive layout). */
export function FeaturedCategories() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="container-page">
        <Reveal>
          <SectionTitle
            eyebrow="Shop by category"
            title="Find exactly what your training needs"
            description="From everyday whey to heavy-duty home equipment — every category is stocked only with products we would use ourselves."
            action={
              <Button
                to="/categories"
                variant="outline"
                size="sm"
                iconRight={<Icon name="arrowRight" size={15} />}
              >
                All Categories
              </Button>
            }
          />
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 xl:grid-cols-6">
          {featuredCategories.map((category, index) => (
            <Reveal key={category.slug} delay={index * 60}>
              <CategoryCard category={category} showDescription={false} className="h-full" />
            </Reveal>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[0.84rem] text-ink-500">
          <span>Looking for something specific?</span>
          <Link
            to="/shop?category=equipment"
            className="font-semibold text-brand-700 transition hover:text-brand-800"
          >
            Browse home equipment
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedCategories
