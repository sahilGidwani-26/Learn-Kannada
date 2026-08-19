import api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../types";

interface AuthResponse {
  success: boolean;
  user: User;
  token: string;
}

const touchLastActive = async () => {
  await AsyncStorage.setItem("lastActiveAt", String(Date.now()));
};

export const register = async (name: string, email: string, password: string) => {
  const { data } = await api.post<AuthResponse>("/auth/register", { name, email, password });
  await AsyncStorage.setItem("token", data.token);
  await AsyncStorage.setItem("user", JSON.stringify(data.user));
  await touchLastActive();
  return data;
};

export const login = async (email: string, password: string) => {
  const { data } = await api.post<AuthResponse>("/auth/login", { email, password });
  await AsyncStorage.setItem("token", data.token);
  await AsyncStorage.setItem("user", JSON.stringify(data.user));
  await touchLastActive();
  return data;
};

export const logout = async () => {
  await AsyncStorage.multiRemove(["token", "user", "lastActiveAt"]);
};

export const getStoredUser = async (): Promise<User | null> => {
  const raw = await AsyncStorage.getItem("user");
  return raw ? JSON.parse(raw) : null;
};

const TWO_DAYS_MS = 2 * 24 * 60 * 60 * 1000;

// Checks how long it's been since the app was last opened. If it's been more than
// 2 days, the session is considered expired and the user needs to log in again.
// Otherwise, the session stays valid and "last active" is refreshed to now.
export const checkSessionValidity = async (): Promise<boolean> => {
  const lastActiveRaw = await AsyncStorage.getItem("lastActiveAt");

  if (!lastActiveRaw) {
    // No timestamp recorded yet (e.g. very first login before this feature existed) -
    // treat as valid this once, and start tracking from now.
    await touchLastActive();
    return true;
  }

  const lastActiveAt = parseInt(lastActiveRaw, 10);
  const elapsed = Date.now() - lastActiveAt;

  if (elapsed > TWO_DAYS_MS) {
    return false; // session expired - caller should log the user out
  }

  await touchLastActive(); // still active - refresh the timestamp
  return true;
};