import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from "react-native";
import { Colors } from "../constants/colors";
import { askAITeacher } from "../services/aiService";

interface ChatMessage {
  id: string;
  role: "user" | "ai";
  text: string;
}

const AITeacherScreen: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "welcome", role: "ai", text: "Namaskara! I'm your AI Teacher. Ask me anything about Kannada letters, words, grammar, or pronunciation." },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const listRef = useRef<FlatList>(null);

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

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={[styles.bubble, item.role === "user" ? styles.userBubble : styles.aiBubble]}>
            <Text style={item.role === "user" ? styles.userText : styles.aiText}>{item.text}</Text>
          </View>
        )}
      />
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Ask about a letter, word, or grammar..."
          value={input}
          onChangeText={setInput}
          onSubmitEditing={handleSend}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={handleSend} disabled={sending}>
          <Text style={styles.sendText}>{sending ? "..." : "Send"}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  bubble: { maxWidth: "85%", borderRadius: 14, padding: 12, marginBottom: 10 },
  userBubble: { alignSelf: "flex-end", backgroundColor: Colors.primary },
  aiBubble: { alignSelf: "flex-start", backgroundColor: Colors.card },
  userText: { color: "#fff" },
  aiText: { color: Colors.textPrimary },
  inputRow: { flexDirection: "row", padding: 12, borderTopWidth: 1, borderTopColor: Colors.border, backgroundColor: Colors.card },
  input: { flex: 1, backgroundColor: Colors.background, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10, marginRight: 8 },
  sendBtn: { backgroundColor: Colors.primary, borderRadius: 10, paddingHorizontal: 18, justifyContent: "center" },
  sendText: { color: "#fff", fontWeight: "600" },
});

export default AITeacherScreen;
