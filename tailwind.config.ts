import type { Config } from "tailwindcss";

/**
 * TAYIBA Design System — Quiet Luxury & Premium Minimalism
 * ─────────────────────────────────────────────────────────
 * 4 asosiy rang:
 *   #FBFBFA — background (yumshoq oqish)
 *   #1A1A1A — matn/sarlavhalar (to'q kulrang-qora)
 *   #C5A880 — aksent / oltin-qum (premium detal)
 *   #767676 — yordamchi matn (elegant och kulrang)
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./store/**/*.{ts,tsx}",
  ],
  theme: {
    // ── Global defaults ────────────────────────────────────────────────────
    fontFamily: {
      sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      display: ["var(--font-display)", "Cormorant Garamond", "Georgia", "serif"],
      arabic: ["var(--font-arabic)", "Amiri", "serif"],
    },

    // ── Container — strict 7xl grid ────────────────────────────────────────
    container: {
      center: true,
      padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2rem", xl: "2rem" },
      screens: { "2xl": "1280px" },
    },

    extend: {
      // ── Brand colors ──────────────────────────────────────────────────────
      colors: {
        // Backgrounds
        bone: "#FBFBFA",
        canvas: "#FFFFFF",
        surface: "#F5F3EF",

        // Text
        ink: "#1A1A1A",
        muted: "#767676",

        // Accent — Oltin-qum (premium detal)
        gold: {
          DEFAULT: "#C5A880",
          light: "#E8D9C4",
          dark: "#9A7F5E",
          50: "#FDF8F2",
          100: "#F7EDDF",
          200: "#EED9BF",
          300: "#E2C49C",
          400: "#D4AF7A",
          500: "#C5A880",   // ← asosiy aksent
          600: "#A8895F",
          700: "#8A6D47",
          800: "#6C5335",
          900: "#4E3B24",
        },

        // Islamic emerald — ibodatga oid rang
        emerald: {
          50: "#EEF6F1",
          100: "#D5E8DC",
          200: "#ABD0B8",
          300: "#7FB694",
          400: "#549B71",
          500: "#2F7E54",
          600: "#246342",
          700: "#1B4D33",
          800: "#123524",
          900: "#0A2316",
        },

        // Desert — secondary warmth
        desert: {
          50: "#FBFBFA",
          100: "#F5F3EF",
          200: "#EDE8E0",
          300: "#E2DAD0",
          400: "#D4C8B8",
          500: "#C2B39D",
          600: "#9C8B73",
          700: "#756550",
          800: "#4F4334",
          900: "#2A2218",
        },
      },

      // ── Typography scale ──────────────────────────────────────────────────
      fontSize: {
        // Editorial display — clamp for fluid type
        "display-2xl": ["clamp(3.75rem, 9vw, 8rem)", { lineHeight: "0.92", letterSpacing: "-0.03em" }],
        "display-xl":  ["clamp(3rem, 7vw, 6.5rem)",  { lineHeight: "0.95", letterSpacing: "-0.025em" }],
        "display-lg":  ["clamp(2.25rem, 5vw, 4.5rem)", { lineHeight: "1.0",  letterSpacing: "-0.02em" }],
        "display-md":  ["clamp(1.75rem, 3.5vw, 3rem)", { lineHeight: "1.1",  letterSpacing: "-0.015em" }],
        "display-sm":  ["clamp(1.25rem, 2.5vw, 2rem)", { lineHeight: "1.2",  letterSpacing: "-0.01em" }],
        // Body
        "body-lg": ["1.125rem", { lineHeight: "1.75" }],
        "body-md": ["1rem",     { lineHeight: "1.7" }],
        "body-sm": ["0.9375rem",{ lineHeight: "1.65" }],
        // UI
        "ui-sm":  ["0.75rem",  { lineHeight: "1.5", letterSpacing: "0.08em" }],
        "ui-xs":  ["0.6875rem",{ lineHeight: "1.4", letterSpacing: "0.1em" }],
      },

      letterSpacing: {
        tighter: "-0.03em",
        tight: "-0.015em",
        normal: "0em",
        wide: "0.05em",
        wider: "0.1em",
        widest: "0.2em",
        ultra: "0.35em",
        luxury: "0.45em",
      },

      // ── Spacing — generous breathing room ────────────────────────────────
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
        "34": "8.5rem",
        "section": "6rem",
        "section-lg": "8rem",
        "section-xl": "10rem",
      },

      // ── Border radius ─────────────────────────────────────────────────────
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },

      // ── Shadows — soft premium ────────────────────────────────────────────
      boxShadow: {
        // Resting state
        "card": "0 1px 3px rgba(26,26,26,0.04), 0 4px 16px -4px rgba(26,26,26,0.06)",
        // Hover state
        "card-hover": "0 8px 32px -8px rgba(26,26,26,0.12), 0 2px 8px rgba(26,26,26,0.04)",
        // Elevated
        "luxury": "0 24px 64px -16px rgba(26,26,26,0.16)",
        // Gold accent
        "gold": "0 0 0 1.5px rgba(197,168,128,0.4), 0 8px 32px -8px rgba(197,168,128,0.25)",
        "gold-sm": "0 0 0 1px rgba(197,168,128,0.3)",
        // Drawer/modal
        "panel": "0 0 0 1px rgba(26,26,26,0.04), -16px 0 64px -16px rgba(26,26,26,0.12)",
        // Soft inner
        "inner-soft": "inset 0 1px 3px rgba(26,26,26,0.06)",
      },

      // ── Background images ─────────────────────────────────────────────────
      backgroundImage: {
        "gradient-canvas": "linear-gradient(180deg, #FBFBFA 0%, #F5F3EF 100%)",
        "gradient-warm": "linear-gradient(135deg, #FDF8F2 0%, #F7EDDF 50%, #EED9BF 100%)",
        "gradient-hero": "linear-gradient(180deg, #FBFBFA 0%, #F0EDE8 100%)",
        "gradient-emerald": "linear-gradient(180deg, #FBFBFA 0%, #EEF6F1 100%)",
        "gradient-gold": "linear-gradient(135deg, #FDF8F2 0%, #E8D9C4 100%)",
      },

      // ── Easing ────────────────────────────────────────────────────────────
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.22, 1, 0.36, 1)",
        silk: "cubic-bezier(0.65, 0, 0.35, 1)",
        "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
        "in-out-quart": "cubic-bezier(0.76, 0, 0.24, 1)",
      },

      transitionDuration: {
        "250": "250ms",
        "350": "350ms",
        "450": "450ms",
        "600": "600ms",
        "700": "700ms",
        "900": "900ms",
        "1200": "1200ms",
      },

      // ── Animations ────────────────────────────────────────────────────────
      animation: {
        "fade-up": "fadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fadeIn 0.7s ease-out both",
        "scale-in": "scaleIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) both",
        "slide-right": "slideRight 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
        float: "float 7s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        "pulse-gold": "pulseGold 2.5s ease-in-out infinite",
      },

      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        slideRight: {
          "0%": { opacity: "0", transform: "translateX(-16px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(197,168,128,0)" },
          "50%": { boxShadow: "0 0 0 6px rgba(197,168,128,0.15)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
