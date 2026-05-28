"use client";
import { Component, type ReactNode, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Hand, RotateCw, ZoomIn } from "lucide-react";
import type { Model3D } from "@/lib/types";
import { cloudinaryRawUrl, isCloudinaryConfigured } from "@/services/cloudinary";
import { Product3DScene } from "./Product3DScene";
import { luxuryEase } from "@/animations/variants";
import { cn } from "@/lib/utils";
import { t } from "@/lib/i18n";

export default function Product3DViewer({ model, swatch, caption }: { model?: Model3D; swatch: string; caption?: string }) {
  const [interacted, setInteracted] = useState(false);
  const modelUrl = useMemo(() => {
    if (model?.url) return model.url;
    if (model?.cloudinaryId && isCloudinaryConfigured()) return cloudinaryRawUrl(model.cloudinaryId, "glb");
    return undefined;
  }, [model]);

  return (
    <div className={cn("relative aspect-[4/5] overflow-hidden rounded-2xl shadow-soft", swatch)}
      onPointerDown={() => setInteracted(true)} onTouchStart={() => setInteracted(true)}>
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.55)_0%,transparent_60%)]" />
      <Product3DErrorBoundary>
        <Product3DScene modelUrl={modelUrl} autoRotateSpeed={model?.autoRotateSpeed ?? 0.5} />
      </Product3DErrorBoundary>
      <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-bone/85 px-3 py-1.5 text-[10px] uppercase tracking-widest text-ink/70 backdrop-blur-md">
        <span aria-hidden className={cn("h-1 w-1 rounded-full", !modelUrl ? "bg-gold-400" : "bg-emerald-500")} />
        {caption ?? (!modelUrl ? t.product.threeD.preparing : t.product.threeD.live)}
      </span>
      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: interacted ? 0 : 1, y: interacted ? 6 : 0 }}
        transition={{ duration: 0.7, ease: luxuryEase }}
        className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center">
        <div className="inline-flex items-center gap-3 rounded-full bg-bone/85 px-4 py-2 text-[10px] uppercase tracking-widest text-ink/70 backdrop-blur-md">
          <span className="inline-flex items-center gap-1.5"><Hand className="h-3 w-3" strokeWidth={1.5} /> {t.product.threeD.drag}</span>
          <span aria-hidden className="text-ink/30">·</span>
          <span className="inline-flex items-center gap-1.5"><ZoomIn className="h-3 w-3" strokeWidth={1.5} /> {t.product.threeD.zoom}</span>
          <span aria-hidden className="text-ink/30">·</span>
          <span className="inline-flex items-center gap-1.5"><RotateCw className="h-3 w-3" strokeWidth={1.5} /> {t.product.threeD.autoRotate}</span>
        </div>
      </motion.div>
    </div>
  );
}

class Product3DErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 grid place-items-center text-center">
          <div className="max-w-xs space-y-2 px-6">
            <p className="eyebrow text-ink/55">— Atelye yozuvi</p>
            <p className="font-display text-xl text-ink">3D ko'rgichi tinch turibdi.</p>
            <p className="text-xs text-ink/55">Iltimos, sahifani yangilang yoki rasmlar galereyasini ko'ring.</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
