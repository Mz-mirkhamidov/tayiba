"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import type { Product } from "@/lib/types";
import { collections } from "@/lib/data/collections";
import { categoryLabel } from "@/lib/i18n/categories";
import { cn, formatPrice } from "@/lib/utils";
import { fadeUp } from "@/animations/variants";
import { TayibaImage } from "./TayibaImage";
import { t } from "@/lib/i18n";
import { useWishlistStore } from "@/store/wishlist";

export type { Product } from "@/lib/types";

export function ProductCard({ product, className, priority }: { product: Product; className?: string; priority?: boolean }) {
  const href = `/${product.collection}/${product.slug}`;
  const collectionName = collections[product.collection].name;
  const status = product.isNew ? t.common.new : product.isLimited ? t.common.limited : null;
  const cloudinaryId = product.cloudinaryId ?? product.gallery.find((m) => m.cloudinaryId)?.cloudinaryId;
  const directSrc = cloudinaryId ? undefined : product.gallery.find((m) => m.url)?.url;
  const { toggleItem, isWishlisted } = useWishlistStore();
  const wishlisted = isWishlisted(product.id);

  return (
    <motion.article variants={fadeUp} className={cn("group relative", className)}>
      <Link href={href} className="block">
        <div className={cn("relative aspect-[4/5] overflow-hidden rounded-2xl bg-desert-100 shadow-soft transition-shadow duration-700 ease-luxury group-hover:shadow-luxury")}>
          <TayibaImage cloudinaryId={cloudinaryId} src={directSrc} swatch={product.swatch} alt={product.name}
            preset="card" priority={priority} sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="transition-transform duration-1200 ease-luxury group-hover:scale-[1.04]" />
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bone/10" />
          {status && <span className="absolute left-5 top-5 eyebrow text-ink/70">· {status}</span>}
          <button type="button"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleItem(product); }}
            aria-label={wishlisted ? `${product.name} — sevimlilardan olib tashlash` : `${product.name} — sevimlilarga qo'shish`}
            aria-pressed={wishlisted}
            className={cn(
              "absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full backdrop-blur-md",
              "opacity-0 translate-y-1 transition-all duration-700 ease-luxury",
              "group-hover:opacity-100 group-hover:translate-y-0",
              wishlisted
                ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 !opacity-100 !translate-y-0"
                : "bg-bone/80 text-ink/70 hover:text-emerald-700",
            )}>
            <Heart className={cn("h-4 w-4 transition-all duration-500 ease-luxury", wishlisted && "fill-emerald-700")} strokeWidth={1.5} />
          </button>
        </div>
        <div className="mt-5 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="eyebrow mb-1.5">{collectionName} · {categoryLabel(product.category)}</p>
            <h3 className="font-display text-xl text-ink leading-tight">
              {product.name}
              {product.arabicName && <span className="ml-2 font-arabic text-base text-ink/45">{product.arabicName}</span>}
            </h3>
          </div>
          <p className="shrink-0 text-sm text-ink/70 tabular-nums">{formatPrice(product.price, product.currency)}</p>
        </div>
      </Link>
    </motion.article>
  );
}
