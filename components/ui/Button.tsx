import Link from "next/link";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode, type Ref } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "outline" | "gold";
type Size = "sm" | "md" | "lg";

interface BaseProps { variant?: Variant; size?: Size; withArrow?: boolean; children: ReactNode; className?: string; }
type ButtonNativeAttrs = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className">;
interface AsButton extends BaseProps, ButtonNativeAttrs { href?: undefined; }
interface AsLink extends BaseProps { href: string; external?: boolean; }
type ButtonProps = AsButton | AsLink;

const base = "group relative inline-flex items-center justify-center gap-2.5 font-sans font-medium tracking-widest uppercase transition-all duration-700 ease-luxury focus:outline-none focus-visible:ring-1 focus-visible:ring-ink/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bone disabled:opacity-40 disabled:cursor-not-allowed";
const sizes: Record<Size, string> = { sm: "text-[10px] px-5 py-2.5 rounded-full", md: "text-[11px] px-7 py-3.5 rounded-full", lg: "text-xs px-9 py-4 rounded-full" };
const variants: Record<Variant, string> = {
  primary: "bg-ink text-bone hover:bg-emerald-700 shadow-soft hover:shadow-luxury",
  ghost: "bg-transparent text-ink hover:bg-ink/[0.04]",
  outline: "bg-transparent text-ink border border-ink/15 hover:border-ink/40 hover:bg-ink/[0.02]",
  gold: "bg-gradient-divine text-ink shadow-gold hover:brightness-105",
};

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ variant = "primary", size = "md", withArrow, className, children, ...rest }, ref) => {
    const cls = cn(base, sizes[size], variants[variant], className);
    const inner = (
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
        {withArrow && <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-700 ease-luxury group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />}
      </span>
    );
    if ("href" in rest && rest.href) {
      const { href, external, ...linkProps } = rest;
      return (
        <Link href={href} ref={ref as Ref<HTMLAnchorElement>} className={cls}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...linkProps}>
          {inner}
        </Link>
      );
    }
    return <button ref={ref as Ref<HTMLButtonElement>} className={cls} {...(rest as ButtonNativeAttrs)}>{inner}</button>;
  },
);
Button.displayName = "Button";
