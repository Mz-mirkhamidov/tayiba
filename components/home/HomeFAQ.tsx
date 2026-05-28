"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { luxuryEase, fadeUp, staggerContainer } from "@/animations/variants";

const FAQ_ITEMS = [
  {
    q: "Yetkazib berish qancha vaqt oladi?",
    a: "Toshkent shahri bo'ylab: 1–2 ish kuni. O'zbekiston bo'ylab: 3–5 ish kuni. Yetkazib berish kuni oldingizdan SMS yoki Telegram orqali ma'lum qilinadi.",
  },
  {
    q: "To'lov qanday qilinadi?",
    a: "Onlayn: Payme va Click ilovalar orqali. Naqd: Toshkentda o'zimizdan olib ketyapsiz yoki yetkazib berganda. Telegram orqali: operator tasdiqlagan narx bo'yicha naqd.",
  },
  {
    q: "Kiyim o'lchamini qanday bilaman?",
    a: "Har bir mahsulot sahifasida 'O'lchamlar yo'riqnomasi' tugmasi mavjud. Ko'krak, bel va tos o'lchamlarini cm da o'lchasangiz jadvaldan o'zingizga to'g'ri o'lchamni topasiz. Aniq bo'lmasa, Telegram orqali bizga yozing.",
  },
  {
    q: "Sifat kafolati bormi?",
    a: "Ha. Har bir TAYIBA kiyimi atelyemizdan chiqishdan oldin tekshiriladi. Agar kiyimda tikuv nuqsoni bo'lsa, biz uni bepul almashtirамiz yoki to'lov qaytaramiz.",
  },
  {
    q: "Qaytarish va almashtirish qanday amalga oshiriladi?",
    a: "Kiyilmagan, asl o'rashida saqlangan mahsulotlar 14 kun ichida qaytarilishi mumkin. Telegram orqali @tayiba_uz ga yozing — biz yo'riqnoma beramiz.",
  },
  {
    q: "Maxsus o'lcham yoki rang buyurtma qilish mumkinmi?",
    a: "Ha. Biz kichik atelye bo'lganimiz uchun maxsus buyurtmalar qabul qilamiz. Telegram orqali yozing, narx va muddatni kelishib olamiz.",
  },
];

/**
 * HomeFAQ — Bosh sahifaga embedded premium FAQ.
 * Dropdown animatsiyasi mayin va premium.
 */
export function HomeFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section bg-canvas">
      <Container>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-12 items-start">

            {/* Header */}
            <motion.div
              variants={staggerContainer(0.08)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10% 0px" }}
              className="lg:col-span-4 space-y-5 lg:sticky lg:top-32"
            >
              <motion.p variants={fadeUp} className="eyebrow text-gold-500">— Tez-tez so'raladigan savollar</motion.p>
              <motion.h2 variants={fadeUp} className="font-display text-display-md text-ink text-balance">
                Savollar
                <br />
                <span className="italic text-gold-500">javoblar.</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-body-md text-muted leading-relaxed">
                Javob topa olmadingizmi? Bizga{" "}
                <a
                  href="https://t.me/tayiba_uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-600 hover:underline transition-colors"
                >
                  Telegram
                </a>
                {" "}orqali yozing.
              </motion.p>
            </motion.div>

            {/* Accordion */}
            <motion.div
              variants={staggerContainer(0.06)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10% 0px" }}
              className="lg:col-span-8 lg:pl-8"
            >
              <div className="divide-y divide-ink/8">
                {FAQ_ITEMS.map((item, i) => (
                  <motion.div key={i} variants={fadeUp}>
                    <button
                      type="button"
                      onClick={() => setOpen(open === i ? null : i)}
                      aria-expanded={open === i}
                      className="accordion-trigger w-full group"
                    >
                      <span
                        className={cn(
                          "font-display text-xl md:text-2xl text-left leading-snug transition-colors duration-300",
                          open === i ? "text-ink" : "text-ink/80",
                        )}
                      >
                        {item.q}
                      </span>
                      <span
                        className={cn(
                          "shrink-0 grid h-9 w-9 place-items-center rounded-full",
                          "transition-all duration-400 ease-luxury",
                          open === i
                            ? "bg-gold-500 text-white"
                            : "bg-surface text-ink/60 group-hover:bg-gold-100 group-hover:text-gold-700",
                        )}
                      >
                        {open === i
                          ? <Minus className="h-4 w-4" strokeWidth={1.5} />
                          : <Plus className="h-4 w-4" strokeWidth={1.5} />
                        }
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {open === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: luxuryEase }}
                          className="overflow-hidden"
                        >
                          <p className="pb-6 pr-12 text-body-sm text-muted leading-relaxed">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
