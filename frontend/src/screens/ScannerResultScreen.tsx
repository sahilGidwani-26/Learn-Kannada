import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Share } from "react-native";
import { Colors } from "../constants/colors";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "ScannerResult">;

const ScannerResultScreen: React.FC<Props> = ({ route }) => {
  const { result } = route.params;

  const handleShare = () => {
    Share.share({
      message: `Kannada: ${result.originalText}\nEnglish: ${result.english}\nHindi: ${result.hindi}`,
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <Card label="Original (Kannada)" value={result.originalText} big />
      <Card label="English" value={result.english} />
      <Card label="Hindi" value={result.hindi} />
      <Card label="Simple Explanation" value={result.simpleExplanation} />
      {result.exampleSentence?.kannada ? (
        <Card
          label="Example Sentence"
          value={`${result.exampleSentence.kannada}\n${result.exampleSentence.english}`}
        />
      ) : null}

      <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
        <Text style={styles.shareText}>Share</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const Card: React.FC<{ label: string; value: string; big?: boolean }> = ({ label, value, big }) => (
  <View style={styles.card}>
    <Text style={styles.cardLabel}>{label}</Text>
    <Text style={[styles.cardValue, big && styles.cardValueBig]}>{value || "-"}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  card: { backgroundColor: Colors.card, borderRadius: 14, padding: 16, marginBottom: 12, elevation: 1 },
  cardLabel: { fontSize: 12, color: Colors.textSecondary, fontWeight: "600", textTransform: "uppercase" },
  cardValue: { fontSize: 15, color: Colors.textPrimary, marginTop: 6, lineHeight: 20 },
  cardValueBig: { fontSize: 22, fontWeight: "700" },
  shareBtn: { backgroundColor: Colors.secondary, borderRadius: 12, paddingVertical: 14, alignItems: "center", marginTop: 8 },
  shareText: { color: "#fff", fontWeight: "600" },
});

export default ScannerResultScreen;
