import React, { createContext, useState } from 'react';

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

  const [username, setUsername] = useState('Carolina');

  const addStudyTime = minutes => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = days[new Date().getDay()];
    setStudyData(prev => ({
      ...prev,
      [today]: prev[today] + minutes,
    }));
  };

  return (
    <StudyContext.Provider value={{ studyData, addStudyTime, username, setUsername }}>
      {children}
    </StudyContext.Provider>
  );
};
