"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Minus, Plus, Send, ShoppingBag, Trash2, X } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { cn, formatPrice } from "@/lib/utils";
import { luxuryEase } from "@/animations/variants";
import { siteConfig } from "@/lib/site";

/**
 * CartDrawer — premium o'ng tomondan chiqadigan savatcha.
 *
 * Layers:
 *   1. Backdrop — sokin bone/70 overlay, bosganida yopiladi
 *   2. Drawer panel — to'liq balandlik, max-w-md
 *   3. Header — TAYIBA belgisi + yopish tugmasi
 *   4. Items scroll area — har bir kiyim: TayibaImage, nom, rang, o'lcham, soni
 *   5. Footer — jami narx + "To'lovga o'tish" + "Telegram orqali buyurtma"
 *
 * Empty state: "Savatcha hali bo'm-bo'sh" — atelye ohangi, hech qachon
 * marketplace uslubi emas.
 */
export function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQty, totalItems, formattedTotal } =
    useCartStore();

  // ESC tugmasi bilan yopish
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, closeCart]);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Telegram buyurtma matnini tuzamiz
  const telegramText = encodeURIComponent(
    [
      "TAYIBA · savatcha buyurtmasi",
      "",
      ...items.map(
        (i) =>
          `${i.name}${i.arabicName ? ` (${i.arabicName})` : ""}\n  Rang: ${i.color.name}  O'lcham: ${i.size.label}  Soni: ${i.quantity}  ${formatPrice(i.price * i.quantity, i.currency)}`,
      ),
      "",
      `Jami: ${formattedTotal()}`,
      "",
      "(tayiba.uz saytidan yuborildi)",
    ].join("\n"),
  );
  const telegramHref = `${siteConfig.social.telegram}?text=${telegramText}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: luxuryEase }}
            onClick={closeCart}
            className="fixed inset-0 z-[70] bg-ink/30 backdrop-blur-sm"
            aria-hidden
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            role="dialog"
            aria-modal
            aria-label="Savatcha"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: luxuryEase }}
            className="fixed right-0 top-0 z-[80] flex h-full w-full max-w-md flex-col bg-bone shadow-luxury"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
              <div>
                <p className="font-display text-2xl text-ink leading-tight">Savatcha</p>
                {totalItems() > 0 && (
                  <p className="mt-0.5 eyebrow text-ink/55">
                    {totalItems()} ta kiyim
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Savatchani yopish"
                className="grid h-10 w-10 place-items-center rounded-full text-ink/70 hover:bg-ink/[0.05] hover:text-ink transition-colors duration-500 ease-luxury"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {items.length === 0 ? (
                <EmptyCart onClose={closeCart} />
              ) : (
                <ul className="space-y-5">
                  {items.map((item) => (
                    <CartItem
                      key={item.key}
                      item={item}
                      onRemove={() => removeItem(item.key)}
                      onQtyChange={(q) => updateQty(item.key, q)}
                    />
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-ink/10 px-6 py-5 space-y-3">
                {/* Jami */}
                <div className="flex items-baseline justify-between">
                  <span className="eyebrow">Jami</span>
                  <motion.span
                    key={formattedTotal()}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: luxuryEase }}
                    className="font-display text-2xl text-ink tabular-nums"
                  >
                    {formattedTotal()}
                  </motion.span>
                </div>

                {/* To'lovga o'tish (Etap 7 uchun placeholder) */}
                <button
                  type="button"
                  disabled
                  className="group flex w-full items-center justify-center gap-2.5 rounded-full
                             bg-ink/20 py-4 text-[12px] uppercase tracking-widest font-medium
                             text-ink/40 cursor-not-allowed"
                >
                  <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
                  To'lov — tez orada
                </button>

                {/* Telegram orqali buyurtma */}
                <a
                  href={telegramHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-full items-center justify-center gap-2.5 rounded-full
                             bg-ink py-4 text-[12px] uppercase tracking-widest font-medium
                             text-bone shadow-soft transition-all duration-700 ease-luxury
                             hover:bg-emerald-700 hover:shadow-luxury"
                >
                  <Send className="h-4 w-4" strokeWidth={1.5} />
                  Telegram orqali buyurtma
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform duration-700 ease-luxury
                               group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.5}
                  />
                </a>

                <p className="text-center text-[11px] text-ink/40">
                  Payme · Click — tez orada ulashiladi
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

// ── CartItem ────────────────────────────────────────────────────────────────

function CartItem({
  item,
  onRemove,
  onQtyChange,
}: {
  item: ReturnType<typeof useCartStore.getState>["items"][number];
  onRemove: () => void;
  onQtyChange: (q: number) => void;
}) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8, transition: { duration: 0.35 } }}
      transition={{ duration: 0.55, ease: luxuryEase }}
      className="flex gap-4"
    >
      {/* Thumbnail */}
      <Link
        href={`/${item.collection}/${item.slug}`}
        className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl shadow-soft"
      >
        {item.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.imageUrl}
            alt={item.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className={cn("h-full w-full", item.swatch)} />
        )}
      </Link>

      {/* Info */}
      <div className="flex flex-1 flex-col justify-between min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link
              href={`/${item.collection}/${item.slug}`}
              className="font-display text-lg text-ink leading-tight hover:text-emerald-700
                         transition-colors duration-500 ease-luxury block truncate"
            >
              {item.name}
              {item.arabicName && (
                <span className="ml-2 font-arabic text-base text-ink/40">
                  {item.arabicName}
                </span>
              )}
            </Link>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5">
              {/* Rang dot */}
              <span className="inline-flex items-center gap-1.5 eyebrow text-ink/55">
                <span
                  className="h-2 w-2 rounded-full ring-1 ring-ink/10"
                  style={{ background: item.color.hex }}
                  aria-hidden
                />
                {item.color.name}
              </span>
              <span className="eyebrow text-ink/55">{item.size.label}</span>
            </div>
          </div>

          {/* O'chirish */}
          <button
            type="button"
            onClick={onRemove}
            aria-label={`${item.name} ni o'chirish`}
            className="shrink-0 grid h-7 w-7 place-items-center rounded-full text-ink/40
                       hover:text-ink hover:bg-ink/[0.05] transition-colors duration-500 ease-luxury"
          >
            <Trash2 className="h-3.5 w-3.5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Narx + soni */}
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm text-ink/70 tabular-nums">
            {formatPrice(item.price * item.quantity, item.currency)}
          </p>

          {/* Soni stepper */}
          <div className="inline-flex items-center rounded-full ring-1 ring-ink/15">
            <button
              type="button"
              onClick={() => onQtyChange(item.quantity - 1)}
              disabled={item.quantity <= 1}
              aria-label="Kamaytirilsin"
              className="grid h-7 w-7 place-items-center rounded-full text-ink/60
                         hover:text-ink hover:bg-ink/[0.04] disabled:opacity-30
                         transition-colors duration-300"
            >
              <Minus className="h-3 w-3" strokeWidth={1.5} />
            </button>
            <span className="w-6 text-center text-sm tabular-nums">{item.quantity}</span>
            <button
              type="button"
              onClick={() => onQtyChange(item.quantity + 1)}
              disabled={item.quantity >= item.maxStock}
              aria-label="Ko'paytirilsin"
              className="grid h-7 w-7 place-items-center rounded-full text-ink/60
                         hover:text-ink hover:bg-ink/[0.04] disabled:opacity-30
                         transition-colors duration-300"
            >
              <Plus className="h-3 w-3" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </motion.li>
  );
}

// ── EmptyCart ────────────────────────────────────────────────────────────────

function EmptyCart({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: luxuryEase }}
      className="flex flex-col items-center justify-center h-full min-h-[40vh] text-center px-6 gap-5"
    >
      <div className="relative grid h-20 w-20 place-items-center rounded-full bg-desert-100">
        <ShoppingBag className="h-8 w-8 text-ink/30" strokeWidth={1.2} />
      </div>
      <div className="space-y-2">
        <p className="eyebrow text-ink/55">— Savatcha</p>
        <p className="font-display text-2xl text-ink">
          Hali bo'm-bo'sh.
        </p>
        <p className="text-sm text-ink/55 leading-luxury max-w-xs">
          Atiyemizdan bir kiyimni tanlang — sokin, mulohazali, yashash uchun tikilgan.
        </p>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="link-luxury text-sm"
      >
        Katalogni ko'rish
      </button>
    </motion.div>
  );
}
