import api from "./api";
import { ScanResult } from "../types";

export const translateText = async (text: string) => {
  const { data } = await api.post<{ data: ScanResult }>("/ai/translate", { text });
  return data.data;
};

export const askAITeacher = async (question: string) => {
  const { data } = await api.post<{ data: { question: string; answer: string } }>("/ai/teacher", { question });
  return data.data;
};

export const scanImage = async (imageUri: string) => {
  const formData = new FormData();
  // @ts-ignore - React Native's FormData accepts this shape for file uploads
  formData.append("image", { uri: imageUri, type: "image/jpeg", name: "scan.jpg" });

  // OCR (first run downloads the Kannada language model) + AI translation can take much
  // longer than the default 20s timeout, so we override it just for this request.
  const { data } = await api.post<{ data: ScanResult }>("/ocr/scan", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    timeout: 90000,
  });
  return data.data;
};

export interface VoiceTranslateResult {
  direction: "toKannada" | "fromKannada";
  // toKannada direction (user spoke Hindi/English):
  detectedInput?: string;
  kannada?: string;
  kannadaPronunciation?: string;
  // fromKannada direction (user spoke Kannada):
  kannadaInput?: string;
  hindi?: string;
  english?: string;
  spokenLanguage?: string;
  message?: string;
}

export const voiceTranslate = async (audioUri: string) => {
  const formData = new FormData();
  // @ts-ignore - React Native's FormData accepts this shape for file uploads
  formData.append("audio", { uri: audioUri, type: "audio/m4a", name: "speech.m4a" });

  const { data } = await api.post<{ data: VoiceTranslateResult }>("/ai/voice-translate", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    timeout: 60000,
  });
  return data.data;
};