"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * MarqueeRibbon — sokin oltin nuqtali ribbon (brend ustunlari).
 */
export function MarqueeRibbon({
  items,
  className,
  duration = 38,
}: {
  items: string[];
  className?: string;
  duration?: number;
}) {
  const loop = [...items, ...items];
  return (
    <div className={cn("relative overflow-hidden border-y border-ink/8 bg-canvas py-6", className)}>
      <motion.div
        className="flex w-max gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        {loop.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex items-center gap-12 font-display text-2xl md:text-3xl tracking-tight text-ink/70"
          >
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold-500" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
