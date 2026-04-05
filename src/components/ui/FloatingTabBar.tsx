import { colors } from "@/src/theme/colors";
import { shadows } from "@/src/theme/shadows";
import { Ionicons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AnimatedPressable } from "./AnimatedPressable";

type TabIconName = React.ComponentProps<typeof Ionicons>["name"];

const tabs: {
  label: string;
  icon: TabIconName;
  activeIcon: TabIconName;
  path: "/home" | "/events" | "/members" | "/profile";
}[] = [
  { label: "Home", icon: "home-outline", activeIcon: "home", path: "/home" },
  { label: "Events", icon: "calendar-outline", activeIcon: "calendar", path: "/events" },
  { label: "Members", icon: "people-outline", activeIcon: "people", path: "/members" },
  { label: "Profile", icon: "person-outline", activeIcon: "person", path: "/profile" },
];

export function FloatingTabBar() {
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[styles.outer, { bottom: Math.max(insets.bottom, 10) + 8, pointerEvents: "box-none" }]}
    >
      <View style={styles.bar}>
        {tabs.map((tab) => {
          const isActive = pathname === tab.path;

          return (
            <AnimatedPressable
              key={tab.path}
              onPress={() => router.replace(tab.path as never)}
              style={styles.itemWrap}
            >
              <View style={[styles.item, isActive ? styles.itemActive : null]}>
                {isActive ? <View style={styles.activeGlow} /> : null}
                <Ionicons
                  name={isActive ? tab.activeIcon : tab.icon}
                  size={25}
                  color={isActive ? colors.primaryEnd : colors.subtleText}
                />
              </View>
            </AnimatedPressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    position: "absolute",
    left: 20,
    right: 20,
    alignItems: "center",
    zIndex: 200,
    elevation: 20,
  },
  bar: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.tabBar,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.tabBarBorder,
    paddingHorizontal: 8,
    paddingVertical: 7,
    ...shadows.soft,
  },
  itemWrap: {
    flex: 1,
    marginHorizontal: 2,
  },
  item: {
    width: 42,
    minHeight: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 21,
    paddingVertical: 0,
    overflow: "hidden",
    alignSelf: "center",
  },
  itemActive: {
    backgroundColor: colors.activeTab,
  },
  activeGlow: {
    position: "absolute",
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(242,154,74,0.12)",
  },
});
