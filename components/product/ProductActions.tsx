"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Send, ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import { luxuryEase } from "@/animations/variants";
import { t } from "@/lib/i18n";

export function ProductActions({ product, selectedColorId, selectedSizeId, quantity, outOfStock }: {
  product: Product; selectedColorId: string; selectedSizeId?: string; quantity: number; outOfStock: boolean;
}) {
  const [confirming, setConfirming] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const telegramText = encodeURIComponent([
    `TAYIBA · buyurtma so'rovi`, ``,
    `${product.name}${product.arabicName ? ` (${product.arabicName})` : ""}`,
    `Rang: ${selectedColorId}`, `O'lcham: ${selectedSizeId ?? "—"}`, `Soni: ${quantity}`, ``,
    `(tayiba.uz saytidan)`,
  ].join("\n"));
  const telegramHref = siteConfig.social.telegram.startsWith("https://t.me/")
    ? `${siteConfig.social.telegram}?text=${telegramText}` : siteConfig.social.telegram;

  const onAddToCart = () => {
    if (outOfStock) return;
    setConfirming(true);
    setTimeout(() => setConfirming(false), 2200);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-stretch gap-3">
        <button type="button" onClick={onAddToCart} disabled={outOfStock}
          className={cn("group relative flex-1 inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-4 text-[12px] uppercase tracking-widest font-medium transition-all duration-700 ease-luxury",
            outOfStock ? "bg-ink/15 text-ink/40 cursor-not-allowed" : "bg-ink text-bone hover:bg-emerald-700 shadow-soft hover:shadow-luxury")}>
          <motion.span key={confirming ? "ok" : "idle"} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: luxuryEase }} className="inline-flex items-center gap-2">
            {confirming ? (<><span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold-200" />{t.product.addedToBag}</>)
              : outOfStock ? <>{t.common.soldOut}</> : (<><ShoppingBag className="h-4 w-4" strokeWidth={1.5} />{t.product.addToBag}</>)}
          </motion.span>
        </button>
        <button type="button" onClick={() => setWishlisted((v) => !v)}
          aria-label={wishlisted ? t.product.removeFromWishlist : t.product.saveToWishlist} aria-pressed={wishlisted}
          className={cn("grid h-14 w-14 shrink-0 place-items-center rounded-full transition-all duration-700 ease-luxury",
            wishlisted ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200" : "bg-transparent text-ink/70 ring-1 ring-ink/15 hover:ring-ink/40 hover:text-ink")}>
          <Heart className={cn("h-4 w-4 transition-transform duration-500 ease-luxury", wishlisted && "fill-emerald-700 scale-110")} strokeWidth={1.5} />
        </button>
      </div>
      <a href={telegramHref} target="_blank" rel="noopener noreferrer"
        className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full px-7 py-4 ring-1 ring-ink/15 text-[12px] uppercase tracking-widest font-medium text-ink/80 transition-all duration-700 ease-luxury hover:ring-ink/40 hover:text-ink hover:bg-ink/[0.02]">
        <Send className="h-4 w-4" strokeWidth={1.5} />{t.product.orderViaTelegram}
      </a>
    </div>
  );
}
