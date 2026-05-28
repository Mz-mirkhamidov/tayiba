"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { luxuryEase } from "@/animations/variants";
import { Container } from "@/components/ui/Container";

interface Review {
  id: string;
  name: string;
  city: string;
  rating: 1 | 2 | 3 | 4 | 5;
  product: string;
  text: string;
  date: string;
}

const REVIEWS: Review[] = [
  {
    id: "1",
    name: "Malika N.",
    city: "Toshkent",
    rating: 5,
    product: "Abaya Sukoon",
    text: "Hayotimda kiygan eng go'zal abayam. Mato juda yumshoq, tikuvlar mukammal. Buyurtma qilganimdan ikki kunda qo'limga yetdi. TAYIBA real premium brend.",
    date: "2024 may",
  },
  {
    id: "2",
    name: "Abdulloh R.",
    city: "Samarqand",
    rating: 5,
    product: "Thawb Noor",
    text: "Juma namoziga kiygan to'bim barcha do'stlarimning e'tiborini tortdi. Mato nafis, bichimlari aniq. Yana bir nechta ranglarini ham olmoqchiman.",
    date: "2024 aprel",
  },
  {
    id: "3",
    name: "Zulfiya K.",
    city: "Toshkent",
    rating: 5,
    product: "Joynamoz Rawda",
    text: "Joynamozning naqshlari qo'lda kashtalangan — bu ko'rinib turibdi. Ona-qizim uchun ikkitadan oldim. Atelye qutisi ham juda chiroyli tayyorlangan.",
    date: "2024 mart",
  },
  {
    id: "4",
    name: "Hamza M.",
    city: "Farg'ona",
    rating: 5,
    product: "Kaftan Rida",
    text: "Hayotimda birinchi marta premium Islomiy kiyim kiyib ko'rdim. Farqi darhol seziladi — mato, tikuv, dizayn hammasida. Toshkentga kelganimda shaxsan borib ko'raman.",
    date: "2024 fevral",
  },
];

/**
 * ReviewsSection — Mijozlar fikrlari.
 * Premium slayder animatsiyasi, 5 yulduz reyting, elegantko'rinish.
 */
export function ReviewsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const go = useCallback((delta: 1 | -1) => {
    setDirection(delta);
    setCurrent((prev) => (prev + delta + REVIEWS.length) % REVIEWS.length);
  }, []);

  const review = REVIEWS[current];

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? -40 : 40,
      opacity: 0,
    }),
  };

  return (
    <section className="section bg-surface overflow-hidden">
      {/* Hairline gold top */}
      <div className="hairline-gold mb-16 md:mb-20" />

      <Container>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-12 items-center">

            {/* Left — header */}
            <div className="lg:col-span-4 space-y-6">
              <p className="eyebrow text-gold-500">— Mijozlar e'tirofi</p>
              <h2 className="font-display text-display-md text-ink text-balance">
                Hayotiy
                <br />
                <span className="italic text-gold-500">fikrlar.</span>
              </h2>
              <p className="text-body-md text-muted leading-relaxed">
                Har bir mijozimizning tajribasi bizga ilhom beradi. Quyida haqiqiy xaridorlarimizning so'zlarini o'qing.
              </p>

              {/* Stats */}
              <div className="flex items-center gap-6 pt-2">
                <div>
                  <p className="font-display text-3xl text-ink">4.9</p>
                  <div className="stars mt-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="star" fill="currentColor" strokeWidth={0} style={{ width: 14, height: 14 }} />
                    ))}
                  </div>
                  <p className="eyebrow mt-1 text-muted/70">o'rtacha baho</p>
                </div>
                <div className="h-12 w-px bg-ink/8" />
                <div>
                  <p className="font-display text-3xl text-ink">200+</p>
                  <p className="eyebrow mt-1 text-muted/70">mijoz baholadi</p>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Oldingi fikr"
                  className="grid h-11 w-11 place-items-center rounded-full ring-1 ring-ink/15
                             text-ink/60 transition-all duration-300 ease-luxury
                             hover:ring-gold-500 hover:text-gold-600 hover:bg-gold-50"
                >
                  <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Keyingi fikr"
                  className="grid h-11 w-11 place-items-center rounded-full ring-1 ring-ink/15
                             text-ink/60 transition-all duration-300 ease-luxury
                             hover:ring-gold-500 hover:text-gold-600 hover:bg-gold-50"
                >
                  <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
                </button>

                {/* Dots */}
                <div className="flex items-center gap-1.5 ml-2">
                  {REVIEWS.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                      aria-label={`${i + 1}-fikr`}
                      className={cn(
                        "rounded-full transition-all duration-400 ease-luxury",
                        i === current
                          ? "w-5 h-1.5 bg-gold-500"
                          : "w-1.5 h-1.5 bg-ink/20 hover:bg-ink/40",
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right — review card */}
            <div className="lg:col-span-8 lg:pl-8">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={review.id}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: luxuryEase }}
                  className="relative rounded-3xl bg-canvas p-8 md:p-10 shadow-card"
                >
                  {/* Quote mark */}
                  <div
                    aria-hidden
                    className="absolute -top-4 left-10 font-display text-7xl text-gold-200 leading-none select-none"
                  >
                    &ldquo;
                  </div>

                  {/* Stars */}
                  <div className="stars mb-6">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className={cn("transition-colors duration-300", i <= review.rating ? "text-gold-500" : "text-ink/10")}
                        fill="currentColor"
                        strokeWidth={0}
                        style={{ width: 18, height: 18 }}
                      />
                    ))}
                  </div>

                  {/* Review text */}
                  <blockquote className="font-display text-2xl md:text-3xl text-ink leading-snug font-light text-balance mb-8">
                    "{review.text}"
                  </blockquote>

                  {/* Divider */}
                  <div className="hairline mb-6" />

                  {/* Author */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {/* Avatar placeholder */}
                      <div className="grid h-12 w-12 place-items-center rounded-full bg-gold-100 text-gold-700 font-display text-xl">
                        {review.name[0]}
                      </div>
                      <div>
                        <p className="font-medium text-ink">{review.name}</p>
                        <p className="text-sm text-muted">{review.city}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-ink/80">{review.product}</p>
                      <p className="text-xs text-muted">{review.date}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Progress bar */}
              <div className="mt-6 h-0.5 w-full overflow-hidden rounded-full bg-ink/8">
                <motion.div
                  key={current}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 6, ease: "linear" }}
                  className="h-full bg-gold-500"
                  onAnimationComplete={() => go(1)}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>

      <div className="hairline-gold mt-16 md:mt-20" />
    </section>
  );
}
