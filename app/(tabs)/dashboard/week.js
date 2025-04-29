import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StudyContext } from '../../StudyContext';

export default function WeekScreen() {
  const { studyData } = useContext(StudyContext);
  const weekData = studyData?.week || {
    Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0, Sunday: 0,
  };
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const max = Math.max(...Object.values(weekData), 1);

  return (
    <LinearGradient colors={['#FFF1CC', '#FFFFFF']} style={styles.container}>
      <Text style={styles.title}>This Week</Text>
      {weekDays.map((day) => (
        <View key={day} style={styles.row}>
          <Text style={styles.label}>{day.slice(0, 3)}</Text>
          <View style={styles.bar}>
            <View style={[styles.fill, { width: `${(weekData[day] / max) * 100}%` }]} />
          </View>
          <Text style={styles.value}>{weekData[day] || 0} mins</Text>
        </View>
      ))}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: '#000' },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  label: { width: 50, fontWeight: '500' },
  bar: { flex: 1, height: 10, backgroundColor: '#eee', borderRadius: 5, marginHorizontal: 10 },
  fill: { height: '100%', backgroundColor: '#FFC700', borderRadius: 5 },
  value: { width: 60, textAlign: 'right' },
});
