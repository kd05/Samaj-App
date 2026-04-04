import { colors } from "@/src/theme/colors";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, ViewStyle } from "react-native";
import { AnimatedPressable } from "./AnimatedPressable";

type PrimaryButtonProps = {
  label: string;
  onPress?: () => void;
  style?: ViewStyle;
};

export function PrimaryButton({
  label,
  onPress,
  style,
}: PrimaryButtonProps) {
  return (
    <AnimatedPressable onPress={onPress} style={style}>
      <LinearGradient
        colors={[colors.primaryStart, colors.primaryEnd]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.button}
      >
        <Text style={styles.label}>{label}</Text>
      </LinearGradient>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 54,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  label: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "800",
  },
});
