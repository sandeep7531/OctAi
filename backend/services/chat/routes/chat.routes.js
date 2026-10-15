import { Router } from "express";
import {
  createConversation,
  getConversations,
  getMessages,
  saveMessages,
  updateConversation,
} from "../controllers/chat.controller.js";

const router = Router();

router.route("/new-conversation").post(createConversation);
router.route("/conversations").get(getConversations);
router.route("/update-conversation").post(updateConversation);
router.route("/save-message").post(saveMessages);
router.route("/get-message").post(getMessages);

export default router;
