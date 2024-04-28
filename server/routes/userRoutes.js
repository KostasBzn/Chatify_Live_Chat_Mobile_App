import express from "express";
import auth from "../middlewares/user-auth.js";
import {
  findUserByEmail,
  findUserById,
  loggedUser,
  loginUser,
  registerUser,
  updateProfileImage,
} from "../controllers/userContollers.js";
import { profileImageUpload } from "../middlewares/multerCloudinary.js";

const userRoutes = express.Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);
userRoutes.get("/logged", auth, loggedUser);
userRoutes.get("/find/id/:userId", findUserById);
userRoutes.get("/find/email/:email", findUserByEmail);
userRoutes.put(
  "/update/image/:userId",
  profileImageUpload.single("profileImage"),
  updateProfileImage
);

export default userRoutes;
