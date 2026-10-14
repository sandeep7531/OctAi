const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (error) {
        res.status(error.statusCode || error.status || 500).json({
            success: false,
            message: error.message,
        })
        next(error);
    }
}

export default asyncHandler;