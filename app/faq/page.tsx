"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { luxuryEase } from "@/animations/variants";
import { cn } from "@/lib/utils";
import { t } from "@/lib/i18n";

export default function FAQPage() {
  return (
    <>
      <PageHero eyebrow={t.faq.eyebrow} title={t.faq.title} arabic="سؤال" description={t.faq.description} />
      <section className="bg-bone py-20 md:py-24">
        <Container size="narrow">
          <div className="divide-y divide-ink/10 border-y border-ink/10">
            {t.faq.items.map((item, i) => <FAQItem key={i} item={item} index={i} />)}
          </div>
        </Container>
      </section>
    </>
  );
}

function FAQItem({ item, index }: { item: { q: string; a: string }; index: number }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <div>
      <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open}
        className="flex w-full items-start justify-between gap-6 py-7 text-left transition-colors duration-500 ease-luxury">
        <span className="font-display text-2xl md:text-3xl text-ink leading-tight text-balance">{item.q}</span>
        <span className={cn("shrink-0 grid h-10 w-10 place-items-center rounded-full border border-ink/15 text-ink transition-all duration-700 ease-luxury", open && "bg-ink text-bone border-ink rotate-45")}>
          <Plus className="h-4 w-4" strokeWidth={1.5} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.7, ease: luxuryEase }} className="overflow-hidden">
            <p className="pb-7 max-w-2xl text-base leading-luxury text-ink/65">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
