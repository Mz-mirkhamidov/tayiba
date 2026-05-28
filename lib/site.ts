import { t } from "@/lib/i18n";

export const siteConfig = {
  name: "TAYIBA",
  tagline: t.brand.tagline,
  description: "Madinadan ilhomlangan premium Islomiy moda. Halol, qo'lda tikilgan, zamonaviy hashamat.",
  arabicName: t.brand.arabic,
  meaning: t.brand.meaning,
  social: {
    instagram: "https://instagram.com/tayiba.uz",
    telegram: "https://t.me/tayiba_uz",
    tiktok: "https://tiktok.com/@tayiba.uz",
  },
  contact: {
    email: "salam@tayiba.uz",
    phone: "+998 90 000 00 00",
    city: "Toshkent, O'zbekiston",
  },
} as const;

export type NavItem = { label: string; href: string; description?: string };

export const mainNav: NavItem[] = [
  { label: t.nav.catalog, href: "/catalog", description: "Barcha kolleksiyalar" },
  { label: t.nav.men, href: "/men", description: "Erkaklar uchun" },
  { label: t.nav.women, href: "/women", description: "Ayollar uchun" },
  { label: t.nav.prayer, href: "/prayer", description: "Muqaddas zaruratlar" },
  { label: t.nav.gift, href: "/gift", description: "Tanlangan sovg'alar" },
  { label: t.nav.about, href: "/about", description: "Brend hikoyasi" },
];

export const footerNav = {
  shop: [
    { label: t.nav.catalog, href: "/catalog" },
    { label: t.nav.men, href: "/men" },
    { label: t.nav.women, href: "/women" },
    { label: t.nav.prayer, href: "/prayer" },
    { label: t.nav.gift, href: "/gift" },
  ],
  brand: [
    { label: "TAYIBA haqida", href: "/about" },
    { label: t.nav.faq, href: "/faq" },
    { label: t.nav.contact, href: "/contact" },
  ],
} as const;
