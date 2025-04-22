import React, { useContext } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { StudyContext } from '../StudyContext';
import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function SubjectDetail() {
  const { subjectTotals } = useContext(StudyContext);

  const data = Object.entries(subjectTotals).map(([subject, value], i) => ({
    name: subject,
    population: value,
    color: ['#FFCC80', '#FFD54F', '#FFB74D', '#FFF176'][i % 4],
    legendFontColor: '#333',
    legendFontSize: 14,
  }));

  const topSubject = data.sort((a, b) => b.population - a.population)[0]?.name || 'None';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📚 Most Studied Subject</Text>
      {data.length > 0 ? (
        <>
          <PieChart
            data={data}
            width={screenWidth - 40}
            height={220}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            chartConfig={{
              color: () => '#333',
            }}
            style={styles.chart}
          />
          <Text style={styles.summary}>You're spending most of your time on <Text style={styles.highlight}>{topSubject}</Text>!</Text>
        </>
      ) : (
        <Text style={styles.empty}>No study data available yet.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDE7',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 20,
  },
  chart: {
    borderRadius: 16,
  },
  summary: {
    marginTop: 20,
    fontSize: 16,
    color: '#555',
  },
  highlight: {
    color: '#FB8C00',
    fontWeight: 'bold',
  },
  empty: {
    fontSize: 16,
    color: '#888',
    marginTop: 40,
  },
});
