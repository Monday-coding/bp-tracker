import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getBPClassification } from '../utils/bpCalculator';

const BPCard = ({ record, onPress }) => {
  const { category, color } = getBPClassification(record.systolic, record.diastolic);
  const date = new Date(record.timestamp);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.dateText}>
          {date.toLocaleDateString('zh-HK', { month: '2-digit', day: '2-digit' })}
        </Text>
        <Text style={styles.timeText}>
          {date.toLocaleTimeString('zh-HK', { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>

      <View style={styles.readings}>
        <View style={styles.reading}>
          <Text style={styles.label}>收縮壓</Text>
          <Text style={[styles.value, { color: color }]}>{record.systolic}</Text>
        </View>
        <Text style={styles.separator}>/</Text>
        <View style={styles.reading}>
          <Text style={styles.label}>舒張壓</Text>
          <Text style={[styles.value, { color: color }]}>{record.diastolic}</Text>
        </View>
      </View>

      {record.pulse && (
        <View style={styles.pulseContainer}>
          <Text style={styles.pulseLabel}>脈搏</Text>
          <Text style={styles.pulseValue}>{record.pulse} bpm</Text>
        </View>
      )}

      <View style={[styles.statusBadge, { backgroundColor: color }]}>
        <Text style={styles.statusText}>{category}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  timeText: {
    fontSize: 16,
    color: '#666666',
  },
  readings: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  reading: {
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 4,
  },
  value: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  separator: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#CCCCCC',
    marginHorizontal: 8,
  },
  pulseContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  pulseLabel: {
    fontSize: 18,
    color: '#666666',
    marginRight: 8,
  },
  pulseValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF9800',
  },
  statusBadge: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'center',
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BPCard;
