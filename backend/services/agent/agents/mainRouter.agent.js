import { getModel } from "../config/llmModels.js";

export const mainRouterAgent = async (state) => {
    const llm = await getModel("mainRouter");
    const systemPrompt = `You are a smart router agent for a multi-agent system called OctAI.
Your job is to analyze the user's request and choose the correct specialized agent.

Available agents:
- coding: For writing, debugging, or explaining code
- chat: For general conversation, greeting, text, and non-code tasks
- pdf: For creating, summarizing, or editing PDF documents
- ppt: For creating or modifying presentations
- image: For generating or editing images
- webSearch: For finding real-time, current, trending, or recent internet information

RULES:
1. Use webSearch if the user asks for current, trending, or recent real-time information.
2. For coding questions or debugging, route to coding.
3. For general questions, casual chat, greetings, route to chat.
4. Output MUST be ONLY valid JSON in this exact format:
{"agent": "agentName"}`;

    let chosenAgent = "chat";
    try {
        const res = await llm.invoke([
            { role: "system", content: systemPrompt },
            { role: "user", content: state.prompt }
        ]);

        console.log("mainRouter response:", res.content);
        const match = res.content.match(/\{[\s\S]*?\}/);
        if (match) {
            const parsed = JSON.parse(match[0]);
            if (parsed.agent) {
                chosenAgent = parsed.agent.trim();
            }
        }
    } catch (err) {
        console.error("Router agent error, falling back to chat:", err.message);
    }

    return {
        ...state,
        agent: chosenAgent,
    };
};
