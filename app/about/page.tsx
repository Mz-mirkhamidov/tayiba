import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ArabicPattern } from "@/components/ui/ArabicPattern";
import { t } from "@/lib/i18n";

export const metadata: Metadata = { title: "Brend haqida", description: "TAYIBA hikoyasi — Madinadan ilhomlangan premium Islomiy moda." };

const pillars = [
  { index: "01", title: "Halol — boshidan oxirigacha", body: "Materiallar, manba, ishlov va o'rash — har bosqichda tekshiriladi." },
  { index: "02", title: "Qo'lda tikilgan atelye", body: "Toshkent atelyemizda kichik turkumlardagi ish. Nuqson — inson niyatining izi." },
  { index: "03", title: "Madinadan ilhomlangan", body: "Sokinlik, vazminlik va yumshoq nur — har bir shakl va finish ortidagi sokin til." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow={t.about.eyebrow} title={t.about.title} arabic="قِصَّة" description={t.about.description} />
      <section className="relative bg-bone py-24 md:py-32">
        <Container size="narrow">
          <div className="space-y-8 text-base md:text-lg leading-luxury text-ink/75">
            {t.about.paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? "first-letter:font-display first-letter:text-6xl first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:text-ink" : ""}>{p}</p>
            ))}
          </div>
        </Container>
      </section>
      <section className="relative overflow-hidden bg-desert-50 py-24 md:py-32">
        <ArabicPattern className="absolute inset-0 text-ink" opacity={0.04} />
        <Container className="relative">
          <SectionTitle eyebrow="— Uchta ustun" title={t.about.pillarsTitle} description={t.about.pillarsDescription} />
          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {pillars.map((p) => (
              <div key={p.index} className="border-t border-ink/15 pt-8">
                <p className="eyebrow">— {p.index}</p>
                <h3 className="mt-4 font-display text-3xl text-ink">{p.title}</h3>
                <p className="mt-4 text-sm leading-luxury text-ink/65">{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
