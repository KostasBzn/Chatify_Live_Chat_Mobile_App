import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigate } from "react-router-native";
import colors from "../../style/colors.js";
import { useContext } from "react";
import { UserContext } from "../../contexts/userContext.js";

const ChatListNavbar = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <View style={styles.navbar}>
      {/* Left section: Profile image*/}
      <View style={styles.leftSection}>
        {user && user?.profileImage ? (
          <Image
            source={{ uri: user.profileImage }}
            style={styles.profileImage}
          />
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>

      {/* Middle section: Title */}
      <Text style={styles.title}>Chat list</Text>

      {/* Right section: Menu */}
      <TouchableOpacity
        onPress={() => {
          /* Handle menu click */
        }}
      >
        <Text style={styles.menu}>Menu</Text>
      </TouchableOpacity>
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
  placeholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.darkModeBack,
    marginRight: 10,
  },
  title: {
    fontSize: 23,
    fontWeight: "bold",
    color: colors.pearlBush,
  },
  menu: {
    fontSize: 18,
    color: colors.pearlBush,
  },
});

export default ChatListNavbar;
