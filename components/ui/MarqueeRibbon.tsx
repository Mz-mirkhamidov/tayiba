"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function MarqueeRibbon({ items, className, duration = 40 }: { items: string[]; className?: string; duration?: number }) {
  const loop = [...items, ...items];
  return (
    <div className={cn("relative overflow-hidden border-y border-ink/10 bg-desert-50 py-5", className)}>
      <motion.div className="flex w-max gap-14 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }} transition={{ duration, ease: "linear", repeat: Infinity }}>
        {loop.map((item, i) => (
          <span key={`${item}-${i}`} className="inline-flex items-center gap-14 font-display text-2xl md:text-3xl tracking-wide text-ink/70">
            <span aria-hidden className="h-1 w-1 rounded-full bg-gold-400" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
