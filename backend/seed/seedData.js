// ============================================================
// ALPHABETS - Complete Kannada script
// ============================================================

const vowels = [
  { kannada: "ಅ", type: "vowel", englishTransliteration: "a", hindiMeaning: "अ", order: 1,
    exampleWord: { kannada: "ಅಮ್ಮ", hindi: "माँ", english: "Mother" } },
  { kannada: "ಆ", type: "vowel", englishTransliteration: "aa", hindiMeaning: "आ", order: 2,
    exampleWord: { kannada: "ಆನೆ", hindi: "हाथी", english: "Elephant" } },
  { kannada: "ಇ", type: "vowel", englishTransliteration: "i", hindiMeaning: "इ", order: 3,
    exampleWord: { kannada: "ಇಲಿ", hindi: "चूहा", english: "Rat" } },
  { kannada: "ಈ", type: "vowel", englishTransliteration: "ee", hindiMeaning: "ई", order: 4,
    exampleWord: { kannada: "ಈಚಲು", hindi: "खजूर", english: "Date palm" } },
  { kannada: "ಉ", type: "vowel", englishTransliteration: "u", hindiMeaning: "उ", order: 5,
    exampleWord: { kannada: "ಉಡ", hindi: "गोह", english: "Iguana" } },
  { kannada: "ಊ", type: "vowel", englishTransliteration: "oo", hindiMeaning: "ऊ", order: 6,
    exampleWord: { kannada: "ಊರು", hindi: "गाँव", english: "Village" } },
  { kannada: "ಋ", type: "vowel", englishTransliteration: "ru", hindiMeaning: "ऋ", order: 7,
    exampleWord: { kannada: "ಋಷಿ", hindi: "ऋषि", english: "Sage" } },
  { kannada: "ಎ", type: "vowel", englishTransliteration: "e", hindiMeaning: "ऎ", order: 8,
    exampleWord: { kannada: "ಎಲೆ", hindi: "पत्ता", english: "Leaf" } },
  { kannada: "ಏ", type: "vowel", englishTransliteration: "ae", hindiMeaning: "ए", order: 9,
    exampleWord: { kannada: "ಏಣಿ", hindi: "सीढ़ी", english: "Ladder" } },
  { kannada: "ಐ", type: "vowel", englishTransliteration: "ai", hindiMeaning: "ऐ", order: 10,
    exampleWord: { kannada: "ಐದು", hindi: "पाँच", english: "Five" } },
  { kannada: "ಒ", type: "vowel", englishTransliteration: "o", hindiMeaning: "ऒ", order: 11,
    exampleWord: { kannada: "ಒಂಟೆ", hindi: "ऊँट", english: "Camel" } },
  { kannada: "ಓ", type: "vowel", englishTransliteration: "oa", hindiMeaning: "ओ", order: 12,
    exampleWord: { kannada: "ಓಲೆ", hindi: "पत्र", english: "Letter/Note" } },
  { kannada: "ಔ", type: "vowel", englishTransliteration: "au", hindiMeaning: "औ", order: 13,
    exampleWord: { kannada: "ಔಷಧ", hindi: "दवाई", english: "Medicine" } },
];

