import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  "aria-label": string;
  size?: "sm" | "md" | "lg";
  variant?: "ghost" | "outline";
  href?: string;
  external?: boolean;
}

const sizeMap = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
};

const variantMap = {
  ghost: "hover:bg-surface-2 text-muted hover:text-text-primary",
  outline: "border border-border hover:border-accent hover:text-accent text-muted",
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ size = "md", variant = "ghost", href, external, className, children, ...props }, ref) => {
    const base = cn(
      "inline-flex items-center justify-center rounded-lg transition-all duration-150",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
      "active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
      sizeMap[size],
      variantMap[variant],
      className
    );

    if (href) {
      return (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          aria-label={props["aria-label"]}
          className={base}
        >
          {children}
        </a>
      );
    }

    return (
      <button ref={ref} className={base} {...props}>
        {children}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";
