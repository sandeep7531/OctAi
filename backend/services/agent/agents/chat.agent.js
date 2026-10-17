import { getModel } from "../config/llmModels.js";

export const chatAgent = async (state) => {
  const llm = await getModel("chat");

  const systemPrompt = `
You are a friendly and helpful AI assistant. Respond to the user's message in a natural, conversational way.

RULES:
- Keep responses concise and under 3-4 sentences unless asked for something longer
- If the user asks for code, a file, a diagram, or a presentation, politely decline and suggest the correct specialized agent
- Use markdown for formatting when helpful`;


  const res = await llm.invoke([{
    role: "system",
    content: systemPrompt,
  }, {
    role: "user",
    content: state.prompt,
  }]);

  return {
    ...state,
    aiResponse: res.content
  }
};
