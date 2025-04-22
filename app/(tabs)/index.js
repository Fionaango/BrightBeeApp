import React, { useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StudyContext } from '../StudyContext';

export default function HomeScreen() {
  const {
    username = 'Fiona',
    studyData = {},
    subjectTotals = {},
    monthlyTotals = {},
  } = useContext(StudyContext);

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const todayStudyTime = studyData[today] || 0;
  const weeklyStudyTime = Object.values(studyData).reduce((acc, curr) => acc + curr, 0);

  const topSubject =
    Object.keys(subjectTotals).length > 0
      ? Object.entries(subjectTotals).sort((a, b) => b[1] - a[1])[0][0]
      : 'N/A';

  const bestMonth =
    Object.keys(monthlyTotals).length > 0
      ? Object.entries(monthlyTotals).sort((a, b) => b[1] - a[1])[0][0]
      : 'N/A';

  return (
    <LinearGradient colors={['#FFF1CC', '#FFFFFF']} style={styles.gradientBackground}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.dateText}>
            {new Date().toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
            })}
          </Text>
          <View style={styles.avatarWrapper}>
            <Image
              source={require('../../assets/avatar.png')}
              style={styles.avatar}
            />
          </View>
        </View>

        <Text style={styles.greeting}>Hello, {username}!</Text>

        <Link href="/timer" asChild>
          <TouchableOpacity style={styles.startButton}>
            <Text style={styles.startButtonText}>Start Studying →</Text>
          </TouchableOpacity>
        </Link>

        <View style={styles.statsContainer}>
          <Link href="/today" asChild>
            <TouchableOpacity style={styles.statBubble}>
              <Text style={styles.statNumber}>{todayStudyTime} mins</Text>
              <Text style={styles.statLabel}>Today's Study Time</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/week" asChild>
            <TouchableOpacity style={styles.statBubble}>
              <Text style={styles.statNumber}>{weeklyStudyTime} mins</Text>
              <Text style={styles.statLabel}>Weekly Study Time</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/subject" asChild>
            <TouchableOpacity style={styles.statBubble}>
              <Text style={styles.statNumber}>{topSubject}</Text>
              <Text style={styles.statLabel}>Most Time Spent on</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/month" asChild>
            <TouchableOpacity style={styles.statBubble}>
              <Text style={styles.statNumber}>{bestMonth}</Text>
              <Text style={styles.statLabel}>Your Best Month</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    paddingVertical: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  topContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  dateText: {
    fontSize: 16,
    color: '#888',
  },
  avatarWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  startButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 20,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  startButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  statsContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statBubble: {
    width: '47%',
    aspectRatio: 1,
    borderRadius: 20,
    marginBottom: 15,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFC700',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  statLabel: {
    fontSize: 12,
    color: '#1A1A1A',
    textAlign: 'center',
    marginTop: 5,
  },
});
