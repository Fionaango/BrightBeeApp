import React, { useContext, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
} from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StudyContext } from '../StudyContext';

const tasksList = [
  { id: 1, title: 'Study 30 mins today', points: 5, type: 'Daily' },
  { id: 2, title: 'Study 60 mins today', points: 10, type: 'Daily' },
  { id: 3, title: 'Study 5 days this week', points: 30, type: 'Weekly' },
];

const quotesList = [
  "Small progress is still progress.",
  "Consistency beats motivation.",
  "One day, or day one. You decide.",
  "Work hard in silence, let success make the noise.",
  "Your future self will thank you.",
];

export default function HomeScreen() {
  const {
    username = 'Fiona',
    studyData = {},
    subjectTotals = {},
    monthlyTotals = {},
  } = useContext(StudyContext);

  const [beePoints, setBeePoints] = useState(0);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [quote, setQuote] = useState('');
  const [barWidth, setBarWidth] = useState(300);

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const todayStudyTime = studyData[today] || 0;
  const weeklyStudyTime = Object.values(studyData).reduce((acc, curr) => acc + curr, 0);
  const weeklyDaysStudied = Object.keys(studyData).length; // assume each key is 1 day

  const topSubject =
    Object.keys(subjectTotals).length > 0
      ? Object.entries(subjectTotals).sort((a, b) => b[1] - a[1])[0][0]
      : 'N/A';

  const bestMonth =
    Object.keys(monthlyTotals).length > 0
      ? Object.entries(monthlyTotals).sort((a, b) => b[1] - a[1])[0][0]
      : 'N/A';

  const weeklyGoal = 150;
  const progress = Math.min((weeklyStudyTime / weeklyGoal) * 100, 100);
  const minutesRemaining = Math.max(weeklyGoal - weeklyStudyTime, 0);

  const animatedProgressBar = useState(new Animated.Value(0))[0];
  const animatedBeeFly = useState(new Animated.Value(0))[0];
  const beeBounce = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(animatedProgressBar, {
      toValue: progress,
      duration: 1000,
      useNativeDriver: false,
    }).start();

    Animated.timing(animatedBeeFly, {
      toValue: progress,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [progress]);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(beeBounce, {
          toValue: -5,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(beeBounce, {
          toValue: 5,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const getProgressColor = () => {
    if (progress >= 100) return '#4CAF50'; // Green
    if (progress >= 70) return '#FFA500'; // Orange
    return '#FFC700'; // Yellow
  };

  useEffect(() => {
    let newPoints = 0;
    const completed = [];

    tasksList.forEach((task) => {
      if (task.id === 1 && todayStudyTime >= 30) {
        newPoints += task.points;
        completed.push(task.id);
      }
      if (task.id === 2 && todayStudyTime >= 60) {
        newPoints += task.points;
        completed.push(task.id);
      }
      if (task.id === 3 && weeklyDaysStudied >= 5) {
        newPoints += task.points;
        completed.push(task.id);
      }
    });

    setBeePoints(newPoints);
    setCompletedTasks(completed);
    setQuote(quotesList[Math.floor(Math.random() * quotesList.length)]);
  }, [todayStudyTime, weeklyStudyTime, weeklyDaysStudied]);

  return (
    <LinearGradient colors={['#FFF1CC', '#FFFFFF']} style={styles.gradientBackground}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Top greeting */}
        <View style={styles.topContainer}>
          <Text style={styles.dateText}>
            {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
          </Text>
          <View style={styles.avatarWrapper}>
            <Image source={require('../../assets/avatar.png')} style={styles.avatar} />
          </View>
        </View>

        <Text style={styles.greeting}>Hello, {username}!</Text>

        <Link href="/timer" asChild>
          <TouchableOpacity style={styles.startButton}>
            <Text style={styles.startButtonText}>Start Studying →</Text>
          </TouchableOpacity>
        </Link>

        {/* Stats */}
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

        {/* Progress bar */}
        <View style={styles.progressWrapper}>
          <Text style={styles.progressText}>
            {weeklyStudyTime}/{weeklyGoal} mins this week
          </Text>

          <View
            style={styles.progressBackground}
            onLayout={(event) => {
              const width = event.nativeEvent.layout.width;
              setBarWidth(width);
            }}
          >
            <Animated.View
              style={[
                styles.progressFill,
                {
                  width: animatedProgressBar.interpolate({
                    inputRange: [0, 100],
                    outputRange: ['0%', '100%'],
                  }),
                  backgroundColor: getProgressColor(),
                },
              ]}
            />
            <Animated.View
              style={[
                styles.beeWrapper,
                {
                  transform: [
                    { translateX: Animated.multiply(animatedBeeFly, barWidth / 100) },
                    { translateY: beeBounce },
                  ],
                },
              ]}
            >
              <Text style={styles.beeText}>🐝</Text>
            </Animated.View>
          </View>

          <Text style={styles.remainingText}>
            {minutesRemaining > 0
              ? `${minutesRemaining} mins remaining`
              : `Goal completed! 🎉`}
          </Text>

          <Text style={styles.streakText}>🔥 3-Day Streak! Keep it up!</Text>
          <Text style={styles.quoteText}>"{quote}"</Text>
        </View>

        {/* 🐝 Bee Tasks */}
        <View style={styles.taskSection}>
          <Text style={styles.sectionTitle}>🐝 Bee Tasks</Text>
          <View style={styles.taskList}>
            {tasksList.map((task) => {
              let remainingText = '';

              if (task.id === 1) {
                const remaining = Math.max(30 - todayStudyTime, 0);
                remainingText = remaining > 0 ? `🐝 Left: ${remaining} mins` : '🐝 Done!';
              }
              if (task.id === 2) {
                const remaining = Math.max(60 - todayStudyTime, 0);
                remainingText = remaining > 0 ? `🐝 Left: ${remaining} mins` : '🐝 Done!';
              }
              if (task.id === 3) {
                const remaining = Math.max(5 - weeklyDaysStudied, 0);
                remainingText = remaining > 0 ? `🐝 Left: ${remaining} days` : '🐝 Done!';
              }

              return (
                <View
                  key={task.id}
                  style={[
                    styles.taskCard,
                    completedTasks.includes(task.id) && styles.taskCompleted,
                  ]}
                >
                  <View>
                    <Text style={styles.taskTitle}>{task.title}</Text>
                    <Text style={styles.taskSubText}>{remainingText}</Text>
                  </View>
                  <View style={styles.pointsBadge}>
                    <Text style={styles.pointsText}>+{task.points}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Points and Wallet */}
        <Text style={styles.totalPointsText}>🐝 You have {beePoints} Bee Points!</Text>

        <Link href="/wallet" asChild>
          <TouchableOpacity style={styles.walletButton}>
            <Text style={styles.walletButtonText}>View Bee Wallet →</Text>
          </TouchableOpacity>
        </Link>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: { flex: 1 },
  container: { paddingVertical: 50, paddingHorizontal: 20, alignItems: 'center' },
  topContainer: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  dateText: { fontSize: 16, color: '#888' },
  avatarWrapper: { width: 40, height: 40, borderRadius: 20, overflow: 'hidden' },
  avatar: { width: '100%', height: '100%', resizeMode: 'cover' },
  greeting: { fontSize: 28, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 10, alignSelf: 'flex-start' },
  startButton: { backgroundColor: '#000', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 25, marginBottom: 20, alignSelf: 'stretch', alignItems: 'center' },
  startButtonText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
  statsContainer: { width: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  statBubble: { width: '47%', aspectRatio: 1, borderRadius: 20, marginBottom: 15, padding: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFC700' },
  statNumber: { fontSize: 20, fontWeight: 'bold', color: '#1A1A1A' },
  statLabel: { fontSize: 12, color: '#1A1A1A', textAlign: 'center', marginTop: 5 },
  progressWrapper: { width: '100%', marginBottom: 15, alignItems: 'center' },
  progressBackground: { width: '100%', height: 20, backgroundColor: '#EEE', borderRadius: 20, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 20 },
  beeWrapper: { position: 'absolute', top: -25, left: 0 },
  beeText: { fontSize: 24 },
  progressText: { fontSize: 14, color: '#555', marginBottom: 5, textAlign: 'center' },
  remainingText: { marginTop: 8, fontSize: 14, color: '#777', textAlign: 'center' },
  streakText: { marginTop: 10, fontSize: 16, fontWeight: '600', color: '#FF6600', textAlign: 'center' },
  quoteText: { marginTop: 10, fontSize: 12, color: '#888', fontStyle: 'italic', textAlign: 'center', paddingHorizontal: 20 },
  taskSection: { marginTop: 30, width: '100%', alignItems: 'flex-start' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 10 },
  taskList: { backgroundColor: '#FFF9E5', borderRadius: 20, padding: 15, width: '100%', marginTop: 10 },
  taskCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#FFE082' },
  taskCompleted: { backgroundColor: '#D4EDDA' },
  taskTitle: { fontSize: 16, color: '#333', fontWeight: '500', flexShrink: 1 },
  pointsBadge: { backgroundColor: '#FFC700', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 20 },
  pointsText: { fontSize: 14, fontWeight: 'bold', color: '#1A1A1A' },
  totalPointsText: { fontSize: 18, fontWeight: 'bold', color: '#FF6600', marginTop: 25, textAlign: 'center' },
  walletButton: { backgroundColor: '#000', paddingVertical: 15, paddingHorizontal: 25, borderRadius: 30, marginTop: 20, alignSelf: 'center' },
  walletButtonText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
});
