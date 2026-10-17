import { StateGraph } from "@langchain/langgraph";
import { agentState } from "./state.js";
import { mainRouterAgent } from "../agents/mainRouter.agent.js";
import { codingAgent } from "../agents/coding.agent.js";
import { chatAgent } from "../agents/chat.agent.js";
import { pdfAgent } from "../agents/pdf.agent.js";
import { pptAgent } from "../agents/ppt.agent.js";
import { imageGenAgent } from "../agents/imageGen.agent.js";
import { webSearchAgent } from "../agents/webSearch.agent.js";

const workflow = new StateGraph(agentState);

workflow.addNode("mainRouter", mainRouterAgent);
workflow.addNode("coding", codingAgent);
workflow.addNode("chat", chatAgent);
workflow.addNode("pdf", pdfAgent);
workflow.addNode("ppt", pptAgent);
workflow.addNode("image", imageGenAgent);
workflow.addNode("webSearch", webSearchAgent);

workflow.addEdge("__start__", "mainRouter");

workflow.addConditionalEdges(
    "mainRouter",
    (state) => {
        switch (state.agent) {
            case "coding":
                return "coding";
            case "chat":
                return "chat";
            case "pdf":
                return "pdf";
            case "ppt":
                return "ppt";
            case "image":
                return "image";
            case "webSearch":
                return "webSearch";
            default:
                return "chat";
        }
    },
    {
        chat: "chat",
        coding: "coding",
        pdf: "pdf",
        ppt: "ppt",
        image: "image",
        webSearch: "webSearch",
    },
);

workflow.addEdge("webSearch", "chat");
workflow.addEdge("chat", "__end__");
workflow.addEdge("coding", "__end__");
workflow.addEdge("pdf", "__end__");
workflow.addEdge("ppt", "__end__");
workflow.addEdge("image", "__end__");

export const agentGraph = workflow.compile();
