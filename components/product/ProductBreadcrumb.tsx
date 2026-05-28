import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Product } from "@/lib/types";
import { getCollection } from "@/lib/data/collections";

export function ProductBreadcrumb({ product }: { product: Product }) {
  const collection = getCollection(product.collection);
  return (
    <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-widest text-ink/55">
      <ol className="flex flex-wrap items-center gap-2">
        <li><Link href="/" className="hover:text-ink transition-colors duration-500 ease-luxury">Bosh sahifa</Link></li>
        <li aria-hidden><ChevronRight className="h-3 w-3 opacity-50" strokeWidth={1.5} /></li>
        <li><Link href={`/${collection.slug}`} className="hover:text-ink transition-colors duration-500 ease-luxury">{collection.name}</Link></li>
        <li aria-hidden><ChevronRight className="h-3 w-3 opacity-50" strokeWidth={1.5} /></li>
        <li className="text-ink"><span aria-current="page">{product.name}</span></li>
      </ol>
    </nav>
  );
}
