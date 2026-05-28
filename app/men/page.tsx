import type { Metadata } from "next";
import { CollectionLanding } from "@/components/product/CollectionLanding";
export const metadata: Metadata = { title: "Erkaklar", description: "Sokin sha'n — TAYIBA erkaklar kolleksiyasi." };
export default function MenPage() { return <CollectionLanding collection="men" />; }
