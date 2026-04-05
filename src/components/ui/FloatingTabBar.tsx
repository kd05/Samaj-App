import { colors } from "@/src/theme/colors";
import { shadows } from "@/src/theme/shadows";
import { Ionicons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
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
            <TabBarItem key={tab.path} tab={tab} isActive={isActive} />
          );
        })}
      </View>
    </View>
  );
}

function TabBarItem({
  tab,
  isActive,
}: {
  tab: (typeof tabs)[number];
  isActive: boolean;
}) {
  const spin = useRef(new Animated.Value(0)).current;
  const tilt = useRef(new Animated.Value(0)).current;
  const wasActive = useRef(isActive);

  useEffect(() => {
    if (isActive && !wasActive.current) {
      spin.setValue(0);
      tilt.setValue(0);

      Animated.parallel([
        Animated.timing(spin, {
          toValue: 1,
          duration: 420,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(tilt, {
            toValue: 1,
            duration: 140,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.spring(tilt, {
            toValue: 0,
            friction: 5,
            tension: 120,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    }

    wasActive.current = isActive;
  }, [isActive, spin, tilt]);

  const rotate = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const rotateZ = tilt.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-12deg"],
  });

  return (
    <AnimatedPressable
      onPress={() => router.replace(tab.path as never)}
      style={styles.itemWrap}
    >
      <View style={styles.item}>
        <Animated.View style={{ transform: [{ rotate }, { rotateZ }] }}>
          <Ionicons
            name={isActive ? tab.activeIcon : tab.icon}
            size={25}
            color={isActive ? colors.primaryEnd : colors.subtleText}
          />
        </Animated.View>
        {isActive ? <View style={styles.activeUnderline} /> : null}
      </View>
    </AnimatedPressable>
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
    alignSelf: "center",
  },
  activeUnderline: {
    position: "absolute",
    bottom: 1,
    width: 18,
    height: 3,
    borderRadius: 999,
    backgroundColor: colors.primaryEnd,
  },
});
