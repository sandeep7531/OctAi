import { ApiError } from "../../../shared/utils/apiError.js";
import { ApiResponse } from "../../../shared/utils/apiResponse.js";
import asyncHandler from "../../../shared/utils/asyncHandler.js";
import { Conversation } from "../models/conversation.model.js";

const createConversation = asyncHandler(async (req, res) => {
  try {
    const userId = req?.user?._id;
    const conv = await Conversation.create({
      userId,
    });
    res
      .status(200)
      .json(new ApiResponse(200, conv, "Conversation created successfully"));
  } catch (error) {
    throw new ApiError(500, "Error while creating conversation");
  }
});

const getConversations = asyncHandler(async (req, res) => {
  try {
    const userId = req?.user?._id;
    const conv = await Conversation.find({
      userId,
    }).sort({ updatedAt: -1 });
    res
      .status(200)
      .json(new ApiResponse(200, conv, "Fetched all conversations successfully"));
  } catch (error) {
    throw new ApiError(500, "Error while fetching conversations");
  }
});

export { createConversation, getConversations };
