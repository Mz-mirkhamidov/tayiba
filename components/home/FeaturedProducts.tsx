"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/ui/ProductCard";
import { staggerContainer, fadeUp } from "@/animations/variants";
import type { Product } from "@/lib/types";
import { t } from "@/lib/i18n";

export function FeaturedProducts({ products }: { products: Product[] }) {
  if (!products.length) return null;

  return (
    <section className="section bg-surface">
      <Container>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10% 0px" }}
            className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-12 md:mb-16"
          >
            <div className="space-y-3">
              <motion.p variants={fadeUp} className="eyebrow text-gold-500">
                {t.home.featured.eyebrow}
              </motion.p>
              <motion.h2 variants={fadeUp} className="font-display text-display-md text-ink text-balance">
                {t.home.featured.title}
              </motion.h2>
              <motion.p variants={fadeUp} className="text-body-md text-muted max-w-lg leading-relaxed">
                {t.home.featured.description}
              </motion.p>
            </div>
            <motion.div variants={fadeUp} className="shrink-0">
              <Link
                href="/catalog"
                className="group inline-flex items-center gap-2 text-sm font-medium text-ink
                           border-b border-ink/20 pb-0.5
                           hover:border-gold-500 hover:text-gold-700
                           transition-all duration-300"
              >
                {t.common.viewCatalog}
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.5}
                />
              </Link>
            </motion.div>
          </motion.div>

          {/* Grid — aspect-[3/4], responsive */}
          <motion.div
            variants={staggerContainer(0.1, 0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-15% 0px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} priority={i < 2} />
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
