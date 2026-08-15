import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Audio } from "expo-av";
import { Colors } from "../constants/colors";
import { useAuth } from "../context/AuthContext";
import { fetchLevelQuestions, submitLevelResult, checkVoiceAnswer } from "../services/quizLevelService";
import { QuizQuestion } from "../types";
import LoadingSpinner from "../components/LoadingSpinner";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "Quiz">;

const TYPE_LABELS: Record<string, string> = {
  vowel: "Vowels",
  consonant: "Consonants",
  number: "Numbers",
  wordToEnglish: "Words → English",
  englishToWord: "English → Kannada Words",
  wordToHindi: "Words → Hindi",
  sentence: "Sentences",
  voice: "Voice Challenge 🎤",
};

type Screen = "intro" | "loading" | "playing" | "grading" | "result";

const QuizScreen: React.FC<Props> = ({ route, navigation }) => {
  const { user, updateUser } = useAuth();
  const startingLevel = route.params?.level ?? user?.quizLevel ?? 1;

  const [level, setLevel] = useState(startingLevel);
  const [screen, setScreen] = useState<Screen>("loading");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [voiceResult, setVoiceResult] = useState<{ transcribed: string; isCorrect: boolean } | null>(null);

  const [levelResult, setLevelResult] = useState<{ passed: boolean; leveledUp: boolean; accuracyPct: number; quizLevel: number } | null>(null);
  const permissionRequested = useRef(false);

  const current = questions[index];

  useEffect(() => {
    loadLevel(level);
  }, [level]);

  const loadLevel = async (lvl: number) => {
    setScreen("loading");
    try {
      const data = await fetchLevelQuestions(lvl);
      setQuestions(data.questions);
      setIndex(0);
      setCorrectCount(0);
      setSelectedOption(null);
      setFeedback(null);
      setVoiceResult(null);
      setScreen("intro");
    } catch (err: any) {
      Alert.alert("Couldn't load level", err.message);
      navigation.goBack();
    }
  };

  const startPlaying = () => setScreen("playing");

  const goToNextQuestion = (wasCorrect: boolean) => {
    const newCorrectCount = wasCorrect ? correctCount + 1 : correctCount;
    setCorrectCount(newCorrectCount);

    if (index + 1 < questions.length) {
      setTimeout(() => {
        setIndex((i) => i + 1);
        setSelectedOption(null);
        setFeedback(null);
        setVoiceResult(null);
      }, 900);
    } else {
      setTimeout(() => finishLevel(newCorrectCount), 900);
    }
  };

  const handleMcqAnswer = (option: string) => {
    if (selectedOption) return; // prevent double-tap
    setSelectedOption(option);
    const isCorrect = option === current.correctAnswer;
    setFeedback(isCorrect ? "correct" : "wrong");
    goToNextQuestion(isCorrect);
  };

  const finishLevel = async (finalCorrect: number) => {
    setScreen("grading");
    try {
      const response = await submitLevelResult(level, finalCorrect, questions.length);
      setLevelResult(response.data);

      // This is the critical part that was missing: without pushing the new quizLevel
      // (and updated xp/coins) back into AuthContext, the app kept showing the OLD level
      // every time you navigated back to the Quiz screen, even though the backend had
      // already advanced it.
      await updateUser({
        quizLevel: response.data.quizLevel,
        xp: response.rewards.totalXp,
        coins: response.rewards.totalCoins,
        level: response.rewards.level,
      });

      setScreen("result");
    } catch (err: any) {
      Alert.alert("Couldn't submit results", err.message);
      setScreen("result");
    }
  };

  // ---------- Voice question handling ----------
  const startRecording = async () => {
    try {
      if (!permissionRequested.current) {
        const { status } = await Audio.requestPermissionsAsync();
        permissionRequested.current = true;
        if (status !== "granted") {
          Alert.alert("Microphone needed", "Please allow microphone access to answer with your voice.");
          return;
        }
      }
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
      const { recording: newRecording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      setRecording(newRecording);
      setIsRecording(true);
      setVoiceResult(null);
    } catch (err: any) {
      Alert.alert("Couldn't start recording", err.message);
    }
  };

  const stopRecordingAndCheck = async () => {
    if (!recording) return;
    setIsRecording(false);

    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);
      if (!uri) throw new Error("No recording found");

      const result = await checkVoiceAnswer(uri, current.correctAnswer);
      setVoiceResult(result);
      setFeedback(result.isCorrect ? "correct" : "wrong");
      goToNextQuestion(result.isCorrect);
    } catch (err: any) {
      Alert.alert("Couldn't check your answer", err.message);
    }
  };

  // ---------- Screens ----------
  if (screen === "loading") {
    return <LoadingSpinner label="Loading level..." />;
  }

  if (screen === "intro") {
    return (
      <View style={styles.center}>
        <Text style={styles.levelBadge}>Level {level} / 100</Text>
        <Text style={styles.introTitle}>{TYPE_LABELS[questions[0]?.type] || "Quiz"}</Text>
        <Text style={styles.introDesc}>
          {questions[0]?.mode === "voice"
            ? "10 questions - tap the mic and say each answer out loud in Kannada."
            : "10 questions - get 70% or more correct to unlock the next level."}
        </Text>
        <TouchableOpacity style={styles.startBtn} onPress={startPlaying}>
          <Text style={styles.startBtnText}>Start Level {level}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (screen === "grading") {
    return <LoadingSpinner label="Checking your results..." />;
  }

  if (screen === "result" && levelResult) {
    return (
      <View style={styles.center}>
        <Text style={styles.resultEmoji}>{levelResult.passed ? "🎉" : "💪"}</Text>
        <Text style={styles.resultText}>
          You scored {correctCount} / {questions.length}
        </Text>
        <Text style={styles.resultSub}>
          {levelResult.leveledUp
            ? `Level ${level} complete! Level ${levelResult.quizLevel} unlocked.`
            : levelResult.passed
            ? "Level complete!"
            : "You need 70% correct to unlock the next level. Give it another try!"}
        </Text>

        <View style={styles.resultButtons}>
          <TouchableOpacity style={styles.secondaryBtn} onPress={() => loadLevel(level)}>
            <Text style={styles.secondaryBtnText}>Retry Level {level}</Text>
          </TouchableOpacity>
          {levelResult.leveledUp && (
            <TouchableOpacity style={styles.startBtn} onPress={() => setLevel(levelResult.quizLevel)}>
              <Text style={styles.startBtnText}>Next: Level {levelResult.quizLevel}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }

  if (!current) return <LoadingSpinner />;

  return (
    <View style={styles.container}>
      <Text style={styles.progress}>
        Level {level} · Question {index + 1} / {questions.length}
      </Text>

      <View style={styles.promptCard}>
        <Text style={styles.promptText}>{current.prompt}</Text>
      </View>
      <Text style={styles.question}>{current.promptLabel}</Text>

      {current.mode === "mcq" ? (
        current.options?.map((option) => {
          const isSelected = selectedOption === option;
          const isCorrectOption = option === current.correctAnswer;
          const showState = selectedOption !== null;
          return (
            <TouchableOpacity
              key={option}
              style={[
                styles.option,
                showState && isCorrectOption && styles.optionCorrect,
                showState && isSelected && !isCorrectOption && styles.optionWrong,
              ]}
              onPress={() => handleMcqAnswer(option)}
              disabled={selectedOption !== null}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          );
        })
      ) : (
        <View style={styles.voiceArea}>
          <TouchableOpacity
            style={[styles.micBtn, isRecording && styles.micBtnActive]}
            onPress={isRecording ? stopRecordingAndCheck : startRecording}
            disabled={feedback !== null}
          >
            <Text style={styles.micIcon}>{isRecording ? "⏹" : "🎤"}</Text>
          </TouchableOpacity>
          <Text style={styles.micLabel}>{isRecording ? "Tap to stop" : "Tap to speak"}</Text>

          {voiceResult && (
            <Text style={styles.voiceHeard}>
              Heard: "{voiceResult.transcribed}" {voiceResult.isCorrect ? "✅" : "❌"}
            </Text>
          )}
          {feedback === "wrong" && current.correctAnswerPronunciation && (
            <Text style={styles.correctHint}>
              Correct: {current.correctAnswer} ({current.correctAnswerPronunciation})
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: 24 },
  center: { flex: 1, backgroundColor: Colors.background, alignItems: "center", justifyContent: "center", padding: 24 },
  levelBadge: { color: Colors.primary, fontWeight: "700", fontSize: 14, marginBottom: 8 },
  introTitle: { fontSize: 24, fontWeight: "700", color: Colors.textPrimary, textAlign: "center" },
  introDesc: { color: Colors.textSecondary, textAlign: "center", marginTop: 12, marginBottom: 30, lineHeight: 20 },
  startBtn: { backgroundColor: Colors.primary, borderRadius: 12, paddingVertical: 14, paddingHorizontal: 28 },
  startBtnText: { color: "#fff", fontWeight: "700" },
  progress: { color: Colors.textSecondary, fontWeight: "600", marginBottom: 20, textAlign: "center" },
  promptCard: { backgroundColor: Colors.card, borderRadius: 16, paddingVertical: 30, alignItems: "center", marginBottom: 8, elevation: 1 },
  promptText: { fontSize: 30, fontWeight: "700", color: Colors.textPrimary, textAlign: "center", paddingHorizontal: 16 },
  question: { textAlign: "center", color: Colors.textSecondary, marginBottom: 24, marginTop: 10 },
  option: { backgroundColor: Colors.card, borderRadius: 12, padding: 16, marginBottom: 10, elevation: 1 },
  optionCorrect: { backgroundColor: "#D9F7E4", borderWidth: 1, borderColor: Colors.success },
  optionWrong: { backgroundColor: "#FBE0DE", borderWidth: 1, borderColor: Colors.danger },
  optionText: { textAlign: "center", fontWeight: "600", color: Colors.textPrimary },
  resultEmoji: { fontSize: 48, marginBottom: 12 },
  resultText: { fontSize: 22, fontWeight: "700", color: Colors.textPrimary },
  resultSub: { color: Colors.textSecondary, marginTop: 8, textAlign: "center", lineHeight: 20 },
  resultButtons: { marginTop: 30, width: "100%" },
  secondaryBtn: { borderWidth: 1, borderColor: Colors.primary, borderRadius: 12, paddingVertical: 14, alignItems: "center", marginBottom: 12 },
  secondaryBtnText: { color: Colors.primary, fontWeight: "700" },
  voiceArea: { alignItems: "center", marginTop: 20 },
  micBtn: { width: 84, height: 84, borderRadius: 42, backgroundColor: Colors.primary, alignItems: "center", justifyContent: "center", elevation: 3 },
  micBtnActive: { backgroundColor: Colors.danger },
  micIcon: { fontSize: 36 },
  micLabel: { marginTop: 10, color: Colors.textSecondary, fontSize: 13 },
  voiceHeard: { marginTop: 20, color: Colors.textPrimary, fontSize: 15, textAlign: "center" },
  correctHint: { marginTop: 8, color: Colors.textSecondary, fontSize: 13, fontStyle: "italic" },
});

export default QuizScreen;