const consonants = [
  { kannada: "ಕ", englishTransliteration: "ka", hindiMeaning: "क",
    exampleWord: { kannada: "ಕಮಲ", hindi: "कमल", english: "Lotus" } },
  { kannada: "ಖ", englishTransliteration: "kha", hindiMeaning: "ख",
    exampleWord: { kannada: "ಖಡ್ಗ", hindi: "तलवार", english: "Sword" } },
  { kannada: "ಗ", englishTransliteration: "ga", hindiMeaning: "ग",
    exampleWord: { kannada: "ಗಿಣಿ", hindi: "तोता", english: "Parrot" } },
  { kannada: "ಘ", englishTransliteration: "gha", hindiMeaning: "घ",
    exampleWord: { kannada: "ಘಂಟೆ", hindi: "घंटी", english: "Bell" } },
  { kannada: "ಙ", englishTransliteration: "nga", hindiMeaning: "ङ",
    exampleWord: { kannada: "ಅಂಗಡಿ", hindi: "दुकान", english: "Shop" } },
  { kannada: "ಚ", englishTransliteration: "cha", hindiMeaning: "च",
    exampleWord: { kannada: "ಚಂದ್ರ", hindi: "चाँद", english: "Moon" } },
  { kannada: "ಛ", englishTransliteration: "chha", hindiMeaning: "छ",
    exampleWord: { kannada: "ಛತ್ರಿ", hindi: "छाता", english: "Umbrella" } },
  { kannada: "ಜ", englishTransliteration: "ja", hindiMeaning: "ज",
    exampleWord: { kannada: "ಜಲ", hindi: "पानी", english: "Water" } },
  { kannada: "ಝ", englishTransliteration: "jha", hindiMeaning: "झ",
    exampleWord: { kannada: "ಝರಿ", hindi: "झरना", english: "Waterfall" } },
  { kannada: "ಞ", englishTransliteration: "nya", hindiMeaning: "ञ",
    exampleWord: { kannada: "ಜ್ಞಾನ", hindi: "ज्ञान", english: "Knowledge" } },
  { kannada: "ಟ", englishTransliteration: "Ta", hindiMeaning: "ट",
    exampleWord: { kannada: "ಟೊಮ್ಯಾಟೊ", hindi: "टमाटर", english: "Tomato" } },
  { kannada: "ಠ", englishTransliteration: "Tha", hindiMeaning: "ठ",
    exampleWord: { kannada: "ಠಾಣೆ", hindi: "थाना", english: "Police station" } },
  { kannada: "ಡ", englishTransliteration: "Da", hindiMeaning: "ड",
    exampleWord: { kannada: "ಡಬ್ಬ", hindi: "डिब्बा", english: "Box" } },
  { kannada: "ಢ", englishTransliteration: "Dha", hindiMeaning: "ढ",
    exampleWord: { kannada: "ಢಾಲ", hindi: "ढाल", english: "Shield" } },
  { kannada: "ಣ", englishTransliteration: "Na", hindiMeaning: "ण",
    exampleWord: { kannada: "ಹೂವಣ್ಣ", hindi: "फूल जैसा", english: "Flower-like" } },
  { kannada: "ತ", englishTransliteration: "ta", hindiMeaning: "त",
    exampleWord: { kannada: "ತಾಯಿ", hindi: "माँ", english: "Mother" } },
  { kannada: "ಥ", englishTransliteration: "tha", hindiMeaning: "थ",
    exampleWord: { kannada: "ಕಥೆ", hindi: "कहानी", english: "Story" } },
  { kannada: "ದ", englishTransliteration: "da", hindiMeaning: "द",
    exampleWord: { kannada: "ದೀಪ", hindi: "दीया", english: "Lamp" } },
  { kannada: "ಧ", englishTransliteration: "dha", hindiMeaning: "ध",
    exampleWord: { kannada: "ಧ್ವಜ", hindi: "ध्वज", english: "Flag" } },
  { kannada: "ನ", englishTransliteration: "na", hindiMeaning: "न",
    exampleWord: { kannada: "ನಾಯಿ", hindi: "कुत्ता", english: "Dog" } },
  { kannada: "ಪ", englishTransliteration: "pa", hindiMeaning: "प",
    exampleWord: { kannada: "ಪುಸ್ತಕ", hindi: "किताब", english: "Book" } },
  { kannada: "ಫ", englishTransliteration: "pha", hindiMeaning: "फ",
    exampleWord: { kannada: "ಫಲ", hindi: "फल", english: "Fruit" } },
  { kannada: "ಬ", englishTransliteration: "ba", hindiMeaning: "ब",
    exampleWord: { kannada: "ಬಾಳೆಹಣ್ಣು", hindi: "केला", english: "Banana" } },
  { kannada: "ಭ", englishTransliteration: "bha", hindiMeaning: "भ",
    exampleWord: { kannada: "ಭೂಮಿ", hindi: "धरती", english: "Earth" } },
  { kannada: "ಮ", englishTransliteration: "ma", hindiMeaning: "म",
    exampleWord: { kannada: "ಮನೆ", hindi: "घर", english: "House" } },
  { kannada: "ಯ", englishTransliteration: "ya", hindiMeaning: "य",
    exampleWord: { kannada: "ಯಂತ್ರ", hindi: "यंत्र", english: "Machine" } },
  { kannada: "ರ", englishTransliteration: "ra", hindiMeaning: "र",
    exampleWord: { kannada: "ರಥ", hindi: "रथ", english: "Chariot" } },
  { kannada: "ಲ", englishTransliteration: "la", hindiMeaning: "ल",
    exampleWord: { kannada: "ಲಂಗ", hindi: "स्कर्ट", english: "Skirt" } },
  { kannada: "ವ", englishTransliteration: "va", hindiMeaning: "व",
    exampleWord: { kannada: "ವನ", hindi: "जंगल", english: "Forest" } },
  { kannada: "ಶ", englishTransliteration: "sha", hindiMeaning: "श",
    exampleWord: { kannada: "ಶಾಲೆ", hindi: "स्कूल", english: "School" } },
  { kannada: "ಷ", englishTransliteration: "Sha", hindiMeaning: "ष",
    exampleWord: { kannada: "ಷಟ್ಕೋನ", hindi: "षट्भुज", english: "Hexagon" } },
  { kannada: "ಸ", englishTransliteration: "sa", hindiMeaning: "स",
    exampleWord: { kannada: "ಸೂರ್ಯ", hindi: "सूरज", english: "Sun" } },
  { kannada: "ಹ", englishTransliteration: "ha", hindiMeaning: "ह",
    exampleWord: { kannada: "ಹಸು", hindi: "गाय", english: "Cow" } },
  { kannada: "ಳ", englishTransliteration: "La", hindiMeaning: "ळ",
    exampleWord: { kannada: "ಬೆಳಕು", hindi: "रोशनी", english: "Light" } },
].map((c, i) => ({ ...c, type: "consonant", order: i + 1 }));

