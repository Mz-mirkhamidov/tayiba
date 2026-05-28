import type { Metadata } from "next";
import { ProductPage } from "@/components/product/ProductPage";
import { getAllProductSlugs, getProductBySlug } from "@/services/products";

export async function generateStaticParams() {
  return (await getAllProductSlugs()).filter((s) => s.collection === "prayer").map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const p = await getProductBySlug("prayer", params.slug);
  return p ? { title: p.name, description: p.shortDescription } : { title: "Topilmadi" };
}
export default function Page({ params }: { params: { slug: string } }) {
  return <ProductPage collection="prayer" slug={params.slug} />;
}
