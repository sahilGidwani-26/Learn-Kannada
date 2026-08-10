import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types";
import { useAuth } from "../context/AuthContext";

import SplashScreen from "../screens/SplashScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import MainTabNavigator from "./MainTabNavigator";
import AlphabetsScreen from "../screens/AlphabetsScreen";
import NumbersScreen from "../screens/NumbersScreen";
import WordsScreen from "../screens/WordsScreen";
import CameraScannerScreen from "../screens/CameraScannerScreen";
import PdfScanScreen from "../screens/PdfScanScreen";
import ScannerResultScreen from "../screens/ScannerResultScreen";
import AITeacherScreen from "../screens/AITeacherScreen";
import VoiceTranslatorScreen from "../screens/VoiceTranslatorScreen";
import QuizScreen from "../screens/QuizScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

// The stack's initialRouteName is picked based on whether a user is logged in.
// Because this whole component re-renders whenever `user` changes (login or logout),
// React Navigation resets to the correct starting screen automatically - no manual
// navigate/reset calls needed anywhere else in the app.
const AppNavigator: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    // Auth state is still being read from storage - show the splash screen only,
    // without deciding the initial route yet.
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={user ? "MainTabs" : "Onboarding"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="MainTabs" component={MainTabNavigator} />

        {/* Also reachable directly from the Home dashboard tiles */}
        <Stack.Screen name="Alphabets" component={AlphabetsScreen} options={{ headerShown: true, title: "Alphabets" }} />
        <Stack.Screen name="Numbers" component={NumbersScreen} options={{ headerShown: true, title: "Numbers" }} />
        <Stack.Screen name="Words" component={WordsScreen} options={{ headerShown: true, title: "Words" }} />
        <Stack.Screen name="CameraScanner" component={CameraScannerScreen} options={{ headerShown: true, title: "Scan Text" }} />
        <Stack.Screen name="PdfScan" component={PdfScanScreen} options={{ headerShown: true, title: "PDF Scan" }} />
        <Stack.Screen name="ScannerResult" component={ScannerResultScreen} options={{ headerShown: true, title: "Result" }} />
        <Stack.Screen name="AITeacher" component={AITeacherScreen} options={{ headerShown: true, title: "AI Teacher" }} />
        <Stack.Screen name="VoiceTranslator" component={VoiceTranslatorScreen} options={{ headerShown: true, title: "Voice Translator" }} />
        <Stack.Screen name="Quiz" component={QuizScreen} options={{ headerShown: true, title: "Quiz" }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: true, title: "Profile" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;