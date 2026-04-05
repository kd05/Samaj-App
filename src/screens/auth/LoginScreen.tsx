import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_ROUTES } from "@/src/config/api";
import { useAuth } from "@/src/screens/context/AuthContext";
import { colors } from "@/src/theme/colors";
import { shadows } from "@/src/theme/shadows";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
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

const REMEMBER_LOGIN_KEY = "samaj-app:remember-login";
const SAVED_LOGIN_KEY = "samaj-app:saved-login";
const SAVED_PASSWORD_KEY = "samaj-app:saved-password";

export default function LoginScreen() {
  const { setLoggedIn } = useAuth();
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadSavedCredentials = async () => {
      try {
        const [rememberValue, savedLogin, savedPassword] = await Promise.all([
          AsyncStorage.getItem(REMEMBER_LOGIN_KEY),
          AsyncStorage.getItem(SAVED_LOGIN_KEY),
          AsyncStorage.getItem(SAVED_PASSWORD_KEY),
        ]);

        if (!isMounted || rememberValue !== "true") {
          return;
        }

        setRememberMe(true);
        setPhoneOrEmail(savedLogin ?? "");
        setPassword(savedPassword ?? "");
      } catch {
        // Ignore storage read failures and keep login usable.
      }
    };

    loadSavedCredentials();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogin = async () => {
    const login = phoneOrEmail.trim();
    const userPassword = password.trim();

    if (!login || !userPassword) {
      setErrorMessage("Please enter your login and password.");
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage("");

      const response = await fetch(API_ROUTES.login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login,
          password: userPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data?.success) {
        setErrorMessage(data?.message || "Login failed.");
        return;
      }

      if (rememberMe) {
        await Promise.all([
          AsyncStorage.setItem(REMEMBER_LOGIN_KEY, "true"),
          AsyncStorage.setItem(SAVED_LOGIN_KEY, login),
          AsyncStorage.setItem(SAVED_PASSWORD_KEY, userPassword),
        ]);
      } else {
        await Promise.all([
          AsyncStorage.removeItem(REMEMBER_LOGIN_KEY),
          AsyncStorage.removeItem(SAVED_LOGIN_KEY),
          AsyncStorage.removeItem(SAVED_PASSWORD_KEY),
        ]);
      }

      setLoggedIn(true);
      console.log("Login success:", data);

      /**
       * Next step later:
       * - store user data / token
       * - navigate to home/events screen
       */
    } catch (error) {
      console.log("Login API error:", error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
                    placeholderTextColor={colors.muted}
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
                    placeholderTextColor={colors.muted}
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

              <View style={styles.rememberRow}>
                <TouchableOpacity
                  activeOpacity={0.85}
                  style={styles.rememberToggle}
                  onPress={() => setRememberMe((prev) => !prev)}
                >
                  <View style={[styles.checkbox, rememberMe ? styles.checkboxChecked : null]}>
                    {rememberMe ? (
                      <Ionicons name="checkmark" size={14} color={colors.white} />
                    ) : null}
                  </View>
                  <Text style={styles.rememberText}>Remember Me</Text>
                </TouchableOpacity>
              </View>

              {errorMessage ? (
                <Text style={styles.errorText}>{errorMessage}</Text>
              ) : null}

              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.signInButtonOuter}
                onPress={handleLogin}
                disabled={isSubmitting}
              >
                <LinearGradient
                  colors={[colors.primaryStart, colors.primaryEnd]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={styles.signInButton}
                >
                  <Text style={styles.signInText}>
                    {isSubmitting ? "Signing In..." : "Sign In"}
                  </Text>
                  <Ionicons
                    name="arrow-forward"
                    size={22}
                    color={colors.white}
                  />
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.testLinkButton}
                onPress={() => router.push("/members")}
              >
                <Text style={styles.testLinkText}>Open Members Page for Testing</Text>
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
    ...shadows.lifted,
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
    color: colors.subtleText,
    fontWeight: "500",
  },
  formGroup: {
    marginBottom: 22,
  },
  label: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.muted,
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
    color: colors.text,
    paddingVertical: 14,
  },
  rightIconButton: {
    paddingLeft: 8,
    paddingVertical: 4,
  },
  rememberRow: {
    marginTop: -2,
    marginBottom: 18,
  },
  rememberToggle: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: colors.softPeachBorder,
    backgroundColor: colors.inputBg,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: colors.primarySolid,
    borderColor: colors.primarySolid,
  },
  rememberText: {
    color: colors.subtleText,
    fontSize: 14,
    fontWeight: "600",
  },
  signInButtonOuter: {
    marginTop: 6,
    marginBottom: 14,
    borderRadius: 16,
    overflow: "hidden",
    ...shadows.soft,
  },
  testLinkButton: {
    minHeight: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.inputBg,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 26,
  },
  testLinkText: {
    color: colors.subtleText,
    fontSize: 14,
    fontWeight: "700",
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
  errorText: {
    color: colors.danger,
    fontSize: 14,
    fontWeight: "600",
    marginTop: 4,
    marginBottom: 14,
    textAlign: "center",
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
    color: colors.subtleText,
  },
  signupLink: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.link,
  },
});
