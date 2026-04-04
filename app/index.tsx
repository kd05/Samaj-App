import { useAuth } from "@/src/screens/context/AuthContext";
import { Redirect } from "expo-router";
import React from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const { isLoading, isLoggedIn } = useAuth();

  if (!isLoading) {
    return <Redirect href={isLoggedIn ? "/home" : "/login"} />;
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator size="large" />
    </View>
  );
}
