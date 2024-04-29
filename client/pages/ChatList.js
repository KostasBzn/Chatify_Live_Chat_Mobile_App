import React, { useEffect, useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigate } from "react-router-native";
import colors from "../style/colors.js";
import ChatListNavbar from "../components/navbar/ChatListNavbar.js";
import { UserContext } from "../contexts/userContext.js";
import { ChatContext } from "../contexts/chatContext.js";

const ChatList = () => {
  const { user } = useContext(UserContext);
  const { chatsForUser, getUserChats } = useContext(ChatContext);

  const navigate = useNavigate();

  useEffect(() => {
    getUserChats(user?._id);
  }, []);

  const handleSelectedChat = (chatId) => {
    console.log("selected chat", chatId);
  };

  return (
    <View style={styles.container}>
      <ChatListNavbar />
      <View style={styles.listContainer}>
        {chatsForUser?.length === 0 ? (
          <Text style={styles.emptyChatText}>You have no chats yet...</Text>
        ) : (
          <>
            {chatsForUser?.map((chat) => (
              <TouchableOpacity
                key={chat._id}
                onPress={() => {
                  handleSelectedChat(chat._id);
                }}
                style={styles.chatContainer}
              >
                {/* Render profile photo and name of each participant or group chat */}
                <View style={styles.participantsContainer}>
                  {chat && chat.isGroupChat ? (
                    <>
                      <Image
                        source={{ uri: chat.chatImage }}
                        style={styles.profileImage}
                      />
                      <View style={styles.messageContainer}>
                        <Text style={styles.groupChat}>
                          {chat.chatName} ({chat.participants.length})
                        </Text>
                        <Text
                          style={styles.lastMessage}
                          numberOfLines={1}
                          ellipsizeMode="tail"
                        >
                          {chat.latestMessage.text}
                        </Text>
                      </View>
                    </>
                  ) : (
                    chat.participants?.map(
                      (participant) =>
                        participant._id !== user._id && (
                          <View
                            key={participant._id}
                            style={styles.participantContainer}
                          >
                            {/* Render participant's profile photo */}
                            <Image
                              source={{ uri: participant.profileImage }}
                              style={styles.profileImage}
                            />
                            {/* Render participant's name and last message */}
                            <View style={styles.messageContainer}>
                              <Text style={styles.participantName}>
                                {participant.username}
                              </Text>
                              <Text
                                style={styles.lastMessage}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                              >
                                {chat.latestMessage.text}
                              </Text>
                            </View>
                          </View>
                        )
                    )
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}
      </View>
      {/* Fixed image at the bottom right */}
      <View style={styles.fixedButtonContainer}>
        <TouchableOpacity
          onPress={() => {
            navigate("/");
          }}
          style={styles.newChatButton}
        >
          <Image
            source={require("../assets/svg/newChat.png")}
            style={styles.newChatButtonImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkModeBack,
  },
  listContainer: {
    flex: 1,
    marginTop: 60,
    marginHorizontal: 15,
    marginBottom: 20,
  },
  emptyChatText: {
    fontSize: 20,
    color: colors.pearlBush,
    textAlign: "center",
    marginTop: 50,
  },
  chatContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
  },
  participantsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  groupChat: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.pearlBush,
  },
  participantContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10,
  },
  participantName: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.pearlBush,
  },
  messageContainer: {
    flex: 1,
    marginLeft: 5,
  },
  lastMessage: {
    fontSize: 14,
    color: colors.pearlBush,
    overflow: "hidden",
    marginTop: 5,
  },
  fixedButtonContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  newChatButtonImage: {
    width: 40,
    height: 40,
    tintColor: colors.darkModeBack,
  },
  newChatButton: {
    backgroundColor: colors.lightGreen,
    borderRadius: 10,
    padding: 10,
  },
});

export default ChatList;
