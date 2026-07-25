import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: number | string
  title: string
  price: number
  reduction?: number
  url?: string
  slug?: string
}

interface ShopState {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: number | string) => void
  toggleCart: (item: CartItem) => void
  clearCart: () => void
  isInCart: (id: number | string) => boolean

 
}

export const useStoreShop = create<ShopState>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (item) => {
        if (get().cart.some((c) => c.id === item.id)) return
        set({ cart: [...get().cart, item] })
      },

      removeFromCart: (id) => {
        set({ cart: get().cart.filter((c) => c.id !== id) })
      },

      toggleCart: (item) => {
        if (get().isInCart(item.id)) {
          get().removeFromCart(item.id)
        } else {
          get().addToCart(item)
        }
      },

      clearCart: () => set({ cart: [] }),

      isInCart: (id) => get().cart.some((c) => c.id === id),
    }),
    { name: 'shop-cart-storage' },
  ),
)
