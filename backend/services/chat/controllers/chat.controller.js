import { ApiError } from "../../../shared/utils/apiError.js";
import { ApiResponse } from "../../../shared/utils/apiResponse.js";
import asyncHandler from "../../../shared/utils/asyncHandler.js";
import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";

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
      .json(
        new ApiResponse(200, conv, "Fetched all conversations successfully"),
      );
  } catch (error) {
    throw new ApiError(500, "Error while fetching conversations");
  }
});

const updateConversations = asyncHandler(async (req, res) => {
  try {
    const { id, title } = req?.body;
    const updatedConv = await Conversation.findByIdAndUpdate(id, {
      title,
    });

    res
      .status(200)
      .json(
        new ApiResponse(200, updatedConv, "Conversation upated successfully"),
      );
  } catch (error) {
    throw new ApiError(500, "Error while updating conversations");
  }
});

const saveMessages = asyncHandler(async (req, res) => {
  try {
    const { conversatoinId, role, content } = req.body;

    if (!conversatoinId && !role && !content) {
      throw new ApiError(401, "conversationsId/role/content are requried");
    }

    const message = await Message.create({
      conversatoinId,
      role,
      content,
    });

    res
      .status(200)
      .json(new ApiResponse(200, message, "Message created successfully"));
  } catch (error) {
    throw new ApiError(500, "Error while creating messages");
  }
});

const getMessages = asyncHandler(async (req, res) => {
  try {
    const { conversatoinId } = req.body;
    if (conversatoinId) {
      throw new ApiError(401, "conversation id is requried ");
    }
    const messages = await Message.find({ conversatoinId }).sort({
      updatedAt: -1,
    });

    res
      .status(200)
      .json(
        new ApiResponse(200, messages, "Fetched all messages successfully"),
      );
  } catch (error) {
    throw new ApiError(500, "Error while fetching messages");
  }
});

export {
  createConversation,
  getConversations,
  saveMessages,
  getMessages,
  updateConversations,
};
