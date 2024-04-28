import { NativeRouter, Route, Routes } from "react-router-native";
import { StatusBar, View } from "react-native";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import colors from "./style/colors.js";
import UserProvider from "./contexts/userContext.js";
import ChatProvider from "./contexts/chatContext.js";
import IntroPage from "./pages/IntroPage.js";
import ChatList from "./pages/ChatList.js";
import ChatBox from "./pages/ChatBox.js";

export default function App() {
  return (
    <UserProvider>
      <ChatProvider>
        <>
          <View>
            <StatusBar color="white" backgroundColor={colors.darkModeBack} />
          </View>

          <NativeRouter>
            <Routes>
              <Route path="/" element={<IntroPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/chatlist" element={<ChatList />} />
              <Route path="/chatbox" element={<ChatBox />} />
            </Routes>
          </NativeRouter>
        </>
      </ChatProvider>
    </UserProvider>
  );
}
