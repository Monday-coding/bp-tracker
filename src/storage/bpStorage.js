import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'bp_records';

export const saveBPRecord = async (record) => {
  try {
    const existingRecords = await getBPRecords();
    const newRecord = {
      id: Date.now().toString(),
      ...record,
      timestamp: record.timestamp || new Date().toISOString(),
    };
    const updatedRecords = [...existingRecords, newRecord];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecords));
    return newRecord;
  } catch (error) {
    console.error('Error saving BP record:', error);
    throw error;
  }
};

export const getBPRecords = async () => {
  try {
    const records = await AsyncStorage.getItem(STORAGE_KEY);
    return records ? JSON.parse(records) : [];
  } catch (error) {
    console.error('Error getting BP records:', error);
    return [];
  }
};

export const deleteBPRecord = async (id) => {
  try {
    const existingRecords = await getBPRecords();
    const updatedRecords = existingRecords.filter(record => record.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecords));
    return updatedRecords;
  } catch (error) {
    console.error('Error deleting BP record:', error);
    throw error;
  }
};

export const getBPRecordsByDate = async (startDate, endDate) => {
  try {
    const records = await getBPRecords();
    return records.filter(record => {
      const recordDate = new Date(record.timestamp);
      return recordDate >= startDate && recordDate <= endDate;
    });
  } catch (error) {
    console.error('Error getting BP records by date:', error);
    return [];
  }
};

export const getLatestRecords = async (limit = 10) => {
  try {
    const records = await getBPRecords();
    return records
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, limit);
  } catch (error) {
    console.error('Error getting latest records:', error);
    return [];
  }
};
