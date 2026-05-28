import type { Metadata } from "next";
import { CollectionLanding } from "@/components/product/CollectionLanding";
export const metadata: Metadata = { title: "Ayollar", description: "Vazmin latofat — TAYIBA ayollar kolleksiyasi." };
export default function WomenPage() { return <CollectionLanding collection="women" />; }
