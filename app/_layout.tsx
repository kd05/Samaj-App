import { AuthProvider, useAuth } from "@/src/screens/context/AuthContext";
import { colors } from "@/src/theme/colors";
import { Redirect, Stack, useSegments } from "expo-router";
import React from "react";
import { ActivityIndicator, View } from "react-native";

function AppNavigator() {
  const { isLoading, isLoggedIn } = useAuth();
  const segments = useSegments();
  const isLoginRoute = segments[0] === "login";

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.background,
        }}
      >
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
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "none",
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    />
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
