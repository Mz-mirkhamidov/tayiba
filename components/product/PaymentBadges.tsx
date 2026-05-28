import { CreditCard, Send, Truck } from "lucide-react";
import { t } from "@/lib/i18n";

export function PaymentBadges() {
  return (
    <ul className="grid grid-cols-3 gap-3 border-t border-ink/10 pt-6 text-[11px] uppercase tracking-widest text-ink/55">
      <li className="flex items-center gap-2"><CreditCard className="h-3.5 w-3.5" strokeWidth={1.5} />{t.product.payment.cards}</li>
      <li className="flex items-center gap-2"><Send className="h-3.5 w-3.5" strokeWidth={1.5} />{t.product.payment.telegram}</li>
      <li className="flex items-center gap-2"><Truck className="h-3.5 w-3.5" strokeWidth={1.5} />{t.product.payment.delivery}</li>
    </ul>
  );
}
