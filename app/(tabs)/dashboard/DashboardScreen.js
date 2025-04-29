import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const StudyContext = createContext();

const defaultData = {
  day: new Array(24).fill(0),
  week: {
    Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0, Sunday: 0,
  },
  month: new Array(30).fill(0),
  year: {
    January: 0, February: 0, March: 0, April: 0, May: 0, June: 0,
    July: 0, August: 0, September: 0, October: 0, November: 0, December: 0,
  },
};

export const StudyProvider = ({ children }) => {
  const [studyData, setStudyData] = useState(defaultData);
  const [subject, setSubject] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const saved = await AsyncStorage.getItem('studyData');
        if (saved) {
          setStudyData(JSON.parse(saved));
        }
      } catch (error) {
        console.error('Failed to load study data:', error);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('studyData', JSON.stringify(studyData));
  }, [studyData]);

  const addStudyTime = (minutes) => {
    const now = new Date();
    const weekday = now.toLocaleDateString('en-US', { weekday: 'long' });
    const monthName = now.toLocaleDateString('en-US', { month: 'long' });
    const day = now.getDate();
    const hour = now.getHours();

    setStudyData((prev) => {
      const updated = {
        ...prev,
        day: [...prev.day],
        week: { ...prev.week },
        month: [...prev.month],
        year: { ...prev.year },
      };
      updated.day[hour] += minutes;
      updated.week[weekday] += minutes;
      if (day - 1 >= 0 && day - 1 < 30) updated.month[day - 1] += minutes;
      updated.year[monthName] += minutes;
      return updated;
    });
  };

  const resetStudyData = () => {
    setStudyData(defaultData);
  };

  return (
    <StudyContext.Provider value={{
      studyData,
      setStudyData,
      addStudyTime,
      resetStudyData,
      subject,
      setSubject,
    }}>
      {children}
    </StudyContext.Provider>
  );
};
