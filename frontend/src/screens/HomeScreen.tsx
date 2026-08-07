import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Colors } from "../constants/colors";
import { useAuth } from "../context/AuthContext";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "MainTabs">;

const menuItems: { label: string; emoji: string; screen: keyof RootStackParamList }[] = [
  { label: "Alphabets", emoji: "ಅ", screen: "Alphabets" },
  { label: "Numbers", emoji: "🔢", screen: "Numbers" },
  { label: "Words", emoji: "📖", screen: "Words" },
  { label: "Camera Scan", emoji: "📷", screen: "CameraScanner" },
  { label: "AI Teacher", emoji: "🤖", screen: "AITeacher" },
  { label: "Voice Translator", emoji: "🎤", screen: "VoiceTranslator" },
  { label: "Quiz", emoji: "❓", screen: "Quiz" },
];

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { user } = useAuth();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <Text style={styles.greeting}>Namaskara, {user?.name?.split(" ")[0] || "Buddy"} 👋</Text>
      <Text style={styles.subtitle}>What do you want to learn today?</Text>

      <View style={styles.statsRow}>
        <Stat label="XP" value={user?.xp ?? 0} />
        <Stat label="Coins" value={user?.coins ?? 0} />
        <Stat label="Level" value={user?.level ?? 1} />
      </View>

      <View style={styles.grid}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.label}
            style={styles.tile}
            activeOpacity={0.8}
            onPress={() => navigation.navigate(item.screen as any, item.screen === "Quiz" ? { quizType: "letter" } : undefined)}
          >
            <Text style={styles.tileEmoji}>{item.emoji}</Text>
            <Text style={styles.tileLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const Stat: React.FC<{ label: string; value: number }> = ({ label, value }) => (
  <View style={styles.statBox}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  greeting: { fontSize: 22, fontWeight: "700", color: Colors.textPrimary },
  subtitle: { fontSize: 14, color: Colors.textSecondary, marginTop: 4, marginBottom: 20 },
  statsRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 24 },
  statBox: {
    flex: 1, backgroundColor: Colors.card, marginHorizontal: 4, borderRadius: 12,
    paddingVertical: 14, alignItems: "center", elevation: 1,
  },
  statValue: { fontSize: 20, fontWeight: "700", color: Colors.primary },
  statLabel: { fontSize: 12, color: Colors.textSecondary, marginTop: 2 },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  tile: {
    width: "48%", backgroundColor: Colors.card, borderRadius: 16, paddingVertical: 24,
    alignItems: "center", marginBottom: 14, elevation: 1,
  },
  tileEmoji: { fontSize: 30, marginBottom: 8 },
  tileLabel: { fontSize: 14, fontWeight: "600", color: Colors.textPrimary },
});

export default HomeScreen;