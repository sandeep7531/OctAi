import * as React from "react";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {
  LuPlus,
  LuMic,
  LuArrowUp,
  LuChevronDown,
  LuAudioLines,
} from "react-icons/lu";

export const ChatInput = ({
  inputPrompt,
  setInputPrompt,
  onSend,
  isLoading = false,
  selectedAgent = "Medium",
  onSelectAgent,
}) => {
  const textareaRef = React.useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (inputPrompt?.trim() && !isLoading) {
        onSend?.();
      }
    }
  };

  const handleInput = (e) => {
    setInputPrompt(e.target.value);
    // Auto-grow textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }
  };

  const hasText = Boolean(inputPrompt?.trim());

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pb-4">
      {/* Input container */}
      <div className="relative flex flex-col rounded-3xl bg-[#212121] border border-white/[0.08] shadow-2xl p-2 transition-all focus-within:border-white/[0.18]">
        {/* Text input area */}
        <div className="flex items-end gap-2 px-2 pt-1 pb-1">
          {/* Attach button */}
          <Tooltip content="Attach files or tools" side="top">
            <button
              type="button"
              className="h-8 w-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors shrink-0 mb-0.5 cursor-pointer"
            >
              <LuPlus className="h-5 w-5" />
            </button>
          </Tooltip>

          {/* Expanding input */}
          <textarea
            ref={textareaRef}
            rows={1}
            value={inputPrompt}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Ask OctAI..."
            disabled={isLoading}
            className="flex-1 max-h-[180px] min-h-[28px] bg-transparent text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none resize-none py-1 px-1.5 leading-relaxed"
          />

          {/* Right Action Controls */}
          <div className="flex items-center gap-1.5 shrink-0 mb-0.5">
            {/* Model Pill (Medium ˅) */}
            <DropdownMenu
              align="right"
              trigger={
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer select-none">
                  <span>{selectedAgent}</span>
                  <LuChevronDown className="h-3 w-3 text-neutral-400" />
                </div>
              }
            >
              <DropdownMenuItem onClick={() => onSelectAgent?.("Auto")}>
                Auto (Smart Router)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onSelectAgent?.("Medium")}>
                Medium (Balanced)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onSelectAgent?.("Pro")}>
                Pro (Coding & Research)
              </DropdownMenuItem>
            </DropdownMenu>

            {/* Mic Button */}
            <Tooltip content="Voice mode" side="top">
              <button
                type="button"
                className="h-8 w-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <LuMic className="h-4 w-4" />
              </button>
            </Tooltip>

            {/* Send / Voice Pill Button */}
            <Tooltip content={hasText ? "Send message" : "Voice message"} side="top">
              <Button
                type="button"
                size="icon"
                disabled={isLoading}
                onClick={hasText ? onSend : undefined}
                className={`h-8 w-8 rounded-full transition-all duration-200 ${
                  hasText
                    ? "bg-white text-black hover:bg-neutral-200 scale-100"
                    : "bg-blue-600 text-white hover:bg-blue-500 shadow-md shadow-blue-600/30"
                }`}
              >
                {hasText ? (
                  <LuArrowUp className="h-4 w-4 stroke-[2.5]" />
                ) : (
                  <LuAudioLines className="h-4 w-4" />
                )}
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Small disclaimer footer matching screenshot */}
      <p className="text-[11px] text-center text-neutral-500 mt-2 select-none">
        OctAI can make mistakes. Check important info.
      </p>
    </div>
  );
};
