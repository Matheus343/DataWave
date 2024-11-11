import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const EspectroSinalEntrada = ({ amplitude, frequencia, fase, periodo }) => {
  const sampleRate = 100;
  const numSamples = sampleRate * periodo;
  const signal = [];

  for (let t = 0; t < numSamples; t++) {
    const time = t / sampleRate;
    const y = amplitude * Math.cos(2 * Math.PI * frequencia * time + fase);
    signal.push(y);
  }

  const dft = (signal) => {
    const N = signal.length;
    const magnitudes = [];

    for (let k = 0; k < N / 2; k++) { 
      let real = 0;
      let imag = 0;

      for (let n = 0; n < N; n++) {
        const angle = (2 * Math.PI * k * n) / N;
        real += signal[n] * Math.cos(angle);
        imag -= signal[n] * Math.sin(angle);
      }

      const magnitude = Math.sqrt(real * real + imag * imag);
      magnitudes.push(magnitude);
    }

    return magnitudes;
  };

  const magnitudes = dft(signal);

  return (
    <View>
      <Text style={{ textAlign: 'center', marginBottom: 10 }}>Espectro do Sinal de Entrada</Text>
      <LineChart
        data={{
          labels: Array.from({ length: magnitudes.length }, (_, i) => i.toString()),
          datasets: [{ data: magnitudes }]
        }}
        width={Dimensions.get("window").width - 16}
        height={220}
        chartConfig={{
          backgroundColor: "#A020F0",
          backgroundGradientFrom: "#953553",
          backgroundGradientTo: "#51414F",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: { borderRadius: 16 },
        }}
        style={{ marginVertical: 8, borderRadius: 16 }}
      />
    </View>
  );
};

export default EspectroSinalEntrada;
