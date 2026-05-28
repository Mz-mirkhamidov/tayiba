"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Send, ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/types";
import { collections } from "@/lib/data/collections";
import { cn, formatPrice } from "@/lib/utils";
import { fadeUp, luxuryEase } from "@/animations/variants";
import { TayibaImage } from "./TayibaImage";
import { useWishlistStore } from "@/store/wishlist";
import { useCartStore } from "@/store/cart";
import { siteConfig } from "@/lib/site";

export type { Product } from "@/lib/types";

/**
 * PremiumProductCard — Etap Redesign
 *
 * Yangiliklar:
 *   1. Hover'da galereya almashadi (mouseenter → keyframe image cycle)
 *   2. O'lcham pill'lari hover'da paydo bo'ladi
 *   3. "Savatchaga" + "Telegram" ikki tugma hover'da ko'rinadi
 *   4. Fon hover'da mayin ko'tariladi (shadow + scale)
 *   5. Narx formatting: so'm belgisi bilan
 *   6. aspect-[3/4] — barcha kartalar bir xil proportsiyada
 */
export function ProductCard({
  product,
  className,
  priority,
}: {
  product: Product;
  className?: string;
  priority?: boolean;
}) {
  const href = `/${product.collection}/${product.slug}`;
  const collectionName = collections[product.collection].name;
  const { toggleItem, isWishlisted } = useWishlistStore();
  const { addItem: addToCart } = useCartStore();
  const wishlisted = isWishlisted(product.id);

  // Hover gallery — rasmlar orasida almashish
  const [hovered, setHovered] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const [addedFeedback, setAddedFeedback] = useState(false);

  // Gallery items: mavjud rasmlar yoki gradient swatchlar
  const galleryItems = product.gallery.length > 0 ? product.gallery : [
    { url: undefined, cloudinaryId: product.cloudinaryId, swatch: product.swatch, alt: product.name },
  ];

  // Hover'da 2. rasmni ko'rsatish
  const activeItem = galleryItems[hovered && galleryItems.length > 1 ? 1 : 0] ?? galleryItems[0];

  // Status badge
  const status = product.isNew ? "Yangi" : product.isLimited ? "Cheklangan" : null;

  // Default size — birinchi mavjud o'lcham
  const defaultSize = product.sizes.find((s) => s.inStock) ?? product.sizes[0];
  const defaultColor = product.colors.find((c) => c.id === product.defaultColorId) ?? product.colors[0];

  // Add to cart handler
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!defaultSize || defaultColor.stock <= 0) return;
    addToCart(product, defaultColor.id, defaultSize.id, 1);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1800);
  };

  // Telegram deep-link
  const tgText = encodeURIComponent(
    `TAYIBA · Buyurtma\n\n${product.name}${product.arabicName ? ` (${product.arabicName})` : ""}\nNarx: ${formatPrice(product.price, product.currency)}\n\n(tayiba.uz)`,
  );
  const tgHref = `${siteConfig.social.telegram}?text=${tgText}`;

  return (
    <motion.article
      variants={fadeUp}
      className={cn("group relative flex flex-col", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Image area ──────────────────────────────────────────────────── */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-desert-100 shadow-card transition-all duration-500 ease-luxury group-hover:shadow-card-hover group-hover:-translate-y-1">
        {/* Rasm crossfade */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${product.id}-${hovered ? 1 : 0}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: luxuryEase }}
            className="absolute inset-0"
          >
            <TayibaImage
              cloudinaryId={activeItem.cloudinaryId}
              src={activeItem.url}
              swatch={activeItem.swatch ?? product.swatch}
              alt={activeItem.alt}
              preset="card"
              priority={priority}
              sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient overlay bottom — matn o'qilishi uchun */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 ease-luxury group-hover:opacity-100" />

        {/* ── Badges ──────────────────────────────────────────────────── */}
        {status && (
          <div className="absolute left-4 top-4">
            <span className={cn("badge", status === "Yangi" ? "badge-new" : "badge-limited")}>
              {status}
            </span>
          </div>
        )}

        {/* ── Wishlist ─────────────────────────────────────────────────── */}
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleItem(product); }}
          aria-label={wishlisted ? "Sevimlilardan olib tashlash" : "Sevimlilarga qo'shish"}
          aria-pressed={wishlisted}
          className={cn(
            "absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full backdrop-blur-sm",
            "transition-all duration-400 ease-luxury",
            wishlisted
              ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
              : "bg-bone/80 text-ink/60 opacity-0 group-hover:opacity-100 hover:text-gold-600",
            wishlisted && "!opacity-100",
          )}
        >
          <motion.div
            animate={wishlisted ? { scale: [1, 1.35, 1] } : { scale: 1 }}
            transition={{ duration: 0.35 }}
          >
            <Heart
              className={cn("h-4 w-4", wishlisted && "fill-emerald-700")}
              strokeWidth={1.5}
            />
          </motion.div>
        </button>

        {/* ── Gallery dots — agar 2+ rasm bo'lsa ──────────────────────── */}
        {galleryItems.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 opacity-0 transition-opacity duration-400 ease-luxury group-hover:opacity-100">
            {galleryItems.map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-1 rounded-full transition-all duration-400 ease-luxury",
                  (hovered ? 1 : 0) === i ? "w-4 bg-bone" : "w-1 bg-bone/55",
                )}
              />
            ))}
          </div>
        )}

        {/* ── CTA buttons — hover'da paydo bo'ladi ────────────────────── */}
        <div
          className={cn(
            "absolute inset-x-4 bottom-4 flex flex-col gap-2",
            "translate-y-3 opacity-0 transition-all duration-450 ease-luxury",
            "group-hover:translate-y-0 group-hover:opacity-100",
          )}
        >
          {/* Savatchaga qo'shish */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={defaultColor.stock <= 0}
            className={cn(
              "flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5",
              "text-ui-xs uppercase tracking-wider font-medium",
              "transition-all duration-300 ease-luxury",
              defaultColor.stock <= 0
                ? "bg-bone/60 text-muted cursor-not-allowed"
                : addedFeedback
                  ? "bg-emerald-600 text-bone"
                  : "bg-bone/90 text-ink backdrop-blur-sm hover:bg-bone hover:shadow-card",
            )}
          >
            <ShoppingBag className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
            {addedFeedback ? "Qo'shildi ✓" : defaultColor.stock <= 0 ? "Sotilgan" : "Savatchaga"}
          </button>

          {/* Telegram orqali buyurtma */}
          <a
            href={tgHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5
                       text-ui-xs uppercase tracking-wider font-medium
                       bg-[#229ED9] text-white backdrop-blur-sm
                       transition-all duration-300 ease-luxury
                       hover:bg-[#1a8fc4] hover:shadow-card"
          >
            <Send className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
            Telegram orqali
          </a>
        </div>
      </div>

      {/* ── Caption ─────────────────────────────────────────────────────── */}
      <div className="mt-4 flex flex-col gap-2 px-0.5">
        {/* Kolleksiya */}
        <p className="eyebrow text-muted/70">
          {collectionName}
        </p>

        {/* Nom + arabcha */}
        <div className="flex items-baseline justify-between gap-3">
          <Link
            href={href}
            className="font-display text-xl text-ink leading-snug hover-gold transition-colors duration-300 hover:text-gold-700"
          >
            {product.name}
            {product.arabicName && (
              <span className="ml-2 font-arabic text-base text-muted/60">
                {product.arabicName}
              </span>
            )}
          </Link>
          <p className="shrink-0 text-sm font-medium text-ink tabular-nums">
            {formatPrice(product.price, product.currency)}
          </p>
        </div>

        {/* O'lchamlar — hover'da ko'rinadi */}
        <div
          className={cn(
            "flex flex-wrap gap-1.5 overflow-hidden transition-all duration-500 ease-luxury",
            hovered ? "max-h-8 opacity-100" : "max-h-0 opacity-0",
          )}
        >
          {product.sizes.map((size) => (
            <Link
              key={size.id}
              href={`${href}?size=${size.id}`}
              onClick={(e) => e.stopPropagation()}
              className={cn(
                "inline-flex h-6 min-w-[1.75rem] items-center justify-center rounded-full px-2",
                "text-ui-xs uppercase tracking-wider",
                "transition-all duration-300 ease-luxury",
                size.inStock
                  ? "bg-surface text-ink hover:bg-gold-100 hover:text-gold-700 hover:ring-1 hover:ring-gold-500"
                  : "bg-surface text-muted/40 line-through cursor-not-allowed",
              )}
            >
              {size.label}
            </Link>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
