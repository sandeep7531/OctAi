import { firebaseapp } from "../config/firebase.js";
import { getAuth } from "firebase-admin/auth";
import { User } from "../models/user.model.js";
import redis from "../../../shared/redis.js";
import asyncHandler from "../../../shared/utils/asyncHandler.js";
import { ApiError } from "../../../shared/utils/apiError.js";
import { ApiResponse } from "../../../shared/utils/apiResponse.js";

const login = asyncHandler(async (req, res) => {
  try {
    const { token } = req.body || {};
    const auth = getAuth(firebaseapp);

    if (!token) {
      throw new ApiError(400, "Token is required in request body");
    }
    // Verify Firebase ID Token
    const decodeToken = await auth.verifyIdToken(token);
    let user = await User.findOne({ firebaseUid: decodeToken?.uid });
    if (!user) {
      user = await User.create({
        firebaseUid: decodeToken.uid,
        name: decodeToken.name,
        email: decodeToken.email,
        avatar: decodeToken.picture,
      });
    }
    const sessionId = crypto.randomUUID();
    const options = {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };
    await redis.set(
      `session_${sessionId}`,
      JSON.stringify(user),
      "EX",
      60 * 60 * 24 * 7,
    );

    return res
      .status(200)
      .cookie("session", sessionId, options)
      .json(new ApiResponse(200, user, "User created successfully"));
  } catch (error) {
    throw new ApiError(
      error.statusCode || 500,
      error.message || "Error during login",
    );
  }
});

const logout = asyncHandler(async (req, res) => {
  try {
    const session = req.cookies.session;
    if (!session) {
      throw new ApiError(400, "Session not found");
    }
    await redis.del(`session_${session}`);
    res.clearCookie("session");
    return res
      .status(200)
      .json(new ApiResponse(200, "User logged out successfully"));
  } catch (error) {
    throw new ApiError(
      error.statusCode || 500,
      error.message || "Error during logout",
    );
  }
});

export { login, logout };
