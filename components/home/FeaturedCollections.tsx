"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Collection } from "@/lib/types";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { TayibaImage } from "@/components/ui/TayibaImage";
import { fadeUp, staggerContainer } from "@/animations/variants";
import { cn } from "@/lib/utils";
import { t } from "@/lib/i18n";

/**
 * FeaturedCollections — zamonaviy 2-ustunli grid.
 * Har bir karta: rasm/gradient, suzuvchi arabcha so'z, gold hover CTA.
 */
export function FeaturedCollections({ collections }: { collections: Collection[] }) {
  return (
    <section className="section bg-bone">
      <Container>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 md:mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionTitle
              eyebrow={t.home.collections.eyebrow}
              title={t.home.collections.title}
              description={t.home.collections.description}
            />
            <Link
              href="/catalog"
              className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-ink
                         border-b border-ink/20 pb-0.5 hover:border-gold-500 hover:text-gold-700
                         transition-all duration-300"
            >
              {t.common.viewAll}
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.5}
              />
            </Link>
          </div>

          <motion.div
            variants={staggerContainer(0.1, 0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-15% 0px" }}
            className="grid gap-6 sm:grid-cols-2 lg:gap-8"
          >
            {collections.map((c, i) => (
              <motion.div key={c.slug} variants={fadeUp}>
                <Link
                  href={`/${c.slug}`}
                  className="group relative block overflow-hidden rounded-3xl shadow-card
                             transition-all duration-500 ease-luxury hover:shadow-card-hover hover:-translate-y-1"
                >
                  <div className="relative aspect-[4/5]">
                    <TayibaImage
                      cloudinaryId={c.cloudinaryId}
                      swatch={c.visual}
                      alt={`${c.name} — TAYIBA`}
                      preset="collection-hero"
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="transition-transform duration-700 ease-luxury group-hover:scale-[1.04]"
                    />

                    {/* Gradient overlay */}
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent"
                    />

                    {/* Floating arabic word */}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute font-arabic text-[22vw] sm:text-[12vw] leading-none text-white/15 select-none transition-transform duration-700 ease-luxury pointer-events-none",
                        i % 2 === 1 ? "left-6 top-6 group-hover:-translate-x-1" : "right-6 top-6 group-hover:translate-x-1",
                      )}
                    >
                      {c.arabicName}
                    </span>

                    {/* Top row */}
                    <div className="absolute left-7 right-7 top-7 flex items-center justify-between">
                      <span className="eyebrow text-white/80">— {c.index}</span>
                      <span className="eyebrow text-white/80">{c.subtitle}</span>
                    </div>

                    {/* Bottom row */}
                    <div className="absolute inset-x-7 bottom-7 flex items-end justify-between">
                      <h3 className="font-display text-4xl md:text-5xl text-white">{c.name}</h3>
                      <span className="grid h-12 w-12 place-items-center rounded-full bg-white/90 text-ink backdrop-blur-sm transition-all duration-500 ease-luxury group-hover:bg-gold-500 group-hover:text-white">
                        <ArrowUpRight
                          className="h-4 w-4 transition-transform duration-500 ease-luxury group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          strokeWidth={1.5}
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