const alphabets = [...vowels, ...consonants];

// ============================================================
// NUMBERS 0-20
// ============================================================

const numbers = [
  { value: 0, kannada: "ಸೊನ್ನೆ", englishTransliteration: "sonne", hindiMeaning: "शून्य" },
  { value: 1, kannada: "ಒಂದು", englishTransliteration: "ondu", hindiMeaning: "एक" },
  { value: 2, kannada: "ಎರಡು", englishTransliteration: "eradu", hindiMeaning: "दो" },
  { value: 3, kannada: "ಮೂರು", englishTransliteration: "mooru", hindiMeaning: "तीन" },
  { value: 4, kannada: "ನಾಲ್ಕು", englishTransliteration: "naalku", hindiMeaning: "चार" },
  { value: 5, kannada: "ಐದು", englishTransliteration: "aidu", hindiMeaning: "पाँच" },
  { value: 6, kannada: "ಆರು", englishTransliteration: "aaru", hindiMeaning: "छह" },
  { value: 7, kannada: "ಏಳು", englishTransliteration: "elu", hindiMeaning: "सात" },
  { value: 8, kannada: "ಎಂಟು", englishTransliteration: "entu", hindiMeaning: "आठ" },
  { value: 9, kannada: "ಒಂಬತ್ತು", englishTransliteration: "ombattu", hindiMeaning: "नौ" },
  { value: 10, kannada: "ಹತ್ತು", englishTransliteration: "hattu", hindiMeaning: "दस" },
  { value: 11, kannada: "ಹನ್ನೊಂದು", englishTransliteration: "hannondu", hindiMeaning: "ग्यारह" },
  { value: 12, kannada: "ಹನ್ನೆರಡು", englishTransliteration: "hanneradu", hindiMeaning: "बारह" },
  { value: 13, kannada: "ಹದಿಮೂರು", englishTransliteration: "hadimooru", hindiMeaning: "तेरह" },
  { value: 14, kannada: "ಹದಿನಾಲ್ಕು", englishTransliteration: "hadinaalku", hindiMeaning: "चौदह" },
  { value: 15, kannada: "ಹದಿನೈದು", englishTransliteration: "hadinaidu", hindiMeaning: "पंद्रह" },
  { value: 16, kannada: "ಹದಿನಾರು", englishTransliteration: "hadinaaru", hindiMeaning: "सोलह" },
  { value: 17, kannada: "ಹದಿನೇಳು", englishTransliteration: "hadinelu", hindiMeaning: "सत्रह" },
  { value: 18, kannada: "ಹದಿನೆಂಟು", englishTransliteration: "hadinentu", hindiMeaning: "अठारह" },
  { value: 19, kannada: "ಹತ್ತೊಂಬತ್ತು", englishTransliteration: "hattombattu", hindiMeaning: "उन्नीस" },
  { value: 20, kannada: "ಇಪ್ಪತ್ತು", englishTransliteration: "ippattu", hindiMeaning: "बीस" },
];

