import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator, Image } from 'react-native';
import { getBPRecords, deleteBPRecord } from '../storage/bpStorage';
import BPCard from '../components/BPCard';
import LargeButton from '../components/LargeButton';

const HistoryScreen = ({ navigation }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadRecords = async () => {
    try {
      setLoading(true);
      const allRecords = await getBPRecords();
      const sorted = allRecords.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setRecords(sorted);
    } catch (error) {
      console.error('Error loading records:', error);
      Alert.alert('錯誤', '無法載入記錄');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecords();
  }, []);

  const handleDelete = async (id) => {
    Alert.alert(
      '刪除記錄',
      '確定要刪除這條記錄嗎？',
      [
        { text: '取消', style: 'cancel' },
        {
          text: '刪除',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteBPRecord(id);
              await loadRecords();
            } catch (error) {
              Alert.alert('錯誤', '刪除失敗');
            }
          },
        },
      ]
    );
  };

  const handleExport = () => {
    if (records.length === 0) {
      Alert.alert('提示', '沒有記錄可匯出');
      return;
    }

    // 簡單的文本匯出
    const text = records
      .map((record) => {
        const date = new Date(record.timestamp);
        return `${date.toLocaleString('zh-HK')} - 血壓: ${record.systolic}/${record.diastolic}, 脈搏: ${record.pulse || 'N/A'} bpm`;
      })
      .join('\n');

    Alert.alert('匯出記錄', text, [{ text: '確定' }]);
  };

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
        <View style={styles.headerContent}>
          <Image 
            source={require('../assets/tutorial/logo.png')} 
            style={styles.headerLogo}
            resizeMode="contain"
          />
          <View>
            <Text style={styles.headerTitle}>歷史記錄</Text>
            <Text style={styles.headerSubtitle}>共 {records.length} 條記錄</Text>
          </View>
        </View>
      </View>

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
          </View>
        ) : (
          records.map((record) => (
            <TouchableOpacity
              key={record.id}
              onLongPress={() => handleDelete(record.id)}
              delayLongPress={500}
            >
              <BPCard record={record} />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      <View style={styles.buttonContainer}>
        {records.length > 0 && (
          <LargeButton
            title="匯出記錄"
            onPress={handleExport}
            color="#FF9800"
            style={styles.exportButton}
          />
        )}
        <LargeButton
          title="+ 記錄血壓"
          onPress={() => navigation.navigate('Record')}
          color="#007AFF"
          style={styles.primaryButton}
        />
        <LargeButton
          title="返回首頁"
          onPress={() => navigation.navigate('Home')}
          color="#999999"
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
    backgroundColor: '#4CAF50',
    padding: 24,
    paddingTop: 60,
    paddingBottom: 32,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
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
    color: '#E8F5E9',
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
  },
  buttonContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  exportButton: {
    marginBottom: 12,
  },
  primaryButton: {
    marginBottom: 12,
  },
  secondaryButton: {
    marginBottom: 0,
  },
});

export default HistoryScreen;
