import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({ color, focused }) => (<TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />), }} />
      <Tabs.Screen name="search" options={{ title: 'Search', tabBarIcon: ({ color, focused }) => (<TabBarIcon name={focused ? 'search' : 'search-outline'} color={color} />), }} />
      <Tabs.Screen name="favorites" options={{ title: 'Favorites', tabBarIcon: ({ color, focused }) => (<TabBarIcon name={focused ? 'heart' : 'heart-outline'} color={color} />), }} />
      <Tabs.Screen name="explore" options={{ title: 'Categories', tabBarIcon: ({ color, focused }) => (<TabBarIcon name={focused ? 'grid' : 'grid-outline'} color={color} />), }} />
    </Tabs>
  );
}