import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function StageScreen({ route }) {
  const { stage } = route.params;

  const [date, setDate] = useState('');
  const [temperature, setTemperature] = useState('');
  const [notes, setNotes] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(stage).then(data => {
      if (data) {
        const parsed = JSON.parse(data);
        setDate(parsed.date || '');
        setTemperature(parsed.temperature || '');
        setNotes(parsed.notes || '');
      }
    });
  }, []);

  const save = async () => {
    const entry = { date, temperature, notes };
    await AsyncStorage.setItem(stage, JSON.stringify(entry));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{stage}</Text>

      <Text style={styles.label}>Date Started</Text>
      <Pressable onPress={() => setShowPicker(true)} style={styles.dateBox}>
        <Text>{date ? date : "Select a date"}</Text>
      </Pressable>
      {showPicker && (
        <DateTimePicker
          value={date ? new Date(date) : new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) setDate(selectedDate.toISOString().split('T')[0]);
          }}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Temperature (°C)"
        value={temperature}
        onChangeText={setTemperature}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Notes"
        value={notes}
        onChangeText={setNotes}
        multiline
      />

      <Button title="Save" onPress={save} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20
  },
  label: {
    fontWeight: '500',
    marginBottom: 6
  },
  dateBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    marginBottom: 16
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 16,
    borderRadius: 6
  }
});
