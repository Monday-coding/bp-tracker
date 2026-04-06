import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import BPInput from '../components/BPInput';
import LargeButton from '../components/LargeButton';
import { saveBPRecord } from '../storage/bpStorage';

const RecordScreen = ({ navigation }) => {
  const [systolic, setSystolic] = useState(120);
  const [diastolic, setDiastolic] = useState(80);
  const [pulse, setPulse] = useState(72);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!systolic || !diastolic) {
      Alert.alert('請填寫所有必填項目');
      return;
    }

    try {
      setSaving(true);
      await saveBPRecord({
        systolic,
        diastolic,
        pulse,
        timestamp: date.toISOString(),
      });
      Alert.alert('成功', '血壓記錄已保存', [
        {
          text: '確定',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert('錯誤', '保存失敗，請重試');
      console.error('Error saving record:', error);
    } finally {
      setSaving(false);
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('zh-HK', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('zh-HK', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image 
            source={require('../assets/tutorial/logo.png')} 
            style={styles.headerLogo}
            resizeMode="contain"
          />
          <Text style={styles.headerTitle}>記錄血壓</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.dateContainer}>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <View style={styles.dateButton}>
              <Text style={styles.dateLabel}>日期時間</Text>
              <View style={styles.dateValues}>
                <Text style={styles.dateValue}>{formatDate(date)}</Text>
                <Text style={styles.timeValue}>{formatTime(date)}</Text>
              </View>
              <Text style={styles.changeText}>點擊更改</Text>
            </View>
          </TouchableOpacity>
        </View>

        <BPInput
          label="收縮壓（高壓）"
          value={systolic}
          onChange={setSystolic}
          placeholder="120"
        />

        <BPInput
          label="舒張壓（低壓）"
          value={diastolic}
          onChange={setDiastolic}
          placeholder="80"
        />

        <BPInput
          label="脈搏（可選）"
          value={pulse}
          onChange={setPulse}
          unit="bpm"
          placeholder="72"
        />

        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>小提示</Text>
          <Text style={styles.tipsText}>• 測量前請休息5分鐘</Text>
          <Text style={styles.tipsText}>• 保持安靜，不要說話</Text>
          <Text style={styles.tipsText}>• 手臂與心臟水平</Text>
          <Text style={styles.tipsText}>• 每天同一時間測量更準確</Text>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <LargeButton
          title={saving ? '保存中...' : '保存記錄'}
          onPress={handleSave}
          color="#4CAF50"
          disabled={saving}
          style={styles.saveButton}
        />
        <LargeButton
          title="取消"
          onPress={() => navigation.goBack()}
          color="#999999"
          style={styles.cancelButton}
        />
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="datetime"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setDate(selectedDate);
            }
          }}
        />
      )}
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
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLogo: {
    width: 56,
    height: 56,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  scrollContainer: {
    flex: 1,
    padding: 16,
  },
  dateContainer: {
    marginBottom: 32,
  },
  dateButton: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dateLabel: {
    fontSize: 18,
    color: '#666666',
    marginBottom: 12,
  },
  dateValues: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  dateValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginRight: 16,
  },
  timeValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  changeText: {
    fontSize: 14,
    color: '#007AFF',
  },
  tipsContainer: {
    backgroundColor: '#FFF3E0',
    padding: 20,
    borderRadius: 12,
    marginTop: 24,
  },
  tipsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF9800',
    marginBottom: 12,
  },
  tipsText: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 6,
    lineHeight: 24,
  },
  buttonContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  saveButton: {
    marginBottom: 12,
  },
  cancelButton: {
    marginBottom: 0,
  },
});

export default RecordScreen;
