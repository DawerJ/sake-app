import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import * as Font from 'expo-font';
import { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      'serif-jp': require('./assets/fonts/NotoSerifJP-Regular.ttf')
    }).then(() => setLoaded(true));
  }, []);

  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}