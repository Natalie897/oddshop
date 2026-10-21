import { useState } from 'react'
import { ProductCard } from '../components/ProductCard'
import { products } from '../data/products'

type Category = 'all' | 'caps' | 't-shirts' | 'bags'

interface CatalogPageProps {
  onProductClick?: (productId: string) => void
}

const categories: { label: string; value: Category }[] = [
  { label: 'ALL', value: 'all' },
  { label: 'CAPS', value: 'caps' },
  { label: 'T-SHIRTS', value: 't-shirts' },
  { label: 'BAGS', value: 'bags' },
]

export function CatalogPage({ onProductClick }: CatalogPageProps) {
  const [activeCategory, setActiveCategory] = useState<Category>('all')

  const filteredProducts = products.filter(
    (product) =>
      activeCategory === 'all' || product.category === activeCategory,
  )

  return (
    <main className="mx-auto max-w-[1440px] px-4 py-8">
      <h1 className="mb-8 text-2xl font-semibold uppercase">
        ODD MERCH
      </h1>

      <div className="mb-8 flex flex-wrap items-center gap-6">
        {categories.map((category) => (
          <button
            key={category.value}
            type="button"
            onClick={() => setActiveCategory(category.value)}
            aria-pressed={activeCategory === category.value}
            className={`cursor-pointer font-['Barlow_Condensed'] text-[14px] font-semibold uppercase tracking-[0.5px] transition-opacity ${
              activeCategory === category.value
                ? 'border-b border-black text-black'
                : 'text-neutral-500 hover:text-black'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <p className="py-12 text-center font-['Barlow_Condensed'] text-sm text-neutral-500">
          В этой категории пока нет товаров
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-y-12">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => onProductClick?.(product.id)}
            />
          ))}
        </div>
      )}
    </main>
  )
}