import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getBPClassification } from '../utils/bpCalculator';

const BPCard = ({ record, onPress }) => {
  const { category, color } = getBPClassification(record.systolic, record.diastolic);
  const date = new Date(record.timestamp);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.dateSection}>
          <Ionicons name="calendar-outline" size={20} color="#999999" />
          <Text style={styles.dateText}>
            {date.toLocaleDateString('zh-HK', { month: '2-digit', day: '2-digit' })}
          </Text>
        </View>
        <View style={styles.timeSection}>
          <Ionicons name="time-outline" size={20} color="#999999" />
          <Text style={styles.timeText}>
            {date.toLocaleTimeString('zh-HK', { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
      </View>

      <View style={styles.readings}>
        <View style={styles.reading}>
          <Text style={styles.label}>收縮壓</Text>
          <Text style={[styles.value, { color: color }]}>{record.systolic}</Text>
          <Text style={styles.unit}>mmHg</Text>
        </View>
        <View style={styles.divider}>
          <Ionicons name="remove" size={24} color="#CCCCCC" />
        </View>
        <View style={styles.reading}>
          <Text style={styles.label}>舒張壓</Text>
          <Text style={[styles.value, { color: color }]}>{record.diastolic}</Text>
          <Text style={styles.unit}>mmHg</Text>
        </View>
      </View>

      {record.pulse && (
        <View style={styles.pulseContainer}>
          <Ionicons name="heart-outline" size={20} color="#FF9800" />
          <Text style={styles.pulseText}>{record.pulse} bpm</Text>
        </View>
      )}

      <View style={[styles.statusBadge, { backgroundColor: color }]}>
        <Ionicons 
          name={category === '正常' ? 'checkmark-circle' : 
                category === '正常偏高' ? 'warning' :
                category === '高血壓' ? 'alert-circle' : 'information-circle'} 
          size={20} 
          color="#FFFFFF" 
          style={styles.statusIcon}
        />
        <Text style={styles.statusText}>{category}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginVertical: 12,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dateSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  timeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  timeText: {
    fontSize: 16,
    color: '#666666',
  },
  readings: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  reading: {
    alignItems: 'center',
    flex: 1,
  },
  label: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 8,
  },
  value: {
    fontSize: 52,
    fontWeight: 'bold',
  },
  unit: {
    fontSize: 14,
    color: '#999999',
    marginTop: 4,
  },
  divider: {
    width: 1,
    height: 60,
    justifyContent: 'center',
    backgroundColor: '#F0F0F0',
  },
  pulseContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
    backgroundColor: '#FFF3E0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignSelf: 'center',
  },
  pulseText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF9800',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignSelf: 'center',
    gap: 8,
  },
  statusIcon: {
    fontSize: 20,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BPCard;
