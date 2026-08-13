import api from "./api";
import { QuizLevelData } from "../types";

export const fetchLevelQuestions = async (level: number) => {
  const { data } = await api.get<{ data: QuizLevelData }>(`/quiz/level/${level}`);
  return data.data;
};

export interface SubmitLevelResult {
  passed: boolean;
  leveledUp: boolean;
  accuracyPct: number;
  quizLevel: number;
}

export interface SubmitLevelRewards {
  xpEarned: number;
  coinsEarned: number;
  totalXp: number;
  totalCoins: number;
  level: number;
}

export const submitLevelResult = async (level: number, correctAnswers: number, totalQuestions: number) => {
  const { data } = await api.post<{ data: SubmitLevelResult; rewards: SubmitLevelRewards }>(
    `/quiz/level/${level}/submit`,
    { correctAnswers, totalQuestions }
  );
  return data;
};

export const checkVoiceAnswer = async (audioUri: string, expectedAnswer: string) => {
  const formData = new FormData();
  // @ts-ignore - React Native's FormData accepts this shape for file uploads
  formData.append("audio", { uri: audioUri, type: "audio/m4a", name: "answer.m4a" });
  formData.append("expectedAnswer", expectedAnswer);

  const { data } = await api.post<{ data: { transcribed: string; isCorrect: boolean } }>(
    "/quiz/voice-answer",
    formData,
    { headers: { "Content-Type": "multipart/form-data" }, timeout: 45000 }
  );
  return data.data;
};