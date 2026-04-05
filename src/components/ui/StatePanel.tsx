import { colors } from "@/src/theme/colors";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

type StatePanelProps = {
  title: string;
  subtitle: string;
  icon?: React.ComponentProps<typeof Ionicons>["name"];
  loading?: boolean;
};

export function StatePanel({
  title,
  subtitle,
  icon = "information-circle-outline",
  loading = false,
}: StatePanelProps) {
  return (
    <View style={styles.wrap}>
      <View style={styles.iconWrap}>
        {loading ? (
          <ActivityIndicator size="large" color={colors.primaryEnd} />
        ) : (
          <Ionicons name={icon} size={26} color={colors.muted} />
        )}
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    paddingVertical: 38,
    paddingHorizontal: 24,
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.softPeach,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  title: {
    color: colors.title,
    fontSize: 20,
    fontWeight: "800",
  },
  subtitle: {
    color: colors.subtleText,
    fontSize: 14,
    marginTop: 4,
    textAlign: "center",
  },
});
