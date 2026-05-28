"use client";
import type { SizeOption } from "@/lib/types";
import { cn } from "@/lib/utils";
import { t } from "@/lib/i18n";

export function SizePicker({ sizes, selectedSizeId, onChange, guideHref = "/faq" }: {
  sizes: SizeOption[]; selectedSizeId?: string; onChange: (id: string) => void; guideHref?: string;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <p className="eyebrow">{t.common.size}</p>
        <a href={guideHref} className="text-[11px] uppercase tracking-widest text-ink/55 hover:text-ink transition-colors duration-500">{t.common.sizeGuide}</a>
      </div>
      <div className="mt-4 flex flex-wrap gap-2.5">
        {sizes.map((size) => {
          const isSelected = size.id === selectedSizeId;
          const soldOut = !size.inStock;
          return (
            <button key={size.id} type="button" disabled={soldOut} onClick={() => !soldOut && onChange(size.id)}
              aria-pressed={isSelected}
              className={cn("relative min-w-[3.25rem] rounded-full px-5 py-2.5 text-[11px] uppercase tracking-widest font-medium transition-all duration-500 ease-luxury",
                isSelected ? "bg-ink text-bone" : "bg-transparent text-ink/75 ring-1 ring-ink/15 hover:ring-ink/40",
                soldOut && "text-ink/30 ring-ink/10 cursor-not-allowed line-through decoration-1 hover:ring-ink/10")}>
              {size.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
