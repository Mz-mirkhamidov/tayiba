import type { MetadataRoute } from "next";
import { getAllProducts } from "@/services/products";

const BASE_URL = "https://tayiba.uz";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProducts();
  const now = new Date();
  const staticRoutes = ["", "/catalog", "/men", "/women", "/prayer", "/gift", "/about", "/faq", "/contact"];
  return [
    ...staticRoutes.map((path) => ({ url: `${BASE_URL}${path}`, lastModified: now, changeFrequency: "weekly" as const, priority: path === "" ? 1.0 : 0.7 })),
    ...products.map((p) => ({ url: `${BASE_URL}/${p.collection}/${p.slug}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.6 })),
  ];
}
