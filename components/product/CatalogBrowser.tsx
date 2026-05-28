"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/ui/ProductCard";
import { staggerContainer } from "@/animations/variants";
import { allCollections } from "@/lib/data/collections";
import type { CollectionSlug, Product } from "@/lib/types";
import { cn } from "@/lib/utils";

type Filter = "all" | CollectionSlug;

export function CatalogBrowser({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(
    () => (filter === "all" ? products : products.filter((p) => p.collection === filter)),
    [filter, products],
  );

  const filters = [
    { id: "all" as Filter, label: "Hammasi", count: products.length },
    ...allCollections.map((c) => ({
      id: c.slug as Filter,
      label: c.name,
      count: products.filter((p) => p.collection === c.slug).length,
    })),
  ];

  return (
    <div>
      {/* Premium filter bar */}
      <div className="mb-10 md:mb-12 flex flex-wrap items-center gap-2 border-b border-ink/8 pb-6">
        {filters.map((f) => {
          const active = f.id === filter;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={cn(
                "rounded-full px-5 py-2 text-ui-xs uppercase tracking-wider font-medium",
                "transition-all duration-300 ease-luxury",
                active
                  ? "bg-ink text-white shadow-card"
                  : "bg-surface text-muted hover:text-ink hover:bg-gold-50 hover:text-gold-700",
              )}
            >
              {f.label}
              <span className={cn("ml-2 tabular-nums", active ? "text-white/60" : "text-muted/50")}>
                {String(f.count).padStart(2, "0")}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid — `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` */}
      <motion.div
        key={filter}
        variants={staggerContainer(0.07, 0.02)}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <div className="py-24 text-center">
          <p className="eyebrow text-gold-500 mb-3">— Atelye yozuvi</p>
          <p className="font-display text-2xl text-ink">Hozircha bu yerda hech nima yo'q.</p>
        </div>
      )}
    </div>
  );
}
