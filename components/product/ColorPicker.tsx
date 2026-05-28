"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { ColorOption } from "@/lib/types";
import { cn } from "@/lib/utils";
import { t } from "@/lib/i18n";
import { luxuryEase } from "@/animations/variants";

interface ColorPickerProps {
  colors: ColorOption[];
  selectedColorId: string;
  onChange: (id: string) => void;
}

/**
 * ColorPicker — Etap 4: Premium smooth animatsiyalar
 *
 * Yangiliklar:
 *   1. Tanlangan dot'da `layoutId="color-ring"` — aktiv halqa bir rangdan
 *      boshqasiga slow luxury easing bilan "suzib" o'tadi
 *   2. Rang nomi AnimatePresence crossfade bilan almashadi
 *   3. Sotilgan ranglar "Tez orada" overlay bilan zaif ko'rinadi
 *   4. Hover'da dot yumshoq scale 1.1 ga — hech qachon keskin emas
 */
export function ColorPicker({ colors, selectedColorId, onChange }: ColorPickerProps) {
  const selected = colors.find((c) => c.id === selectedColorId) ?? colors[0];

  return (
    <div>
      {/* Sarlavha satri */}
      <div className="flex items-baseline justify-between mb-4">
        <p className="eyebrow">{t.common.color}</p>

        {/* Rang nomi — crossfade */}
        <AnimatePresence mode="wait">
          <motion.p
            key={selectedColorId}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.4, ease: luxuryEase }}
            className="text-sm text-ink/65 flex items-center gap-2"
          >
            {/* Kichik rang namunasi */}
            <motion.span
              layoutId="color-name-dot"
              className="inline-block h-2 w-2 rounded-full ring-1 ring-ink/10"
              style={{ background: selected.hex }}
              transition={{ duration: 0.5, ease: luxuryEase }}
            />
            <span>
              {selected.name}
              {selected.arabicName && (
                <span className="ml-1.5 font-arabic text-ink/40">{selected.arabicName}</span>
              )}
            </span>
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Rang dot'lari */}
      <div className="flex flex-wrap items-start gap-3">
        {colors.map((color) => {
          const isSelected = color.id === selectedColorId;
          const soldOut = color.stock <= 0;

          return (
            <motion.button
              key={color.id}
              type="button"
              onClick={() => !soldOut && onChange(color.id)}
              aria-label={`${color.name} tanlash`}
              aria-pressed={isSelected}
              disabled={soldOut}
              whileHover={!soldOut ? { scale: 1.12 } : {}}
              whileTap={!soldOut ? { scale: 0.95 } : {}}
              transition={{ duration: 0.35, ease: luxuryEase }}
              className={cn(
                "relative grid h-11 w-11 place-items-center rounded-full",
                "transition-opacity duration-500 ease-luxury",
                soldOut && "cursor-not-allowed opacity-35",
              )}
            >
              {/* Aktiv halqa — layoutId bilan smooth suzadi */}
              {isSelected && (
                <motion.span
                  layoutId="color-ring"
                  className="absolute inset-0 rounded-full ring-2 ring-ink ring-offset-2 ring-offset-bone"
                  transition={{ duration: 0.5, ease: luxuryEase }}
                />
              )}

              {/* Hover ring — faqat tanlalmagan ranglar uchun */}
              {!isSelected && !soldOut && (
                <motion.span
                  className="absolute inset-0 rounded-full ring-1 ring-ink/20"
                  whileHover={{ opacity: 1 }}
                  initial={{ opacity: 0.4 }}
                  transition={{ duration: 0.3 }}
                />
              )}

              {/* Rang shar */}
              <span
                aria-hidden
                className="h-7 w-7 rounded-full shadow-sm"
                style={{ background: color.hex }}
              />

              {/* Sotilgan overlay */}
              {soldOut && (
                <span
                  aria-hidden
                  className="absolute inset-0 grid place-items-center rounded-full
                             bg-bone/60 text-[8px] uppercase tracking-widest text-ink/55
                             backdrop-blur-[1px]"
                >
                  {t.common.soon}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Zaxira ko'rsatkichi — faqat oz qolganda */}
      <AnimatePresence>
        {selected.stock > 0 && selected.stock <= 5 && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: luxuryEase }}
            className="mt-3 text-xs text-gold-600 overflow-hidden"
          >
            · Bu rangdan atiyada {selected.stock} ta qoldi
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
