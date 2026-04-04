import { colors } from "@/src/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type BrandHeaderProps = {
  badgeLabel?: string;
  rightLabel?: string;
  onRightPress?: () => void;
};

export function BrandHeader({
  badgeLabel,
  rightLabel = "RP",
  onRightPress,
}: BrandHeaderProps) {
  return (
    <View style={styles.row}>
      <View style={styles.brandWrap}>
        <View style={styles.logoCircle}>
          <Ionicons name="flower-outline" size={18} color={colors.primarySolid} />
        </View>
        <View>
          <Text style={styles.title}>48 Kadva Patidar</Text>
          {badgeLabel ? <Text style={styles.badge}>{badgeLabel}</Text> : null}
        </View>
      </View>

      <Pressable
        onPress={onRightPress}
        disabled={!onRightPress}
        style={({ pressed }) => [
          styles.avatar,
          pressed && onRightPress ? styles.avatarPressed : null,
        ]}
      >
        <Text style={styles.avatarText}>{rightLabel}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 18,
  },
  brandWrap: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 12,
  },
  logoCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.softPeach,
    borderWidth: 1,
    borderColor: colors.softPeachBorder,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  title: {
    color: colors.title,
    fontSize: 18,
    fontWeight: "800",
  },
  badge: {
    marginTop: 2,
    color: colors.link,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.softPeach,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarPressed: {
    opacity: 0.85,
  },
  avatarText: {
    color: colors.primarySolid,
    fontWeight: "800",
    fontSize: 12,
  },
});
