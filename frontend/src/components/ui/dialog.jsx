import * as React from "react";
import { cn } from "@/lib/utils";
import { LuX } from "react-icons/lu";

export const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm animate-in fade-in-0 duration-200"
        onClick={() => onOpenChange?.(false)}
      />
      {/* Dialog content wrapper */}
      <div className="relative z-50 animate-in fade-in-0 zoom-in-95 duration-200">
        {children}
      </div>
    </div>
  );
};

export const DialogContent = ({ children, className, onClose }) => {
  return (
    <div
      className={cn(
        "relative w-full max-w-md rounded-2xl bg-[#171717] border border-white/[0.1] p-6 text-white shadow-2xl",
        className
      )}
    >
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-neutral-400 hover:bg-white/[0.08] hover:text-white transition-colors"
        >
          <LuX className="h-4 w-4" />
        </button>
      )}
      {children}
    </div>
  );
};

export const DialogHeader = ({ children, className }) => {
  return <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left mb-4", className)}>{children}</div>;
};

export const DialogTitle = ({ children, className }) => {
  return <h2 className={cn("text-lg font-semibold tracking-tight text-neutral-100", className)}>{children}</h2>;
};

export const DialogDescription = ({ children, className }) => {
  return <p className={cn("text-xs text-neutral-400", className)}>{children}</p>;
};
