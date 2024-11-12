import React from 'react';
import { View, Text, Dimensions, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const RespostaEmFrequenciaCanal = ({ amplitude, frequencia, fase, periodo, waveType }) => {
  const sampleRate = 100;
  const numSamples = sampleRate * periodo;
  const width = Dimensions.get("window").width - 36;
  const height = 220;

  const gerarSinal = () => {
    const sinal = [];
    for (let t = 0; t < numSamples; t++) {
      const time = t / sampleRate;
      let y;
      switch (waveType) {
        case 'senoidal':
          y = amplitude * Math.cos(2 * Math.PI * frequencia * time + fase);
          break;
        case 'quadrada':
          y = amplitude * Math.sign(Math.sin(2 * Math.PI * frequencia * time + fase));
          break;
        case 'denteSerra':
          y = amplitude * (2 * (time * frequencia - Math.floor(0.5 + time * frequencia)));
          break;
        case 'senoideRetif':
          y = amplitude * Math.abs(Math.cos(2 * Math.PI * frequencia * time + fase));
          break;
        case 'triangular':
          y = amplitude * (2 * Math.abs(2 * (time * frequencia - Math.floor(time * frequencia + 0.5))) - 1);
          break;
        default:
          y = 0;
      }
      sinal.push(y);
    }
    return sinal;
  };

  const dft = (sinal) => {
    const N = sinal.length;
    const magnitudes = [];
    const phases = [];

    for (let k = 0; k < N / 2; k++) {
      let real = 0;
      let imag = 0;

      for (let n = 0; n < N; n++) {
        const angle = (2 * Math.PI * k * n) / N;
        real += sinal[n] * Math.cos(angle);
        imag -= sinal[n] * Math.sin(angle);
      }

      const magnitude = Math.sqrt(real * real + imag * imag);
      const phase = Math.atan2(imag, real);
      magnitudes.push(magnitude);
      phases.push(phase);
    }

    return { magnitudes, phases };
  };

  const sinal = gerarSinal();
  const { magnitudes, phases } = dft(sinal);

  const generateLabels = () => {
    return Array.from({ length: magnitudes.length }, (_, i) => (i % 10 === 0 ? i.toString() : ''));
  };

  const chartConfig = {
    backgroundColor: "#A020F0",
    backgroundGradientFrom: "#953553",
    backgroundGradientTo: "#51414F",
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: { borderRadius: 16 },
  };

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 20 }}>
      <View style={{ marginVertical: 10 }}>
        <Text style={{ textAlign: 'center', marginBottom: 10 }}>Módulo vs Frequência ({waveType})</Text>
        <LineChart
          data={{
            labels: generateLabels(),
            datasets: [{ data: magnitudes }]
          }}
          width={width}
          height={height}
          chartConfig={chartConfig}
          style={{ marginVertical: 8, borderRadius: 16 }}
        />
      </View>

      <View style={{ marginVertical: 10 }}>
        <Text style={{ textAlign: 'center', marginBottom: 10 }}>Fase vs Frequência ({waveType})</Text>
        <LineChart
          data={{
            labels: generateLabels(),
            datasets: [{ data: phases.map(p => p * (180 / Math.PI)) }] // Convertendo de radianos para graus
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

export default RespostaEmFrequenciaCanal;
