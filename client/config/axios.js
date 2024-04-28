import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const axiosAuth = async () => {
  const token = await AsyncStorage.getItem("token");

  return axios.create({
    headers: {
      Authorization: token,
    },
  });
};

export default axiosAuth;
