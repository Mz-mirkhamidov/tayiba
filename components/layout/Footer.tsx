import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { footerNav, siteConfig } from "@/lib/site";
import { Instagram, Phone, Send, Mail, MapPin } from "lucide-react";

/**
 * Footer — Premium Minimalist.
 * Haqiqiy aloqa ma'lumotlari, real havolalar, professional ko'rinish.
 */
export function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white">
      {/* Gold divider top */}
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent 0%, rgba(197,168,128,0.5) 50%, transparent 100%)" }} />

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12">

          {/* Brand column */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="font-display text-3xl tracking-[0.45em] uppercase text-white">
                Tayiba
              </p>
              <p className="mt-1.5 font-arabic text-lg text-white/40">{siteConfig.arabicName}</p>
            </div>
            <p className="text-sm text-white/55 leading-relaxed max-w-sm">
              {siteConfig.meaning}
            </p>

            {/* Real contact info */}
            <div className="space-y-3">
              <a
                href={`tel:${siteConfig.contact.phone.replace(/[\s\-\+]/g, "")}`}
                className="flex items-center gap-3 text-sm text-white/60 hover:text-[#C5A880] transition-colors duration-300 group"
              >
                <Phone className="h-4 w-4 shrink-0 text-[#C5A880]" strokeWidth={1.5} />
                {siteConfig.contact.phone}
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-3 text-sm text-white/60 hover:text-[#C5A880] transition-colors duration-300"
              >
                <Mail className="h-4 w-4 shrink-0 text-[#C5A880]" strokeWidth={1.5} />
                {siteConfig.contact.email}
              </a>
              <div className="flex items-center gap-3 text-sm text-white/60">
                <MapPin className="h-4 w-4 shrink-0 text-[#C5A880]" strokeWidth={1.5} />
                {siteConfig.contact.city}
              </div>
            </div>

            {/* Social links — real URLs */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.social.telegram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/15
                           text-xs text-white/60 hover:border-[#C5A880] hover:text-[#C5A880]
                           transition-all duration-300"
              >
                <Send className="h-3.5 w-3.5" strokeWidth={1.5} />
                Telegram
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/15
                           text-xs text-white/60 hover:border-[#C5A880] hover:text-[#C5A880]
                           transition-all duration-300"
              >
                <Instagram className="h-3.5 w-3.5" strokeWidth={1.5} />
                Instagram
              </a>
            </div>
          </div>

          {/* Nav columns */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-8 md:grid-cols-3 md:gap-12">
            {/* Shop */}
            <div>
              <h3 className="text-ui-xs uppercase tracking-widest text-[#C5A880] mb-5">Do'kon</h3>
              <ul className="space-y-3">
                {footerNav.shop.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-white/55 hover:text-[#C5A880] transition-colors duration-300"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Brand */}
            <div>
              <h3 className="text-ui-xs uppercase tracking-widest text-[#C5A880] mb-5">Brend</h3>
              <ul className="space-y-3">
                {footerNav.brand.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-white/55 hover:text-[#C5A880] transition-colors duration-300"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-ui-xs uppercase tracking-widest text-[#C5A880] mb-5">Yangiliklar</h3>
              <p className="text-sm text-white/55 leading-relaxed mb-4">
                Yangi kolleksiyalar haqida birinchi bo'lib xabar oling.
              </p>
              <form className="flex items-center gap-2">
                <input
                  type="email"
                  required
                  placeholder="Email manzilingiz"
                  aria-label="Email"
                  className="flex-1 min-w-0 bg-white/8 border border-white/10 rounded-full
                             px-4 py-2.5 text-sm text-white placeholder:text-white/30
                             focus:outline-none focus:border-[#C5A880]
                             transition-colors duration-300"
                />
                <button
                  type="submit"
                  className="shrink-0 grid h-10 w-10 place-items-center rounded-full
                             bg-[#C5A880] text-[#1A1A1A] hover:bg-[#D4AF7A]
                             transition-colors duration-300"
                  aria-label="Obuna bo'lish"
                >
                  <Send className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Gold divider */}
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent 0%, rgba(197,168,128,0.3) 50%, transparent 100%)" }} />

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} TAYIBA. Barcha huquqlar himoyalangan.
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/30">
            <span>Payme</span>
            <span>·</span>
            <span>Click</span>
            <span>·</span>
            <span>Naqd (yetkazib berish)</span>
            <span>·</span>
            <Link href="/faq" className="hover:text-[#C5A880] transition-colors duration-300">
              Maxfiylik
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
