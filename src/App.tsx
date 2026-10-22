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

import { CatalogPage } from './features/catalog/pages/CatalogPage'
import type { Category } from './features/catalog/pages/CatalogPage'
import { ProductPage } from './features/catalog/pages/ProductPage'
import { products } from './features/catalog/data/products'

const menuCategories: Partial<Record<string, Category>> = {
  'ALL PRODUCTS': 'all',
  'T-SHIRTS': 't-shirts',
  CAPS: 'caps',
  BAGS: 'bags',
}

function ProductRoute({ onBack }: { onBack: () => void }) {
  const { productId } = useParams<{ productId: string }>()

  const product = products.find(
    (item) => item.id === productId
  )

  if (!product) {
    return <Navigate to="/" replace />
  }

  return (
    <ProductPage
      key={product.id}
      product={product}
      onBack={onBack}
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

  const isDark =
    location.pathname === '/cart' ||
    location.pathname.startsWith('/product/')

  function openCatalog() {
    setIsMenuOpen(false)
    setMenuNotice(null)
    navigate('/')
    window.scrollTo(0, 0)
  }

  function openProduct(productId: string) {
    if (!products.some((item) => item.id === productId)) {
      return
    }

    setIsMenuOpen(false)
    setMenuNotice(null)

    navigate(`/product/$DIL0`)
    window.scrollTo(0, 0)
  }

  function openCart() {
    setIsMenuOpen(false)
    setMenuNotice(null)
    navigate('/cart')
    window.scrollTo(0, 0)
  }

  function handleMenuNavigate(section: string) {
    const category = menuCategories[section]

    if (category) {
      setCatalogCategory(category)
      openCatalog()
      return
    }

    setMenuNotice(`$DIL1 - COMING SOON`)
    setIsMenuOpen(false)
  }

  return (
    <div
      className={`min-h-screen $DIL2`}
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
          element={
            <CatalogPage
              selectedCategory={catalogCategory}
              onCategoryChange={setCatalogCategory}
              onProductClick={openProduct}
            />
          }
        />

        <Route
          path="/catalog"
          element={<Navigate to="/" replace />}
        />

        <Route
          path="/product/:productId"
          element={<ProductRoute onBack={openCatalog} />}
        />

        <Route
          path="/cart"
          element={<CartPage />}
        />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
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