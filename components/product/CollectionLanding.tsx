import type { CollectionSlug } from "@/lib/types";
import { getCollection } from "@/lib/data/collections";
import { getProductsByCollection } from "@/services/products";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { CollectionGrid } from "./CollectionGrid";

export async function CollectionLanding({ collection, tone }: { collection: CollectionSlug; tone?: "desert" | "emerald" | "ink" }) {
  const meta = getCollection(collection);
  const products = await getProductsByCollection(collection);
  return (
    <>
      <PageHero eyebrow={`— ${meta.subtitle}`} title={`${meta.name} · ${meta.subtitle}.`}
        arabic={meta.arabicName} description={meta.description}
        tone={tone ?? (collection === "prayer" ? "emerald" : "desert")} />
      <section className="bg-bone py-20 md:py-24">
        <Container><CollectionGrid products={products} /></Container>
      </section>
    </>
  );
}
