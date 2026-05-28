"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Product, ColorOption } from "@/lib/types";

// ---- Types ----------------------------------------------------------------

export interface WishlistItem {
  productId: string;
  slug: string;
  collection: string;
  name: string;
  arabicName?: string;
  price: number;
  currency: "UZS" | "USD";
  swatch: string;
  imageUrl?: string;
  defaultColor: Pick<ColorOption, "id" | "name" | "hex" | "swatch">;
  addedAt: string;
}

interface WishlistState {
  items: WishlistItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
  count: () => number;
}

/**
 * TAYIBA Wishlist Store
 * --------------------
 * localStorage persistence.
 * toggle: bor bo'lsa o'chiradi, yo'q bo'lsa qo'shadi.
 */
export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        if (get().isWishlisted(product.id)) return;
        const defaultColor =
          product.colors.find((c) => c.id === product.defaultColorId) ??
          product.colors[0];
        set((state) => ({
          items: [
            ...state.items,
            {
              productId: product.id,
              slug: product.slug,
              collection: product.collection,
              name: product.name,
              arabicName: product.arabicName,
              price: product.price,
              currency: product.currency,
              swatch: product.swatch,
              imageUrl: product.gallery.find((m) => m.url)?.url,
              defaultColor: {
                id: defaultColor.id,
                name: defaultColor.name,
                hex: defaultColor.hex,
                swatch: defaultColor.swatch,
              },
              addedAt: new Date().toISOString(),
            },
          ],
        }));
      },

      removeItem: (productId) =>
        set((state) => ({ items: state.items.filter((i) => i.productId !== productId) })),

      toggleItem: (product) => {
        if (get().isWishlisted(product.id)) {
          get().removeItem(product.id);
        } else {
          get().addItem(product);
        }
      },

      isWishlisted: (productId) => get().items.some((i) => i.productId === productId),

      count: () => get().items.length,
    }),
    {
      name: "tayiba-wishlist",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? localStorage : { getItem: () => null, setItem: () => {}, removeItem: () => {} },
      ),
    },
  ),
);
