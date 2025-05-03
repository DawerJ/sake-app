import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import StageCard from '../components/StageCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

const stages = ['Rice Prep', 'Koji Making', 'Shubo', 'Moromi', 'Pressing & Bottling'];

export default function DashboardScreen({ navigation }) {
  const [stageSummaries, setStageSummaries] = useState({});

  useEffect(() => {
    const loadSummaries = async () => {
      const results = {};
      for (const stage of stages) {
        const data = await AsyncStorage.getItem(stage);
        if (data) {
          const parsed = JSON.parse(data);
          results[stage] = parsed;
        }
      }
      setStageSummaries(results);
    };

    const unsubscribe = navigation.addListener('focus', loadSummaries);
    return unsubscribe;
  }, [navigation]);

  return (
    <ImageBackground
      source={require('../assets/images/background.jpg')}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Sake Brewing Stages</Text>
        {stages.map((stage, index) => (
          <StageCard
            key={index}
            stage={stage}
            data={stageSummaries[stage]}
            onPress={() => navigation.navigate('Stage', { stage })}
          />
        ))}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.85)',
    minHeight: '100%'
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
    fontFamily: 'serif-jp'
  }
});
