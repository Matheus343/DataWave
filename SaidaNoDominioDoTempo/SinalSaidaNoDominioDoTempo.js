import React, { useState } from 'react';
import { View, Text, Dimensions, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const sampleRate = 200;
const numSamples = 100;
const width = Dimensions.get("window").width - 36;
const height = 220;
const T = 0.1; 

const tiposDeOnda = ['senoidal', 'quadrada', 'denteSerra', 'senoideRetif', 'triangular'];

const gerarSinalEntrada = (tipo, amplitude, frequencia, fase) => {
  const sinalEntrada = [];
  const omega = 2 * Math.PI * frequencia;

  for (let t = 0; t < numSamples; t++) {
    const tempo = t / sampleRate;
    let y = 0;

    switch (tipo) {
      case 'senoidal':
        y = amplitude * Math.cos(omega * tempo + fase);
        break;
      case 'quadrada':
        y = amplitude * Math.sign(Math.sin(omega * tempo + fase));
        break;
      case 'denteSerra':
        y = amplitude * (2 * (tempo * frequencia - Math.floor(0.5 + tempo * frequencia)));
        break;
      case 'senoideRetif':
        y = amplitude * Math.abs(Math.cos(omega * tempo + fase));
        break;
      case 'triangular':
        y = amplitude * (2 * Math.abs(2 * (tempo * frequencia - Math.floor(tempo * frequencia + 0.5))) - 1);
        break;
      default:
        y = 0;
    }
    sinalEntrada.push(y);
  }
  return sinalEntrada;
};

const gerarRespostaImpulso = () => {
  const respostaImpulso = [];
  
  for (let t = 0; t < numSamples; t++) {
    const tempo = t / sampleRate;
    const h_t = (tempo >= 0) ? (1 / T) * Math.exp(-tempo / T) : 0;
    respostaImpulso.push(h_t);
  }
  return respostaImpulso;
};

const calcularConvolucao = (sinalEntrada, respostaImpulso) => {
  const sinalSaida = [];
  
  for (let t = 0; t < numSamples; t++) {
    let y_t = 0;
    for (let tau = 0; tau <= t; tau++) {
      y_t += sinalEntrada[tau] * respostaImpulso[t - tau] / sampleRate;
    }
    sinalSaida.push(y_t);
  }
  return sinalSaida;
};

const SinalDeSaidaNoDominioDoTempo = ({ amplitude, frequencia, fase }) => {
  const [currentTypeIndex, setCurrentTypeIndex] = useState(0);

  const tipoDeOnda = tiposDeOnda[currentTypeIndex];
  const sinalEntrada = gerarSinalEntrada(tipoDeOnda, amplitude, frequencia, fase);
  const respostaImpulso = gerarRespostaImpulso();
  const sinalDeSaida = calcularConvolucao(sinalEntrada, respostaImpulso);

  const generateLabels = (length, step = 10) =>
    Array.from({ length }, (_, i) => (i % step === 0 ? i.toString() : ''));

  const chartConfig = {
    backgroundColor: "#A020F0",
    backgroundGradientFrom: "#953553",
    backgroundGradientTo: "#51414F",
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: { borderRadius: 16 },
  };

  const handlePrevious = () => {
    setCurrentTypeIndex((prevIndex) => (prevIndex - 1 + tiposDeOnda.length) % tiposDeOnda.length);
  };

  const handleNext = () => {
    setCurrentTypeIndex((prevIndex) => (prevIndex + 1) % tiposDeOnda.length);
  };

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 20 }}>
      <Text style={styles.title}>Sinal de Saída no Domínio do Tempo - {tipoDeOnda.charAt(0).toUpperCase() + tipoDeOnda.slice(1)}</Text>

      <View style={{ marginVertical: 10 }}>
        <LineChart
          data={{
            labels: generateLabels(sinalDeSaida.length),
            datasets: [{ data: sinalDeSaida }],
          }}
          width={width}
          height={height}
          chartConfig={chartConfig}
          style={{ marginVertical: 8, borderRadius: 16 }}
        />
      </View>

      <View style={styles.carouselButtons}>
        <TouchableOpacity style={styles.carouselButton} onPress={handlePrevious}>
          <Text style={styles.carouselButtonText}>Anterior</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.carouselButton} onPress={handleNext}>
          <Text style={styles.carouselButtonText}>Próximo</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
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
});

export default SinalDeSaidaNoDominioDoTempo;
