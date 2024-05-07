import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import colors from "../../style/colors";
import { ChatContext } from "../../contexts/chatContext.js";

const MesageInput = ({ chat, user }) => {
  const { createNewMessage } = useContext(ChatContext);
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const handleSendMessage = async () => {
    try {
      // Prepare the message data (text and image)
      const formData = new FormData();
      formData.append("text", text);
      if (image) {
        formData.append("messageFile", {
          uri: image,
          name: "image.jpg",
          type: "image/jpeg",
        });
      }

      await createNewMessage(chat._id, user._id, formData);

      setText("");
      setImage(null);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      // Maybe i will update this for better user experience
    }
  };

  const handleChooseImage = async () => {
    try {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.cancelled) {
        await saveImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error selecting image: ", error);
    }
  };

  const saveImage = async (imageResult) => {
    try {
      setImage(imageResult);
    } catch (error) {
      console.error("Error saving image: ", error);
      throw error;
    }
  };

  const handleDeleteImage = () => {
    setImage(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.messageInput}>
        <TextInput
          style={styles.input}
          placeholder="Message..."
          placeholderTextColor={colors.pearlBush}
          value={text}
          onChangeText={setText}
          multiline={true}
          maxHeight={60}
          underlineColorAndroid="transparent"
        />
        {image && (
          <View style={styles.imagePreviewContainer}>
            <Image source={{ uri: image }} style={styles.previewImage} />
            <TouchableOpacity
              onPress={handleDeleteImage}
              style={styles.deleteIconContainer}
            >
              <Image
                source={require("../../assets/svg/delete.png")}
                style={styles.deleteIcon}
              />
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity onPress={handleChooseImage}>
          <Image
            source={require("../../assets/svg/image.png")}
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleSendMessage} disabled={!text && !image}>
        <Image
          source={require("../../assets/svg/send.png")}
          style={[styles.send, !text && !image && styles.disabledIcon]}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  messageInput: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 10,
    fontSize: 16,
    color: colors.pearlBush,
  },
  image: {
    width: 30,
    height: 30,
    tintColor: colors.pearlBush,
    marginLeft: 5,
  },
  send: {
    width: 30,
    height: 30,
    tintColor: colors.lightGreen,
    marginLeft: 5,
  },
  disabledIcon: {
    opacity: 0.4,
  },
  previewImage: {
    width: 50,
    height: 50,
  },
  imagePreviewContainer: {
    position: "relative",
  },
  deleteIconContainer: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  deleteIcon: {
    width: 15,
    height: 15,
    tintColor: "red",
  },
});

export default MesageInput;
