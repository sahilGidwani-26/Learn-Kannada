import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../constants/colors";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types";
import { useAuth } from "../context/AuthContext";

type Props = NativeStackScreenProps<RootStackParamList, "Splash">;

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    const timer = setTimeout(() => {
      navigation.replace(user ? "MainTabs" : "Onboarding");
    }, 1200);
    return () => clearTimeout(timer);
  }, [loading, user, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>ಕ</Text>
      <Text style={styles.title}>Kannada Buddy</Text>
      <Text style={styles.subtitle}>Learn Kannada the fun way</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.primary, alignItems: "center", justifyContent: "center" },
  logo: { fontSize: 72, color: "#fff", fontWeight: "700" },
  title: { fontSize: 28, color: "#fff", fontWeight: "700", marginTop: 8 },
  subtitle: { fontSize: 14, color: "#FFEDE0", marginTop: 4 },
});

export default SplashScreen;
