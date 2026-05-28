"use client";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/ui/ProductCard";
import { staggerContainer } from "@/animations/variants";
import type { Product } from "@/lib/types";

export function CollectionGrid({ products }: { products: Product[] }) {
  if (!products.length) {
    return (
      <div className="border-y border-ink/10 py-20 text-center">
        <p className="eyebrow text-ink/55">— Atelye yozuvi</p>
        <p className="mt-3 font-display text-2xl text-ink">Yangi kiyimlar tayyorlanmoqda.</p>
      </div>
    );
  }
  return (
    <motion.div variants={staggerContainer(0.1, 0.05)} initial="hidden" whileInView="visible"
      viewport={{ once: true, margin: "-15% 0px" }}
      className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((p) => <ProductCard key={p.id} product={p} />)}
    </motion.div>
  );
}
