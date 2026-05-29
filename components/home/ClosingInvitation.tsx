"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ArabicPattern } from "@/components/ui/ArabicPattern";
import { Button } from "@/components/ui/Button";
import { fadeUp, staggerContainer } from "@/animations/variants";
import { t } from "@/lib/i18n";

/**
 * ClosingInvitation — to'q ink fon + gold bloom, footer'ga elegant o'tish.
 */
export function ClosingInvitation() {
  return (
    <section className="relative overflow-hidden bg-[#1A1A1A] text-white">
      <ArabicPattern className="absolute inset-0 text-white" opacity={0.04} />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 mx-auto h-[60vh] w-[60vh] rounded-full
                   bg-[radial-gradient(circle_at_center,rgba(197,168,128,0.22)_0%,transparent_62%)]"
      />
      <Container className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-36">
          <motion.div
            variants={staggerContainer(0.12, 0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10% 0px" }}
            className="mx-auto flex max-w-3xl flex-col items-center text-center"
          >
            <motion.span variants={fadeUp} className="eyebrow text-gold-400">
              {t.home.closing.eyebrow}
            </motion.span>
            <motion.h2 variants={fadeUp} className="mt-6 font-display text-display-lg text-white text-balance">
              {t.home.closing.titleOne}
              <br />
              <span className="italic font-light text-gold-400">{t.home.closing.titleTwo}</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-8 max-w-xl text-body-lg leading-relaxed text-white/65 text-pretty">
              {t.home.closing.description}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <Button href="/catalog" variant="gold" size="lg" withArrow>
                {t.home.closing.ctaPrimary}
              </Button>
              <Button href="/contact" variant="ghost" size="lg" className="text-white hover:bg-white/[0.08]">
                {t.home.closing.ctaSecondary}
              </Button>
            </motion.div>
            <motion.p variants={fadeUp} className="mt-14 font-arabic text-2xl text-gold-400/40">
              طَيْبَة
            </motion.p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
