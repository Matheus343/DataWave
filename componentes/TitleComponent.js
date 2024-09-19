import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function TitleComponent() {
  return <Text style={styles.title}>DataWave</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
