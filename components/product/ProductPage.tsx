import { notFound } from "next/navigation";
import type { CollectionSlug } from "@/lib/types";
import { getProductBySlug, getRelatedProducts } from "@/services/products";
import { ProductPageContent } from "./ProductPageContent";
import { ProductJsonLd } from "./ProductJsonLd";

export async function ProductPage({ collection, slug }: { collection: CollectionSlug; slug: string }) {
  const product = await getProductBySlug(collection, slug);
  if (!product) notFound();
  const related = await getRelatedProducts(product, 4);
  return (
    <>
      <ProductJsonLd product={product} />
      <ProductPageContent product={product} related={related} />
    </>
  );
}
