import { useState } from 'react'
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom'

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

const menuCategories: Partial<Record<string, Category>> = {
  'ALL PRODUCTS': 'all',
  'T-SHIRTS': 't-shirts',
  CAPS: 'caps',
  BAGS: 'bags',
}

interface ProductRouteProps {
  onBack: () => void
  onAddToBag: (product: Product, size?: string) => void
}

function ProductRoute({
  onBack,
  onAddToBag,
}: ProductRouteProps) {
  const { productId } = useParams()

  const product = products.find(
    (item) => item.id === productId
  )

  if (!product) {
    return <Navigate to="/catalog" replace />
  }

  return (
    <ProductPage
      key={product.id}
      product={product}
      onBack={onBack}
      onAddToBag={onAddToBag}
    />
  )
}

function App() {
  const navigate = useNavigate()
  const location = useLocation()

  const [catalogCategory, setCatalogCategory] =
    useState<Category>('all')

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [menuNotice, setMenuNotice] = useState<string | null>(null)

  const addItem = useCartStore((state) => state.addItem)

  function openCatalog() {
    setIsMenuOpen(false)
    setMenuNotice(null)
    navigate('/catalog')
    window.scrollTo(0, 0)
  }

  function openProduct(productId: string) {
    if (!products.some((item) => item.id === productId)) return

    setIsMenuOpen(false)
    setMenuNotice(null)
    navigate(`/product/${encodeURIComponent(productId)}`)
    window.scrollTo(0, 0)
  }

  function openCart() {
    setIsMenuOpen(false)
    setMenuNotice(null)
    navigate('/cart')
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

    setMenuNotice(`${section} — COMING SOON`)
  }

  const isDark =
    location.pathname === '/cart' ||
    location.pathname.startsWith('/product/')

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

      <Routes>
        <Route
          path="/"
          element={<Navigate to="/catalog" replace />}
        />

        <Route
          path="/catalog"
          element={
            <CatalogPage
              selectedCategory={catalogCategory}
              onCategoryChange={setCatalogCategory}
              onProductClick={openProduct}
            />
          }
        />

        <Route
          path="/product/:productId"
          element={
            <ProductRoute
              onBack={openCatalog}
              onAddToBag={handleAddToBag}
            />
          }
        />

        <Route
          path="/cart"
          element={<CartPage />}
        />

        <Route
          path="*"
          element={<Navigate to="/catalog" replace />}
        />
      </Routes>

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