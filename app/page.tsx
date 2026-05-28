import { Hero } from "@/components/home/Hero";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { StoryModule } from "@/components/home/StoryModule";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { ClosingInvitation } from "@/components/home/ClosingInvitation";
import { MarqueeRibbon } from "@/components/ui/MarqueeRibbon";
import { getFeaturedProducts } from "@/services/products";
import { getAllCollections } from "@/services/collections";
import { t } from "@/lib/i18n";

export default async function HomePage() {
  const [featured, collections] = await Promise.all([getFeaturedProducts(4), getAllCollections()]);
  return (
    <>
      <Hero />
      <MarqueeRibbon items={[...t.home.marquee]} />
      <FeaturedCollections collections={collections} />
      <StoryModule />
      <FeaturedProducts products={featured} />
      <ClosingInvitation />
    </>
  );
}
