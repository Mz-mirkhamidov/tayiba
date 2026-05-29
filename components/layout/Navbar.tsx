"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Menu, Search, ShoppingBag, User as UserIcon, X } from "lucide-react";
import { BrandMark } from "@/components/ui/BrandMark";
import { Container } from "@/components/ui/Container";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { mainNav } from "@/lib/site";
import { cn } from "@/lib/utils";
import { luxuryEase } from "@/animations/variants";
import { t } from "@/lib/i18n";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";

export function Navbar() {
  const pathname = usePathname();
  const { scrolled } = useScrollPosition(24);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Real-time cart va wishlist sonlari
  const totalItems = useCartStore((s) => s.totalItems());
  const openCart = useCartStore((s) => s.openCart);
  const wishlistCount = useWishlistStore((s) => s.count());

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: luxuryEase }}
        className={cn(
          "fixed inset-x-0 top-0 z-50",
          "transition-[background-color,backdrop-filter,box-shadow] duration-700 ease-luxury",
          scrolled
            ? "bg-bone/80 backdrop-blur-xl shadow-[0_1px_0_rgba(26,26,26,0.06)]"
            : "bg-transparent",
        )}
      >
        <Container className="flex items-center justify-between py-4 md:py-5">
          {/* Mobil menyu */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label={t.nav.menu}
            className="md:hidden grid h-10 w-10 place-items-center rounded-full text-ink hover:bg-ink/[0.04] transition"
          >
            <Menu className="h-5 w-5" strokeWidth={1.5} />
          </button>

          {/* Desktop navigatsiya */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10 flex-1">
            {mainNav.slice(0, 5).map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative text-[12px] tracking-widest uppercase font-medium",
                    "transition-colors duration-500 ease-luxury",
                    active ? "text-ink" : "text-ink/60 hover:text-ink",
                  )}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1.5 left-0 h-px w-full bg-gold-500"
                      transition={{ duration: 0.6, ease: luxuryEase }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Brand belgisi — markazda */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <BrandMark />
          </div>

          {/* O'ng — ikonkalar */}
          <div className="flex items-center gap-1 md:gap-2 flex-1 justify-end">
            {/* Qidiruv */}
            <Link
              href="/catalog"
              aria-label={t.nav.search}
              className="relative grid h-10 w-10 place-items-center rounded-full text-ink/80 hover:text-ink
                         transition-colors duration-500 ease-luxury hover:bg-ink/[0.04]"
            >
              <Search className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </Link>

            {/* Akkaunt — user bo'lsa filled, bo'lmasa outline */}
            <Link
              href="/account"
              aria-label={t.nav.account}
              className="relative hidden md:grid h-10 w-10 place-items-center rounded-full text-ink/80 hover:text-ink
                         transition-colors duration-500 ease-luxury hover:bg-ink/[0.04]"
            >
              <UserIcon className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </Link>

            {/* Sevimlilar — real badge */}
            <Link
              href="/wishlist"
              aria-label={t.nav.wishlist}
              className="relative hidden md:grid h-10 w-10 place-items-center rounded-full text-ink/80 hover:text-ink
                         transition-colors duration-500 ease-luxury hover:bg-ink/[0.04]"
            >
              <Heart className="h-[18px] w-[18px]" strokeWidth={1.5} />
              <AnimatePresence>
                {wishlistCount > 0 && (
                  <motion.span
                    key="wbadge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.3, ease: luxuryEase }}
                    className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center
                               rounded-full bg-emerald-600 text-[9px] font-medium text-bone"
                  >
                    {wishlistCount > 9 ? "9+" : wishlistCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* Savatcha — CartDrawer ochadi */}
            <button
              type="button"
              onClick={openCart}
              aria-label={`${t.nav.cart}${totalItems > 0 ? ` (${totalItems})` : ""}`}
              className="relative grid h-10 w-10 place-items-center rounded-full text-ink/80 hover:text-ink
                         transition-colors duration-500 ease-luxury hover:bg-ink/[0.04]"
            >
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.5} />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    key="cbadge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.3, ease: luxuryEase }}
                    className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center
                               rounded-full bg-ink text-[9px] font-medium text-bone"
                  >
                    {totalItems > 9 ? "9+" : totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </Container>
      </motion.header>

      {/* Mobil drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: luxuryEase }}
            className="fixed inset-0 z-[60] bg-bone"
          >
            <Container className="flex items-center justify-between py-5">
              <BrandMark withArabic />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label={t.nav.close}
                className="grid h-10 w-10 place-items-center rounded-full hover:bg-ink/[0.04]"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </Container>

            <Container className="mt-12">
              <nav className="flex flex-col">
                {mainNav.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: luxuryEase, delay: 0.1 + i * 0.06 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="group block border-b border-ink/10 py-6"
                    >
                      <div className="flex items-baseline justify-between gap-6">
                        <span className="font-display text-4xl text-ink">{item.label}</span>
                        <span className="eyebrow text-ink/45">{String(i + 1).padStart(2, "0")}</span>
                      </div>
                      {item.description && (
                        <p className="mt-2 text-sm text-ink/55">{item.description}</p>
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-12 flex flex-col gap-3 text-sm text-ink/60">
                <Link href="/account" onClick={() => setMobileOpen(false)} className="link-luxury">
                  {t.nav.account}
                </Link>
                <button
                  type="button"
                  onClick={() => { setMobileOpen(false); openCart(); }}
                  className="link-luxury text-left"
                >
                  {t.nav.cart}
                  {totalItems > 0 && (
                    <span className="ml-2 rounded-full bg-ink px-2 py-0.5 text-[10px] text-bone">
                      {totalItems}
                    </span>
                  )}
                </button>
                <Link href="/wishlist" onClick={() => setMobileOpen(false)} className="link-luxury">
                  {t.nav.wishlist}
                  {wishlistCount > 0 && (
                    <span className="ml-2 rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] text-bone">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
                <Link href="/contact" onClick={() => setMobileOpen(false)} className="link-luxury">
                  {t.nav.contact}
                </Link>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
