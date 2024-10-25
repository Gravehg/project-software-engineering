import { useAuth } from "@/hooks/context/AuthContext";
import { useRouter } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { useEffect } from "react";
import { Slot } from "expo-router";

export default function AppLayout() {
  const { authState, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Wait for loading to complete before checking authentication state
    if (!loading) {
      if (!authState.authenticated) {
        // If not authenticated, redirect to signIn
        router.replace("/signIn");
      } else {
        // Redirect based on the user role
        switch (authState.role) {
          case "User":
            router.replace("/JammerScreens");
            break;
          case "Support":
            router.replace("/SupportScreens");
            break;
          case "Global Organizer":
            router.replace("/GlobalScreens");
            break;
          default:
            // Handle any other roles or default case if necessary
            break;
        }
      }
    }
  }, [loading, authState, router]); // Depend on loading, authState, and router

  // Show a loading spinner while loading is true
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Render children if everything is fine
  return <Slot />;
}
