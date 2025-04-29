import React, { useContext } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StudyContext } from '../StudyContext';

export default function WalletScreen() {
  const {
    username = 'Fiona',
    studyData = {},
  } = useContext(StudyContext);

  // Example simple points calculation
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const todayStudyTime = studyData[today] || 0;
  const weeklyStudyTime = Object.values(studyData).reduce((acc, curr) => acc + curr, 0);

  let beePoints = 0;
  const history = [];

  if (todayStudyTime >= 30) {
    beePoints += 5;
    history.push({ title: 'Daily 30 mins studied', points: 5 });
  }
  if (todayStudyTime >= 60) {
    beePoints += 10;
    history.push({ title: 'Daily 60 mins studied', points: 10 });
  }
  if (weeklyStudyTime >= 5 * 30) {
    beePoints += 30;
    history.push({ title: 'Weekly 5 days studied', points: 30 });
  }

  return (
    <LinearGradient colors={['#FFF1CC', '#FFFFFF']} style={styles.gradientBackground}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>🐝 {username}'s Bee Wallet</Text>

        <View style={styles.pointsBox}>
          <Text style={styles.pointsText}>{beePoints} Bee Points</Text>
          <Text style={styles.pointsSubtext}>Total Points Earned</Text>
        </View>

        <Text style={styles.sectionTitle}>Recent Activities</Text>
        {history.length > 0 ? (
          history.map((item, index) => (
            <View key={index} style={styles.historyItem}>
              <Text style={styles.historyText}>{item.title}</Text>
              <Text style={styles.historyPoints}>+{item.points}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noHistoryText}>No activities yet today!</Text>
        )}
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
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 20,
  },
  pointsBox: {
    backgroundColor: '#FFC700',
    width: '80%',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    marginBottom: 30,
  },
  pointsText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  pointsSubtext: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  historyItem: {
    backgroundColor: '#FFF9E5',
    width: '100%',
    padding: 15,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  historyText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  historyPoints: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF9900',
  },
  noHistoryText: {
    fontSize: 14,
    color: '#777',
    marginTop: 10,
  },
});
