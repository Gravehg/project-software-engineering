import { AuthProvider } from "@/hooks/context/AuthContext";
import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { Slot } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null; // Prevents rendering until fonts are loaded
  }

  return (
    <>
      <AuthProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Slot />
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}
