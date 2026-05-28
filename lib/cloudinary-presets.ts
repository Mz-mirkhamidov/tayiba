export type CloudinaryPreset = "card" | "card-2x" | "gallery" | "gallery-thumb" | "collection-hero" | "page-hero" | "og" | "lqip";

const PRESETS: Record<CloudinaryPreset, { width: number; height: number; crop: string; extras?: string[] }> = {
  card: { width: 800, height: 1000, crop: "fill" },
  "card-2x": { width: 1600, height: 2000, crop: "fill" },
  gallery: { width: 1200, height: 1500, crop: "fill" },
  "gallery-thumb": { width: 200, height: 250, crop: "fill" },
  "collection-hero": { width: 1200, height: 1500, crop: "fill" },
  "page-hero": { width: 1920, height: 1080, crop: "fill" },
  og: { width: 1200, height: 630, crop: "fill" },
  lqip: { width: 24, height: 30, crop: "fill", extras: ["e_blur:1000", "q_20"] },
};

export function transformation(preset: CloudinaryPreset): string {
  const spec = PRESETS[preset];
  return ["f_auto", "q_auto", `c_${spec.crop}`, "g_auto", `w_${spec.width}`, `h_${spec.height}`, "dpr_auto", ...(spec.extras ?? [])].join(",");
}

export function dimensionsFor(preset: CloudinaryPreset): { width: number; height: number } {
  return { width: PRESETS[preset].width, height: PRESETS[preset].height };
}
