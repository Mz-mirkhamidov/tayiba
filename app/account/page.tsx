"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, Mail, Send, User as UserIcon } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { signInWithEmail, signOut } from "@/services/auth";
import { Container } from "@/components/ui/Container";
import { ArabicPattern } from "@/components/ui/ArabicPattern";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { fadeUp, luxuryEase, staggerContainer } from "@/animations/variants";

/**
 * /account — Kirish + Profil sahifasi
 *
 * Holat diagrammasi:
 *   loading   → skeleton spinner
 *   !user     → magic link login + Telegram login tugmalari
 *   user      → dashboard (profil, buyurtmalar, sevimlilar linki)
 *
 * Supabase ulanmagan bo'lsa:
 *   "demo mode" ko'rsatiladi — sayt buzilmaydi.
 */
export default function AccountPage() {
  const { user, loading, isConfigured } = useUser();

  if (loading) return <LoadingState />;
  if (!isConfigured) return <DemoMode />;
  if (!user) return <LoginPage />;
  return <Dashboard user={user} />;
}

// ── Loading ──────────────────────────────────────────────────────────────────

function LoadingState() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="space-y-3 text-center">
        <div className="mx-auto h-px w-24 overflow-hidden bg-ink/10">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
            className="h-full w-1/2 bg-gold-400/60"
          />
        </div>
        <p className="eyebrow text-ink/55">Yuklanmoqda…</p>
      </div>
    </div>
  );
}

// ── Demo Mode ────────────────────────────────────────────────────────────────

function DemoMode() {
  return (
    <section className="relative overflow-hidden bg-gradient-madinah pt-32 md:pt-40 pb-24">
      <ArabicPattern className="absolute inset-0 text-ink" opacity={0.05} />
      <Container className="relative max-w-lg">
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-ink/40" />
          <span className="eyebrow">— Akkaunt</span>
        </div>
        <h1 className="mt-6 font-display text-display-md text-ink">Akkaunt</h1>
        <p className="mt-6 text-base leading-luxury text-ink/65">
          Akkaunt xususiyatlari Supabase ulanganidan keyin faol bo'ladi.
          Hozir sayt to'liq ishlaydi — savatcha, sevimlilar va barcha sahifalar.
        </p>
        <div className="mt-8 rounded-2xl bg-desert-100/80 p-6 space-y-3">
          <p className="eyebrow text-ink/55">— Sozlash uchun</p>
          <p className="text-sm text-ink/70 leading-luxury">
            1. <code className="bg-ink/10 px-1.5 py-0.5 rounded text-xs">NEXT_PUBLIC_SUPABASE_URL</code> va
            {" "}<code className="bg-ink/10 px-1.5 py-0.5 rounded text-xs">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>
            {" "}ni Vercel environment'ga qo'shing
          </p>
          <p className="text-sm text-ink/70 leading-luxury">
            2. <code className="bg-ink/10 px-1.5 py-0.5 rounded text-xs">supabase/migrations/</code> dagi SQL'ni
            Supabase dashboard'ga qo'llang
          </p>
        </div>
        <div className="mt-8">
          <Button href="/catalog" variant="outline" withArrow>
            Katalogni ko'rish
          </Button>
        </div>
      </Container>
    </section>
  );
}

// ── Login Page ───────────────────────────────────────────────────────────────

function LoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;
    setStatus("loading");
    const { error } = await signInWithEmail(email);
    if (error) {
      setErrorMsg(error);
      setStatus("error");
    } else {
      setStatus("sent");
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-madinah pt-32 md:pt-40 pb-24 md:pb-32">
      <ArabicPattern className="absolute inset-0 text-ink" opacity={0.05} />
      <Container className="relative">
        <div className="mx-auto max-w-md">
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Header */}
            <motion.div variants={fadeUp}>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-ink/40" />
                <span className="eyebrow">— Akkaunt</span>
              </div>
              <h1 className="mt-6 font-display text-display-md text-ink text-balance">
                Xush kelibsiz.
              </h1>
              <p className="mt-4 text-base leading-luxury text-ink/65">
                Buyurtmalaringiz, sevimlilaringiz va yetkazib berish ma'lumotlari
                sizni kutmoqda.
              </p>
            </motion.div>

            {/* Magic link forma */}
            <motion.div variants={fadeUp}>
              <AnimatePresence mode="wait">
                {status === "sent" ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: luxuryEase }}
                    className="rounded-2xl bg-emerald-50 border border-emerald-100 p-6 space-y-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                        <Mail className="h-4 w-4" strokeWidth={1.5} />
                      </span>
                      <p className="font-display text-xl text-emerald-900">
                        Xat yuborildi!
                      </p>
                    </div>
                    <p className="text-sm text-emerald-800 leading-luxury">
                      <strong>{email}</strong> manziliga kirish havolasi yuborildi.
                      Pochta qutingizni tekshiring.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="text-xs text-emerald-700 underline"
                    >
                      Boshqa email ishlatish
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleMagicLink}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="eyebrow block mb-2">Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="sizning@email.com"
                        required
                        className="w-full bg-transparent border-b border-ink/20 py-3 text-base
                                   placeholder:text-ink/35 focus:outline-none focus:border-ink
                                   transition-colors duration-500 ease-luxury"
                      />
                    </div>

                    {status === "error" && (
                      <p className="text-sm text-red-500">{errorMsg}</p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "loading" || !email}
                      className={cn(
                        "w-full inline-flex items-center justify-center gap-2.5 rounded-full",
                        "px-7 py-4 text-[12px] uppercase tracking-widest font-medium",
                        "transition-all duration-700 ease-luxury",
                        status === "loading"
                          ? "bg-ink/50 text-bone/60 cursor-not-allowed"
                          : "bg-ink text-bone hover:bg-emerald-700 shadow-soft hover:shadow-luxury",
                      )}
                    >
                      <Mail className="h-4 w-4" strokeWidth={1.5} />
                      {status === "loading" ? "Yuborilmoqda…" : "Kirish havolasini yuborish"}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Divider */}
            <motion.div variants={fadeUp} className="flex items-center gap-4">
              <span className="flex-1 h-px bg-ink/10" />
              <span className="eyebrow text-ink/40">yoki</span>
              <span className="flex-1 h-px bg-ink/10" />
            </motion.div>

            {/* Telegram */}
            <motion.div variants={fadeUp}>
              <TelegramLoginButton />
            </motion.div>

            <motion.div variants={fadeUp}>
              <p className="text-center text-xs text-ink/40 leading-luxury">
                Kirish orqali siz bizning{" "}
                <a href="/faq" className="underline hover:text-ink/70 transition-colors">
                  foydalanish shartlarimizga
                </a>{" "}
                rozilik bildirasiz. Hech qanday parol saqlanmaydi.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

// ── Telegram Login Button ────────────────────────────────────────────────────

function TelegramLoginButton() {
  /**
   * Telegram Login Widget'ini Next.js'da ishlatish uchun Script tag kerak.
   * Etap 6'ning to'liq versiyasida shu widget'i qo'shamiz.
   * Hozir Telegram bot orqali yo'naltirish tugmasi.
   */
  const botUsername = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME ?? "tayiba_bot";

  return (
    <a
      href={`https://t.me/${botUsername}?start=login`}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex w-full items-center justify-center gap-3 rounded-full
                 border border-ink/15 py-4 text-[12px] uppercase tracking-widest font-medium
                 text-ink/80 transition-all duration-700 ease-luxury
                 hover:border-ink/40 hover:bg-ink/[0.02] hover:text-ink"
    >
      {/* Telegram ikonkasi */}
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.932z"/>
      </svg>
      Telegram orqali kirish
    </a>
  );
}

// ── Dashboard ────────────────────────────────────────────────────────────────

