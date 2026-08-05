import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../constants/colors";
import AppButton from "../components/AppButton";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "Onboarding">;

const OnboardingScreen: React.FC<Props> = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.emoji}>📚✨</Text>
    <Text style={styles.title}>Welcome to Kannada Buddy</Text>
    <Text style={styles.desc}>
      Scan text, translate instantly, practice letters and words, and learn Kannada with your own AI teacher.
    </Text>
    <AppButton title="Get Started" onPress={() => navigation.navigate("Register")} style={{ width: "100%", marginTop: 24 }} />
    <AppButton
      title="I already have an account"
      variant="outline"
      onPress={() => navigation.navigate("Login")}
      style={{ width: "100%", marginTop: 12 }}
    />
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, alignItems: "center", justifyContent: "center", padding: 24 },
  emoji: { fontSize: 48, marginBottom: 16 },
  title: { fontSize: 24, fontWeight: "700", color: Colors.textPrimary, textAlign: "center" },
  desc: { fontSize: 14, color: Colors.textSecondary, textAlign: "center", marginTop: 12, lineHeight: 20 },
});

export default OnboardingScreen;
