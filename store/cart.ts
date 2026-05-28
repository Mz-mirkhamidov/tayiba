"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Product, ColorOption, SizeOption } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

// ---- Types ----------------------------------------------------------------

export interface CartLineItem {
  /** Unique key = productId + colorId + sizeId */
  key: string;
  productId: string;
  slug: string;
  collection: string;
  name: string;
  arabicName?: string;
  price: number;
  currency: "UZS" | "USD";
  color: Pick<ColorOption, "id" | "name" | "hex" | "swatch">;
  size: Pick<SizeOption, "id" | "label">;
  quantity: number;
  /** Gradient swatch (placeholder until Cloudinary) */
  swatch: string;
  /** Direct image URL if already loaded */
  imageUrl?: string;
  maxStock: number;
}

interface CartState {
  items: CartLineItem[];
  isOpen: boolean;

  // Actions
  addItem: (product: Product, colorId: string, sizeId: string, quantity?: number) => void;
  removeItem: (key: string) => void;
  updateQty: (key: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  // Derived
  totalItems: () => number;
  totalPrice: () => number;
  formattedTotal: () => string;
  hasItem: (productId: string, colorId: string, sizeId: string) => boolean;
}

/**
 * TAYIBA Cart Store
 * ----------------
 * Zustand + localStorage persistence.
 *
 * - addItem: mavjud item bo'lsa quantity'ni oshiradi, bo'lmasa yangi qo'shadi.
 * - Har bir update'da CartDrawer avtomatik ochiladi (user feedback).
 * - maxStock chegarasidan oshib ketmaydi.
 */
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, colorId, sizeId, quantity = 1) => {
        const color = product.colors.find((c) => c.id === colorId) ?? product.colors[0];
        const size = product.sizes.find((s) => s.id === sizeId) ?? product.sizes[0];
        const key = `${product.id}::${colorId}::${sizeId}`;
        const maxStock = color.stock;

        set((state) => {
          const existing = state.items.find((i) => i.key === key);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.key === key
                  ? { ...i, quantity: Math.min(i.quantity + quantity, maxStock) }
                  : i,
              ),
              isOpen: true,
            };
          }
          const newItem: CartLineItem = {
            key,
            productId: product.id,
            slug: product.slug,
            collection: product.collection,
            name: product.name,
            arabicName: product.arabicName,
            price: product.price,
            currency: product.currency,
            color: { id: color.id, name: color.name, hex: color.hex, swatch: color.swatch },
            size: { id: size.id, label: size.label },
            quantity: Math.min(quantity, maxStock),
            swatch: color.swatch,
            imageUrl: product.gallery.find((m) => m.url)?.url,
            maxStock,
          };
          return { items: [...state.items, newItem], isOpen: true };
        });
      },

      removeItem: (key) =>
        set((state) => ({ items: state.items.filter((i) => i.key !== key) })),

      updateQty: (key, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.key === key
              ? { ...i, quantity: Math.max(1, Math.min(quantity, i.maxStock)) }
              : i,
          ),
        })),

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

      totalItems: () => get().items.reduce((s, i) => s + i.quantity, 0),

      totalPrice: () =>
        get().items.reduce((s, i) => s + i.price * i.quantity, 0),

      formattedTotal: () => formatPrice(get().totalPrice()),

      hasItem: (productId, colorId, sizeId) => {
        const key = `${productId}::${colorId}::${sizeId}`;
        return get().items.some((i) => i.key === key);
      },
    }),
    {
      name: "tayiba-cart",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? localStorage : { getItem: () => null, setItem: () => {}, removeItem: () => {} },
      ),
      // isOpen saqlashni xohlamaymiz — har safar yopiq ochilsin
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