function Dashboard({ user }: { user: ReturnType<typeof useUser>["user"] }) {
  const [loggingOut, setLoggingOut] = useState(false);

  const handleSignOut = async () => {
    setLoggingOut(true);
    await signOut();
  };

  const displayName =
    user?.user_metadata?.full_name ??
    user?.user_metadata?.name ??
    user?.email?.split("@")[0] ??
    "Mehmon";

  const email = user?.email;
  const joinedDate = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("uz-UZ", { year: "numeric", month: "long" })
    : null;

  return (
    <section className="relative overflow-hidden bg-gradient-madinah pt-32 md:pt-40 pb-24">
      <ArabicPattern className="absolute inset-0 text-ink" opacity={0.04} />
      <Container className="relative">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          {/* Profil sarlavhasi */}
          <motion.div variants={fadeUp} className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-ink/40" />
                <span className="eyebrow">— Akkaunt</span>
              </div>
              <h1 className="mt-6 font-display text-display-md text-ink">
                Assalomu alaykum,
                <br />
                <span className="italic font-light text-emerald-700">{displayName}.</span>
              </h1>
              {joinedDate && (
                <p className="mt-3 eyebrow text-ink/55">{joinedDate} dan TAYIBA atiyesida</p>
              )}
            </div>

            {/* Avatar */}
            <div className="shrink-0 grid h-16 w-16 place-items-center rounded-full bg-desert-200 text-ink/60 ring-2 ring-bone shadow-soft">
              {user?.user_metadata?.avatar_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.user_metadata.avatar_url} alt={displayName} className="h-full w-full rounded-full object-cover" />
              ) : (
                <UserIcon className="h-7 w-7" strokeWidth={1.3} />
              )}
            </div>
          </motion.div>

          {/* Tezkor havolalar */}
          <motion.div variants={fadeUp} className="mt-12 grid gap-4 sm:grid-cols-2">
            {[
              { href: "/wishlist", label: "Sevimlilar", desc: "Saqlangan kiyimlar", arabic: "قلب" },
              { href: "/account/orders", label: "Buyurtmalar", desc: "Barcha buyurtmalar", arabic: "طلب" },
              { href: "/catalog", label: "Katalog", desc: "Yangi kiyimlar", arabic: "مجموعة" },
              { href: "/contact", label: "Aloqa", desc: "Atelye bilan bog'lanish", arabic: "تواصل" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative overflow-hidden rounded-2xl border border-ink/10 p-6
                           transition-all duration-700 ease-luxury hover:border-ink/25 hover:shadow-soft"
              >
                <span aria-hidden className="absolute right-5 top-5 font-arabic text-4xl text-ink/[0.06] select-none group-hover:text-ink/[0.1] transition-colors duration-700">
                  {item.arabic}
                </span>
                <p className="eyebrow text-ink/55">{item.desc}</p>
                <p className="mt-2 font-display text-2xl text-ink">{item.label}</p>
              </a>
            ))}
          </motion.div>

          {/* Profil ma'lumotlari */}
          {email && (
            <motion.div variants={fadeUp} className="mt-10 rounded-2xl bg-desert-50 p-6 space-y-3">
              <p className="eyebrow text-ink/55">— Profil</p>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-ink/40" strokeWidth={1.5} />
                <p className="text-sm text-ink/70">{email}</p>
              </div>
              {user?.user_metadata?.telegram_username && (
                <div className="flex items-center gap-3">
                  <Send className="h-4 w-4 text-ink/40" strokeWidth={1.5} />
                  <p className="text-sm text-ink/70">@{user.user_metadata.telegram_username}</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Chiqish */}
          <motion.div variants={fadeUp} className="mt-8">
            <button
              type="button"
              onClick={handleSignOut}
              disabled={loggingOut}
              className="inline-flex items-center gap-2 text-sm text-ink/55 hover:text-ink
                         transition-colors duration-500 ease-luxury"
            >
              <LogOut className="h-4 w-4" strokeWidth={1.5} />
              {loggingOut ? "Chiqilmoqda…" : "Chiqish"}
            </button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
