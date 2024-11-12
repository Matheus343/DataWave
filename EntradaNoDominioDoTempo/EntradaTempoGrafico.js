import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions, View, Text, ScrollView } from 'react-native';

const sampleRate = 200;
const periodo = 0.5;
const width = Dimensions.get("window").width - 36;
const height = 220;

const gerarInfoDeOnda = (type, amplitude, frequencia, fase) => {
  const numSamples = sampleRate * periodo;
  const sinal = [];
  for (let t = 0; t < numSamples; t++) {
    const time = t / sampleRate;
    let y;
    switch (type) {
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

const EntradaTempoGrafico = ({ amplitude, frequencia, fase }) => {
  const tiposDeOnda = [
    { tipo: 'senoidal', titulo: 'Onda Senoidal' },
    { tipo: 'quadrada', titulo: 'Onda Quadrada' },
    { tipo: 'denteSerra', titulo: 'Onda Dente de Serra' },
    { tipo: 'senoideRetif', titulo: 'Onda Senoidal Retificada' },
    { tipo: 'triangular', titulo: 'Onda Triangular' },
  ];

  const chartConfig = {
    backgroundColor: "#A020F0",
    backgroundGradientFrom: "#953553",
    backgroundGradientTo: "#51414F",
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: { borderRadius: 16 },
  };

  const generateLabels = (length, step = 10) => Array.from({ length }, (_, i) => (i % step === 0 ? i.toString() : ''));

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 20 }}>
      {tiposDeOnda.map(({ tipo, titulo }) => {
        const data = gerarInfoDeOnda(tipo, amplitude, frequencia, fase);
        return (
          <View key={tipo} style={{ marginVertical: 10 }}>
            <Text style={{ textAlign: 'center', marginBottom: 10 }}>{titulo}</Text>
            <LineChart
              data={{
                labels: generateLabels(data.length),
                datasets: [{ data }]
              }}
              width={width}
              height={height}
              chartConfig={chartConfig}
              style={{ marginVertical: 8, borderRadius: 16 }}
            />
          </View>
        );
      })}
    </ScrollView>
  );
};

export default EntradaTempoGrafico;
