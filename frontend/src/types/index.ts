export interface User {
  id: string;
  name: string;
  email: string;
  xp: number;
  coins: number;
  level: number;
}

export interface Alphabet {
  _id: string;
  kannada: string;
  type: "vowel" | "consonant";
  englishTransliteration: string;
  hindiMeaning: string;
  audioUrl?: string;
  exampleWord?: { kannada: string; hindi: string; english: string };
}

export interface NumberItem {
  _id: string;
  value: number;
  kannada: string;
  englishTransliteration: string;
  hindiMeaning: string;
}

export interface Word {
  _id: string;
  category: string;
  kannada: string;
  pronunciation: string;
  hindi: string;
  english: string;
  imageUrl?: string;
  exampleSentence?: { kannada: string; hindi: string; english: string };
}

export interface ScanResult {
  originalText: string;
  hindi: string;
  english: string;
  simpleExplanation: string;
  difficultyLevel: "easy" | "medium" | "hard";
  exampleSentence?: { kannada: string; hindi: string; english: string };
}

// Root stack param list - add new screens here as the app grows
export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  MainTabs: undefined;
  Alphabets: undefined;
  Numbers: undefined;
  Words: undefined;
  CameraScanner: undefined;
  PdfScan: undefined;
  ScannerResult: { result: ScanResult };
  AITeacher: undefined;
  VoiceTranslator: undefined;
  Quiz: { quizType: string };
  Profile: undefined;
};