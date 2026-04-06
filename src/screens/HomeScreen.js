import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
        <View style={styles.headerLeft}>
          <Image 
            source={require('../assets/tutorial/logo.png')} 
            style={styles.headerLogo}
            resizeMode="contain"
          />
          <View>
            <Text style={styles.headerTitle}>血壓記錄</Text>
            <Text style={styles.headerSubtitle}>為您的健康把关</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Tutorial')} style={styles.helpButton}>
          <Ionicons name="help-circle-outline" size={32} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {records.length > 0 && average && (
        <View style={styles.averageContainer}>
          <View style={styles.averageHeader}>
            <Ionicons name="analytics-outline" size={24} color="#007AFF" />
            <Text style={styles.averageTitle}>最近平均</Text>
          </View>
          <View style={styles.averageReading}>
            <Text style={styles.averageValue}>{average.systolic}</Text>
            <Text style={styles.averageSeparator}>/</Text>
            <Text style={styles.averageValue}>{average.diastolic}</Text>
            {average.pulse > 0 && (
              <View style={styles.pulseBadge}>
                <Ionicons name="heart" size={16} color="#FF9800" />
                <Text style={styles.averagePulse}>{average.pulse}</Text>
              </View>
            )}
          </View>
        </View>
      )}

      <ScrollView style={styles.scrollContainer}>
        {records.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Image 
              source={require('../assets/tutorial/logo.png')} 
              style={styles.emptyLogo}
              resizeMode="contain"
            />
            <Text style={styles.emptyText}>還沒有記錄</Text>
            <Text style={styles.emptySubtext}>點擊下方按鈕開始記錄</Text>
            <TouchableOpacity 
              style={styles.emptyButton}
              onPress={() => navigation.navigate('Tutorial')}
            >
              <Ionicons name="school-outline" size={20} color="#007AFF" />
              <Text style={styles.emptyButtonText}>查看使用教學</Text>
            </TouchableOpacity>
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
          icon="add-circle"
          style={styles.primaryButton}
        />
        <LargeButton
          title="歷史記錄"
          onPress={() => navigation.navigate('History')}
          color="#4CAF50"
          icon="list-outline"
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
    paddingBottom: 32,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerLogo: {
    width: 64,
    height: 64,
    marginRight: 16,
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
  helpButton: {
    padding: 8,
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
    padding: 24,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  averageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  averageTitle: {
    fontSize: 18,
    color: '#666666',
    fontWeight: '600',
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
    marginHorizontal: 12,
  },
  pulseBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginLeft: 12,
  },
  averagePulse: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF9800',
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
  emptyLogo: {
    width: 200,
    height: 200,
    marginBottom: 24,
  },
  emptyText: {
    fontSize: 24,
    color: '#666666',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#999999',
    marginBottom: 24,
  },
  emptyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  emptyButtonText: {
    fontSize: 18,
    color: '#007AFF',
    fontWeight: '600',
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
