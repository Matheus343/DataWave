import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions, View } from 'react-native';

const EntradaTempoGrafico = ({ amplitude, frequencia, fase, periodo }) => {
  const data = [];
  const sampleRate = 100;
  const deltaT = periodo / sampleRate;

  for (let t = 0; t <= periodo; t += deltaT) {
    const y = amplitude * Math.cos(2 * Math.PI * frequencia * t + fase);
    data.push(y);
  }

  return (
    <View>
      <LineChart
        data={{
          datasets: [{ data }]
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

export default EntradaTempoGrafico;
