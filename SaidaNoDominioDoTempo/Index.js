import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import SinalSaidaDominioTempoGrafico from './SinalSaidaNoDominioDoTempo';

export default function GraficoSinalSaida({ route, navigation }) {
  const { amplitude, frequencia, fase, periodo } = route.params; 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sinal de saída no domínio do tempo</Text>

      <SinalSaidaDominioTempoGrafico 
        amplitude={amplitude} 
        frequencia={frequencia} 
        fase={fase} 
        periodo={periodo} 
      />

      <Text style={styles.instruction}>Valores utilizados para construção do gráfico</Text>

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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  instruction: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
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
