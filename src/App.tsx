import { useState } from 'react'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import CartPage from './features/cart/CartPage'

import { CatalogPage } from './features/catalog/pages/CatalogPage'
import { ProductPage } from './features/catalog/pages/ProductPage'
import { products } from './features/catalog/data/products'

import type { Product } from './types/product'

type Page = 'catalog' | 'product' | 'cart'

function App() {
  const [page, setPage] = useState<Page>('catalog')
  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null)

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function openCatalog() {
    setPage('catalog')
    setSelectedProduct(null)
    setIsMenuOpen(false)
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
    window.scrollTo(0, 0)
  }

  function openCart() {
    setPage('cart')
    setIsMenuOpen(false)
    window.scrollTo(0, 0)
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
        onMenuClick={() => setIsMenuOpen((open) => !open)}
        onCartClick={openCart}
      />

      {isMenuOpen && (
        <nav
          aria-label="Main navigation"
          className={`border-b px-6 py-6 ${
            isDark
              ? 'border-neutral-800 bg-black'
              : 'border-neutral-200 bg-white'
          }`}
        >
          <button
            type="button"
            onClick={openCatalog}
            className="block cursor-pointer font-['Barlow_Condensed'] text-xl font-bold uppercase hover:opacity-60"
          >
            ALL PRODUCTS
          </button>

          <button
            type="button"
            onClick={openCart}
            className="mt-4 block cursor-pointer font-['Barlow_Condensed'] text-xl font-bold uppercase hover:opacity-60"
          >
            YOUR BAG
          </button>
        </nav>
      )}

      {page === 'catalog' && (
        <CatalogPage onProductClick={openProduct} />
      )}

      {page === 'product' && selectedProduct && (
        <ProductPage
          key={selectedProduct.id}
          product={selectedProduct}
          onBack={openCatalog}
        />
      )}

      {page === 'cart' && <CartPage />}

      <Footer theme={isDark ? 'dark' : 'light'} />
    </div>
  )
}

export default App