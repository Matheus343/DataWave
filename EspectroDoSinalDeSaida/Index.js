import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function GraficoEspectroSaida({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gráfico do espectro do sinal de saída</Text>

      <Image source={require('../assets/grafico7.png')} style={styles.imageGrafico} />

      <Image source={require('../assets/grafico8.png')} style={styles.imageGrafico} />

      <View style={styles.footerButtons}>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.footerButtonText}>Início</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Calculos')}>
          <Text style={styles.footerButtonText}>Cálculo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F7F7',
  },
  voltar: {
    fontSize: 30,
    color: 'black',
    position: 'absolute',
    top: 20,
    left: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  imageGrafico: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  footerButton: {
    backgroundColor: '#A9A9F5',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginBottom: 20,
  },
  footerButtonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
