"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { BrandMark } from "@/components/ui/BrandMark";
import { Container } from "@/components/ui/Container";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { mainNav } from "@/lib/site";
import { cn } from "@/lib/utils";
import { luxuryEase } from "@/animations/variants";
import { t } from "@/lib/i18n";

export function Navbar() {
  const pathname = usePathname();
  const { scrolled } = useScrollPosition(24);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <motion.header initial={{ y: -24, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: luxuryEase }}
        className={cn("fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,box-shadow] duration-700 ease-luxury",
          scrolled ? "bg-bone/85 backdrop-blur-xl shadow-[0_1px_0_rgba(20,17,10,0.06)]" : "bg-transparent")}>
        <Container className="flex items-center justify-between py-4 md:py-5">
          <button type="button" onClick={() => setMobileOpen(true)} aria-label={t.nav.menu}
            className="md:hidden grid h-10 w-10 place-items-center rounded-full text-ink hover:bg-ink/[0.04] transition">
            <Menu className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <nav className="hidden md:flex items-center gap-8 lg:gap-10 flex-1">
            {mainNav.slice(0, 5).map((item) => {
              const active = pathname === item.href;
              return (
                <Link key={item.href} href={item.href}
                  className={cn("relative text-[12px] tracking-widest uppercase font-medium transition-colors duration-500 ease-luxury",
                    active ? "text-ink" : "text-ink/60 hover:text-ink")}>
                  {item.label}
                  {active && <motion.span layoutId="nav-underline" className="absolute -bottom-1.5 left-0 h-px w-full bg-ink" transition={{ duration: 0.6, ease: luxuryEase }} />}
                </Link>
              );
            })}
          </nav>
          <div className="absolute left-1/2 -translate-x-1/2"><BrandMark /></div>
          <div className="flex items-center gap-1 md:gap-2 flex-1 justify-end">
            {[
              { label: t.nav.search, href: "/catalog", icon: <Search className="h-[18px] w-[18px]" strokeWidth={1.5} /> },
              { label: t.nav.account, href: "/account", icon: <User className="h-[18px] w-[18px]" strokeWidth={1.5} />, hideOnMobile: true },
              { label: t.nav.wishlist, href: "/wishlist", icon: <Heart className="h-[18px] w-[18px]" strokeWidth={1.5} />, hideOnMobile: true },
              { label: t.nav.cart, href: "/cart", icon: <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.5} />, badge: true },
            ].map((item) => (
              <Link key={item.href} href={item.href} aria-label={item.label}
                className={cn("relative grid h-10 w-10 place-items-center rounded-full text-ink/80 hover:text-ink transition-colors duration-500 ease-luxury hover:bg-ink/[0.04]",
                  (item as { hideOnMobile?: boolean }).hideOnMobile && "hidden md:grid")}>
                {item.icon}
                {(item as { badge?: boolean }).badge && <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-emerald-600" />}
              </Link>
            ))}
          </div>
        </Container>
      </motion.header>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: luxuryEase }} className="fixed inset-0 z-[60] bg-bone">
            <Container className="flex items-center justify-between py-5">
              <BrandMark withArabic />
              <button type="button" onClick={() => setMobileOpen(false)} aria-label={t.nav.close}
                className="grid h-10 w-10 place-items-center rounded-full hover:bg-ink/[0.04]">
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </Container>
            <Container className="mt-12">
              <nav className="flex flex-col">
                {mainNav.map((item, i) => (
                  <motion.div key={item.href} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: luxuryEase, delay: 0.1 + i * 0.06 }}>
                    <Link href={item.href} onClick={() => setMobileOpen(false)}
                      className="group block border-b border-ink/10 py-6">
                      <div className="flex items-baseline justify-between gap-6">
                        <span className="font-display text-4xl text-ink">{item.label}</span>
                        <span className="eyebrow text-ink/45">{String(i + 1).padStart(2, "0")}</span>
                      </div>
                      {item.description && <p className="mt-2 text-sm text-ink/55">{item.description}</p>}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
