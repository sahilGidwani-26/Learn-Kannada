import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import * as Speech from "expo-speech";
import { Colors } from "../constants/colors";
import LetterCard from "../components/LetterCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { fetchAlphabets } from "../services/learningService";
import { sampleAlphabets } from "../constants/data";
import { Alphabet } from "../types";

const AlphabetsScreen: React.FC = () => {
  const [tab, setTab] = useState<"vowel" | "consonant">("vowel");
  const [alphabets, setAlphabets] = useState<Alphabet[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Alphabet | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchAlphabets(tab)
      .then((data) => !cancelled && setAlphabets(data))
      .catch(() => {
        // Backend not reachable yet - fall back to local sample data so UI still works
        if (!cancelled) setAlphabets(sampleAlphabets as unknown as Alphabet[]);
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [tab]);

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => setTab("vowel")} style={[styles.tab, tab === "vowel" && styles.tabActive]}>
          <Text style={[styles.tabText, tab === "vowel" && styles.tabTextActive]}>Vowels (ಸ್ವರ)</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTab("consonant")} style={[styles.tab, tab === "consonant" && styles.tabActive]}>
          <Text style={[styles.tabText, tab === "consonant" && styles.tabTextActive]}>Consonants (ವ್ಯಂಜನ)</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <LoadingSpinner label="Loading letters..." />
      ) : (
        <FlatList
          data={alphabets}
          keyExtractor={(item: any) => item._id || item.id}
          numColumns={3}
          contentContainerStyle={{ padding: 10 }}
          renderItem={({ item }: any) => (
            <LetterCard
              kannada={item.kannada}
              transliteration={item.englishTransliteration || item.english}
              onPress={() => {
                // Kannada TTS voices aren't guaranteed on every device; falls back to the
                // system default voice if "kn-IN" isn't installed.
                Speech.speak(item.kannada, { language: "kn-IN" });
                Alert.alert(
                  item.kannada,
                  `Transliteration: ${item.englishTransliteration || item.english}\nHindi: ${item.hindiMeaning || item.hindi || "-"}\nExample: ${
                    item.exampleWord ? `${item.exampleWord.kannada} (${item.exampleWord.english})` : item.exampleWord || "-"
                  }`
                );
              }}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  tabs: { flexDirection: "row", padding: 12 },
  tab: { flex: 1, paddingVertical: 10, alignItems: "center", borderRadius: 10, backgroundColor: Colors.card, marginHorizontal: 4 },
  tabActive: { backgroundColor: Colors.primary },
  tabText: { color: Colors.textSecondary, fontWeight: "600", fontSize: 12 },
  tabTextActive: { color: "#fff" },
});

export default AlphabetsScreen;
