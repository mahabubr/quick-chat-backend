import { Router } from "express";
import AuthController from "../controllers/authController.js";
import authMiddlewares from "../middlewares/authMiddleware.js";
import ChatGroupController from "../controllers/chatGroupController.js";
import ChatGroupUserController from "../controllers/chatGroupUserController.js";
import ChatsController from "../controllers/chatsController.js";

const router = Router();

router.post("/auth/login", AuthController.login);

router.get("/chat-group", authMiddlewares, ChatGroupController.index);
router.get("/chat-group/:id", ChatGroupController.show);
router.post("/chat-group", authMiddlewares, ChatGroupController.store);
router.put("/chat-group", authMiddlewares, ChatGroupController.update);
router.delete("/chat-group", authMiddlewares, ChatGroupController.destroy);

router.get("/chat-group-users", ChatGroupUserController.index);
router.post("/chat-group-users", ChatGroupUserController.store);

router.get("/chats/:groupId", ChatsController.index);

export default router;
