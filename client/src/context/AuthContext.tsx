import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { LoggedInUser } from '@/features/auth/types';

interface AuthContextValue {
  user: LoggedInUser | null;
  token: string | null;
  isAuthenticated: boolean;
  signIn: (user: LoggedInUser) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const USER_STORAGE_KEY = 'streamcm_user';
const TOKEN_STORAGE_KEY = 'streamcm_auth_token';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<LoggedInUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const rawUser = window.localStorage.getItem(USER_STORAGE_KEY);
    const storedToken = window.localStorage.getItem(TOKEN_STORAGE_KEY);

    if (rawUser && storedToken) {
      try {
        setUser(JSON.parse(rawUser) as LoggedInUser);
        setToken(storedToken);
      } catch {
        localStorage.removeItem(USER_STORAGE_KEY);
        localStorage.removeItem(TOKEN_STORAGE_KEY);
      }
    }
  }, []);

  const signIn = (userData: LoggedInUser) => {
    setUser(userData);
    setToken(userData.token);
    window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
    window.localStorage.setItem(TOKEN_STORAGE_KEY, userData.token);
  };

  const signOut = () => {
    setUser(null);
    setToken(null);
    window.localStorage.removeItem(USER_STORAGE_KEY);
    window.localStorage.removeItem(TOKEN_STORAGE_KEY);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(user && token),
      signIn,
      signOut,
    }),
    [user, token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
}
