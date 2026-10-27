import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { LuSettings, LuLogOut, LuSparkles, LuLogIn } from "react-icons/lu";

export const UserProfileFooter = ({ currentUser, onLogout, onOpenLogin, isCollapsed = false }) => {
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  if (!currentUser) {
    if (isCollapsed) {
      return (
        <div className="p-2 border-t border-white/[0.06] flex justify-center">
          <button
            onClick={onOpenLogin}
            title="Sign in"
            className="h-9 w-9 flex items-center justify-center rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-white transition-colors cursor-pointer"
          >
            <LuLogIn className="h-4 w-4" />
          </button>
        </div>
      );
    }
    return (
      <div className="p-3 border-t border-white/[0.06]">
        <button
          onClick={onOpenLogin}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium bg-white/[0.06] hover:bg-white/[0.1] text-white transition-colors cursor-pointer"
        >
          <LuLogIn className="h-4 w-4" />
          <span>Sign in to save history</span>
        </button>
      </div>
    );
  }

  const displayName = currentUser?.name || currentUser?.displayName || currentUser?.email?.split("@")[0] || "User";
  const userPhoto = currentUser?.photoURL || currentUser?.picture || currentUser?.avatar;

  if (isCollapsed) {
    return (
      <div className="p-2 border-t border-white/[0.06] flex justify-center">
        <DropdownMenu
          align="left"
          className="w-56 bottom-full mb-1 ml-2"
          trigger={
            <div className="p-1 rounded-lg hover:bg-[#212121] transition-colors cursor-pointer select-none">
              <Avatar className="h-8 w-8 ring-1 ring-white/10">
                <AvatarImage src={userPhoto} alt={displayName} />
                <AvatarFallback className="bg-gradient-to-tr from-indigo-700 to-rose-600 text-white font-semibold text-xs">
                  {getInitials(displayName)}
                </AvatarFallback>
              </Avatar>
            </div>
          }
        >
          <DropdownMenuLabel>{displayName}</DropdownMenuLabel>
          <DropdownMenuItem icon={LuSparkles}>Upgrade plan</DropdownMenuItem>
          <DropdownMenuItem icon={LuSettings}>Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem destructive icon={LuLogOut} onClick={onLogout}>
            Log out
          </DropdownMenuItem>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <div className="p-2 border-t border-white/[0.06]">
      <DropdownMenu
        align="left"
        className="w-56 bottom-full mb-1"
        trigger={
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#212121] transition-colors cursor-pointer select-none">
            <Avatar className="h-8 w-8 ring-1 ring-white/10">
              <AvatarImage src={userPhoto} alt={displayName} />
              <AvatarFallback className="bg-gradient-to-tr from-indigo-700 to-rose-600 text-white font-semibold text-xs">
                {getInitials(displayName)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0 text-left">
              <div className="text-xs font-medium text-neutral-200 truncate">{displayName}</div>
              <div className="text-[11px] text-neutral-400 flex items-center gap-1">
                <span>Plus</span>
              </div>
            </div>
          </div>
        }
      >
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuItem icon={LuSparkles}>Upgrade plan</DropdownMenuItem>
        <DropdownMenuItem icon={LuSettings}>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem destructive icon={LuLogOut} onClick={onLogout}>
          Log out
        </DropdownMenuItem>
      </DropdownMenu>
    </div>
  );
};
