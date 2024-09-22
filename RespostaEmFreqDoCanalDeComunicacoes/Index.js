import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';

export default function GraficoRespostaFrequencia({ navigation }) {
  const handleCalcular = () => {
    Alert.alert('EM OBRAS', 'RETORNE NO FINAL DO SEMESTRE');
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Gráfico da resposta em frequência do canal de comunicações</Text>

      <Text style={styles.instruction}>*Preencha a tabela:</Text>

      <Image source={require('../assets/tabela_ampli_tempo.jpg')} style={styles.imageTabela} />

      <TouchableOpacity style={styles.button} onPress={handleCalcular}>
        <Text style={styles.buttonText}>Calcular</Text>
      </TouchableOpacity>

      <Image source={require('../assets/grafico5.png')} style={styles.imageGrafico} />

      <TouchableOpacity style={styles.inicioButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.inicioText}>Início</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F7F7',
  },
  voltar: {
    fontSize: 30,
    color: 'black',
    position: 'absolute',
    top: 20,
    left: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  instruction: {
    fontSize: 16,
    color: 'red',
    marginBottom: 10,
  },
  imageTabela: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#A9A9F5',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
  },
  imageGrafico: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  inicioButton: {
    backgroundColor: '#A9A9F5',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 20,
  },
  inicioText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
