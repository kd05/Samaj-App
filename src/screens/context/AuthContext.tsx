import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type AuthContextValue = {
  isLoading: boolean;
  isLoggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const AUTH_STORAGE_KEY = "samaj-app:is-logged-in";

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadAuthState = async () => {
      try {
        const storedValue = await AsyncStorage.getItem(AUTH_STORAGE_KEY);

        if (isMounted) {
          setIsLoggedIn(storedValue === "true");
        }
      } catch {
        if (isMounted) {
          setIsLoggedIn(false);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadAuthState();

    return () => {
      isMounted = false;
    };
  }, []);

  const setLoggedIn = useCallback((value: boolean) => {
    setIsLoggedIn(value);
    AsyncStorage.setItem(AUTH_STORAGE_KEY, value ? "true" : "false").catch(() => {
      // Keep auth usable even if persistence fails.
    });
  }, []);

  const value = useMemo(
    () => ({
      isLoading,
      isLoggedIn,
      setLoggedIn,
    }),
    [isLoading, isLoggedIn, setLoggedIn]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
