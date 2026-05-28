import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond, Amiri } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { locale } from "@/lib/i18n";
import "./globals.css";

/**
 * Typography trio — "Quiet Luxury" standard:
 *   Cormorant Garamond  → display / editorial serif (H1, H2, H3)
 *   Inter               → clean modern UI / body copy
 *   Amiri               → Arabic accents
 */
const sans = Inter({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500"],
});

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});

const arabic = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tayiba.uz"),
  title: {
    default: "TAYIBA — Premium Islomiy Moda",
    template: "%s · TAYIBA",
  },
  description:
    "TAYIBA — Madinadan ilhomlangan premium Islomiy moda. Halol, qo'lda tikilgan, zamonaviy hashamat — erkak, ayol, namoz va sovg'a uchun.",
  keywords: [
    "TAYIBA", "Islomiy moda", "premium islomiy kiyim", "halol moda",
    "abaya", "to'b", "joynamoz", "Toshkent", "O'zbekiston",
    "modest fashion", "Islamic wear",
  ],
  openGraph: {
    title: "TAYIBA — Premium Islomiy Moda",
    description: "Madinadan ilhomlangan premium Islomiy moda. Halol, qo'lda tikilgan, zamonaviy hashamat.",
    type: "website",
    locale: "uz_UZ",
    siteName: "TAYIBA",
  },
  icons: { icon: "/favicon.svg" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#FBFBFA",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={locale}
      className={`${sans.variable} ${display.variable} ${arabic.variable}`}
    >
      <body className="min-h-screen bg-bone text-ink antialiased">
        <Navbar />
        <main className="relative">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
