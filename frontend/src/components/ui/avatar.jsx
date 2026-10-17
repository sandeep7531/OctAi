import * as React from "react";
import { cn } from "@/lib/utils";

export const Avatar = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        "relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full border border-white/[0.08] bg-[#212121]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const AvatarImage = ({ src, alt = "Avatar", className, ...props }) => {
  const [error, setError] = React.useState(false);

  if (!src || error) return null;

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setError(true)}
      className={cn("aspect-square h-full w-full object-cover", className)}
      {...props}
    />
  );
};

export const AvatarFallback = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center font-medium text-xs text-neutral-300 bg-gradient-to-tr from-neutral-800 to-neutral-700 select-none",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
