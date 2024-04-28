import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Link, useNavigate } from "react-router-native";
import colors from "../style/colors.js";
import LoadingSpinner from "../components/loading/LoadingSpinner.js";
import { UserContext } from "../contexts/userContext.js";
import AuthNavbar from "../components/navbar/AuthNavbar.js";

export default function RegisterPage() {
  const { registerUser, registerSuccess } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonIsLoading, setButtonIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!username || !email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    try {
      setButtonIsLoading(true);
      await registerUser(username, email, password);
    } catch (error) {
      Alert.alert("Error", "Error registering the user");
      console.error("Error registering the user", error);
    } finally {
      setButtonIsLoading(false);
      setUsername("");
      setEmail("");
      setPassword("");
    }
  };

  useEffect(() => {
    if (registerSuccess) {
      navigate("/login", { replace: true });
    }
  }, [registerSuccess]);

  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  return (
    <View style={styles.container}>
      <AuthNavbar />
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        keyboardType="default"
        autoCapitalize="none"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
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
          <Text style={styles.loadingText}>Registering...</Text>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          disabled={buttonIsLoading}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      )}
      <View style={styles.textContainer}>
        <Text style={styles.text}>Already have an account?</Text>
        <Link to="/login">
          <Text style={styles.linkText}>Login</Text>
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
