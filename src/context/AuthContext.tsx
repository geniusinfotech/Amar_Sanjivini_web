"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useRef,
} from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { AxiosRequestConfig } from "axios";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string[];
}

interface AuthContextType {
  user: UserProfile | null;
  access_token: string | null;
  isAuthenticated: boolean;
  login: (
    id: string,
    name: string,
    email: string,
    role: string[],
    access_token: string
  ) => void;
  logout: () => void;
  hasRole: (roleName: string) => boolean;
  getTokenConfig: (config?: AxiosRequestConfig) => AxiosRequestConfig;
}

interface DecodedToken {
  exp: number; // expiry time (in seconds)
  sub?: string;
  [key: string]: unknown;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [access_token, setAccessToken] = useState<string | null>(null);
  const router = useRouter();
  const logoutTimer = useRef<NodeJS.Timeout | null>(null);

  // ✅ Decode token and extract expiry in milliseconds
  const getTokenExpiry = (token: string): number | null => {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      return decoded?.exp ? decoded.exp * 1000 : null;
    } catch (error) {
      console.warn(error);
      return null;
    }
  };

  // ✅ Schedule automatic logout based on token expiry
  const scheduleLogout = (token: string) => {
    const expiryTime = getTokenExpiry(token);
    if (!expiryTime) {
      return;
    }

    const now = Date.now();
    const delay = expiryTime - now;

    if (delay <= 0) {
      logout();
      return;
    }

    // Clear any existing timer
    if (logoutTimer.current) clearTimeout(logoutTimer.current);

    logoutTimer.current = setTimeout(() => {
      console.warn("⏰ JWT expired — auto-logging out.");
      logout();
    }, delay);

    const minutes = (delay / 1000 / 60).toFixed(2);
    console.log(`⏱️ Auto logout scheduled in ${minutes} minutes`);
  };

  // ✅ Restore session when app reloads
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("access_token");

    if (storedUser && storedToken) {
      const expiryTime = getTokenExpiry(storedToken);

      if (!expiryTime || expiryTime < Date.now()) {
        console.warn("⚠️ Stored JWT expired — clearing session.");
        logout();
      } else {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setAccessToken(storedToken);
          scheduleLogout(storedToken);
        } catch (err) {
          console.error("❌ Failed to parse stored user:", err);
          logout();
        }
      }
    }

    return () => {
      if (logoutTimer.current) clearTimeout(logoutTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ✅ Login function
  const login = (
    userId: string,
    username: string,
    email: string,
    roles: string[],
    token: string
  ) => {
    const userData: UserProfile = {
      id: userId,
      name: username,
      email: email,
      role: roles,
    };

    setUser(userData);
    setAccessToken(token);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("access_token", token);

    scheduleLogout(token);
  };

  // ✅ Logout function
  const logout = () => {
    console.log("🚪 Logging out user...");

    if (logoutTimer.current) clearTimeout(logoutTimer.current);
    logoutTimer.current = null;

    localStorage.removeItem("user");
    localStorage.removeItem("access_token");

    setUser(null);
    setAccessToken(null);

    // Only redirect if not already on login or home page to prevent loops
    const currentPath = window.location.pathname;
    if (currentPath !== "/" && currentPath !== "/auth/login") {
      router.push("/");
    }
  };

  // ✅ Check if user has specific role
  const hasRole = (roleName: string) => {
    return user?.role?.includes(roleName) ?? false;
  };

  // ✅ Helper for axios API calls with token
  const getTokenConfig = (
    config: AxiosRequestConfig = {}
  ): AxiosRequestConfig => {
    if (!access_token) return config;
    return {
      ...config,
      headers: {
        ...(config.headers || {}),
        Authorization: `Bearer ${access_token}`,
      },
    };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        access_token,
        isAuthenticated: !!access_token,
        login,
        logout,
        hasRole,
        getTokenConfig,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Hook to use Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
