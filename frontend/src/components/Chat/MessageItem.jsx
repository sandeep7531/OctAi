import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip } from "@/components/ui/tooltip";
import {
  LuCopy,
  LuCheck,
  LuThumbsUp,
  LuThumbsDown,
  LuVolume2,
  LuRotateCcw,
  LuEllipsis,
  LuSparkles,
} from "react-icons/lu";

export const MessageItem = ({ message, onRegenerate, userAvatar, userName }) => {
  const [copied, setCopied] = React.useState(false);
  const [liked, setLiked] = React.useState(null);

  const isUser = message.role === "user";

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isUser) {
    return (
      <div className="flex justify-end my-4 px-4">
        <div className="flex items-start gap-3 max-w-[85%] md:max-w-[70%]">
          <div className="rounded-2xl bg-[#262626] border border-white/[0.06] px-4 py-2.5 text-[14px] text-neutral-100 shadow-sm leading-relaxed whitespace-pre-wrap break-words">
            {message.content}
          </div>
          <Avatar className="h-7 w-7 mt-0.5 shrink-0">
            <AvatarImage src={userAvatar} alt={userName || "User"} />
            <AvatarFallback className="bg-neutral-800 text-neutral-300 text-[11px] font-semibold">
              {userName ? userName[0].toUpperCase() : "U"}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start my-4 px-4 group">
      <div className="flex items-start gap-3.5 max-w-[90%] md:max-w-[80%]">
        <div className="h-7 w-7 mt-0.5 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-indigo-600/20">
          <LuSparkles className="h-3.5 w-3.5" />
        </div>

        <div className="flex-1 flex flex-col gap-2 min-w-0">
          <div className="text-[14px] text-neutral-200 leading-relaxed whitespace-pre-wrap break-words">
            {message.content}
          </div>

          {/* Action toolbar below AI response matching screenshot */}
          <div className="flex items-center gap-1 text-neutral-400 mt-1">
            <Tooltip content={copied ? "Copied!" : "Copy"} side="bottom">
              <button
                onClick={handleCopy}
                className="p-1.5 rounded-md hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                {copied ? <LuCheck className="h-3.5 w-3.5 text-emerald-400" /> : <LuCopy className="h-3.5 w-3.5" />}
              </button>
            </Tooltip>

            <Tooltip content="Good response" side="bottom">
              <button
                onClick={() => setLiked(liked === "up" ? null : "up")}
                className={`p-1.5 rounded-md hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer ${
                  liked === "up" ? "text-indigo-400" : ""
                }`}
              >
                <LuThumbsUp className="h-3.5 w-3.5" />
              </button>
            </Tooltip>

            <Tooltip content="Bad response" side="bottom">
              <button
                onClick={() => setLiked(liked === "down" ? null : "down")}
                className={`p-1.5 rounded-md hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer ${
                  liked === "down" ? "text-rose-400" : ""
                }`}
              >
                <LuThumbsDown className="h-3.5 w-3.5" />
              </button>
            </Tooltip>

            <Tooltip content="Read aloud" side="bottom">
              <button
                onClick={() => {
                  if ("speechSynthesis" in window) {
                    const utterance = new SpeechSynthesisUtterance(message.content);
                    window.speechSynthesis.speak(utterance);
                  }
                }}
                className="p-1.5 rounded-md hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <LuVolume2 className="h-3.5 w-3.5" />
              </button>
            </Tooltip>

            {onRegenerate && (
              <Tooltip content="Try again" side="bottom">
                <button
                  onClick={onRegenerate}
                  className="p-1.5 rounded-md hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  <LuRotateCcw className="h-3.5 w-3.5" />
                </button>
              </Tooltip>
            )}

            <button className="p-1.5 rounded-md hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer">
              <LuEllipsis className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
