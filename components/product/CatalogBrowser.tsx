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
  const filtered = useMemo(() => filter === "all" ? products : products.filter((p) => p.collection === filter), [filter, products]);
  const filters = [
    { id: "all" as Filter, label: "Hammasi", count: products.length },
    ...allCollections.map((c) => ({ id: c.slug as Filter, label: c.name, count: products.filter((p) => p.collection === c.slug).length })),
  ];

  return (
    <div>
      <div className="mb-12 flex flex-wrap items-center gap-2 border-b border-ink/10 pb-6">
        {filters.map((f) => {
          const active = f.id === filter;
          return (
            <button key={f.id} type="button" onClick={() => setFilter(f.id)}
              className={cn("rounded-full px-4 py-2 text-[11px] uppercase tracking-widest font-medium transition-all duration-500 ease-luxury",
                active ? "bg-ink text-bone" : "text-ink/60 hover:text-ink hover:bg-ink/[0.04]")}>
              {f.label}
              <span className={cn("ml-2 tabular-nums text-[10px]", active ? "text-bone/55" : "text-ink/35")}>{String(f.count).padStart(2, "0")}</span>
            </button>
          );
        })}
      </div>
      <motion.div key={filter} variants={staggerContainer(0.08, 0.02)} initial="hidden" animate="visible"
        className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
      </motion.div>
      {filtered.length === 0 && (
        <div className="border-y border-ink/10 py-20 text-center">
          <p className="eyebrow text-ink/55">— Atelye yozuvi</p>
          <p className="mt-3 font-display text-2xl text-ink">Hozircha bu yerda hech nima yo'q.</p>
        </div>
      )}
    </div>
  );
}
