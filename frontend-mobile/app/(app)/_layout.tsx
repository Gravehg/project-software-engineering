import { useAuth } from "@/hooks/context/AuthContext";
import { useRouter } from "expo-router";
import { View, ActivityIndicator } from "react-native";

export default function AppLayout() {
  const { authState, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!authState.authenticated) {
    return router.replace("/login");
  }
}
