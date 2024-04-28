import Message from "../models/messageSchema.js";
import cloudinaryV2 from "../config/cloudinary.js";

//create a message
export const createMessage = async (req, res) => {
  //const { chatId, senderId, text } = req.body;
  if (req.file) req.body.messageImage = req.file.path;
  try {
    const newMessage = new Message(req.body);

    await newMessage.save();

    await newMessage.populate("sender");

    res.status(200).send({ success: true, newMessage });
  } catch (error) {
    console.log("Error creating new message:", error.message);
    res.status(500).send({ success: false, error: error.message });
  }
};

//get messages for chat
export const getMessagesForChat = async (req, res) => {
  const { chatId } = req.params;

  try {
    const messagesForChat = await Message.find({ chat: chatId })
      .populate("sender")
      .populate("chat");

    res.status(200).send({ success: true, messagesForChat });
  } catch (error) {
    console.log("Error getting the messages:", error.message);
    res.status(500).send({ success: false, error: error.message });
  }
};

// delete message
export const deleteMessage = async (req, res) => {
  const { messageId } = req.params;
  try {
    const message = await Message.findById(messageId);
    if (message.messageImage) {
      const filename = message.messageImage.split("/").pop();
      const publicId = filename.split(".")[0];
      if (publicId) {
        cloudinaryV2.uploader
          .destroy(`Chatify_live_chat_mobile/chat_images/${publicId}`)
          .then((result) =>
            console.log("Message image deleted result:", result)
          );
      }
    }
    const deletedMessage = await Message.findByIdAndDelete(messageId);

    res.status(200).json({
      success: true,
      message: "Message deleted successfully!",
      deletedMessage,
    });
  } catch (error) {
    console.log("Error deleting the message:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
