import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Colors } from "../constants/colors";
import { wordCategories } from "../constants/data";
import { fetchWordsByCategory } from "../services/learningService";
import { Word } from "../types";
import LoadingSpinner from "../components/LoadingSpinner";

const WordsScreen: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(false);

  const openCategory = async (category: string) => {
    setActiveCategory(category);
    setLoading(true);
    try {
      const key = category.toLowerCase().replace(/\s+/g, "");
      const data = await fetchWordsByCategory(key === "bodyparts" ? "bodyParts" : key);
      setWords(data);
    } catch {
      setWords([]);
    } finally {
      setLoading(false);
    }
  };

  if (activeCategory) {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setActiveCategory(null)} style={styles.backBtn}>
          <Text style={styles.backText}>‹ Back to categories</Text>
        </TouchableOpacity>
        {loading ? (
          <LoadingSpinner label="Loading words..." />
        ) : words.length === 0 ? (
          <Text style={styles.empty}>No words yet in "{activeCategory}". More coming soon!</Text>
        ) : (
          <FlatList
            data={words}
            keyExtractor={(item) => item._id}
            contentContainerStyle={{ padding: 16 }}
            renderItem={({ item }) => (
              <View style={styles.wordCard}>
                <Text style={styles.kannadaWord}>{item.kannada}</Text>
                <Text style={styles.meaning}>{item.english} · {item.hindi}</Text>
                {item.exampleSentence?.english ? (
                  <Text style={styles.example}>"{item.exampleSentence.kannada}" — {item.exampleSentence.english}</Text>
                ) : null}
              </View>
            )}
          />
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={wordCategories}
        keyExtractor={(item) => item}
        numColumns={2}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.categoryTile} onPress={() => openCategory(item)}>
            <Text style={styles.categoryText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  categoryTile: {
    flex: 1, margin: 6, backgroundColor: Colors.card, borderRadius: 14, paddingVertical: 22, alignItems: "center", elevation: 1,
  },
  categoryText: { fontWeight: "600", color: Colors.textPrimary },
  backBtn: { padding: 16 },
  backText: { color: Colors.primary, fontWeight: "600" },
  empty: { textAlign: "center", color: Colors.textSecondary, marginTop: 40 },
  wordCard: { backgroundColor: Colors.card, borderRadius: 12, padding: 16, marginBottom: 10, elevation: 1 },
  kannadaWord: { fontSize: 22, fontWeight: "700", color: Colors.textPrimary },
  meaning: { fontSize: 14, color: Colors.textSecondary, marginTop: 4 },
  example: { fontSize: 12, color: Colors.textSecondary, marginTop: 8, fontStyle: "italic" },
});

export default WordsScreen;
