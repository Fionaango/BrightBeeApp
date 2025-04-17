import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const StudyContext = createContext();

export const StudyProvider = ({ children }) => {
  const [studyData, setStudyData] = useState({
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
    Sunday: 0,
  });

  const [username, setUsername] = useState('Fiona');
  const [subject, setSubject] = useState('Math'); // Default subject

  useEffect(() => {
    // Load data from AsyncStorage when the app starts
    const loadData = async () => {
      try {
        const savedUsername = await AsyncStorage.getItem('username');
        const savedStudyData = await AsyncStorage.getItem('studyData');
        const savedSubject = await AsyncStorage.getItem('subject');
        
        if (savedUsername !== null) setUsername(savedUsername);
        if (savedStudyData !== null) setStudyData(JSON.parse(savedStudyData));
        if (savedSubject !== null) setSubject(savedSubject);
      } catch (error) {
        console.error("Failed to load data from AsyncStorage", error);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    // Save data to AsyncStorage whenever username, subject, or studyData changes
    const saveData = async () => {
      try {
        await AsyncStorage.setItem('username', username);
        await AsyncStorage.setItem('studyData', JSON.stringify(studyData));
        await AsyncStorage.setItem('subject', subject);
      } catch (error) {
        console.error("Failed to save data to AsyncStorage", error);
      }
    };
    saveData();
  }, [username, studyData, subject]);

  const addStudyTime = (minutes) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = days[new Date().getDay()];
    setStudyData(prev => ({
      ...prev,
      [today]: prev[today] + minutes,
    }));
  };

  return (
    <StudyContext.Provider value={{ studyData, addStudyTime, username, setUsername, subject, setSubject }}>
      {children}
    </StudyContext.Provider>
  );
};
