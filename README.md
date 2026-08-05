# Kannada Buddy — Starter Codebase

This project provides the **Phase 1 + Phase 2 core foundation** of the Kannada Buddy mobile application. It includes Authentication, Home Dashboard, Kannada Alphabets, Numbers, Words, Camera OCR Scan, AI Teacher, and Quiz modules.

This is a **fully functional starter project**, not a dummy prototype. You can extend it by adding additional features such as Games, Rewards, Parent Dashboard, Offline Mode, and more.

```
kannada-buddy/
├── backend/     → Node.js + Express + MongoDB + Groq AI + OCR API
└── frontend/    → React Native + TypeScript (Expo)
```

---

# Important Information

Before setting up the project, please read the following:

- The **backend** is built using **Node.js and Express**, so it can be started immediately after installing dependencies.
- The **frontend** is built using **React Native with Expo**, allowing you to run the application directly on your mobile device using the Expo Go app.
- Features such as **Games**, **Parent Dashboard**, **Rewards**, and **Offline Mode** are not included in this starter project. They are planned for future development.
- Everything included in this repository is fully functional and serves as a solid production-ready foundation.

---

# Backend Setup

Navigate to the backend folder:

```bash
cd backend
npm install
cp .env.example .env
```

Open the `.env` file and configure the following variables.

| Variable | Description |
|----------|-------------|
| `MONGO_URI` | MongoDB Atlas connection string or local MongoDB URI |
| `JWT_SECRET` | Any long random string for JWT authentication |
| `GROQ_API_KEY` | Generate a free API key from https://console.groq.com |
| `GOOGLE_VISION_API_KEY` | Optional. If omitted, the application automatically uses Tesseract.js for OCR |

After updating the environment variables, run:

```bash
npm run seed
npm run dev
```

The backend server will start on:

```
http://localhost:5000
```

Open the above URL in your browser.

Expected response:

```json
{
  "success": true,
  "message": "Kannada Buddy API is running"
}
```

---

# Backend Features

The backend currently includes:

- User Registration
- User Login
- JWT Authentication
- Kannada Alphabets API
- Numbers API
- Words API
- Camera OCR Processing
- OCR Text Recognition
- AI Translation and Explanation using Groq
- AI Teacher Chat API
- Quiz Submission
- XP and Coins Reward System
- Learning Progress Tracking
- Scan History

---

# Frontend Setup (Expo)

Navigate to the frontend folder.

```bash
cd frontend
npm install
```

Open the following file:

```
src/services/api.ts
```

Replace the API URL with your computer's Local Area Network (LAN) IP address.

Example:

```ts
export const API_BASE_URL = "http://192.168.1.42:5000/api";
```

**Important:** Your mobile device and your computer must be connected to the same Wi-Fi network.

### Find Your Local IP Address

**Windows**

```bash
ipconfig
```

Look for the **IPv4 Address**.

**macOS**

```bash
ipconfig getifaddr en0
```

**Linux**

```bash
hostname -I
```

Start the Expo development server:

```bash
npx expo start
```

A QR code will appear in the terminal.

### Running the Application

#### Android

1. Install **Expo Go** from the Google Play Store.
2. Open Expo Go.
3. Tap **Scan QR Code**.
4. Scan the QR code displayed in the terminal.

#### iPhone (iOS)

1. Install **Expo Go** from the App Store.
2. Open the Camera app.
3. Scan the QR code.
4. Tap **Open in Expo Go**.

The application will launch directly on your mobile device.

No USB cable or manual build process is required.

> Make sure both the backend server (`npm run dev`) and the Expo development server (`npx expo start`) are running simultaneously.

---

# Camera Permissions

The application uses the **expo-camera** package.

When the Camera Scan screen is opened for the first time, Expo automatically requests camera permission.

No additional native configuration is required because the necessary permissions are already configured in `app.json`.

---

# Features Available

After setup, you can test the following features:

### Authentication

- User Registration
- User Login
- Secure JWT Authentication

### Learning Dashboard

- Kannada Alphabets
- Kannada Numbers
- Kannada Words

All learning content is loaded from MongoDB.

### Camera OCR

- Capture an image.
- Detect Kannada text using OCR.
- Receive AI-powered translation.
- Receive AI-generated explanation.

### AI Teacher

Ask any Kannada learning question and receive responses generated using Groq AI.

### Quiz

- Attempt Kannada quizzes.
- Earn XP.
- Earn Coins.
- Track learning progress.

---

# Project Structure

## Backend

```
backend/
│
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── utils/
├── seed/
├── app.js
└── server.js
```

## Frontend

```
frontend/
│
├── src/
│   ├── components/
│   ├── navigation/
│   ├── screens/
│   ├── services/
│   ├── hooks/
│   ├── utils/
│   ├── context/
│   ├── assets/
│   └── types/
│
├── App.tsx
└── app.json
```

---

# Future Development Roadmap

The following features are planned for future releases:

- Writing Practice with Stroke Detection
- Balloon Pop Learning Game
- Memory Matching Game
- Letter Matching Activities
- Daily Challenges
- Rewards and Achievement System
- Parent Dashboard
- Offline Learning Mode using AsyncStorage
- Live Camera Translation
- Real-Time OCR Overlay
- Voice Pronunciation Practice
- Progress Analytics
- Learning Streaks
- Push Notifications

Every new module should follow the existing architecture.

### Backend

- Model
- Controller
- Route

### Frontend

- Screen
- Service

Finally, register the screen inside:

```
AppNavigator.tsx
```

---

# Troubleshooting

## Backend is not starting

- Verify that `MONGO_URI` is correct.
- Ensure MongoDB Atlas or Local MongoDB is running.
- Confirm all required environment variables are present.

---

## Frontend cannot connect to the backend

- Ensure both devices are connected to the same Wi-Fi network.
- Verify that the correct LAN IP address is used in `src/services/api.ts`.
- Make sure the backend server is running.

---

## Camera is not working

- Grant camera permission when prompted.
- Restart Expo if permissions were denied previously.

---

## OCR is not detecting text

- Capture a clear image.
- Ensure good lighting.
- Use high-resolution images for better recognition.

---

## AI responses are not working

- Verify that `GROQ_API_KEY` is correctly configured in the `.env` file.
- Restart the backend after updating the environment variables.

---

# Technology Stack

### Frontend

- React Native
- Expo
- TypeScript
- React Navigation
- Axios
- Expo Camera

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Groq AI API
- Google Vision API (Optional)
- Tesseract.js OCR

---

# License

This project is intended for educational and learning purposes. You are free to modify, extend, and customize it according to your project requirements.

---

**Happy Coding! 🚀**
**Kannada Buddy – Learn Kannada Smartly with AI.**