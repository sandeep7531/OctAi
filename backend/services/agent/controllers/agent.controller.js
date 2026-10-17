import axios from "axios";
import { ApiError } from "../../../shared/utils/apiError.js";
import { ApiResponse } from "../../../shared/utils/apiResponse.js";
import asyncHandler from "../../../shared/utils/asyncHandler.js";
import { agentGraph } from "../graph/graph.js";

export const agent = asyncHandler(async (req, res) => {
  try {
    const { prompt, conversationId, role = "user" } = req.body;

    if (!prompt || !conversationId)
      throw new ApiError(401, "Prompt and conversation id is required");

    await axios.post(`${process.env.CHAT_SERVICE_URL}/save-message`, {
      conversationId,
      role,
      content: prompt,
    });

    const result = await agentGraph.invoke({
      prompt,
      conversationId,
      role,
    });

    const response = result.aiResponse;
    return res
      .status(200)
      .json(new ApiResponse(200, response, "agent response"));
  } catch (error) {
    throw new ApiError(
      error.statusCode || 500,
      error.message || "Error in agent service",
    );
  }
});

