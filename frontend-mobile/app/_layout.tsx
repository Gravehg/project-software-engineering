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

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Layout></Layout>
      </ThemeProvider>
    </AuthProvider>
=======

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

export const Layout = () => {
  const { authState, onLogout } = useAuth();

  console.log("Auth State:", authState); // Debugging line

  return (
    <Stack>
      {authState?.authenticated ? (
        authState.role === "User" ? (
          <Stack.Screen
            name="(tabs)/JammerScreens"
            options={{
              headerShown: false,
              headerRight: () => <Button onPress={onLogout} title="Sign out" />,
            }}
          />
        ) : authState.role === "Support" ? (
          <Stack.Screen
            name="(tabs)/SupportScreens"
            options={{
              headerShown: false,
              headerRight: () => <Button onPress={onLogout} title="Sign out" />,
            }}
          />
        ) : authState.role === "Global Organizer" ? (
          <Stack.Screen
            name="(tabs)/GlobalScreens"
            options={{
              headerShown: false,
              headerRight: () => <Button onPress={onLogout} title="Sign out" />,
            }}
          />
        ) : (
          <Stack.Screen name="+not-found" />
        )
      ) : (
        <Stack.Screen name="(tabs)/index" options={{ headerShown: false }} />
      )}
    </Stack>
  );
};
