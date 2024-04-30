import React from "react";
import { StatusBar, View, StyleSheet } from "react-native";
import { NativeRouter, Route, Routes } from "react-router-native";
import colors from "./style/colors.js";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserProvider from "./contexts/userContext.js";
import ChatProvider from "./contexts/chatContext.js";
import IntroPage from "./pages/IntroPage.js";
import ChatList from "./pages/ChatList.js";
import ChatBox from "./pages/ChatBox.js";

export default function App() {
  return (
    <UserProvider>
      <ChatProvider>
        <View style={styles.container}>
          <StatusBar color="white" backgroundColor={colors.darkModeBack} />
          <NativeRouter>
            <Routes>
              <Route path="/" element={<IntroPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/chatlist" element={<ChatList />} />
              <Route path="/chatbox/:chatId" element={<ChatBox />} />
            </Routes>
          </NativeRouter>
        </View>
      </ChatProvider>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
