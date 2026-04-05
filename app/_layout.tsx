import { AuthProvider, useAuth } from "@/src/screens/context/AuthContext";
import { FloatingTabBar } from "@/src/components/ui/FloatingTabBar";
import { MAIN_TAB_ROUTES } from "@/src/config/navigation";
import { colors } from "@/src/theme/colors";
import { Redirect, Stack, usePathname, useSegments } from "expo-router";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

function AppNavigator() {
  const { isLoading, isLoggedIn } = useAuth();
  const segments = useSegments();
  const pathname = usePathname();
  const isLoginRoute = segments[0] === "login";
  const showTabBar = isLoggedIn && MAIN_TAB_ROUTES.includes(pathname as (typeof MAIN_TAB_ROUTES)[number]);

  if (isLoading) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size="large" color={colors.primaryEnd} />
      </View>
    );
  }

  if (!isLoggedIn && !isLoginRoute) {
    return <Redirect href="/login" />;
  }

  if (isLoggedIn && isLoginRoute) {
    return <Redirect href="/home" />;
  }

  return (
    <View style={styles.appShell}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "none",
          contentStyle: {
            backgroundColor: colors.background,
          },
        }}
      />
      {showTabBar ? <FloatingTabBar /> : null}
    </View>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  appShell: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
});
