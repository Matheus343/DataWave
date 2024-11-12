import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';

export default function Calculos({ navigation }) {
  const [amplitude, setAmplitude] = useState('');
  const [frequencia, setFrequencia] = useState('');
  const [fase, setFase] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [frequenciaCorte, setFrequenciaCorte] = useState(''); 

  const verificarCampos = (tela) => {
    if (!amplitude || !frequencia || !fase || !periodo || !frequenciaCorte) {
      Alert.alert("Preencha todos os campos", "Por favor, insira valores para todos os campos antes de prosseguir.");
      return;
    }

    navigation.navigate(tela, {
      amplitude: parseFloat(amplitude),
      frequencia: parseFloat(frequencia),
      fase: parseFloat(fase),
      periodo: parseFloat(periodo),
      frequenciaCorte: parseFloat(frequenciaCorte), 
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>DataWave</Text>

        <Text style={styles.subTitle}>Insira os valores para os cálculos</Text>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="Amplitude"
            value={amplitude}
            onChangeText={setAmplitude}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Frequência"
            value={frequencia}
            onChangeText={setFrequencia}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="Fase"
            value={fase}
            onChangeText={setFase}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Período"
            value={periodo}
            onChangeText={setPeriodo}
            keyboardType="numeric"
          />
        </View>
        
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="Frequência de Corte"
            value={frequenciaCorte}
            onChangeText={setFrequenciaCorte}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.separator} />

        <View style={styles.graphOptionsContainer}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.option} onPress={() => verificarCampos('EntradaNoDominioDoTempo')}>
              <Text style={styles.optionText}>Gráfico do sinal de entrada no domínio do tempo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={() => verificarCampos('EspectroDoSinalDeEntrada')}>
              <Text style={styles.optionText}>Gráfico do espectro do sinal de entrada</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
           <TouchableOpacity style={styles.option} onPress={() => verificarCampos('ImpulsoNoDominioDoTempo')}>
              <Text style={styles.optionText}>Gráfico da resposta ao impulso no domínio do tempo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={() => verificarCampos('RespostaEmFreqDoCanalDeComunicacoes')}>
              <Text style={styles.optionText}>Gráfico da resposta em frequência do canal de comunicações</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.option} onPress={() => verificarCampos('SaidaNoDominioDoTempo')}>
              <Text style={styles.optionText}>Gráfico do sinal de saída no domínio do tempo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={() => verificarCampos('EspectroDoSinalDeSaida')}>
              <Text style={styles.optionText}>Gráfico do espectro do sinal de saída</Text>
            </TouchableOpacity>
          </View>
        </View>

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
    paddingTop: 40, 
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 16,
    marginBottom: 20, 
    marginTop: 5,
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
    textAlign: 'center',
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#A9A9F5', 
    marginVertical: 20,
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
    backgroundColor: '#A9A9F5',
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
