import cloudinaryV2 from "../config/cloudinary.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

//Profile image upload
const profileImageStorage = new CloudinaryStorage({
  cloudinary: cloudinaryV2,
  params: {
    folder: "Chatify_live_chat_mobile/profile_images",
    format: async (req, file) => {
      try {
        if (!file.mimetype.startsWith("image")) {
          throw new Error("Only image files are allowed");
        }
        const extension = file.mimetype.split("/")[1];
        return extension;
      } catch (error) {
        console.error("Error uploading the image", error);
        throw error;
      }
    },
    public_id: (req, file) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      return uniqueSuffix;
    },
  },
});

const profileImageUpload = multer({ storage: profileImageStorage });

//Chat Image
const chatImageStorage = new CloudinaryStorage({
  cloudinary: cloudinaryV2,
  params: {
    folder: "Chatify_live_chat_mobile/chat_images",
    format: async (req, file) => {
      try {
        if (!file.mimetype.startsWith("image")) {
          throw new Error("Only image files are allowed");
        }
        const extension = file.mimetype.split("/")[1];
        return extension;
      } catch (error) {
        console.error("Error uploading the image", error);
        throw error;
      }
    },
    public_id: (req, file) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      return uniqueSuffix;
    },
  },
});

const chatImageUpload = multer({ storage: chatImageStorage });

export { profileImageUpload, chatImageUpload };
