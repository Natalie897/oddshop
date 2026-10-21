import { useEffect, useRef, useState } from 'react'
import { Search, X, ArrowUpRight } from 'lucide-react'
import type { Product } from '../../types/product'

const shopSections = [
  'ALL PRODUCTS',
  'T-SHIRTS',
  'CAPS',
  'BAGS',
]

const infoSections = [
  'CAMPAIGNS',
  'OUR STORY',
  'FAQ',
  'SHIPPING & RETURNS',
]

const socialSections = ['INSTAGRAM', 'TELEGRAM']

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  products?: Product[]
  onNavigate: (section: string) => void
  onProductSelect: (product: Product) => void
}

export default function MobileMenu({
  isOpen,
  onClose,
  products = [],
  onNavigate,
  onProductSelect,
}: MobileMenuProps) {
  const [search, setSearch] = useState('')
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  const query = search.trim().toLowerCase()

  const searchResults = query
    ? products.filter((product) =>
        `${product.name} ${product.category ?? ''}`
          .toLowerCase()
          .includes(query)
      )
    : []

  const selectSection = (section: string) => {
    onNavigate(section)
    onClose()
  }

  const selectProduct = (product: Product) => {
    onProductSelect(product)
    onClose()
  }

  return (
    <div
      className={`fixed inset-0 z-[100] ${
        isOpen
          ? 'visible pointer-events-auto'
          : 'invisible pointer-events-none'
      }`}
      aria-hidden={!isOpen}
    >
      {/* Затемнение страницы */}
      <button
        type="button"
        aria-label="Close navigation"
        onClick={onClose}
        tabIndex={isOpen ? 0 : -1}
        className={`absolute inset-0 bg-black/65 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Боковая панель справа */}
      <aside
        role="dialog"
        aria-modal={isOpen}
        aria-label="ODD navigation"
        className={`absolute inset-y-0 right-0 flex h-full w-full max-w-[390px] flex-col bg-white text-black shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Верхняя часть */}
        <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-6">
          <span className="text-sm font-black uppercase tracking-widest">
            ODD / MENU
          </span>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 transition-opacity hover:opacity-50 focus-visible:outline-2"
          >
            <X size={26} strokeWidth={1.5} />
          </button>
        </div>

        {/* Прокручиваемая область */}
        <div className="flex-1 overflow-y-auto px-6 py-7">
          {/* Поиск */}
          <div className="flex items-center gap-3 border-b border-black pb-3">
            <Search size={21} strokeWidth={1.6} />

            <label htmlFor="odd-product-search" className="sr-only">
              Search ODD products
            </label>

            <input
              id="odd-product-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="SEARCH PRODUCTS..."
              className="w-full bg-transparent text-sm font-semibold text-black outline-none placeholder:text-neutral-500"
            />
          </div>

          {/* Результаты поиска */}
          {query && (
            <section className="mt-5 border-b border-neutral-200 pb-6">
              <p className="mb-4 text-xs font-bold uppercase text-neutral-500">
                SEARCH RESULTS
              </p>

              {products.length === 0 ? (
                <p className="text-sm text-neutral-500">
                  PRODUCT CATALOG NOT CONNECTED YET
                </p>
              ) : searchResults.length === 0 ? (
                <p className="text-sm text-neutral-500">
                  NO PRODUCTS FOUND
                </p>
              ) : (
                <div className="space-y-3">
                  {searchResults.slice(0, 6).map((product) => (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => selectProduct(product)}
                      className="block w-full text-left text-sm font-semibold uppercase hover:text-neutral-500"
                    >
                      {product.name}
                    </button>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Категории магазина */}
          <nav aria-label="Shop categories" className="mt-9">
            <div className="space-y-5">
              {shopSections.map((section) => (
                <button
                  key={section}
                  type="button"
                  onClick={() => selectSection(section)}
                  className="block w-full text-left text-2xl font-black uppercase tracking-tight transition-colors hover:text-neutral-500"
                >
                  {section}
                </button>
              ))}
            </div>
          </nav>

          {/* Информационные разделы */}
          <nav
            aria-label="Information"
            className="mt-9 border-t border-neutral-200 pt-8"
          >
            <div className="space-y-5">
              {infoSections.map((section) => (
                <button
                  key={section}
                  type="button"
                  onClick={() => selectSection(section)}
                  className="block w-full text-left text-base font-bold uppercase transition-colors hover:text-neutral-500"
                >
                  {section}
                </button>
              ))}
            </div>
          </nav>
        </div>

        {/* Социальные сети */}
        <div className="border-t border-neutral-200 px-6 py-6">
          <div className="flex flex-wrap gap-6">
            {socialSections.map((section) => (
              <button
                key={section}
                type="button"
                onClick={() => selectSection(section)}
                className="flex items-center gap-1 text-xs font-black uppercase hover:text-neutral-500"
              >
                {section}
                <ArrowUpRight size={14} />
              </button>
            ))}
          </div>
        </div>
      </aside>
    </div>
  )
}