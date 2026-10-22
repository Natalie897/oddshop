
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
import CartPage from './features/cart/CartPage'

import { CatalogPage } from './features/catalog/pages/CatalogPage'
import { ProductPage } from './features/catalog/pages/ProductPage'
import { products } from './features/catalog/data/products'

function ProductRoute({
  onBack,
}: {
  onBack: () => void
}) {
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

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isDark = location.pathname !== '/'

  function openCatalog() {
    navigate('/')
    setIsMenuOpen(false)
    window.scrollTo(0, 0)
  }

  function openProduct(productId: string) {
    navigate(`/product/${productId}`)
    setIsMenuOpen(false)
    window.scrollTo(0, 0)
  }

  function openCart() {
    navigate('/cart')
    setIsMenuOpen(false)
    window.scrollTo(0, 0)
  }

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

      <Routes>
        <Route
          path="/"
          element={
            <CatalogPage onProductClick={openProduct} />
          }
        />

        <Route
          path="/product/:productId"
          element={
            <ProductRoute onBack={openCatalog} />
          }
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
    </div>
  )
}

export default App
