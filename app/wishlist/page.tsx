"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { useWishlistStore } from "@/store/wishlist";
import { useCartStore } from "@/store/cart";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArabicPattern } from "@/components/ui/ArabicPattern";
import { cn, formatPrice } from "@/lib/utils";
import { fadeUp, luxuryEase, staggerContainer } from "@/animations/variants";

/**
 * Sevimlilar sahifasi — /wishlist
 *
 * Bo'm-bo'sh holat: atelier ohangi, hech qachon "Sevimlilarga qo'shing" yozuvi emas.
 * Item'lar: thumbnail + nom + narx + "Savatchaga" tugmasi + o'chirish.
 */
export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore();
  const { addItem: addToCart, openCart } = useCartStore();

  const handleAddToCart = (item: typeof items[0]) => {
    // Wishlist item'da to'liq Product yo'q, shuning uchun minimal product-like qilamiz.
    // To'liq Product bilan ishlash uchun Supabase/data layer'dan fetch qilish kerak.
    // Hozir: default rang va o'lcham bilan cart'ga qo'shamiz.
    // Bu Etap 6 da (auth + full PDP hydration) to'liqlanadi.
    const minimalProduct = {
      id: item.productId,
      slug: item.slug,
      collection: item.collection as "men" | "women" | "prayer" | "gift",
      category: "apparel",
      name: item.name,
      arabicName: item.arabicName,
      price: item.price,
      currency: item.currency,
      shortDescription: "",
      description: "",
      composition: [],
      care: [],
      origin: "",
      colors: [{ ...item.defaultColor, stock: 99 }],
      sizes: [{ id: "OS", label: "Yagona o'lcham", inStock: true }],
      defaultColorId: item.defaultColor.id,
      swatch: item.swatch,
      gallery: item.imageUrl ? [{ kind: "image" as const, url: item.imageUrl, alt: item.name }] : [],
    };
    // @ts-expect-error — minimal product shape, to'liq Product emas
    addToCart(minimalProduct, item.defaultColor.id, "OS");
    openCart();
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-madinah pt-32 md:pt-40 pb-16 md:pb-20">
        <ArabicPattern className="absolute inset-0 text-ink" opacity={0.05} />
        <p aria-hidden className="pointer-events-none absolute right-4 top-32 select-none font-arabic text-[28vw] md:text-[14vw] leading-none text-ink/[0.06]">
          قلب
        </p>
        <Container className="relative">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-ink/40" />
            <span className="eyebrow">— Sevimlilar</span>
          </div>
          <h1 className="mt-6 font-display text-display-lg text-ink">
            Sevimlilar
          </h1>
          {items.length > 0 && (
            <p className="mt-3 text-base text-ink/65">
              {items.length} ta kiyim saqlanган
            </p>
          )}
        </Container>
      </section>

      {/* Content */}
      <section className="bg-bone py-16 md:py-20">
        <Container>
          <AnimatePresence mode="wait">
            {items.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: luxuryEase }}
                className="flex flex-col items-center justify-center py-24 text-center gap-6"
              >
                <div className="grid h-24 w-24 place-items-center rounded-full bg-desert-100">
                  <Heart className="h-10 w-10 text-ink/25" strokeWidth={1} />
                </div>
                <div className="space-y-2">
                  <p className="eyebrow text-ink/55">— Sevimlilar</p>
                  <p className="font-display text-3xl text-ink">Hali bo'm-bo'sh.</p>
                  <p className="text-sm text-ink/55 leading-luxury max-w-sm mx-auto">
                    Mahsulot sahifasida yuraк tugmasini bosib, sevimli kiyimingizni bu yerga saqlang.
                  </p>
                </div>
                <Button href="/catalog" variant="outline" size="lg" withArrow>
                  Katalogni ko'rish
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="items"
                variants={staggerContainer(0.08)}
                initial="hidden"
                animate="visible"
              >
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {items.map((item) => (
                    <WishlistCard
                      key={item.productId}
                      item={item}
                      onRemove={() => removeItem(item.productId)}
                      onAddToCart={() => handleAddToCart(item)}
                    />
                  ))}
                </div>

                {/* Footer actions */}
                <div className="mt-16 flex flex-wrap items-center gap-4 border-t border-ink/10 pt-8">
                  <Button href="/catalog" variant="outline" withArrow>
                    Katalogni davom ettirish
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </section>
    </>
  );
}

// ── WishlistCard ─────────────────────────────────────────────────────────────

function WishlistCard({
  item,
  onRemove,
  onAddToCart,
}: {
  item: ReturnType<typeof useWishlistStore.getState>["items"][number];
  onRemove: () => void;
  onAddToCart: () => void;
}) {
  return (
    <motion.article
      variants={fadeUp}
      layout
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.35 } }}
      className="group relative"
    >
      {/* Rasm */}
      <Link
        href={`/${item.collection}/${item.slug}`}
        className="relative block aspect-[4/5] overflow-hidden rounded-2xl bg-desert-100 shadow-soft
                   transition-shadow duration-700 ease-luxury group-hover:shadow-luxury"
      >
        {item.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.imageUrl}
            alt={item.name}
            className="h-full w-full object-cover transition-transform duration-1200 ease-luxury group-hover:scale-[1.04]"
          />
        ) : (
          <div className={cn("h-full w-full transition-transform duration-1200 ease-luxury group-hover:scale-[1.04]", item.swatch)} />
        )}

        {/* Rang dot */}
        <span
          className="absolute left-4 bottom-4 h-5 w-5 rounded-full ring-2 ring-bone shadow-soft"
          style={{ background: item.defaultColor.hex }}
          aria-hidden
        />

        {/* O'chirish — hover'da */}
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); onRemove(); }}
          aria-label={`${item.name} ni sevimlilardan olib tashlash`}
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full
                     bg-bone/85 text-ink/70 backdrop-blur-md
                     opacity-0 translate-y-1
                     transition-all duration-700 ease-luxury
                     group-hover:opacity-100 group-hover:translate-y-0
                     hover:text-red-500"
        >
          <Trash2 className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </Link>

      {/* Caption */}
      <div className="mt-4 space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <Link
              href={`/${item.collection}/${item.slug}`}
              className="font-display text-xl text-ink leading-tight hover:text-emerald-700
                         transition-colors duration-500 ease-luxury block truncate"
            >
              {item.name}
              {item.arabicName && (
                <span className="ml-2 font-arabic text-base text-ink/40">{item.arabicName}</span>
              )}
            </Link>
          </div>
          <p className="shrink-0 text-sm text-ink/70 tabular-nums">
            {formatPrice(item.price, item.currency)}
          </p>
        </div>

        {/* Savatchaga qo'shish */}
        <button
          type="button"
          onClick={onAddToCart}
          className="group/btn flex w-full items-center justify-center gap-2 rounded-full
                     ring-1 ring-ink/15 py-2.5 text-[11px] uppercase tracking-widest font-medium
                     text-ink/80 transition-all duration-500 ease-luxury
                     hover:ring-ink/40 hover:bg-ink/[0.03] hover:text-ink"
        >
          <ShoppingBag className="h-3.5 w-3.5" strokeWidth={1.5} />
          Savatchaga qo'shish
        </button>
      </div>
    </motion.article>
  );
}
