import { useState } from 'react'
import { ProductCard } from '../components/ProductCard'
import { products } from '../data/products'

export type Category = 'all' | 'caps' | 't-shirts' | 'bags'

type SortOption =
  | 'default'
  | 'price-asc'
  | 'price-desc'
  | 'name-asc'


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
  const [sortBy, setSortBy] = useState<SortOption>('default')

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
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc' || sortBy === 'price-desc') {
      // Товары без цены всегда располагаются в конце
      if (a.price === null && b.price === null) return 0
      if (a.price === null) return 1
      if (b.price === null) return -1

      return sortBy === 'price-asc'
        ? a.price - b.price
        : b.price - a.price
    }

    if (sortBy === 'name-asc') {
      return a.name.localeCompare(b.name)
    }

    return 0
  })

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-[1440px] px-5 pb-16 pt-6 md:px-9">
        {/* Фильтры и сортировка */}
        <div className="flex flex-wrap items-center justify-between gap-5">
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

          <div className="flex items-center gap-2 font-['Barlow_Condensed']">
            <label
              htmlFor="catalog-sort"
              className="text-[11px] font-bold uppercase tracking-wide text-neutral-500"
            >
              SORT:
            </label>

            <select
              id="catalog-sort"
              value={sortBy}
              onChange={(event) =>
                setSortBy(event.target.value as SortOption)
              }
              className="cursor-pointer border-b border-black bg-white px-1 py-1 text-[12px] font-bold uppercase text-black outline-offset-2"
            >
              <option value="default">DEFAULT</option>
              <option value="price-asc">PRICE: LOW TO HIGH</option>
              <option value="price-desc">PRICE: HIGH TO LOW</option>
              <option value="name-asc">NAME: A-Z</option>
            </select>
          </div>
        </div>

        {/* Сетка товаров */}
        {filteredProducts.length === 0 ? (
          <p className="py-12 text-center font-['Barlow_Condensed'] text-sm text-neutral-500">
            NO PRODUCTS IN THIS CATEGORY
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-y-12">
            {sortedProducts.map((product) => (
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