import React, { useContext, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StudyContext } from '../StudyContext';

export default function TimerScreen() {
  const { subject, setSubject, addStudyTime } = useContext(StudyContext);

  const [subjects, setSubjects] = useState(['Math', 'English', 'Science', 'History']);
  const [times, setTimes] = useState(['15', '30', '60']); // minutes

  const [studyTime, setStudyTime] = useState('25');
  const [timeLeft, setTimeLeft] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const handleAddSubject = () => {
    Alert.prompt('Add Subject', 'Enter subject name:', (text) => {
      if (text && !subjects.includes(text)) {
        setSubjects([...subjects, text]);
      }
    });
  };

  const handleDeleteSubject = (item) => {
    if (item === subject) {
      Alert.alert('Cannot delete selected subject!');
      return;
    }
    Alert.alert('Delete Subject', `Remove "${item}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setSubjects(subjects.filter((s) => s !== item)),
      },
    ]);
  };

  const handleAddTime = () => {
    Alert.prompt('Add Time', 'Enter time in minutes:', (text) => {
      const timeNum = parseInt(text);
      if (!isNaN(timeNum) && timeNum > 0 && !times.includes(text)) {
        setTimes([...times, text]);
      }
    });
  };

  const handleDeleteTime = (item) => {
    if (item === studyTime) {
      Alert.alert('Cannot delete selected time!');
      return;
    }
    Alert.alert('Delete Time', `Remove "${item} minutes"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setTimes(times.filter((t) => t !== item)),
      },
    ]);
  };

  const startStudySession = () => {
    if (!subject || !studyTime) {
      Alert.alert('Please select both subject and time!');
      return;
    }

    const timeInSeconds = Number(studyTime) * 60;
    addStudyTime(Number(studyTime));
    setTimeLeft(timeInSeconds);
    setIsCounting(true);
    setIsPaused(false);
  };

  const stopStudySession = () => {
    setIsCounting(false);
    setIsPaused(false);
    setTimeLeft(0);
  };

  const pauseResumeSession = () => {
    setIsPaused(!isPaused);
  };

  useEffect(() => {
    let timer = null;
    if (isCounting && !isPaused && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (isCounting && timeLeft === 0) {
      setIsCounting(false);
      Alert.alert('🎉 Session Complete!', `Great job on studying ${subject}!`);
    }
    return () => clearTimeout(timer);
  }, [isCounting, isPaused, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <LinearGradient colors={['#FFF1CC', '#FFFFFF']} style={styles.gradientBackground}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Choose a Subject and Time</Text>

        {/* SUBJECTS */}
        <View style={styles.rowHeader}>
          <Text style={styles.label}>Subject:</Text>
          <TouchableOpacity onPress={handleAddSubject}>
            <Text style={styles.inlineText}>➕</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonGroup}>
          {subjects.map((item) => (
            <TouchableOpacity
              key={item}
              style={[styles.optionButton, subject === item && styles.selectedButton]}
              onPress={() => setSubject(item)}
              onLongPress={() => handleDeleteSubject(item)}
            >
              <Text style={styles.optionText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* STUDY TIMES */}
        <View style={styles.rowHeader}>
          <Text style={styles.label}>Study Time:</Text>
          <TouchableOpacity onPress={handleAddTime}>
            <Text style={styles.inlineText}>➕</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonGroup}>
          {times.map((item) => (
            <TouchableOpacity
              key={item}
              style={[styles.optionButton, studyTime === item && styles.selectedButton]}
              onPress={() => setStudyTime(item)}
              onLongPress={() => handleDeleteTime(item)}
            >
              <Text style={styles.optionText}>
                {item === '60' ? '1 hour' : `${item} minutes`}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* TIMER */}
        {!isCounting ? (
          <TouchableOpacity style={styles.startButton} onPress={startStudySession}>
            <Text style={styles.startButtonText}>Start Study Session</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.timerBox}>
            <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
            <Text style={styles.timerSubtext}>Stay focused! 🐝</Text>
            <View style={styles.timerControls}>
              <TouchableOpacity onPress={pauseResumeSession} style={styles.controlButton}>
                <Text style={styles.controlButtonText}>
                  {isPaused ? 'Resume' : 'Pause'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={stopStudySession}
                style={[styles.controlButton, { backgroundColor: '#EF5350' }]}
              >
                <Text style={styles.controlButtonText}>Stop</Text>
              </TouchableOpacity>
            </View>
          </View>
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
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#1A1A1A',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#1A1A1A',
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  inlineText: {
    fontSize: 20,
    paddingHorizontal: 6,
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#FFF8E1',
    borderWidth: 1,
    borderColor: '#FFD54F',
  },
  selectedButton: {
    backgroundColor: '#FFD54F',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  startButton: {
    marginTop: 20,
    backgroundColor: '#FFC107',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  timerBox: {
    alignItems: 'center',
    marginTop: 30,
    backgroundColor: '#fffbe6',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FFD54F',
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
  },
  timerSubtext: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  timerControls: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 20,
  },
  controlButton: {
    backgroundColor: '#FFA000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  controlButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
