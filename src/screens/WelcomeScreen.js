import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TutorialScreen from './TutorialScreen';

const WelcomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    checkFirstTime();
  }, []);

  const checkFirstTime = async () => {
    try {
      const hasSeenTutorial = await AsyncStorage.getItem('hasSeenTutorial');
      if (hasSeenTutorial) {
        navigation.replace('Home');
      } else {
        setShowTutorial(true);
      }
    } catch (error) {
      console.error('Error checking first time:', error);
      navigation.replace('Home');
    } finally {
      setLoading(false);
    }
  };

  const handleTutorialComplete = async () => {
    try {
      await AsyncStorage.setItem('hasSeenTutorial', 'true');
      navigation.replace('Home');
    } catch (error) {
      console.error('Error saving tutorial status:', error);
      navigation.replace('Home');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (showTutorial) {
    return <TutorialScreen navigation={{ ...navigation, replace: handleTutorialComplete }} />;
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WelcomeScreen;
