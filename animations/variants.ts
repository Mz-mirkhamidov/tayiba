import type { Variants } from "framer-motion";

export const luxuryEase = [0.22, 1, 0.36, 1] as const;
export const silkEase = [0.65, 0, 0.35, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: luxuryEase } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.6, ease: luxuryEase } },
};

export const staggerContainer = (stagger = 0.12, delay = 0): Variants => ({
  hidden: {},
  visible: { transition: { delayChildren: delay, staggerChildren: stagger } },
});

export const lineReveal: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 1.1, ease: luxuryEase } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.6, ease: luxuryEase } },
};
