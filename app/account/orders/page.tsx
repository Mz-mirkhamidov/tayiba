"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { getSupabase } from "@/services/supabase";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { fadeUp, staggerContainer, luxuryEase } from "@/animations/variants";

interface Order {
  id: string;
  status: string;
  total: number;
  currency: "UZS" | "USD";
  items: Array<{ name: string; quantity: number; price: number }>;
  created_at: string;
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending: { label: "Kutilmoqda", color: "text-gold-500" },
  paid: { label: "To'langan", color: "text-emerald-600" },
  shipped: { label: "Yo'lda", color: "text-emerald-700" },
  delivered: { label: "Yetkazildi", color: "text-emerald-800" },
  cancelled: { label: "Bekor qilindi", color: "text-ink/40" },
};

export default function OrdersPage() {
  const { user, loading } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (!user) return;
    const sb = getSupabase();
    if (!sb) return;
    setFetching(true);
    sb.from("orders")
      .select("id, status, total, currency, items, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setOrders((data ?? []) as Order[]);
        setFetching(false);
      });
  }, [user]);

  if (loading || fetching) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="mx-auto h-px w-24 overflow-hidden bg-ink/10">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
            className="h-full w-1/2 bg-gold-400/60"
          />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center">
        <Container>
          <div className="text-center space-y-4">
            <p className="eyebrow text-ink/55">— Buyurtmalar</p>
            <p className="font-display text-3xl text-ink">Kirish kerak</p>
            <Button href="/account" variant="primary">Akkauntga kirish</Button>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-bone pt-32 pb-24">
      <Container>
        <div className="flex items-center gap-3 mb-12">
          <span className="h-px w-10 bg-ink/40" />
          <span className="eyebrow">— Akkaunt · Buyurtmalar</span>
        </div>
        <h1 className="font-display text-display-md text-ink mb-10">Buyurtmalar</h1>

        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: luxuryEase }}
            className="flex flex-col items-center py-24 text-center gap-6"
          >
            <div className="grid h-20 w-20 place-items-center rounded-full bg-desert-100">
              <ShoppingBag className="h-9 w-9 text-ink/25" strokeWidth={1.2} />
            </div>
            <div className="space-y-2">
              <p className="font-display text-2xl text-ink">Hali buyurtma yo'q.</p>
              <p className="text-sm text-ink/55">
                Birinchi buyurtmangizni qiling — savatcha yoki Telegram orqali.
              </p>
            </div>
            <Button href="/catalog" variant="outline" withArrow>Katalogni ko'rish</Button>
          </motion.div>
        ) : (
          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {orders.map((order) => {
              const status = STATUS_LABELS[order.status] ?? { label: order.status, color: "text-ink/55" };
              return (
                <motion.div
                  key={order.id}
                  variants={fadeUp}
                  className="rounded-2xl border border-ink/10 p-6 transition-shadow duration-700 ease-luxury hover:shadow-soft"
                >
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <p className="eyebrow text-ink/55">
                        {new Date(order.created_at).toLocaleDateString("uz-UZ", {
                          day: "numeric", month: "long", year: "numeric",
                        })}
                      </p>
                      <p className="mt-2 font-display text-xl text-ink">
                        {(order.items as Order["items"]).map((i) => i.name).join(", ")}
                      </p>
                      <p className="mt-1 text-sm text-ink/55">
                        {(order.items as Order["items"]).reduce((s, i) => s + i.quantity, 0)} ta kiyim
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className={`eyebrow ${status.color}`}>{status.label}</p>
                      <p className="mt-1 font-display text-xl text-ink tabular-nums">
                        {formatPrice(order.total, order.currency)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </Container>
    </section>
  );
}
