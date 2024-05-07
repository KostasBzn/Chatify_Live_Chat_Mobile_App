import React, { useState, useRef } from "react";
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

const ChatListNavbar = () => {
  const { user, logoutUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      navigate("/");
      await logoutUser();
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      toggleMenu();
    }
  };

  const handleSettings = () => {
    navigate(`/settings`);
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
      <View style={styles.leftSection}>
        {user && user?.profileImage ? (
          <Image
            source={{ uri: user.profileImage }}
            style={styles.profileImage}
          />
        ) : null}
      </View>
      <Text style={styles.title}>Chat list</Text>
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
              onPress={handleSettings}
            >
              <Image
                source={require("../../assets/svg/settings.png")}
                style={styles.menuLogo}
              />
              <Text style={styles.menuItem}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuButton} onPress={handleLogout}>
              <Image
                source={require("../../assets/svg/logout.png")}
                style={styles.menuLogo}
              />
              <Text style={styles.menuItem}>Logout</Text>
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
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: 0,
    zIndex: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
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
  menuButton: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default ChatListNavbar;
