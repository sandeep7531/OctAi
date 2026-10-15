import { ApiError } from "../../../shared/utils/apiError.js";
import { ApiResponse } from "../../../shared/utils/apiResponse.js";
import asyncHandler from "../../../shared/utils/asyncHandler.js";
import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";

const createConversation = asyncHandler(async (req, res) => {
  try {
    const userId = req?.user?._id;
    if (!userId)
      throw new ApiError(401, "Unauthorized access user not available in req");
    const conv = await Conversation.create({
      userId,
    });
    res
      .status(200)
      .json(new ApiResponse(200, conv, "Conversation created successfully"));
  } catch (error) {
    throw new ApiError(
      error.statusCode || 500,
      error.message || "Error while creating conversation"
    );
  }
});

const getConversations = asyncHandler(async (req, res) => {
  try {
    const userId = req?.user?._id;
    if (!userId)
      throw new ApiError(401, "Unauthorized access user not available in req");
    const conv = await Conversation.find({
      userId,
    }).sort({ updatedAt: -1 });

    res
      .status(200)
      .json(
        new ApiResponse(200, conv, "Fetched all conversations successfully"),
      );
  } catch (error) {
    throw new ApiError(
      error.statusCode || 500,
      error.message || "Error while fetching conversations"
    );
  }
});

const updateConversation = asyncHandler(async (req, res) => {
  try {
    const { conversationId, title } = req?.body;

    if (!conversationId || !title) {
      throw new ApiError(400, "conversationId and title are required");
    }

    const userId = req.user?._id;
    if (!userId) {
      throw new ApiError(401, "Unauthorized access user not available in req");
    }

    const updatedConv = await Conversation.findOneAndUpdate(
      { _id: conversationId, userId },
      { title },
      { new: true }
    );

    if (!updatedConv) {
      throw new ApiError(404, "Conversation not found or unauthorized");
    }

    res
      .status(200)
      .json(
        new ApiResponse(200, updatedConv, "Conversation updated successfully"),
      );
  } catch (error) {
    throw new ApiError(
      error.statusCode || 500,
      error.message || "Error while updating conversations"
    );
  }
});

const saveMessages = asyncHandler(async (req, res) => {
  try {
    const { conversationId, role, content } = req.body;

    if (!conversationId || !role || !content) {
      throw new ApiError(400, "conversationId, role, and content are required");
    }

    const userId = req.user?._id;
    if (!userId) {
      throw new ApiError(401, "Unauthorized access user not available in req");
    }

    // Verify conversation belongs to current logged-in user
    const conversation = await Conversation.findOne({
      _id: conversationId,
      userId,
    });
    if (!conversation) {
      throw new ApiError(404, "Conversation not found or unauthorized");
    }

    const message = await Message.create({
      conversationId,
      role,
      content,
    });

    res
      .status(200)
      .json(new ApiResponse(200, message, "Message created successfully"));
  } catch (error) {
    throw new ApiError(
      error.statusCode || 500,
      error.message || "Error while creating messages"
    );
  }
});

const getMessages = asyncHandler(async (req, res) => {
  try {
    const { conversationId } = req.body;

    if (!conversationId) {
      throw new ApiError(400, "conversationId is required");
    }

    const userId = req.user?._id;
    if (!userId) {
      throw new ApiError(401, "Unauthorized access user not available in req");
    }

    // Verify conversation belongs to current logged-in user
    const conversation = await Conversation.findOne({
      _id: conversationId,
      userId,
    });
    if (!conversation) {
      throw new ApiError(404, "Conversation not found or unauthorized");
    }

    const messages = await Message.find({
      conversationId,
    }).sort({
      createdAt: 1,
    });

    res
      .status(200)
      .json(
        new ApiResponse(200, messages, "Fetched all messages successfully"),
      );
  } catch (error) {
    throw new ApiError(
      error.statusCode || 500,
      error.message || "Error while fetching messages"
    );
  }
});

export {
  createConversation,
  getConversations,
  saveMessages,
  getMessages,
  updateConversation,
};
