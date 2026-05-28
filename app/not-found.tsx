import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArabicPattern } from "@/components/ui/ArabicPattern";
import { t } from "@/lib/i18n";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-gradient-madinah pt-32 md:pt-40 pb-24 md:pb-32">
      <ArabicPattern className="absolute inset-0 text-ink" opacity={0.05} />
      <p aria-hidden className="pointer-events-none absolute right-4 top-32 select-none font-arabic text-[28vw] md:text-[14vw] leading-none text-ink/[0.08]">لا</p>
      <Container className="relative">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-ink/40" />
            <span className="eyebrow">{t.notFound.eyebrow}</span>
          </div>
          <h1 className="mt-6 font-display text-display-lg text-ink text-balance">
            <span className="block italic font-light text-emerald-700">{t.notFound.titleOne}</span>
            <span className="block">{t.notFound.titleTwo}</span>
          </h1>
          <p className="mt-8 max-w-md text-base md:text-lg leading-luxury text-ink/65 text-pretty">{t.notFound.description}</p>
          <div className="mt-12 flex flex-wrap gap-4">
            <Button href="/" variant="primary" size="lg" withArrow>{t.notFound.backHome}</Button>
            <Button href="/catalog" variant="ghost" size="lg">{t.notFound.browseCatalog}</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
