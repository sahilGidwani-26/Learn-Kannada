import api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../types";

interface AuthResponse {
  success: boolean;
  user: User;
  token: string;
}

export const register = async (name: string, email: string, password: string) => {
  const { data } = await api.post<AuthResponse>("/auth/register", { name, email, password });
  await AsyncStorage.setItem("token", data.token);
  await AsyncStorage.setItem("user", JSON.stringify(data.user));
  return data;
};

export const login = async (email: string, password: string) => {
  const { data } = await api.post<AuthResponse>("/auth/login", { email, password });
  await AsyncStorage.setItem("token", data.token);
  await AsyncStorage.setItem("user", JSON.stringify(data.user));
  return data;
};

export const logout = async () => {
  await AsyncStorage.multiRemove(["token", "user"]);
};

export const getStoredUser = async (): Promise<User | null> => {
  const raw = await AsyncStorage.getItem("user");
  return raw ? JSON.parse(raw) : null;
};
