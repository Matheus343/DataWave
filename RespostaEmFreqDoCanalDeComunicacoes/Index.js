import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import RespostaEmFrequenciaCanal from './RespostaEmFrequenciaCanal';

export default function GraficoRespostaFrequencia({ route, navigation }) {
  const { amplitude, frequencia, fase, periodo } = route.params;

  const [waveTypeIndex, setWaveTypeIndex] = useState(0);
  const waveTypes = ['senoidal', 'quadrada', 'denteSerra', 'senoideRetif', 'triangular'];
  
  const handleNextWaveType = () => {
    setWaveTypeIndex((waveTypeIndex + 1) % waveTypes.length);
  };

  const handlePreviousWaveType = () => {
    setWaveTypeIndex((waveTypeIndex - 1 + waveTypes.length) % waveTypes.length);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gráfico da resposta em frequência do canal de comunicações</Text>

      <RespostaEmFrequenciaCanal 
        amplitude={amplitude} 
        frequencia={frequencia} 
        fase={fase} 
        periodo={periodo} 
        waveType={waveTypes[waveTypeIndex]}
      />

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
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F7F7',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
    marginTop: 10,
  },
  carouselButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginVertical: 20,
  },
  carouselButton: {
    backgroundColor: '#A9A9F5',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  carouselButtonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  footerButton: {
    backgroundColor: '#A9A9F5',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 70,
  },
  footerButtonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginTop: 20,
  },
  navButton: {
    backgroundColor: '#A9A9F5',
    padding: 10,
    borderRadius: 20,
  },
  navButtonText: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
