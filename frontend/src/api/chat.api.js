import api from "@/utils/axios";

export const createNewConversation = async (title = "New Chat") => {
  const response = await api.post("/api/chat/new-conversation", { title });
  return response.data;
};

export const fetchConversations = async () => {
  const response = await api.get("/api/chat/conversations");
  return response.data;
};

export const updateConversationTitle = async (conversationId, title) => {
  const response = await api.post("/api/chat/update-conversation", {
    conversationId,
    title,
  });
  return response.data;
};

export const fetchMessages = async (conversationId) => {
  const response = await api.post("/api/chat/get-message", { conversationId });
  return response.data;
};

export const saveMessage = async ({ conversationId, role, content }) => {
  const response = await api.post("/api/chat/save-message", {
    conversationId,
    role,
    content,
  });
  return response.data;
};
