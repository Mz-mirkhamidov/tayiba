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

export function FeaturedCollections({ collections }: { collections: Collection[] }) {
  return (
    <section className="relative bg-bone py-24 md:py-32">
      <Container>
        <div className="mb-16 flex flex-col gap-10 md:flex-row md:items-end md:justify-between md:gap-16">
          <SectionTitle eyebrow={t.home.collections.eyebrow} title={t.home.collections.title} description={t.home.collections.description} />
          <Link href="/catalog" className="link-luxury shrink-0">{t.common.viewAll} <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} /></Link>
        </div>
        <motion.div variants={staggerContainer(0.12, 0.05)} initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: "-15% 0px" }} className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {collections.map((c, i) => (
            <motion.div key={c.slug} variants={fadeUp}>
              <Link href={`/${c.slug}`} className="group relative block overflow-hidden rounded-3xl shadow-soft transition-shadow duration-700 ease-luxury hover:shadow-luxury">
                <div className="relative aspect-[5/6] md:aspect-[4/5]">
                  <TayibaImage cloudinaryId={c.cloudinaryId} swatch={c.visual} alt={`${c.name} — TAYIBA`}
                    preset="collection-hero" sizes="(min-width: 768px) 50vw, 100vw"
                    className="transition-transform duration-1200 ease-luxury group-hover:scale-[1.03]" />
                  <div aria-hidden className={cn("absolute inset-0 pointer-events-none",
                    i % 2 === 1 ? "bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.5)_0%,transparent_50%)]"
                      : "bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.5)_0%,transparent_50%)]")} />
                  <span aria-hidden className={cn("absolute font-arabic text-[24vw] md:text-[12vw] leading-none text-ink/[0.08] select-none transition-transform duration-1200 ease-luxury pointer-events-none",
                    i % 2 === 1 ? "left-6 bottom-6 group-hover:-translate-x-1" : "right-6 top-6 group-hover:translate-x-1")}>{c.arabicName}</span>
                  <div className="absolute left-7 right-7 top-7 flex items-center justify-between">
                    <span className="eyebrow text-ink/55">— {c.index}</span>
                    <span className="eyebrow text-ink/55">{c.subtitle}</span>
                  </div>
                  <div className="absolute inset-x-7 bottom-7 flex items-end justify-between">
                    <h3 className="font-display text-5xl md:text-6xl text-ink">{c.name}</h3>
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-ink text-bone transition-all duration-700 ease-luxury group-hover:bg-emerald-700">
                      <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
