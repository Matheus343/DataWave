import React, { useState } from 'react';
import { View, Text, Dimensions, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const sampleRate = 200;
const periodo = 1;
const numSamples = 100;
const T = 0.1;
const width = Dimensions.get("window").width - 36;
const height = 220;

const tiposDeOnda = ['senoidal', 'quadrada', 'denteSerra', 'senoideRetif', 'triangular'];

const gerarSinalEntrada = (type, amplitude, frequencia, fase) => {
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

const calcularDFT = (sinal) => {
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
    phases.push(phase * (180 / Math.PI)); 
  }

  return { magnitudes, phases };
};

const calcularRespostaFrequenciaCanal = () => {
  const moduloCanal = [];
  const faseCanal = [];

  for (let k = 0; k < numSamples; k++) {
    const omega = (2 * Math.PI * k) / sampleRate;
    const H_jw = 1 / Math.sqrt(1 + Math.pow(omega * T, 2));
    const faseH_jw = -Math.atan(omega * T);

    moduloCanal.push(H_jw);
    faseCanal.push(faseH_jw * (180 / Math.PI)); 
  }

  return { moduloCanal, faseCanal };
};

const EspectroSinalSaida = ({ amplitude = 1, frequencia = 1, fase = 0 }) => {
  const [currentTypeIndex, setCurrentTypeIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentTypeIndex((prevIndex) => (prevIndex - 1 + tiposDeOnda.length) % tiposDeOnda.length);
  };

  const handleNext = () => {
    setCurrentTypeIndex((prevIndex) => (prevIndex + 1) % tiposDeOnda.length);
  };

  const waveType = tiposDeOnda[currentTypeIndex];

  const sinalEntrada = gerarSinalEntrada(waveType, amplitude, frequencia, fase);
  const { magnitudes: amplitudeEntrada, phases: faseEntrada } = calcularDFT(sinalEntrada);

  const { moduloCanal, faseCanal } = calcularRespostaFrequenciaCanal();

  const minLength = Math.min(amplitudeEntrada.length, moduloCanal.length, faseEntrada.length, faseCanal.length);
  const amplitudeSaida = amplitudeEntrada.slice(0, minLength).map((amp, index) => amp * moduloCanal[index]);
  const faseSaida = faseEntrada.slice(0, minLength).map((fase, index) => fase + faseCanal[index]);

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
      <Text style={styles.title}>Espectro de Saída - {waveType.charAt(0).toUpperCase() + waveType.slice(1)}</Text>

      <View style={{ marginVertical: 10 }}>
        <Text style={{ textAlign: 'center', marginBottom: 10 }}>Amplitude de Saída vs Frequência</Text>
        <LineChart
          data={{
            labels: generateLabels(),
            datasets: [{ data: amplitudeSaida }],
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
            datasets: [{ data: faseSaida }],
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
    marginTop: 15,
    marginBottom: 10,
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

export default EspectroSinalSaida;
