import { View, Text, StyleSheet } from "react-native";
import colors from "../style/colors.js";
import ChatListNavbar from "../components/navbar/ChatListNavbar.js";

const ChatList = () => {
  return (
    <View style={styles.container}>
      <ChatListNavbar />
      <Text>This is the ChatList page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkModeBack,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChatList;
