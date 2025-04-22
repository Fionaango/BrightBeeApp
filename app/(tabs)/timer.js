import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity,
  TextInput, ScrollView, Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Audio } from 'expo-av';
import { StudyContext } from '../StudyContext';

export default function TimerScreen() {
  const { subject, setSubject, addStudyTime } = useContext(StudyContext);

  const [studyTime, setStudyTime] = useState(25);
  const [timeLeft, setTimeLeft] = useState(studyTime * 60);
  const [isRunning, setIsRunning] = useState(false);

  const [savedSubjects, setSavedSubjects] = useState([]);
  const [savedTimes, setSavedTimes] = useState([]);

  useEffect(() => {
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
    });
  }, []);


useEffect(() => {
  let timer = null;
  if (isRunning && timeLeft > 0) {
    timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
  } else if (isRunning && timeLeft === 0) {
    clearInterval(timer);
    setIsRunning(false);
    addStudyTime(studyTime); 
    Alert.alert("✅ Session Complete", `${studyTime} mins added.`);
  }
  return () => clearInterval(timer);
}, [isRunning, timeLeft]);


  useEffect(() => {
    setTimeLeft(studyTime * 60);
  }, [studyTime]);

  useEffect(() => {
    const loadSaved = async () => {
      const storedSubjects = await AsyncStorage.getItem('savedSubjects');
      const storedTimes = await AsyncStorage.getItem('savedTimes');
      if (storedSubjects) setSavedSubjects(JSON.parse(storedSubjects));
      if (storedTimes) setSavedTimes(JSON.parse(storedTimes));
    };
    loadSaved();
  }, []);

  const saveSubjects = async (list) => {
    setSavedSubjects(list);
    await AsyncStorage.setItem('savedSubjects', JSON.stringify(list));
  };

  const saveTimes = async (list) => {
    setSavedTimes(list);
    await AsyncStorage.setItem('savedTimes', JSON.stringify(list));
  };

  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/sound.mp3')
      );
      await sound.playAsync();
    } catch (error) {
      console.log('Sound play error:', error);
    }
  };

  useEffect(() => {
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      clearInterval(timer);
      setIsRunning(false);
      playSound();
      addStudyTime(studyTime);
      Alert.alert('Session Complete!', `🎉 You studied for ${studyTime} minutes!`);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleStop = () => {
    setIsRunning(false);
    setTimeLeft(studyTime * 60);
  };

  const addSubjectToList = () => {
    if (subject && !savedSubjects.includes(subject)) {
      const updated = [...savedSubjects, subject].sort((a, b) =>
        a.toLowerCase().localeCompare(b.toLowerCase())
      );
      saveSubjects(updated);
    }
  };

  const removeSubject = (s) => {
    const updated = savedSubjects.filter((item) => item !== s);
    saveSubjects(updated);
  };

  const addTimeToList = () => {
    if (!savedTimes.includes(studyTime)) {
      const updated = [...savedTimes, studyTime].sort((a, b) => a - b);
      saveTimes(updated);
    }
  };

  const removeTime = (t) => {
    const updated = savedTimes.filter((item) => item !== t);
    saveTimes(updated);
  };

  return (
    <LinearGradient colors={['#FFF1CC', '#FFFFFF']} style={styles.gradientBackground}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Choose a Subject and Time</Text>

          <Text style={styles.label}>Subject:</Text>
          <TextInput
            style={styles.input}
            value={subject}
            onChangeText={setSubject}
            placeholder="e.g. Math"
          />
          <View style={styles.tagList}>
            {savedSubjects.map((s, index) => (
              <TouchableOpacity key={index} style={styles.tag} onPress={() => setSubject(s)}>
                <Text>{s}</Text>
                <Text style={styles.removeTag} onPress={() => removeSubject(s)}> ✕ </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.tagAdd} onPress={addSubjectToList}>
              <Text>＋</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Study Time (minutes):</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={studyTime.toString()}
            onChangeText={(text) => {
              const value = parseInt(text) || 0;
              setStudyTime(value);
              setTimeLeft(value * 60);
            }}
          />
          <View style={styles.tagList}>
            {savedTimes.map((t, index) => (
              <TouchableOpacity key={index} style={styles.tag} onPress={() => {
                setStudyTime(t);
                setTimeLeft(t * 60);
              }}>
                <Text>{t}m</Text>
                <Text style={styles.removeTag} onPress={() => removeTime(t)}> ✕ </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.tagAdd} onPress={addTimeToList}>
              <Text>＋</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.timerDisplay}>{formatTime(timeLeft)}</Text>

          {!isRunning ? (
            <TouchableOpacity style={styles.button} onPress={() => setIsRunning(true)}>
              <Text style={styles.buttonText}>Start Study Session</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.rowButtons}>
              <TouchableOpacity style={styles.button} onPress={() => setIsRunning(false)}>
                <Text style={styles.buttonText}>Pause</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleStop}>
                <Text style={styles.buttonText}>Stop</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: { flex: 1 },
  container: {
    padding: 20,
    paddingTop: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#1A1A1A',
    alignSelf: 'flex-start',
    marginBottom: 5,
    marginTop: 15,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 5,
  },
  tagList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
    gap: 8,
  },
  tag: {
    flexDirection: 'row',
    backgroundColor: '#FFD966',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    alignItems: 'center',
  },
  removeTag: {
    marginLeft: 6,
    color: '#888',
  },
  tagAdd: {
    backgroundColor: '#eee',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerDisplay: {
    fontSize: 48,
    fontWeight: 'bold',
    marginVertical: 30,
    color: '#000',
  },
  button: {
    backgroundColor: '#FFC700',
    padding: 15,
    borderRadius: 25,
    marginVertical: 10,
    alignItems: 'center',
    width: '60%',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  rowButtons: {
    flexDirection: 'row',
    gap: 15,
  },
});
