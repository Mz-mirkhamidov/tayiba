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

interface Product3DViewerProps {
  model?: Model3D;
  swatch: string;
  caption?: string;
  /** Tanlangan rang hex → PlaceholderModel realtime o'zgaradi */
  selectedColorHex?: string;
}

export default function Product3DViewer({
  model,
  swatch,
  caption,
  selectedColorHex = "#F6F3EC",
}: Product3DViewerProps) {
  const [interacted, setInteracted] = useState(false);

  const modelUrl = useMemo(() => {
    if (model?.url) return model.url;
    if (model?.cloudinaryId && isCloudinaryConfigured()) {
      return cloudinaryRawUrl(model.cloudinaryId, "glb");
    }
    return undefined;
  }, [model]);

  const isPlaceholder = !modelUrl;

  return (
    <div
      className={cn("relative aspect-[4/5] overflow-hidden rounded-2xl shadow-soft", swatch)}
      onPointerDown={() => setInteracted(true)}
      onTouchStart={() => setInteracted(true)}
    >
      {/* Soft light wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0
                   bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.55)_0%,transparent_60%)]"
      />

      {/* 3D Canvas — selectedColorHex real-time uzatiladi */}
      <Product3DErrorBoundary>
        <Product3DScene
          modelUrl={modelUrl}
          autoRotateSpeed={model?.autoRotateSpeed ?? 0.5}
          selectedColorHex={selectedColorHex}
        />
      </Product3DErrorBoundary>

      {/* Status chip */}
      <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full
                       bg-bone/85 px-3 py-1.5 text-[10px] uppercase tracking-widest
                       text-ink/70 backdrop-blur-md">
        <span aria-hidden className={cn("h-1 w-1 rounded-full", isPlaceholder ? "bg-gold-400" : "bg-emerald-500")} />
        {caption ?? (isPlaceholder ? t.product.threeD.preparing : t.product.threeD.live)}
      </span>

      {/* Rang ko'rsatkichi — rang o'zgarganda yangilanadi */}
      {!modelUrl && (
        <motion.div
          key={selectedColorHex}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: luxuryEase }}
          className="absolute right-4 top-4 h-8 w-8 rounded-full ring-2 ring-bone/80 shadow-soft"
          style={{ background: selectedColorHex }}
          aria-hidden
        />
      )}

      {/* Hint chips — birinchi interaction'da yo'qoladi */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: interacted ? 0 : 1, y: interacted ? 6 : 0 }}
        transition={{ duration: 0.7, ease: luxuryEase }}
        className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center"
      >
        <div className="inline-flex items-center gap-3 rounded-full bg-bone/85 px-4 py-2
                        text-[10px] uppercase tracking-widest text-ink/70 backdrop-blur-md">
          <span className="inline-flex items-center gap-1.5">
            <Hand className="h-3 w-3" strokeWidth={1.5} /> {t.product.threeD.drag}
          </span>
          <span aria-hidden className="text-ink/30">·</span>
          <span className="inline-flex items-center gap-1.5">
            <ZoomIn className="h-3 w-3" strokeWidth={1.5} /> {t.product.threeD.zoom}
          </span>
          <span aria-hidden className="text-ink/30">·</span>
          <span className="inline-flex items-center gap-1.5">
            <RotateCw className="h-3 w-3" strokeWidth={1.5} /> {t.product.threeD.autoRotate}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

class Product3DErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 grid place-items-center text-center">
          <div className="max-w-xs space-y-2 px-6">
            <p className="eyebrow text-ink/55">— Atelye yozuvi</p>
            <p className="font-display text-xl text-ink">3D ko'rgichi tinch turibdi.</p>
            <p className="text-xs text-ink/55">
              Iltimos, sahifani yangilang yoki rasmlar galereyasini ko'ring.
            </p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
