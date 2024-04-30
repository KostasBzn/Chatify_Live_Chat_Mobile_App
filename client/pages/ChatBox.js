import React, { useEffect, useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import moment from "moment";
import MessageNavbar from "../components/navbar/MessageNavbar.js";
import colors from "../style/colors.js";
import { UserContext } from "../contexts/userContext.js";
import { ChatContext } from "../contexts/chatContext.js";
import { useParams } from "react-router-native";

const ChatBox = () => {
  const { user } = useContext(UserContext);
  const {
    getMessagesForChat,
    messagesForChat,
    findChatById,
    conversationChat,
  } = useContext(ChatContext);
  const { chatId } = useParams();

  useEffect(() => {
    findChatById(chatId);
    getMessagesForChat(chatId);
  }, []);

  return (
    <View style={styles.container}>
      <MessageNavbar chatId={chatId} />
      <ScrollView style={styles.messagesContainer}>
        {messagesForChat?.map((message) => (
          <View
            key={message._id}
            style={[
              styles.messageContainer,
              message.sender._id === user._id
                ? styles.sentMessageContainer
                : styles.receivedMessageContainer,
            ]}
          >
            {conversationChat?.isGroupChat &&
              message.sender._id !== user?._id && (
                <Text style={styles.senderName}>{message.sender.username}</Text>
              )}
            <Text style={styles.messageText}>{message.text}</Text>
            {/* Display timestamp */}
            <Text style={styles.timestampText}>
              {moment(message.createdAt).format("h:mm A")}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkModeBack,
  },
  messagesContainer: {
    flex: 1,
    marginTop: 70,
    marginHorizontal: 15,
    marginBottom: 20,
  },
  messageContainer: {
    position: "relative",
    maxWidth: "70%",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    paddingTop: 4,
  },
  sentMessageContainer: {
    alignSelf: "flex-end",
    backgroundColor: colors.tealGreenDark,
  },
  receivedMessageContainer: {
    alignSelf: "flex-start",
    backgroundColor: colors.tealGreen,
  },
  senderName: {
    color: colors.pearlBush,
    fontSize: 16,
    paddingBottom: 2,
    fontWeight: "700",
  },
  messageText: {
    color: colors.pearlBush,
    fontSize: 16,
    paddingBottom: 14,
  },
  timestampText: {
    position: "absolute",
    bottom: 5,
    right: 5,
    color: colors.pearlBush,
    fontSize: 11,
  },
});

export default ChatBox;
