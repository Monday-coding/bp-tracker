import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { getLatestRecords, calculateAverageBP } from '../storage/bpStorage';
import BPCard from '../components/BPCard';
import LargeButton from '../components/LargeButton';

const HomeScreen = ({ navigation }) => {
  const [records, setRecords] = useState([]);
  const [average, setAverage] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const latestRecords = await getLatestRecords(5);
      setRecords(latestRecords);
      setAverage(calculateAverageBP(latestRecords));
    } catch (error) {
      console.error('Error loading records:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const unsubscribe = navigation.addListener('focus', loadData);
    return unsubscribe;
  }, [navigation]);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>載入中...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>血壓記錄</Text>
        <Text style={styles.headerSubtitle}>為您的健康把关</Text>
      </View>

      {records.length > 0 && average && (
        <View style={styles.averageContainer}>
          <Text style={styles.averageTitle}>最近平均</Text>
          <View style={styles.averageReading}>
            <Text style={styles.averageValue}>{average.systolic}</Text>
            <Text style={styles.averageSeparator}>/</Text>
            <Text style={styles.averageValue}>{average.diastolic}</Text>
            {average.pulse > 0 && (
              <Text style={styles.averagePulse}>| {average.pulse} bpm</Text>
            )}
          </View>
        </View>
      )}

      <ScrollView style={styles.scrollContainer}>
        {records.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>還沒有記錄</Text>
            <Text style={styles.emptySubtext}>點擊下方按鈕開始記錄</Text>
          </View>
        ) : (
          <>
            {records.map((record) => (
              <TouchableOpacity
                key={record.id}
                onPress={() => navigation.navigate('History')}
              >
                <BPCard record={record} />
              </TouchableOpacity>
            ))}
          </>
        )}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <LargeButton
          title="+ 記錄血壓"
          onPress={() => navigation.navigate('Record')}
          color="#007AFF"
          style={styles.primaryButton}
        />
        <LargeButton
          title="歷史記錄"
          onPress={() => navigation.navigate('History')}
          color="#4CAF50"
          style={styles.secondaryButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#007AFF',
    padding: 24,
    paddingTop: 60,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 18,
    color: '#E3F2FD',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#666666',
    marginTop: 16,
  },
  averageContainer: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  averageTitle: {
    fontSize: 18,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 12,
  },
  averageReading: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  averageValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  averageSeparator: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#CCCCCC',
    marginHorizontal: 8,
  },
  averagePulse: {
    fontSize: 20,
    color: '#666666',
    marginLeft: 8,
  },
  scrollContainer: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
  },
  emptyText: {
    fontSize: 24,
    color: '#666666',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#999999',
  },
  buttonContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  primaryButton: {
    marginBottom: 12,
  },
  secondaryButton: {
    marginBottom: 0,
  },
});

export default HomeScreen;
