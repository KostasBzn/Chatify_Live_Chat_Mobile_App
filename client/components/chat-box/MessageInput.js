import { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
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
        formData.append("messageImage", {
          uri: image.uri,
          type: image.type,
          fileName: image.fileName,
        });
      }

      await createNewMessage(chat._id, user._id, formData);

      setText("");
      setImage(null);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      // Any cleanup code can go here
    }
  };

  const handleChooseImage = () => {
    const options = {
      mediaType: "photo",
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("Image picker error: ", response.error);
      } else {
        setImage({
          uri: response.uri,
          type: response.type,
          fileName: response.fileName,
        });
      }
    });
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
});

export default MesageInput;
