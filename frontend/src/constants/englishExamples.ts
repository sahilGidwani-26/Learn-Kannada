// 5 example words for every English letter A-Z, each shown with its
// Hindi and Kannada translation. Used by the "English (A-Z)" tab in AlphabetsScreen.

export interface LetterExample {
  english: string;
  hindi: string;
  kannada: string;
}

export interface EnglishLetterData {
  letter: string;
  examples: LetterExample[];
}

export const englishExamples: EnglishLetterData[] = [
  { letter: "A", examples: [
    { english: "Apple", hindi: "सेब", kannada: "ಸೇಬು" },
    { english: "Ant", hindi: "चींटी", kannada: "ಇರುವೆ" },
    { english: "Airplane", hindi: "हवाई जहाज़", kannada: "ವಿಮಾನ" },
    { english: "Arm", hindi: "बाँह", kannada: "ತೋಳು" },
    { english: "Aunt", hindi: "चाची/मौसी", kannada: "ಚಿಕ್ಕಮ್ಮ" },
  ]},
  { letter: "B", examples: [
    { english: "Ball", hindi: "गेंद", kannada: "ಚೆಂಡು" },
    { english: "Banana", hindi: "केला", kannada: "ಬಾಳೆಹಣ್ಣು" },
    { english: "Book", hindi: "किताब", kannada: "ಪುಸ್ತಕ" },
    { english: "Bird", hindi: "पक्षी", kannada: "ಹಕ್ಕಿ" },
    { english: "Bag", hindi: "थैला", kannada: "ಚೀಲ" },
  ]},
  { letter: "C", examples: [
    { english: "Cat", hindi: "बिल्ली", kannada: "ಬೆಕ್ಕು" },
    { english: "Car", hindi: "कार", kannada: "ಕಾರು" },
    { english: "Cow", hindi: "गाय", kannada: "ಹಸು" },
    { english: "Chair", hindi: "कुर्सी", kannada: "ಕುರ್ಚಿ" },
    { english: "Cloud", hindi: "बादल", kannada: "ಮೋಡ" },
  ]},
  { letter: "D", examples: [
    { english: "Dog", hindi: "कुत्ता", kannada: "ನಾಯಿ" },
    { english: "Duck", hindi: "बत्तख", kannada: "ಬಾತುಕೋಳಿ" },
    { english: "Door", hindi: "दरवाज़ा", kannada: "ಬಾಗಿಲು" },
    { english: "Doctor", hindi: "डॉक्टर", kannada: "ವೈದ್ಯ" },
    { english: "Dance", hindi: "नृत्य", kannada: "ನೃತ್ಯ" },
  ]},
  { letter: "E", examples: [
    { english: "Elephant", hindi: "हाथी", kannada: "ಆನೆ" },
    { english: "Egg", hindi: "अंडा", kannada: "ಮೊಟ್ಟೆ" },
    { english: "Eye", hindi: "आँख", kannada: "ಕಣ್ಣು" },
    { english: "Ear", hindi: "कान", kannada: "ಕಿವಿ" },
    { english: "Earth", hindi: "धरती", kannada: "ಭೂಮಿ" },
  ]},
  { letter: "F", examples: [
    { english: "Fish", hindi: "मछली", kannada: "ಮೀನು" },
    { english: "Flower", hindi: "फूल", kannada: "ಹೂವು" },
    { english: "Fruit", hindi: "फल", kannada: "ಹಣ್ಣು" },
    { english: "Father", hindi: "पिता", kannada: "ಅಪ್ಪ" },
    { english: "Fan", hindi: "पंखा", kannada: "ಫ್ಯಾನ್" },
  ]},
  { letter: "G", examples: [
    { english: "Goat", hindi: "बकरी", kannada: "ಮೇಕೆ" },
    { english: "Garden", hindi: "बगीचा", kannada: "ತೋಟ" },
    { english: "Girl", hindi: "लड़की", kannada: "ಹುಡುಗಿ" },
    { english: "Grapes", hindi: "अंगूर", kannada: "ದ್ರಾಕ್ಷಿ" },
    { english: "Gold", hindi: "सोना", kannada: "ಚಿನ್ನ" },
  ]},
  { letter: "H", examples: [
    { english: "House", hindi: "घर", kannada: "ಮನೆ" },
    { english: "Hand", hindi: "हाथ", kannada: "ಕೈ" },
    { english: "Horse", hindi: "घोड़ा", kannada: "ಕುದುರೆ" },
    { english: "Hat", hindi: "टोपी", kannada: "ಟೋಪಿ" },
    { english: "Hospital", hindi: "अस्पताल", kannada: "ಆಸ್ಪತ್ರೆ" },
  ]},
  { letter: "I", examples: [
    { english: "Ice", hindi: "बर्फ़", kannada: "ಮಂಜುಗಡ್ಡೆ" },
    { english: "Ink", hindi: "स्याही", kannada: "ಶಾಯಿ" },
    { english: "Iguana", hindi: "गोह", kannada: "ಉಡ" },
    { english: "Island", hindi: "द्वीप", kannada: "ದ್ವೀಪ" },
    { english: "Insect", hindi: "कीड़ा", kannada: "ಕೀಟ" },
  ]},
  { letter: "J", examples: [
    { english: "Jug", hindi: "जग", kannada: "ಜಗ್" },
    { english: "Juice", hindi: "जूस", kannada: "ಜ್ಯೂಸ್" },
    { english: "Jacket", hindi: "जैकेट", kannada: "ಜಾಕೆಟ್" },
    { english: "Jungle", hindi: "जंगल", kannada: "ಕಾಡು" },
    { english: "Jasmine", hindi: "चमेली", kannada: "ಮಲ್ಲಿಗೆ" },
  ]},
  { letter: "K", examples: [
    { english: "Kite", hindi: "पतंग", kannada: "ಗಾಳಿಪಟ" },
    { english: "King", hindi: "राजा", kannada: "ರಾಜ" },
    { english: "Key", hindi: "चाबी", kannada: "ಕೀಲಿ" },
    { english: "Kitchen", hindi: "रसोई", kannada: "ಅಡುಗೆಮನೆ" },
    { english: "Knife", hindi: "चाकू", kannada: "ಚಾಕು" },
  ]},
  { letter: "L", examples: [
    { english: "Lion", hindi: "शेर", kannada: "ಸಿಂಹ" },
    { english: "Leaf", hindi: "पत्ता", kannada: "ಎಲೆ" },
    { english: "Lamp", hindi: "दीया", kannada: "ದೀಪ" },
    { english: "Ladder", hindi: "सीढ़ी", kannada: "ಏಣಿ" },
    { english: "Lemon", hindi: "नींबू", kannada: "ನಿಂಬೆ" },
  ]},
  { letter: "M", examples: [
    { english: "Mango", hindi: "आम", kannada: "ಮಾವಿನಹಣ್ಣು" },
    { english: "Moon", hindi: "चाँद", kannada: "ಚಂದ್ರ" },
    { english: "Mother", hindi: "माँ", kannada: "ಅಮ್ಮ" },
    { english: "Milk", hindi: "दूध", kannada: "ಹಾಲು" },
    { english: "Monkey", hindi: "बंदर", kannada: "ಮಂಗ" },
  ]},
  { letter: "N", examples: [
    { english: "Nest", hindi: "घोंसला", kannada: "ಗೂಡು" },
    { english: "Nose", hindi: "नाक", kannada: "ಮೂಗು" },
    { english: "Night", hindi: "रात", kannada: "ರಾತ್ರಿ" },
    { english: "Needle", hindi: "सूई", kannada: "ಸೂಜಿ" },
    { english: "Nail", hindi: "नाखून", kannada: "ಉಗುರು" },
  ]},
  { letter: "O", examples: [
    { english: "Orange", hindi: "संतरा", kannada: "ಕಿತ್ತಳೆ" },
    { english: "Owl", hindi: "उल्लू", kannada: "ಗೂಬೆ" },
    { english: "Ox", hindi: "बैल", kannada: "ಎತ್ತು" },
    { english: "Oil", hindi: "तेल", kannada: "ಎಣ್ಣೆ" },
    { english: "Onion", hindi: "प्याज", kannada: "ಈರುಳ್ಳಿ" },
  ]},
  { letter: "P", examples: [
    { english: "Parrot", hindi: "तोता", kannada: "ಗಿಣಿ" },
    { english: "Pen", hindi: "पेन", kannada: "ಪೆನ್ನು" },
    { english: "Potato", hindi: "आलू", kannada: "ಆಲೂಗಡ್ಡೆ" },
    { english: "Paper", hindi: "कागज़", kannada: "ಕಾಗದ" },
    { english: "Peacock", hindi: "मोर", kannada: "ನವಿಲು" },
  ]},
  { letter: "Q", examples: [
    { english: "Queen", hindi: "रानी", kannada: "ರಾಣಿ" },
    { english: "Question", hindi: "प्रश्न", kannada: "ಪ್ರಶ್ನೆ" },
    { english: "Quilt", hindi: "रजाई", kannada: "ರಜಾಯಿ" },
    { english: "Quiet", hindi: "शांत", kannada: "ಶಾಂತ" },
    { english: "Quarter", hindi: "चौथाई", kannada: "ಕಾಲು ಭಾಗ" },
  ]},
  { letter: "R", examples: [
    { english: "Rain", hindi: "बारिश", kannada: "ಮಳೆ" },
    { english: "Rice", hindi: "चावल", kannada: "ಅನ್ನ" },
    { english: "Rat", hindi: "चूहा", kannada: "ಇಲಿ" },
    { english: "River", hindi: "नदी", kannada: "ನದಿ" },
    { english: "Ring", hindi: "अंगूठी", kannada: "ಉಂಗುರ" },
  ]},
  { letter: "S", examples: [
    { english: "Sun", hindi: "सूरज", kannada: "ಸೂರ್ಯ" },
    { english: "School", hindi: "स्कूल", kannada: "ಶಾಲೆ" },
    { english: "Snake", hindi: "साँप", kannada: "ಹಾವು" },
    { english: "Star", hindi: "तारा", kannada: "ನಕ್ಷತ್ರ" },
    { english: "Shoe", hindi: "जूता", kannada: "ಚಪ್ಪಲಿ" },
  ]},
  { letter: "T", examples: [
    { english: "Tree", hindi: "पेड़", kannada: "ಮರ" },
    { english: "Table", hindi: "मेज़", kannada: "ಮೇಜು" },
    { english: "Tiger", hindi: "बाघ", kannada: "ಹುಲಿ" },
    { english: "Train", hindi: "ट्रेन", kannada: "ರೈಲು" },
    { english: "Teacher", hindi: "शिक्षक", kannada: "ಶಿಕ್ಷಕ" },
  ]},
  { letter: "U", examples: [
    { english: "Umbrella", hindi: "छाता", kannada: "ಛತ್ರಿ" },
    { english: "Uncle", hindi: "चाचा/मामा", kannada: "ಚಿಕ್ಕಪ್ಪ" },
    { english: "Utensil", hindi: "बर्तन", kannada: "ಪಾತ್ರೆ" },
    { english: "Universe", hindi: "ब्रह्मांड", kannada: "ಬ್ರಹ್ಮಾಂಡ" },
    { english: "Unity", hindi: "एकता", kannada: "ಒಗ್ಗಟ್ಟು" },
  ]},
  { letter: "V", examples: [
    { english: "Van", hindi: "वैन", kannada: "ವ್ಯಾನ್" },
    { english: "Vegetable", hindi: "सब्ज़ी", kannada: "ತರಕಾರಿ" },
    { english: "Village", hindi: "गाँव", kannada: "ಹಳ್ಳಿ" },
    { english: "Violin", hindi: "वायलिन", kannada: "ಪಿಟೀಲು" },
    { english: "Vehicle", hindi: "वाहन", kannada: "ವಾಹನ" },
  ]},
  { letter: "W", examples: [
    { english: "Water", hindi: "पानी", kannada: "ನೀರು" },
    { english: "Watch", hindi: "घड़ी", kannada: "ಗಡಿಯಾರ" },
    { english: "Window", hindi: "खिड़की", kannada: "ಕಿಟಕಿ" },
    { english: "Wind", hindi: "हवा", kannada: "ಗಾಳಿ" },
    { english: "Well", hindi: "कुआँ", kannada: "ಬಾವಿ" },
  ]},
  // Very few English words start with X, so - as in most children's alphabet books -
  // we include common words that contain the "x" sound alongside the two true X-words.
  { letter: "X", examples: [
    { english: "Xylophone", hindi: "जाइलोफोन", kannada: "ಕ್ಸೈಲೋಫೋನ್" },
    { english: "X-ray", hindi: "एक्स-रे", kannada: "ಎಕ್ಸ್-ರೇ" },
    { english: "Box", hindi: "डिब्बा", kannada: "ಡಬ್ಬ" },
    { english: "Fox", hindi: "लोमड़ी", kannada: "ನರಿ" },
    { english: "Six", hindi: "छह", kannada: "ಆರು" },
  ]},
  { letter: "Y", examples: [
    { english: "Yak", hindi: "याक", kannada: "ಯಾಕ್" },
    { english: "Yellow", hindi: "पीला", kannada: "ಹಳದಿ" },
    { english: "Yarn", hindi: "धागा", kannada: "ನೂಲು" },
    { english: "Yogurt", hindi: "दही", kannada: "ಮೊಸರು" },
    { english: "Year", hindi: "साल", kannada: "ವರ್ಷ" },
  ]},
  { letter: "Z", examples: [
    { english: "Zebra", hindi: "ज़ेबरा", kannada: "ಜೀಬ್ರಾ" },
    { english: "Zoo", hindi: "चिड़ियाघर", kannada: "ಮೃಗಾಲಯ" },
    { english: "Zero", hindi: "शून्य", kannada: "ಸೊನ್ನೆ" },
    { english: "Zip", hindi: "ज़िप", kannada: "ಜಿಪ್" },
    { english: "Zigzag", hindi: "टेढ़ा-मेढ़ा", kannada: "ಅಂಕುಡೊಂಕು" },
  ]},
];