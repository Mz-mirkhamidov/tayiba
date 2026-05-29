"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/animations/variants";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionTitle({ eyebrow, title, description, align = "left", className }: SectionTitleProps) {
  return (
    <motion.div
      variants={staggerContainer(0.08)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      className={cn("flex flex-col gap-5 max-w-3xl", align === "center" && "items-center text-center mx-auto", className)}
    >
      {eyebrow && (
        <motion.span variants={fadeUp} className="eyebrow text-gold-500">
          {eyebrow}
        </motion.span>
      )}
      <motion.h2 variants={fadeUp} className="font-display text-display-md text-ink text-balance">
        {title}
      </motion.h2>
      {description && (
        <motion.p variants={fadeUp} className="text-body-md leading-relaxed text-muted max-w-2xl text-pretty">
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
