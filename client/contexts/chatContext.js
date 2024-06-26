import { createContext, useContext, useState } from "react";
import axios from "../config/axios.js";
import { BASE_URL } from "@env";
import { UserContext } from "./userContext.js";

export const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [chatsForUser, setChatsForUser] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
  const [messagesForChat, setMessagesForChat] = useState(null);
  const [conversationChat, setConversationChat] = useState(null);
  const [deleteChatSuccess, setDeleteChatSuccess] = useState(false);
  const [leaveGroupSuccess, setLeaveGroupSuccess] = useState(false);

  const baseURL = BASE_URL;

  /* Chat endpoints */

  //New Chat
  const createNewChat = async (senderId, receiverId) => {
    const body = { senderId, receiverId };
    try {
      const response = await axios.post(baseURL + `/chats/new`, body);

      if (response.data.success) {
        if (chatsForUser) {
          setChatsForUser([...chatsForUser, response.data.chat]);
          console.log("chats context spread", chatsForUser);
        } else {
          setChatsForUser([response.data.chat]);
          console.log("chats context first", chatsForUser);
        }
      }
    } catch (error) {
      console.error("Error creating new chat", error);
    }
  };

  //get user Chats
  const getUserChats = async (userId) => {
    try {
      const response = await axios.get(baseURL + `/chats/user/${userId}`);

      if (response.data.success) {
        setChatsForUser(response.data.userChats);
      }
    } catch (error) {
      console.error("Error finding chats for the User", error.message);
    }
  };

  //find chat by users
  const findChat = async (senderId, receiverId) => {
    try {
      const response = await axios.get(
        baseURL + `/chats/find/${senderId}/${receiverId}`
      );

      if (response.data.success) {
        setSelectedChat(response.data.chat);
      }
    } catch (error) {
      console.error("Error finding the selected chat", error.message);
    }
  };

  //find chat by id
  const findChatById = async (chatId) => {
    try {
      const response = await axios.get(baseURL + `/chats/chat/${chatId}`);

      if (response.data.success) {
        setConversationChat(response.data.chat);
      }
    } catch (error) {
      console.error("Error finding the selected chat", error.message);
    }
  };

  //delete delete message
  const deleteChat = async (chatId) => {
    try {
      const response = await axios.delete(baseURL + `/chats/delete/${chatId}`);
      if (response.data.success) {
        const updatedChatsForUser = chatsForUser.filter(
          (chat) => chat._id !== chatId
        );
        setChatsForUser(updatedChatsForUser);
        setDeleteChatSuccess(response.data.success);
      }
    } catch (error) {
      console.error("Error deleting the chat", error);
    }
  };

  //join group via link
  const joinGroupChat = async (chatId, userId) => {
    try {
      const response = await axios.post(
        baseURL + `/chats/group/join/${chatId}/${userId}`
      );

      if (response.data.success) {
        if (chatsForUser) {
          setChatsForUser([...chatsForUser, response.data.chat]);
          console.log("chats context spread", chatsForUser);
        } else {
          setChatsForUser([response.data.chat]);
          console.log("chats context first", chatsForUser);
        }
      }
    } catch (error) {
      console.error("Error joining the group chat", error);
    }
  };

  //add member to the group chat
  const addMemberByEmail = async (chatId, email) => {
    const body = { chatId, email };
    try {
      const response = await axios.post(baseURL + `/chats/group/add`, body);

      if (response.data.success) {
        if (chatsForUser) {
          setChatsForUser((prevChats) => [
            ...prevChats.filter((chat) => chat._id !== chatId),
            response.data.chat,
          ]);
        } else {
          setChatsForUser([response.data.chat]);
        }
      }
    } catch (error) {
      console.error("Error adding member to the group chat", error);
    }
  };

  //leave chat
  const leaveGroupChat = async (chatId, userId) => {
    const body = { chatId, userId };
    try {
      const response = await axios.post(baseURL + `/chats/leave`, body);

      if (response.data.success) {
        setChatsForUser(chatsForUser.filter((chat) => chat._id !== chatId));
        setLeaveGroupSuccess(response.data.success);
      }
    } catch (error) {
      console.error("Error leaving the group chat", error);
    }
  };

  /* Message endpoints */

  // New Message
  const createNewMessage = async (chatId, senderId, formData) => {
    try {
      const response = await axios.post(
        `${baseURL}/messages/new/${chatId}/${senderId}`,
        formData
      );

      if (response.data.success) {
        setNewMessage(response.data.newMessage);
        if (messagesForChat) {
          setMessagesForChat([...messagesForChat, response.data.newMessage]);
        } else {
          setMessagesForChat([response.data.newMessage]);
        }
      }
    } catch (error) {
      console.error("Error creating new message", error);
    }
  };

  //find messages for chat
  const getMessagesForChat = async (chatId) => {
    try {
      const response = await axios.get(baseURL + `/messages/chat/${chatId}`);

      if (response.data.success) {
        setMessagesForChat(response.data.messagesForChat);
      }
    } catch (error) {
      console.error("Error finding the selected chat", error.message);
    }
  };

  //delete delete message
  const deleteMessage = async (messageId) => {
    try {
      const response = await axios.delete(
        baseURL + `/messages/delete/${messageId}`
      );
      if (response.data.success) {
        const updatedMessages = messagesForChat.filter(
          (message) => message._id !== messageId
        );
        setMessagesForChat(updatedMessages);
      }
    } catch (error) {
      console.error("Error deleting the message", error);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        chatsForUser,
        selectedChat,
        newMessage,
        messagesForChat,
        conversationChat,
        deleteChatSuccess,
        leaveGroupSuccess,
        setConversationChat,
        setMessagesForChat,
        createNewChat,
        findChat,
        getUserChats,
        deleteChat,
        joinGroupChat,
        findChatById,
        addMemberByEmail,
        leaveGroupChat,
        createNewMessage,
        getMessagesForChat,
        deleteMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
