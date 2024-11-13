import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Screen8() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Projeto feito por:</Text>
      
      <Text style={styles.text}>Adriana Martani // RA: 082210012</Text>

      <Text style={styles.text}>Victor Flohr // RA: 0822100</Text>
      
      <Text style={styles.text}>Matheus Xavier // RA: 082210042</Text>

      <Text style={styles.text}>Yasmin Maciel  // RA: 082210040</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});
