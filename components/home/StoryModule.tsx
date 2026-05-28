"use client";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ArabicPattern } from "@/components/ui/ArabicPattern";
import { fadeUp, scaleIn, staggerContainer } from "@/animations/variants";
import { Button } from "@/components/ui/Button";
import { t } from "@/lib/i18n";

export function StoryModule() {
  return (
    <section className="relative overflow-hidden bg-desert-50 py-24 md:py-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
          <motion.div variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10% 0px" }} className="relative lg:col-span-6">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-divine shadow-luxury">
              <ArabicPattern className="absolute inset-0 text-earth-700" opacity={0.08} />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.5)_0%,transparent_55%)]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-arabic text-[34vw] sm:text-[26vw] lg:text-[14vw] leading-none text-ink/30 select-none">طَيْبَة</p>
              </div>
              <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between">
                <p className="eyebrow text-ink/65">— Tayiba</p>
                <p className="eyebrow text-ink/65">Muborak</p>
              </div>
            </div>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 -right-4 hidden md:block w-56 rounded-2xl bg-bone p-5 shadow-luxury">
              <p className="eyebrow text-ink/55">Atelye</p>
              <p className="mt-2 font-display text-xl text-ink leading-tight">{t.home.story.atelierFloating}</p>
            </motion.div>
          </motion.div>
          <motion.div variants={staggerContainer(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10% 0px" }} className="lg:col-span-6">
            <motion.span variants={fadeUp} className="eyebrow">{t.home.story.eyebrow}</motion.span>
            <motion.h2 variants={fadeUp} className="mt-6 font-display text-display-md text-ink text-balance">{t.home.story.title}</motion.h2>
            <motion.div variants={fadeUp} className="mt-8 space-y-5 text-base md:text-lg leading-luxury text-ink/70 max-w-xl">
              {t.home.story.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </motion.div>
            <motion.div variants={fadeUp} className="mt-10">
              <Button href="/about" variant="outline" withArrow>{t.home.story.readStory}</Button>
            </motion.div>
            <motion.div variants={fadeUp} className="mt-14 grid grid-cols-3 gap-6 border-t border-ink/10 pt-10">
              {t.home.story.pillars.map((p) => (
                <div key={p.title}>
                  <p className="eyebrow text-ink/55">— {p.index}</p>
                  <p className="mt-3 font-display text-xl text-ink">{p.title}</p>
                  <p className="mt-2 text-xs text-ink/55 leading-relaxed">{p.body}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
