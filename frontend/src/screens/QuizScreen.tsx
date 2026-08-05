import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Colors } from "../constants/colors";
import api from "../services/api";
import { sampleAlphabets } from "../constants/data";

// Simple starter quiz: multiple choice on letter -> transliteration, built from local sample data.
// Swap `sampleAlphabets` for a live fetch (fetchAlphabets) once you want randomized backend-driven quizzes.
const buildQuestions = () =>
  sampleAlphabets.map((letter) => {
    const options = new Set<string>([letter.english]);
    while (options.size < 4) {
      const random = sampleAlphabets[Math.floor(Math.random() * sampleAlphabets.length)];
      options.add(random.english);
    }
    return { kannada: letter.kannada, answer: letter.english, options: shuffle([...options]) };
  });

const shuffle = <T,>(arr: T[]): T[] => arr.sort(() => Math.random() - 0.5);

const QuizScreen: React.FC = () => {
  const questions = useMemo(buildQuestions, []);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = questions[index];

  const handleAnswer = (option: string) => {
    const isCorrect = option === current.answer;
    if (isCorrect) setCorrect((c) => c + 1);

    if (index + 1 < questions.length) {
      setIndex((i) => i + 1);
    } else {
      finishQuiz(isCorrect ? correct + 1 : correct);
    }
  };

  const finishQuiz = async (finalCorrect: number) => {
    setFinished(true);
    try {
      await api.post("/quiz/submit", {
        quizType: "letter",
        totalQuestions: questions.length,
        correctAnswers: finalCorrect,
      });
    } catch {
      // Non-blocking: quiz still shows results locally even if backend sync fails
    }
  };

  if (finished) {
    return (
      <View style={styles.center}>
        <Text style={styles.resultEmoji}>🎉</Text>
        <Text style={styles.resultText}>You scored {correct} / {questions.length}</Text>
        <Text style={styles.resultSub}>XP and coins have been added to your profile!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.progress}>Question {index + 1} / {questions.length}</Text>
      <Text style={styles.kannadaLetter}>{current.kannada}</Text>
      <Text style={styles.question}>What is the transliteration of this letter?</Text>

      {current.options.map((option) => (
        <TouchableOpacity key={option} style={styles.option} onPress={() => handleAnswer(option)}>
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: 24 },
  center: { flex: 1, backgroundColor: Colors.background, alignItems: "center", justifyContent: "center", padding: 24 },
  progress: { color: Colors.textSecondary, fontWeight: "600", marginBottom: 20 },
  kannadaLetter: { fontSize: 64, fontWeight: "700", color: Colors.textPrimary, textAlign: "center", marginBottom: 8 },
  question: { textAlign: "center", color: Colors.textSecondary, marginBottom: 24 },
  option: { backgroundColor: Colors.card, borderRadius: 12, padding: 16, marginBottom: 10, elevation: 1 },
  optionText: { textAlign: "center", fontWeight: "600", color: Colors.textPrimary },
  resultEmoji: { fontSize: 48, marginBottom: 12 },
  resultText: { fontSize: 22, fontWeight: "700", color: Colors.textPrimary },
  resultSub: { color: Colors.textSecondary, marginTop: 6 },
});

export default QuizScreen;
