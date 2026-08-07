import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import * as Speech from "expo-speech";
import { Colors } from "../constants/colors";
import LetterCard from "../components/LetterCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { fetchNumbers } from "../services/learningService";
import { sampleNumbers } from "../constants/data";
import { NumberItem } from "../types";

const NumbersScreen: React.FC = () => {
  const [numbers, setNumbers] = useState<NumberItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNumbers(0, 20)
      .then(setNumbers)
      .catch(() => setNumbers(sampleNumbers as unknown as NumberItem[]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner label="Loading numbers..." />;

  return (
    <View style={styles.container}>
      <FlatList
        data={numbers}
        keyExtractor={(item: any) => item._id || item.id}
        numColumns={3}
        contentContainerStyle={{ padding: 10 }}
        renderItem={({ item }) => (
          <View style={{ alignItems: "center", margin: 6 }}>
            <LetterCard
              kannada={item.kannada}
              transliteration={item.englishTransliteration}
              onPress={() => Speech.speak(item.kannada, { language: "kn-IN" })}
            />
            <Text style={styles.value}>{item.value}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  value: { marginTop: 2, fontSize: 12, color: Colors.textSecondary, fontWeight: "600" },
});

export default NumbersScreen;