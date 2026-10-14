import { Router } from "express";
import { getCurrentUser } from "../controllers/user.controller.js";
import { verifyAuth } from "../../shared/middleware/auth.middleware.js";

const router = Router();

router.route("/api/get-user").get(verifyAuth, getCurrentUser);

export default router;
