import React, { useState } from 'react';
import { View, Text, Dimensions, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const sampleRate = 200;
const T = 0.1;
const numSamples = 100;
const width = Dimensions.get("window").width - 36;
const height = 220;

const tiposDeOnda = ['senoidal', 'quadrada'];

const calcularRespostaFrequencia = () => {
  const frequencias = [];
  const modulo = [];
  const fase = [];

  for (let k = 0; k < numSamples; k++) {
    const omega = (2 * Math.PI * k) / sampleRate;
    const H_jw = 1 / Math.sqrt(1 + Math.pow(omega * T, 2));
    const faseH_jw = -Math.atan(omega * T);

    frequencias.push(k);
    modulo.push(H_jw);
    fase.push(faseH_jw * (180 / Math.PI));
  }

  return { modulo, fase };
};

const RespostaEmFrequenciaCanal = () => {
  const [currentTypeIndex, setCurrentTypeIndex] = useState(0);

  const handleNextWaveType = () => {
    setCurrentTypeIndex((currentTypeIndex + 1) % tiposDeOnda.length);
  };

  const handlePreviousWaveType = () => {
    setCurrentTypeIndex((currentTypeIndex - 1 + tiposDeOnda.length) % tiposDeOnda.length);
  };

  const { modulo, fase } = calcularRespostaFrequencia();

  const chartConfig = {
    backgroundColor: "#A020F0",
    backgroundGradientFrom: "#953553",
    backgroundGradientTo: "#51414F",
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: { borderRadius: 16 },
  };

  const generateLabels = () => Array.from({ length: modulo.length }, (_, i) => (i % 10 === 0 ? i.toString() : ''));

  const waveType = tiposDeOnda[currentTypeIndex];

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 20 }}>
      <Text style={styles.title}>Resposta em Frequência do Canal</Text>

      <View style={{ marginVertical: 10 }}>
        <Text style={{ textAlign: 'center', marginBottom: 10 }}>Módulo vs Frequência</Text>
        <LineChart
          data={{
            labels: generateLabels(),
            datasets: [{ data: modulo }]
          }}
          width={width}
          height={height}
          chartConfig={chartConfig}
          style={{ marginVertical: 8, borderRadius: 16 }}
        />
      </View>

      <View style={{ marginVertical: 10 }}>
        <Text style={{ textAlign: 'center', marginBottom: 10 }}>Fase vs Frequência</Text>
        <LineChart
          data={{
            labels: generateLabels(),
            datasets: [{ data: fase }]
          }}
          width={width}
          height={height}
          chartConfig={chartConfig}
          style={{ marginVertical: 8, borderRadius: 16 }}
        />
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  carouselButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
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
});

export default RespostaEmFrequenciaCanal;
