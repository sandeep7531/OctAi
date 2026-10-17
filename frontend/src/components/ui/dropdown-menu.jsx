import * as React from "react";
import { cn } from "@/lib/utils";

export const DropdownMenu = ({ trigger, children, align = "left", className }) => {
  const [open, setOpen] = React.useState(false);
  const menuRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <div onClick={() => setOpen((prev) => !prev)} className="cursor-pointer">
        {trigger}
      </div>

      {open && (
        <div
          className={cn(
            "absolute z-50 mt-1.5 min-w-[180px] rounded-xl bg-[#1e1f20] border border-white/[0.08] p-1.5 text-neutral-200 shadow-2xl animate-in fade-in-0 zoom-in-95 duration-100",
            align === "right" ? "right-0" : "left-0",
            className
          )}
          onClick={() => setOpen(false)}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export const DropdownMenuItem = ({ children, className, onClick, icon: Icon, destructive, ...props }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg transition-colors text-left select-none cursor-pointer",
        destructive
          ? "text-red-400 hover:bg-red-500/10 hover:text-red-300"
          : "text-neutral-300 hover:bg-white/[0.08] hover:text-white",
        className
      )}
      {...props}
    >
      {Icon && <Icon className="text-sm shrink-0" />}
      <span className="flex-1 truncate">{children}</span>
    </button>
  );
};

export const DropdownMenuSeparator = ({ className }) => {
  return <div className={cn("my-1 h-px bg-white/[0.08]", className)} />;
};

export const DropdownMenuLabel = ({ children, className }) => {
  return (
    <div className={cn("px-3 py-1.5 text-[11px] font-semibold tracking-wider uppercase text-neutral-500", className)}>
      {children}
    </div>
  );
};
