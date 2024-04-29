import Chat from "../models/chatSchema.js";
import Message from "../models/messageSchema.js";
import User from "../models/userSchema.js";
import cloudinaryV2 from "../config/cloudinary.js";

// Create new Chat
export const createNewChat = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;

    if (!senderId || !receiverId) {
      return res.status(400).json({
        success: false,
        message: "Sender ID and receiver ID are required.",
      });
    }

    const chat = await Chat.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (chat) return res.status(200).json({ success: true, chat });

    const newChat = new Chat({
      participants: [senderId, receiverId],
    });

    await newChat.save();

    await newChat.populate("participants");

    res.status(200).json({ success: true, chat: newChat });
  } catch (error) {
    console.error("Error creating new Chat:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get user chats
export const getUserChats = async (req, res) => {
  const { userId } = req.params;

  try {
    const userChats = await Chat.find({
      participants: { $in: [userId] },
    })
      .populate("participants")
      .populate("latestMessage");

    res.status(200).json({ success: true, userChats });
  } catch (error) {
    console.error("Error finding the chats for this user:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

//find chat
export const findChat = async (req, res) => {
  const { senderId, receiverId } = req.params;
  try {
    const chat = await Chat.findOne({
      participants: { $all: [senderId, receiverId] },
    })
      .populate("participants")
      .populate("latestMessage");

    res.status(200).json({ success: true, chat });
  } catch (error) {
    console.error("Error finding the chat:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// delete chat
export const deleteChat = async (req, res) => {
  const { chatId } = req.params;

  try {
    // Find all messages for the chat
    const messages = await Message.find({ chat: chatId });

    // Find messages with images
    const messagesWithImages = messages.filter(
      (message) => message.messageImage
    );

    // Extract public IDs from image urls
    const publicIds = messagesWithImages.map((message) => {
      const filename = message.messageImage.split("/").pop();
      return filename.split(".")[0];
    });

    // Delete images from Cloudinary
    const deletionPromises = publicIds.map((publicId) =>
      cloudinaryV2.uploader
        .destroy(`Chatify_live_chat_mobile/chat_images/${publicId}`)
        .then((result) => console.log("Message image deleted result:", result))
    );

    // Await all deletion promises
    await Promise.all(deletionPromises);

    // Delete all messages for the chat
    await Message.deleteMany({ chat: chatId });

    // Delete the chat
    const deletedChat = await Chat.findByIdAndDelete(chatId);

    return res.status(200).json({
      success: true,
      message: "Chat deleted successfully!",
      deletedChat,
    });
  } catch (error) {
    console.error("Error deleting the chat:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Join group chat via link
export const joinGroupChat = async (req, res) => {
  try {
    const { chatId, userId } = req.params;

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res
        .status(404)
        .json({ success: false, message: "Chat not found." });
    }

    // Check if the user is already a participant in the chat
    if (chat.participants.includes(userId)) {
      return res.status(200).json({
        success: true,
        message: "User is already a participant in the chat.",
      });
    }

    // Add the user to the participants of the chat
    chat.participants.push(userId);
    await chat.save();

    await chat.populate("participants");
    await chat.populate("latestMessage");

    res.status(200).json({
      success: true,
      message: "User joined the chat successfully.",
      chat,
    });
  } catch (error) {
    console.error("Error joining group chat:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

//Add via email
export const addMemberByEmail = async (req, res) => {
  const { chatId, email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res
        .status(404)
        .json({ success: false, message: "Chat not found." });
    }

    if (chat.participants.includes(user._id)) {
      return res.status(200).json({
        success: true,
        message: "User is already a participant in the chat.",
      });
    }

    chat.participants.push(user._id);

    await chat.save();

    await chat.populate("participants");
    await chat.populate("latestMessage");

    return res.status(200).json({
      success: true,
      message: "User added to chat successfully.",
      chat,
    });
  } catch (error) {
    console.error("Error adding member to chat:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

//leave chat
export const leaveGroupChat = async (req, res) => {
  const { chatId, userId } = req.body;

  try {
    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res
        .status(404)
        .json({ success: false, message: "Chat not found." });
    }

    const updatedParticipants = chat.participants.filter(
      (participant) => participant.toString() !== userId
    );

    chat.participants = updatedParticipants;

    await chat.save();

    await chat.populate("participants");
    await chat.populate("latestMessage");

    return res.status(200).json({
      success: true,
      message: "User left the chat successfully.",
      chat,
    });
  } catch (error) {
    console.error("Error leaving chat:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};
