import api from "@/utils/axios";

export const sendAgentPrompt = async ({ prompt, conversationId, role = "user" }) => {
  const response = await api.post("/api/agent/chat", {
    prompt,
    conversationId,
    role,
  });
  return response.data;
};
