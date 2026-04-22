import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "outline";
type ButtonSize = "default" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50";

    const variants = {
      default: "",
      outline: "border",
    };

    const sizes = {
      default: "h-10 px-4 py-2",
      lg: "h-11 px-6 py-3",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";