import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StudyContext } from '../StudyContext';

export default function MonthDetail() {
  const { monthlyTotals } = useContext(StudyContext);

  const sorted = Object.entries(monthlyTotals).sort((a, b) => b[1] - a[1]);
  const bestMonth = sorted[0]?.[0] || 'None';
  const bestTime = sorted[0]?.[1] || 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏆 Your Best Month</Text>
      {bestMonth !== 'None' ? (
        <View style={styles.card}>
          <Text style={styles.big}>{bestMonth}</Text>
          <Text style={styles.subtext}>{bestTime} minutes studied!</Text>
          <Text style={styles.emoji}>🎉</Text>
        </View>
      ) : (
        <Text style={styles.empty}>No monthly data yet.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDE7',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#FFECB3',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
  },
  big: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#F57C00',
  },
  subtext: {
    fontSize: 16,
    marginTop: 10,
    color: '#555',
  },
  emoji: {
    fontSize: 40,
    marginTop: 10,
  },
  empty: {
    fontSize: 16,
    color: '#888',
  },
});
