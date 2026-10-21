import { useState } from 'react'
import { ProductCard } from '../components/ProductCard'
import { products } from '../data/products'

export type Category = 'all' | 'caps' | 't-shirts' | 'bags'

interface CatalogPageProps {
  onProductClick?: (productId: string) => void
  selectedCategory?: Category
  onCategoryChange?: (category: Category) => void
}

const categories: { label: string; value: Category }[] = [
  { label: 'ALL', value: 'all' },
  { label: 'CAPS', value: 'caps' },
  { label: 'T-SHIRTS', value: 't-shirts' },
  { label: 'BAGS', value: 'bags' },
]

export function CatalogPage({
  onProductClick,
  selectedCategory,
  onCategoryChange,
}: CatalogPageProps) {
  const [localCategory, setLocalCategory] = useState<Category>('all')

  const activeCategory = selectedCategory ?? localCategory

  function changeCategory(category: Category) {
    if (onCategoryChange) {
      onCategoryChange(category)
    } else {
      setLocalCategory(category)
    }
  }

  const filteredProducts = products.filter(
    (product) =>
      activeCategory === 'all' || product.category === activeCategory,
  )

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-[1440px] px-5 pb-16 pt-6 md:px-9">
        {/* Фильтры и сортировка */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-5">
          <nav
            aria-label="Product categories"
            className="flex flex-wrap items-center gap-6 md:gap-9"
          >
            {categories.map((category) => (
              <button
                key={category.value}
                type="button"
                onClick={() => changeCategory(category.value)}
                aria-pressed={activeCategory === category.value}
                className={`cursor-pointer border-b pb-1 font-['Barlow_Condensed'] text-[14px] font-bold uppercase transition-colors ${
                  activeCategory === category.value
                    ? 'border-black text-black'
                    : 'border-transparent text-neutral-700 hover:text-black'
                }`}
              >
                {category.label}
                {category.value === 'all' && ` (${products.length})`}
              </button>
            ))}
          </nav>

          <span className="font-['Barlow_Condensed'] text-[11px] uppercase tracking-wide text-neutral-500">
            SORT: NEWEST ↓
          </span>
        </div>

        {/* Сетка товаров */}
        {filteredProducts.length === 0 ? (
          <p className="py-12 text-center font-['Barlow_Condensed'] text-sm text-neutral-500">
            NO PRODUCTS IN THIS CATEGORY
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
      </div>
    </main>
  )
}