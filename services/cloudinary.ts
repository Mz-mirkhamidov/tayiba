import { type CloudinaryPreset, transformation } from "@/lib/cloudinary-presets";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "";

export function isCloudinaryConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
}

export function cloudinaryUrl(publicId: string, { preset, extra, version, format }: {
  preset: CloudinaryPreset; extra?: string; version?: string; format?: string;
}): string {
  const t = extra ? `${transformation(preset)}/${extra}` : transformation(preset);
  const v = version ? `/v${version}` : "";
  const ext = format ? `.${format}` : "";
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${t}${v}/${publicId}${ext}`;
}

export function cloudinaryLqipUrl(publicId: string): string {
  return cloudinaryUrl(publicId, { preset: "lqip", format: "jpg" });
}

export function cloudinaryLoader(preset: CloudinaryPreset) {
  return ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
    const overrides = [`w_${width}`, ...(quality ? [`q_${quality}`] : [])].join(",");
    return cloudinaryUrl(src, { preset, extra: overrides });
  };
}

export function cloudinaryRawUrl(publicId: string, extension: string): string {
  return `https://res.cloudinary.com/${CLOUD_NAME}/raw/upload/${publicId}.${extension}`;
}
