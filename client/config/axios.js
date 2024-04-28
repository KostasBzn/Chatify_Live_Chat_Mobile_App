import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const axiosAuth = axios.create({
  headers: {
    Authorization: await AsyncStorage.getItem("token"),
  },
});

export default axiosAuth;
