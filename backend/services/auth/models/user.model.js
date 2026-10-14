import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    firebaseUid: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      requried: true,
      lowercase: true,
      trim: true,
      unique: [true, "Email is requried"],
    },
    email: {
      type: String,
      requried: true,
      lowercase: true,
      trim: true,
      unique: [true, "Email is requried"],
      index: true,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
