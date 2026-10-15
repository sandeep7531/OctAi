import redis from "../redis.js";
import { ApiError } from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const verifyAuth = asyncHandler(async (req, _, next) => {
  try {
    const { session } = req.cookies || {};

    if (!session) {
      throw new ApiError(401, "Unauthorized access session is requried");
    }
    const sessionData = await redis.get(`session_${session}`);

    if (!sessionData) {
      throw new ApiError(401, "Session is expired or invalid");
    }
    req.user = JSON.parse(sessionData);
    next();
  } catch (error) {
    throw new ApiError(
      error.statusCode || 500,
      error.message || "Error during verify auth",
    );
  }
});

export { verifyAuth };
