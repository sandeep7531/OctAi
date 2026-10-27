import * as React from "react";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { LuSquarePen, LuSearch } from "react-icons/lu";

export const NewChatBtn = ({ onNewChat, onOpenSearch, isCollapsed = false }) => {
  if (isCollapsed) {
    return (
      <div className="flex justify-center px-2 py-2">
        <Tooltip content="New chat" side="right">
          <Button
            variant="ghost"
            size="icon"
            onClick={onNewChat}
            className="h-9 w-9 rounded-lg text-neutral-200 hover:bg-[#212121] hover:text-white transition-colors"
          >
            <LuSquarePen className="h-4 w-4" />
          </Button>
        </Tooltip>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 px-3 py-2">
      <Button
        variant="ghost"
        onClick={onNewChat}
        className="flex-1 justify-start gap-2.5 h-10 px-3 rounded-lg text-sm font-medium text-neutral-200 hover:bg-[#212121] hover:text-white transition-colors"
      >
        <LuSquarePen className="h-4 w-4 text-neutral-400" />
        <span>New chat</span>
      </Button>

      {onOpenSearch && (
        <Tooltip content="Search chats" side="bottom">
          <Button
            variant="ghost"
            size="icon"
            onClick={onOpenSearch}
            className="h-10 w-10 rounded-lg text-neutral-400 hover:text-white hover:bg-[#212121]"
          >
            <LuSearch className="h-4 w-4" />
          </Button>
        </Tooltip>
      )}
    </div>
  );
};
