"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { luxuryEase } from "@/animations/variants";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: string;
}

const APPAREL_SIZES = [
  { size: "XS", chest: "80–84", waist: "62–66", hip: "88–92", height: "155–162" },
  { size: "S",  chest: "84–88", waist: "66–70", hip: "92–96", height: "160–167" },
  { size: "M",  chest: "88–94", waist: "70–76", hip: "96–100", height: "165–172" },
  { size: "L",  chest: "94–100", waist: "76–82", hip: "100–106", height: "170–177" },
  { size: "XL", chest: "100–108", waist: "82–90", hip: "106–114", height: "175–182" },
  { size: "XXL", chest: "108–116", waist: "90–98", hip: "114–122", height: "178–185" },
];

const THAWB_SIZES = [
  { size: "S",   length: "140", shoulder: "44", sleeve: "57" },
  { size: "M",   length: "143", shoulder: "46", sleeve: "59" },
  { size: "L",   length: "146", shoulder: "48", sleeve: "61" },
  { size: "XL",  length: "149", shoulder: "50", sleeve: "63" },
  { size: "XXL", length: "152", shoulder: "52", sleeve: "65" },
];

export function SizeGuideModal({ isOpen, onClose, category = "apparel" }: SizeGuideModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (isOpen) {
      window.addEventListener("keydown", handler);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const isThawb = category === "thawb" || category === "kaftan";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div key="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: luxuryEase }}
            onClick={onClose} className="fixed inset-0 z-[90] bg-ink/35 backdrop-blur-sm" aria-hidden />
          <motion.div key="modal" initial={{ opacity: 0, scale: 0.97, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }} transition={{ duration: 0.45, ease: luxuryEase }}
            role="dialog" aria-modal aria-label="O'lchamlar yo'riqnomasi"
            className="fixed left-1/2 top-1/2 z-[100] w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 px-4">
            <div className="relative rounded-3xl bg-canvas shadow-luxury overflow-hidden">
              <div className="flex items-center justify-between border-b border-ink/8 px-8 py-6">
                <div>
                  <p className="eyebrow text-gold-500">— O'lchamlar</p>
                  <h2 className="mt-1 font-display text-2xl text-ink">O'lchamlar yo'riqnomasi</h2>
                </div>
                <button type="button" onClick={onClose} aria-label="Yopish"
                  className="grid h-10 w-10 place-items-center rounded-full text-ink/50 transition-all duration-300 ease-luxury hover:bg-surface hover:text-ink">
                  <X className="h-5 w-5" strokeWidth={1.5} />
                </button>
              </div>
              <div className="overflow-y-auto max-h-[65vh] px-8 py-6 space-y-8">
                <div className="rounded-2xl bg-gold-50/60 p-5 space-y-2">
                  <p className="eyebrow text-gold-600">— Maslahat</p>
                  <p className="text-sm text-muted leading-relaxed">
                    O'lchamni to'g'ri olish uchun kiyim ustiga emas, to'g'ridan-to'g'ri tanaga centimetri bilan o'lchang. Barcha o'lchamlar santimetrlarda.
                  </p>
                </div>
                {isThawb ? (
                  <div>
                    <h3 className="font-display text-xl text-ink mb-4">To'b va Kaftan o'lchamlari</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-ink/8">
                            {["O'lcham", "Uzunlik (sm)", "Yelka (sm)", "Yeng (sm)"].map((h) => (
                              <th key={h} className="py-3 pr-6 text-left eyebrow text-muted">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {THAWB_SIZES.map((row, i) => (
                            <tr key={row.size} className={cn("border-b border-ink/5", i % 2 === 0 ? "bg-surface/30" : "")}>
                              <td className="py-3 pr-6 font-medium text-ink">{row.size}</td>
                              <td className="py-3 pr-6 text-muted">{row.length}</td>
                              <td className="py-3 pr-6 text-muted">{row.shoulder}</td>
                              <td className="py-3 pr-6 text-muted">{row.sleeve}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="font-display text-xl text-ink mb-4">Kiyimlar (sm)</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-ink/8">
                            {["O'lcham", "Ko'krak", "Bel", "Tos", "Bo'y"].map((h) => (
                              <th key={h} className="py-3 pr-6 text-left eyebrow text-muted">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {APPAREL_SIZES.map((row, i) => (
                            <tr key={row.size} className={cn("border-b border-ink/5", i % 2 === 0 ? "bg-surface/30" : "")}>
                              <td className="py-3 pr-6 font-medium text-ink">{row.size}</td>
                              <td className="py-3 pr-6 text-muted">{row.chest}</td>
                              <td className="py-3 pr-6 text-muted">{row.waist}</td>
                              <td className="py-3 pr-6 text-muted">{row.hip}</td>
                              <td className="py-3 pr-6 text-muted">{row.height}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                <div>
                  <p className="eyebrow text-muted mb-2">— Agar ikki o'lcham orasida bo'lsangiz</p>
                  <p className="text-sm text-muted leading-relaxed">
                    Katroq o'lchamni tanlashni maslahat beramiz. TAYIBA kiyimlari bemalol siluetda tikilgan.
                    Aniqroq ma'lumot uchun{" "}
                    <a href="https://t.me/tayiba_uz" target="_blank" rel="noopener noreferrer"
                      className="text-gold-600 hover:underline">Telegram</a> orqali bizga yozing.
                  </p>
                </div>
              </div>
              <div className="border-t border-ink/8 px-8 py-5 flex items-center justify-between">
                <p className="text-xs text-muted">
                  Savol? <a href="https://t.me/tayiba_uz" target="_blank" rel="noopener noreferrer"
                    className="text-gold-600 hover:underline">@tayiba_uz</a>
                </p>
                <button type="button" onClick={onClose} className="btn-outline py-2.5 px-6">Yopish</button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
