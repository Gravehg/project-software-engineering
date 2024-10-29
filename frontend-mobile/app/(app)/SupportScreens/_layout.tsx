import { Tabs } from "expo-router";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useAuth } from "@/hooks/context/AuthContext";
import { Button } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { onLogout } = useAuth();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: true,
        headerTitleAlign: "center",
      }}
    >
      <Tabs.Screen
        name="screens/supptickets"
        options={{
          title: "Assigned tickets",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "ticket" : "ticket-outline"}
              color={color}
            />
          ),
          headerLeft: () => (
            <Button onPress={onLogout} title="Sign out"></Button>
          ),
        }}
      />
      <Tabs.Screen
        name="screens/explore"
        options={{
          title: "Create ticket",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "create" : "create-outline"}
              color={color}
            />
          ),
          headerLeft: () => (
            <Button onPress={onLogout} title="Sign out"></Button>
          ),
        }}
      />
      <Tabs.Screen
        name="screens/chat"
        options={{
          title: "Prueba chat",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "create" : "create-outline"}
              color={color}
            />
          ),
          headerLeft: () => (
            <Button onPress={onLogout} title="Sign out"></Button>
          ),
        }}
      />
    </Tabs>
  );
}
