"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Maximize2 } from "lucide-react";
import type { ColorOption, MediaItem, Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { luxuryEase } from "@/animations/variants";
import { TayibaImage } from "@/components/ui/TayibaImage";

interface ProductGalleryProps {
  product: Product;
  selectedColorId: string;
}

/**
 * ProductGallery — Etap 4: Color-aware dynamic switching
 *
 * Rasm hal qilish tartibi (ustunlik bo'yicha):
 *   1. Tanlangan rang `cloudinaryId` bor → rang uchun maxsus foto
 *   2. Gallery item'ining o'z `url` / `cloudinaryId` bor → uni ishlatadi
 *   3. Rang `swatch` gradient (har doim bor) → fallback
 *
 * Rang o'zgarganda:
 *   - Gallery birinchi kadriga qaytadi (activeIndex=0)
 *   - Hero rasm AnimatePresence bilan crossfade qiladi (opacity + scale)
 *   - Thumbnail'lar ham yangi rang swatchi bilan yangilanadi
 */
export function ProductGallery({ product, selectedColorId }: ProductGalleryProps) {
  const color = product.colors.find((c) => c.id === selectedColorId) ?? product.colors[0];

  // Gallery item'larini tuzish:
  // Agar rang o'ziga xos cloudinaryId ga ega bo'lsa,
  // birinchi item shu rangning rasmi bo'ladi.
  const items: MediaItem[] = useMemo(() => {
    const base = product.gallery.length
      ? product.gallery
      : [{ kind: "image" as const, swatch: color.swatch, alt: product.name }];

    // Rang o'ziga xos rasmi bo'lsa — birinchi pozitsiyaga qo'yamiz
    if (color.cloudinaryId) {
      const colorItem: MediaItem = {
        kind: "image",
        cloudinaryId: color.cloudinaryId,
        swatch: color.swatch,
        alt: `${product.name} — ${color.name}`,
      };
      // Birinchi element allaqachon shu rang uchun emas esa prepend qilamiz
      const alreadyFirst = base[0]?.cloudinaryId === color.cloudinaryId;
      return alreadyFirst ? base : [colorItem, ...base.slice(1)];
    }

    return base;
  }, [product.gallery, product.name, color]);

  const [activeIndex, setActiveIndex] = useState(0);

  // Rang o'zgarganda birinchi kadriga qaytish
  useEffect(() => {
    setActiveIndex(0);
  }, [selectedColorId]);

  const active = items[activeIndex] ?? items[0];

  // Aktiv item uchun eng to'g'ri manba:
  // 1. item o'z cloudinaryId'si → 2. rang cloudinaryId'si → 3. item url → 4. swatch
  const activeCloudinaryId = active.cloudinaryId ?? color.cloudinaryId;
  const activeSrc = activeCloudinaryId ? undefined : (active.url ?? undefined);
  const activeSwatch = active.swatch ?? color.swatch;

  return (
    <div className="grid gap-4 md:grid-cols-[88px_1fr] md:gap-6">
      {/* Thumbnails */}
      <div className="order-2 md:order-1 flex md:flex-col gap-3 md:max-h-[80vh] md:overflow-y-auto md:pr-1">
        {items.map((item, i) => {
          const thumbCloudinaryId = item.cloudinaryId ?? color.cloudinaryId;
          const thumbSrc = thumbCloudinaryId ? undefined : (item.url ?? undefined);
          const thumbSwatch = item.swatch ?? color.swatch;
          return (
            <motion.button
              key={`${selectedColorId}-${i}`}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`Rasm ${i + 1}`}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4, ease: luxuryEase }}
              className={cn(
                "relative h-20 w-20 shrink-0 overflow-hidden rounded-xl",
                "transition-all duration-500 ease-luxury",
                i === activeIndex
                  ? "ring-1 ring-ink shadow-soft opacity-100"
                  : "ring-1 ring-transparent opacity-65 hover:opacity-90",
              )}
            >
              <TayibaImage
                cloudinaryId={thumbCloudinaryId}
                src={thumbSrc}
                swatch={thumbSwatch}
                alt={item.alt}
                preset="gallery-thumb"
                sizes="88px"
              />
            </motion.button>
          );
        })}
      </div>

      {/* Hero */}
      <div className="order-1 md:order-2 relative">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-desert-100 shadow-soft">

          {/* Crossfade — rang YOKI thumbnail o'zgarganda */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedColorId}-${activeIndex}`}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.8, ease: luxuryEase }}
              className="absolute inset-0"
            >
              <TayibaImage
                cloudinaryId={activeCloudinaryId}
                src={activeSrc}
                swatch={activeSwatch}
                alt={active.alt}
                preset="gallery"
                priority={activeIndex === 0}
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </motion.div>
          </AnimatePresence>

          {/* Madinaning yumshoq nuri */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0
                       bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.45)_0%,transparent_60%)]"
          />

          {/* Rang swatch "pill" — joriy rang ko'rsatkichi */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`color-pill-${selectedColorId}`}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.5, ease: luxuryEase }}
              className="absolute right-4 bottom-4 inline-flex items-center gap-2 rounded-full
                         bg-bone/85 px-3 py-1.5 text-[10px] uppercase tracking-widest text-ink/70
                         backdrop-blur-md"
            >
              <span
                className="h-2.5 w-2.5 rounded-full ring-1 ring-ink/10"
                style={{ background: color.hex }}
                aria-hidden
              />
              {color.name}
            </motion.div>
          </AnimatePresence>

          {/* Wishlist */}
          <button
            type="button"
            aria-label="Sevimlilarga qo'shish"
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full
                       bg-bone/85 text-ink/70 backdrop-blur-md
                       transition-all duration-700 ease-luxury hover:text-emerald-700 hover:bg-bone"
          >
            <Heart className="h-4 w-4" strokeWidth={1.5} />
          </button>

          {/* Ko'rish */}
          <span className="absolute left-4 bottom-4 inline-flex items-center gap-1.5 rounded-full
                           bg-bone/85 px-3 py-1.5 text-[10px] uppercase tracking-widest text-ink/70
                           backdrop-blur-md">
            <Maximize2 className="h-3 w-3" strokeWidth={1.5} /> Ko'rish
          </span>

          {/* Status */}
          {(product.isNew || product.isLimited) && (
            <span className="absolute left-4 top-4 eyebrow text-ink/70 bg-bone/85
                             backdrop-blur-md px-3 py-1.5 rounded-full">
              · {product.isNew ? "Yangi" : "Cheklangan"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
