import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';

const iconMap = {
  'Rice Prep': require('../assets/images/rice.png'),
  'Koji Making': require('../assets/images/koji.png'),
  'Shubo': require('../assets/images/shubo.png'),
  'Moromi': require('../assets/images/moromi.png'),
  'Pressing & Bottling': require('../assets/images/pressing.png')
};

export default function StageCard({ stage, data, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={iconMap[stage]} style={styles.icon} />
      <View>
        <Text style={styles.text}>{stage}</Text>
        {data && (
          <Text style={styles.subtext}>
            {data.date ? `Started: ${data.date}` : ''}
            {data.temperature ? ` | Temp: ${data.temperature}°C` : ''}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 12
  },
  text: {
    fontSize: 18,
    fontWeight: '500'
  },
  subtext: {
    fontSize: 13,
    color: '#555',
    marginTop: 4
  }
});
