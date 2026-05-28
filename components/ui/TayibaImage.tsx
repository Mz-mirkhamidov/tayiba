"use client";
import Image from "next/image";
import { useState } from "react";
import { cloudinaryLoader, cloudinaryLqipUrl, isCloudinaryConfigured } from "@/services/cloudinary";
import { type CloudinaryPreset } from "@/lib/cloudinary-presets";
import { cn } from "@/lib/utils";

interface TayibaImageProps {
  cloudinaryId?: string;
  src?: string;
  swatch: string;
  alt: string;
  preset: CloudinaryPreset;
  priority?: boolean;
  sizes?: string;
  className?: string;
  fetchPriority?: "high" | "low" | "auto";
}

export function TayibaImage({ cloudinaryId, src, swatch, alt, preset, priority,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw", className, fetchPriority }: TayibaImageProps) {
  const [loaded, setLoaded] = useState(false);
  const useCloudinary = Boolean(cloudinaryId) && isCloudinaryConfigured();

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <div aria-hidden className={cn("absolute inset-0", swatch)} />
      {useCloudinary && cloudinaryId && (
        <Image loader={cloudinaryLoader(preset)} src={cloudinaryId} alt={alt} fill priority={priority}
          fetchPriority={fetchPriority} sizes={sizes} placeholder="blur" blurDataURL={cloudinaryLqipUrl(cloudinaryId)}
          onLoad={() => setLoaded(true)}
          className={cn("object-cover transition-opacity duration-1000 ease-luxury", loaded ? "opacity-100" : "opacity-0")} />
      )}
      {!useCloudinary && src && (
        <Image src={src} alt={alt} fill priority={priority} fetchPriority={fetchPriority} sizes={sizes}
          onLoad={() => setLoaded(true)}
          className={cn("object-cover transition-opacity duration-1000 ease-luxury", loaded ? "opacity-100" : "opacity-0")} />
      )}
    </div>
  );
}
