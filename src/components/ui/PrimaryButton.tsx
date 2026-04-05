import { colors } from "@/src/theme/colors";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, ViewStyle } from "react-native";
import { AnimatedPressable } from "./AnimatedPressable";

type PrimaryButtonProps = {
  label: string;
  onPress?: () => void;
  style?: ViewStyle;
  disabled?: boolean;
};

export function PrimaryButton({
  label,
  onPress,
  style,
  disabled = false,
}: PrimaryButtonProps) {
  return (
    <AnimatedPressable onPress={onPress} style={style} disabled={disabled}>
      <LinearGradient
        colors={
          disabled
            ? [colors.softPeachBorder, colors.border]
            : [colors.primaryStart, colors.primaryEnd]
        }
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={[styles.button, disabled ? styles.buttonDisabled : null]}
      >
        <Text style={[styles.label, disabled ? styles.labelDisabled : null]}>{label}</Text>
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
  buttonDisabled: {
    opacity: 0.7,
  },
  label: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "800",
  },
  labelDisabled: {
    color: colors.muted,
  },
});
