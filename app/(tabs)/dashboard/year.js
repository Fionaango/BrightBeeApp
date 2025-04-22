import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StudyContext } from './DashboardScreen';

export default function YearScreen() {
  const { studyData } = useContext(StudyContext);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const yearData = studyData?.year || {};
  const max = Math.max(...months.map((m) => yearData[m] || 0), 1);

  return (
    <LinearGradient colors={['#FFF1CC', '#FFFFFF']} style={styles.container}>
      <Text style={styles.title}>Year Overview</Text>
      <ScrollView>
        {months.map((month) => (
          <View key={month} style={styles.row}>
            <Text style={styles.label}>{month.slice(0, 3)}</Text>
            <View style={styles.bar}>
              <View style={[styles.fill, { width: `${(yearData[month] || 0) / max * 100}%` }]} />
            </View>
            <Text style={styles.value}>{yearData[month] || 0} mins</Text>
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: '#000' },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  label: { width: 80 },
  bar: { flex: 1, height: 10, backgroundColor: '#eee', borderRadius: 5, marginHorizontal: 10 },
  fill: { height: '100%', backgroundColor: '#FFC700', borderRadius: 5 },
  value: { width: 60, textAlign: 'right' },
});
