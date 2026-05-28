import { cn } from "@/lib/utils";
import { t } from "@/lib/i18n";

export function StockIndicator({ stock, className }: { stock: number; className?: string }) {
  const config = stock <= 0
    ? { label: t.common.soldOut, dot: "bg-ink/40", text: "text-ink/55" }
    : stock <= 10
      ? { label: `${t.common.fewLeft} · ${stock} ta`, dot: "bg-gold-400", text: "text-ink/70" }
      : { label: t.common.inAtelier, dot: "bg-emerald-500", text: "text-ink/70" };
  return (
    <p className={cn("inline-flex items-center gap-2 text-xs", config.text, className)}>
      <span aria-hidden className={cn("h-1.5 w-1.5 rounded-full", config.dot)} />
      {config.label}
    </p>
  );
}
