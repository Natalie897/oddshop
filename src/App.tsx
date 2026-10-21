import { useState } from 'react'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import MobileMenu from './components/layout/MobileMenu'

import CartPage from './features/cart/CartPage'
import { useCartStore } from './features/cart/store/useCartStore'

import { CatalogPage } from './features/catalog/pages/CatalogPage'
import type { Category } from './features/catalog/pages/CatalogPage'
import { ProductPage } from './features/catalog/pages/ProductPage'
import { products } from './features/catalog/data/products'

import type { Product } from './types/product'

type Page = 'catalog' | 'product' | 'cart'

const menuCategories: Partial<Record<string, Category>> = {
  'ALL PRODUCTS': 'all',
  'T-SHIRTS': 't-shirts',
  CAPS: 'caps',
  BAGS: 'bags',
}

function App() {
  const [page, setPage] = useState<Page>('catalog')

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null)

  const [catalogCategory, setCatalogCategory] =
    useState<Category>('all')

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [menuNotice, setMenuNotice] = useState<string | null>(null)

  const addItem = useCartStore((state) => state.addItem)

  function openCatalog() {
    setPage('catalog')
    setSelectedProduct(null)
    setIsMenuOpen(false)
    setMenuNotice(null)
    window.scrollTo(0, 0)
  }

  function openProduct(productId: string) {
    const product = products.find(
      (item) => item.id === productId
    )

    if (!product) return

    setSelectedProduct(product)
    setPage('product')
    setIsMenuOpen(false)
    setMenuNotice(null)
    window.scrollTo(0, 0)
  }

  function openCart() {
    setPage('cart')
    setIsMenuOpen(false)
    setMenuNotice(null)
    window.scrollTo(0, 0)
  }

  function handleAddToBag(product: Product, size?: string) {
    if (product.price === null) return

    addItem(product, size)
    openCart()
  }

  function handleMenuNavigate(section: string) {
    const category = menuCategories[section]

    if (category) {
      setCatalogCategory(category)
      openCatalog()
      return
    }

    // Информационные разделы пока не реализованы
    setMenuNotice(`${section} — COMING SOON`)
  }

  const isDark = page !== 'catalog'

  return (
    <div
      className={`min-h-screen ${
        isDark
          ? 'bg-black text-white'
          : 'bg-white text-black'
      }`}
    >
      <Header
        theme={isDark ? 'dark' : 'light'}
        onMenuClick={() => setIsMenuOpen(true)}
        onCartClick={openCart}
      />

      {menuNotice && (
        <p
          role="status"
          className="bg-neutral-900 px-5 py-3 text-center text-xs font-bold uppercase text-white"
        >
          {menuNotice}
        </p>
      )}

      {page === 'catalog' && (
        <CatalogPage
          selectedCategory={catalogCategory}
          onCategoryChange={setCatalogCategory}
          onProductClick={openProduct}
        />
      )}

      {page === 'product' && selectedProduct && (
        <ProductPage
          key={selectedProduct.id}
          product={selectedProduct}
          onBack={openCatalog}
          onAddToBag={handleAddToBag}
        />
      )}

      {page === 'cart' && <CartPage />}

      <Footer theme={isDark ? 'dark' : 'light'} />

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        products={products}
        onNavigate={handleMenuNavigate}
        onProductSelect={(product) => openProduct(product.id)}
      />
    </div>
  )
}

export default App