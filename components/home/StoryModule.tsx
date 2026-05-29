"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ArabicPattern } from "@/components/ui/ArabicPattern";
import { fadeUp, scaleIn, staggerContainer } from "@/animations/variants";
import { Button } from "@/components/ui/Button";
import { t } from "@/lib/i18n";

/**
 * StoryModule — zamonaviy editorial split.
 * Chap: gold gradient + katta arabcha nom + suzuvchi atelye karta.
 * O'ng: hikoya matni + 3 ustun.
 */
export function StoryModule() {
  return (
    <section className="section bg-canvas overflow-hidden">
      <Container>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
            {/* Visual */}
            <motion.div
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10% 0px" }}
              className="relative lg:col-span-6"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-warm shadow-luxury">
                <ArabicPattern className="absolute inset-0 text-gold-700" opacity={0.08} />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.55)_0%,transparent_58%)]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="font-arabic text-[30vw] sm:text-[22vw] lg:text-[13vw] leading-none text-gold-700/25 select-none">
                    طَيْبَة
                  </p>
                </div>
                <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between">
                  <p className="eyebrow text-ink/60">— Tayiba</p>
                  <p className="eyebrow text-ink/60">Muborak</p>
                </div>
              </div>

              {/* Floating card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -right-4 hidden md:block w-60 rounded-2xl bg-canvas p-5 shadow-card-hover"
              >
                <p className="eyebrow text-gold-500">Atelye</p>
                <p className="mt-2 font-display text-xl text-ink leading-tight">
                  {t.home.story.atelierFloating}
                </p>
              </motion.div>
            </motion.div>

            {/* Copy */}
            <motion.div
              variants={staggerContainer(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10% 0px" }}
              className="lg:col-span-6"
            >
              <motion.span variants={fadeUp} className="eyebrow text-gold-500">
                {t.home.story.eyebrow}
              </motion.span>
              <motion.h2 variants={fadeUp} className="mt-5 font-display text-display-md text-ink text-balance">
                {t.home.story.title}
              </motion.h2>
              <motion.div variants={fadeUp} className="mt-7 space-y-5 text-body-md leading-relaxed text-muted max-w-xl">
                {t.home.story.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </motion.div>
              <motion.div variants={fadeUp} className="mt-9">
                <Button href="/about" variant="outline" withArrow>
                  {t.home.story.readStory}
                </Button>
              </motion.div>

              {/* Pillars */}
              <motion.div variants={fadeUp} className="mt-12 grid grid-cols-3 gap-6 border-t border-ink/8 pt-9">
                {t.home.story.pillars.map((p) => (
                  <div key={p.title}>
                    <p className="eyebrow text-gold-500">— {p.index}</p>
                    <p className="mt-3 font-display text-xl text-ink">{p.title}</p>
                    <p className="mt-2 text-xs text-muted leading-relaxed">{p.body}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
