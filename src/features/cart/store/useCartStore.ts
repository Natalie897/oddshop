
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import type { CartItem } from '../../../types/cart'
import type { Product } from '../../../types/product'
import { products } from '../../catalog/data/products'

interface CartStore {
  items: CartItem[]
  addItem: (
    product: Product,
    size?: string,
    quantity?: number
  ) => void
  removeItem: (productId: string, size?: string) => void
  updateQuantity: (
    productId: string,
    quantity: number,
    size?: string
  ) => void
  clearCart: () => void
}

function syncCartItems(items: CartItem[]): CartItem[] {
  return items.flatMap((item) => {
    const currentProduct = products.find(
      (product) => product.id === item.product.id
    )

    if (!currentProduct) return []

    if (
      !Number.isInteger(item.quantity) ||
      item.quantity <= 0
    ) {
      return []
    }

    return [{
      ...item,
      product: currentProduct,
    }]
  })
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],

      addItem: (product, size, quantity = 1) => {
        const currentProduct = products.find(
          (item) => item.id === product.id
        )

        if (!currentProduct || currentProduct.price === null) {
          return
        }

        if (!Number.isInteger(quantity) || quantity <= 0) {
          return
        }

        if (
          currentProduct.sizes?.length &&
          (!size || !currentProduct.sizes.includes(size))
        ) {
          return
        }

        set((state) => {
          const existingItem = state.items.find(
            (item) =>
              item.product.id === currentProduct.id &&
              item.size === size
          )

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === currentProduct.id &&
                item.size === size
                  ? {
                      ...item,
                      product: currentProduct,
                      quantity: item.quantity + quantity,
                    }
                  : item
              ),
            }
          }

          return {
            items: [
              ...state.items,
              {
                product: currentProduct,
                size,
                quantity,
              },
            ],
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
        if (!Number.isInteger(quantity) || quantity <= 0) {
          return
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId &&
            item.size === size
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

      merge: (persistedState, currentState) => {
        const saved = persistedState as Partial<CartStore>

        return {
          ...currentState,
          items: Array.isArray(saved?.items)
            ? syncCartItems(saved.items)
            : [],
        }
      },
    }
  )
)

export const selectCartTotal = (state: CartStore): number =>
  state.items.reduce(
    (total, item) =>
      total + (item.product.price ?? 0) * item.quantity,
    0
  )

export const selectCanCheckout = (
  state: CartStore
): boolean =>
  state.items.length > 0 &&
  state.items.every(
    (item) => item.product.price !== null
  )
