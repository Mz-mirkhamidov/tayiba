import { cn } from "@/lib/utils";

export function ArabicPattern({ className, opacity = 0.06 }: { className?: string; opacity?: number }) {
  return (
    <svg className={cn("pointer-events-none select-none", className)} aria-hidden xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <pattern id="tayiba-arabesque" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
          <g stroke="currentColor" strokeWidth="0.6" fill="none" opacity={opacity}>
            <rect x="20" y="20" width="80" height="80" />
            <rect x="20" y="20" width="80" height="80" transform="rotate(45 60 60)" />
            <circle cx="60" cy="60" r="22" />
            <circle cx="60" cy="60" r="10" />
            <line x1="0" y1="0" x2="120" y2="120" />
            <line x1="120" y1="0" x2="0" y2="120" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#tayiba-arabesque)" />
    </svg>
  );
}
