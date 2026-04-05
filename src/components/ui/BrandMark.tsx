import { colors } from "@/src/theme/colors";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type BrandMarkProps = {
  size?: number;
};

export function BrandMark({ size = 48 }: BrandMarkProps) {
  return (
    <LinearGradient
      colors={["#2C1A14", "#17100E"]}
      start={{ x: 0.1, y: 0 }}
      end={{ x: 0.9, y: 1 }}
      style={[
        styles.shell,
        {
          width: size,
          height: size,
          borderRadius: size * 0.3,
        },
      ]}
    >
      <View
        style={[
          styles.innerPlate,
          {
            borderRadius: size * 0.24,
          },
        ]}
      >
        <View style={styles.markRow}>
          <View style={styles.fourWrap}>
            <Text style={[styles.fourShadow, { fontSize: size * 0.42, lineHeight: size * 0.42 }]}>4</Text>
            <Text style={[styles.four, { fontSize: size * 0.42, lineHeight: size * 0.42 }]}>4</Text>
          </View>
          <View style={styles.eightWrap}>
            <Text style={[styles.eightShadow, { fontSize: size * 0.42, lineHeight: size * 0.42 }]}>8</Text>
            <Text style={[styles.eight, { fontSize: size * 0.42, lineHeight: size * 0.42 }]}>8</Text>
          </View>
        </View>
        <View style={styles.underline} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  shell: {
    padding: 2.5,
    borderWidth: 1,
    borderColor: "rgba(242,154,74,0.18)",
    shadowColor: colors.shadowWarm,
    shadowOpacity: 0.1,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  innerPlate: {
    flex: 1,
    borderWidth: 1,
    borderColor: "rgba(242,154,74,0.12)",
    backgroundColor: "#15100E",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  markRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  fourWrap: {
    position: "relative",
    marginRight: 1,
  },
  eightWrap: {
    position: "relative",
  },
  fourShadow: {
    position: "absolute",
    top: 1.5,
    left: 1.5,
    color: "rgba(242,154,74,0.18)",
    fontWeight: "900",
    letterSpacing: -1.2,
  },
  four: {
    color: "#F7E7D3",
    fontWeight: "900",
    letterSpacing: -1.2,
  },
  eightShadow: {
    position: "absolute",
    top: 1.5,
    left: 1.5,
    color: "rgba(247,231,211,0.12)",
    fontWeight: "900",
    fontStyle: "italic",
    letterSpacing: -1.1,
  },
  eight: {
    color: colors.primaryEnd,
    fontWeight: "900",
    fontStyle: "italic",
    letterSpacing: -1.1,
  },
  underline: {
    width: 18,
    height: 3,
    borderRadius: 999,
    color: colors.primaryEnd,
    backgroundColor: colors.primaryEnd,
    marginTop: 3,
    opacity: 0.92,
  },
});
