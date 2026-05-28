"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Send, ShoppingBag, Check } from "lucide-react";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import { luxuryEase } from "@/animations/variants";
import { t } from "@/lib/i18n";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";

interface ProductActionsProps {
  product: Product;
  selectedColorId: string;
  selectedSizeId?: string;
  quantity: number;
  outOfStock: boolean;
}

/**
 * ProductActions — Etap 5: real Zustand store'larga ulangan.
 *
 * Add to cart → CartDrawer avtomatik ochiladi.
 * Wishlist toggle → real persistence, animatsiyali yurak.
 */
export function ProductActions({
  product,
  selectedColorId,
  selectedSizeId,
  quantity,
  outOfStock,
}: ProductActionsProps) {
  const [justAdded, setJustAdded] = useState(false);

  const { addItem: addToCart } = useCartStore();
  const { toggleItem, isWishlisted } = useWishlistStore();
  const wishlisted = isWishlisted(product.id);

  // Telegram buyurtma deep-link
  const telegramText = encodeURIComponent(
    [
      `TAYIBA · buyurtma so'rovi`,
      ``,
      `${product.name}${product.arabicName ? ` (${product.arabicName})` : ""}`,
      `Rang: ${selectedColorId}`,
      `O'lcham: ${selectedSizeId ?? "—"}`,
      `Soni: ${quantity}`,
      ``,
      `(tayiba.uz saytidan yuborildi)`,
    ].join("\n"),
  );
  const telegramHref = siteConfig.social.telegram.startsWith("https://t.me/")
    ? `${siteConfig.social.telegram}?text=${telegramText}`
    : siteConfig.social.telegram;

  const handleAddToCart = () => {
    if (outOfStock || !selectedSizeId) return;
    addToCart(product, selectedColorId, selectedSizeId, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-stretch gap-3">
        {/* Savatchaga qo'shish */}
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={outOfStock || !selectedSizeId}
          className={cn(
            "group relative flex-1 inline-flex items-center justify-center gap-2.5",
            "rounded-full px-7 py-4 text-[12px] uppercase tracking-widest font-medium",
            "transition-all duration-700 ease-luxury overflow-hidden",
            outOfStock
              ? "bg-ink/15 text-ink/40 cursor-not-allowed"
              : justAdded
                ? "bg-emerald-600 text-bone shadow-luxury"
                : "bg-ink text-bone hover:bg-emerald-700 shadow-soft hover:shadow-luxury",
          )}
        >
          <AnimatePresence mode="wait">
            {justAdded ? (
              <motion.span
                key="added"
                initial={{ opacity: 0, scale: 0.8, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -6 }}
                transition={{ duration: 0.4, ease: luxuryEase }}
                className="inline-flex items-center gap-2"
              >
                <Check className="h-4 w-4" strokeWidth={2} />
                {t.product.addedToBag}
              </motion.span>
            ) : outOfStock ? (
              <motion.span
                key="sold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="inline-flex items-center gap-2"
              >
                {t.common.soldOut}
              </motion.span>
            ) : (
              <motion.span
                key="idle"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4, ease: luxuryEase }}
                className="inline-flex items-center gap-2"
              >
                <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
                {t.product.addToBag}
              </motion.span>
            )}
          </AnimatePresence>

          {/* Shimmer effect — qo'shilganda */}
          {justAdded && (
            <motion.span
              initial={{ x: "-100%", opacity: 0.6 }}
              animate={{ x: "200%", opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              aria-hidden
            />
          )}
        </button>

        {/* Wishlist tugmasi */}
        <button
          type="button"
          onClick={() => toggleItem(product)}
          aria-label={wishlisted ? t.product.removeFromWishlist : t.product.saveToWishlist}
          aria-pressed={wishlisted}
          className={cn(
            "grid h-14 w-14 shrink-0 place-items-center rounded-full",
            "transition-all duration-700 ease-luxury",
            wishlisted
              ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
              : "bg-transparent text-ink/70 ring-1 ring-ink/15 hover:ring-ink/40 hover:text-ink",
          )}
        >
          <motion.div
            animate={wishlisted ? { scale: [1, 1.3, 1] } : { scale: 1 }}
            transition={{ duration: 0.4, ease: luxuryEase }}
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-all duration-500 ease-luxury",
                wishlisted && "fill-emerald-700",
              )}
              strokeWidth={1.5}
            />
          </motion.div>
        </button>
      </div>

      {/* O'lcham tanlanmagan bo'lsa hint */}
      <AnimatePresence>
        {!selectedSizeId && !outOfStock && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: luxuryEase }}
            className="text-xs text-gold-600 overflow-hidden"
          >
            · Savatchaga qo'shish uchun o'lchamni tanlang
          </motion.p>
        )}
      </AnimatePresence>

      {/* Telegram orqali buyurtma */}
      <a
        href={telegramHref}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex w-full items-center justify-center gap-2.5
                   rounded-full px-7 py-4 ring-1 ring-ink/15
                   text-[12px] uppercase tracking-widest font-medium text-ink/80
                   transition-all duration-700 ease-luxury
                   hover:ring-ink/40 hover:text-ink hover:bg-ink/[0.02]"
      >
        <Send className="h-4 w-4" strokeWidth={1.5} />
        {t.product.orderViaTelegram}
      </a>
    </div>
  );
}
