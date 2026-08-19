import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../types";
import * as authService from "../services/authService";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (fields: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      console.log("[AuthContext] App starting - checking stored session...");
      const stored = await authService.getStoredUser();
      console.log("[AuthContext] Stored user found:", stored ? stored.email : "NONE");

      if (stored) {
        const isValid = await authService.checkSessionValidity();
        if (isValid) {
          console.log("[AuthContext] Session valid - staying logged in as", stored.email);
          setUser(stored);
        } else {
          console.log("[AuthContext] Session expired - logging out");
          await authService.logout();
          setUser(null);
        }
      } else {
        console.log("[AuthContext] No stored user - showing Onboarding/Login");
      }

      setLoading(false);
    })();
  }, []);

  const login = async (email: string, password: string) => {
    const { user: loggedInUser } = await authService.login(email, password);
    setUser(loggedInUser);
  };

  const register = async (name: string, email: string, password: string) => {
    const { user: newUser } = await authService.register(name, email, password);
    setUser(newUser);
  };

  const logout = async () => {
    console.log("[AuthContext] logout() called from UI");
    await authService.logout();
    setUser(null);
  };

  const updateUser = async (fields: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...fields };
      AsyncStorage.setItem("user", JSON.stringify(updated)).catch(() => {});
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};