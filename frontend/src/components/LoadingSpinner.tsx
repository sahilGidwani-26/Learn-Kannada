import React from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import { Colors } from "../constants/colors";

const LoadingSpinner: React.FC<{ label?: string }> = ({ label }) => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={Colors.primary} />
    {label ? <Text style={styles.label}>{label}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  label: { marginTop: 10, color: Colors.textSecondary },
});

export default LoadingSpinner;
