import type { Product } from "@/lib/types";

export function ProductJsonLd({ product }: { product: Product }) {
  const totalStock = product.colors.reduce((s, c) => s + c.stock, 0);
  const ld = {
    "@context": "https://schema.org", "@type": "Product",
    name: product.name, description: product.shortDescription, sku: product.id,
    brand: { "@type": "Brand", name: "TAYIBA" },
    offers: {
      "@type": "Offer", priceCurrency: product.currency, price: product.price,
      availability: totalStock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />;
}
