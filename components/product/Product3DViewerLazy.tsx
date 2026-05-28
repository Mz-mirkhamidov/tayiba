"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import type { Model3D } from "@/lib/types";
import { cn } from "@/lib/utils";
import { luxuryEase } from "@/animations/variants";

const Viewer = dynamic(() => import("./Product3DViewer"), { ssr: false, loading: () => <Loading /> });

export function Product3DViewerLazy({ model, swatch, caption }: { model?: Model3D; swatch: string; caption?: string }) {
  return <Viewer model={model} swatch={swatch} caption={caption} />;
}

function Loading({ swatch = "bg-desert-100" }: { swatch?: string }) {
  return (
    <div className={cn("relative aspect-[4/5] overflow-hidden rounded-2xl shadow-soft", swatch)}>
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.55)_0%,transparent_60%)]" />
      <div className="absolute inset-0 grid place-items-center text-center">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: luxuryEase }} className="space-y-3 px-6">
          <p className="eyebrow text-ink/65">— Atelye ko'rgichi</p>
          <p className="font-display text-2xl text-ink leading-tight">3D kiyim tayyorlanmoqda…</p>
          <div className="mx-auto h-px w-24 overflow-hidden bg-ink/10">
            <motion.div initial={{ x: "-100%" }} animate={{ x: "100%" }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }} className="h-full w-1/2 bg-gold-400/60" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
