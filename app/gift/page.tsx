import type { Metadata } from "next";
import { CollectionLanding } from "@/components/product/CollectionLanding";
export const metadata: Metadata = { title: "Sovg'a", description: "Tanlangan sovg'alar — TAYIBA sovg'a kolleksiyasi." };
export default function GiftPage() { return <CollectionLanding collection="gift" />; }
