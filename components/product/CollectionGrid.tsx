"use client";

import { motion } from "framer-motion";
import { ProductCard } from "@/components/ui/ProductCard";
import { staggerContainer } from "@/animations/variants";
import type { Product } from "@/lib/types";

/**
 * CollectionGrid — `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8`
 * Barcha kartalar aspect-[3/4] va bir xil proportsiyada.
 */
export function CollectionGrid({ products }: { products: Product[] }) {
  if (!products.length) {
    return (
      <div className="border-y border-ink/8 py-24 text-center">
        <p className="eyebrow text-gold-500 mb-3">— Atelye yozuvi</p>
        <p className="font-display text-2xl text-ink">Yangi kiyimlar tayyorlanmoqda.</p>
        <p className="mt-2 text-sm text-muted">Birinchi bo'lib xabar olish uchun Atelye xatlariga obuna bo'ling.</p>
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer(0.08, 0.04)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-15% 0px" }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} priority={i < 3} />
      ))}
    </motion.div>
  );
}
