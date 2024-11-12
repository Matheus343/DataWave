import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const sampleRate = 200;
const T = 0.1;
const width = Dimensions.get("window").width - 36;
const height = 220;
const numSamples = 200; 

const calcularRespostaFrequencia = () => {
  const frequencias = [];
  const modulo = [];
  const fase = [];

  for (let k = 0; k < numSamples; k++) {
    const omega = (2 * Math.PI * k) / sampleRate;
    const H_jw = 1 / Math.sqrt(1 + Math.pow(omega * T, 2));
    const faseH_jw = -Math.atan(omega * T);

    frequencias.push(omega);
    modulo.push(H_jw);
    fase.push(faseH_jw);
  }

  return { frequencias, modulo, fase };
};

const calcularRespostaImpulso = ({ frequencias, modulo, fase }) => {
  const h_t = [];
  const deltaOmega = (2 * Math.PI) / sampleRate;

  for (let tIndex = 0; tIndex < numSamples; tIndex++) {
    const t = tIndex / sampleRate;
    let somaReal = 0;
    let somaImag = 0;

    for (let k = 0; k < numSamples; k++) {
      const omega = frequencias[k];
      const H_jw = modulo[k];
      const faseH_jw = fase[k];
      
      const realPart = H_jw * Math.cos(omega * t + faseH_jw);
      const imagPart = H_jw * Math.sin(omega * t + faseH_jw);

      somaReal += realPart * deltaOmega;
      somaImag += imagPart * deltaOmega;
    }

    const h_tValue = (somaReal + somaImag) / (2 * Math.PI);
    h_t.push(h_tValue);
  }

  return h_t;
};

const RespostaImpulsoGrafico = () => {
  const { frequencias, modulo, fase } = calcularRespostaFrequencia();
  const h_t = calcularRespostaImpulso({ frequencias, modulo, fase });

  const chartConfig = {
    backgroundColor: "#A020F0",
    backgroundGradientFrom: "#953553",
    backgroundGradientTo: "#51414F",
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: { borderRadius: 16 },
  };

  const generateLabels = () =>
    Array.from({ length: h_t.length }, (_, i) => (i % 10 === 0 ? (i / sampleRate).toFixed(2) : ''));

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 20 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 20 }}>Gráfico da Resposta ao Impulso no Domínio do Tempo</Text>

      <View style={{ marginVertical: 10 }}>
        <Text style={{ textAlign: 'center', marginBottom: 10 }}>h(t) vs Tempo</Text>
        <LineChart
          data={{
            labels: generateLabels(),
            datasets: [{ data: h_t }],
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

export default RespostaImpulsoGrafico;
