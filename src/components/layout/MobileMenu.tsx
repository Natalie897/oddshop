
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
  'FAQ',
  'SHIPPING & RETURNS',
]

const socialSections = [
  {
    label: 'INSTAGRAM',
    url: 'https://www.instagram.com/odd.moscow/',
  },
  {
    label: 'TELEGRAM',
    url: 'https://t.me/odd_clothes',
  },
]

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
  const dialogRef = useRef<HTMLElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isOpen) return

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    closeButtonRef.current?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab') return

      const dialog = dialogRef.current
      if (!dialog) return

      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), a[href]'
        )
      ).filter(
        (element) =>
          element.getClientRects().length > 0
      )

      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (
        event.shiftKey &&
        document.activeElement === first
      ) {
        event.preventDefault()
        last.focus()
      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
      previousFocusRef.current?.focus()
    }
  }, [isOpen, onClose])

  const query = search.trim().toLowerCase()

  const searchResults = query
    ? products.filter((product) =>
        `${product.name} ${product.category ?? ''} ${product.sku ?? ''}`
          .toLowerCase()
          .includes(query)
      )
    : []

  function selectSection(section: string) {
    onNavigate(section)
    onClose()
  }

  function selectProduct(product: Product) {
    onProductSelect(product)
    onClose()
  }

  return (
    <div
      className={
        'fixed inset-0 z-[100] transition-visibility duration-300 ' +
        (isOpen
          ? 'visible pointer-events-auto'
          : 'invisible pointer-events-none')
      }
      aria-hidden={!isOpen}
    >
      <aside
        ref={dialogRef}
        role="dialog"
        aria-modal={isOpen ? true : undefined}
        aria-label="ODD navigation"
        className={
          'absolute inset-0 flex h-full w-full flex-col bg-black text-white transition-transform duration-300 ease-in-out motion-reduce:transition-none ' +
          (isOpen ? 'translate-x-0' : 'translate-x-full')
        }
      >
        {/* MENU HEADER */}
        <div className="flex shrink-0 items-center justify-between border-b border-neutral-800 px-6 py-6">
          <span className="font-['Barlow_Condensed'] text-xl font-black uppercase tracking-wide">
            ODD / MENU
          </span>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-11 w-11 items-center justify-center transition-opacity hover:opacity-50"
          >
            <X size={30} strokeWidth={1.5} />
          </button>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-7">
          {/* SEARCH */}
          <div className="flex items-center gap-3 border-b border-white pb-3">
            <Search size={22} strokeWidth={1.6} />

            <label
              htmlFor="odd-mobile-search"
              className="sr-only"
            >
              Search ODD products
            </label>

            <input
              id="odd-mobile-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="SEARCH PRODUCTS..."
              className="min-w-0 w-full bg-transparent font-['Barlow_Condensed'] text-base font-bold uppercase text-white outline-none placeholder:text-neutral-500"
            />
          </div>

          {/* SEARCH RESULTS */}
          {query && (
            <section className="mt-6 border-b border-neutral-700 pb-6">
              <p className="mb-4 font-['Barlow_Condensed'] text-xs font-bold uppercase text-neutral-400">
                SEARCH RESULTS
              </p>

              {searchResults.length === 0 ? (
                <p className="text-sm text-neutral-400">
                  NO PRODUCTS FOUND
                </p>
              ) : (
                <div className="space-y-4">
                  {searchResults.slice(0, 6).map((product) => (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => selectProduct(product)}
                      className="block w-full text-left font-['Barlow_Condensed'] text-lg font-bold uppercase transition-opacity hover:opacity-50"
                    >
                      {product.name}
                    </button>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* SHOP LINKS */}
          <nav aria-label="Shop categories" className="mt-9">
            <div className="flex flex-col gap-5">
              {shopSections.map((section) => (
                <button
                  key={section}
                  type="button"
                  onClick={() => selectSection(section)}
                  className="w-full text-left font-['Barlow_Condensed'] text-[32px] font-black uppercase leading-none tracking-tight transition-opacity hover:opacity-50"
                >
                  {section}
                </button>
              ))}
            </div>
          </nav>

          {/* INFO LINKS */}
          <nav
            aria-label="Information"
            className="mt-10 border-t border-neutral-700 pt-8"
          >
            <div className="flex flex-col gap-5">
              {infoSections.map((section) => (
                <button
                  key={section}
                  type="button"
                  onClick={() => selectSection(section)}
                  className="w-full text-left font-['Barlow_Condensed'] text-[19px] font-bold uppercase transition-opacity hover:opacity-50"
                >
                  {section}
                </button>
              ))}
            </div>
          </nav>
        </div>

        
 

        {/* SOCIAL LINKS */}
        <div className="shrink-0 border-t border-neutral-800 px-6 py-6 pb-[max(24px,env(safe-area-inset-bottom))]">
          <div className="flex flex-wrap gap-7">
            {socialSections.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="flex items-center gap-1 font-['Barlow_Condensed'] text-sm font-semibold uppercase text-white transition-opacity hover:opacity-50"
              >
                {social.label}
                <ArrowUpRight size={15} />
              </a>
            ))}
          </div>
        </div>
      </aside>
    </div>
  )
}

