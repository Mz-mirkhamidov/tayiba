"use client";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function QuantityStepper({ value, onChange, min = 1, max = 99, className }: {
  value: number; onChange: (next: number) => void; min?: number; max?: number; className?: string;
}) {
  const set = (n: number) => onChange(Math.max(min, Math.min(max, n)));
  return (
    <div className={cn("inline-flex items-center rounded-full ring-1 ring-ink/15 transition-shadow duration-500 ease-luxury focus-within:ring-ink/40", className)}>
      <button type="button" onClick={() => set(value - 1)} disabled={value <= min} aria-label="Kamaytirilsin"
        className="grid h-10 w-10 place-items-center rounded-full text-ink/70 hover:text-ink hover:bg-ink/[0.04] disabled:opacity-30 transition-colors">
        <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
      </button>
      <input type="number" value={value} min={min} max={max} onChange={(e) => { const n = Number(e.target.value); if (!Number.isNaN(n)) set(n); }}
        aria-label="Soni" className="w-10 bg-transparent text-center text-sm tabular-nums focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
      <button type="button" onClick={() => set(value + 1)} disabled={value >= max} aria-label="Ko'paytirilsin"
        className="grid h-10 w-10 place-items-center rounded-full text-ink/70 hover:text-ink hover:bg-ink/[0.04] disabled:opacity-30 transition-colors">
        <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
      </button>
    </div>
  );
}
