import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Modal, ScrollView } from "react-native";
import * as Speech from "expo-speech";
import { Colors } from "../constants/colors";
import LetterCard from "../components/LetterCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { fetchAlphabets } from "../services/learningService";
import { sampleAlphabets } from "../constants/data";
import { englishExamples, EnglishLetterData } from "../constants/englishExamples";
import { Alphabet } from "../types";

type Tab = "vowel" | "consonant" | "english";

const AlphabetsScreen: React.FC = () => {
  const [tab, setTab] = useState<Tab>("vowel");
  const [alphabets, setAlphabets] = useState<Alphabet[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLetter, setSelectedLetter] = useState<EnglishLetterData | null>(null);

  useEffect(() => {
    if (tab === "english") {
      setLoading(false);
      return;
    }
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
        <TouchableOpacity onPress={() => setTab("english")} style={[styles.tab, tab === "english" && styles.tabActive]}>
          <Text style={[styles.tabText, tab === "english" && styles.tabTextActive]}>English (A-Z)</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <LoadingSpinner label="Loading letters..." />
      ) : tab === "english" ? (
        <FlatList
          data={englishExamples}
          keyExtractor={(item) => item.letter}
          numColumns={3}
          contentContainerStyle={{ padding: 10 }}
          renderItem={({ item }) => (
            <LetterCard
              kannada={item.letter}
              transliteration={item.letter.toLowerCase()}
              onPress={() => {
                Speech.speak(item.letter, { language: "en-US" });
                setSelectedLetter(item);
              }}
            />
          )}
        />
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

      {/* 5-example popup for the English A-Z tab */}
      <Modal visible={!!selectedLetter} transparent animationType="fade" onRequestClose={() => setSelectedLetter(null)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>{selectedLetter?.letter}</Text>
            <ScrollView style={{ maxHeight: 360 }}>
              {selectedLetter?.examples.map((ex, i) => (
                <View key={i} style={styles.exampleRow}>
                  <Text style={styles.exampleEnglish}>{ex.english}</Text>
                  <Text style={styles.exampleTranslation}>Hindi: {ex.hindi}</Text>
                  <Text style={styles.exampleTranslation}>Kannada: {ex.kannada}</Text>
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setSelectedLetter(null)}>
              <Text style={styles.closeBtnText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  tabs: { flexDirection: "row", padding: 12 },
  tab: { flex: 1, paddingVertical: 10, alignItems: "center", borderRadius: 10, backgroundColor: Colors.card, marginHorizontal: 4 },
  tabActive: { backgroundColor: Colors.primary },
  tabText: { color: Colors.textSecondary, fontWeight: "600", fontSize: 11 },
  tabTextActive: { color: "#fff" },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", alignItems: "center", justifyContent: "center", padding: 24 },
  modalCard: { backgroundColor: Colors.card, borderRadius: 16, padding: 20, width: "100%", maxWidth: 360 },
  modalTitle: { fontSize: 36, fontWeight: "700", color: Colors.primary, textAlign: "center", marginBottom: 12 },
  exampleRow: { borderBottomWidth: 1, borderBottomColor: Colors.border, paddingVertical: 10 },
  exampleEnglish: { fontSize: 16, fontWeight: "700", color: Colors.textPrimary },
  exampleTranslation: { fontSize: 13, color: Colors.textSecondary, marginTop: 2 },
  closeBtn: { marginTop: 16, backgroundColor: Colors.primary, borderRadius: 10, paddingVertical: 12, alignItems: "center" },
  closeBtnText: { color: "#fff", fontWeight: "600" },
});

export default AlphabetsScreen;