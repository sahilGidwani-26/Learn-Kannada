const Alphabet = require("../models/Alphabet");
const NumberItem = require("../models/NumberItem");
const Word = require("../models/Word");

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

const sampleUnique = (arr, n) => {
  const picked = shuffle(arr).slice(0, n);
  // If the pool is smaller than needed, fill the remainder by repeating random picks
  // (keeps every level playable even for small pools, e.g. only 13 vowels).
  while (picked.length < n && arr.length > 0) {
    picked.push(arr[Math.floor(Math.random() * arr.length)]);
  }
  return picked;
};

const buildOptions = (correctLabel, pool, count, getLabel) => {
  const options = new Set([correctLabel]);
  for (const item of shuffle(pool)) {
    if (options.size >= count) break;
    const label = getLabel(item);
    if (label) options.add(label);
  }
  return shuffle([...options]);
};

// Determines which question type a given level (1-100) uses. Also used by the submit
// endpoint so the saved QuizAttempt record has the right quizType.
const getLevelType = (level) => {
  if (level <= 10) return "vowel";
  if (level <= 20) return "consonant";
  if (level <= 30) return "number";
  if (level <= 45) return "wordToEnglish";
  if (level <= 60) return "englishToWord";
  if (level <= 75) return "wordToHindi";
  if (level <= 90) return "sentence";
  return "voice";
};

// Maps our internal level types onto the QuizAttempt schema's existing quizType enum.
const mapToQuizAttemptType = (levelType) => {
  const map = {
    vowel: "letter",
    consonant: "letter",
    number: "number",
    wordToEnglish: "word",
    englishToWord: "translation",
    wordToHindi: "translation",
    sentence: "sentence",
    voice: "voice",
  };
  return map[levelType] || "word";
};

const optionCountForLevel = (level, bandStart, bandEnd) => {
  // Options grow from 3-4 up to 6 as the level climbs within its band, making each
  // band progressively harder to guess.
  const span = bandEnd - bandStart;
  const progress = span > 0 ? (level - bandStart) / span : 0;
  return Math.min(6, 3 + Math.round(progress * 3));
};

const generateLevelQuestions = async (level) => {
  const clampedLevel = Math.max(1, Math.min(100, level));
  const type = getLevelType(clampedLevel);

  const alphabets = await Alphabet.find();
  const vowels = alphabets.filter((a) => a.type === "vowel");
  const consonants = alphabets.filter((a) => a.type === "consonant");
  const numbers = await NumberItem.find();
  const words = await Word.find();
  const sentenceWords = words.filter((w) => w.exampleSentence && w.exampleSentence.kannada);

  let pool;
  let optionsCount;

  switch (type) {
    case "vowel":
      pool = vowels;
      optionsCount = optionCountForLevel(clampedLevel, 1, 10);
      break;
    case "consonant":
      pool = consonants;
      optionsCount = optionCountForLevel(clampedLevel, 11, 20);
      break;
    case "number":
      pool = numbers;
      optionsCount = optionCountForLevel(clampedLevel, 21, 30);
      break;
    case "wordToEnglish":
      pool = words;
      optionsCount = optionCountForLevel(clampedLevel, 31, 45);
      break;
    case "englishToWord":
      pool = words;
      optionsCount = optionCountForLevel(clampedLevel, 46, 60);
      break;
    case "wordToHindi":
      pool = words;
      optionsCount = optionCountForLevel(clampedLevel, 61, 75);
      break;
    case "sentence":
      pool = sentenceWords.length >= 4 ? sentenceWords : words;
      optionsCount = 4;
      break;
    case "voice":
    default:
      pool = words;
      optionsCount = 0;
      break;
  }

  const chosen = sampleUnique(pool, 10);

  const questions = chosen.map((item, idx) => {
    const id = `${clampedLevel}-${idx}`;

    switch (type) {
      case "vowel":
      case "consonant":
        return {
          id,
          type,
          mode: "mcq",
          prompt: item.kannada,
          promptLabel: "What is the transliteration of this letter?",
          correctAnswer: item.englishTransliteration,
          options: buildOptions(item.englishTransliteration, pool, optionsCount, (x) => x.englishTransliteration),
        };

      case "number":
        return {
          id,
          type,
          mode: "mcq",
          prompt: item.kannada,
          promptLabel: "What number is this?",
          correctAnswer: String(item.value),
          options: buildOptions(String(item.value), pool, optionsCount, (x) => String(x.value)),
        };

      case "wordToEnglish":
        return {
          id,
          type,
          mode: "mcq",
          prompt: item.kannada,
          promptLabel: "What does this word mean in English?",
          correctAnswer: item.english,
          options: buildOptions(item.english, pool, optionsCount, (x) => x.english),
        };

      case "englishToWord":
        return {
          id,
          type,
          mode: "mcq",
          prompt: item.english,
          promptLabel: "Which Kannada word means this?",
          correctAnswer: item.kannada,
          options: buildOptions(item.kannada, pool, optionsCount, (x) => x.kannada),
        };

      case "wordToHindi":
        return {
          id,
          type,
          mode: "mcq",
          prompt: item.kannada,
          promptLabel: "What does this word mean in Hindi?",
          correctAnswer: item.hindi,
          options: buildOptions(item.hindi, pool, optionsCount, (x) => x.hindi),
        };

      case "sentence": {
        const hasSentence = !!item.exampleSentence?.kannada;
        const promptText = hasSentence ? item.exampleSentence.kannada : item.kannada;
        const correct = hasSentence ? item.exampleSentence.english : item.english;
        return {
          id,
          type,
          mode: "mcq",
          prompt: promptText,
          promptLabel: "What does this mean in English?",
          correctAnswer: correct,
          options: buildOptions(
            correct,
            pool,
            optionsCount,
            (x) => (x.exampleSentence?.english || x.english)
          ),
        };
      }

      case "voice":
      default:
        return {
          id,
          type: "voice",
          mode: "voice",
          prompt: item.english,
          promptLabel: "Say this word out loud in Kannada",
          correctAnswer: item.kannada,
          correctAnswerPronunciation: item.pronunciation,
        };
    }
  });

  return { level: clampedLevel, totalLevels: 100, type, questions };
};

module.exports = { generateLevelQuestions, getLevelType, mapToQuizAttemptType };