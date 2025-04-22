import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StudyContext } from '../StudyContext';

export default function TodayDetail() {
  const { studyData } = useContext(StudyContext);
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const minutes = studyData[today] || 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌞 Today is {today}</Text>
      <View style={styles.card}>
        <Text style={styles.minutes}>{minutes} minutes</Text>
        <Text style={styles.subtext}>You've studied so far today!</Text>
      </View>
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
      fontSize: 22,
      fontWeight: '600',
      marginBottom: 30,
      color: '#1A1A1A',
    },
    card: {
      backgroundColor: '#FFF3CD',
      padding: 40,
      borderRadius: 20,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 10,
      alignItems: 'center',
    },
    minutes: {
      fontSize: 40,
      fontWeight: 'bold',
      color: '#FFA000',
    },
    subtext: {
      fontSize: 16,
      marginTop: 10,
      color: '#555',
    },
  });
  
