import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions, View, Text, ScrollView } from 'react-native';

const EntradaTempoGrafico = ({ amplitude, frequencia, fase, periodo }) => {
  const sampleRate = 100;
  const deltaT = periodo / sampleRate;
  const width = Dimensions.get("window").width - 36;
  const height = 220;

  const gerarInfoDeOnda = (type) => {
    const data = [];
    for (let t = 0; t <= periodo; t += deltaT) {
      let y;
      switch (type) {
        case 'senoidal':
          y = amplitude * Math.cos(2 * Math.PI * frequencia * t + fase);
          break;
        case 'quadrada':
          y = amplitude * Math.sign(Math.sin(2 * Math.PI * frequencia * t + fase));
          break;
        case 'denteSerra':
          y = amplitude * (2 * (t * frequencia - Math.floor(0.5 + t * frequencia)));
          break;
        case 'senoideRetif':
          y = amplitude * Math.abs(Math.cos(2 * Math.PI * frequencia * t + fase));
          break;
        case 'triangular':
          y = amplitude * (2 * Math.abs(2 * (t * frequencia - Math.floor(t * frequencia + 0.5))) - 1);
          break;
        default:
          y = 0;
      }
      data.push(y);
    }
    return data;
  };

  const generateLabels = (length, step = 10) => {
    return Array.from({ length }, (_, i) => (i % step === 0 ? i.toString() : ''));
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
        <Text style={{ textAlign: 'center', marginBottom: 10 }}>Onda Senoidal</Text>
        <LineChart
          data={{
            labels: generateLabels(gerarInfoDeOnda('senoidal').length),
            datasets: [{ data: gerarInfoDeOnda('senoidal') }]
          }}
          width={width}
          height={height}
          chartConfig={chartConfig}
          style={{ marginVertical: 8, borderRadius: 16 }}
        />
      </View>
      
      <View style={{ marginVertical: 10 }}>
        <Text style={{ textAlign: 'center', marginBottom: 10 }}>Onda Quadrada</Text>
        <LineChart
          data={{
            labels: generateLabels(gerarInfoDeOnda('quadrada').length),
            datasets: [{ data: gerarInfoDeOnda('quadrada') }]
          }}
          width={width}
          height={height}
          chartConfig={chartConfig}
          style={{ marginVertical: 8, borderRadius: 16 }}
        />
      </View>

      <View style={{ marginVertical: 10 }}>
        <Text style={{ textAlign: 'center', marginBottom: 10 }}>Onda Dente de Serra</Text>
        <LineChart
          data={{
            labels: generateLabels(gerarInfoDeOnda('denteSerra').length),
            datasets: [{ data: gerarInfoDeOnda('denteSerra') }]
          }}
          width={width}
          height={height}
          chartConfig={chartConfig}
          style={{ marginVertical: 8, borderRadius: 16 }}
        />
      </View>

      <View style={{ marginVertical: 10 }}>
        <Text style={{ textAlign: 'center', marginBottom: 10 }}>Onda Senoidal Retificada</Text>
        <LineChart
          data={{
            labels: generateLabels(gerarInfoDeOnda('senoideRetif').length),
            datasets: [{ data: gerarInfoDeOnda('senoideRetif') }]
          }}
          width={width}
          height={height}
          chartConfig={chartConfig}
          style={{ marginVertical: 8, borderRadius: 16 }}
        />
      </View>

      <View style={{ marginVertical: 10 }}>
        <Text style={{ textAlign: 'center', marginBottom: 10 }}>Onda Triangular</Text>
        <LineChart
          data={{
            labels: generateLabels(gerarInfoDeOnda('triangular').length),
            datasets: [{ data: gerarInfoDeOnda('triangular') }]
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

export default EntradaTempoGrafico;
