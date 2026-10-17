import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageItem } from "./MessageItem";
import { LuSparkles, LuCode, LuSearch, LuFileText } from "react-icons/lu";

export const ChatArea = ({
  messages = [],
  isLoading = false,
  onRegenerate,
  userAvatar,
  userName,
  onSelectSuggestion,
}) => {
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const suggestions = [
    {
      title: "Write code",
      desc: "Node.js REST API with Redis cache",
      icon: LuCode,
      prompt: "Write a complete Node.js Express route with Redis caching",
    },
    {
      title: "Web Research",
      desc: "Latest AI agent developments",
      icon: LuSearch,
      prompt: "What are the latest breakthroughs in multi-agent AI systems?",
    },
    {
      title: "Summarize & PDF",
      desc: "Extract key takeaways from a paper",
      icon: LuFileText,
      prompt: "Explain how to structure complex document workflows in LangGraph",
    },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-0 relative">
      <ScrollArea ref={scrollRef} className="flex-1">
        <div className="w-full max-w-3xl mx-auto py-6">
          {messages.length === 0 ? (
            /* Empty State Matching Screenshot */
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-indigo-500/20 to-violet-500/30 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4 shadow-lg shadow-indigo-500/10">
                <LuSparkles className="h-6 w-6" />
              </div>

              <h1 className="text-2xl font-semibold text-neutral-100 tracking-tight mb-2">
                Hey! 👋 Kaise ho? Batao, aaj kya karna hai?
              </h1>
              <p className="text-sm text-neutral-400 max-w-md mb-8">
                Ask anything, write code, search the web, or collaborate with specialized AI agents.
              </p>

              {/* Suggestions grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-2xl text-left">
                {suggestions.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => onSelectSuggestion?.(item.prompt)}
                      className="group flex flex-col p-3.5 rounded-2xl bg-[#171717] border border-white/[0.06] hover:border-white/[0.14] hover:bg-[#212121] transition-all cursor-pointer text-left"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-neutral-200 group-hover:text-white">
                          {item.title}
                        </span>
                        <Icon className="h-4 w-4 text-neutral-500 group-hover:text-indigo-400 transition-colors" />
                      </div>
                      <span className="text-[11px] text-neutral-400 line-clamp-2">
                        {item.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Messages Feed */
            <div className="flex flex-col">
              {messages.map((msg, index) => (
                <MessageItem
                  key={msg.id || index}
                  message={msg}
                  userAvatar={userAvatar}
                  userName={userName}
                  onRegenerate={index === messages.length - 1 ? onRegenerate : undefined}
                />
              ))}

              {isLoading && (
                <div className="flex items-center gap-3 px-4 my-3 text-neutral-400 text-xs animate-pulse">
                  <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shrink-0">
                    <LuSparkles className="h-3.5 w-3.5" />
                  </div>
                  <span>OctAI is thinking...</span>
                </div>
              )}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
