"use client";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProductCard } from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/Button";
import { staggerContainer } from "@/animations/variants";
import type { Product } from "@/lib/types";
import { t } from "@/lib/i18n";

export function FeaturedProducts({ products }: { products: Product[] }) {
  if (!products.length) return null;
  return (
    <section className="relative bg-bone py-24 md:py-32">
      <Container>
        <div className="mb-14">
          <SectionTitle eyebrow={t.home.featured.eyebrow} title={t.home.featured.title} description={t.home.featured.description} />
        </div>
        <motion.div variants={staggerContainer(0.12, 0.05)} initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: "-15% 0px" }}
          className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </motion.div>
        <div className="mt-16 flex justify-center">
          <Button href="/catalog" variant="outline" size="lg" withArrow>{t.common.viewCatalog}</Button>
        </div>
      </Container>
    </section>
  );
}
