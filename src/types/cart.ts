import type { Product } from './product'

export interface CartItem {
  product: Product
  size?: string
  quantity: number
}