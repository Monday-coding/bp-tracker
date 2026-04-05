import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { getBPRecordsByDate } from '../storage/bpStorage';
import LargeButton from '../components/LargeButton';
import { addDays, subDays, format } from 'date-fns';

const screenWidth = Dimensions.get('window').width;

const ChartScreen = ({ navigation }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState(7); // days

  const loadData = async () => {
    try {
      setLoading(true);
      const endDate = new Date();
      const startDate = subDays(endDate, dateRange - 1);
      const data = await getBPRecordsByDate(startDate, endDate);
      setRecords(data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)));
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [dateRange]);

  const chartData = () => {
    if (records.length === 0) return null;

    const labels = records.map((r) => format(new Date(r.timestamp), 'MM/dd'));
    const systolicData = records.map((r) => r.systolic);
    const diastolicData = records.map((r) => r.diastolic);

    return {
      labels,
      datasets: [
        {
          data: systolicData,
          color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
          strokeWidth: 2,
        },
        {
          data: diastolicData,
          color: (opacity = 1) => `rgba(54, 162, 235, ${opacity})`,
          strokeWidth: 2,
        },
      ],
    };
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>載入中...</Text>
      </View>
    );
  }

  const data = chartData();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>血壓趨勢</Text>
      </View>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#FF6384' }]} />
            <Text style={styles.legendText}>收縮壓</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#36A2EB' }]} />
            <Text style={styles.legendText}>舒張壓</Text>
          </View>
        </View>

        {data && data.labels.length > 0 ? (
          <View style={styles.chartContainer}>
            <LineChart
              data={data}
              width={screenWidth - 32}
              height={220}
              chartConfig={{
                backgroundColor: '#FFFFFF',
                backgroundGradientFrom: '#FFFFFF',
                backgroundGradientTo: '#FFFFFF',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '4',
                  strokeWidth: '2',
                  stroke: '#FFFFFF',
                },
              }}
              bezier
              style={styles.chart}
            />
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>沒有數據可顯示</Text>
            <Text style={styles.emptySubtext}>請先記錄一些血壓數據</Text>
          </View>
        )}

        <View style={styles.dateRangeContainer}>
          <Text style={styles.dateRangeTitle}>時間範圍</Text>
          <View style={styles.dateRangeButtons}>
            {[7, 14, 30].map((days) => (
              <LargeButton
                key={days}
                title={`${days}天`}
                onPress={() => setDateRange(days)}
                color={dateRange === days ? '#007AFF' : '#CCCCCC'}
                style={styles.dateRangeButton}
              />
            ))}
          </View>
        </View>

        {records.length > 0 && (
          <View style={styles.statsContainer}>
            <Text style={styles.statsTitle}>統計數據</Text>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>最高收縮壓</Text>
              <Text style={styles.statValue}>
                {Math.max(...records.map((r) => r.systolic))} mmHg
              </Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>最低收縮壓</Text>
              <Text style={styles.statValue}>
                {Math.min(...records.map((r) => r.systolic))} mmHg
              </Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>平均收縮壓</Text>
              <Text style={styles.statValue}>
                {Math.round(
                  records.reduce((sum, r) => sum + r.systolic, 0) / records.length
                )}{' '}
                mmHg
              </Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>最高舒張壓</Text>
              <Text style={styles.statValue}>
                {Math.max(...records.map((r) => r.diastolic))} mmHg
              </Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>最低舒張壓</Text>
              <Text style={styles.statValue}>
                {Math.min(...records.map((r) => r.diastolic))} mmHg
              </Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>平均舒張壓</Text>
              <Text style={styles.statValue}>
                {Math.round(
                  records.reduce((sum, r) => sum + r.diastolic, 0) / records.length
                )}{' '}
                mmHg
              </Text>
            </View>
          </View>
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
    padding: 16,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 16,
    color: '#333333',
  },
  chartContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 10,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  emptyContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyText: {
    fontSize: 20,
    color: '#666666',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#999999',
  },
  dateRangeContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  dateRangeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
    textAlign: 'center',
  },
  dateRangeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  dateRangeButton: {
    minWidth: 80,
  },
  statsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  statLabel: {
    fontSize: 16,
    color: '#666666',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
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

export default ChartScreen;
