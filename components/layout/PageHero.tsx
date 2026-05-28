"use client";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ArabicPattern } from "@/components/ui/ArabicPattern";
import { fadeUp, staggerContainer } from "@/animations/variants";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow: string; title: string; description?: string;
  arabic?: string; tone?: "desert" | "emerald" | "ink"; className?: string;
}

const tones = {
  desert: { bg: "bg-gradient-madinah text-ink", pattern: "text-ink", eyebrow: "text-ink/55", description: "text-ink/65", arabic: "text-ink/[0.06]" },
  emerald: { bg: "bg-emerald-900 text-bone", pattern: "text-bone", eyebrow: "text-bone/55", description: "text-bone/65", arabic: "text-bone/[0.06]" },
  ink: { bg: "bg-ink text-bone", pattern: "text-bone", eyebrow: "text-bone/55", description: "text-bone/65", arabic: "text-bone/[0.06]" },
} as const;

export function PageHero({ eyebrow, title, description, arabic, tone = "desert", className }: PageHeroProps) {
  const t = tones[tone];
  return (
    <section className={cn("relative overflow-hidden pt-32 md:pt-40 pb-16 md:pb-20", t.bg, className)}>
      <ArabicPattern className={cn("absolute inset-0", t.pattern)} opacity={0.05} />
      {arabic && <p aria-hidden className={cn("pointer-events-none absolute right-4 top-24 select-none font-arabic text-[28vw] md:text-[14vw] leading-none", t.arabic)}>{arabic}</p>}
      <Container className="relative">
        <motion.div variants={staggerContainer(0.1)} initial="hidden" animate="visible" className="max-w-3xl">
          <motion.div variants={fadeUp} className="flex items-center gap-3">
            <span className={cn("h-px w-10", tone === "desert" ? "bg-ink/40" : "bg-bone/40")} />
            <span className={cn("eyebrow", t.eyebrow)}>{eyebrow}</span>
          </motion.div>
          <motion.h1 variants={fadeUp} className="mt-6 font-display text-display-lg text-balance">{title}</motion.h1>
          {description && <motion.p variants={fadeUp} className={cn("mt-6 max-w-xl text-base md:text-lg leading-luxury text-pretty", t.description)}>{description}</motion.p>}
        </motion.div>
      </Container>
    </section>
  );
}
