import { Tabs } from 'expo-router';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs screenOptions={{tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,headerShown: false,}}>
      <Tabs.Screen name="index" options={{title: 'Home', tabBarIcon: ({ color, focused }) => (<TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen name="JammerScreens/explore"
        options={{ title: 'Explore', tabBarIcon: ({ color, focused }) => (<TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="JammerScreens/create" options={{title: 'Create ticket', tabBarIcon: ({ color, focused }) => (<TabBarIcon name={focused ? 'create' : 'create-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
