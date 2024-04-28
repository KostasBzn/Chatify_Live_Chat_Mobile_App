import { NativeRouter, Route, Routes } from "react-router-native";
import { StatusBar, View } from "react-native";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import colors from "./style/colors.js";
import UserProvider from "./contexts/userContext.js";
import ChatProvider from "./contexts/chatContext.js";

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
              <Route path="/" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/chat" element={<LoginPage />} />
            </Routes>
          </NativeRouter>
        </>
      </ChatProvider>
    </UserProvider>
  );
}
