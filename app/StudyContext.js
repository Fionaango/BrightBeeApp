import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const StudyContext = createContext();

const defaultData = {
  Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0,
  Friday: 0, Saturday: 0, Sunday: 0,
};

export const StudyProvider = ({ children }) => {
  const [studyData, setStudyData] = useState(defaultData);
  const [subjectTotals, setSubjectTotals] = useState({});
  const [monthlyTotals, setMonthlyTotals] = useState({});
  const [subject, setSubject] = useState(null);
  const [username, setUsername] = useState('Fiona');

  // Load from AsyncStorage when app starts
  useEffect(() => {
    const loadData = async () => {
      const storedStudy = await AsyncStorage.getItem('studyData');
      const storedSubjects = await AsyncStorage.getItem('subjectTotals');
      const storedMonthly = await AsyncStorage.getItem('monthlyTotals');

      if (storedStudy) setStudyData(JSON.parse(storedStudy));
      if (storedSubjects) setSubjectTotals(JSON.parse(storedSubjects));
      if (storedMonthly) setMonthlyTotals(JSON.parse(storedMonthly));
    };
    loadData();
  }, []);

  const saveAll = async (newStudy, newSubjects, newMonthly) => {
    await AsyncStorage.setItem('studyData', JSON.stringify(newStudy));
    await AsyncStorage.setItem('subjectTotals', JSON.stringify(newSubjects));
    await AsyncStorage.setItem('monthlyTotals', JSON.stringify(newMonthly));
  };

  const addStudyTime = (minutes) => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const month = new Date().toLocaleDateString('en-US', { month: 'long' });

    const updatedStudy = {
      ...studyData,
      [today]: (studyData[today] || 0) + minutes,
    };

    const updatedSubjects = {
      ...subjectTotals,
      [subject]: (subjectTotals[subject] || 0) + minutes,
    };

    const updatedMonthly = {
      ...monthlyTotals,
      [month]: (monthlyTotals[month] || 0) + minutes,
    };

    setStudyData(updatedStudy);
    setSubjectTotals(updatedSubjects);
    setMonthlyTotals(updatedMonthly);

    saveAll(updatedStudy, updatedSubjects, updatedMonthly);
  };

  const resetStudyData = async () => {
    setStudyData(defaultData);
    setSubjectTotals({});
    setMonthlyTotals({});
    await AsyncStorage.multiRemove(['studyData', 'subjectTotals', 'monthlyTotals']);
  };

  return (
    <StudyContext.Provider
      value={{
        studyData,
        subjectTotals,
        monthlyTotals,
        subject,
        setSubject,
        addStudyTime,
        resetStudyData,
        username,
        setUsername,
      }}
    >
      {children}
    </StudyContext.Provider>
  );
};
