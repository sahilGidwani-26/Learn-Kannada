import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Colors } from "../constants/colors";
import { scanImage } from "../services/aiService";
import LoadingSpinner from "../components/LoadingSpinner";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "CameraScanner">;

const CameraScannerScreen: React.FC<Props> = ({ navigation }) => {
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [processing, setProcessing] = useState(false);

  const handleCapture = async () => {
    if (!cameraRef.current) return;
    try {
      setProcessing(true);
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.7 });
      if (!photo?.uri) throw new Error("Could not capture photo");
      const result = await scanImage(photo.uri);
      navigation.navigate("ScannerResult", { result });
    } catch (err: any) {
      Alert.alert("Scan failed", err.message || "Could not process the image");
    } finally {
      setProcessing(false);
    }
  };

  if (!permission) {
    return <LoadingSpinner label="Checking camera permission..." />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.permissionText}>Camera permission is required to scan Kannada text.</Text>
        <TouchableOpacity style={styles.grantBtn} onPress={requestPermission}>
          <Text style={{ color: "#fff", fontWeight: "600" }}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={StyleSheet.absoluteFill} facing="back" />
      {processing && (
        <View style={styles.overlay}>
          <LoadingSpinner label="Reading Kannada text..." />
        </View>
      )}
      <TouchableOpacity style={styles.captureBtn} onPress={handleCapture} disabled={processing}>
        <View style={styles.captureInner} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.pdfLink} onPress={() => navigation.navigate("PdfScan")}>
        <Text style={styles.pdfLinkText}>📄 Advanced: Scan a PDF (up to 15 pages)</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24, backgroundColor: Colors.background },
  permissionText: { textAlign: "center", color: Colors.textSecondary, marginBottom: 16 },
  grantBtn: { backgroundColor: Colors.primary, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 10 },
  captureBtn: {
    position: "absolute", bottom: 40, alignSelf: "center", width: 76, height: 76, borderRadius: 38,
    borderWidth: 4, borderColor: "#fff", alignItems: "center", justifyContent: "center",
  },
  captureInner: { width: 58, height: 58, borderRadius: 29, backgroundColor: "#fff" },
  pdfLink: {
    position: "absolute", bottom: 130, alignSelf: "center", backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20,
  },
  pdfLinkText: { color: "#fff", fontSize: 13, fontWeight: "600" },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.5)", alignItems: "center", justifyContent: "center" },
});

export default CameraScannerScreen;