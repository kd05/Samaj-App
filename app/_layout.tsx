import { AuthProvider } from "@/src/screens/context/AuthContext";
import { colors } from "@/src/theme/colors";
import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "none",
          contentStyle: {
            backgroundColor: colors.background,
          },
        }}
      />
    </AuthProvider>
  );
}
