"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import type { SizeOption } from "@/lib/types";
import { cn } from "@/lib/utils";
import { t } from "@/lib/i18n";
import { SizeGuideModal } from "@/components/ui/SizeGuideModal";

interface SizePickerProps {
  sizes: SizeOption[];
  selectedSizeId?: string;
  onChange: (id: string) => void;
  category?: string;
}

/**
 * SizePicker — premium o'lcham tanlash.
 * SizeGuide modal ni o'z ichiga oladi.
 */
export function SizePicker({ sizes, selectedSizeId, onChange, category }: SizePickerProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div>
        <div className="flex items-baseline justify-between mb-4">
          <p className="eyebrow">{t.common.size}</p>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-1.5 text-ui-xs uppercase tracking-wider text-muted
                       hover:text-gold-600 transition-colors duration-300"
          >
            <Info className="h-3 w-3" strokeWidth={1.5} />
            {t.common.sizeGuide}
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => {
            const isSelected = size.id === selectedSizeId;
            const soldOut = !size.inStock;
            return (
              <button
                key={size.id}
                type="button"
                disabled={soldOut}
                onClick={() => !soldOut && onChange(size.id)}
                aria-pressed={isSelected}
                className={cn(
                  "relative min-w-[3.25rem] rounded-full px-5 py-2.5",
                  "text-ui-xs uppercase tracking-wider font-medium",
                  "transition-all duration-300 ease-luxury",
                  isSelected
                    ? "bg-ink text-white ring-2 ring-ink ring-offset-2"
                    : "bg-surface text-ink ring-1 ring-ink/12 hover:ring-gold-500 hover:text-gold-700 hover:bg-gold-50",
                  soldOut && "opacity-35 cursor-not-allowed line-through hover:ring-ink/12 hover:text-ink hover:bg-surface",
                )}
              >
                {size.label}
              </button>
            );
          })}
        </div>

        {/* No size selected hint */}
        {!selectedSizeId && sizes.some((s) => s.inStock) && (
          <p className="mt-3 text-xs text-muted/70 italic">
            Savatchaga qo'shish uchun o'lchamni tanlang
          </p>
        )}
      </div>

      {/* SizeGuide Modal */}
      <SizeGuideModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        category={category}
      />
    </>
  );
}
