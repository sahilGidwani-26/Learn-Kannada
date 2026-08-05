# Kannada Buddy — Starter Codebase

Yeh project ka **Phase 1 + Phase 2 core foundation** hai (Auth, Home Dashboard, Alphabets/Numbers/Words,
Camera OCR Scan, AI Teacher, Quiz) — asli, chalne wala code, jisme aap baaki modules (Games, Rewards,
Parent Dashboard, Offline Mode) khud add kar sakte ho.

```
kannada-buddy/
├── backend/     → Node.js + Express + MongoDB + Groq AI + OCR API
└── frontend/    → React Native + TypeScript mobile app
```

---

## ⚠️ Zaroori baat (please pehle padhein)

- **Backend** yahan Node.js hai — `npm install` karke turant chalega, koi dikkat nahi.
- **Frontend** React Native hai. React Native app sirf `npm install` se nahi chalti — usko
  **Android Studio (Android ke liye) ya Xcode (iOS/Mac ke liye)** chahiye hoti hai, kyunki isme
  native camera/voice modules hain. Neeche pura setup diya hai.
- Games, Parent Dashboard, Offline Mode, Rewards jaise modules abhi **iske andar nahi hain** —
  in dev-phase mein wo agla step hai. Jo abhi hai wo asli, working code hai — dummy nahi.

---

## 1️⃣ Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

`.env` file kholo aur fill karo:

| Variable | Kahan se milega |
|---|---|
| `MONGO_URI` | MongoDB Atlas (free) — https://www.mongodb.com/cloud/atlas ya local MongoDB |
| `JWT_SECRET` | Koi bhi random lamba string daal do |
| `GROQ_API_KEY` | https://console.groq.com — free account bana ke API key generate karo |
| `GOOGLE_VISION_API_KEY` | *(optional)* — nahi doge to app apne aap Tesseract.js (free OCR) use karega |

Phir:

```bash
npm run seed     # Kannada alphabets/numbers/words ka sample data DB mein daal dega
npm run dev       # Server chalu ho jayega http://localhost:5000
```

Test karo browser mein: `http://localhost:5000` → `{"success":true,"message":"Kannada Buddy API is running"}`

### Backend ready hai:
- ✅ Register/Login (JWT auth)
- ✅ Alphabets, Numbers, Words APIs (real DB data)
- ✅ Camera Scan → OCR → Groq AI translation+explanation (`/api/ocr/scan`)
- ✅ AI Teacher chat (`/api/ai/teacher`)
- ✅ Quiz submit with XP/Coins rewards (`/api/quiz/submit`)
- ✅ Progress tracking, History

---

## 2️⃣ Frontend Setup (Expo — no Android Studio/Xcode needed)

Bas Node.js aur phone mein **Expo Go** app chahiye (Play Store / App Store se free install karo).

```bash
cd frontend
npm install
```

`src/services/api.ts` kholo aur ye line badlo — apne computer ka **LAN IP** daalo
(phone aur computer dono ek hi Wi-Fi par hone chahiye):

```ts
export const API_BASE_URL = "http://192.168.1.42:5000/api"; // apna IP daalo
```

LAN IP nikalne ka tareeka:
- **Windows:** `ipconfig` → "IPv4 Address" dekho
- **Mac:** `ipconfig getifaddr en0`
- **Linux:** `hostname -I`

Ab chalao:

```bash
npx expo start
```

Terminal mein ek **QR code** dikhega:
- **Android** → Expo Go app kholo → "Scan QR Code" se scan karo
- **iOS** → phone ke normal Camera app se QR scan karo, "Open in Expo Go" dabao

App turant phone par khul jayega — koi build/compile wait nahi, koi cable/USB bhi nahi chahiye
(bas same Wi-Fi hona chahiye).

> Backend bhi isi computer par chal raha ho tab hi phone usse connect ho payega
> (dono chalu rakho: ek terminal mein `npm run dev` backend ka, doosre mein `npx expo start`).

### Camera & permissions
Camera permission `expo-camera` khud maang leta hai jab aap Camera Scan screen kholte ho —
koi manual native config nahi karni. `app.json` mein permissions already set hain.

---

## 3️⃣ Kya kaam kar raha hai abhi (test kar sakte ho)

1. App khulega → Onboarding → Register/Login
2. Home dashboard → Alphabets/Numbers/Words dekh sakte ho (real DB se)
3. Camera Scan → photo kheecho → OCR + AI translation + explanation aayega
4. AI Teacher → koi bhi Kannada question poocho, Groq AI jawab dega
5. Quiz → letter quiz khelo → XP/Coins milenge

## 4️⃣ Aage kya add karna hai (roadmap already docs mein hai)

- Writing Practice (stroke detection)
- Games (Balloon Pop, Memory, Matching)
- Daily Challenge + Rewards screen
- Parent Dashboard
- Offline Mode (AsyncStorage caching)
- Live Camera Translation (frame-by-frame OCR overlay)

Har naya module isi structure follow kare: backend mein model+controller+route, frontend mein
screen+service — phir `AppNavigator.tsx` mein register kar do.

---

## Kisi bhi step mein atko to

- Backend na chale → `.env` check karo (MONGO_URI sahi hai? MongoDB chal raha hai?)
- Frontend build error → `npx react-native doctor` chalao, missing cheez dikha dega
- AI response na aaye → GROQ_API_KEY check karo `.env` mein
