import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "default" | "narrow" | "wide";
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "default", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "mx-auto w-full px-5 sm:px-6 lg:px-10 xl:px-14",
        size === "default" && "max-w-[1440px]",
        size === "narrow" && "max-w-[960px]",
        size === "wide" && "max-w-[1680px]",
        className,
      )}
      {...props}
    />
  ),
);
Container.displayName = "Container";
