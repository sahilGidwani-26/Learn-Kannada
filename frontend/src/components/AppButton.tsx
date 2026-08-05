import React from "react";
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle } from "react-native";
import { Colors } from "../constants/colors";

interface Props {
  title: string;
  onPress: () => void;
  loading?: boolean;
  variant?: "primary" | "outline";
  style?: ViewStyle;
  disabled?: boolean;
}

const AppButton: React.FC<Props> = ({ title, onPress, loading, variant = "primary", style, disabled }) => {
  const isOutline = variant === "outline";
  return (
    <TouchableOpacity
      style={[
        styles.base,
        isOutline ? styles.outline : styles.primary,
        (disabled || loading) && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={isOutline ? Colors.primary : "#fff"} />
      ) : (
        <Text style={[styles.text, isOutline && { color: Colors.primary }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  primary: { backgroundColor: Colors.primary },
  outline: { backgroundColor: "transparent", borderWidth: 1.5, borderColor: Colors.primary },
  disabled: { opacity: 0.6 },
  text: { color: "#fff", fontSize: 16, fontWeight: "600" },
});

export default AppButton;
