import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        desert: {
          50: "#FBFAF6", 100: "#F6F3EC", 200: "#EFEAE0",
          300: "#E4DCCB", 400: "#D6CAB1", 500: "#C2B391",
          600: "#9C8B6B", 700: "#75664A", 800: "#4F4332", 900: "#2A2319",
        },
        emerald: {
          50: "#EEF6F1", 100: "#D5E8DC", 200: "#ABD0B8",
          300: "#7FB694", 400: "#549B71", 500: "#2F7E54",
          600: "#246342", 700: "#1B4D33", 800: "#123524", 900: "#0A2316",
        },
        earth: {
          50: "#F7F1EA", 100: "#EBDDCC", 200: "#D5BB9C",
          300: "#BD976C", 400: "#A2783F", 500: "#825D2A",
          600: "#624620", 700: "#473218", 800: "#2D2010", 900: "#1A1209",
        },
        gold: {
          50: "#FBF6E8", 100: "#F4E9C2", 200: "#E9D285",
          300: "#DCB849", 400: "#C99E1F", 500: "#A8821A",
          600: "#8A6B16", 700: "#6A5311", 800: "#48390B", 900: "#231C05",
        },
        ink: "#15110A",
        bone: "#FBFAF6",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
        arabic: ["var(--font-arabic)", "serif"],
      },
      fontSize: {
        "display-xl": ["clamp(3.5rem, 8vw, 7.5rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.75rem, 6vw, 5rem)", { lineHeight: "1.0", letterSpacing: "-0.025em" }],
        "display-md": ["clamp(2rem, 4vw, 3.25rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
      },
      letterSpacing: { widest: "0.25em", ultra: "0.4em" },
      boxShadow: {
        soft: "0 1px 2px rgba(20,17,10,0.04), 0 8px 24px -8px rgba(20,17,10,0.08)",
        luxury: "0 30px 80px -20px rgba(20,17,10,0.18)",
        gold: "0 0 0 1px rgba(201,158,31,0.25), 0 20px 60px -20px rgba(201,158,31,0.35)",
      },
      backgroundImage: {
        "gradient-desert": "linear-gradient(180deg, #FBFAF6 0%, #F6F3EC 60%, #EFEAE0 100%)",
        "gradient-divine": "linear-gradient(135deg, #FBF6E8 0%, #F4E9C2 50%, #E9D285 100%)",
        "gradient-madinah": "linear-gradient(180deg, #FBFAF6 0%, #EEF6F1 100%)",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.22, 1, 0.36, 1)",
        silk: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      transitionDuration: { "700": "700ms", "900": "900ms", "1200": "1200ms" },
      animation: {
        "fade-up": "fadeUp 1.2s cubic-bezier(0.22, 1, 0.36, 1) both",
        float: "float 8s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: { "0%": { opacity: "0", transform: "translateY(24px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        float: { "0%, 100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-12px)" } },
      },
    },
  },
  plugins: [],
};

export default config;
