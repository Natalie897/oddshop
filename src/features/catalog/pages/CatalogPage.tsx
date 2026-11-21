
import { useState } from 'react'
import { Filter, Search, X } from 'lucide-react'
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

const sortOptions: { label: string; value: SortOption }[] = [
  { label: 'DEFAULT', value: 'default' },
  { label: 'PRICE: LOW TO HIGH', value: 'price-asc' },
  { label: 'PRICE: HIGH TO LOW', value: 'price-desc' },
  { label: 'NAME: A-Z', value: 'name-asc' },
]

export function CatalogPage({
  onProductClick,
  selectedCategory,
  onCategoryChange,
}: CatalogPageProps) {
  const [localCategory, setLocalCategory] = useState<Category>('all')
  const [filterOpen, setFilterOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('default')

  const activeCategory = selectedCategory ?? localCategory

  function changeCategory(category: Category) {
    if (onCategoryChange) {
      onCategoryChange(category)
    } else {
      setLocalCategory(category)
    }

    setFilterOpen(false)
  }

  const query = searchQuery.trim().toLowerCase()

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === 'all' ||
      product.category === activeCategory

    const matchesSearch =
      query === '' ||
      product.name.toLowerCase().includes(query) ||
      (product.sku?.toLowerCase().includes(query) ?? false)

    return matchesCategory && matchesSearch
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc' || sortBy === 'price-desc') {
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

  const sortControl = (
    <div className="flex items-center gap-2 font-['Barlow_Condensed']">
      <label
        htmlFor="catalog-sort"
        className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500"
      >
        SORT:
      </label>

      <select
        id="catalog-sort"
        value={sortBy}
        onChange={(event) =>
          setSortBy(event.target.value as SortOption)
        }
        className="min-w-0 max-w-full cursor-pointer border-b border-black bg-white px-1 py-2 text-[12px] font-semibold uppercase text-black outline-offset-2"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )

  return (
    <main className="min-h-screen overflow-x-clip bg-white text-black">
      <div className="mx-auto max-w-[1440px] px-4 pb-20 pt-4 sm:px-5 md:px-9 md:pt-6">

        {/* MOBILE SEARCH AND FILTER */}
        <div className="mb-12 md:hidden">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => {
                setSearchOpen(!searchOpen)
                setFilterOpen(false)
              }}
              aria-label="Search products"
              aria-expanded={searchOpen}
              className="flex h-11 w-11 items-center justify-center"
            >
              {searchOpen ? (
                <X size={23} strokeWidth={1.5} />
              ) : (
                <Search size={23} strokeWidth={1.5} />
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setFilterOpen(!filterOpen)
                setSearchOpen(false)
              }}
              aria-label="Filter products"
              aria-expanded={filterOpen}
              className="flex h-11 w-11 items-center justify-center"
            >
              <Filter size={23} strokeWidth={1.5} />
            </button>
          </div>

          {/* MOBILE SEARCH */}
          {searchOpen && (
            <div className="mt-4 border-b border-black pb-2">
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="SEARCH PRODUCTS"
                aria-label="Search products"
                autoFocus
                className="w-full bg-transparent font-['Barlow_Condensed'] text-base uppercase outline-none placeholder:text-neutral-400"
              />
            </div>
          )}

          {/* MOBILE FILTER */}
          {filterOpen && (
            <div className="mt-4 border-t border-neutral-200 pt-4">
              <nav
                aria-label="Mobile product categories"
                className="flex flex-wrap gap-x-5 gap-y-3"
              >
                {categories.map((category) => (
                  <button
                    key={category.value}
                    type="button"
                    onClick={() => changeCategory(category.value)}
                    aria-pressed={activeCategory === category.value}
                    className={
                      "font-['Barlow_Condensed'] text-sm font-bold uppercase " +
                      (activeCategory === category.value
                        ? 'text-black underline underline-offset-4'
                        : 'text-neutral-500')
                    }
                  >
                    {category.label}
                  </button>
                ))}
              </nav>

              <div className="mt-6">
                {sortControl}
              </div>
            </div>
          )}
        </div>

        {/* DESKTOP CATEGORIES AND SORT */}
        <div className="mb-10 hidden items-center justify-between gap-5 md:flex">
          <nav
            aria-label="Product categories"
            className="flex flex-wrap items-center gap-9"
          >
            {categories.map((category) => (
              <button
                key={category.value}
                type="button"
                onClick={() => changeCategory(category.value)}
                aria-pressed={activeCategory === category.value}
                className={
                  "cursor-pointer border-b pb-1 font-['Barlow_Condensed'] text-[14px] font-bold uppercase transition-colors " +
                  (activeCategory === category.value
                    ? 'border-black text-black'
                    : 'border-transparent text-neutral-700 hover:text-black')
                }
              >
                {category.label}
                {category.value === 'all' && ` (${products.length})`}
              </button>
            ))}
          </nav>

          {sortControl}
        </div>

        {/* PRODUCT GRID */}
        {sortedProducts.length === 0 ? (
          <p className="py-12 text-center font-['Barlow_Condensed'] text-sm uppercase text-neutral-500">
            NO PRODUCTS FOUND
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-x-3 gap-y-16 sm:gap-x-4 md:grid-cols-3 md:gap-x-6 md:gap-y-12">
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
