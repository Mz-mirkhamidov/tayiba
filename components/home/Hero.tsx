"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ArabicPattern } from "@/components/ui/ArabicPattern";
import { Button } from "@/components/ui/Button";
import { fadeUp, lineReveal, luxuryEase, staggerContainer } from "@/animations/variants";
import { t } from "@/lib/i18n";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const patternY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const sunY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-gradient-madinah">
      <motion.div style={{ y: patternY }} className="absolute inset-0 text-ink">
        <ArabicPattern className="absolute inset-0" opacity={0.05} />
      </motion.div>
      <motion.div style={{ y: sunY }} aria-hidden
        className="pointer-events-none absolute -right-[20%] -top-[10%] h-[80vh] w-[80vh] rounded-full bg-[radial-gradient(circle_at_center,rgba(244,233,194,0.55)_0%,rgba(251,250,246,0)_60%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[40vh] bg-[linear-gradient(180deg,rgba(251,250,246,0)_0%,rgba(238,246,241,0.55)_100%)]" />
      <motion.div style={{ y: copyY, opacity }} className="relative z-10 flex h-full items-center">
        <Container className="w-full">
          <motion.div variants={staggerContainer(0.15, 0.2)} initial="hidden" animate="visible" className="max-w-3xl">
            <motion.div variants={fadeUp} className="mb-8 flex items-center gap-3">
              <span className="h-px w-10 bg-ink/40" />
              <span className="eyebrow">{t.home.hero.eyebrow}</span>
            </motion.div>
            <h1 className="font-display text-display-xl text-ink text-balance">
              {[t.home.hero.lineOne, t.home.hero.lineTwo, t.home.hero.lineThree].map((line, i) => (
                <span key={i} className="block overflow-hidden">
                  <motion.span variants={lineReveal} className={`block${i === 1 ? " italic font-light text-emerald-700" : ""}`}>{line}</motion.span>
                </span>
              ))}
            </h1>
            <motion.p variants={fadeUp} className="mt-8 max-w-md text-base md:text-lg leading-luxury text-ink/65 text-pretty">{t.home.hero.description}</motion.p>
            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
              <Button href="/catalog" variant="primary" size="lg" withArrow>{t.home.hero.ctaPrimary}</Button>
              <Button href="/about" variant="ghost" size="lg">{t.home.hero.ctaSecondary}</Button>
            </motion.div>
          </motion.div>
        </Container>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.6, ease: luxuryEase, delay: 1.2 }}
        className="absolute bottom-8 left-5 sm:left-6 lg:left-10 xl:left-14 z-10">
        <p className="eyebrow text-ink/55">— {t.home.hero.stamp} · حاضر</p>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.6, ease: luxuryEase, delay: 1.2 }}
        className="absolute bottom-8 right-5 sm:right-6 lg:right-10 xl:right-14 z-10 text-right">
        <p className="font-arabic text-2xl text-ink/55 leading-none">طَيْبَة</p>
        <p className="mt-1 eyebrow text-ink/40">{t.home.hero.stampMeaning}</p>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: luxuryEase, delay: 1.6 }}
        className="absolute inset-x-0 bottom-8 z-10 hidden md:flex flex-col items-center gap-2 text-ink/45">
        <span className="eyebrow">{t.common.scroll}</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown className="h-3.5 w-3.5" strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  );
}
