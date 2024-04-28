import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Link } from "react-router-native";
import colors from "../style/colors.js";
import LoadingSpinner from "../components/loading/LoadingSpinner.js";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonIsLoading, setButtonIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    try {
      setButtonIsLoading(true);
      //await loginUser(email, password)
    } catch (error) {
      Alert.alert("Error", "Error logging in");
      console.error("Error logging in", error);
    } finally {
      setButtonIsLoading(false);
      setEmail("");
      setPassword("");
    }

    console.log("Email:", email);
    console.log("Password:", password);
  };

  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        autoCapitalize="none"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      {buttonIsLoading ? (
        <View style={styles.loadingContainer}>
          <LoadingSpinner />
          <Text style={styles.loadingText}>Logging in...</Text>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          disabled={buttonIsLoading}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      )}
      <View style={styles.textContainer}>
        <Text style={styles.text}>Don't have an account?</Text>
        <Link to="/">
          <Text style={styles.linkText}>Register</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.darkModeBack,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: colors.pearlBush,
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: colors.pearlBush,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: colors.pearlBush,
  },
  button: {
    width: "80%",
    height: 40,
    backgroundColor: colors.tealGreen,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  buttonText: {
    color: colors.pearlBush,
    fontSize: 16,
  },
  loadingContainer: {
    flexDirection: "row", // Arrange items horizontally
    alignItems: "center", // Center items vertically
    marginTop: 20, // Adjust spacing as needed
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    height: 40,
    backgroundColor: colors.tealGreen,
    borderRadius: 20,
    marginTop: 20,
  },

  loadingText: {
    marginLeft: 10,
    marginRight: 10,
    color: colors.pearlBush,
    fontSize: 16,
  },

  textContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  text: {
    color: colors.pearlBush,
    marginRight: 5,
  },
  linkText: {
    color: colors.tealGreen,
  },
});
