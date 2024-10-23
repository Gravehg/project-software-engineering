import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

interface AuthProps {
  authState?: {
    token: string | null;
    authenticated: boolean | null;
    role: string | null;
  };
  onLogin?: (email: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY = "my_jwt";
const ROLE_KEY = "role";
export const API_URL = process.env.EXPO_PUBLIC_BASE_URL;
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
    role: string | null;
  }>({ token: null, authenticated: null, role: null });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      const role = await SecureStore.getItemAsync(ROLE_KEY);
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setAuthState({
          token: token,
          authenticated: true,
          role: role,
        });
      }
    };
    loadToken();
  }, []);

  const login = async (email: string) => {
    try {
      const result = await axios.post(`${API_URL}/auth/login-mobile`, {
        email,
      });

      console.log(result);

      setAuthState({
        token: result.data.token,
        authenticated: true,
        role: result.data.role,
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.token}`;

      await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);
      await SecureStore.setItemAsync(ROLE_KEY, result.data.role);
      return result;
    } catch (e) {
      return { error: true, msg: (e as any).response.data.msg };
    }
  };
  const logOut = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    axios.defaults.headers.common["Authorization"] = "";
    setAuthState({
      token: null,
      authenticated: null,
      role: null,
    });
  };
  const value = {
    onLogin: login,
    onLogout: logOut,
    authState,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
