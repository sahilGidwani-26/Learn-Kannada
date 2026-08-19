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
  console.log("[Auth] Registered + saved to storage:", data.user.email);
  return data;
};

export const login = async (email: string, password: string) => {
  const { data } = await api.post<AuthResponse>("/auth/login", { email, password });
  await AsyncStorage.setItem("token", data.token);
  await AsyncStorage.setItem("user", JSON.stringify(data.user));
  await touchLastActive();
  console.log("[Auth] Logged in + saved to storage:", data.user.email);
  return data;
};

export const logout = async () => {
  console.log("[Auth] logout() called - clearing storage");
  await AsyncStorage.multiRemove(["token", "user", "lastActiveAt"]);
};

export const getStoredUser = async (): Promise<User | null> => {
  const raw = await AsyncStorage.getItem("user");
  console.log("[Auth] getStoredUser() raw value from storage:", raw);
  return raw ? JSON.parse(raw) : null;
};

const TWO_DAYS_MS = 2 * 24 * 60 * 60 * 1000;

export const checkSessionValidity = async (): Promise<boolean> => {
  const lastActiveRaw = await AsyncStorage.getItem("lastActiveAt");
  console.log("[Auth] checkSessionValidity() lastActiveAt raw:", lastActiveRaw);

  if (!lastActiveRaw) {
    await touchLastActive();
    console.log("[Auth] No lastActiveAt found - treating as valid, starting fresh timer");
    return true;
  }

  const lastActiveAt = parseInt(lastActiveRaw, 10);
  const elapsed = Date.now() - lastActiveAt;
  console.log("[Auth] elapsed ms since last active:", elapsed, "(2 days =", TWO_DAYS_MS, ")");

  if (elapsed > TWO_DAYS_MS) {
    console.log("[Auth] Session EXPIRED - more than 2 days inactive");
    return false;
  }

  await touchLastActive();
  console.log("[Auth] Session still valid - refreshed timestamp");
  return true;
};