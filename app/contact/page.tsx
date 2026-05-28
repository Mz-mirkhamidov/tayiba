import type { Metadata } from "next";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";
import { t } from "@/lib/i18n";

export const metadata: Metadata = { title: "Aloqa", description: "TAYIBA atelyemiz bilan bog'laning." };

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow={t.contact.eyebrow} title={t.contact.title} arabic="تَواصُل" description={t.contact.description} />
      <section className="bg-bone py-20 md:py-28">
        <Container>
          <div className="grid gap-16 lg:grid-cols-12">
            <form className="lg:col-span-7 grid gap-6 sm:grid-cols-2">
              {[{ label: t.contact.form.name, name: "name" }, { label: t.contact.form.email, name: "email", type: "email" }].map((f) => (
                <label key={f.name} className="block">
                  <span className="eyebrow">{f.label}</span>
                  <input name={f.name} type={f.type ?? "text"} required className="mt-2 block w-full bg-transparent border-b border-ink/15 py-3 text-sm text-ink placeholder:text-ink/35 focus:outline-none focus:border-ink transition-colors duration-500 ease-luxury" />
                </label>
              ))}
              <label className="block sm:col-span-2">
                <span className="eyebrow">{t.contact.form.subject}</span>
                <input name="subject" type="text" className="mt-2 block w-full bg-transparent border-b border-ink/15 py-3 text-sm text-ink placeholder:text-ink/35 focus:outline-none focus:border-ink transition-colors duration-500 ease-luxury" />
              </label>
              <label className="block sm:col-span-2">
                <span className="eyebrow">{t.contact.form.message}</span>
                <textarea name="message" rows={6} required className="mt-2 block w-full bg-transparent border-b border-ink/15 py-3 text-sm text-ink placeholder:text-ink/35 focus:outline-none focus:border-ink transition-colors duration-500 ease-luxury resize-none" />
              </label>
              <div className="sm:col-span-2 mt-2"><Button variant="primary" size="lg" withArrow>{t.contact.form.submit}</Button></div>
            </form>
            <aside className="lg:col-span-5 lg:pl-8">
              <h2 className="font-display text-3xl text-ink">{t.contact.coordinates.title}</h2>
              <p className="mt-3 max-w-md text-ink/65 leading-luxury">{t.contact.coordinates.description}</p>
              <ul className="mt-10 space-y-6 text-sm">
                {[
                  { icon: <MapPin className="h-4 w-4" strokeWidth={1.5} />, label: t.contact.coordinates.studio, value: siteConfig.contact.city },
                  { icon: <Mail className="h-4 w-4" strokeWidth={1.5} />, label: t.contact.coordinates.email, href: `mailto:${siteConfig.contact.email}`, value: siteConfig.contact.email },
                  { icon: <Phone className="h-4 w-4" strokeWidth={1.5} />, label: t.contact.coordinates.phone, href: `tel:${siteConfig.contact.phone.replace(/\s/g, "")}`, value: siteConfig.contact.phone },
                  { icon: <Send className="h-4 w-4" strokeWidth={1.5} />, label: t.contact.coordinates.telegram, href: siteConfig.social.telegram, value: "@tayiba_uz", external: true },
                ].map((item) => (
                  <li key={item.label} className="flex items-start gap-4">
                    <span className="mt-0.5 grid h-8 w-8 place-items-center rounded-full border border-ink/15 text-ink/70">{item.icon}</span>
                    <div>
                      <p className="eyebrow">{item.label}</p>
                      <p className="mt-1 text-base text-ink/80">
                        {item.href ? (
                          <a href={item.href} className="hover:text-emerald-700 transition-colors duration-500" {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{item.value}</a>
                        ) : item.value}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
