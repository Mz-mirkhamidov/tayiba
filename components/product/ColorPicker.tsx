"use client";
import type { ColorOption } from "@/lib/types";
import { cn } from "@/lib/utils";
import { t } from "@/lib/i18n";

export function ColorPicker({ colors, selectedColorId, onChange }: { colors: ColorOption[]; selectedColorId: string; onChange: (id: string) => void }) {
  const selected = colors.find((c) => c.id === selectedColorId) ?? colors[0];
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <p className="eyebrow">{t.common.color}</p>
        <p className="text-sm text-ink/65">
          {selected.name}
          {selected.arabicName && <span className="ml-2 font-arabic text-ink/40">{selected.arabicName}</span>}
        </p>
      </div>
      <div className="mt-4 flex flex-wrap items-start gap-3">
        {colors.map((color) => {
          const isSelected = color.id === selectedColorId;
          const soldOut = color.stock <= 0;
          return (
            <button key={color.id} type="button" onClick={() => !soldOut && onChange(color.id)}
              aria-label={`${color.name} tanlash`} aria-pressed={isSelected} disabled={soldOut}
              className={cn("group relative grid h-11 w-11 place-items-center rounded-full transition-all duration-500 ease-luxury",
                isSelected ? "ring-1 ring-ink ring-offset-2 ring-offset-bone" : "ring-1 ring-ink/15 hover:ring-ink/40",
                soldOut && "opacity-40 cursor-not-allowed")}>
              <span aria-hidden className="h-7 w-7 rounded-full" style={{ background: color.hex }} />
              {soldOut && <span aria-hidden className="absolute inset-0 grid place-items-center text-[8px] uppercase tracking-widest text-ink/60">{t.common.soon}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
