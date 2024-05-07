import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import colors from "../style/colors.js";
import { UserContext } from "../contexts/userContext.js";
import GroupSettingsNavbar from "../components/navbar/GroupSettingsNavbar.js";
import { ChatContext } from "../contexts/chatContext.js";
import { useParams } from "react-router-native";

const GroupSettingsPage = () => {
  const { user } = useContext(UserContext);
  const { findChatById, conversationChat } = useContext(ChatContext);
  const { chatId } = useParams();

  //Conversetionchat is our actual chat

  useEffect(() => {
    findChatById(chatId);
  }, []);

  return (
    <View style={styles.container}>
      {/* Navbar */}
      <GroupSettingsNavbar chat={conversationChat} />
      <View style={styles.newChatContainer}>
        <Text>This is the group chat settings page</Text>
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

export default GroupSettingsPage;
