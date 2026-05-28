"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { luxuryEase } from "@/animations/variants";
import { t } from "@/lib/i18n";

export function ProductDetails({ product }: { product: Product }) {
  const panels = [
    { key: "composition", label: t.product.composition, body: <ul className="space-y-2 text-sm leading-luxury text-ink/65">{product.composition.map((l) => <li key={l} className="flex gap-2"><span aria-hidden className="mt-2 h-1 w-1 rounded-full bg-ink/40" />{l}</li>)}</ul> },
    { key: "care", label: t.product.care, body: <ul className="space-y-2 text-sm leading-luxury text-ink/65">{product.care.map((l) => <li key={l} className="flex gap-2"><span aria-hidden className="mt-2 h-1 w-1 rounded-full bg-ink/40" />{l}</li>)}</ul> },
    { key: "atelier", label: t.product.atelierNote, body: <div className="space-y-4 text-sm leading-luxury text-ink/65"><p>{product.origin}</p>{product.story && <p className="italic">{product.story}</p>}</div> },
  ];
  const [open, setOpen] = useState(panels[0].key);
  return (
    <div className="border-y border-ink/10 divide-y divide-ink/10">
      {panels.map((p) => (
        <div key={p.key}>
          <button type="button" onClick={() => setOpen(open === p.key ? "" : p.key)} aria-expanded={open === p.key}
            className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors duration-500 ease-luxury">
            <span className="font-display text-xl text-ink">{p.label}</span>
            <span className={cn("grid h-8 w-8 place-items-center rounded-full ring-1 ring-ink/15 text-ink transition-all duration-700 ease-luxury", open === p.key && "rotate-45 bg-ink text-bone ring-ink")}>
              <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
            </span>
          </button>
          <AnimatePresence initial={false}>
            {open === p.key && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.6, ease: luxuryEase }} className="overflow-hidden">
                <div className="pb-5 pr-12">{p.body}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
