import Link from "next/link";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode, type Ref } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "outline" | "gold";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  children: ReactNode;
  className?: string;
}
type ButtonNativeAttrs = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className">;
interface AsButton extends BaseProps, ButtonNativeAttrs {
  href?: undefined;
}
interface AsLink extends BaseProps {
  href: string;
  external?: boolean;
}
type ButtonProps = AsButton | AsLink;

/**
 * Button — zamonaviy premium. Hover'da -translate-y, gold/emerald o'tish,
 * mayin shadow ko'tarilishi (Quiet Luxury micro-interaction).
 */
const base =
  "group relative inline-flex items-center justify-center gap-2.5 font-sans font-medium " +
  "tracking-widest uppercase overflow-hidden rounded-full " +
  "transition-all duration-500 ease-luxury " +
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-bone " +
  "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none";

const sizes: Record<Size, string> = {
  sm: "text-ui-xs px-6 py-2.5",
  md: "text-ui-xs px-7 py-3.5",
  lg: "text-ui-sm px-9 py-4",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-bone shadow-card hover:bg-gold-600 hover:shadow-gold hover:-translate-y-0.5 active:translate-y-0",
  ghost:
    "bg-transparent text-ink hover:bg-ink/[0.05]",
  outline:
    "bg-transparent text-ink ring-1 ring-ink/15 hover:ring-gold-500 hover:text-gold-700 hover:-translate-y-0.5 active:translate-y-0",
  gold:
    "text-ink/90 shadow-gold-sm hover:-translate-y-0.5 hover:shadow-gold bg-[linear-gradient(135deg,#E8D9C4_0%,#C5A880_60%,#A8895F_100%)]",
};

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ variant = "primary", size = "md", withArrow, className, children, ...rest }, ref) => {
    const cls = cn(base, sizes[size], variants[variant], className);
    const inner = (
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
        {withArrow && (
          <ArrowUpRight
            className="h-3.5 w-3.5 transition-transform duration-500 ease-luxury group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={1.5}
          />
        )}
      </span>
    );

    if ("href" in rest && rest.href) {
      const { href, external, ...linkProps } = rest;
      return (
        <Link
          href={href}
          ref={ref as Ref<HTMLAnchorElement>}
          className={cls}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          {...linkProps}
        >
          {inner}
        </Link>
      );
    }
    return (
      <button ref={ref as Ref<HTMLButtonElement>} className={cls} {...(rest as ButtonNativeAttrs)}>
        {inner}
      </button>
    );
  },
);
Button.displayName = "Button";
