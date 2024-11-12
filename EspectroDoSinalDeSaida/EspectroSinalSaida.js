import React from 'react';
import { View, Text, Dimensions, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const EspectroSinalSaida = ({ espectroEntrada = { amplitudeEntrada: [], faseEntrada: [] }, respostaCanal = { moduloCanal: [], faseCanal: [] } }) => {
  const { amplitudeEntrada, faseEntrada } = espectroEntrada;
  const { moduloCanal, faseCanal } = respostaCanal;

  // Log para verificar os dados de entrada
  console.log('Amplitude Entrada:', amplitudeEntrada);
  console.log('Fase Entrada:', faseEntrada);
  console.log('Módulo Canal:', moduloCanal);
  console.log('Fase Canal:', faseCanal);

  const width = Dimensions.get("window").width - 36;
  const height = 220;

  // Função para calcular o espectro de saída a partir dos espectros de entrada e canal
  const calcularEspectroSaida = () => {
    const minLength = Math.min(amplitudeEntrada.length, moduloCanal.length, faseEntrada.length, faseCanal.length);

    if (minLength === 0) {
      return { amplitudeSaida: [], faseSaida: [] };
    }

    const amplitudeSaida = amplitudeEntrada.slice(0, minLength).map((amp, index) => amp * moduloCanal[index]);
    const faseSaida = faseEntrada.slice(0, minLength).map((fase, index) => fase + faseCanal[index]);

    return { amplitudeSaida, faseSaida };
  };

  const { amplitudeSaida, faseSaida } = calcularEspectroSaida();

  if (amplitudeSaida.length === 0 || faseSaida.length === 0) {
    return (
      <View style={{ alignItems: 'center', padding: 20 }}>
        <Text>Erro: Dados insuficientes para plotar o gráfico</Text>
      </View>
    );
  }

  const generateLabels = () => Array.from({ length: amplitudeSaida.length }, (_, i) => (i % 10 === 0 ? i.toString() : ''));

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
        <Text style={{ textAlign: 'center', marginBottom: 10 }}>Amplitude de Saída vs Frequência</Text>
        <LineChart
          data={{
            labels: generateLabels(),
            datasets: [{ data: amplitudeSaida }]
          }}
          width={width}
          height={height}
          chartConfig={chartConfig}
          style={{ marginVertical: 8, borderRadius: 16 }}
        />
      </View>

      <View style={{ marginVertical: 10 }}>
        <Text style={{ textAlign: 'center', marginBottom: 10 }}>Fase de Saída vs Frequência</Text>
        <LineChart
          data={{
            labels: generateLabels(),
            datasets: [{ data: faseSaida }]
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

export default EspectroSinalSaida;
