import type { Collection, CollectionSlug } from "@/lib/types";

export const collections: Record<CollectionSlug, Collection> = {
  men: {
    slug: "men", index: "01", name: "Erkaklar", arabicName: "رِجال",
    subtitle: "Sokin sha'n",
    description: "To'b, kaftan va aksessuarlar — o'zini sokin tutadiganlar uchun. Quvvat — vazminlik orqali ifodalanadi.",
    visual: "bg-gradient-to-br from-desert-200 via-desert-100 to-earth-100",
  },
  women: {
    slug: "women", index: "02", name: "Ayollar", arabicName: "نِساء",
    subtitle: "Vazmin latofat",
    description: "Abaya, hijob va to'plamlar — vazminlik yumshoq, mulohazali nafosat sifatida.",
    visual: "bg-gradient-to-br from-desert-50 via-desert-100 to-emerald-50",
  },
  prayer: {
    slug: "prayer", index: "03", name: "Namoz", arabicName: "صَلاة",
    subtitle: "Muqaddas zaruratlar",
    description: "Joynamoz, tasbeh va uy buyumlari — eng muhim daqiqalar uchun yumshoq hamrohlar.",
    visual: "bg-gradient-to-br from-emerald-50 via-desert-50 to-emerald-100",
  },
  gift: {
    slug: "gift", index: "04", name: "Sovg'a", arabicName: "هَدِيَّة",
    subtitle: "Tanlangan sovg'alar",
    description: "Tanlangan qutilar va atelye sertifikatlari — TAYIBA tarzida sevganingizga nur yuborish.",
    visual: "bg-gradient-to-br from-gold-50 via-desert-50 to-gold-100",
  },
};

export const allCollections: Collection[] = Object.values(collections);
export function getCollection(slug: CollectionSlug): Collection { return collections[slug]; }
export function isCollectionSlug(value: string): value is CollectionSlug {
  return ["men", "women", "prayer", "gift"].includes(value);
}
