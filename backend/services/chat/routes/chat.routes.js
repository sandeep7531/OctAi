import { Router } from "express";
import {
  createConversation,
  getConversations,
} from "../controllers/chat.controller.js";

const router = Router();

router.route("/new-conversation").post(createConversation);
router.route("/conversations").get(getConversations);

export default router;
