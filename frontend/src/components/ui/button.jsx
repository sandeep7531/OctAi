import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = {
  default: "bg-white text-black hover:bg-neutral-200 active:bg-neutral-300",
  secondary: "bg-[#212121] text-neutral-200 hover:bg-[#2f2f2f] hover:text-white",
  ghost: "bg-transparent text-neutral-300 hover:bg-white/[0.08] hover:text-white",
  outline: "border border-white/[0.12] bg-transparent text-neutral-200 hover:bg-white/[0.06] hover:text-white",
  primary: "bg-indigo-600 text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/20",
  destructive: "bg-red-600 text-white hover:bg-red-500",
};

const buttonSizes = {
  default: "h-9 px-4 py-2 text-sm",
  sm: "h-8 px-3 text-xs rounded-md",
  lg: "h-11 px-6 text-base rounded-xl",
  icon: "h-8 w-8 p-0 flex items-center justify-center rounded-lg",
  iconLg: "h-9 w-9 p-0 flex items-center justify-center rounded-xl",
};

export const Button = React.forwardRef(
  ({ className, variant = "default", size = "default", disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20 disabled:pointer-events-none disabled:opacity-40 cursor-pointer select-none",
          buttonVariants[variant] || buttonVariants.default,
          buttonSizes[size] || buttonSizes.default,
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
