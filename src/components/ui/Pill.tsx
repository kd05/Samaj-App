import { colors } from "@/src/theme/colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type PillProps = {
  label: string;
  inverse?: boolean;
};

export function Pill({ label, inverse = false }: PillProps) {
  return (
    <View style={[styles.pill, inverse ? styles.inverse : null]}>
      <Text style={[styles.label, inverse ? styles.inverseLabel : null]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: "flex-start",
    backgroundColor: colors.softPeach,
  },
  inverse: {
    backgroundColor: colors.badge,
  },
  label: {
    color: colors.primarySolid,
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  inverseLabel: {
    color: colors.white,
  },
});
