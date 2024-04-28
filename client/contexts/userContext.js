import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../config/axios.js";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userFoundById, setUserFoundById] = useState(null);
  const [userFoundByEmail, setUserFoundByEmail] = useState(null);

  const navigate = useNavigate();

  const baseURL = import.meta.env.VITE_BASE_URL;

  //Login
  const loginUser = async (email, password) => {
    const body = {
      email,
      password,
    };

    try {
      const response = await axios.post(baseURL + "/users/login", body);

      if (response.data.success) {
        setUser(response.data.user);
        localStorage.setItem("token", response.data.token);
        //navigate("/chat");
      }
    } catch (error) {
      console.error("Error login user", error);
    }
  };

  //Register user
  const registerUser = async (username, email, password) => {
    const body = { username, email, password };
    try {
      const response = await axios.post(baseURL + `/users/register`, body);

      if (response.data.success) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error register user", error);
    }
  };

  //logged user
  const loggedUser = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const response = await axios.get(baseURL + `/users/logged`);
        if (response.data.success) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.error("Error logged user", error);
        localStorage.removeItem("token");
        setUser(null);
      }
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
  const logoutUser = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  //Update profile pic
  const updateProfileImage = async (userId, formData) => {
    /* Note ==> The formData should have this structure:
    const formData = new FormData();
    formData.append("profileImage", profileImageFile);
    
    and the input:
     <input
          type="file"
          onChange={(e) => {
            setProfileImageFile(e.target.files[0]);
          }}
        />
    
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

  return (
    <UserContext.Provider
      value={{
        user,
        userFoundById,
        userFoundByEmail,
        loginUser,
        registerUser,
        logoutUser,
        findByUserById,
        findByUserByemail,
        updateProfileImage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
