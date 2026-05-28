"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface BrandMarkProps {
  className?: string;
  withArabic?: boolean;
  tone?: "ink" | "bone";
  logoSrc?: string;
}

const LOGO_CANDIDATES = ["/brand/logo.svg", "/brand/logo.png", "/brand/logo.webp"];

export function BrandMark({ className, withArabic, tone = "ink", logoSrc }: BrandMarkProps) {
  const color = tone === "ink" ? "text-ink" : "text-bone";
  const [resolvedLogo, setResolvedLogo] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (logoSrc) { setResolvedLogo(logoSrc); setChecked(true); return; }
    let cancelled = false;
    (async () => {
      for (const c of LOGO_CANDIDATES) {
        try {
          const res = await fetch(c, { method: "HEAD" });
          if (!cancelled && res.ok) { setResolvedLogo(c); setChecked(true); return; }
        } catch { /* continue */ }
      }
      if (!cancelled) setChecked(true);
    })();
    return () => { cancelled = true; };
  }, [logoSrc]);

  return (
    <Link href="/" aria-label="TAYIBA — bosh sahifa"
      className={cn("inline-flex flex-col items-start leading-none transition-colors duration-700 ease-luxury", color, className)}>
      {resolvedLogo && checked ? (
        <Image src={resolvedLogo} alt="TAYIBA" width={160} height={40}
          className="h-7 w-auto md:h-9" priority unoptimized={resolvedLogo.endsWith(".svg")} />
      ) : (
        <span className="font-display text-xl md:text-[22px] tracking-[0.45em] uppercase">Tayiba</span>
      )}
      {withArabic && <span className="mt-1.5 font-arabic text-[13px] tracking-normal opacity-60">طَيْبَة</span>}
    </Link>
  );
}
