"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ArabicPattern } from "@/components/ui/ArabicPattern";
import { fadeUp, staggerContainer } from "@/animations/variants";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  arabic?: string;
  tone?: "desert" | "emerald" | "ink";
  className?: string;
}

const tones = {
  desert: {
    bg: "bg-gradient-hero text-ink",
    pattern: "text-ink",
    line: "bg-gold-500",
    eyebrow: "text-gold-500",
    description: "text-muted",
    arabic: "text-gold-700/[0.07]",
  },
  emerald: {
    bg: "bg-emerald-900 text-white",
    pattern: "text-white",
    line: "bg-gold-400",
    eyebrow: "text-gold-400",
    description: "text-white/70",
    arabic: "text-white/[0.07]",
  },
  ink: {
    bg: "bg-[#1A1A1A] text-white",
    pattern: "text-white",
    line: "bg-gold-400",
    eyebrow: "text-gold-400",
    description: "text-white/70",
    arabic: "text-white/[0.06]",
  },
} as const;

export function PageHero({ eyebrow, title, description, arabic, tone = "desert", className }: PageHeroProps) {
  const s = tones[tone];
  return (
    <section className={cn("relative overflow-hidden pt-32 md:pt-40 pb-16 md:pb-20", s.bg, className)}>
      <ArabicPattern className={cn("absolute inset-0", s.pattern)} opacity={0.045} />
      {arabic && (
        <p
          aria-hidden
          className={cn(
            "pointer-events-none absolute right-4 top-24 select-none font-arabic text-[28vw] md:text-[14vw] leading-none",
            s.arabic,
          )}
        >
          {arabic}
        </p>
      )}
      <Container className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={staggerContainer(0.1)} initial="hidden" animate="visible" className="max-w-3xl">
            <motion.div variants={fadeUp} className="flex items-center gap-4">
              <span className={cn("h-px w-12", s.line)} />
              <span className={cn("eyebrow", s.eyebrow)}>{eyebrow}</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="mt-6 font-display text-display-lg text-balance">
              {title}
            </motion.h1>
            {description && (
              <motion.p
                variants={fadeUp}
                className={cn("mt-6 max-w-xl text-body-lg leading-relaxed text-pretty", s.description)}
              >
                {description}
              </motion.p>
            )}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
