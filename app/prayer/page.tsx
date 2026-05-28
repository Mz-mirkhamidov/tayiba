import type { Metadata } from "next";
import { CollectionLanding } from "@/components/product/CollectionLanding";
export const metadata: Metadata = { title: "Namoz", description: "Muqaddas zaruratlar — TAYIBA namoz kolleksiyasi." };
export default function PrayerPage() { return <CollectionLanding collection="prayer" tone="emerald" />; }
