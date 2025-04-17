import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Keyboard } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StudyContext } from '../StudyContext';

export default function TimerScreen() {
  const presetDurations = {
    '15 mins': 15 * 60,
    '30 mins': 30 * 60,
    '1 hour': 60 * 60,
    '2 hours': 120 * 60,
  };

  const [initialTime, setInitialTime] = useState(presetDurations['15 mins']);
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [running, setRunning] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const { addStudyTime } = useContext(StudyContext);

  useEffect(() => {
    if (!sessionStarted) {
      setTimeLeft(initialTime);
    }
  }, [initialTime, sessionStarted]);

  useEffect(() => {
    let timer;
    if (running && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && running) {
      setRunning(false);
    }
    return () => clearInterval(timer);
  }, [running, timeLeft]);

  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handlePresetPress = duration => {
    if (!sessionStarted) {
      setInitialTime(duration);
      setTimeLeft(duration);
    }
  };

  const handleCustomSet = () => {
    const minutes = parseInt(customInput, 10);
    if (!isNaN(minutes) && minutes > 0 && !sessionStarted) {
      const newDuration = minutes * 60;
      setInitialTime(newDuration);
      setTimeLeft(newDuration);
      setCustomInput('');
      Keyboard.dismiss();
    }
  };

  const handleFinishSession = () => {
    const elapsedSeconds = initialTime - timeLeft;
    const elapsedMinutes = Math.round(elapsedSeconds / 60);
    if (elapsedMinutes > 0) {
      addStudyTime(elapsedMinutes);
    }
    setRunning(false);
    setTimeLeft(initialTime);
    setSessionStarted(false);
  };

  return (
    <LinearGradient colors={['#FFF1CC', '#FFFFFF']} style={styles.gradientBackground}>
      <View style={styles.container}>
        <Text style={styles.title}>Study Timer</Text>
        <View style={styles.timerCircle}>
          <Text style={styles.timerText}>
            {timeLeft > 0 ? formatTime(timeLeft) : '00:00'}
          </Text>
        </View>
        <View style={styles.presetsContainer}>
          {Object.entries(presetDurations).map(([label, duration]) => (
            <TouchableOpacity
              key={label}
              style={[
                styles.presetButton,
                (initialTime === duration && !sessionStarted) && styles.presetButtonActive,
              ]}
              onPress={() => handlePresetPress(duration)}
              disabled={sessionStarted}
            >
              <Text style={styles.presetButtonText}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {!sessionStarted && (
          <View style={styles.customContainer}>
            <TextInput
              style={styles.customInput}
              placeholder="Custom (mins)"
              placeholderTextColor="#888"
              keyboardType="numeric"
              value={customInput}
              onChangeText={setCustomInput}
            />
            <TouchableOpacity style={styles.customButton} onPress={handleCustomSet}>
              <Text style={styles.customButtonText}>Set</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.buttonRow}>
          {running ? (
            <TouchableOpacity
              style={[styles.timerButton, styles.pauseButton]}
              onPress={() => setRunning(false)}
            >
              <Text style={styles.buttonLabel}>Pause</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.timerButton, styles.startButton]}
              onPress={() => {
                setRunning(true);
                setSessionStarted(true);
              }}
            >
              <Text style={styles.buttonLabel}>Start</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[styles.timerButton, styles.resetButton]}
            onPress={() => {
              setRunning(false);
              setTimeLeft(initialTime);
              setSessionStarted(false);
            }}
          >
            <Text style={styles.buttonLabel}>Reset</Text>
          </TouchableOpacity>
        </View>
        {sessionStarted && !running && (
          <TouchableOpacity style={styles.finishButton} onPress={handleFinishSession}>
            <Text style={styles.finishButtonText}>Finish Session</Text>
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: { flex: 1 },
  container: { flex: 1, padding: 30, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 20 },
  timerCircle: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 3,
    marginBottom: 30,
  },
  timerText: { fontSize: 40, color: '#1A1A1A', fontWeight: 'bold' },
  presetsContainer: { flexDirection: 'row', flexWrap: 'wrap', width: '80%', justifyContent: 'space-between', marginBottom: 20 },
  presetButton: { width: '48%', marginVertical: 6, paddingVertical: 20, borderRadius: 25, backgroundColor: '#FFC700', alignItems: 'center', justifyContent: 'center' },
  presetButtonActive: { borderWidth: 2, borderColor: '#000' },
  presetButtonText: { color: '#1A1A1A', fontSize: 16, fontWeight: 'bold' },
  customContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  customInput: { height: 40, width: 100, borderColor: '#CCC', borderWidth: 1, borderRadius: 10, paddingHorizontal: 8, marginRight: 10, color: '#1A1A1A' },
  customButton: { backgroundColor: '#FFC700', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20 },
  customButtonText: { color: '#1A1A1A', fontWeight: 'bold', fontSize: 16 },
  buttonRow: { flexDirection: 'row', marginBottom: 20 },
  timerButton: { borderRadius: 30, paddingVertical: 10, paddingHorizontal: 20, marginHorizontal: 5 },
  startButton: { backgroundColor: '#00C851' },
  pauseButton: { backgroundColor: '#FF9800' },
  resetButton: { backgroundColor: '#F44336' },
  buttonLabel: { fontSize: 16, color: '#FFFFFF', fontWeight: 'bold' },
  finishButton: { backgroundColor: '#000', paddingVertical: 15, paddingHorizontal: 50, borderRadius: 25, marginTop: 20 },
  finishButtonText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
});
