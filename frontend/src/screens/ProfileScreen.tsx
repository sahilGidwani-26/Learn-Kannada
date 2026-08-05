import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Colors } from "../constants/colors";
import { useAuth } from "../context/AuthContext";
import AppButton from "../components/AppButton";

const ProfileScreen: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert("Log out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Log out", style: "destructive", onPress: logout },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{user?.name?.charAt(0).toUpperCase() || "U"}</Text>
      </View>
      <Text style={styles.name}>{user?.name}</Text>
      <Text style={styles.email}>{user?.email}</Text>

      <View style={styles.statsRow}>
        <Stat label="XP" value={user?.xp ?? 0} />
        <Stat label="Coins" value={user?.coins ?? 0} />
        <Stat label="Level" value={user?.level ?? 1} />
      </View>

      <AppButton title="Log Out" variant="outline" onPress={handleLogout} style={{ marginTop: 30, width: "100%" }} />
    </View>
  );
};

const Stat: React.FC<{ label: string; value: number }> = ({ label, value }) => (
  <View style={styles.statBox}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, alignItems: "center", padding: 24, paddingTop: 60 },
  avatar: { width: 84, height: 84, borderRadius: 42, backgroundColor: Colors.primary, alignItems: "center", justifyContent: "center", marginBottom: 16 },
  avatarText: { fontSize: 32, color: "#fff", fontWeight: "700" },
  name: { fontSize: 20, fontWeight: "700", color: Colors.textPrimary },
  email: { fontSize: 13, color: Colors.textSecondary, marginTop: 2 },
  statsRow: { flexDirection: "row", marginTop: 24, width: "100%" },
  statBox: { flex: 1, backgroundColor: Colors.card, marginHorizontal: 4, borderRadius: 12, paddingVertical: 14, alignItems: "center", elevation: 1 },
  statValue: { fontSize: 20, fontWeight: "700", color: Colors.primary },
  statLabel: { fontSize: 12, color: Colors.textSecondary, marginTop: 2 },
});

export default ProfileScreen;
