import express from "express";
import {
  addMemberByEmail,
  createNewChat,
  deleteChat,
  findChat,
  getUserChats,
  joinGroupChat,
  leaveGroupChat,
} from "../controllers/chatController.js";

const chatRoutes = express.Router();

chatRoutes.post("/new", createNewChat);
chatRoutes.get("/user/:userId", getUserChats);
chatRoutes.get("/find/:senderId/:receiverId", findChat);
chatRoutes.delete("delete/:chatId", deleteChat);
chatRoutes.post("/group/join/:chatId/:userId", joinGroupChat);
chatRoutes.post("/group/add/", addMemberByEmail);
chatRoutes.post("group/leave/", leaveGroupChat);

export default chatRoutes;
