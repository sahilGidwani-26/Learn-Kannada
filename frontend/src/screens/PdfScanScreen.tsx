import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as Speech from "expo-speech";
import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import { Colors } from "../constants/colors";
import { scanPdf, generateTranslatedPdf, PdfScanResponse } from "../services/pdfService";
import LoadingSpinner from "../components/LoadingSpinner";

const MAX_PAGES = 15;

interface Token {
  word: string;
  start: number;
  end: number;
}

// Splits text into words while remembering each word's character offset in the
// original string, so we can match it against expo-speech's onBoundary charIndex.
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

const PdfScanScreen: React.FC = () => {
  const [processing, setProcessing] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [result, setResult] = useState<PdfScanResponse | null>(null);
  const [expandedPage, setExpandedPage] = useState<number | null>(null);
  const [speaking, setSpeaking] = useState<SpeakingState | null>(null);

  // Stop any speech in progress if the user leaves this screen.
  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, []);

  const pickAndScan = async () => {
    try {
      const picked = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
      });

      if (picked.canceled || !picked.assets?.[0]) return;

      const file = picked.assets[0];
      setResult(null);
      setProcessing(true);

      const data = await scanPdf(file.uri, file.name || "document.pdf");
      setResult(data);
      setExpandedPage(data.results[0]?.page ?? null);
    } catch (err: any) {
      const message = err?.message?.includes(`${MAX_PAGES} pages`)
        ? err.message
        : err?.message || "Could not process this PDF";
      Alert.alert("PDF scan failed", message);
    } finally {
      setProcessing(false);
    }
  };

  // Tap once to start reading aloud with word-by-word highlighting; tap the same
  // button again (while it's speaking) to stop.
  const toggleSpeak = (key: string, text: string, language: "hi-IN" | "en-US" | "kn-IN") => {
    if (!text) return;

    if (speaking?.key === key) {
      Speech.stop();
      setSpeaking(null);
      return;
    }

    Speech.stop(); // stop whatever else might be playing first
    const tokens = tokenize(text);
    setSpeaking({ key, tokens, activeIndex: -1 });

    Speech.speak(text, {
      language,
      onBoundary: (event: any) => {
        const charIndex = event?.charIndex ?? 0;
        setSpeaking((prev) => {
          if (!prev || prev.key !== key) return prev;
          let idx = prev.tokens.findIndex((t) => charIndex >= t.start && charIndex < t.end);
          if (idx === -1) {
            // Some platforms report boundaries slightly off - fall back to the
            // last word whose start is at or before this position.
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

  const handleDownload = async () => {
    if (!result) return;
    setDownloading(true);
    try {
      const { pdfBase64, fileName } = await generateTranslatedPdf(result.fileName, result.results);
      const fileUri = FileSystem.documentDirectory + fileName;
      await FileSystem.writeAsStringAsync(fileUri, pdfBase64, { encoding: FileSystem.EncodingType.Base64 });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri, { mimeType: "application/pdf", dialogTitle: fileName });
      } else {
        Alert.alert("Saved", `PDF saved to:\n${fileUri}`);
      }
    } catch (err: any) {
      Alert.alert("Download failed", err.message || "Could not generate the PDF");
    } finally {
      setDownloading(false);
    }
  };

  // Renders text as individual words so the currently-spoken one can be bolded/highlighted.
  const renderReadableText = (key: string, text: string) => {
    if (speaking?.key === key) {
      return (
        <Text style={styles.sectionText}>
          {speaking.tokens.map((t, i) => (
            <Text key={i} style={i === speaking.activeIndex ? styles.activeWord : undefined}>
              {t.word}{" "}
            </Text>
          ))}
        </Text>
      );
    }
    return <Text style={styles.sectionText}>{text || "-"}</Text>;
  };

  const SpeakerButton: React.FC<{ speakKey: string; text: string; language: "hi-IN" | "en-US" | "kn-IN" }> = ({
    speakKey,
    text,
    language,
  }) => {
    const isActive = speaking?.key === speakKey;
    return (
      <TouchableOpacity onPress={() => toggleSpeak(speakKey, text, language)}>
        <Text style={styles.speakerIcon}>{isActive ? "⏹" : "🔊"}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>PDF Scan</Text>
        <Text style={styles.subtitle}>
          Upload a PDF (up to {MAX_PAGES} pages) - typed documents or scanned/photographed book pages both work.
          Every page is translated fully into Hindi and English.
        </Text>

        <TouchableOpacity style={styles.pickBtn} onPress={pickAndScan} disabled={processing}>
          <Text style={styles.pickBtnText}>📄 {result ? "Upload another PDF" : "Choose a PDF"}</Text>
        </TouchableOpacity>

        {processing && (
          <View style={{ marginTop: 30 }}>
            <LoadingSpinner label="Reading pages and translating... scanned/photo pages take longer (several minutes for a full PDF)." />
          </View>
        )}

        {result && !processing && (
          <View style={styles.resultsWrapper}>
            <Text style={styles.fileInfo}>
              {result.fileName} · {result.numPages} page{result.numPages !== 1 ? "s" : ""}
            </Text>

            <TouchableOpacity style={styles.downloadBtn} onPress={handleDownload} disabled={downloading}>
              <Text style={styles.downloadBtnText}>{downloading ? "Preparing PDF..." : "⬇️ Download as PDF"}</Text>
            </TouchableOpacity>

            {result.results.map((page) => {
              const isOpen = expandedPage === page.page;
              return (
                <View key={page.page} style={styles.pageCard}>
                  <TouchableOpacity
                    style={styles.pageHeader}
                    onPress={() => setExpandedPage(isOpen ? null : page.page)}
                  >
                    <Text style={styles.pageTitle}>Page {page.page}</Text>
                    <Text style={styles.pageToggle}>{isOpen ? "▲" : "▼"}</Text>
                  </TouchableOpacity>

                  {isOpen && (
                    <View style={styles.pageBody}>
                      {page.message ? (
                        <Text style={styles.pageMessage}>{page.message}</Text>
                      ) : (
                        <>
                          <View style={styles.langRow}>
                            <Text style={styles.sectionLabel}>Original (Kannada)</Text>
                            <SpeakerButton speakKey={`${page.page}-kn`} text={page.originalText} language="kn-IN" />
                          </View>
                          {renderReadableText(`${page.page}-kn`, page.originalText)}

                          <View style={styles.divider} />

                          <View style={styles.langRow}>
                            <Text style={styles.sectionLabel}>English (Full Translation)</Text>
                            <SpeakerButton speakKey={`${page.page}-en`} text={page.english} language="en-US" />
                          </View>
                          {renderReadableText(`${page.page}-en`, page.english)}

                          <View style={styles.divider} />

                          <View style={styles.langRow}>
                            <Text style={styles.sectionLabel}>Hindi (Full Translation)</Text>
                            <SpeakerButton speakKey={`${page.page}-hi`} text={page.hindi} language="hi-IN" />
                          </View>
                          {renderReadableText(`${page.page}-hi`, page.hindi)}
                        </>
                      )}
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 22, fontWeight: "700", color: Colors.textPrimary, textAlign: "center" },
  subtitle: { fontSize: 13, color: Colors.textSecondary, textAlign: "center", marginTop: 8, marginBottom: 20, lineHeight: 18 },
  pickBtn: { backgroundColor: Colors.primary, borderRadius: 12, paddingVertical: 16, alignItems: "center" },
  pickBtnText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  resultsWrapper: { marginTop: 24 },
  fileInfo: { fontSize: 13, color: Colors.textSecondary, marginBottom: 12, textAlign: "center" },
  downloadBtn: {
    backgroundColor: Colors.secondary, borderRadius: 12, paddingVertical: 14,
    alignItems: "center", marginBottom: 16,
  },
  downloadBtnText: { color: "#fff", fontWeight: "700" },
  pageCard: { backgroundColor: Colors.card, borderRadius: 12, marginBottom: 10, elevation: 1, overflow: "hidden" },
  pageHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 16 },
  pageTitle: { fontSize: 15, fontWeight: "700", color: Colors.textPrimary },
  pageToggle: { color: Colors.textSecondary },
  pageBody: { paddingHorizontal: 16, paddingBottom: 16 },
  pageMessage: { color: Colors.textSecondary, fontStyle: "italic" },
  sectionLabel: { fontSize: 11, fontWeight: "700", color: Colors.textSecondary, textTransform: "uppercase", marginTop: 8 },
  sectionText: { fontSize: 14, color: Colors.textPrimary, marginTop: 4, lineHeight: 22 },
  activeWord: { fontWeight: "800", color: Colors.primary, backgroundColor: "#FFE9DC" },
  divider: { height: 1, backgroundColor: Colors.border, marginVertical: 10 },
  langRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10 },
  speakerIcon: { fontSize: 18 },
});

export default PdfScanScreen;