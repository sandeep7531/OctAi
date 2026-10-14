import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
    },
    role: {
      type: String,
      enum: ["user", "ai"],
    },
    content: {
      type: String,
    },
  },
  { timestamps: true },
);

export const Message = mongoose.model("Message", messageSchema);
