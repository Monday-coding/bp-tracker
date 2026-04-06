import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './src/screens/WelcomeScreen';
import HomeScreen from './src/screens/HomeScreen';
import RecordScreen from './src/screens/RecordScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import ChartScreen from './src/screens/ChartScreen';
import TutorialScreen from './src/screens/TutorialScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Record" component={RecordScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
        <Stack.Screen name="Chart" component={ChartScreen} />
        <Stack.Screen name="Tutorial" component={TutorialScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
