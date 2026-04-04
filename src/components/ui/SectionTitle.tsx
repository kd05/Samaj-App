import { colors } from "@/src/theme/colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type SectionTitleProps = {
  label: string;
  subtitle?: string;
};

export function SectionTitle({ label, subtitle }: SectionTitleProps) {
  return (
    <View style={styles.wrap}>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      <Text style={styles.title}>{label}</Text>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: 16,
  },
  subtitle: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.8,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  title: {
    color: colors.title,
    fontSize: 28,
    fontWeight: "800",
  },
  line: {
    marginTop: 10,
    width: 68,
    height: 3,
    borderRadius: 999,
    backgroundColor: colors.primaryEnd,
  },
});
