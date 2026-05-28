"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Box, Camera } from "lucide-react";
import type { Product } from "@/lib/types";
import { ProductGallery } from "./ProductGallery";
import { Product3DViewerLazy } from "./Product3DViewerLazy";
import { cn } from "@/lib/utils";
import { luxuryEase } from "@/animations/variants";

type MediaTab = "photos" | "model3d";

export function ProductMediaTabs({ product, selectedColorId }: { product: Product; selectedColorId: string }) {
  const [active, setActive] = useState<MediaTab>("photos");
  const color = product.colors.find((c) => c.id === selectedColorId) ?? product.colors[0];

  return (
    <div>
      <div role="tablist" className="mb-4 flex items-center gap-1 rounded-full bg-desert-100/70 p-1 w-fit">
        {[
          { id: "photos" as MediaTab, label: "Rasmlar", icon: <Camera className="h-3.5 w-3.5" strokeWidth={1.5} /> },
          { id: "model3d" as MediaTab, label: "3D", icon: <Box className="h-3.5 w-3.5" strokeWidth={1.5} /> },
        ].map((tab) => {
          const isActive = active === tab.id;
          return (
            <button key={tab.id} role="tab" aria-selected={isActive} onClick={() => setActive(tab.id)}
              className={cn("relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] uppercase tracking-widest font-medium transition-colors duration-500 ease-luxury",
                isActive ? "text-bone" : "text-ink/65 hover:text-ink")}>
              {isActive && <motion.span layoutId="media-tab-active" transition={{ duration: 0.5, ease: luxuryEase }} className="absolute inset-0 rounded-full bg-ink" />}
              <span className="relative z-10 inline-flex items-center gap-2">{tab.icon}{tab.label}</span>
            </button>
          );
        })}
      </div>
      <AnimatePresence mode="wait">
        {active === "photos" && (
          <motion.div key="photos" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.6, ease: luxuryEase }}>
            <ProductGallery product={product} selectedColorId={selectedColorId} />
          </motion.div>
        )}
        {active === "model3d" && (
          <motion.div key="model3d" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.6, ease: luxuryEase }}>
            <Product3DViewerLazy model={product.model3d} swatch={color.swatch}
              caption={product.model3d ? `3D · ${product.name}` : "3D model tayyorlanmoqda"} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
