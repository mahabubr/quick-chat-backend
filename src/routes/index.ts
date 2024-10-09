import { Router } from "express";
import AuthController from "../controllers/authController.js";
import authMiddlewares from "../middlewares/authMiddleware.js";
import ChatGroupController from "../controllers/chatGroupController.js";

const router = Router();

router.post("/auth/login", AuthController.login);

router.get("/chat-group", authMiddlewares, ChatGroupController.index);
router.get("/chat-group/:id", authMiddlewares, ChatGroupController.show);
router.post("/chat-group", authMiddlewares, ChatGroupController.store);
router.put("/chat-group", authMiddlewares, ChatGroupController.update);
router.delete("/chat-group", authMiddlewares, ChatGroupController.destroy);

export default router;
