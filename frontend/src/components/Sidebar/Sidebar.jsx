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
      className={`shrink-0 z-40 flex flex-col bg-[#171717] border-r border-white/[0.05] transition-all duration-200 ease-in-out h-full ${
        isOpen ? "w-[260px]" : "w-[60px]"
      }`}
    >
      {/* Sidebar Header */}
      <div className={`flex items-center px-3 py-3.5 border-b border-white/[0.04] ${isOpen ? "justify-between" : "justify-center"}`}>
        {isOpen ? (
          <>
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

            <Tooltip content="Collapse sidebar" side="right">
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggle}
                className="text-neutral-400 hover:text-white hover:bg-[#212121] h-8 w-8"
              >
                <LuPanelLeft className="h-4 w-4" />
              </Button>
            </Tooltip>
          </>
        ) : (
          <Tooltip content="Expand sidebar" side="right">
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="text-neutral-400 hover:text-white hover:bg-[#212121] h-9 w-9 rounded-lg"
            >
              <LuPanelLeft className="h-4 w-4" />
            </Button>
          </Tooltip>
        )}
      </div>

      {/* New Chat Button */}
      <NewChatBtn onNewChat={onNewChat} isCollapsed={!isOpen} />

      {/* Quick Nav Links */}
      <div className="px-2 py-1 flex flex-col gap-0.5 border-b border-white/[0.04] pb-2">
        <Tooltip content="Scheduled" side="right" disabled={isOpen}>
          <button
            className={`flex items-center rounded-lg text-neutral-400 hover:text-neutral-200 hover:bg-[#212121] transition-colors cursor-pointer ${
              isOpen ? "gap-3 px-3 py-1.5 text-xs text-left w-full" : "justify-center h-9 w-full"
            }`}
          >
            <LuClock className="h-4 w-4 shrink-0" />
            {isOpen && <span>Scheduled</span>}
          </button>
        </Tooltip>

        <Tooltip content="Library" side="right" disabled={isOpen}>
          <button
            className={`flex items-center rounded-lg text-neutral-400 hover:text-neutral-200 hover:bg-[#212121] transition-colors cursor-pointer ${
              isOpen ? "gap-3 px-3 py-1.5 text-xs text-left w-full" : "justify-center h-9 w-full"
            }`}
          >
            <LuBookmark className="h-4 w-4 shrink-0" />
            {isOpen && <span>Library</span>}
          </button>
        </Tooltip>

        <Tooltip content="Explore Agents" side="right" disabled={isOpen}>
          <button
            className={`flex items-center rounded-lg text-neutral-400 hover:text-neutral-200 hover:bg-[#212121] transition-colors cursor-pointer ${
              isOpen ? "gap-3 px-3 py-1.5 text-xs text-left w-full" : "justify-center h-9 w-full"
            }`}
          >
            <LuCompass className="h-4 w-4 shrink-0" />
            {isOpen && <span>Explore Agents</span>}
          </button>
        </Tooltip>
      </div>

      {/* Conversations List */}
      <ConversationList
        conversations={conversations}
        activeId={activeId}
        onSelectConversation={onSelectConversation}
        onDeleteConversation={onDeleteConversation}
        onRenameConversation={onRenameConversation}
        isCollapsed={!isOpen}
      />

      {/* User Profile Footer */}
      <UserProfileFooter
        currentUser={currentUser}
        onLogout={onLogout}
        onOpenLogin={onOpenLogin}
        isCollapsed={!isOpen}
      />
    </aside>
  );
};
