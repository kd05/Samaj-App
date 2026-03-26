import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../theme/colors";

export default function LoginScreen() {
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardWrap}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.page}>
            <View style={styles.card}>
              <View style={styles.headerBlock}>
                <Text style={styles.title}>48 Kadva Patidar</Text>
                <Text style={styles.subtitle}>
                  Access your community portal
                </Text>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>PHONE OR EMAIL</Text>
                <View style={styles.inputWrap}>
                  <MaterialIcons
                    name="person"
                    size={20}
                    color={colors.inputIcon}
                    style={styles.leftIcon}
                  />
                  <TextInput
                    value={phoneOrEmail}
                    onChangeText={setPhoneOrEmail}
                    placeholder="Enter your registered ID"
                    placeholderTextColor="#B9B6B1"
                    style={styles.input}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                </View>
              </View>

              <View style={styles.formGroup}>
                <View style={styles.passwordLabelRow}>
                  <Text style={styles.label}>PASSWORD</Text>
                  <TouchableOpacity activeOpacity={0.8}>
                    <Text style={styles.forgotText}>Forgot Password?</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.inputWrap}>
                  <MaterialIcons
                    name="lock"
                    size={20}
                    color={colors.inputIcon}
                    style={styles.leftIcon}
                  />
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="••••••••"
                    placeholderTextColor="#B9B6B1"
                    secureTextEntry={!showPassword}
                    style={styles.input}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword((prev) => !prev)}
                    activeOpacity={0.8}
                    style={styles.rightIconButton}
                  >
                    <Feather
                      name={showPassword ? "eye-off" : "eye"}
                      size={20}
                      color={colors.inputIcon}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.signInButtonOuter}
              >
                <LinearGradient
                  colors={[colors.primaryStart, colors.primaryEnd]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={styles.signInButton}
                >
                  <Text style={styles.signInText}>Sign In</Text>
                  <Ionicons
                    name="arrow-forward"
                    size={22}
                    color={colors.white}
                  />
                </LinearGradient>
              </TouchableOpacity>

              {/* <View style={styles.dividerRow}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
                <View style={styles.dividerLine} />
              </View>

              <View style={styles.altButtonsRow}>
                <TouchableOpacity style={styles.altButton} activeOpacity={0.8}>
                  <Ionicons name="logo-google" size={18} color="#5B3A1C" />
                  <Text style={styles.altButtonText}>Google</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.altButton} activeOpacity={0.8}>
                  <MaterialIcons name="smartphone" size={18} color="#5B3A1C" />
                  <Text style={styles.altButtonText}>OTP</Text>
                </TouchableOpacity>
              </View> */}

              <View style={styles.signupRow}>
                <Text style={styles.signupText}>
                  Don&apos;t have an account?{" "}
                </Text>
                <TouchableOpacity activeOpacity={0.8}>
                  <Text style={styles.signupLink}>Sign up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardWrap: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  page: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 28,
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 34,
    paddingBottom: 28,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  headerBlock: {
    alignItems: "center",
    marginBottom: 28,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.heading,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#5F5D58",
    fontWeight: "500",
  },
  formGroup: {
    marginBottom: 22,
  },
  label: {
    fontSize: 12,
    fontWeight: "800",
    color: "#6C4A27",
    letterSpacing: 1.2,
    marginBottom: 10,
  },
  passwordLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  forgotText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.link,
  },
  inputWrap: {
    minHeight: 58,
    backgroundColor: colors.inputBg,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },
  leftIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#4B4036",
    paddingVertical: 14,
  },
  rightIconButton: {
    paddingLeft: 8,
    paddingVertical: 4,
  },
  signInButtonOuter: {
    marginTop: 6,
    marginBottom: 26,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#C45A12",
    shadowOpacity: 0.28,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
  signInButton: {
    minHeight: 64,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  signInText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "800",
    marginRight: 6,
  },
  // dividerRow: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   marginBottom: 24,
  // },
  // dividerLine: {
  //   flex: 1,
  //   height: 1,
  //   backgroundColor: colors.border,
  // },
  // dividerText: {
  //   marginHorizontal: 12,
  //   fontSize: 11,
  //   fontWeight: "700",
  //   color: colors.muted,
  //   letterSpacing: 1,
  // },
  // altButtonsRow: {
  //   flexDirection: "row",
  //   gap: 12,
  //   marginBottom: 26,
  // },
  // altButton: {
  //   flex: 1,
  //   minHeight: 56,
  //   borderRadius: 14,
  //   backgroundColor: colors.inputBg,
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   gap: 8,
  // },
  // altButtonText: {
  //   fontSize: 16,
  //   fontWeight: "600",
  //   color: "#5B3A1C",
  // },
  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    fontSize: 16,
    color: "#5F5D58",
  },
  signupLink: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.link,
  },
});
