import "server-only";
import { allProducts } from "@/lib/data/products";
import type { CollectionSlug, Paginated, Product, ProductFilter } from "@/lib/types";
import { getSupabase } from "@/services/supabase";

function applyFilter(products: Product[], filter?: ProductFilter): Product[] {
  if (!filter) return products;
  return products.filter((p) => {
    if (filter.collection && p.collection !== filter.collection) return false;
    if (filter.category && p.category !== filter.category) return false;
    if (filter.isNew !== undefined && Boolean(p.isNew) !== filter.isNew) return false;
    if (filter.search) {
      const q = filter.search.toLowerCase();
      if (!p.name.toLowerCase().includes(q) && !p.shortDescription.toLowerCase().includes(q)) return false;
    }
    return true;
  });
}

export async function getAllProducts(filter?: ProductFilter): Promise<Product[]> {
  const sb = getSupabase();
  if (sb) {
    const { data, error } = await sb.from("products").select("*").eq("is_archived", false);
    if (!error && data) return data as unknown as Product[];
  }
  return applyFilter(allProducts, filter);
}

export async function getProductsByCollection(collection: CollectionSlug): Promise<Product[]> {
  return getAllProducts({ collection });
}

export async function getProductBySlug(collection: CollectionSlug, slug: string): Promise<Product | null> {
  const sb = getSupabase();
  if (sb) {
    const { data, error } = await sb.from("products").select("*").eq("collection", collection).eq("slug", slug).single();
    if (!error && data) return data as unknown as Product;
  }
  return allProducts.find((p) => p.collection === collection && p.slug === slug) ?? null;
}

export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  const all = await getAllProducts();
  const ranked = [...all].sort((a, b) => {
    const score = (p: Product) => (p.isNew ? 2 : 0) + (p.isBestSeller ? 2 : 0) + (p.isLimited ? 1 : 0);
    return score(b) - score(a);
  });
  const seen = new Set<CollectionSlug>();
  const picked: Product[] = [];
  for (const p of ranked) {
    if (!seen.has(p.collection)) { picked.push(p); seen.add(p.collection); if (picked.length >= limit) break; }
  }
  if (picked.length < limit) {
    for (const p of ranked) { if (!picked.includes(p)) picked.push(p); if (picked.length >= limit) break; }
  }
  return picked.slice(0, limit);
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const same = await getProductsByCollection(product.collection);
  return same.filter((p) => p.id !== product.id).slice(0, limit);
}

export async function getAllProductSlugs(): Promise<{ collection: CollectionSlug; slug: string }[]> {
  const products = await getAllProducts();
  return products.map((p) => ({ collection: p.collection, slug: p.slug }));
}

export async function browseProducts(filter: ProductFilter & { page?: number; pageSize?: number } = {}): Promise<Paginated<Product>> {
  const page = filter.page ?? 1;
  const pageSize = filter.pageSize ?? 24;
  const items = await getAllProducts(filter);
  const start = (page - 1) * pageSize;
  return { items: items.slice(start, start + pageSize), total: items.length, page, pageSize };
}
