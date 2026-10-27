import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { getModel } from "../config/llmModels.js";

export const chatAgent = async (state) => {
  const llm = await getModel("chat");
  const history = state.history || []
  const systemPrompt = `
You are a friendly and helpful AI assistant. Respond to the user's message in a natural, conversational way.

RULES:
- Keep responses concise and under 3-4 sentences unless asked for something longer
- If the user asks for code, a file, a diagram, or a presentation, politely decline and suggest the correct specialized agent
- Use markdown for formatting when helpful`;

  const formattedHistory = (state.history || []).map((msg) => ({
    role: msg.role === "ai" ? "assistant" : "user",
    content: msg.content,
  }));


  const message = [new SystemMessage(systemPrompt)]

  history.array.forEach(message => {
    if (message.role == 'user') {
      message.push(new HumanMessage(message.content))
    }
    else {
      message.push(new AssistantMessage(message.content))
    }
  });

  message.push(new HumanMessage(state.prompt))
  const res = await llm.invoke(message);
  return {
    ...state,
    aiResponse: res.content
  }
};
