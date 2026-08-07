import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// With Expo Go running on your phone, "localhost" points at the phone itself, not your
// computer - so you must use your computer's LAN IP here (both devices need to be on the
// same Wi-Fi). Find it with `ipconfig` (Windows) or `ifconfig`/`ipconfig getifaddr en0` (Mac).
// Example: "http://192.168.1.42:5000/api"
// (Android/iOS *simulators* running on the same machine as the backend can use localhost instead.)
export const API_BASE_URL = "http://learn-kannada-ten.vercel.app/api"; 

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error?.response?.data?.message || error.message || "Something went wrong";
    return Promise.reject(new Error(message));
  }
);

export default api;
