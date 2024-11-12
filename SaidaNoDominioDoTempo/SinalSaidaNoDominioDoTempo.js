import React from 'react';
import { View, Text, Dimensions, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const SinalSaidaDominioTempoGrafico = ({ amplitude, frequencia, fase, periodo }) => {
  const sampleRate = 100;
  const numSamples = sampleRate * periodo;
  const width = Dimensions.get("window").width - 36;
  const height = 220;

  const gerarSinalSaida = (type) => {
    const signal = [];
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
      signal.push(y);
    }
    return signal;
  };

  const generateLabels = () => {
    return Array.from({ length: 100 }, (_, i) => (i % 10 === 0 ? i.toString() : ''));
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
        <Text style={{ textAlign: 'center', marginBottom: 10 }}>Sinal de Saída - Onda Senoidal</Text>
        <LineChart
          data={{
            labels: generateLabels(),
            datasets: [{ data: gerarSinalSaida('senoidal') }]
          }}
          width={width}
          height={height}
          chartConfig={chartConfig}
          style={{ marginVertical: 8, borderRadius: 16 }}
        />
      </View>

      <View style={{ marginVertical: 10 }}>
        <Text style={{ textAlign: 'center', marginBottom: 10 }}>Sinal de Saída - Onda Quadrada</Text>
        <LineChart
          data={{
            labels: generateLabels(),
            datasets: [{ data: gerarSinalSaida('quadrada') }]
          }}
          width={width}
          height={height}
          chartConfig={chartConfig}
          style={{ marginVertical: 8, borderRadius: 16 }}
        />
      </View>

      <View style={{ marginVertical: 10 }}>
        <Text style={{ textAlign: 'center', marginBottom: 10 }}>Sinal de Saída - Onda Dente de Serra</Text>
        <LineChart
          data={{
            labels: generateLabels(),
            datasets: [{ data: gerarSinalSaida('denteSerra') }]
          }}
          width={width}
          height={height}
          chartConfig={chartConfig}
          style={{ marginVertical: 8, borderRadius: 16 }}
        />
      </View>

      <View style={{ marginVertical: 10 }}>
        <Text style={{ textAlign: 'center', marginBottom: 10 }}>Sinal de Saída - Onda Senoidal Retificada</Text>
        <LineChart
          data={{
            labels: generateLabels(),
            datasets: [{ data: gerarSinalSaida('senoideRetif') }]
          }}
          width={width}
          height={height}
          chartConfig={chartConfig}
          style={{ marginVertical: 8, borderRadius: 16 }}
        />
      </View>

      <View style={{ marginVertical: 10 }}>
        <Text style={{ textAlign: 'center', marginBottom: 10 }}>Sinal de Saída - Onda Triangular</Text>
        <LineChart
          data={{
            labels: generateLabels(),
            datasets: [{ data: gerarSinalSaida('triangular') }]
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

export default SinalSaidaDominioTempoGrafico;
