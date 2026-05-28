"use client";

import { useMemo, useState, useCallback, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
import { fadeUp, staggerContainer, luxuryEase } from "@/animations/variants";
import { formatPrice } from "@/lib/utils";
import { t } from "@/lib/i18n";
import { categoryLabel } from "@/lib/i18n/categories";

/**
 * ProductPageContent — Etap 4: Dynamic color switching
 *
 * Yangiliklar:
 *   1. URL search param `?color=<id>` — rang saqlandi, ulashish mumkin
 *   2. Rang o'zgarganda galereya birinchi kadriga qaytadi (allaqachon bor)
 *   3. Rang o'zgarganda narx/zaxira animatsiya bilan yangilanadi
 *   4. ColorPicker'ga ring transition animatsiyasi
 *   5. 3D viewer tanlangan rang hex'ini oladi → PlaceholderModel rangi o'zgaradi
 */
export function ProductPageContent({ product, related }: { product: Product; related: Product[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL'dan rangni o'qish, yo'q bo'lsa default
  const urlColor = searchParams.get("color");
  const validUrlColor = product.colors.find((c) => c.id === urlColor)?.id;

  const [colorId, setColorIdState] = useState(
    validUrlColor ?? product.defaultColorId ?? product.colors[0].id,
  );
  const [sizeId, setSizeId] = useState<string | undefined>(
    product.defaultSizeId ?? product.sizes.find((s) => s.inStock)?.id,
  );
  const [quantity, setQuantity] = useState(1);

  const selectedColor = useMemo(
    () => product.colors.find((c) => c.id === colorId) ?? product.colors[0],
    [colorId, product.colors],
  );

  const outOfStock = selectedColor.stock <= 0;

  // URL'ni yangilash — rang o'zgarganda
  const setColorId = useCallback(
    (newColorId: string) => {
      setColorIdState(newColorId);
      const params = new URLSearchParams(searchParams.toString());
      params.set("color", newColorId);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  // Tashqi navigatsiyadan (browser back/forward) URL o'zgarsа state'ni sync qilish
  useEffect(() => {
    if (validUrlColor && validUrlColor !== colorId) {
      setColorIdState(validUrlColor);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validUrlColor]);

  return (
    <>
      <div aria-hidden className="h-[72px] md:h-[80px]" />
      <section className="bg-bone pt-8 pb-20 md:pt-10 md:pb-28">
        <Container>
          <div className="mb-8"><ProductBreadcrumb product={product} /></div>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">

            {/* Media — sticky on desktop */}
            <div className="lg:col-span-7">
              <div className="lg:sticky lg:top-24">
                {/* colorHex galereya + 3D viewer uchun uzatiladi */}
                <ProductMediaTabs
                  product={product}
                  selectedColorId={colorId}
                  selectedColorHex={selectedColor.hex}
                />
              </div>
            </div>

            {/* Editorial ustun */}
            <motion.div
              variants={staggerContainer(0.08)}
              initial="hidden"
              animate="visible"
              className="lg:col-span-5"
            >
              <motion.div variants={fadeUp} className="flex items-center gap-3">
                <span className="h-px w-8 bg-ink/40" />
                <span className="eyebrow">— {categoryLabel(product.category)} · Atelye</span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="mt-4 font-display text-4xl md:text-5xl text-ink text-balance"
              >
                {product.name}
                {product.arabicName && (
                  <span className="ml-3 font-arabic text-3xl text-ink/45">{product.arabicName}</span>
                )}
              </motion.h1>

              {/* Narx + zaxira — rang o'zgarganda crossfade */}
              <motion.div variants={fadeUp} className="mt-5 flex flex-wrap items-baseline gap-x-6 gap-y-2">
                <p className="text-xl text-ink tabular-nums">
                  {formatPrice(product.price, product.currency)}
                </p>
                {product.originalPrice && product.originalPrice > product.price && (
                  <p className="text-sm text-ink/40 line-through tabular-nums">
                    {formatPrice(product.originalPrice, product.currency)}
                  </p>
                )}
                {/* Animatsiyali zaxira — rang o'zgarganda yumshoq yangilanadi */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`stock-${colorId}`}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.4, ease: luxuryEase }}
                  >
                    <StockIndicator stock={selectedColor.stock} />
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              <motion.p
                variants={fadeUp}
                className="mt-6 text-base leading-luxury text-ink/65 max-w-md text-pretty"
              >
                {product.shortDescription}
              </motion.p>

              {/* ColorPicker */}
              <motion.div variants={fadeUp} className="mt-10">
                <ColorPicker
                  colors={product.colors}
                  selectedColorId={colorId}
                  onChange={setColorId}
                />
              </motion.div>

              {/* SizePicker */}
              <motion.div variants={fadeUp} className="mt-8">
                <SizePicker
                  sizes={product.sizes}
                  selectedSizeId={sizeId}
                  onChange={setSizeId}
                />
              </motion.div>

              {/* Soni */}
              <motion.div variants={fadeUp} className="mt-8 flex items-center gap-6">
                <p className="eyebrow">{t.common.quantity}</p>
                <QuantityStepper
                  value={quantity}
                  onChange={setQuantity}
                  max={Math.max(1, selectedColor.stock)}
                />
              </motion.div>

              {/* Actions */}
              <motion.div variants={fadeUp} className="mt-10">
                <ProductActions
                  product={product}
                  selectedColorId={colorId}
                  selectedSizeId={sizeId}
                  quantity={quantity}
                  outOfStock={outOfStock}
                />
              </motion.div>

              {/* To'lov ko'rsatkichlari */}
              <motion.div variants={fadeUp} className="mt-10">
                <PaymentBadges />
              </motion.div>

              {/* Rang nomi — animatsiyali */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`color-label-${colorId}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.5, ease: luxuryEase }}
                  className="mt-8 flex items-center gap-3"
                >
                  <span
                    className="h-4 w-4 rounded-full ring-1 ring-ink/15 transition-all duration-700 ease-luxury"
                    style={{ background: selectedColor.hex }}
                  />
                  <span className="text-sm text-ink/65">
                    {selectedColor.name}
                    {selectedColor.arabicName && (
                      <span className="ml-2 font-arabic text-ink/40">{selectedColor.arabicName}</span>
                    )}
                  </span>
                  {selectedColor.stock <= 10 && selectedColor.stock > 0 && (
                    <span className="eyebrow text-gold-500">
                      · {selectedColor.stock} ta qoldi
                    </span>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Tavsif */}
              <motion.div
                variants={fadeUp}
                className="mt-10 space-y-4 text-base leading-luxury text-ink/70"
              >
                <p>{product.description}</p>
              </motion.div>

              {/* Accordion */}
              <motion.div variants={fadeUp} className="mt-10">
                <ProductDetails product={product} />
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </section>

      <RelatedProducts products={related} />
    </>
  );
}
