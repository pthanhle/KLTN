import express from "express";
import { AiChatController } from "../../controllers/AI/AI.controller.js";
import { protect } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.post("/chat", AiChatController.askPricing);
router.get("/conversations", AiChatController.getConversations);
router.get("/conversations/:id/messages", AiChatController.getConversationMessages);
router.delete("/conversations/:id", AiChatController.deleteConversation);

export default router;
