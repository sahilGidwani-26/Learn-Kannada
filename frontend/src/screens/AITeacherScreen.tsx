import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { Audio } from "expo-av";
import * as Speech from "expo-speech";
import { Colors } from "../constants/colors";
import { askAITeacher, askAITeacherVoice } from "../services/aiService";

interface ChatMessage {
  id: string;
  role: "user" | "ai";
  text: string;
}

interface Token {
  word: string;
  start: number;
  end: number;
}

// Splits text into words while remembering each word's character offset, so we can
// match it against expo-speech's onBoundary charIndex for karaoke-style highlighting.
const tokenize = (text: string): Token[] => {
  const tokens: Token[] = [];
  const regex = /\S+/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    tokens.push({ word: match[0], start: match.index, end: match.index + match[0].length });
  }
  return tokens;
};

interface SpeakingState {
  key: string;
  tokens: Token[];
  activeIndex: number;
}

const AITeacherScreen: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "welcome", role: "ai", text: "Namaskara! I'm your AI Teacher. Ask me anything about Kannada letters, words, grammar, or pronunciation." },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [speaking, setSpeaking] = useState<SpeakingState | null>(null);

  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const permissionRequested = useRef(false);

  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, []);

  const handleSend = async () => {
    const question = input.trim();
    if (!question || sending) return;

    const userMsg: ChatMessage = { id: `${Date.now()}-u`, role: "user", text: question };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setSending(true);

    try {
      const { answer } = await askAITeacher(question);
      setMessages((prev) => [...prev, { id: `${Date.now()}-a`, role: "ai", text: answer }]);
    } catch (err: any) {
      setMessages((prev) => [...prev, { id: `${Date.now()}-e`, role: "ai", text: `Sorry, I couldn't answer that: ${err.message}` }]);
    } finally {
      setSending(false);
      setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
    }
  };

  // ---------- Voice question (mic) ----------
  const startRecording = async () => {
    try {
      if (!permissionRequested.current) {
        const { status } = await Audio.requestPermissionsAsync();
        permissionRequested.current = true;
        if (status !== "granted") {
          Alert.alert("Microphone needed", "Please allow microphone access to ask by voice.");
          return;
        }
      }
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
      const { recording: newRecording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      setRecording(newRecording);
      setIsRecording(true);
    } catch (err: any) {
      Alert.alert("Couldn't start recording", err.message);
    }
  };

  // Stopping the recording automatically sends the question - no extra tap needed.
  const stopRecordingAndSend = async () => {
    if (!recording) return;
    setIsRecording(false);
    setSending(true);

    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);
      if (!uri) throw new Error("No recording found");

      const { question, answer } = await askAITeacherVoice(uri);

      if (question) {
        setMessages((prev) => [...prev, { id: `${Date.now()}-u`, role: "user", text: question }]);
      }
      setMessages((prev) => [...prev, { id: `${Date.now()}-a`, role: "ai", text: answer }]);
    } catch (err: any) {
      Alert.alert("Couldn't process your question", err.message);
    } finally {
      setSending(false);
      setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
    }
  };

  // ---------- Read AI answers aloud, word-by-word highlighted ----------
  const toggleSpeak = (key: string, text: string) => {
    if (!text) return;

    if (speaking?.key === key) {
      Speech.stop();
      setSpeaking(null);
      return;
    }

    Speech.stop();
    const tokens = tokenize(text);
    setSpeaking({ key, tokens, activeIndex: -1 });

    Speech.speak(text, {
      language: "en-US",
      onBoundary: (event: any) => {
        const charIndex = event?.charIndex ?? 0;
        setSpeaking((prev) => {
          if (!prev || prev.key !== key) return prev;
          let idx = prev.tokens.findIndex((t) => charIndex >= t.start && charIndex < t.end);
          if (idx === -1) {
            idx = prev.tokens.reduce((acc, t, i) => (t.start <= charIndex ? i : acc), prev.activeIndex);
          }
          return { ...prev, activeIndex: idx };
        });
      },
      onDone: () => setSpeaking((prev) => (prev?.key === key ? null : prev)),
      onStopped: () => setSpeaking((prev) => (prev?.key === key ? null : prev)),
      onError: () => setSpeaking((prev) => (prev?.key === key ? null : prev)),
    });
  };

  const renderAiText = (key: string, text: string) => {
    if (speaking?.key === key) {
      return (
        <Text style={styles.aiText}>
          {speaking.tokens.map((t, i) => (
            <Text key={i} style={i === speaking.activeIndex ? styles.activeWord : undefined}>
              {t.word}{" "}
            </Text>
          ))}
        </Text>
      );
    }
    return <Text style={styles.aiText}>{text}</Text>;
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 90 }}
        onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
        renderItem={({ item }) =>
          item.role === "user" ? (
            <View style={[styles.bubble, styles.userBubble]}>
              <Text style={styles.userText}>{item.text}</Text>
            </View>
          ) : (
            <View style={[styles.bubble, styles.aiBubble]}>
              {renderAiText(item.id, item.text)}
              <TouchableOpacity style={styles.speakBtn} onPress={() => toggleSpeak(item.id, item.text)}>
                <Text style={styles.speakBtnText}>{speaking?.key === item.id ? "⏹ Stop" : "🔊 Listen"}</Text>
              </TouchableOpacity>
            </View>
          )
        }
      />
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Ask about a letter, word, or grammar..."
          placeholderTextColor={Colors.textSecondary}
          value={input}
          onChangeText={setInput}
          onSubmitEditing={handleSend}
          editable={!isRecording}
        />
        <TouchableOpacity
          style={[styles.micBtn, isRecording && styles.micBtnActive]}
          onPress={isRecording ? stopRecordingAndSend : startRecording}
          disabled={sending}
        >
          <Text style={styles.micIcon}>{isRecording ? "⏹" : "🎤"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sendBtn} onPress={handleSend} disabled={sending || isRecording}>
          <Text style={styles.sendText}>{sending ? "..." : "Send"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  bubble: { maxWidth: "85%", borderRadius: 14, padding: 12, marginBottom: 10 },
  userBubble: { alignSelf: "flex-end", backgroundColor: Colors.primary },
  aiBubble: { alignSelf: "flex-start", backgroundColor: Colors.card },
  userText: { color: "#fff" },
  aiText: { color: Colors.textPrimary, lineHeight: 22 },
  activeWord: { fontWeight: "800", color: Colors.primary, backgroundColor: "#FFE9DC" },
  speakBtn: { marginTop: 8, alignSelf: "flex-start" },
  speakBtnText: { color: Colors.primary, fontWeight: "600", fontSize: 12 },
  inputRow: { flexDirection: "row", padding: 12, borderTopWidth: 1, borderTopColor: Colors.border, backgroundColor: Colors.card, alignItems: "center" },
  input: { flex: 1, backgroundColor: Colors.background, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10, marginRight: 8, color: Colors.textPrimary },
  micBtn: { backgroundColor: Colors.secondary, borderRadius: 10, width: 44, height: 44, alignItems: "center", justifyContent: "center", marginRight: 8 },
  micBtnActive: { backgroundColor: Colors.danger },
  micIcon: { fontSize: 18 },
  sendBtn: { backgroundColor: Colors.primary, borderRadius: 10, paddingHorizontal: 18, justifyContent: "center" },
  sendText: { color: "#fff", fontWeight: "600" },
});

export default AITeacherScreen;