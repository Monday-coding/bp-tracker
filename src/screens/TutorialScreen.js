import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TutorialScreen = ({ navigation }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const tutorials = [
    {
      title: '歡迎使用血壓記錄',
      image: require('../assets/tutorial/logo.png'),
      content: '這個 App 幫助您輕鬆記錄和管理血壓數據。讓我們一起學習如何使用吧！',
      color: '#007AFF',
    },
    {
      title: '測量前準備',
      image: require('../assets/tutorial/measure.png'),
      content: [
        '• 測量前請休息 5 分鐘',
        '• 保持安靜，不要說話',
        '• 手臂與心臟水平',
        '• 每天同一時間測量更準確',
      ],
      color: '#4CAF50',
    },
    {
      title: '記錄血壓',
      image: require('../assets/tutorial/add-record.png'),
      content: [
        '點擊首頁的「+ 記錄血壓」按鈕',
        '輸入收縮壓（高壓）和舒張壓（低壓）',
        '可選擇輸入脈搏',
        '點擊「保存記錄」完成',
      ],
      color: '#FF9800',
    },
    {
      title: '查看記錄',
      image: null,
      content: [
        '• 首頁顯示最近 5 條記錄',
        '• 點擊「歷史記錄」查看全部',
        '• 「血壓趨勢」查看圖表',
        '• 長按記錄可刪除',
      ],
      color: '#9C27B0',
    },
    {
      title: '血壓分類',
      image: null,
      content: [
        '🟢 正常： < 120/80',
        '🟡 正常偏高：120-139/80-89',
        '🔴 高血壓：≥ 140/90',
        '🟠 低血壓： < 90/60',
      ],
      color: '#F44336',
    },
    {
      title: '開始使用',
      image: null,
      content: '準備好了！點擊下方按鈕開始使用血壓記錄 App，為您的健康把關！',
      color: '#007AFF',
    },
  ];

  const handleNext = () => {
    if (currentPage < tutorials.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      navigation.navigate('Home');
    }
  };

  const handleSkip = () => {
    navigation.navigate('Home');
  };

  const currentTutorial = tutorials[currentPage];

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, { backgroundColor: currentTutorial.color }]}>
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>跳過</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{currentTutorial.title}</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        {currentTutorial.image && (
          <View style={styles.imageContainer}>
            <Image source={currentTutorial.image} style={styles.image} resizeMode="contain" />
          </View>
        )}

        <View style={styles.contentContainer}>
          {Array.isArray(currentTutorial.content) ? (
            currentTutorial.content.map((item, index) => (
              <View key={index} style={styles.contentItem}>
                <Ionicons name="checkmark-circle" size={24} color={currentTutorial.color} />
                <Text style={styles.contentText}>{item}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.contentText}>{currentTutorial.content}</Text>
          )}
        </View>

        {currentTutorial.title === '開始使用' && (
          <View style={styles.emojiContainer}>
            <Text style={styles.emoji}>❤️</Text>
            <Text style={styles.emoji}>📊</Text>
            <Text style={styles.emoji}>📱</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.pagination}>
        {tutorials.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: index === currentPage ? currentTutorial.color : '#E0E0E0' },
            ]}
          />
        ))}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: currentTutorial.color }]}
          onPress={handleNext}
        >
          <Text style={styles.buttonText}>
            {currentPage === tutorials.length - 1 ? '開始使用' : '下一步'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 24,
    paddingTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  skipButton: {
    padding: 8,
  },
  skipText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerRight: {
    width: 80,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  image: {
    width: 280,
    height: 280,
  },
  contentContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  contentText: {
    fontSize: 20,
    color: '#333333',
    lineHeight: 32,
    marginLeft: 12,
    flex: 1,
  },
  emojiContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
    gap: 24,
  },
  emoji: {
    fontSize: 48,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  footer: {
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  button: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default TutorialScreen;
