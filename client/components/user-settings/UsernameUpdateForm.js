import { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import colors from "../../style/colors.js";
import { UserContext } from "../../contexts/userContext.js";

const UsernameUpdateForm = ({ user, toggleUsernameEditForm }) => {
  const [newUsername, setNewUsername] = useState(user?.username);
  const { updateUserName } = useContext(UserContext);
  const inputRef = useRef(null);
  const maxLength = 20;

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSaveName = async () => {
    try {
      await updateUserName(user._id, { username: newUsername });
      toggleUsernameEditForm();
      setNewUsername("");
    } catch (error) {
      console.error("Error saving the profile name:", error);
    } finally {
      //addlogic for better user experience
    }
  };

  const handleCancel = () => {
    toggleUsernameEditForm();
  };

  const isSaveDisabled = newUsername.trim() === "";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter your name</Text>
      <View style={styles.formContainer}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={newUsername}
          onChangeText={setNewUsername}
          placeholder="Your name"
          placeholderTextColor={colors.pearlBush}
          maxLength={maxLength}
        />
        <Text style={styles.characterCount}>
          {maxLength - newUsername.length}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, isSaveDisabled && styles.disabledButton]}
          onPress={handleSaveName}
          disabled={isSaveDisabled}
        >
          <Text style={[styles.buttonText, styles.saveButtonText]}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.darkModeBack,
    borderRadius: 10,
    marginTop: 20,
  },
  title: {
    fontSize: 16,
    color: colors.pearlBush,
    marginBottom: 10,
  },
  formContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.pearlBush,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 10,
    color: colors.pearlBush,
  },
  characterCount: {
    color: colors.pearlBush,
    fontSize: 14,
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: colors.lightGreen,
    fontSize: 16,
  },
  saveButtonText: {
    color: colors.lightGreen,
    fontSize: 16,
  },
  disabledButton: {
    opacity: 0.6,
    color: colors.lightGreen,
    fontSize: 16,
  },
});

export default UsernameUpdateForm;
