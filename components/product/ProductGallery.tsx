"use client";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Maximize2 } from "lucide-react";
import type { ColorOption, MediaItem, Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { luxuryEase } from "@/animations/variants";
import { TayibaImage } from "@/components/ui/TayibaImage";

export function ProductGallery({ product, selectedColorId }: { product: Product; selectedColorId: string }) {
  const color = product.colors.find((c) => c.id === selectedColorId) ?? product.colors[0];
  const items: MediaItem[] = useMemo(() =>
    product.gallery.length ? product.gallery : [{ kind: "image", cloudinaryId: color.cloudinaryId, swatch: color.swatch, alt: product.name }],
    [product.gallery, color, product.name]);
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => { setActiveIndex(0); }, [selectedColorId]);
  const active = items[activeIndex] ?? items[0];

  return (
    <div className="grid gap-4 md:grid-cols-[88px_1fr] md:gap-6">
      <div className="order-2 md:order-1 flex md:flex-col gap-3 md:max-h-[80vh] md:overflow-y-auto md:pr-1">
        {items.map((item, i) => (
          <button key={i} type="button" onClick={() => setActiveIndex(i)} aria-label={`Rasm ${i + 1}`}
            className={cn("relative h-20 w-20 shrink-0 overflow-hidden rounded-xl transition-all duration-500 ease-luxury",
              i === activeIndex ? "ring-1 ring-ink shadow-soft" : "ring-1 ring-transparent opacity-70 hover:opacity-100")}>
            <TayibaImage cloudinaryId={item.cloudinaryId ?? color.cloudinaryId} src={item.url} swatch={item.swatch ?? color.swatch} alt={item.alt} preset="gallery-thumb" sizes="88px" />
          </button>
        ))}
      </div>
      <div className="order-1 md:order-2 relative">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-desert-100 shadow-soft">
          <AnimatePresence mode="wait">
            <motion.div key={`${selectedColorId}-${activeIndex}`} initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.9, ease: luxuryEase }} className="absolute inset-0">
              <TayibaImage cloudinaryId={active.cloudinaryId ?? color.cloudinaryId} src={active.url} swatch={active.swatch ?? color.swatch}
                alt={active.alt} preset="gallery" priority={activeIndex === 0} sizes="(min-width: 1024px) 50vw, 100vw" />
            </motion.div>
          </AnimatePresence>
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.45)_0%,transparent_60%)]" />
          <button type="button" aria-label="Sevimlilarga qo'shish"
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-bone/85 text-ink/70 backdrop-blur-md transition-all duration-700 ease-luxury hover:text-emerald-700 hover:bg-bone">
            <Heart className="h-4 w-4" strokeWidth={1.5} />
          </button>
          <span className="absolute left-4 bottom-4 inline-flex items-center gap-1.5 rounded-full bg-bone/85 px-3 py-1.5 text-[10px] uppercase tracking-widest text-ink/70 backdrop-blur-md">
            <Maximize2 className="h-3 w-3" strokeWidth={1.5} /> Ko'rish
          </span>
          {(product.isNew || product.isLimited) && (
            <span className="absolute left-4 top-4 eyebrow text-ink/70 bg-bone/85 backdrop-blur-md px-3 py-1.5 rounded-full">
              · {product.isNew ? "Yangi" : "Cheklangan"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
