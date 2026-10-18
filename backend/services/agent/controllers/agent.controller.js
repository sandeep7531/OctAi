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

    const chatServiceUrl = process.env.CHAT_SERVICE_URL
    await axios.post(`${chatServiceUrl}/save-message`, {
      conversationId,
      role,
      content: prompt,
    }, {
      headers: {
        Cookie: req.headers.cookie,
      },
    });

    const result = await agentGraph.invoke({
      prompt,
      conversationId,
      role,
    });

    const response = result.aiResponse;

    await axios.post(`${chatServiceUrl}/save-message`, {
      conversationId,
      role: "ai",
      content: response,
    }, {
      headers: {
        Cookie: req.headers.cookie,
      },
    });

    return res
      .status(200)
      .json(new ApiResponse(200, response, "agent response"));
  } catch (error) {
    const status = error.response?.status || error.statusCode || 500;
    const message =
      error.response?.data?.message ||
      error.message ||
      "Error in agent service";
    throw new ApiError(status, message);
  }
});

