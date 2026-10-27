import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DropdownMenu, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Tooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { LuEllipsis, LuPencil, LuTrash2, LuShare2, LuMessageSquare } from "react-icons/lu";

export const ConversationList = ({
  conversations = [],
  activeId,
  onSelectConversation,
  onDeleteConversation,
  onRenameConversation,
  isCollapsed = false,
}) => {
  if (isCollapsed) {
    return (
      <div className="flex-1 flex flex-col min-h-0 py-2">
        <ScrollArea className="flex-1 px-1">
          <div className="flex flex-col gap-1 items-center">
            {conversations.map((chat) => {
              const chatId = chat._id || chat.id;
              const isActive = activeId === chatId;

              return (
                <button
                  key={chatId}
                  onClick={() => onSelectConversation?.(chatId)}
                  className={cn(
                    "h-9 w-9 flex items-center justify-center rounded-lg transition-colors cursor-pointer",
                    isActive
                      ? "bg-[#212121] text-white"
                      : "text-neutral-400 hover:text-neutral-100 hover:bg-[#212121]/60"
                  )}
                >
                  <LuMessageSquare className="h-4 w-4" />
                </button>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="px-3 pt-3 pb-1 text-[11px] font-semibold text-neutral-400 tracking-wider">
        Recents
      </div>

      <ScrollArea className="flex-1 px-2">
        <div className="flex flex-col gap-0.5 py-1">
          {conversations.map((chat) => {
            const chatId = chat._id || chat.id;
            const isActive = activeId === chatId;

            return (
              <div
                key={chatId}
                onClick={() => onSelectConversation?.(chatId)}
                className={cn(
                  "group relative flex items-center justify-between rounded-lg px-3 py-2 text-sm text-neutral-300 transition-colors cursor-pointer select-none",
                  isActive
                    ? "bg-[#212121] text-white font-medium"
                    : "hover:bg-[#212121]/70 hover:text-neutral-100"
                )}
              >
                <span className="truncate pr-6 text-[13px]">{chat.title}</span>

                {/* Context actions menu */}
                <div
                  className={cn(
                    "absolute right-1.5 flex items-center transition-opacity",
                    isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  )}
                  onClick={(e) => e.stopPropagation()}
                >
                  <DropdownMenu
                    align="right"
                    trigger={
                      <button
                        type="button"
                        className="rounded-md p-1 text-neutral-400 hover:text-white hover:bg-neutral-700/60 transition-colors"
                      >
                        <LuEllipsis className="h-4 w-4" />
                      </button>
                    }
                  >
                    <DropdownMenuItem
                      icon={LuShare2}
                      onClick={() => alert(`Share "${chat.title}"`)}
                    >
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      icon={LuPencil}
                      onClick={() => onRenameConversation?.(chatId)}
                    >
                      Rename
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      icon={LuTrash2}
                      destructive
                      onClick={() => onDeleteConversation?.(chatId)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenu>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};
