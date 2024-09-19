import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function ButtonComponent({ navigation }) {
  return (
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Screen1')}>
      <Text style={styles.buttonText}>Entrar</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#A9A9A9',
    paddingVertical: 10,
    paddingHorizontal: 60,
    borderRadius: 20,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#000',
  },
});
