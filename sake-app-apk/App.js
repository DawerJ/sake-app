import React, { useState } from 'react';
import { Text, View, Button, TextInput, ScrollView } from 'react-native';

export default function App() {
  const [note, setNote] = useState('');
  const [log, setLog] = useState([]);

  const handleSave = () => {
    if (note.trim()) {
      setLog([...log, { timestamp: new Date().toLocaleString(), note }]);
      setNote('');
    }
  };

  return (
    <ScrollView style={{ padding: 20, marginTop: 50 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Sake Brewing Tracker</Text>
      <TextInput
        placeholder="Enter today's notes..."
        value={note}
        onChangeText={setNote}
        style={{ borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <Button title="Save Note" onPress={handleSave} />
      {log.map((entry, index) => (
        <View key={index} style={{ marginTop: 10 }}>
          <Text style={{ fontWeight: 'bold' }}>{entry.timestamp}</Text>
          <Text>{entry.note}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
