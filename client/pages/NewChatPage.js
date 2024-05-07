import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import colors from "../style/colors.js";
import { UserContext } from "../contexts/userContext.js";
import NewChatNavbar from "../components/navbar/NewChatNavbar.js";
import { ChatContext } from "../contexts/chatContext.js";

const NewChatPage = () => {
  const { user } = useContext(UserContext);
  const { createNewChat } = useContext(ChatContext);

  return (
    <View style={styles.container}>
      {/* Navbar */}
      <NewChatNavbar />
      <View style={styles.newChatContainer}>
        <Text>This is the new chat page</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkModeBack,
  },
  newChatContainer: {
    alignItems: "center",
    marginTop: 80,
    marginHorizontal: 30,
  },
});

export default NewChatPage;
