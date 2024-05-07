import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../config/axios.js";
import { BASE_URL } from "@env";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userFoundById, setUserFoundById] = useState(null);
  const [userFoundByEmail, setUserFoundByEmail] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const baseURL = BASE_URL;

  // Login
  const loginUser = async (email, password) => {
    const body = {
      email,
      password,
    };

    try {
      const response = await axios.post(baseURL + "/users/login", body);

      if (response.data.success) {
        setUser(response.data.user);
        setLoginSuccess(response.data.success);
        await AsyncStorage.setItem("token", response.data.token);
      }
    } catch (error) {
      console.error("Error login user", error);
    }
  };
  //Register user
  const registerUser = async (username, email, password) => {
    try {
      const body = { username, email, password };
      const response = await axios.post(baseURL + `/users/register`, body);

      if (response.data.success) {
        setRegisterSuccess(response.data.success);
      }
    } catch (error) {
      console.error("Error register user", error);
    }
  };

  // logged user
  const loggedUser = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        const response = await axios.get(baseURL + "/users/logged");

        if (response.data.success) {
          setUser(response.data.user);
        }
      }
    } catch (error) {
      console.error("Error logged user", error);
      await AsyncStorage.removeItem("token");
      setUser(null);
    }
  };

  useEffect(() => {
    loggedUser();
  }, []);

  //get user by id
  const findByUserById = async (userId) => {
    try {
      const response = await axios.get(baseURL + `/users/find/id/${userId}`);
      if (response.data.success) {
        setUserFoundById(response.data.user);
      }
    } catch (error) {
      console.error("Failed to find user by id:", error);
      setUsersResultByUsername([]);
    }
  };

  //get user by email
  const findByUserByemail = async (email) => {
    try {
      const response = await axios.get(baseURL + `/users/find/email/${email}`);
      if (response.data.success) {
        setUserFoundByEmail(response.data.user);
      }
    } catch (error) {
      console.error("Failed to find user by email:", error);
      setUsersResultByUsername([]);
    }
  };

  //logout user
  const logoutUser = async () => {
    await AsyncStorage.removeItem("token");
  };

  //Update profile pic
  const updateProfileImage = async (userId, formData) => {
    /* Note ==> The formData should have this structure:
    const formData = new FormData();
    formData.append("profileImage", profileImageFile);
    */
    try {
      const response = await axios.put(
        baseURL + `/users/update/image/${userId}`,
        formData
      );
      if (response.data.success) {
        setUser(response.data.user);
        console.log("Profile image updated!");
      }
    } catch (error) {
      console.error("Error updating the profile image", error);
    }
  };

  //Update username
  const updateUserName = async (userId, updatedData) => {
    try {
      const response = await axios.put(
        baseURL + `/users/update/username/${userId}`,
        updatedData
      );
      if (response.data.success) {
        setUser(response.data.user);
        console.log("Username updated!");
      }
    } catch (error) {
      console.error("Error updating the username", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        userFoundById,
        userFoundByEmail,
        loginSuccess,
        setLoginSuccess,
        registerSuccess,
        setRegisterSuccess,
        loginUser,
        registerUser,
        logoutUser,
        findByUserById,
        findByUserByemail,
        updateProfileImage,
        loggedUser,
        updateUserName,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
