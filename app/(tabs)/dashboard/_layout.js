import { Stack } from 'expo-router';
import { StudyProvider } from './DashboardScreen'; 

export default function DashboardLayout() {
  return (
    <StudyProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </StudyProvider>
  );
}
