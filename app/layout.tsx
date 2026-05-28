import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond, Amiri } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { locale } from "@/lib/i18n";
import "./globals.css";

const sans = Inter({ subsets: ["latin", "cyrillic", "cyrillic-ext"], variable: "--font-sans", display: "swap" });
const display = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-display", display: "swap" });
const arabic = Amiri({ subsets: ["arabic", "latin"], weight: ["400", "700"], variable: "--font-arabic", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://tayiba.uz"),
  title: { default: "TAYIBA — Premium Islomiy Moda", template: "%s · TAYIBA" },
  description: "TAYIBA — Madinadan ilhomlangan premium Islomiy moda. Halol, qo'lda tikilgan, zamonaviy hashamat.",
  keywords: ["TAYIBA", "Islomiy moda", "premium islomiy kiyim", "halol moda", "abaya", "to'b", "Toshkent", "O'zbekiston"],
  openGraph: {
    title: "TAYIBA — Premium Islomiy Moda",
    description: "Madinadan ilhomlangan premium Islomiy moda.",
    type: "website",
    locale: "uz_UZ",
    siteName: "TAYIBA",
  },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = { themeColor: "#FBFAF6", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={locale} className={`${sans.variable} ${display.variable} ${arabic.variable}`}>
      <body className="min-h-screen bg-bone text-ink antialiased">
        <Navbar />
        <main className="relative">{children}</main>
        <Footer />
        {/* CartDrawer — global, har sahifada mavjud */}
        <CartDrawer />
      </body>
    </html>
  );
}
