import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigate } from "react-router-native";
import colors from "../style/colors";

const IntroPage = () => {
  const navigate = useNavigate();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Chatify</Text>
        <Text style={styles.slogan}>We connect you in unexpected ways!</Text>
      </View>
      <View style={styles.featuresContainer}>
        <View style={styles.feature}>
          <Text style={styles.featureText}>Chat in groups</Text>
        </View>
        <View style={styles.feature}>
          <Text style={styles.featureText}>Chat in private</Text>
        </View>
        <View style={styles.feature}>
          <Text style={styles.featureText}>
            Share your photos with your friends!
          </Text>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigate("/login")}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigate("/register")}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
    backgroundColor: colors.darkModeBack,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logoText: {
    fontSize: 76,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.pearlBush,
  },
  slogan: {
    fontSize: 36,
    fontWeight: "500",
    textAlign: "center",
    color: colors.pearlBush,
  },
  featuresContainer: {
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  feature: {
    backgroundColor: colors.tealGreenDark,
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
  },
  featureText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.pearlBush,
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: "35%",
    height: 40,
    backgroundColor: colors.tealGreen,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  buttonText: {
    color: colors.pearlBush,
    fontSize: 16,
  },
});

export default IntroPage;
