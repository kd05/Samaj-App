import { AppScreen } from "@/src/components/ui/AppScreen";
import { BrandHeader } from "@/src/components/ui/BrandHeader";
import { PrimaryButton } from "@/src/components/ui/PrimaryButton";
import { StatePanel } from "@/src/components/ui/StatePanel";
import { useAuth } from "@/src/screens/context/AuthContext";
import { colors } from "@/src/theme/colors";
import { shadows } from "@/src/theme/shadows";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function ProfileScreen() {
  const { setLoggedIn } = useAuth();

  return (
    <AppScreen>
      <BrandHeader badgeLabel="Profile" />
      <View style={styles.card}>
        <StatePanel
          icon="person-outline"
          title="Profile coming soon"
          subtitle="This tab is ready for the future WordPress-powered member account area."
        />
        <PrimaryButton label="Log Out" onPress={() => setLoggedIn(false)} />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 24,
    paddingVertical: 10,
    marginTop: 40,
    ...shadows.soft,
  },
});
