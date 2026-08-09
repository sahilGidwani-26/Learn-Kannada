import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from "react-native";
import { Audio } from "expo-av";
import * as Speech from "expo-speech";
import { Colors } from "../constants/colors";
import { voiceTranslate, VoiceTranslateResult } from "../services/aiService";
import LoadingSpinner from "../components/LoadingSpinner";

// Voice Translator - works in both directions:
// - Speak Hindi or English -> translated to Kannada and spoken aloud automatically.
// - Speak Kannada -> translated to BOTH Hindi and English; the user picks which one
//   they want to see/hear via two buttons.
const VoiceTranslatorScreen: React.FC = () => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<VoiceTranslateResult | null>(null);
  const [chosenTarget, setChosenTarget] = useState<"hindi" | "english" | null>(null);
  const permissionRequested = useRef(false);

  const startRecording = async () => {
    try {
      if (!permissionRequested.current) {
        const { status } = await Audio.requestPermissionsAsync();
        permissionRequested.current = true;
        if (status !== "granted") {
          Alert.alert("Microphone needed", "Please allow microphone access to use the Voice Translator.");
          return;
        }
      }

      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });

      const { recording: newRecording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(newRecording);
      setIsRecording(true);
      setResult(null);
      setChosenTarget(null);
    } catch (err: any) {
      Alert.alert("Couldn't start recording", err.message);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;
    setIsRecording(false);
    setProcessing(true);

    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);
      if (!uri) throw new Error("No recording found");

      const data = await voiceTranslate(uri);
      setResult(data);

      // If the user spoke Hindi/English, we already know the target (Kannada) - speak it
      // immediately. If they spoke Kannada, wait for them to choose Hindi or English.
      if (data.direction === "toKannada" && data.kannada) {
        Speech.speak(data.kannada, { language: "kn-IN" });
      }
    } catch (err: any) {
      Alert.alert("Translation failed", err.message || "Something went wrong");
    } finally {
      setProcessing(false);
    }
  };

  const chooseTarget = (target: "hindi" | "english") => {
    setChosenTarget(target);
    const text = target === "hindi" ? result?.hindi : result?.english;
    if (text) Speech.speak(text, { language: target === "hindi" ? "hi-IN" : "en-US" });
  };

  const replay = () => {
    if (result?.direction === "toKannada" && result.kannada) {
      Speech.speak(result.kannada, { language: "kn-IN" });
    } else if (result?.direction === "fromKannada" && chosenTarget) {
      const text = chosenTarget === "hindi" ? result.hindi : result.english;
      if (text) Speech.speak(text, { language: chosenTarget === "hindi" ? "hi-IN" : "en-US" });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Voice Translator</Text>
        <Text style={styles.subtitle}>
          Speak in Hindi or English → hear it in Kannada.{"\n"}Speak in Kannada → choose Hindi or English.
        </Text>

        {processing ? (
          <LoadingSpinner label="Listening and translating..." />
        ) : result ? (
          <View style={styles.resultCard}>
            {result.direction === "toKannada" ? (
              <>
                <Text style={styles.resultLabel}>You said</Text>
                <Text style={styles.resultInput}>{result.detectedInput || "-"}</Text>

                <View style={styles.divider} />

                <Text style={styles.resultLabel}>Kannada</Text>
                <Text style={styles.resultKannada}>{result.kannada || "-"}</Text>
                {result.kannadaPronunciation ? (
                  <Text style={styles.resultPronunciation}>({result.kannadaPronunciation})</Text>
                ) : null}

                {result.kannada ? (
                  <TouchableOpacity style={styles.replayBtn} onPress={replay}>
                    <Text style={styles.replayText}>🔊 Play again</Text>
                  </TouchableOpacity>
                ) : null}
              </>
            ) : (
              <>
                <Text style={styles.resultLabel}>You said (Kannada)</Text>
                <Text style={styles.resultInput}>{result.kannadaInput || "-"}</Text>

                <View style={styles.divider} />

                <Text style={styles.resultLabel}>Translate to</Text>
                <View style={styles.choiceRow}>
                  <TouchableOpacity
                    style={[styles.choiceBtn, chosenTarget === "hindi" && styles.choiceBtnActive]}
                    onPress={() => chooseTarget("hindi")}
                  >
                    <Text style={[styles.choiceBtnText, chosenTarget === "hindi" && styles.choiceBtnTextActive]}>हिंदी Hindi</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.choiceBtn, chosenTarget === "english" && styles.choiceBtnActive]}
                    onPress={() => chooseTarget("english")}
                  >
                    <Text style={[styles.choiceBtnText, chosenTarget === "english" && styles.choiceBtnTextActive]}>English</Text>
                  </TouchableOpacity>
                </View>

                {chosenTarget ? (
                  <>
                    <Text style={styles.resultKannada}>
                      {chosenTarget === "hindi" ? result.hindi : result.english}
                    </Text>
                    <TouchableOpacity style={styles.replayBtn} onPress={replay}>
                      <Text style={styles.replayText}>🔊 Play again</Text>
                    </TouchableOpacity>
                  </>
                ) : null}
              </>
            )}

            {result.message ? <Text style={styles.resultMessage}>{result.message}</Text> : null}
          </View>
        ) : (
          <Text style={styles.hint}>Your translation will appear here.</Text>
        )}
      </ScrollView>

      <View style={styles.micWrapper}>
        <TouchableOpacity
          style={[styles.micBtn, isRecording && styles.micBtnActive]}
          onPress={isRecording ? stopRecording : startRecording}
          disabled={processing}
        >
          <Text style={styles.micIcon}>{isRecording ? "⏹" : "🎤"}</Text>
        </TouchableOpacity>
        <Text style={styles.micLabel}>{isRecording ? "Tap to stop" : "Tap to speak"}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 22, fontWeight: "700", color: Colors.textPrimary, textAlign: "center" },
  subtitle: { fontSize: 13, color: Colors.textSecondary, textAlign: "center", marginTop: 8, marginBottom: 24, lineHeight: 18 },
  hint: { textAlign: "center", color: Colors.textSecondary, marginTop: 40 },
  resultCard: { backgroundColor: Colors.card, borderRadius: 16, padding: 20, elevation: 1 },
  resultLabel: { fontSize: 11, fontWeight: "700", color: Colors.textSecondary, textTransform: "uppercase" },
  resultInput: { fontSize: 16, color: Colors.textPrimary, marginTop: 4 },
  divider: { height: 1, backgroundColor: Colors.border, marginVertical: 14 },
  resultKannada: { fontSize: 24, fontWeight: "700", color: Colors.primary, marginTop: 12 },
  resultPronunciation: { fontSize: 14, color: Colors.textSecondary, fontStyle: "italic", marginTop: 4 },
  resultMessage: { fontSize: 13, color: Colors.textSecondary, marginTop: 10 },
  replayBtn: { marginTop: 16, backgroundColor: Colors.background, borderRadius: 10, paddingVertical: 10, alignItems: "center" },
  replayText: { color: Colors.primary, fontWeight: "600" },
  choiceRow: { flexDirection: "row", marginTop: 8 },
  choiceBtn: {
    flex: 1, paddingVertical: 12, borderRadius: 10, backgroundColor: Colors.background,
    alignItems: "center", marginHorizontal: 4, borderWidth: 1, borderColor: Colors.border,
  },
  choiceBtnActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  choiceBtnText: { fontWeight: "600", color: Colors.textPrimary },
  choiceBtnTextActive: { color: "#fff" },
  micWrapper: { alignItems: "center", paddingBottom: 30, paddingTop: 10 },
  micBtn: {
    width: 84, height: 84, borderRadius: 42, backgroundColor: Colors.primary,
    alignItems: "center", justifyContent: "center", elevation: 3,
  },
  micBtnActive: { backgroundColor: Colors.danger },
  micIcon: { fontSize: 36 },
  micLabel: { marginTop: 10, color: Colors.textSecondary, fontSize: 13 },
});

export default VoiceTranslatorScreen;