import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigate } from "react-router-native";
import colors from "../../style/colors.js";

const GroupSettingsNavbar = ({ chat }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(`/chatbox/${chat._id}`);
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
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Group Settings</Text>
        </View>
      </View>
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
    position: "relative",
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 23,
    fontWeight: "bold",
    color: colors.pearlBush,
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
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
  },
});

export default GroupSettingsNavbar;
