import { Slot } from 'expo-router';
import { StudyProvider } from './StudyContext';

export default function RootLayout() {
  return (
    <StudyProvider>
      <Slot />
    </StudyProvider>
  );
}
