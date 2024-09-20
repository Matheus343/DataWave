import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Título */}
      <Text style={styles.title}>DataWave</Text>
      
      {/* Imagem Central */}
      <Image source={require('../assets/dw_imagem.png')} style={styles.logo} />
    
      {/* Botão Entrar */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Calculos')}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 10,

  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 20,
  },
  button: {
    backgroundColor: '#A9A9F5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginLeft: 10,

  },
  buttonText: {
    fontSize: 18,
    color: '#000',
  },
});
