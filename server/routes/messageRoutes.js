import express from "express";
import {
  createMessage,
  deleteMessage,
  getMessagesForChat,
} from "../controllers/messageController.js";
import { chatImageUpload } from "../middlewares/multerCloudinary.js";

const messageRoutes = express.Router();

messageRoutes.post(
  "/new/:chatId/:senderId",
  chatImageUpload.single("messageFile"),
  createMessage
);
messageRoutes.get("/chat/:chatId", getMessagesForChat);
messageRoutes.delete("/delete/:messageId", deleteMessage);

export default messageRoutes;
