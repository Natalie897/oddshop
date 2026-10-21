import { create } from 'zustand'
import type { CartItem } from '../../../types/cart'

interface CartStore {
  items: CartItem[]
}

export const useCartStore = create<CartStore>(() => ({
  items: [],
}))