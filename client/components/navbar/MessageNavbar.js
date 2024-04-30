import { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigate } from "react-router-native";
import colors from "../../style/colors.js";
import { useContext } from "react";
import { UserContext } from "../../contexts/userContext.js";
import { ChatContext } from "../../contexts/chatContext.js";

const MessageNavbar = () => {
  const { user } = useContext(UserContext);
  const { conversationChat, setConversationChat, setMessagesForChat } =
    useContext(ChatContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleBack = () => {
    navigate("/chatlist");
    setConversationChat(null);
    setMessagesForChat(null);
  };

  const handleDeleteChat = (chatId) => {
    console.log("Delete chat with id:", chatId);
    toggleMenu();
  };

  const menuRef = useRef(null);

  const handleOverlayPress = () => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      toggleMenu();
    }
  };

  return (
    <View style={styles.navbar}>
      <View style={styles.navbarContent}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Image
            source={require("../../assets/svg/back.png")}
            style={styles.backArrow}
          />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <View style={styles.leftSection}>
          {conversationChat && conversationChat?.isGroupChat ? (
            <>
              <Image
                source={{ uri: conversationChat.chatImage }}
                style={styles.profileImage}
              />
              <Text style={styles.title}>{conversationChat.chatName}</Text>
            </>
          ) : (
            <>
              {conversationChat?.participants &&
                conversationChat?.participants.map(
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
                        {/* Render participant's name */}
                        <Text style={styles.title}>{participant.username}</Text>
                      </View>
                    )
                )}
            </>
          )}
        </View>
      </View>
      <TouchableOpacity onPress={toggleMenu}>
        <Image
          source={require("../../assets/svg/navbarMenu.png")}
          style={styles.menu}
        />
      </TouchableOpacity>
      {isMenuOpen && (
        <TouchableWithoutFeedback onPress={handleOverlayPress}>
          <View ref={menuRef} style={styles.dropdownMenu}>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => handleDeleteChat(conversationChat?._id)}
            >
              <Image
                source={require("../../assets/svg/delete.png")}
                style={styles.menuLogo}
              />
              <Text style={styles.menuItem}>Delete chat</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    height: 60,
    width: "100%",
    backgroundColor: colors.tealGreen,
    position: "absolute",
    top: 0,
    zIndex: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  navbarContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 16,
  },
  participantContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  title: {
    fontSize: 23,
    fontWeight: "bold",
    color: colors.pearlBush,
  },
  menu: {
    width: 30,
    height: 30,
    tintColor: colors.pearlBush,
  },
  dropdownMenu: {
    position: "absolute",
    top: 60,
    right: 0,
    backgroundColor: colors.tealGreenDark,
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 20,
    zIndex: 10,
    width: "60%",
  },
  menuItem: {
    fontSize: 16,
    color: colors.pearlBush,
    paddingVertical: 5,
    fontWeight: "500",
    marginVertical: 3,
  },
  menuLogo: {
    width: 20,
    height: 20,
    tintColor: colors.pearlBush,
    marginRight: 5,
  },
  backArrow: {
    width: 15,
    height: 15,
    tintColor: colors.pearlBush,
  },
  backText: {
    fontSize: 16,
    color: colors.pearlBush,
    fontWeight: "500",
  },
  menuButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default MessageNavbar;