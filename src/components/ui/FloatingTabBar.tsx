import { TAB_ITEMS } from "@/src/config/navigation";
import { colors } from "@/src/theme/colors";
import { shadows } from "@/src/theme/shadows";
import { Ionicons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import React, { useCallback, useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AnimatedPressable } from "./AnimatedPressable";

export function FloatingTabBar() {
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[styles.outer, { bottom: Math.max(insets.bottom, 10) + 8, pointerEvents: "box-none" }]}
    >
      <View style={styles.bar}>
        {TAB_ITEMS.map((tab) => {
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
  tab: (typeof TAB_ITEMS)[number];
  isActive: boolean;
}) {
  const bounce = useRef(new Animated.Value(0)).current;
  const tilt = useRef(new Animated.Value(0)).current;
  const wasActive = useRef(isActive);

  const playIconAnimation = useCallback(() => {
    bounce.setValue(0);
    tilt.setValue(0);

    Animated.parallel([
      Animated.sequence([
        Animated.timing(bounce, {
          toValue: 1,
          duration: 120,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.spring(bounce, {
          toValue: 0,
          friction: 4,
          tension: 150,
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.timing(tilt, {
          toValue: 1,
          duration: 100,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.spring(tilt, {
          toValue: 0,
          friction: 5,
          tension: 140,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [bounce, tilt]);

  useEffect(() => {
    if (isActive && !wasActive.current) {
      playIconAnimation();
    }

    wasActive.current = isActive;
  }, [isActive, playIconAnimation]);

  const translateY = bounce.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -6],
  });

  const scale = bounce.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.12],
  });

  const rotateZ = tilt.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-10deg"],
  });

  return (
    <AnimatedPressable
      onPress={() => router.navigate(tab.path as never)}
      onPressIn={playIconAnimation}
      style={styles.itemWrap}
    >
      <View style={styles.item}>
        <Animated.View style={{ transform: [{ translateY }, { scale }, { rotateZ }] }}>
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
