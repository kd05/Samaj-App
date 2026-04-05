import { colors } from "@/src/theme/colors";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  View,
  type ScrollViewProps,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FloatingTabBar } from "./FloatingTabBar";

type AppScreenProps = ScrollViewProps & {
  children: React.ReactNode;
  withTabBar?: boolean;
};

export function AppScreen({
  children,
  contentContainerStyle,
  withTabBar = true,
  ...props
}: AppScreenProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, translateY]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View style={[styles.page, { opacity, transform: [{ translateY }] }]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.content, contentContainerStyle]}
          {...props}
        >
          <View style={styles.inner}>{children}</View>
        </ScrollView>
      </Animated.View>
      {withTabBar ? <FloatingTabBar /> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  page: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingBottom: 112,
  },
  inner: {
    paddingHorizontal: 20,
  },
});
