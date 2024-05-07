import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import colors from "../style/colors.js";
import { UserContext } from "../contexts/userContext.js";
import SetingsNavbar from "../components/navbar/SettignsNavbar.js";

const ProfileSettings = () => {
  const { user } = useContext(UserContext);

  const handleEditProfileImage = async () => {
    try {
      console.log("handle profile image upload logic");
      //await logoutUser();
    } catch (error) {
      console.error("Error changing the profile picture:", error);
    } finally {
      //addlogic for better user experience
    }
  };

  const handleEditName = async () => {
    console.log("handle edit name logic logic");
  };

  const handleSaveName = async () => {
    try {
      console.log("handle save name logic logic");
      //await logoutUser();
    } catch (error) {
      console.error("Error saving the profile name:", error);
    } finally {
      //addlogic for better user experience
    }
  };

  return (
    <View style={styles.container}>
      <SetingsNavbar />
      <View style={styles.profileContainer}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: user.profileImage }}
            style={styles.profileImage}
          />
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleEditProfileImage}
          >
            <Image
              source={require("../assets/svg/add-photo.png")}
              style={styles.addPhotoLogo}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.userNameEdit}>
          <View style={styles.userInfo}>
            <View style={styles.userInfoLeft}>
              <Image
                source={require("../assets/svg/profile.png")}
                style={styles.profileLogo}
              />
              <Text style={styles.username}>{user.username}</Text>
            </View>

            <TouchableOpacity
              style={styles.editButton}
              onPress={handleEditName}
            >
              <Image
                source={require("../assets/svg/edit.png")}
                style={styles.editLogo}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.userInfotext}>
            This is your username that is visible in your chats, you can change
            it by clicking the edit button.{" "}
          </Text>
        </View>
        <View style={styles.userEmail}>
          <Image
            source={require("../assets/svg/email.png")}
            style={styles.emailLogo}
          />
          <Text style={styles.email}>{user.email}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkModeBack,
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 80,
    marginHorizontal: 30,
  },

  profileImageContainer: {
    position: "relative",
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  addPhotoLogo: {
    tintColor: colors.lightGreen,
    width: 30,
    height: 30,
    position: "absolute",
    right: 15,
    bottom: 20,
  },
  profileLogo: {
    tintColor: colors.lightGreen,
    width: 25,
    height: 25,
  },
  editLogo: {
    tintColor: colors.lightGreen,
    width: 20,
    height: 20,
  },
  emailLogo: {
    tintColor: colors.lightGreen,
    width: 20,
    height: 20,
  },
  userNameEdit: {
    marginBottom: 30,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
    width: "100%",
  },
  userInfoLeft: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  userInfotext: {
    color: colors.pearlBush,
    fontSize: 14,
    marginLeft: 35,
  },
  userEmail: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 10,
    width: "100%",
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    color: colors.pearlBush,
  },
  email: {
    fontSize: 20,
    marginLeft: 10,
    color: colors.pearlBush,
  },
});

export default ProfileSettings;
