import * as React from "react";
import { NewChatBtn } from "./NewChatBtn";
import { ConversationList } from "./ConversationList";
import { UserProfileFooter } from "./UserProfileFooter";
import { Tooltip } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {
  LuPanelLeft,
  LuClock,
  LuBookmark,
  LuCompass,
  LuChevronDown,
  LuSparkles,
} from "react-icons/lu";

export const Sidebar = ({
  isOpen = true,
  onToggle,
  conversations = [],
  activeId,
  onSelectConversation,
  onNewChat,
  onDeleteConversation,
  onRenameConversation,
  currentUser,
  onLogout,
  onOpenLogin,
}) => {
  return (
    <aside
      className={`fixed md:static inset-y-0 left-0 z-40 flex flex-col bg-[#171717] border-r border-white/[0.05] transition-all duration-200 ease-in-out ${
        isOpen ? "w-[260px] translate-x-0" : "-translate-x-full md:w-0 md:translate-x-0 overflow-hidden border-none"
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between px-3 py-3.5 border-b border-white/[0.04]">
        <DropdownMenu
          trigger={
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-sm font-semibold text-neutral-100 hover:bg-[#212121] transition-colors select-none">
              <span className="flex items-center gap-1.5">
                <LuSparkles className="h-4 w-4 text-indigo-400" />
                <span>OctAI</span>
              </span>
              <LuChevronDown className="h-3.5 w-3.5 text-neutral-400" />
            </div>
          }
        >
          <DropdownMenuItem>OctAI 2.0 (Smart Multi-Agent)</DropdownMenuItem>
          <DropdownMenuItem>Coding Specialist</DropdownMenuItem>
          <DropdownMenuItem>Web Search Assistant</DropdownMenuItem>
        </DropdownMenu>

        <Tooltip content="Close sidebar" side="right">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="text-neutral-400 hover:text-white hover:bg-[#212121]"
          >
            <LuPanelLeft className="h-4 w-4" />
          </Button>
        </Tooltip>
      </div>

      {/* New Chat Button */}
      <NewChatBtn onNewChat={onNewChat} />

      {/* Quick Nav Links (matching ChatGPT mock) */}
      <div className="px-3 py-1 flex flex-col gap-0.5 border-b border-white/[0.04] pb-2">
        <button className="flex items-center gap-3 px-3 py-1.5 text-xs text-neutral-400 hover:text-neutral-200 hover:bg-[#212121] rounded-lg transition-colors text-left cursor-pointer">
          <LuClock className="h-3.5 w-3.5" />
          <span>Scheduled</span>
        </button>
        <button className="flex items-center gap-3 px-3 py-1.5 text-xs text-neutral-400 hover:text-neutral-200 hover:bg-[#212121] rounded-lg transition-colors text-left cursor-pointer">
          <LuBookmark className="h-3.5 w-3.5" />
          <span>Library</span>
        </button>
        <button className="flex items-center gap-3 px-3 py-1.5 text-xs text-neutral-400 hover:text-neutral-200 hover:bg-[#212121] rounded-lg transition-colors text-left cursor-pointer">
          <LuCompass className="h-3.5 w-3.5" />
          <span>Explore Agents</span>
        </button>
      </div>

      {/* Conversations List */}
      <ConversationList
        conversations={conversations}
        activeId={activeId}
        onSelectConversation={onSelectConversation}
        onDeleteConversation={onDeleteConversation}
        onRenameConversation={onRenameConversation}
      />

      {/* User Profile Footer */}
      <UserProfileFooter
        currentUser={currentUser}
        onLogout={onLogout}
        onOpenLogin={onOpenLogin}
      />
    </aside>
  );
};
