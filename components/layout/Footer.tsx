import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArabicPattern } from "@/components/ui/ArabicPattern";
import { footerNav, siteConfig } from "@/lib/site";
import { t } from "@/lib/i18n";
import { Instagram, Send } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-bone">
      <ArabicPattern className="absolute inset-0 text-bone" opacity={0.05} />
      <Container className="relative pt-24 pb-16 md:pt-32 md:pb-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="eyebrow text-bone/55">{t.footer.statementEyebrow}</span>
            <h2 className="mt-6 font-display text-display-md text-bone text-balance">
              {t.footer.statementTitle}{" "}
              <span className="italic text-gold-200">{t.footer.statementTitleAccent}</span>
            </h2>
            <p className="mt-6 max-w-md text-bone/65 leading-luxury">{siteConfig.meaning}</p>
          </div>
          <div className="lg:col-span-5 lg:pl-12">
            <span className="eyebrow text-bone/55">{t.footer.newsletterEyebrow}</span>
            <p className="mt-4 text-bone/75 leading-luxury">{t.footer.newsletterDescription}</p>
            <form className="mt-6 flex items-center border-b border-bone/25 focus-within:border-gold-300 transition-colors duration-700 ease-luxury">
              <input type="email" required placeholder={t.footer.newsletterPlaceholder} aria-label="Email"
                className="w-full bg-transparent py-3 text-sm text-bone placeholder:text-bone/35 focus:outline-none" />
              <button type="submit" aria-label="Obuna bo'lish"
                className="shrink-0 grid h-10 w-10 place-items-center text-bone/80 hover:text-gold-200 transition-colors duration-500 ease-luxury">
                <Send className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </form>
          </div>
        </div>
      </Container>
      <div className="relative border-t border-bone/10">
        <Container className="grid gap-12 py-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-display text-2xl tracking-[0.4em] uppercase">Tayiba</p>
            <p className="mt-2 font-arabic text-base text-bone/55">{siteConfig.arabicName}</p>
            <p className="mt-6 max-w-xs text-sm text-bone/55 leading-luxury">{t.footer.description}</p>
          </div>
          <div className="md:col-span-2">
            <h3 className="eyebrow text-bone/55">{t.footer.shop}</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {footerNav.shop.map((l) => (
                <li key={l.href}><Link href={l.href} className="text-bone/75 hover:text-gold-200 transition-colors duration-500 ease-luxury">{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            <h3 className="eyebrow text-bone/55">{t.footer.brand}</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {footerNav.brand.map((l) => (
                <li key={l.href}><Link href={l.href} className="text-bone/75 hover:text-gold-200 transition-colors duration-500 ease-luxury">{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-4">
            <h3 className="eyebrow text-bone/55">{t.footer.findUs}</h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li className="text-bone/75">{siteConfig.contact.city}</li>
              <li><a href={`mailto:${siteConfig.contact.email}`} className="text-bone/75 hover:text-gold-200 transition-colors duration-500 ease-luxury">{siteConfig.contact.email}</a></li>
              <li><a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`} className="text-bone/75 hover:text-gold-200 transition-colors duration-500 ease-luxury">{siteConfig.contact.phone}</a></li>
            </ul>
            <div className="mt-7 flex items-center gap-4">
              {[{ href: siteConfig.social.instagram, label: "Instagram", icon: <Instagram className="h-4 w-4" strokeWidth={1.5} /> },
                { href: siteConfig.social.telegram, label: "Telegram", icon: <Send className="h-4 w-4" strokeWidth={1.5} /> }].map((s) => (
                <a key={s.href} href={s.href} aria-label={s.label} target="_blank" rel="noopener noreferrer"
                  className="grid h-9 w-9 place-items-center rounded-full border border-bone/20 text-bone/70 hover:text-gold-200 hover:border-gold-300/60 transition-all duration-500 ease-luxury">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </Container>
      </div>
      <div className="relative border-t border-bone/10">
        <Container className="flex flex-col gap-3 py-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-bone/45">© {new Date().getFullYear()} TAYIBA. {t.footer.rights}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-bone/45">
            {t.footer.payments.join(" · ")}
            <span>·</span>
            <Link href="/faq" className="hover:text-bone/75 transition-colors duration-500">{t.footer.privacy}</Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
