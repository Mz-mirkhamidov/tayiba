"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Box, Camera } from "lucide-react";
import type { Product } from "@/lib/types";
import { ProductGallery } from "./ProductGallery";
import { Product3DViewerLazy } from "./Product3DViewerLazy";
import { cn } from "@/lib/utils";
import { luxuryEase } from "@/animations/variants";

interface ProductMediaTabsProps {
  product: Product;
  selectedColorId: string;
  /** Hex kodi — 3D viewer PlaceholderModel rangini real-time o'zgartiradi */
  selectedColorHex?: string;
}

/**
 * ProductMediaTabs — Etap 4: selectedColorHex 3D viewer'ga uzatiladi.
 *
 * Tabs: Rasmlar / 3D
 * Photos default; 3D bundle faqat birinchi click'da yuklanadi.
 */
export function ProductMediaTabs({ product, selectedColorId, selectedColorHex }: ProductMediaTabsProps) {
  const [active, setActive] = useState<"photos" | "model3d">("photos");

  const color = product.colors.find((c) => c.id === selectedColorId) ?? product.colors[0];
  const colorHex = selectedColorHex ?? color.hex;
  const swatch = color.swatch;

  const tabs = [
    { id: "photos" as const, label: "Rasmlar", icon: <Camera className="h-3.5 w-3.5" strokeWidth={1.5} /> },
    { id: "model3d" as const, label: "3D", icon: <Box className="h-3.5 w-3.5" strokeWidth={1.5} /> },
  ];

  return (
    <div>
      {/* Tab strip */}
      <div
        role="tablist"
        aria-label="Mahsulot media"
        className="mb-4 flex items-center gap-1 rounded-full bg-desert-100/70 p-1 w-fit"
      >
        {tabs.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(tab.id)}
              className={cn(
                "relative inline-flex items-center gap-2 rounded-full px-4 py-2",
                "text-[11px] uppercase tracking-widest font-medium",
                "transition-colors duration-500 ease-luxury",
                isActive ? "text-bone" : "text-ink/65 hover:text-ink",
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="media-tab-pill"
                  transition={{ duration: 0.45, ease: luxuryEase }}
                  className="absolute inset-0 rounded-full bg-ink"
                />
              )}
              <span className="relative z-10 inline-flex items-center gap-2">
                {tab.icon}
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Panels */}
      <div className="relative">
        <AnimatePresence mode="wait">
          {active === "photos" && (
            <motion.div
              key="photos"
              role="tabpanel"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.55, ease: luxuryEase }}
            >
              <ProductGallery product={product} selectedColorId={selectedColorId} />
            </motion.div>
          )}

          {active === "model3d" && (
            <motion.div
              key="model3d"
              role="tabpanel"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.55, ease: luxuryEase }}
            >
              <Product3DViewerLazy
                model={product.model3d}
                swatch={swatch}
                selectedColorHex={colorHex}
                caption={product.model3d ? `3D · ${product.name}` : "3D model tayyorlanmoqda"}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
