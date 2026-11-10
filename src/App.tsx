
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
import ShippingReturnsPage from './features/info/pages/ShippingReturnsPage'
import FaqPage from './features/info/pages/FaqPage'
import { CatalogPage } from './features/catalog/pages/CatalogPage'
import type { Category } from './features/catalog/pages/CatalogPage'
import { ProductPage } from './features/catalog/pages/ProductPage'
import { products } from './features/catalog/data/products'
import { CampaignsPage } from './features/info/pages/CampaignsPage'

const menuCategories: Partial<Record<string, Category>> = {
  'ALL PRODUCTS': 'all',
  'T-SHIRTS': 't-shirts',
  CAPS: 'caps',
  BAGS: 'bags',
}

function ProductRoute({ onBack }: { onBack: () => void }) {
  const { productId } = useParams<{ productId: string }>()
  const product = products.find((item) => item.id === productId)

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

// Dark theme for product and information pages
  const isDark =
    location.pathname === '/cart' ||
    location.pathname === '/campaigns' ||
    location.pathname.startsWith('/product/') ||
    location.pathname === '/faq' ||
    location.pathname === '/shipping-returns'

  function goTo(path: string) {
    setIsMenuOpen(false)
    setMenuNotice(null)
    navigate(path)
    window.scrollTo(0, 0)
  }

  function openCatalog() {
    goTo('/')
  }

  function openProduct(productId: string) {
    if (!products.some((item) => item.id === productId)) {
      return
    }

    goTo('/product/' + encodeURIComponent(productId))
  }

  function openCart() {
    goTo('/cart')
  }

  function handleMenuNavigate(section: string) {
    if (section === 'FAQ' || section === 'SHIPPING & RETURNS') {
      setIsMenuOpen(false)
      setMenuNotice(null)

      navigate(
        section === 'FAQ'
          ? '/faq'
          : '/shipping-returns'
      )

      window.scrollTo(0, 0)
      return
    }
    const category = menuCategories[section]

    if (category) {
      setCatalogCategory(category)
      openCatalog()
      return
    }

    if (section === 'CAMPAIGNS') {
      goTo('/campaigns')
      return
    }

    setMenuNotice(section + ' - COMING SOON')
    setIsMenuOpen(false)
  }

  return (
    <div
      className={
        'min-h-screen ' +
        (isDark
          ? 'bg-black text-white'
          : 'bg-white text-black')
      }
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
          path="/faq"
          element={<FaqPage />}
        />

        <Route
          path="/shipping-returns"
          element={<ShippingReturnsPage />}
        />

        <Route
          path="/campaigns"
          element={<CampaignsPage />}
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
