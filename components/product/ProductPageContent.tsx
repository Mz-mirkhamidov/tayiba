"use client";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { Product } from "@/lib/types";
import { Container } from "@/components/ui/Container";
import { ProductBreadcrumb } from "./ProductBreadcrumb";
import { ProductMediaTabs } from "./ProductMediaTabs";
import { ColorPicker } from "./ColorPicker";
import { SizePicker } from "./SizePicker";
import { QuantityStepper } from "./QuantityStepper";
import { StockIndicator } from "./StockIndicator";
import { ProductActions } from "./ProductActions";
import { ProductDetails } from "./ProductDetails";
import { PaymentBadges } from "./PaymentBadges";
import { RelatedProducts } from "./RelatedProducts";
import { fadeUp, staggerContainer } from "@/animations/variants";
import { formatPrice } from "@/lib/utils";
import { t } from "@/lib/i18n";
import { categoryLabel } from "@/lib/i18n/categories";

export function ProductPageContent({ product, related }: { product: Product; related: Product[] }) {
  const [colorId, setColorId] = useState(product.defaultColorId ?? product.colors[0].id);
  const [sizeId, setSizeId] = useState<string | undefined>(product.defaultSizeId ?? product.sizes.find((s) => s.inStock)?.id);
  const [quantity, setQuantity] = useState(1);
  const selectedColor = useMemo(() => product.colors.find((c) => c.id === colorId) ?? product.colors[0], [colorId, product.colors]);
  const outOfStock = selectedColor.stock <= 0;

  return (
    <>
      <div aria-hidden className="h-[72px] md:h-[80px]" />
      <section className="bg-bone pt-8 pb-20 md:pt-10 md:pb-28">
        <Container>
          <div className="mb-8"><ProductBreadcrumb product={product} /></div>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="lg:sticky lg:top-24">
                <ProductMediaTabs product={product} selectedColorId={colorId} />
              </div>
            </div>
            <motion.div variants={staggerContainer(0.08)} initial="hidden" animate="visible" className="lg:col-span-5">
              <motion.div variants={fadeUp} className="flex items-center gap-3">
                <span className="h-px w-8 bg-ink/40" />
                <span className="eyebrow">— {categoryLabel(product.category)} · Atelye</span>
              </motion.div>
              <motion.h1 variants={fadeUp} className="mt-4 font-display text-4xl md:text-5xl text-ink text-balance">
                {product.name}
                {product.arabicName && <span className="ml-3 font-arabic text-3xl text-ink/45">{product.arabicName}</span>}
              </motion.h1>
              <motion.div variants={fadeUp} className="mt-5 flex flex-wrap items-baseline gap-x-6 gap-y-2">
                <p className="text-xl text-ink tabular-nums">{formatPrice(product.price, product.currency)}</p>
                {product.originalPrice && product.originalPrice > product.price && (
                  <p className="text-sm text-ink/40 line-through tabular-nums">{formatPrice(product.originalPrice, product.currency)}</p>
                )}
                <StockIndicator stock={selectedColor.stock} />
              </motion.div>
              <motion.p variants={fadeUp} className="mt-6 text-base leading-luxury text-ink/65 max-w-md text-pretty">{product.shortDescription}</motion.p>
              <motion.div variants={fadeUp} className="mt-10"><ColorPicker colors={product.colors} selectedColorId={colorId} onChange={setColorId} /></motion.div>
              <motion.div variants={fadeUp} className="mt-8"><SizePicker sizes={product.sizes} selectedSizeId={sizeId} onChange={setSizeId} /></motion.div>
              <motion.div variants={fadeUp} className="mt-8 flex items-center gap-6">
                <p className="eyebrow">{t.common.quantity}</p>
                <QuantityStepper value={quantity} onChange={setQuantity} max={Math.max(1, selectedColor.stock)} />
              </motion.div>
              <motion.div variants={fadeUp} className="mt-10">
                <ProductActions product={product} selectedColorId={colorId} selectedSizeId={sizeId} quantity={quantity} outOfStock={outOfStock} />
              </motion.div>
              <motion.div variants={fadeUp} className="mt-10"><PaymentBadges /></motion.div>
              <motion.div variants={fadeUp} className="mt-12 space-y-4 text-base leading-luxury text-ink/70"><p>{product.description}</p></motion.div>
              <motion.div variants={fadeUp} className="mt-10"><ProductDetails product={product} /></motion.div>
            </motion.div>
          </div>
        </Container>
      </section>
      <RelatedProducts products={related} />
    </>
  );
}
