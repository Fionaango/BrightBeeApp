import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StudyContext } from '../StudyContext';

export default function HomeScreen() {
  const { username, studyData } = useContext(StudyContext);

  const today = new Date().toLocaleString('en-us', { weekday: 'long' });
  const todayStudyTime = studyData[today];
  const weeklyStudyTime = Object.values(studyData).reduce((acc, curr) => acc + curr, 0);

  return (
    <LinearGradient colors={['#FFF1CC', '#FFFFFF']} style={styles.gradientBackground}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.dateText}>March 23rd</Text>
          <View style={styles.avatarWrapper}>
            <Image source={require('../assets/avatar.png')} style={styles.avatar} />
          </View>
        </View>
        <Text style={styles.greeting}>Hello, {username}!</Text>
        <TouchableOpacity style={styles.startButton}>
          <Link href="/timer" style={styles.link}>
            <Text style={styles.startButtonText}>Start Studying →</Text>
          </Link>
        </TouchableOpacity>
        <View style={styles.statsContainer}>
          <View style={[styles.statBubble, { backgroundColor: '#FFC700' }]}>
            <Text style={styles.statNumber}>{todayStudyTime} hrs</Text>
            <Text style={styles.statLabel}>Today's Study Time</Text>
          </View>
          <View style={[styles.statBubble, { backgroundColor: '#FFC700' }]}>
            <Text style={styles.statNumber}>{weeklyStudyTime} hrs</Text>
            <Text style={styles.statLabel}>Weekly Study Time</Text>
          </View>
          <View style={[styles.statBubble, { backgroundColor: '#FFC700' }]}>
            <Text style={styles.statNumber}>Math</Text>
            <Text style={styles.statLabel}>Most Time Spent on</Text>
          </View>
          <View style={[styles.statBubble, { backgroundColor: '#FFC700' }]}>
            <Text style={styles.statNumber}>June</Text>
            <Text style={styles.statLabel}>Your Best Month</Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: { flex: 1 },
  container: { paddingVertical: 50, paddingHorizontal: 20, alignItems: 'center' },
  topContainer: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  dateText: { fontSize: 16, color: '#888888' },
  avatarWrapper: { width: 40, height: 40, borderRadius: 20, overflow: 'hidden' },
  avatar: { width: '100%', height: '100%', resizeMode: 'cover' },
  greeting: { fontSize: 28, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 10, alignSelf: 'flex-start' },
  startButton: { backgroundColor: '#000', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 25, marginBottom: 20, alignSelf: 'stretch', alignItems: 'center' },
  link: { textDecorationLine: 'none' },
  startButtonText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
  statsContainer: { width: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  statBubble: { width: '47%', aspectRatio: 1, borderRadius: 20, marginBottom: 15, padding: 10, justifyContent: 'center', alignItems: 'center' },
  statNumber: { fontSize: 20, fontWeight: 'bold', color: '#1A1A1A' },
  statLabel: { fontSize: 12, color: '#1A1A1A', textAlign: 'center', marginTop: 5 },
});
