import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { CartItem } from '../../../types/cart'
import type { Product } from '../../../types/product'

interface CartStore {
  items: CartItem[]
  addItem: (product: Product, size?: string, quantity?: number) => void
  removeItem: (productId: string, size?: string) => void
  updateQuantity: (productId: string, quantity: number, size?: string) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
  items: [],

  addItem: (product, size, quantity = 1) => {
    if (product.price === null) return

    if (!Number.isInteger(quantity) || quantity <= 0) return

    if (
      product.sizes?.length &&
      (!size || !product.sizes.includes(size))
    ) {
      return
    }

    set((state) => {
      const existingItem = state.items.find(
        (item) =>
          item.product.id === product.id &&
          item.size === size
      )

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.product.id === product.id &&
            item.size === size
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        }
      }

      return {
        items: [...state.items, { product, size, quantity }],
      }
    })
  },
  removeItem: (productId, size) => {
    set((state) => ({
      items: state.items.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.size === size
          )
      ),
    }))
  },

  updateQuantity: (productId, quantity, size) => {
    if (!Number.isInteger(quantity) || quantity <= 0) return

    set((state) => ({
      items: state.items.map((item) =>
        item.product.id === productId && item.size === size
          ? { ...item, quantity }
          : item
      ),
    }))
  },
  clearCart: () => {
    set({ items: [] })
  },
    }),
    {
      name: 'odd-cart-v1',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
      }),
    }
  )
)

export const selectCartTotal = (state: CartStore): number =>
  state.items.reduce(
    (total, item) =>
      total + (item.product.price ?? 0) * item.quantity,
    0
  )

export const selectCanCheckout = (state: CartStore): boolean =>
  state.items.length > 0 &&
  state.items.every((item) => item.product.price !== null)
