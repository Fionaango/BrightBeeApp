import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import DayDashboard from './day';
import WeekDashboard from './week';
import MonthDashboard from './month';
import YearDashboard from './year';

export default function DashboardMain() {
  const [view, setView] = useState('week');

  return (
    <LinearGradient colors={['#FFF1CC', '#FFFFFF']} style={styles.container}>
      <Text style={styles.title}>Study Progress</Text>
      <View style={styles.switcher}>
        {['day', 'week', 'month', 'year'].map((v) => (
          <TouchableOpacity
            key={v}
            style={[styles.switchBtn, view === v && styles.activeBtn]}
            onPress={() => setView(v)}
          >
            <Text style={view === v ? styles.activeText : styles.switchText}>
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ flex: 1, width: '100%' }}>
        {view === 'day' && <DayDashboard />}
        {view === 'week' && <WeekDashboard />}
        {view === 'month' && <MonthDashboard />}
        {view === 'year' && <YearDashboard />}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, paddingHorizontal: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#000' },
  switcher: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#EEE',
    borderRadius: 30,
    padding: 4,
    marginBottom: 20,
  },
  switchBtn: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 2,
    borderRadius: 30,
    alignItems: 'center',
    backgroundColor: '#EEE',
  },
  activeBtn: {
    backgroundColor: '#000',
  },
  switchText: {
    color: '#000',
    fontSize: 14,
  },
  activeText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 14,
  },
});
