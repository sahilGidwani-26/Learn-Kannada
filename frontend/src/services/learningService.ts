import api from "./api";
import { Alphabet, NumberItem, Word } from "../types";

export const fetchAlphabets = async (type?: "vowel" | "consonant") => {
  const { data } = await api.get<{ data: Alphabet[] }>("/learn/alphabets", { params: { type } });
  return data.data;
};

export const fetchNumbers = async (from = 0, to = 100) => {
  const { data } = await api.get<{ data: NumberItem[] }>("/learn/numbers", { params: { from, to } });
  return data.data;
};

export const fetchWordsByCategory = async (category: string) => {
  const { data } = await api.get<{ data: Word[] }>(`/learn/words/${category}`);
  return data.data;
};

export const updateProgress = async (payload: {
  module: string;
  itemId?: string;
  completed?: boolean;
  accuracy?: number;
}) => {
  const { data } = await api.post("/learn/progress", payload);
  return data;
};
