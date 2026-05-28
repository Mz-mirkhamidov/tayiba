"use client";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProductCard } from "@/components/ui/ProductCard";
import { staggerContainer } from "@/animations/variants";
import type { Product } from "@/lib/types";
import { t } from "@/lib/i18n";

export function RelatedProducts({ products }: { products: Product[] }) {
  if (!products.length) return null;
  return (
    <section className="bg-bone py-24 md:py-32">
      <Container>
        <SectionTitle eyebrow={t.product.relatedTitle} title={t.product.relatedSubtitle} description={t.product.relatedDescription} />
        <motion.div variants={staggerContainer(0.12, 0.05)} initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: "-15% 0px" }}
          className="mt-14 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </motion.div>
      </Container>
    </section>
  );
}
