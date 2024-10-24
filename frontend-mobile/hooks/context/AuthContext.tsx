import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

interface AuthProps {
  authState: {
    token: string;
    authenticated: boolean;
    role: string;
  };
  loading: boolean;
  onLogin: (email: string) => Promise<any>;
  onLogout: () => Promise<any>;
}

const TOKEN_KEY = "my_jwt";
const ROLE_KEY = "role";
export const API_URL = process.env.EXPO_PUBLIC_BASE_URL;
const AuthContext = createContext<AuthProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<{
    token: string;
    authenticated: boolean;
    role: string;
  }>({
    token: "",
    authenticated: false,
    role: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      const role = await SecureStore.getItemAsync(ROLE_KEY);

      if (token) {
        setAuthState({
          token,
          authenticated: true,
          role: role || "",
        });
      }
      setLoading(false); // Only set loading to false after checking the token
    };
    loadToken();
  }, []);

  const login = async (email: string) => {
    try {
      const result = await axios.post(`${API_URL}/auth/login-mobile`, {
        email,
      });

      console.log("Login result:", result.data); // Debug log

      // Update the state
      setAuthState({
        token: result.data.token,
        authenticated: true,
        role: result.data.role || "",
      });

      // Set the axios authorization header
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.token}`;

      // Store the token and role securely
      await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);
      await SecureStore.setItemAsync(ROLE_KEY, result.data.role || "");

      setLoading(false);
      return result.data;
    } catch (e) {
      console.error("Login error:", e); // Debug log
      setAuthState((prevState) => ({
        ...prevState,
        authenticated: false, // Update authenticated state on error
      }));
      return { error: true, msg: (e as any).response.data.msg };
    }
  };

  const logOut = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync(ROLE_KEY);
    axios.defaults.headers.common["Authorization"] = "";
    setAuthState({
      token: "",
      authenticated: false,
      role: "",
    });
    router.replace("/");
  };

  const value = {
    onLogin: login,
    onLogout: logOut,
    authState,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
