// 5 example words for every English letter A-Z, each shown with its
// Hindi and Kannada translation. Used by the "English (A-Z)" tab in AlphabetsScreen.

export interface LetterExample {
  english: string;
  hindi: string;
  kannada: string;
  pronunciation: string;
}

export interface EnglishLetterData {
  letter: string;
  examples: LetterExample[];
}

export const englishExamples: EnglishLetterData[] = [
  { letter: "A", examples: [
    { english: "Apple", hindi: "सेब", kannada: "ಸೇಬು", pronunciation: "sebu" },
    { english: "Ant", hindi: "चींटी", kannada: "ಇರುವೆ", pronunciation: "iruve" },
    { english: "Airplane", hindi: "हवाई जहाज़", kannada: "ವಿಮಾನ", pronunciation: "vimaana" },
    { english: "Arm", hindi: "बाँह", kannada: "ತೋಳು", pronunciation: "tolu" },
    { english: "Aunt", hindi: "चाची/मौसी", kannada: "ಚಿಕ್ಕಮ್ಮ", pronunciation: "chikkamma" },
  ]},
  { letter: "B", examples: [
    { english: "Ball", hindi: "गेंद", kannada: "ಚೆಂಡು", pronunciation: "chendu" },
    { english: "Banana", hindi: "केला", kannada: "ಬಾಳೆಹಣ್ಣು", pronunciation: "baalehannu" },
    { english: "Book", hindi: "किताब", kannada: "ಪುಸ್ತಕ", pronunciation: "pustaka" },
    { english: "Bird", hindi: "पक्षी", kannada: "ಹಕ್ಕಿ", pronunciation: "hakki" },
    { english: "Bag", hindi: "थैला", kannada: "ಚೀಲ", pronunciation: "cheela" },
  ]},
  { letter: "C", examples: [
    { english: "Cat", hindi: "बिल्ली", kannada: "ಬೆಕ್ಕು", pronunciation: "bekku" },
    { english: "Car", hindi: "कार", kannada: "ಕಾರು", pronunciation: "kaaru" },
    { english: "Cow", hindi: "गाय", kannada: "ಹಸು", pronunciation: "hasu" },
    { english: "Chair", hindi: "कुर्सी", kannada: "ಕುರ್ಚಿ", pronunciation: "kurchi" },
    { english: "Cloud", hindi: "बादल", kannada: "ಮೋಡ", pronunciation: "moda" },
  ]},
  { letter: "D", examples: [
    { english: "Dog", hindi: "कुत्ता", kannada: "ನಾಯಿ", pronunciation: "naayi" },
    { english: "Duck", hindi: "बत्तख", kannada: "ಬಾತುಕೋಳಿ", pronunciation: "baatukoli" },
    { english: "Door", hindi: "दरवाज़ा", kannada: "ಬಾಗಿಲು", pronunciation: "baagilu" },
    { english: "Doctor", hindi: "डॉक्टर", kannada: "ವೈದ್ಯ", pronunciation: "vaidya" },
    { english: "Dance", hindi: "नृत्य", kannada: "ನೃತ್ಯ", pronunciation: "nritya" },
  ]},
  { letter: "E", examples: [
    { english: "Elephant", hindi: "हाथी", kannada: "ಆನೆ", pronunciation: "aane" },
    { english: "Egg", hindi: "अंडा", kannada: "ಮೊಟ್ಟೆ", pronunciation: "motte" },
    { english: "Eye", hindi: "आँख", kannada: "ಕಣ್ಣು", pronunciation: "kannu" },
    { english: "Ear", hindi: "कान", kannada: "ಕಿವಿ", pronunciation: "kivi" },
    { english: "Earth", hindi: "धरती", kannada: "ಭೂಮಿ", pronunciation: "bhoomi" },
  ]},
  { letter: "F", examples: [
    { english: "Fish", hindi: "मछली", kannada: "ಮೀನು", pronunciation: "meenu" },
    { english: "Flower", hindi: "फूल", kannada: "ಹೂವು", pronunciation: "hoovu" },
    { english: "Fruit", hindi: "फल", kannada: "ಹಣ್ಣು", pronunciation: "hannu" },
    { english: "Father", hindi: "पिता", kannada: "ಅಪ್ಪ", pronunciation: "appa" },
    { english: "Fan", hindi: "पंखा", kannada: "ಫ್ಯಾನ್", pronunciation: "fan" },
  ]},
  { letter: "G", examples: [
    { english: "Goat", hindi: "बकरी", kannada: "ಮೇಕೆ", pronunciation: "meke" },
    { english: "Garden", hindi: "बगीचा", kannada: "ತೋಟ", pronunciation: "tota" },
    { english: "Girl", hindi: "लड़की", kannada: "ಹುಡುಗಿ", pronunciation: "hudugi" },
    { english: "Grapes", hindi: "अंगूर", kannada: "ದ್ರಾಕ್ಷಿ", pronunciation: "draakshi" },
    { english: "Gold", hindi: "सोना", kannada: "ಚಿನ್ನ", pronunciation: "chinna" },
  ]},
  { letter: "H", examples: [
    { english: "House", hindi: "घर", kannada: "ಮನೆ", pronunciation: "mane" },
    { english: "Hand", hindi: "हाथ", kannada: "ಕೈ", pronunciation: "kai" },
    { english: "Horse", hindi: "घोड़ा", kannada: "ಕುದುರೆ", pronunciation: "kudure" },
    { english: "Hat", hindi: "टोपी", kannada: "ಟೋಪಿ", pronunciation: "topi" },
    { english: "Hospital", hindi: "अस्पताल", kannada: "ಆಸ್ಪತ್ರೆ", pronunciation: "aaspatre" },
  ]},
  { letter: "I", examples: [
    { english: "Ice", hindi: "बर्फ़", kannada: "ಮಂಜುಗಡ್ಡೆ", pronunciation: "manjugadde" },
    { english: "Ink", hindi: "स्याही", kannada: "ಶಾಯಿ", pronunciation: "shaayi" },
    { english: "Iguana", hindi: "गोह", kannada: "ಉಡ", pronunciation: "uda" },
    { english: "Island", hindi: "द्वीप", kannada: "ದ್ವೀಪ", pronunciation: "dweepa" },
    { english: "Insect", hindi: "कीड़ा", kannada: "ಕೀಟ", pronunciation: "keeta" },
  ]},
  { letter: "J", examples: [
    { english: "Jug", hindi: "जग", kannada: "ಜಗ್", pronunciation: "jag" },
    { english: "Juice", hindi: "जूस", kannada: "ಜ್ಯೂಸ್", pronunciation: "juice" },
    { english: "Jacket", hindi: "जैकेट", kannada: "ಜಾಕೆಟ್", pronunciation: "jacket" },
    { english: "Jungle", hindi: "जंगल", kannada: "ಕಾಡು", pronunciation: "kaadu" },
    { english: "Jasmine", hindi: "चमेली", kannada: "ಮಲ್ಲಿಗೆ", pronunciation: "mallige" },
  ]},
  { letter: "K", examples: [
    { english: "Kite", hindi: "पतंग", kannada: "ಗಾಳಿಪಟ", pronunciation: "gaalipata" },
    { english: "King", hindi: "राजा", kannada: "ರಾಜ", pronunciation: "raaja" },
    { english: "Key", hindi: "चाबी", kannada: "ಕೀಲಿ", pronunciation: "keeli" },
    { english: "Kitchen", hindi: "रसोई", kannada: "ಅಡುಗೆಮನೆ", pronunciation: "adugemane" },
    { english: "Knife", hindi: "चाकू", kannada: "ಚಾಕು", pronunciation: "chaaku" },
  ]},
  { letter: "L", examples: [
    { english: "Lion", hindi: "शेर", kannada: "ಸಿಂಹ", pronunciation: "simha" },
    { english: "Leaf", hindi: "पत्ता", kannada: "ಎಲೆ", pronunciation: "ele" },
    { english: "Lamp", hindi: "दीया", kannada: "ದೀಪ", pronunciation: "deepa" },
    { english: "Ladder", hindi: "सीढ़ी", kannada: "ಏಣಿ", pronunciation: "eni" },
    { english: "Lemon", hindi: "नींबू", kannada: "ನಿಂಬೆ", pronunciation: "nimbe" },
  ]},
  { letter: "M", examples: [
    { english: "Mango", hindi: "आम", kannada: "ಮಾವಿನಹಣ್ಣು", pronunciation: "maavinahannu" },
    { english: "Moon", hindi: "चाँद", kannada: "ಚಂದ್ರ", pronunciation: "chandra" },
    { english: "Mother", hindi: "माँ", kannada: "ಅಮ್ಮ", pronunciation: "amma" },
    { english: "Milk", hindi: "दूध", kannada: "ಹಾಲು", pronunciation: "haalu" },
    { english: "Monkey", hindi: "बंदर", kannada: "ಮಂಗ", pronunciation: "manga" },
  ]},
  { letter: "N", examples: [
    { english: "Nest", hindi: "घोंसला", kannada: "ಗೂಡು", pronunciation: "goodu" },
    { english: "Nose", hindi: "नाक", kannada: "ಮೂಗು", pronunciation: "moogu" },
    { english: "Night", hindi: "रात", kannada: "ರಾತ್ರಿ", pronunciation: "raatri" },
    { english: "Needle", hindi: "सूई", kannada: "ಸೂಜಿ", pronunciation: "sooji" },
    { english: "Nail", hindi: "नाखून", kannada: "ಉಗುರು", pronunciation: "uguru" },
  ]},
  { letter: "O", examples: [
    { english: "Orange", hindi: "संतरा", kannada: "ಕಿತ್ತಳೆ", pronunciation: "kittale" },
    { english: "Owl", hindi: "उल्लू", kannada: "ಗೂಬೆ", pronunciation: "goobe" },
    { english: "Ox", hindi: "बैल", kannada: "ಎತ್ತು", pronunciation: "ettu" },
    { english: "Oil", hindi: "तेल", kannada: "ಎಣ್ಣೆ", pronunciation: "enne" },
    { english: "Onion", hindi: "प्याज", kannada: "ಈರುಳ್ಳಿ", pronunciation: "eerulli" },
  ]},
  { letter: "P", examples: [
    { english: "Parrot", hindi: "तोता", kannada: "ಗಿಣಿ", pronunciation: "gini" },
    { english: "Pen", hindi: "पेन", kannada: "ಪೆನ್ನು", pronunciation: "pennu" },
    { english: "Potato", hindi: "आलू", kannada: "ಆಲೂಗಡ್ಡೆ", pronunciation: "aalugadde" },
    { english: "Paper", hindi: "कागज़", kannada: "ಕಾಗದ", pronunciation: "kaagada" },
    { english: "Peacock", hindi: "मोर", kannada: "ನವಿಲು", pronunciation: "navilu" },
  ]},
  { letter: "Q", examples: [
    { english: "Queen", hindi: "रानी", kannada: "ರಾಣಿ", pronunciation: "raani" },
    { english: "Question", hindi: "प्रश्न", kannada: "ಪ್ರಶ್ನೆ", pronunciation: "prashne" },
    { english: "Quilt", hindi: "रजाई", kannada: "ರಜಾಯಿ", pronunciation: "rajaayi" },
    { english: "Quiet", hindi: "शांत", kannada: "ಶಾಂತ", pronunciation: "shaanta" },
    { english: "Quarter", hindi: "चौथाई", kannada: "ಕಾಲು ಭಾಗ", pronunciation: "kaalu bhaaga" },
  ]},
  { letter: "R", examples: [
    { english: "Rain", hindi: "बारिश", kannada: "ಮಳೆ", pronunciation: "male" },
    { english: "Rice", hindi: "चावल", kannada: "ಅನ್ನ", pronunciation: "anna" },
    { english: "Rat", hindi: "चूहा", kannada: "ಇಲಿ", pronunciation: "ili" },
    { english: "River", hindi: "नदी", kannada: "ನದಿ", pronunciation: "nadi" },
    { english: "Ring", hindi: "अंगूठी", kannada: "ಉಂಗುರ", pronunciation: "unguru" },
  ]},
  { letter: "S", examples: [
    { english: "Sun", hindi: "सूरज", kannada: "ಸೂರ್ಯ", pronunciation: "soorya" },
    { english: "School", hindi: "स्कूल", kannada: "ಶಾಲೆ", pronunciation: "shaale" },
    { english: "Snake", hindi: "साँप", kannada: "ಹಾವು", pronunciation: "haavu" },
    { english: "Star", hindi: "तारा", kannada: "ನಕ್ಷತ್ರ", pronunciation: "nakshatra" },
    { english: "Shoe", hindi: "जूता", kannada: "ಚಪ್ಪಲಿ", pronunciation: "chappali" },
  ]},
  { letter: "T", examples: [
    { english: "Tree", hindi: "पेड़", kannada: "ಮರ", pronunciation: "mara" },
    { english: "Table", hindi: "मेज़", kannada: "ಮೇಜು", pronunciation: "meju" },
    { english: "Tiger", hindi: "बाघ", kannada: "ಹುಲಿ", pronunciation: "huli" },
    { english: "Train", hindi: "ट्रेन", kannada: "ರೈಲು", pronunciation: "railu" },
    { english: "Teacher", hindi: "शिक्षक", kannada: "ಶಿಕ್ಷಕ", pronunciation: "shikshaka" },
  ]},
  { letter: "U", examples: [
    { english: "Umbrella", hindi: "छाता", kannada: "ಛತ್ರಿ", pronunciation: "chatri" },
    { english: "Uncle", hindi: "चाचा/मामा", kannada: "ಚಿಕ್ಕಪ್ಪ", pronunciation: "chikkappa" },
    { english: "Utensil", hindi: "बर्तन", kannada: "ಪಾತ್ರೆ", pronunciation: "paatre" },
    { english: "Universe", hindi: "ब्रह्मांड", kannada: "ಬ್ರಹ್ಮಾಂಡ", pronunciation: "brahmaanda" },
    { english: "Unity", hindi: "एकता", kannada: "ಒಗ್ಗಟ್ಟು", pronunciation: "oggattu" },
  ]},
  { letter: "V", examples: [
    { english: "Van", hindi: "वैन", kannada: "ವ್ಯಾನ್", pronunciation: "van" },
    { english: "Vegetable", hindi: "सब्ज़ी", kannada: "ತರಕಾರಿ", pronunciation: "tarakaari" },
    { english: "Village", hindi: "गाँव", kannada: "ಹಳ್ಳಿ", pronunciation: "halli" },
    { english: "Violin", hindi: "वायलिन", kannada: "ಪಿಟೀಲು", pronunciation: "piteelu" },
    { english: "Vehicle", hindi: "वाहन", kannada: "ವಾಹನ", pronunciation: "vaahana" },
  ]},
  { letter: "W", examples: [
    { english: "Water", hindi: "पानी", kannada: "ನೀರು", pronunciation: "neeru" },
    { english: "Watch", hindi: "घड़ी", kannada: "ಗಡಿಯಾರ", pronunciation: "gadiyaara" },
    { english: "Window", hindi: "खिड़की", kannada: "ಕಿಟಕಿ", pronunciation: "kitaki" },
    { english: "Wind", hindi: "हवा", kannada: "ಗಾಳಿ", pronunciation: "gaali" },
    { english: "Well", hindi: "कुआँ", kannada: "ಬಾವಿ", pronunciation: "baavi" },
  ]},
  { letter: "X", examples: [
    { english: "Xylophone", hindi: "जाइलोफोन", kannada: "ಕ್ಸೈಲೋಫೋನ್", pronunciation: "xylophone" },
    { english: "X-ray", hindi: "एक्स-रे", kannada: "ಎಕ್ಸ್-ರೇ", pronunciation: "x-ray" },
    { english: "Box", hindi: "डिब्बा", kannada: "ಡಬ್ಬ", pronunciation: "dabba" },
    { english: "Fox", hindi: "लोमड़ी", kannada: "ನರಿ", pronunciation: "nari" },
    { english: "Six", hindi: "छह", kannada: "ಆರು", pronunciation: "aaru" },
  ]},
  { letter: "Y", examples: [
    { english: "Yak", hindi: "याक", kannada: "ಯಾಕ್", pronunciation: "yak" },
    { english: "Yellow", hindi: "पीला", kannada: "ಹಳದಿ", pronunciation: "haladi" },
    { english: "Yarn", hindi: "धागा", kannada: "ನೂಲು", pronunciation: "noolu" },
    { english: "Yogurt", hindi: "दही", kannada: "ಮೊಸರು", pronunciation: "mosaru" },
    { english: "Year", hindi: "साल", kannada: "ವರ್ಷ", pronunciation: "varsha" },
  ]},
  { letter: "Z", examples: [
    { english: "Zebra", hindi: "ज़ेबरा", kannada: "ಜೀಬ್ರಾ", pronunciation: "zebra" },
    { english: "Zoo", hindi: "चिड़ियाघर", kannada: "ಮೃಗಾಲಯ", pronunciation: "mrugaalaya" },
    { english: "Zero", hindi: "शून्य", kannada: "ಸೊನ್ನೆ", pronunciation: "sonne" },
    { english: "Zip", hindi: "ज़िप", kannada: "ಜಿಪ್", pronunciation: "zip" },
    { english: "Zigzag", hindi: "टेढ़ा-मेढ़ा", kannada: "ಅಂಕುಡೊಂಕು", pronunciation: "ankudonku" },
  ]},
];