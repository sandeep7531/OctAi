import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";
import { logoutUser } from "@/api/auth.api";
import {
  fetchConversations,
  createNewConversation,
  updateConversationTitle,
  fetchMessages,
} from "@/api/chat.api";
import { sendAgentPrompt } from "@/api/agent.api";

// UI Components
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { ChatHeader } from "@/components/Chat/ChatHeader";
import { ChatArea } from "@/components/Chat/ChatArea";
import { ChatInput } from "@/components/Chat/ChatInput";
import { LoginModal } from "@/components/Auth/LoginModal";

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Layout & UI States
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);

  // Chat Data States
  const [conversations, setConversations] = React.useState([]);
  const [activeChatId, setActiveChatId] = React.useState(null);
  const [messagesMap, setMessagesMap] = React.useState({});
  const [inputPrompt, setInputPrompt] = React.useState("");
  const [selectedAgent, setSelectedAgent] = React.useState("Medium");
  const [activeModel, setActiveModel] = React.useState("OctAI 2.0");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFetchingChats, setIsFetchingChats] = React.useState(false);

  // Active chat messages derived from map
  const activeMessages = React.useMemo(() => {
    if (!activeChatId) return [];
    return messagesMap[activeChatId] || [];
  }, [messagesMap, activeChatId]);

  // Load user conversations when logged in
  const loadConversations = React.useCallback(async () => {
    if (!currentUser) return;
    setIsFetchingChats(true);
    try {
      const res = await fetchConversations();
      const list = res?.data || [];
      setConversations(list);

      if (list.length > 0) {
        const firstId = list[0]._id || list[0].id;
        setActiveChatId(firstId);
        loadChatMessages(firstId);
      } else {
        // If user has zero chats, start fresh
        setActiveChatId(null);
      }
    } catch (err) {
      console.error("Failed to fetch conversations:", err);
      if (err?.response?.status === 401) {
        dispatch(setUser(null));
        setIsLoginModalOpen(true);
      }
    } finally {
      setIsFetchingChats(false);
    }
  }, [currentUser, dispatch]);

  // Fetch messages for a specific conversation
  const loadChatMessages = async (conversationId) => {
    if (!conversationId) return;
    try {
      const res = await fetchMessages(conversationId);
      const msgs = res?.data || [];
      setMessagesMap((prev) => ({
        ...prev,
        [conversationId]: msgs,
      }));
    } catch (err) {
      console.error(`Failed to fetch messages for ${conversationId}:`, err);
    }
  };

  // Initial login modal trigger & load conversations
  React.useEffect(() => {
    if (!currentUser) {
      setIsLoginModalOpen(true);
      setConversations([]);
      setMessagesMap({});
      setActiveChatId(null);
    } else {
      setIsLoginModalOpen(false);
      loadConversations();
    }
  }, [currentUser, loadConversations]);

  // Handle switching conversations
  const handleSelectConversation = (id) => {
    setActiveChatId(id);
    if (!messagesMap[id]) {
      loadChatMessages(id);
    }
  };

  // Logout Handler
  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      dispatch(setUser(null));
      setIsLoginModalOpen(true);
    }
  };

  // Create New Chat (via API)
  const handleNewChat = async () => {
    if (!currentUser) {
      setIsLoginModalOpen(true);
      return;
    }
    try {
      const res = await createNewConversation("New chat");
      const newConv = res?.data;
      if (newConv) {
        const newId = newConv._id || newConv.id;
        setConversations((prev) => [newConv, ...prev]);
        setActiveChatId(newId);
        setMessagesMap((prev) => ({ ...prev, [newId]: [] }));
      }
    } catch (err) {
      console.error("Error creating new conversation:", err);
    }
  };

  // Delete Conversation (local filter)
  const handleDeleteConversation = (id) => {
    setConversations((prev) => prev.filter((c) => (c._id || c.id) !== id));
    if (activeChatId === id) {
      const remaining = conversations.filter((c) => (c._id || c.id) !== id);
      const nextId = remaining[0]?._id || remaining[0]?.id || null;
      setActiveChatId(nextId);
      if (nextId) loadChatMessages(nextId);
    }
  };

  // Rename Conversation (via API)
  const handleRenameConversation = async (id) => {
    const currentChat = conversations.find((c) => (c._id || c.id) === id);
    const newTitle = prompt("Enter new title:", currentChat?.title);
    if (newTitle && newTitle.trim()) {
      const trimmed = newTitle.trim();
      try {
        await updateConversationTitle(id, trimmed);
        setConversations((prev) =>
          prev.map((c) =>
            (c._id || c.id) === id ? { ...c, title: trimmed } : c
          )
        );
      } catch (err) {
        console.error("Failed to rename conversation:", err);
      }
    }
  };

  // Send Message (via Agent API)
  const handleSendMessage = async (customPrompt) => {
    if (!currentUser) {
      setIsLoginModalOpen(true);
      return;
    }

    const textToSend = (customPrompt || inputPrompt).trim();
    if (!textToSend || isLoading) return;

    let targetConversationId = activeChatId;

    // If no active conversation exists, create one first
    if (!targetConversationId) {
      try {
        const res = await createNewConversation(textToSend.slice(0, 30));
        const newConv = res?.data;
        if (!newConv) throw new Error("Failed to create conversation");
        targetConversationId = newConv._id || newConv.id;
        setConversations((prev) => [newConv, ...prev]);
        setActiveChatId(targetConversationId);
      } catch (createErr) {
        console.error("Could not create conversation for prompt:", createErr);
        return;
      }
    }

    const optimisticUserMessage = {
      id: `usr-${Date.now()}`,
      role: "user",
      content: textToSend,
      createdAt: new Date().toISOString(),
    };

    // Optimistically update message feed
    setMessagesMap((prev) => ({
      ...prev,
      [targetConversationId]: [
        ...(prev[targetConversationId] || []),
        optimisticUserMessage,
      ],
    }));

    setInputPrompt("");
    setIsLoading(true);

    // If current conversation has default name, rename it to user's first prompt
    const currentChat = conversations.find(
      (c) => (c._id || c.id) === targetConversationId
    );
    if (currentChat && currentChat.title === "New chat") {
      const newTitle = textToSend.slice(0, 30);
      updateConversationTitle(targetConversationId, newTitle).catch(() => {});
      setConversations((prev) =>
        prev.map((c) =>
          (c._id || c.id) === targetConversationId
            ? { ...c, title: newTitle }
            : c
        )
      );
    }

    try {
      // Call Backend Agent Service
      const agentRes = await sendAgentPrompt({
        prompt: textToSend,
        conversationId: targetConversationId,
        role: "user",
      });

      const aiReply =
        typeof agentRes?.data === "string"
          ? agentRes.data
          : agentRes?.data?.content ||
            agentRes?.data?.aiResponse ||
            "I received your message.";

      const assistantMessage = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: aiReply,
        createdAt: new Date().toISOString(),
      };

      setMessagesMap((prev) => ({
        ...prev,
        [targetConversationId]: [
          ...(prev[targetConversationId] || []),
          assistantMessage,
        ],
      }));
    } catch (apiError) {
      console.error("Agent execution error:", apiError);
      const errorMessage = {
        id: `err-${Date.now()}`,
        role: "assistant",
        content: `⚠️ Error: ${
          apiError?.response?.data?.message ||
          apiError?.message ||
          "Failed to get response from OctAI agent"
        }`,
      };
      setMessagesMap((prev) => ({
        ...prev,
        [targetConversationId]: [
          ...(prev[targetConversationId] || []),
          errorMessage,
        ],
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-[#0d0f14] text-white flex overflow-hidden font-sans select-text">
      {/* Collapsible Left Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen((prev) => !prev)}
        conversations={conversations}
        activeId={activeChatId}
        onSelectConversation={handleSelectConversation}
        onNewChat={handleNewChat}
        onDeleteConversation={handleDeleteConversation}
        onRenameConversation={handleRenameConversation}
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenLogin={() => setIsLoginModalOpen(true)}
      />

      {/* Main Chat Panel */}
      <main className="flex-1 flex flex-col h-full min-w-0 bg-[#0d0f14] relative">
        {/* Top Header */}
        <ChatHeader
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(true)}
          activeModel={activeModel}
          onModelSelect={(model) => setActiveModel(model)}
        />

        {/* Message Feed / Welcome Screen */}
        <ChatArea
          messages={activeMessages}
          isLoading={isLoading || isFetchingChats}
          userAvatar={currentUser?.photoURL || currentUser?.picture}
          userName={currentUser?.name || currentUser?.displayName}
          onSelectSuggestion={(prompt) => handleSendMessage(prompt)}
          onRegenerate={() => {
            const lastUserMsg = [...activeMessages]
              .reverse()
              .find((m) => m.role === "user");
            if (lastUserMsg) {
              handleSendMessage(lastUserMsg.content);
            }
          }}
        />

        {/* Floating Bottom Prompt Bar */}
        <ChatInput
          inputPrompt={inputPrompt}
          setInputPrompt={setInputPrompt}
          onSend={() => handleSendMessage()}
          isLoading={isLoading}
          selectedAgent={selectedAgent}
          onSelectAgent={(agent) => setSelectedAgent(agent)}
        />
      </main>

      {/* Firebase Google Login Modal */}
      <LoginModal
        open={isLoginModalOpen && !currentUser}
        onOpenChange={setIsLoginModalOpen}
      />
    </div>
  );
};

export default Home;
