import asyncHandler from "../../shared/utils/asyncHandler.js";
import { ApiResponse } from "../../shared/utils/apiResponse.js";

const getCurrentUser = asyncHandler(async (req, res) => {
    try {
        return res.status(200).json(new ApiResponse(200, req.user, "User fetched successfully"))
    } catch (error) {
        throw new ApiError(error.statusCode || 500, error.message || "Error during user fetch")
    }
})

export { getCurrentUser }   