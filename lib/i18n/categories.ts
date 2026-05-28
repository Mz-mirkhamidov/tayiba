export const categoryLabels: Record<string, string> = {
  thawb: "to'b", kaftan: "kaftan", abaya: "abaya",
  khimar: "hijob", set: "to'plam", rug: "joynamoz",
  tasbih: "tasbeh", home: "uy", voucher: "sertifikat", accessory: "aksessuar",
};

export function categoryLabel(category: string): string {
  return categoryLabels[category] ?? category;
}
