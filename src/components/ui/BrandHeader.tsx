import { colors } from "@/src/theme/colors";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { BrandMark } from "./BrandMark";

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
        <BrandMark />
        <View>
          <Text style={styles.title}>48 Kadva Patidar</Text>
        </View>
      </View>

      {badgeLabel ? (
        <Pressable
          onPress={onRightPress}
          disabled={!onRightPress}
          style={({ pressed }) => [
            styles.pagePill,
            pressed && onRightPress ? styles.pagePillPressed : null,
          ]}
        >
          <Text style={styles.pagePillText}>{badgeLabel}</Text>
        </Pressable>
      ) : (
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
      )}
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
  title: {
    color: colors.title,
    fontSize: 18,
    fontWeight: "800",
    marginLeft: 12,
  },
  pagePill: {
    minHeight: 36,
    borderRadius: 18,
    paddingHorizontal: 14,
    backgroundColor: colors.softPeach,
    borderWidth: 1,
    borderColor: colors.softPeachBorder,
    alignItems: "center",
    justifyContent: "center",
  },
  pagePillPressed: {
    opacity: 0.86,
  },
  pagePillText: {
    color: colors.primaryEnd,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.1,
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
