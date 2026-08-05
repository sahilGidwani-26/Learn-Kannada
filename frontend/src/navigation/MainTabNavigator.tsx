import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import { Colors } from "../constants/colors";
import HomeScreen from "../screens/HomeScreen";
import AlphabetsScreen from "../screens/AlphabetsScreen";
import AITeacherScreen from "../screens/AITeacherScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const icons: Record<string, string> = {
  Home: "🏠",
  Learn: "ಅ",
  Teacher: "🤖",
  Profile: "👤",
};

const MainTabNavigator: React.FC = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: Colors.primary,
      tabBarInactiveTintColor: Colors.textSecondary,
      tabBarIcon: () => <Text style={{ fontSize: 18 }}>{icons[route.name]}</Text>,
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Learn" component={AlphabetsScreen} />
    <Tab.Screen name="Teacher" component={AITeacherScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

export default MainTabNavigator;
