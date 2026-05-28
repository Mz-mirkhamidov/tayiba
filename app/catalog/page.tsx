import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { CatalogBrowser } from "@/components/product/CatalogBrowser";
import { getAllProducts } from "@/services/products";

export const metadata: Metadata = { title: "Katalog", description: "TAYIBA katalogini ko'rib chiqing." };

export default async function CatalogPage() {
  const products = await getAllProducts();
  return (
    <>
      <PageHero eyebrow="— To'liq atelye" title="Katalog" arabic="مَجموعة" description="Har bir TAYIBA kiyimi bir joyda — sokin, qo'lga yumshoq, yashash uchun tikilgan." />
      <section className="bg-bone py-20 md:py-24"><Container><CatalogBrowser products={products} /></Container></section>
    </>
  );
}
