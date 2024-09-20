import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';

export default function Calculos({ navigation }) {
  const [amplitude, setAmplitude] = useState('');
  const [frequencia, setFrequencia] = useState('');
  const [fase, setFase] = useState('');
  const [periodo, setPeriodo] = useState('');

  const handleGerarGraficos = () => {
    Alert.alert('EM OBRAS', 'RETORNE NO FINAL DO SEMESTRE');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>DataWave</Text>

        {/* Inputs */}
        <Text style={styles.subTitle}>Insira os valores para os cálculos</Text>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="Amplitude"
            value={amplitude}
            onChangeText={setAmplitude}
            keyboardType="numeric"  // Teclado numérico
          />
          <TextInput
            style={styles.input}
            placeholder="Frequência"
            value={frequencia}
            onChangeText={setFrequencia}
            keyboardType="numeric"  // Teclado numérico
          />
        </View>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="Fase"
            value={fase}
            onChangeText={setFase}
            keyboardType="numeric"  // Teclado numérico
          />
          <TextInput
            style={styles.input}
            placeholder="Período"
            value={periodo}
            onChangeText={setPeriodo}
            keyboardType="numeric"  // Teclado numérico
          />
        </View>

        {/* Botão Gerar Gráficos */}
        <TouchableOpacity style={styles.button} onPress={handleGerarGraficos}>
          <Text style={styles.buttonText}>Gerar Gráficos</Text>
        </TouchableOpacity>

        {/* Botões de Gráficos */}
        <View style={styles.graphOptionsContainer}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('EntradaNoDominioDoTempo')}>
              <Text style={styles.optionText}>Gráfico do sinal de entrada no domínio do tempo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('EspectroDoSinalDeEntrada')}>
              <Text style={styles.optionText}>Gráfico do espectro do sinal de entrada</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('ImpulsoNoDominioDoTempo')}>
              <Text style={styles.optionText}>Gráfico da resposta ao impulso no domínio do tempo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('RespostaEmFreqDoCanalDeComunicacoes')}>
              <Text style={styles.optionText}>
                Gráfico da resposta em frequência do canal de comunicações
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('SaidaNoDominioDoTempo')}>
              <Text style={styles.optionText}>Gráfico do sinal de saída no domínio do tempo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('EspectroDoSinalDeSaida')}>
              <Text style={styles.optionText}>Gráfico do espectro do sinal de saída</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Botão de Ajuda */}
        <TouchableOpacity style={styles.helpButton} onPress={() => navigation.navigate('Criadores')}>
          <Text style={styles.helpButtonText}>?</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 16,
    marginBottom: 25,
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  input: {
    width: '45%',
    backgroundColor: '#D3D3D3',
    padding: 10,
    borderRadius: 20,
  },
  button: {
    backgroundColor: '#A9A9F5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 30,
    marginTop: 30
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
  graphOptionsContainer: {
    width: '100%',
    marginTop: 15,
  },
  option: {
    width: '48%',
    backgroundColor: '#D3D3D3',
    padding: 9,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  optionText: {
    fontSize: 12,
    textAlign: 'center',
  },
  helpButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#A9A9A9',
    borderRadius: 30,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  helpButtonText: {
    fontSize: 24,
    color: '#FFF',
  },
});
