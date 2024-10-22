import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="(tabs)/index"
          options={{ headerShown: false, navigationBarHidden: true }}
        />
        <Stack.Screen
          name="(tabs)/JammerScreens"
          options={{ headerShown: false, navigationBarHidden: true }}
        />
        <Stack.Screen
          name="hiddenScreens/[jammerChat]"
          options={{
            headerShown: true,
            navigationBarHidden: true,
            headerTitle: "Chat",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="+not-found"
          options={{ headerShown: false, navigationBarHidden: true }}
        />
      </Stack>
    </ThemeProvider>
  );
}
