import React from 'react';
import { Tabs } from 'expo-router';
import { StudyProvider } from '../StudyContext';
import { Ionicons } from '@expo/vector-icons';

export default function RootLayout() {
  return (
    <StudyProvider>
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#FFC700',
          tabBarInactiveTintColor: '#1A1A1A',
          tabBarLabelStyle: { fontWeight: 'normal' },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = 'help-circle';
            if (route.name === 'index') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'timer') {
              iconName = focused ? 'time' : 'time-outline';
            } else if (route.name === 'dashboard') {
              iconName = focused ? 'bar-chart' : 'bar-chart-outline';
            } else if (route.name === 'profile') {
              iconName = focused ? 'person' : 'person-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tabs.Screen name="index" options={{ title: 'Home' }} />
        <Tabs.Screen name="timer" options={{ title: 'Timer' }} />
        <Tabs.Screen name="dashboard" options={{ title: 'Dashboard' }} />
        <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
      </Tabs>
    </StudyProvider>
  );
}
