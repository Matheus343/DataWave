import React, { useState } from 'react';
import { View, Text, Dimensions, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const sampleRate = 100;
const periodo = 1;

const tiposDeOnda = ['senoidal', 'quadrada', 'denteSerra', 'senoideRetif', 'triangular'];

const gerarSinal = (type, amplitude, frequencia, fase) => {
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
    const phase = Math.atan2(imag, real) * (180 / Math.PI);
    magnitudes.push(magnitude);
    phases.push(phase);
  }

  return { magnitudes, phases };
};

const EspectroSinalEntrada = ({ amplitude, frequencia, fase }) => {
  const [currentTypeIndex, setCurrentTypeIndex] = useState(0);

  const currentType = tiposDeOnda[currentTypeIndex];
  const sinal = gerarSinal(currentType, amplitude, frequencia, fase);
  const { magnitudes, phases } = dft(sinal);

  const width = Dimensions.get("window").width - 36;
  const height = 220;

  const chartConfig = {
    backgroundColor: "#A020F0",
    backgroundGradientFrom: "#953553",
    backgroundGradientTo: "#51414F",
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: { borderRadius: 16 },
  };

  const generateLabels = () => Array.from({ length: magnitudes.length }, (_, i) => (i % 10 === 0 ? i.toString() : ''));

  const handlePrevious = () => {
    setCurrentTypeIndex((prevIndex) => (prevIndex - 1 + tiposDeOnda.length) % tiposDeOnda.length);
  };

  const handleNext = () => {
    setCurrentTypeIndex((prevIndex) => (prevIndex + 1) % tiposDeOnda.length);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gráfico do espectro do sinal de entrada</Text>
      <Text style={styles.subtitle}>Tipo de Onda: {currentType.charAt(0).toUpperCase() + currentType.slice(1)}</Text>
      
      <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 20 }}>
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Amplitude vs Frequência</Text>
          <LineChart
            data={{
              labels: generateLabels(),
              datasets: [{ data: magnitudes.length > 0 ? magnitudes : [0] }] // Evitando erro de gráfico vazio
            }}
            width={width}
            height={height}
            chartConfig={chartConfig}
            style={styles.chartStyle}
          />
        </View>
        
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Fase vs Frequência</Text>
          <LineChart
            data={{
              labels: generateLabels(),
              datasets: [{ data: phases.length > 0 ? phases : [0] }] // Evitando erro de gráfico vazio
            }}
            width={width}
            height={height}
            chartConfig={chartConfig}
            style={styles.chartStyle}
          />
        </View>
      </ScrollView>

      <View style={styles.carouselButtons}>
        <TouchableOpacity style={styles.carouselButton} onPress={handlePrevious}>
          <Text style={styles.carouselButtonText}>Anterior</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.carouselButton} onPress={handleNext}>
          <Text style={styles.carouselButtonText}>Próximo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
    marginTop: 10,
  },
  chartContainer: {
    marginVertical: 10,
  },
  chartTitle: {
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  chartStyle: {
    marginVertical: 8,
    borderRadius: 16,
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

export default EspectroSinalEntrada;
