import "dotenv/config";
import { ChatGroq } from "@langchain/groq";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const groqLlm = new ChatGroq({
  model: "openai/gpt-oss-120b",
  temperature: 0,
  maxTokens: undefined,
  maxRetries: 2,
});

const giminiLlm = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-pro",
  temperature: 0,
  maxRetries: 2,
});

export const getModel = (agent) => {
  switch (agent) {
    case "chat":
      return groqLlm;
    case "coding":
      return giminiLlm;
    case "pdf":
      return giminiLlm;
    case "ppt":
      return giminiLlm;
    case "image":
      return giminiLlm;
    case "webSearch":
      return giminiLlm;
    default:
      return groqLlm;
  }
}
