import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigate } from "react-router-native";
import colors from "../../style/colors.js";

const AuthNavbar = () => {
  const navigate = useNavigate();
  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => navigate("/")}>
        <Text style={styles.title}>Chatify</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    height: 40,
    width: "100%",
    backgroundColor: colors.tealGreen,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    zIndex: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.pearlBush,
  },
});

export default AuthNavbar;
