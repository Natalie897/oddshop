import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { CatalogPage } from './features/catalog/pages/CatalogPage'
import { ProductPage } from './features/catalog/pages/ProductPage'
import { products } from './features/catalog/data/products'
import type { Product } from './types/product'
import './index.css'

function CatalogPreview() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  if (selectedProduct) {
    return (
      <ProductPage
        product={selectedProduct}
        onBack={() => setSelectedProduct(null)}
      />
    )
  }

  return (
    <CatalogPage
      onProductClick={(productId: string) => {
        const product = products.find((item) => item.id === productId)

        if (product) {
          setSelectedProduct(product)
        }
      }}
    />
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CatalogPreview />
  </StrictMode>,
)