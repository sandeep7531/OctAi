import * as React from "react";
import { cn } from "@/lib/utils";

export const Badge = ({ className, variant = "default", children, ...props }) => {
  const variants = {
    default: "bg-white/[0.08] text-neutral-300 border border-white/[0.08]",
    secondary: "bg-[#212121] text-neutral-400 hover:bg-[#2a2a2a]",
    outline: "border border-neutral-700 text-neutral-400",
    success: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    indigo: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors",
        variants[variant] || variants.default,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
