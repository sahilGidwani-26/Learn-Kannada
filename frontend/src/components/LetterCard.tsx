import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Colors } from "../constants/colors";

interface Props {
  kannada: string;
  transliteration: string;
  onPress?: () => void;
}

const LetterCard: React.FC<Props> = ({ kannada, transliteration, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
    <Text style={styles.kannada}>{kannada}</Text>
    <View style={styles.divider} />
    <Text style={styles.translit}>{transliteration}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    width: 92,
    height: 100,
    backgroundColor: Colors.card,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    margin: 6,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  kannada: { fontSize: 32, fontWeight: "700", color: Colors.textPrimary },
  divider: { width: 24, height: 1, backgroundColor: Colors.border, marginVertical: 6 },
  translit: { fontSize: 13, color: Colors.textSecondary },
});

export default LetterCard;
