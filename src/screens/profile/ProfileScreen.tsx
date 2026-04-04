import { AppScreen } from "@/src/components/ui/AppScreen";
import { BrandHeader } from "@/src/components/ui/BrandHeader";
import { PrimaryButton } from "@/src/components/ui/PrimaryButton";
import { colors } from "@/src/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {
  return (
    <AppScreen>
      <BrandHeader badgeLabel="Profile" />
      <View style={styles.card}>
        <View style={styles.avatar}>
          <Ionicons name="person-outline" size={34} color={colors.primaryEnd} />
        </View>
        <Text style={styles.title}>Profile coming soon</Text>
        <Text style={styles.text}>
          This tab is ready for the future WordPress-powered member account area.
        </Text>
        <PrimaryButton label="Coming Soon" />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 24,
    alignItems: "center",
    marginTop: 40,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface,
    marginBottom: 18,
  },
  title: {
    color: colors.title,
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 10,
  },
  text: {
    color: colors.subtleText,
    textAlign: "center",
    lineHeight: 22,
    fontSize: 15,
    marginBottom: 20,
  },
});
