import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StudyContext } from '../StudyContext';

export default function WeekScreen() {
  const { studyData } = useContext(StudyContext);
  const fullLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const shortLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const data = fullLabels.map(day => studyData?.week?.[day] ?? 0);

  return (
    <LinearGradient colors={['#FFF1CC', '#FFFFFF']} style={styles.container}>
      <Text style={styles.title}>This Week</Text>
      <ChartBar labels={shortLabels} data={data} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: '#000' },
});
