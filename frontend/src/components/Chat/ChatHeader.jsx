import * as React from "react";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {
  LuPanelLeft,
  LuChevronDown,
  LuShare2,
  LuEllipsis,
  LuBot,
  LuSparkles,
} from "react-icons/lu";

export const ChatHeader = ({ activeModel = "OctAI 2.0", onModelSelect }) => {
  return (
    <header className="h-14 flex items-center justify-between px-4 border-b border-white/[0.04] bg-[#0d0f14]/80 backdrop-blur shrink-0">
      <div className="flex items-center gap-2">
        <DropdownMenu
          trigger={
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-[#212121] transition-colors cursor-pointer select-none">
              <span className="text-sm font-semibold text-neutral-100 flex items-center gap-1.5">
                <LuSparkles className="h-4 w-4 text-indigo-400" />
                <span>{activeModel}</span>
              </span>
              <LuChevronDown className="h-3.5 w-3.5 text-neutral-400" />
            </div>
          }
        >
          <DropdownMenuItem
            icon={LuBot}
            onClick={() => onModelSelect?.("OctAI 2.0 (Auto-Routing)")}
          >
            OctAI 2.0 (Smart Multi-Agent)
          </DropdownMenuItem>
          <DropdownMenuItem
            icon={LuSparkles}
            onClick={() => onModelSelect?.("Chat Specialist (Groq)")}
          >
            Chat Specialist (Groq)
          </DropdownMenuItem>
          <DropdownMenuItem
            icon={LuSparkles}
            onClick={() => onModelSelect?.("Coding Specialist (Gemini)")}
          >
            Coding Specialist (Gemini)
          </DropdownMenuItem>
        </DropdownMenu>
      </div>

      <div className="flex items-center gap-1">
        <Tooltip content="Share chat" side="bottom">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1.5 text-xs text-neutral-300 hover:text-white hover:bg-[#212121] rounded-lg px-2.5 h-8"
          >
            <LuShare2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Share</span>
          </Button>
        </Tooltip>

        <Button
          variant="ghost"
          size="icon"
          className="text-neutral-400 hover:text-white hover:bg-[#212121] h-8 w-8"
        >
          <LuEllipsis className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
};
