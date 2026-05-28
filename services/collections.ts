import "server-only";
import { allCollections, getCollection } from "@/lib/data/collections";
import type { Collection, CollectionSlug } from "@/lib/types";
import { getSupabase } from "@/services/supabase";

export async function getAllCollections(): Promise<Collection[]> {
  const sb = getSupabase();
  if (sb) {
    const { data, error } = await sb.from("collections").select("*");
    if (!error && data && data.length === allCollections.length) return data as unknown as Collection[];
  }
  return allCollections;
}

export async function getCollectionBySlug(slug: CollectionSlug): Promise<Collection> {
  const sb = getSupabase();
  if (sb) {
    const { data, error } = await sb.from("collections").select("*").eq("slug", slug).single();
    if (!error && data) return data as unknown as Collection;
  }
  return getCollection(slug);
}
