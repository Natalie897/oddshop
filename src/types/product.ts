export interface Product {
  id: string
  name: string
  price: number | null
  images: string[]
  description?: string
  category?: string
  sizes?: string[]
  sku?: string
}