// ============================================================
// WORDS - all 15 categories, each with a written pronunciation
// ============================================================

const words = [
  // Animals
  { category: "animals", kannada: "ನಾಯಿ", pronunciation: "naayi", hindi: "कुत्ता", english: "Dog",
    exampleSentence: { kannada: "ನಾಯಿ ಓಡುತ್ತಿದೆ", hindi: "कुत्ता दौड़ रहा है", english: "The dog is running" } },
  { category: "animals", kannada: "ಬೆಕ್ಕು", pronunciation: "bekku", hindi: "बिल्ली", english: "Cat",
    exampleSentence: { kannada: "ಬೆಕ್ಕು ಹಾಲು ಕುಡಿಯುತ್ತದೆ", hindi: "बिल्ली दूध पीती है", english: "The cat drinks milk" } },
  { category: "animals", kannada: "ಹಸು", pronunciation: "hasu", hindi: "गाय", english: "Cow" },
  { category: "animals", kannada: "ಆನೆ", pronunciation: "aane", hindi: "हाथी", english: "Elephant" },
  { category: "animals", kannada: "ಸಿಂಹ", pronunciation: "simha", hindi: "शेर", english: "Lion" },
  { category: "animals", kannada: "ಕುದುರೆ", pronunciation: "kudure", hindi: "घोड़ा", english: "Horse" },

  // Birds
  { category: "birds", kannada: "ಗಿಣಿ", pronunciation: "gini", hindi: "तोता", english: "Parrot" },
  { category: "birds", kannada: "ಕಾಗೆ", pronunciation: "kaage", hindi: "कौआ", english: "Crow" },
  { category: "birds", kannada: "ಗುಬ್ಬಿ", pronunciation: "gubbi", hindi: "गौरैया", english: "Sparrow" },
  { category: "birds", kannada: "ನವಿಲು", pronunciation: "navilu", hindi: "मोर", english: "Peacock" },
  { category: "birds", kannada: "ಬಾತುಕೋಳಿ", pronunciation: "baatukoli", hindi: "बत्तख", english: "Duck" },
  { category: "birds", kannada: "ಗೂಬೆ", pronunciation: "goobe", hindi: "उल्लू", english: "Owl" },

  // Colors
  { category: "colors", kannada: "ಕೆಂಪು", pronunciation: "kempu", hindi: "लाल", english: "Red" },
  { category: "colors", kannada: "ಹಸಿರು", pronunciation: "hasiru", hindi: "हरा", english: "Green" },
  { category: "colors", kannada: "ನೀಲಿ", pronunciation: "neeli", hindi: "नीला", english: "Blue" },
  { category: "colors", kannada: "ಹಳದಿ", pronunciation: "haladi", hindi: "पीला", english: "Yellow" },
  { category: "colors", kannada: "ಕಪ್ಪು", pronunciation: "kappu", hindi: "काला", english: "Black" },
  { category: "colors", kannada: "ಬಿಳಿ", pronunciation: "bili", hindi: "सफ़ेद", english: "White" },

  // Vegetables
  { category: "vegetables", kannada: "ಟೊಮ್ಯಾಟೊ", pronunciation: "tomato", hindi: "टमाटर", english: "Tomato" },
  { category: "vegetables", kannada: "ಆಲೂಗಡ್ಡೆ", pronunciation: "aalugadde", hindi: "आलू", english: "Potato" },
  { category: "vegetables", kannada: "ಈರುಳ್ಳಿ", pronunciation: "eerulli", hindi: "प्याज", english: "Onion" },
  { category: "vegetables", kannada: "ಕ್ಯಾರೆಟ್", pronunciation: "carrot", hindi: "गाजर", english: "Carrot" },
  { category: "vegetables", kannada: "ಬದನೆಕಾಯಿ", pronunciation: "badanekaayi", hindi: "बैंगन", english: "Brinjal" },
  { category: "vegetables", kannada: "ಸೌತೆಕಾಯಿ", pronunciation: "sautekaayi", hindi: "खीरा", english: "Cucumber" },

  // Fruits
  { category: "fruits", kannada: "ಸೇಬು", pronunciation: "sebu", hindi: "सेब", english: "Apple",
    exampleSentence: { kannada: "ಸೇಬು ಕೆಂಪಗಿದೆ", hindi: "सेब लाल है", english: "The apple is red" } },
  { category: "fruits", kannada: "ಬಾಳೆಹಣ್ಣು", pronunciation: "baalehannu", hindi: "केला", english: "Banana",
    exampleSentence: { kannada: "ಬಾಳೆಹಣ್ಣು ಸಿಹಿಯಾಗಿದೆ", hindi: "केला मीठा है", english: "The banana is sweet" } },
  { category: "fruits", kannada: "ಮಾವಿನಹಣ್ಣು", pronunciation: "maavinahannu", hindi: "आम", english: "Mango" },
  { category: "fruits", kannada: "ದ್ರಾಕ್ಷಿ", pronunciation: "draakshi", hindi: "अंगूर", english: "Grapes" },
  { category: "fruits", kannada: "ಕಿತ್ತಳೆ", pronunciation: "kittale", hindi: "संतरा", english: "Orange" },
  { category: "fruits", kannada: "ಅನಾನಸ್", pronunciation: "ananas", hindi: "अनानास", english: "Pineapple" },

  // Family
  { category: "family", kannada: "ಅಮ್ಮ", pronunciation: "amma", hindi: "माँ", english: "Mother",
    exampleSentence: { kannada: "ಅಮ್ಮ ಅಡುಗೆ ಮಾಡುತ್ತಾಳೆ", hindi: "माँ खाना बनाती है", english: "Mother cooks food" } },
  { category: "family", kannada: "ಅಪ್ಪ", pronunciation: "appa", hindi: "पिता", english: "Father",
    exampleSentence: { kannada: "ಅಪ್ಪ ಕೆಲಸಕ್ಕೆ ಹೋಗುತ್ತಾರೆ", hindi: "पिता काम पर जाते हैं", english: "Father goes to work" } },
  { category: "family", kannada: "ಅಣ್ಣ", pronunciation: "anna", hindi: "बड़ा भाई", english: "Elder brother" },
  { category: "family", kannada: "ಅಕ್ಕ", pronunciation: "akka", hindi: "बड़ी बहन", english: "Elder sister" },
  { category: "family", kannada: "ಅಜ್ಜ", pronunciation: "ajja", hindi: "दादा", english: "Grandfather" },
  { category: "family", kannada: "ಅಜ್ಜಿ", pronunciation: "ajji", hindi: "दादी", english: "Grandmother" },

  // Body Parts
  { category: "bodyParts", kannada: "ತಲೆ", pronunciation: "tale", hindi: "सिर", english: "Head" },
  { category: "bodyParts", kannada: "ಕಣ್ಣು", pronunciation: "kannu", hindi: "आँख", english: "Eye" },
  { category: "bodyParts", kannada: "ಕೈ", pronunciation: "kai", hindi: "हाथ", english: "Hand" },
  { category: "bodyParts", kannada: "ಕಾಲು", pronunciation: "kaalu", hindi: "पैर", english: "Leg" },
  { category: "bodyParts", kannada: "ಮೂಗು", pronunciation: "moogu", hindi: "नाक", english: "Nose" },
  { category: "bodyParts", kannada: "ಬಾಯಿ", pronunciation: "baayi", hindi: "मुँह", english: "Mouth" },

  // School
  { category: "school", kannada: "ಶಾಲೆ", pronunciation: "shaale", hindi: "स्कूल", english: "School" },
  { category: "school", kannada: "ಪುಸ್ತಕ", pronunciation: "pustaka", hindi: "किताब", english: "Book" },
  { category: "school", kannada: "ಪೆನ್ನು", pronunciation: "pennu", hindi: "पेन", english: "Pen" },
  { category: "school", kannada: "ಶಿಕ್ಷಕ", pronunciation: "shikshaka", hindi: "शिक्षक", english: "Teacher" },
  { category: "school", kannada: "ವಿದ್ಯಾರ್ಥಿ", pronunciation: "vidyaarthi", hindi: "छात्र", english: "Student" },
  { category: "school", kannada: "ಬ್ಯಾಗ್", pronunciation: "byag", hindi: "बैग", english: "Bag" },

  // Vehicles
  { category: "vehicles", kannada: "ಕಾರು", pronunciation: "kaaru", hindi: "कार", english: "Car" },
  { category: "vehicles", kannada: "ಬಸ್ಸು", pronunciation: "bassu", hindi: "बस", english: "Bus" },
  { category: "vehicles", kannada: "ಸೈಕಲ್", pronunciation: "saikal", hindi: "साइकिल", english: "Bicycle" },
  { category: "vehicles", kannada: "ರೈಲು", pronunciation: "railu", hindi: "ट्रेन", english: "Train" },
  { category: "vehicles", kannada: "ವಿಮಾನ", pronunciation: "vimaana", hindi: "हवाई जहाज़", english: "Airplane" },
  { category: "vehicles", kannada: "ದೋಣಿ", pronunciation: "doni", hindi: "नाव", english: "Boat" },

  // Hospital
  { category: "hospital", kannada: "ಆಸ್ಪತ್ರೆ", pronunciation: "aaspatre", hindi: "अस्पताल", english: "Hospital" },
  { category: "hospital", kannada: "ವೈದ್ಯ", pronunciation: "vaidya", hindi: "डॉक्टर", english: "Doctor" },
  { category: "hospital", kannada: "ದಾದಿ", pronunciation: "daadi", hindi: "नर्स", english: "Nurse" },
  { category: "hospital", kannada: "ಔಷಧ", pronunciation: "aushadha", hindi: "दवाई", english: "Medicine" },
  { category: "hospital", kannada: "ಇಂಜೆಕ್ಷನ್", pronunciation: "injection", hindi: "इंजेक्शन", english: "Injection" },
  { category: "hospital", kannada: "ರೋಗಿ", pronunciation: "rogi", hindi: "मरीज़", english: "Patient" },

  // Market
  { category: "market", kannada: "ಮಾರುಕಟ್ಟೆ", pronunciation: "maarukatte", hindi: "बाज़ार", english: "Market" },
  { category: "market", kannada: "ಹಣ", pronunciation: "hana", hindi: "पैसा", english: "Money" },
  { category: "market", kannada: "ಅಂಗಡಿ", pronunciation: "angadi", hindi: "दुकान", english: "Shop" },
  { category: "market", kannada: "ಬೆಲೆ", pronunciation: "bele", hindi: "कीमत", english: "Price" },
  { category: "market", kannada: "ಚೀಲ", pronunciation: "cheela", hindi: "थैला", english: "Bag" },
  { category: "market", kannada: "ಗ್ರಾಹಕ", pronunciation: "graahaka", hindi: "ग्राहक", english: "Customer" },

  // Weather
  { category: "weather", kannada: "ಮಳೆ", pronunciation: "male", hindi: "बारिश", english: "Rain" },
  { category: "weather", kannada: "ಬಿಸಿಲು", pronunciation: "bisilu", hindi: "धूप", english: "Sunshine" },
  { category: "weather", kannada: "ಗಾಳಿ", pronunciation: "gaali", hindi: "हवा", english: "Wind" },
  { category: "weather", kannada: "ಚಳಿ", pronunciation: "chali", hindi: "ठंड", english: "Cold" },
  { category: "weather", kannada: "ಮೋಡ", pronunciation: "moda", hindi: "बादल", english: "Cloud" },
  { category: "weather", kannada: "ಗುಡುಗು", pronunciation: "gudugu", hindi: "गरज", english: "Thunder" },

  // Office
  { category: "office", kannada: "ಕಚೇರಿ", pronunciation: "kacheri", hindi: "दफ़्तर", english: "Office" },
  { category: "office", kannada: "ಕಂಪ್ಯೂಟರ್", pronunciation: "computer", hindi: "कंप्यूटर", english: "Computer" },
  { category: "office", kannada: "ಮೇಜು", pronunciation: "meju", hindi: "मेज़", english: "Table" },
  { category: "office", kannada: "ಕುರ್ಚಿ", pronunciation: "kurchi", hindi: "कुर्सी", english: "Chair" },
  { category: "office", kannada: "ಸಭೆ", pronunciation: "sabhe", hindi: "बैठक", english: "Meeting" },
  { category: "office", kannada: "ಫೈಲ್", pronunciation: "file", hindi: "फ़ाइल", english: "File" },

  // Travel
  { category: "travel", kannada: "ಪ್ರಯಾಣ", pronunciation: "prayaana", hindi: "यात्रा", english: "Journey" },
  { category: "travel", kannada: "ಟಿಕೆಟ್", pronunciation: "ticket", hindi: "टिकट", english: "Ticket" },
  { category: "travel", kannada: "ನಿಲ್ದಾಣ", pronunciation: "nildaana", hindi: "स्टेशन", english: "Station" },
  { category: "travel", kannada: "ಬ್ಯಾಗೇಜ್", pronunciation: "baggage", hindi: "सामान", english: "Luggage" },
  { category: "travel", kannada: "ಹೋಟೆಲ್", pronunciation: "hotel", hindi: "होटल", english: "Hotel" },
  { category: "travel", kannada: "ನಕ್ಷೆ", pronunciation: "nakshe", hindi: "नक्शा", english: "Map" },

  // Food
  { category: "food", kannada: "ಅನ್ನ", pronunciation: "anna", hindi: "चावल", english: "Rice" },
  { category: "food", kannada: "ರೊಟ್ಟಿ", pronunciation: "rotti", hindi: "रोटी", english: "Bread/Roti" },
  { category: "food", kannada: "ಹಾಲು", pronunciation: "haalu", hindi: "दूध", english: "Milk" },
  { category: "food", kannada: "ಸಕ್ಕರೆ", pronunciation: "sakkare", hindi: "चीनी", english: "Sugar" },
  { category: "food", kannada: "ಉಪ್ಪು", pronunciation: "uppu", hindi: "नमक", english: "Salt" },
  { category: "food", kannada: "ಚಹಾ", pronunciation: "chaha", hindi: "चाय", english: "Tea" },
];

module.exports = { alphabets, numbers, words };