import React, { createContext, useContext, useMemo, useState } from "react";

type AuthContextValue = {
  isLoading: boolean;
  isLoggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const value = useMemo(
    () => ({
      isLoading,
      isLoggedIn,
      setLoggedIn: setIsLoggedIn,
    }),
    [isLoading, isLoggedIn]
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
