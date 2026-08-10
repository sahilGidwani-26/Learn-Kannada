import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as Speech from "expo-speech";
import { Colors } from "../constants/colors";
import { scanPdf, PdfScanResponse } from "../services/pdfService";
import LoadingSpinner from "../components/LoadingSpinner";

const MAX_PAGES = 15;

const PdfScanScreen: React.FC = () => {
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<PdfScanResponse | null>(null);
  const [expandedPage, setExpandedPage] = useState<number | null>(null);

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

  const speak = (text: string, language: "hi-IN" | "en-US" | "kn-IN") => {
    if (text) Speech.speak(text, { language });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>PDF Scan</Text>
        <Text style={styles.subtitle}>
          Upload a PDF (up to {MAX_PAGES} pages) - typed documents or scanned/photographed book pages both work.
          Each page gets summarized and translated into Hindi and English.
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
                          <Text style={styles.sectionLabel}>Summary</Text>
                          <Text style={styles.sectionText}>{page.summary || "-"}</Text>

                          <View style={styles.divider} />

                          <View style={styles.langRow}>
                            <Text style={styles.sectionLabel}>English</Text>
                            <TouchableOpacity onPress={() => speak(page.english, "en-US")}>
                              <Text style={styles.speakerIcon}>🔊</Text>
                            </TouchableOpacity>
                          </View>
                          <Text style={styles.sectionText}>{page.english || "-"}</Text>

                          <View style={styles.langRow}>
                            <Text style={styles.sectionLabel}>Hindi</Text>
                            <TouchableOpacity onPress={() => speak(page.hindi, "hi-IN")}>
                              <Text style={styles.speakerIcon}>🔊</Text>
                            </TouchableOpacity>
                          </View>
                          <Text style={styles.sectionText}>{page.hindi || "-"}</Text>
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
  pageCard: { backgroundColor: Colors.card, borderRadius: 12, marginBottom: 10, elevation: 1, overflow: "hidden" },
  pageHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 16 },
  pageTitle: { fontSize: 15, fontWeight: "700", color: Colors.textPrimary },
  pageToggle: { color: Colors.textSecondary },
  pageBody: { paddingHorizontal: 16, paddingBottom: 16 },
  pageMessage: { color: Colors.textSecondary, fontStyle: "italic" },
  sectionLabel: { fontSize: 11, fontWeight: "700", color: Colors.textSecondary, textTransform: "uppercase", marginTop: 8 },
  sectionText: { fontSize: 14, color: Colors.textPrimary, marginTop: 4, lineHeight: 20 },
  divider: { height: 1, backgroundColor: Colors.border, marginVertical: 10 },
  langRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10 },
  speakerIcon: { fontSize: 16 },
});

export default PdfScanScreen;